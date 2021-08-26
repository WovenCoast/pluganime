import AnimePlugin from "@common/AnimePlugin";
import AnimeWatcherConfig from "./AnimeWatcherConfig";
import AnimeWatcherEvents from "./AnimeWatcherEvents";

// https://www.typescriptlang.org/docs/handbook/enums.html#enums-at-compile-time
// this explains a lot of the "keyof typeof" stuff happening a lot in this file

class AnimeWatcher extends AnimePlugin {
  events: Map<keyof typeof AnimeWatcherEvents, Function[]>;

  constructor(config: AnimeWatcherConfig) {
    super(config);
    this.events = new Map<keyof typeof AnimeWatcherEvents, Function[]>();
  }
  _handleEvent(event: keyof typeof AnimeWatcherEvents, ...args: any[]) {
    // this method is so just- no I won't even explain 😀
    const handlers = this.events.get(event);
    if (!handlers) return;
    handlers.forEach(((handler: Function) => {
      // didn't want to use this but.....
      //@ts-ignore
      if (this[handler] && typeof this[handler] === "function") handler(...args);
    }).bind(this));
  }
}

export default AnimeWatcher