import { expect } from '@playwright/test';
import { test } from '../src/fixtures/api.fixture';

test('has title', async ({ homeAndAPIFixture }) => {
  let hasTitle=false;
  const bookTitle='Git Pocket Guide';
  expect(homeAndAPIFixture.listBooks.length).toBeGreaterThan(0);
  for(const book of homeAndAPIFixture.listBooks){
    expect(book.isbn).not.toBeNull();
    expect(book.title).not.toBeNull();
    expect(book.author).not.toBeNull();
  };
  expect(homeAndAPIFixture.listBooks.map(b => b.title)).toContain(bookTitle);
});

