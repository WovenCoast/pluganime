import AnimePluginConfig from "@common/AnimePluginConfig";

export default interface AnimeWatcherConfig extends AnimePluginConfig {
  events: {
    [eventName:string]: string[];
  }
}