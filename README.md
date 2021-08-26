### Official builds private until alpha release

# pluganime

[![CodeQL](https://github.com/WovenCoast/pluganime/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/WovenCoast/pluganime/actions/workflows/codeql-analysis.yml) \*more of them fancy badges coming soon 😉\*

Plugin based plug-and-play anime :D

# Usage

~plz don't kill me the plugin's actually kinda useless right now :(~

# Contributing

- Fork this repository
- Run `yarn install` (if you don't have yarn, install it with `npm i -g yarn`)
- Code your heart out ♥
- ~Run `npm test` to make sure the tests are running fine~

# Maintainers

With love from [![yoon](https://github.com/WovenCoast.png?size=25) WovenCoast](https://github.com/WovenCoast) ♥

# Contributors

Show these guys some love and support too! ♥

- [![yoon](https://github.com/yoon4027.png?size=25) : yoon4027](https://github.com/yoon4027)

# Todo

- [x] Make class for initial client that interfaces everything
  - [ ] Make methods to interface with the AnimePlugin
  - [ ] Add on event handlers for all the AnimeWatcher plugins
- [x] Make base class AnimePlugin to extend everything else out of
- [x] Make class for AnimeProvider plugin (basically the API to access the anime in an anime website)
- [ ] Make class for AnimeWatcher plugin (basically the anime player, could also be something that reports to stuff like myanimelist or discord rpc or whatever else there is)
  - [x] Add custom event handler to invoke functions automatically
  - [ ] Allow optional reporting back for anime watcher plugins
- [ ] Make test plugins
  - [ ] Make fake provider with fake animes
  - [ ] Make fake watcher which simply logs all the events and returns them to the test suite
  - [ ] Simulate a user making requests to the provider via the client

oh and, everything is in typescript ♥
