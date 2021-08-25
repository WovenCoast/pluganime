import AnimePlugin from "@common/AnimePlugin";
import { BasicAnimeMetadata } from "@provider/AnimeMetadata";
import EventEmitter from "events";
import AnimeClientConfig from "./AnimeClientConfig";

class AnimeClient extends EventEmitter {
  plugins: AnimePlugin[];
  constructor(config: AnimeClientConfig) {
    super();
    this.plugins = config.plugins;
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
  async search(query: string): Promise<BasicAnimeMetadata[]> {
    let animes: BasicAnimeMetadata[] = [];

    // y'all better appreciate me writing a whole ass for loop just because the types were all messed up 🙄
    for (let i = 0; i < this.plugins.length; i++) {
      let plugin: AnimePlugin = this.plugins[i];
      const animesFromPlugin: BasicAnimeMetadata[] = (await plugin.search(query)).map(anime => {
        anime.provider = plugin.name;
        return anime;
      });
      animes = [...animes, ...animesFromPlugin];
    }
    
    return animes;
  }
}

export default AnimeClient;