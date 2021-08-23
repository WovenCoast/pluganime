import EventEmitter from "events";
import AnimeClientConfig from "./AnimeClientConfig";

class AnimeClient extends EventEmitter {
  config: AnimeClientConfig;
  constructor(config: AnimeClientConfig) {
    super();
    this.config = config;
  }
}

export default AnimeClient;