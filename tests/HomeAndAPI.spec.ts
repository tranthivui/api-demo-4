import { expect } from '@playwright/test';
import { test } from '../src/fixtures/api.fixture';
import { GET_BOOK } from '../src/config/path';
import { Book, GetBookRes } from '../src/type/book';

test('API get list book', async ({ request }) => {
  const bookTitle='Git Pocket Guide';
  const getBooksRes = await request.get(GET_BOOK);
  expect(getBooksRes.status()).toEqual(200);
  const listBookData: GetBookRes = await getBooksRes.json();
  const listBooks: Book[] = listBookData.books;
  expect(listBookData.books.length).toBeGreaterThan(0);
  for(const book of listBooks){
    expect(book.isbn).toEqual(expect.any(String));
    expect(book.isbn).not.toBe("");
    expect(book.title).toEqual(expect.any(String));
    expect(book.title).not.toBe("");
    expect(book.author).toEqual(expect.any(String));
    expect(book.author).not.toBe("");
  };
  expect(listBooks.map(b => b.title)).toContain(bookTitle);
});

