import AnimeProviderConfig from "./AnimeProviderConfig";

class AnimeProvider {
  config: AnimeProviderConfig;
  constructor(config: AnimeProviderConfig) {
    this.config = config;
  }
}

export default AnimeProvider;