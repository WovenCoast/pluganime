import { DownloadInfo } from "./DownloadInfo";

export default interface AnimeDownloaderConfig {
  queue: DownloadInfo[];
  downloadPath: string;
}