import AnimePlugin from "@common/AnimePlugin";
import AnimeProviderConfig from "./AnimeProviderConfig";

class AnimeProvider extends AnimePlugin {
  constructor(config: AnimeProviderConfig) {
    super(config)
  }
}

export default AnimeProvider;