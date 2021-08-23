"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AnimePlugin_1 = __importDefault(require("@common/AnimePlugin"));
class AnimeProvider extends AnimePlugin_1.default {
    constructor(config) {
        super(config);
    }
    /**
     * Search for an anime with a string query
     * @param query Query with the anime to search for
     */
    async search(query) {
        throw new Error(`${this.config.name} doesn't have a "search" method, implement it if you want this to work ♥`);
    }
    /**
     * Fetch extended information about an anime
     * @param basic Basic metadata from search query
     */
    async fetchMetadata(basic) {
        throw new Error(`${this.config.name} doesn't have a "fetchMetadata" method, implement it if you want this to work ♥`);
    }
    /**
     * Fetch the download link of an anime episode
     *
     * Note: If there are multiple qualities for the episode, just pick the highest one
     * @param anime The anime that the episode belongs to
     * @param episode The episode selected to be fetched
     */
    async fetchDownloadLink(anime, episode) {
        throw new Error(`${this.config.name} doesn't have a "fetchDownloadLink" method, implement it if you want this to work ♥`);
    }
}
exports.default = AnimeProvider;
//# sourceMappingURL=AnimeProvider.js.map