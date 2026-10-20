import { expect } from '@playwright/test';
import { test } from '../src/fixtures/api.fixture';
import { GET_BOOK } from '../src/config/path';
import { Book, GetBookRes } from '../src/type/book';
import booksJson from "../src/data/books.json";
import { BookPage } from '../src/pages/BookPage.page';
import noBook from '../src/data/nobook.json'

test('API get list book', async ({ request }) => {
  const bookTitle='Git Pocket Guide';
  const getBooksRes = await request.get(GET_BOOK);
  expect(getBooksRes.status()).toBe(200);
  const listBookData: GetBookRes = await getBooksRes.json();
  const listBooks: Book[] = listBookData.books;
  expect(listBooks.length).toBeGreaterThan(0);
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

test("Verify UI and API",async({homeAndAPIFixture})=>{
  const bookTitleAPI=homeAndAPIFixture.listBooks.map(book => book.title);
  await expect(homeAndAPIFixture.bookPage.listBook).toHaveText(bookTitleAPI);
});

test("Mock data: Fake book",async({page})=>{
  const bookPage=new BookPage(page);
  await bookPage.page.route(GET_BOOK, async route =>{
    await route.fulfill({status: 200, json: booksJson});
  });
  await bookPage.goto();
  await expect(bookPage.listBook).toHaveText(booksJson.books.map(book => book.title));
});


test("Mock data: Not have book",async({page})=>{
  const textNoData="Page 1 of 0";
  const bookPage=new BookPage(page);
  await bookPage.page.route(GET_BOOK, async route =>{
    await route.fulfill({status: 200, json: noBook});
  });
  await bookPage.goto();
  await expect(bookPage.listBook).toHaveCount(0);
  expect(await bookPage.showPagenumber.innerText()).toEqual(textNoData);
});
