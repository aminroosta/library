import { types } from 'mobx-state-tree';



const Book = types.model(
   'Book', {
      id: types.string,
      kind: types.string,
      title: types.string,
      subtitle: '',
      authors: types.array(types.string),
      publisher: types.string,
      publishedDate: types.string,
      description: types.string,
      smallThumbnail: '',
      thumbnail: '',
      categories: types.array(types.string),
      isbn10: '',
      isbn13: '',
   }, {
   }
);

export default Book;
export type BookType = typeof Book.Type;
