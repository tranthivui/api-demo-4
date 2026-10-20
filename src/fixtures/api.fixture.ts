import { BookPage } from "../pages/BookPage.page";
import {test as base, expect, request as playwrightRequest} from "@playwright/test";
import { Book, GetBookRes } from "../type/book";
import { BASE_URL, GET_BOOK } from "../config/path";

export {test as base, request as playwrightRequest} from "@playwright/test";

type HomeAndAPI={
    bookPage: BookPage,
    listBooks: Book []
};

type HomeAndAPIFixture={
    homeAndAPIFixture: HomeAndAPI
};

export const test=base.extend<HomeAndAPIFixture>({
    homeAndAPIFixture: async({page,request},use)=>{
        const bookPage=new BookPage(page);
        await bookPage.goto();
        await expect(bookPage.loginBtn).toBeEnabled();
        const getBookRes =await request.get(GET_BOOK);
        expect(getBookRes.status()).toEqual(200);
        const getBookData : GetBookRes=await getBookRes.json();
        const listBooks : Book[]=getBookData.books;
        await use({bookPage,listBooks});
    }
})