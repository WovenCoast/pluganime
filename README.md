### Official builds private until alpha release

# pluganime

[![CodeQL](https://github.com/WovenCoast/pluganime/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/WovenCoast/pluganime/actions/workflows/codeql-analysis.yml) \*more of them fancy badges coming soon 😉\*

# Todo

- [x] Make class for initial client that interfaces everything
  - [ ] Make methods to interface with the AnimePlugin
  - [ ] Add on event handlers for all the AnimeWatcher plugins
- [x] Make base class AnimePlugin to extend everything else out of
- [x] Make class for AnimeProvider plugin (basically the API to access the anime in an anime website)
- [ ] Make class for AnimeWatcher plugin (basically the anime player, could also be something that reports to stuff like myanimelist or discord rpc or whatever else there is)
  - [x] Add custom event handler to invoke functions automatically
  - [ ] Allow optional reporting back for anime watcher plugins

oh and, everything is in typescript ♥
