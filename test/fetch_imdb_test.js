import fs from 'fs';
import { expect } from 'chai';
import MockDate from 'mockdate';
import FetchMock from './fetch_mock.mjs';
import fetchImdb from '../src/fetch_imdb.mjs';

describe('FetchImdb', () => {
  it('returns a rss feed for a imdb ratings page', async () => {
    MockDate.set('Wed, 10 Dec 2017 19:04:57 GMT');

    const mock = new FetchMock();
    mock.addPage(fs.readFileSync('./test/data/imdb.html').toString());

    const rss = fs.readFileSync('./test/data/imdb.rss').toString();
    const result = await fetchImdb('ur123456', (url, params) => mock.fetch(url, params));

    expect(result).to.eql(rss);

    MockDate.reset();
  }).timeout(2000);

  it('returns an empty rss feed when the imdb ratings page was empty', async () => {
    MockDate.set('Wed, 10 Dec 2017 19:04:57 GMT');

    const mock = new FetchMock();
    mock.addPage(fs.readFileSync('./test/data/imdb_not_found.html').toString());

    const rss = fs.readFileSync('./test/data/imdb_not_found.rss').toString();
    const result = await fetchImdb('ur123456', (url, params) => mock.fetch(url, params));

    expect(result).to.eql(rss);

    MockDate.reset();
  }).timeout(1000);
});
