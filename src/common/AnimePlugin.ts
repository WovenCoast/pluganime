import EventEmitter from "events";
import AnimePluginConfig from "./AnimePluginConfig";

class AnimePlugin extends EventEmitter {
  config: AnimePluginConfig;
  constructor(config: AnimePluginConfig) {
    super()
    this.config = config;
  }
}
export default AnimePlugin;