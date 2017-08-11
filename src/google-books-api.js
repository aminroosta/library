const GOOGLE_SEARCH_URL = 'https://www.googleapis.com/books/v1/volumes?orderBy=relevance&projection=lite&';
const AMAZON_COMPLITION_URL = 'https://completion.amazon.com/search/complete?method=completion&mkt=1&search-alias=stripbooks&';

const HEADERS = { 'Accept': 'application/json', 'Content-Type': 'application/json' };

/**
 * @param {string} query
 * @returns {PromiseLike<Book[]>}
 */
export const search = async query => {
   const response = await fetch(`${GOOGLE_SEARCH_URL}q=${query}`, {
      method: 'GET',
      headers: HEADERS, 
   });
   
   const result = await response.json();
   const items = result.map(book => {
      const { id, kind, volumeInfo } = book;
      const { title, subtitle, authors, description,
         publisher, publishedDate, imageLinks } = volumeInfo;
      const { smallThumbnail, thumbnail } =  imageLinks;

      return {
         id, kind, title, subtitle, authors, publisher,
         description, publishedDate, smallThumbnail, thumbnail
      }
   });
   return items;
};

/**
 * @param {string} query
 * @returns {PromiseLike<string[]>}
 */
export const complition = async (query) => {
   const response = await fetch(`${AMAZON_COMPLITION_URL}q=${query}`, {
      method: 'GET',
      headers: HEADERS,
   });
   const result = await response.json();

   return result[1];
};

