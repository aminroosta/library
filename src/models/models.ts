import Book from './Book';
import * as database from '../api/database';

const [book1, book2, book3] = database.latest;
export const someBook = Book.create(book1);
