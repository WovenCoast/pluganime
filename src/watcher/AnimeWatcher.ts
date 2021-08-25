import AnimePlugin from "@common/AnimePlugin";
import AnimeWatcherConfig from "./AnimeWatcherConfig";

class AnimeWatcher extends AnimePlugin {
  constructor(config: AnimeWatcherConfig) {
    super(config)
  }
}

export default AnimeWatcher