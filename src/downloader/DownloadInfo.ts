import { AnimeMetadata } from "@provider/AnimeMetadata";

interface DownloadInfo {
  /**
   * Provider of this anime
   */
  provider: string;
  /**
   * All the anime metadata
   */
  anime: AnimeMetadata;
  /**
   * The episode this download is responsible for
   */
  episode: string;
  /**
   * A number between 0 and 100 denoting the progress of the download
   */
  progress: number;
  /**
   * Whether the client has evaluated this download yet. Evaluated in this sense means whether the client has checked if the file exists in the directory already or how much of it is downloaded or whatnot
   */
  evaluated: boolean;
  /**
   * The download url for this download, will be fetched if not provided
   */
  url?: string;
}

export {
  DownloadInfo
}