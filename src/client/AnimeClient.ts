import AnimePlugin from "@common/AnimePlugin";
import { AnimeMetadata, BasicAnimeMetadata } from "@provider/AnimeMetadata";
import AnimeProvider from "@provider/AnimeProvider";
import AnimeWatcher from "@watcher/AnimeWatcher";
import EventEmitter from "events";
import AnimeClientConfig from "./AnimeClientConfig";

class AnimeClient extends EventEmitter {
  plugins: AnimePlugin[];
  constructor(config: AnimeClientConfig | AnimePlugin[]) {
    super();
    // I know that this is super jank, I'm not even gonna try to explain.....
    if (Array.isArray(config)) config = { plugins: config };
    this.plugins = config.plugins;

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
  reportToWatchers(event: string, ...args: any[]) {
    // assert AnimePlugin to be AnimeWatcher
    (<AnimeWatcher[]> this.plugins.filter(p => p.isWatcher)).forEach((plugin: AnimeWatcher) => {
      // if the plugin is a watcher and the _handleEvent isn't overridden, call it with the event
      if (plugin.isWatcher && plugin._handleEvent && typeof plugin._handleEvent === "function") plugin._handleEvent(event, ...args);
    });
  }
  async search(query: string): Promise<BasicAnimeMetadata[]> {
    let animes: BasicAnimeMetadata[] = [];

    // y'all better appreciate me writing a whole ass old styled for loop just because the types were all messed up 🙄
    for (let i = 0; i < this.plugins.length; i++) {
      let plugin: AnimePlugin = this.plugins[i];
      // search for the anime from the plugin
      const animesFromPlugin: BasicAnimeMetadata[] = (await plugin.search(query)).map(anime => {
        // assign the provider to be the plugin name
        anime.provider = plugin.name;
        return anime;
      });
      // add it to the existing list of animes
      animes = [...animes, ...animesFromPlugin];
    }
    
    return animes;
  }
  async fetchMetadata(basic: BasicAnimeMetadata): Promise<AnimeMetadata> {
    // basic.provider is an optional property
    if (!basic.provider) throw new Error(`Field "provider" doesn't exist in basic metadata of "${basic.name}", if you fetched the basic metadata directly from the plugin then use its fetchMetadata method to get rid of this error!`);

    // AnimeProvider as AnimePlugin doesn't have the fetchMetadata method
    const plugin: AnimeProvider = this.getPlugin(basic.provider) as AnimeProvider;
    if (!plugin) throw new Error(`Plugin "${basic.provider}" doesn't exist, but "${basic.name}" was provided by "${basic.provider}" 🤔`);
    if (!plugin.fetchMetadata) throw new Error(`Plugin "${plugin.name}" doesn't have the "fetchMetadata" method :(`);

    // yes, all that only to just forward the query
    return await plugin.fetchMetadata(basic);
  }
  async addToQueue(anime: AnimeMetadata, episode: string) {

  }
}

export default AnimeClient;