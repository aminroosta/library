import co from 'co';

const GOOGLE_SEARCH_URL = 'https://www.googleapis.com/books/v1/volumes';
const AMAZON_COMPLITION_URL = 'https://completion.amazon.com/search/complete?method=completion&mkt=1&search-alias=stripbooks&';

const HEADERS = { 'Accept': 'application/json', 'Content-Type': 'application/json' };

export const search = query => co(function*(){
   const response = yield fetch(`${GOOGLE_SEARCH_URL}?q=${query}`, {
      method: 'GET',
      headers: HEADERS, 
   });
   
   const result = yield response.json();
   return result.items;
});

export const complition = (query) => co(function*(){
   const response = yield fetch(`${AMAZON_COMPLITION_URL}q=${query}`, {
      method: 'GET',
      headers: HEADERS,
   });
   const result = yield response.json();

   console.warn(query, JSON.stringify(result));
   return result[1];
});

