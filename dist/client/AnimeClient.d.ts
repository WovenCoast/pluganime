/// <reference types="node" />
import AnimePlugin from "@common/AnimePlugin";
import EventEmitter from "events";
import AnimeClientConfig from "./AnimeClientConfig";
declare class AnimeClient extends EventEmitter {
    plugins: AnimePlugin[];
    constructor(config: AnimeClientConfig);
    _initPlugins(): Promise<boolean>;
}
export default AnimeClient;
//# sourceMappingURL=AnimeClient.d.ts.map