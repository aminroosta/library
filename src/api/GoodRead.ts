import {memoize} from '../common/utils';
import * as parsers from './parsers';

const GOODREAD = {
  key: 'cBva9rmCra8a0M4TcfasA',
  secret: 'WQoON9zrNZqxYznWbY4BhlGX9vEcHPZruys41NyFc',
};
const URLs = {
  getByTitle:
    title => `https://www.goodreads.com/book/title?title=${title}&format=xml&key=${GOODREAD.key}`,
  getById:
    id => `https://www.goodreads.com/book/show?format=xml&key=${GOODREAD.key}&id=${id}&text_only=true`,
  getByQuery:
    query => `https://www.goodreads.com/search/index.xml?q=${query}&key=${GOODREAD.key}]`,
};

const get = async (url: string) => {
  const response = await fetch(url, { method: 'GET' });
  const text = await response.text();
  return text;
};

export const getByQuery = (query: string) => get(URLs.getByQuery(query));
export const getById = (id: string | number) => get(URLs.getById(id));
export const getByIframe = get;
export const getReviewByUrl = get;

export const searchByQuery = memoize(async (query: string) => {
  const xml = await getByQuery(query);
  return parsers.parseGetByQuery(xml);
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

