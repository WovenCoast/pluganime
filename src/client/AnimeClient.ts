import AnimePlugin from "@common/AnimePlugin";
import { AnimeMetadata, BasicAnimeMetadata } from "@provider/AnimeMetadata";
import AnimeProvider from "@provider/AnimeProvider";
import AnimeWatcher from "@watcher/AnimeWatcher";
import AnimeWatcherEvents from "@watcher/AnimeWatcherEvents";
import EventEmitter from "events";
import AnimeClientConfig from "./AnimeClientConfig";
import { DownloadInfo } from "../downloader/DownloadInfo";
import AnimeDownloader from "src/downloader/AnimeDownloader";

class AnimeClient extends EventEmitter {
  plugins: AnimePlugin[];
  download: AnimeDownloader;
  constructor(config: AnimeClientConfig | AnimePlugin[]) {
    super();
    // I know that this is super jank, if the config is an array then only plugins have been passed in
    if (Array.isArray(config)) config = { plugins: config };
    this.plugins = config.plugins;

    this.download = new AnimeDownloader(this, { queue: config.downloadQueue || [], downloadPath: config.downloadPath || process.cwd() });

    // check if each plugin has a unique name
    const pluginNames = this.plugins.map(p => p.name);
    // if the name is repeated (if some of the names includes it's own name excluding it's own index)
    if (pluginNames.some((name, index) => pluginNames.filter((_, idx) => idx !== index).includes(name))) {
      // same logic as above, just with find instead of some
      const repeated = pluginNames.find((name, index) => pluginNames.filter((_, idx) => idx !== index).includes(name));
      throw new Error(`Plugin "${repeated}" is in the plugins list more than once!`);
    }

    // initialize the plugins and emit the event once done
    this._initPlugins().then(() => this.emit('init'));
  }
  async _initPlugins() {
    // run the init function for every plugin
    const promises = this.plugins.map(async plugin => {
      return await plugin.init();
    });
    // wait for all the promises to be resolved
    await Promise.all(promises);
    // return true if all the promises are correctly resolved
    return promises.every(p => !!p);
  }
  getPlugin(name: string): AnimePlugin {
    // the "as AnimePlugin" is necessary because otherwise it infers the type as AnimePlugin | undefined
    return this.plugins.find(p => p.name === name) as AnimePlugin;
  }
  // https://www.typescriptlang.org/docs/handbook/enums.html#enums-at-compile-time
  reportToWatchers(event: keyof typeof AnimeWatcherEvents, ...args: any[]) {
    // https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions
    (<AnimeWatcher[]> this.plugins.filter(p => p.isWatcher)).forEach((plugin: AnimeWatcher) => {
      // if the plugin is a watcher and the _handleEvent isn't overridden, call it with the event
      if (plugin.isWatcher && plugin._handleEvent && typeof plugin._handleEvent === "function") plugin._handleEvent(event, ...args);
    });
  }
  async search(query: string): Promise<BasicAnimeMetadata[]> {
    let animes: BasicAnimeMetadata[] = [];

    // basically an async/await friendly forEach loop
    await Promise.all(this.plugins.map(async plugin => {
      // append to the animes with the ones from the plugin
      animes = [...animes, ...(await plugin.search(query))];
    }));
    
    return animes;
  }
  async fetchMetadata(basic: BasicAnimeMetadata): Promise<AnimeMetadata> {
    // https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions
    // AnimeProvider as AnimePlugin doesn't have the fetchMetadata method
    const plugin: AnimeProvider = <AnimeProvider>this.getPlugin(basic.provider);
    if (!plugin) throw new Error(`Plugin "${basic.provider}" doesn't exist, but "${basic.name}" was provided by "${basic.provider}" 🤔`);

    // yes, all that only to just forward the query
    return await plugin.fetchMetadata(basic);
  }
  /**
   * Adds to the queue of things to be downloaded
   * @param anime The anime to add to the download queue
   * @param episode THe episode to download, if not provided the entire anime will be added to the queue
   */
  async addToQueue(anime: AnimeMetadata, episode?: string) {
    // just some repetitive code
    const infoDefaults = {
      provider: anime.provider,
      anime,
      progress: 0,
      evaluated: false
    }
    // if the episode is there then just push that one to the queue
    if (episode) this.download.queue.push({
      ...infoDefaults,
      episode,
    });
    else {
      // otherwise push every episode into the queue
      anime.episodes.forEach(ep => {
        this.download.queue.push({
          ...infoDefaults,
          episode: ep,
        });
      });
    }
    // emit the event to the client event watchers
    this.emit('queueUpdated', this.download.queue);
  }
}

export default AnimeClient;