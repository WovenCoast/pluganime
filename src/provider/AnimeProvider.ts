import AnimePlugin from "@common/AnimePlugin";
import AnimeProviderConfig from "./AnimeProviderConfig";
import {BasicAnimeMetadata, AnimeMetadata, AnimeStatus} from "./AnimeMetadata";

class AnimeProvider extends AnimePlugin {
  constructor(config: AnimeProviderConfig) {
    super(config);
  }
  /**
   * Search for an anime with a string query
   * @param query Query with the anime to search for
   */
  async search(query: string): Promise<BasicAnimeMetadata[]> {
    throw new Error(`${this.name} doesn't have a "search" method, implement it if you want this to work ♥`);
  }
  /**
   * Fetch extended information about an anime
   * @param basic Basic metadata from search query
   */
  async fetchMetadata(basic: BasicAnimeMetadata): Promise<AnimeMetadata> {
    throw new Error(`${this.name} doesn't have a "fetchMetadata" method, implement it if you want this to work ♥`);
  }
  /**
   * Fetch the download link of an anime episode 
   * 
   * Note: If there are multiple qualities for the episode, just pick the highest one
   * @param anime The anime that the episode belongs to
   * @param episode The episode selected to be fetched
   */
  async fetchDownloadLink(anime: AnimeMetadata, episode: string): Promise<string> {
    throw new Error(`${this.name} doesn't have a "fetchDownloadLink" method, implement it if you want this to work ♥`);
  }
}

export default AnimeProvider;