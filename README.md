# imdbrss

[![Build Status](https://travis-ci.org/bitboxer/imdbrss.svg?branch=master)](https://travis-ci.org/bitboxer/imdbrss)

# Run locally

To run the server locally you need to install node, npm and yarn. After
that follow these steps:

```shell
yarn
npm start
```

The rss feed will be reachable under `localhost:4000/rss/{{IMDB User ID}}`.

To get your imdb user id go to your ratings and check for this part of the url:

```
http://www.imdb.com/user/ur7019649/ratings
                         ---------
```
