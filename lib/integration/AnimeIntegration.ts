import AnimePlugin from "@common/AnimePlugin";
import AnimeIntegrationConfig from "./AnimeIntegrationConfig";

class AnimeIntegration extends AnimePlugin {
  constructor(config: AnimeIntegrationConfig) {
    super(config);
  }
}

export default AnimeIntegration