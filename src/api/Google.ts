import Book from '../models/Book';
import {USER_AGENT} from '../common/constants';
const HEADERS = { 'Accept': 'application/json', 'Content-Type': 'application/json', 'User-Agent': USER_AGENT };

const GOOGLE_SEARCH_URL = 'https://www.googleapis.com/books/v1/volumes?orderBy=relevance&';
const AMAZON_COMPLITION_URL = 'https://completion.amazon.com/search/complete?method=completion&mkt=1&search-alias=stripbooks&';

export const search = async query => {
   const response = await fetch(`${GOOGLE_SEARCH_URL}q=${query}`, {
      method: 'GET',
      headers: HEADERS, 
   });
   
   const result = await response.json();
   if(result.error || !result.items) {
     return [];
   }
   const items : Book[] = result.items.map(book => {
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


export const complition = async (query) => {
   const response = await fetch(`${AMAZON_COMPLITION_URL}q=${query}`, {
      method: 'GET',
      headers: HEADERS,
   });
   const result = await response.json();

   return result[1] as string[];
};

