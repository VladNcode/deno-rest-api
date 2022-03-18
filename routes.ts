import * as oak from 'https://deno.land/x/oak@v10.4.0/mod.ts';

import { getBooks, getBook, addBook, updateBook, deleteBook } from './controller.ts';

const router = new oak.Router();
router
  .get('/books', getBooks)
  .get('/books/:isbn', getBook)
  .post('/books', addBook)
  .patch('/books/:isbn', updateBook)
  .delete('/books/:isbn', deleteBook);

export default router;
