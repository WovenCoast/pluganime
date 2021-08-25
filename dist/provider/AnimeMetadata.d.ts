interface BasicAnimeMetadata {
    /**
     * The name of the anime
     */
    name: string;
    /**
     * The year the anime was released on (used for sorting and grouping seasons together)
     */
    year: number;
    /**
     * Url to find this anime on whichever provider serves it
     */
    url: string;
    /**
     * The provider name of this anime
     */
    provider?: string;
}
declare enum AnimeStatus {
    /**
     * It's not even released yet, just go read the manga
     */
    NOT_RELEASED = "Not released",
    /**
     * Just wait in anticipation of the MC dying, unless you've read the manga already
     */
    AIRING = "Airing",
    /**
     * bruh you're missing out go watch it all
     */
    COMPLETED = "Completed"
}
interface AnimeMetadata extends BasicAnimeMetadata {
    /**
     * A brief and non-spoiling description of this anime
     */
    description: string;
    /**
     * The genre(s) that this anime fits into
     */
    genre: string;
    /**
     * Whether the anime is not released yet, airing or completed
     */
    status: AnimeStatus;
    /**
     * All the episodes this anime has
     *
     * Note: This is set to string instead of number because there can be episodes such as '14.5' and I really don't want to deal with that in floating point numbers 🙂
     */
    episodes: string[];
    /**
     * Link to a user friendly interface of this same information
     */
    hyperlink: string;
}
export { BasicAnimeMetadata, AnimeMetadata, AnimeStatus };
//# sourceMappingURL=AnimeMetadata.d.ts.map