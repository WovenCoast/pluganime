import AnimePlugin from "@common/AnimePlugin";
import { DownloadInfo } from "../downloader/DownloadInfo";

export default interface AnimeClientConfig {
  plugins: AnimePlugin[];
  downloadPath?: string;
  downloadQueue?: DownloadInfo[];
}