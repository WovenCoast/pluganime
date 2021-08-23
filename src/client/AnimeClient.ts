import AnimePlugin from "@common/AnimePlugin";
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
}

export default AnimeClient;