/// <reference types="node" />
import EventEmitter from "events";
import AnimePluginConfig from "./AnimePluginConfig";
declare class AnimePlugin extends EventEmitter {
    config: AnimePluginConfig;
    name: string;
    constructor(config: AnimePluginConfig);
    init(): boolean;
}
export default AnimePlugin;
//# sourceMappingURL=AnimePlugin.d.ts.map