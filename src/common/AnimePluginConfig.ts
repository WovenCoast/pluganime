export default interface AnimePluginConfig {
  name: string;
  /**
   * Whether this plugin implements watcher plugin functions
   * 
   * Note: This is in config so that plugins aren't forced to use the built in classes for watchers
   * @default false
   */
  isWatcher?: boolean;
  /**
   * Whether this plugin implements provider plugin functions
   * 
   * Note: This is in config so that plugins aren't forced to use the built in classes for providers
   * @default false
   */
  isProvider?: boolean;
}