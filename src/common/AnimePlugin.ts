import { BasicAnimeMetadata } from "@provider/AnimeMetadata";
import EventEmitter from "events";
import AnimePluginConfig from "./AnimePluginConfig";

class AnimePlugin extends EventEmitter implements AnimePluginConfig {
  name: string;
  isWatcher: boolean;
  isProvider: boolean;

  constructor(config: AnimePluginConfig) {
    super()
    this.name = config.name;
    this.isWatcher = config.isWatcher || false;
    this.isProvider = config.isProvider || false;
  }
  init() {
    this.emit('init');
    return true;
  }
  // this is a default method and should be overridden by the plugin itself
  search(query: string): Promise<BasicAnimeMetadata[]> {
    return Promise.resolve([]);
  }
}
export default AnimePlugin;