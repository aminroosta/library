import {BookType} from '../models/Book';
import cheerio from 'cheerio-without-node-native';
import {html} from '../api/database';
const USER_AGENT = 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3188.0 Mobile Safari/537.36';
const HEADERS = { 'Accept': 'application/json', 'Content-Type': 'application/json', 'User-Agent': USER_AGENT };

const GOOGLE_SEARCH_URL = 'https://www.googleapis.com/books/v1/volumes?orderBy=relevance&';
const AMAZON_COMPLITION_URL = 'https://completion.amazon.com/search/complete?method=completion&mkt=1&search-alias=stripbooks&';

// const GOODREAD = { key: 'cBva9rmCra8a0M4TcfasA', secret: 'WQoON9zrNZqxYznWbY4BhlGX9vEcHPZruys41NyFc' };
const GOODREAD_REVIEWS_URL = `https://www.goodreads.com/book/title`;

export const search = async query => {
   const response = await fetch(`${GOOGLE_SEARCH_URL}q=${query}`, {
      method: 'GET',
      headers: HEADERS, 
   });
   
   const result = await response.json();
   if(result.error || !result.items) {
     return [];
   }
   const items : BookType[] = result.items.map(book => {
      const { id, kind, volumeInfo } = book;

      const { title, subtitle, authors, description,
         industryIdentifiers, categories, publisher,
         publishedDate, imageLinks } = volumeInfo;

      const { smallThumbnail, thumbnail } =  imageLinks;

      const isbnInx10 = industryIdentifiers.findIndex(ind => ind.type === 'ISBN_10');
      const isbnInx13 = industryIdentifiers.findIndex(ind => ind.type === 'ISBN_13');

      return {
         id, kind, title, subtitle, authors, publisher,
         description, publishedDate, categories,
         smallThumbnail: smallThumbnail.replace('http://', 'https://'),
         thumbnail: thumbnail.replace('http://', 'https://'),
         isbn10: isbnInx10 !== -1 ? industryIdentifiers[isbnInx10].identifier : '',
         isbn13: isbnInx13 !== -1 ? industryIdentifiers[isbnInx13].identifier : '',
      }
   });
   return items;
};

export const reviews = async title => {
   const response = await fetch(`${GOODREAD_REVIEWS_URL}?title=${title}`, {
      method: 'GET',
      headers: { 'User-Agent': USER_AGENT }, 
   });

   const html = await response.text();
   console.warn(html);

   return html;
};
// reviews("See What I Have Done");

export const parseGoodread = html => {
  const $ : CheerioStatic = cheerio.load(html);
  
  const reviews = $('article.bookReview.h-review');
  console.warn(reviews.length);
  return reviews;
};
parseGoodread(html);

export const complition = async (query) => {
   const response = await fetch(`${AMAZON_COMPLITION_URL}q=${query}`, {
      method: 'GET',
      headers: HEADERS,
   });
   const result = await response.json();

   return result[1] as string[];
};

