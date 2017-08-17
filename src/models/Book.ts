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
   }, {
   }
);

export default Book;
export type BookType = typeof Book.Type;
