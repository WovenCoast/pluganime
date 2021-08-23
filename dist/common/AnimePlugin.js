"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
class AnimePlugin extends events_1.default {
    constructor(config) {
        super();
        this.config = config;
        this.name = config.name;
    }
    init() {
        this.emit('init');
        return true;
    }
}
exports.default = AnimePlugin;
//# sourceMappingURL=AnimePlugin.js.map