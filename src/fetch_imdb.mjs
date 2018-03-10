import 'babel-polyfill';
import cheerio from 'cheerio';
import moment from 'moment';
import nodeFetch from 'node-fetch';
import RSS from 'rss';
import loadUrl from './load_url.mjs';

function parseEntry(row) {
  const entry = cheerio(row);
  const titleElement = entry.find('.lister-item-header a');
  const rating = entry.find('.ipl-rating-star--other-user .ipl-rating-star__rating').text();
  const title = `Rated "${titleElement.text()}" ${rating}/10`;
  const url = `http://www.imdb.com${titleElement.attr('href')}`;
  const content = Array.from(entry.find('.lister-item-content p'));
  const date = moment(cheerio(content[1]).text().replace('Rated on', '').trim(), 'DD MMM YYYY').toDate();
  const text = cheerio(content[2]).text();
  const image = entry.find('.lister-item-image img').attr('loadlate');
  const description = `<img src="${image}"/><p>${text}</p>`;

  return {
    title,
    date,
    url,
    description,
  };
}

function parseHTML(result) {
  return new Promise((resolve) => {
    const feed = new RSS({
      title: 'Imdb Ratings RSS Feed',
      site_url: 'http://imdbrss.bitboxer.de',
      description: 'Feed for Imdb user ratings',
      pubDate: 'May 20, 2012 04:00:00 GMT',
    });
    const page = cheerio.load(result.body);
    const rows = Array.from(page('#ratings-container .lister-item'));

    for (const row of rows) {
      feed.item(parseEntry(row));
    }

    resolve(feed.xml());
  });
}

export default function (userId, fetchInstance) {
  const fetcher = fetchInstance || nodeFetch;

  return loadUrl(fetcher, `http://www.imdb.com/user/${userId}/ratings`)
    .then(parseHTML);
}
