import EventEmitter from "events";
import AnimePluginConfig from "./AnimePluginConfig";

class AnimePlugin extends EventEmitter {
  config: AnimePluginConfig;
  name: string;
  constructor(config: AnimePluginConfig) {
    super()
    this.config = config;
    this.name = config.name;
  }
  init() {
    this.emit('init');
    return true;
  }
}
export default AnimePlugin;