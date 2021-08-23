import AnimeIntegration from "@integration/AnimeIntegration";
import AnimeProvider from "@provider/AnimeProvider";
import AnimeWatcher from "@watcher/AnimeWatcher";

type AnimePlugin = AnimeIntegration | AnimeProvider | AnimeWatcher;
export default AnimePlugin;