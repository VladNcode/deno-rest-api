import { Request, Response } from 'https://deno.land/x/oak@v10.4.0/mod.ts';

interface IBook {
  isbn: string;
  author: string;
  title: string;
}

let books: Array<IBook> = [
  {
    isbn: '1',
    author: 'Robin Wieruch',
    title: 'The Road to React',
  },
  {
    isbn: '2',
    author: 'Kyle Simpson',
    title: "You Don't Know JS: Scope & Closures",
  },
  {
    isbn: '3',
    author: 'Andreas A. Antonopoulos',
    title: 'Mastering Bitcoin',
  },
];

const getBooks = ({ response }: { response: Response }) => {
  response.body = books;
};

const getBook = ({ params, response }: { params: { isbn: string }; response: Response }) => {
  const book: IBook | undefined = searchBookByIsbn(params.isbn);
  if (book) {
    response.status = 200;
    response.body = book;
  } else {
    response.status = 404;
    response.body = { message: `Book not found.` };
  }
};

const addBook = async ({ request, response }: { request: Request; response: Response }) => {
  const body = await request.body().value;
  const book: IBook = body;
  books.push(book);
  response.body = { message: 'OK' };
  response.status = 200;
};

const updateBook = async ({
  params,
  request,
  response,
}: {
  params: { isbn: string };
  request: Request;
  response: Response;
}) => {
  let book: IBook | undefined = searchBookByIsbn(params.isbn);
  if (book) {
    const body = await request.body().value;
    const updateInfos: { author?: string; title?: string } = body;
    book = { ...book, ...updateInfos };
    books = [...books.filter(book => book.isbn !== params.isbn), book];
    response.status = 200;
    response.body = { message: 'OK' };
  } else {
    response.status = 404;
    response.body = { message: `Book not found` };
  }
};

const deleteBook = ({ params, response }: { params: { isbn: string }; response: Response }) => {
  books = books.filter(book => book.isbn !== params.isbn);
  response.body = { message: 'OK' };
  response.status = 200;
};

const searchBookByIsbn = (isbn: string): IBook | undefined =>
  books.filter(book => book.isbn === isbn)[0];

export { getBooks, getBook, addBook, updateBook, deleteBook };
