import Book from './Book.js';
import * as database from '../api/database.js';

const [book1, book2, book3] = database.latest;
export const someBook = Book.create(book1);
