import AnimePlugin from "@common/AnimePlugin";
import AnimeWatcherConfig from "./AnimeWatcherConfig";

class AnimeWatcher extends AnimePlugin {
  events: Map<string, string[]>;
  constructor(config: AnimeWatcherConfig) {
    super(config);
    this.events = new Map();
  }
  _handleEvent(event: string, ...args: any[]) {
    // this method is so just- no I won't even explain 😀
    const handlers = this.events.get(event);
    if (!handlers) return;
    handlers.forEach(((handler: string) => {
      // didn't want to use this but.....
      //@ts-ignore
      if (this[handler] && typeof this[handler] === "function") handler(...args);
    }).bind(this));
  }
}

export default AnimeWatcher