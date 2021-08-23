"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
class AnimeClient extends events_1.default {
    constructor(config) {
        super();
        this.plugins = config.plugins;
        this._initPlugins().then(() => this.emit('init'));
    }
    async _initPlugins() {
        // run the init function for every plugin
        const promises = this.plugins.map(async (plugin) => {
            return await plugin.init();
        });
        // wait for all the promises to be resolved
        await Promise.all(promises);
        // return true if all the promises are correctly resolved
        return promises.every(p => !!p);
    }
}
exports.default = AnimeClient;
//# sourceMappingURL=AnimeClient.js.map