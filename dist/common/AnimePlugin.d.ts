/// <reference types="node" />
import { BasicAnimeMetadata } from "@provider/AnimeMetadata";
import EventEmitter from "events";
import AnimePluginConfig from "./AnimePluginConfig";
declare class AnimePlugin extends EventEmitter {
    config: AnimePluginConfig;
    name: string;
    constructor(config: AnimePluginConfig);
    init(): boolean;
    search(query: string): Promise<BasicAnimeMetadata[]>;
}
export default AnimePlugin;
//# sourceMappingURL=AnimePlugin.d.ts.map