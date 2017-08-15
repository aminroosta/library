const GOOGLE_SEARCH_URL = 'https://www.googleapis.com/books/v1/volumes?orderBy=relevance&projection=lite&';
const AMAZON_COMPLITION_URL = 'https://completion.amazon.com/search/complete?method=completion&mkt=1&search-alias=stripbooks&';

const HEADERS = { 'Accept': 'application/json', 'Content-Type': 'application/json' };

export const search = async query => {
   const response = await fetch(`${GOOGLE_SEARCH_URL}q=${query}`, {
      method: 'GET',
      headers: HEADERS, 
   });
   
   const result = await response.json();
   const items : Book[] = result.map(book => {
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

export const complition = async (query) => {
   const response = await fetch(`${AMAZON_COMPLITION_URL}q=${query}`, {
      method: 'GET',
      headers: HEADERS,
   });
   const result = await response.json();

   return result[1] as string[];
};

export interface Book {
   id: string;
   kind: string;
   title: string;
   subtitle?: string;
   authors: string[]
   publisher: string,
   publishedDate: string,
   description: string,
   smallThumbnail?: string
   thumbnail?: string
}
