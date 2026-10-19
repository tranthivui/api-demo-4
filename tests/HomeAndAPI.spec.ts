import { expect } from '@playwright/test';
import { test } from '../src/fixtures/api.fixture';

test('has title', async ({ homeAndAPIFixture }) => {
  const bookTitle='Git Pocket Guide';
  expect(homeAndAPIFixture.listBooks.length).toBeGreaterThan(0);
  for(const book of homeAndAPIFixture.listBooks){
    expect(book.isbn).toEqual(expect.any(String));
    expect(book.isbn).not.toBe("");
    expect(book.title).toEqual(expect.any(String));
    expect(book.title).not.toBe("");
    expect(book.author).toEqual(expect.any(String));
    expect(book.author).not.toBe("");
  };
  expect(homeAndAPIFixture.listBooks.map(b => b.title)).toContain(bookTitle);
});

