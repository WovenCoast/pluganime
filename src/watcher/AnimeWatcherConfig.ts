import AnimePluginConfig from "@common/AnimePluginConfig";
import AnimeWatcherEvents from "./AnimeWatcherEvents";

export default interface AnimeWatcherConfig extends AnimePluginConfig {
  events: Record<AnimeWatcherEvents, string>;
}
