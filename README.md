# IMDb user ratings rss

[![Build Status](https://github.com/bitboxer/imdbrss/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/bitboxer/imdbrss/actions/workflows/node.js.yml)

This little tool creates a rss feed based on the public ratings of
an IMDb user.

# Run locally

To run the server locally you need to install node, npm and yarn. After
that follow these steps:

```shell
yarn
yarn start
```

The rss feed will be reachable under `localhost:4000/rss/{{IMDb User ID}}`.

To get your IMDb user id go to your ratings and check for this part of the url:

```
http://www.imdb.com/user/ur7019649/ratings
                         ---------
```

# Development

Before submitting a PR please run `yarn checks` to see if everything is working.