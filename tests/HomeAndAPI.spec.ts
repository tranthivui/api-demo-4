import { expect } from 'playwright/test';
import { test } from '../src/fixtures/api.fixture';

test('has title', async ({ homeAndAPIFixture }) => {
  let hasBook=false;
  expect(homeAndAPIFixture.listBooks.length).toBeGreaterThan(0);
  for(const book of homeAndAPIFixture.listBooks){
    expect(book.isbn).not.toBeNull();
    expect(book.title).not.toBeNull();
    expect(book.author).not.toBeNull();
    if(book.title==='Git Pocket Guide'){
      hasBook=true;
    }
  };
  expect(hasBook).toBe(true);
  console.log(hasBook);
});

