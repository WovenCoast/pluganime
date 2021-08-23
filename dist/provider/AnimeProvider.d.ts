import AnimePlugin from "@common/AnimePlugin";
import AnimeProviderConfig from "./AnimeProviderConfig";
import { BasicAnimeMetadata, AnimeMetadata } from "./AnimeMetadata";
declare class AnimeProvider extends AnimePlugin {
    constructor(config: AnimeProviderConfig);
    /**
     * Search for an anime with a string query
     * @param query Query with the anime to search for
     */
    search(query: string): Promise<BasicAnimeMetadata[]>;
    /**
     * Fetch extended information about an anime
     * @param basic Basic metadata from search query
     */
    fetchMetadata(basic: BasicAnimeMetadata): Promise<AnimeMetadata>;
    /**
     * Fetch the download link of an anime episode
     *
     * Note: If there are multiple qualities for the episode, just pick the highest one
     * @param anime The anime that the episode belongs to
     * @param episode The episode selected to be fetched
     */
    fetchDownloadLink(anime: AnimeMetadata, episode: string): Promise<string>;
}
export default AnimeProvider;
//# sourceMappingURL=AnimeProvider.d.ts.map