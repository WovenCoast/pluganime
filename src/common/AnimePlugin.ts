import { BasicAnimeMetadata } from "@provider/AnimeMetadata";
import EventEmitter from "events";
import AnimePluginConfig from "./AnimePluginConfig";

class AnimePlugin extends EventEmitter {
  config: AnimePluginConfig;
  name: string;
  isWatcher: boolean;
  constructor(config: AnimePluginConfig) {
    super()
    this.config = config;
    this.name = config.name;
    this.isWatcher = this.config.isWatcher || false;
  }
  init() {
    this.emit('init');
    return true;
  }
  search(query: string): Promise<BasicAnimeMetadata[]> {
    return Promise.resolve([]);
  }
}
export default AnimePlugin;