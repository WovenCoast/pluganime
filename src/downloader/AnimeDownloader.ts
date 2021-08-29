import AnimeProvider from "@provider/AnimeProvider";
import EventEmitter from "events";
import path from "path/posix";
import AnimeClient from "src/client/AnimeClient";
import { DownloadInfo } from "src/downloader/DownloadInfo";
import AnimeDownloaderConfig from "./AnimeDownloaderConfig";

class AnimeDownloader extends EventEmitter implements AnimeDownloaderConfig {
  client: AnimeClient;

  queue: DownloadInfo[];
  downloadPath: string;

  constructor(client: AnimeClient, config: AnimeDownloaderConfig) {
    super();
    if (!client) throw new Error(`Anime downloader cannot work without it's client!`);
    this.client = client;
    this.queue = config.queue || [];
    this.downloadPath = config.downloadPath;
    client.on('queueUpdated', (() => {
      this._download.bind(this)();
    }).bind(this));
  }
  async _download() {
    let download = this.queue[0];
    if (!download) return true;
    if (!download.evaluated) download = await this._evaluate(download);
  }
  async _evaluate(download: DownloadInfo) {
    if (!download.url) download.url = await (<AnimeProvider>this.client.getPlugin(download.provider)).fetchDownloadLink(download.anime, download.episode);
    const p = path.join(this.downloadPath, this._filename(download.anime.name), this._episodeFormat(download.episode))
    return download;
  }
  _filename(name: string) {
    return name.replace(
      new RegExp(
        ["*", "?", '"', "<", ">", ":", "|", ".", "\\", "/"] // windows filename invalid characters
          .map((t) => "\\" + t).join("|"), 
        "g"
      ), 
      "-"
    );
  }
  _episodeFormat(episode: string) {
    return episode.replace(/0/g, '');
  }
}

export default AnimeDownloader;