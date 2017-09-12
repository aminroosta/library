import {memoize} from '../common/utils';
import * as parsers from './parsers';

const GOODREAD = {
  key: 'cBva9rmCra8a0M4TcfasA',
  secret: 'WQoON9zrNZqxYznWbY4BhlGX9vEcHPZruys41NyFc',
};
const URLs = {
  getByTitle:
    title => `https://www.goodreads.com/book/title?title=${title}&format=xml&key=${GOODREAD.key}`,
  searchByQuery:
    query => `https://www.goodreads.com/search/index.xml?q=${query}&key=${GOODREAD.key}]`,
};

export const searchByQuery = memoize(async (query: string) => {
  const response = await fetch(URLs.searchByQuery(query), { method: 'GET' });
  const xml = await response.text();
  return parsers.parseSearchByQuery(xml);
});

export const review = memoize(async (title: string) => {
   const response = await fetch(URLs.getByTitle(title), {method: 'GET'});
   const xml = await response.text();
   return parsers.parseGoodreadXml(xml);
});

export const comments = memoize(async (url: string) => {
   const response = await fetch(url, {method: 'GET'});
   const html = await response.text();
   return parsers.parseGoodreadHtml(html);
});

