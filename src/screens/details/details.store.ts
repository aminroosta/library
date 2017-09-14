import Book from 'src/models/Book';
import {latest} from 'src/api/database';

const [book1, book2, book3] = latest;
export default new Book(book1);
