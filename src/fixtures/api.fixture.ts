import { APIRequestContext, request } from "@playwright/test";
import { HomePage } from "../pages/HomePage.page";
import {test as base, expect, request as playwrightRequest} from "@playwright/test";
import { Book, GetBookRes } from "../type/book";
import { BASE_URL, GET_BOOK } from "../config/path";

export {test as base, request as playwrightRequest} from "@playwright/test";

type HomeAndAPI={
    homePage: HomePage,
    listBooks: Book []

};

type HomeAndAPIFixture={
    homeAndAPIFixture: HomeAndAPI
};

export const test=base.extend<HomeAndAPIFixture>({
    homeAndAPIFixture: async({page,request},use)=>{
        const homePage=new HomePage(page);
        await homePage.goto();
        await expect(homePage.loginBtn).toBeEnabled();
        const getBookRes =await request.get(GET_BOOK);
        expect(getBookRes.status()).toEqual(200);
        const getBookData : GetBookRes=await getBookRes.json();
        const listBooks : Book[]=getBookData.books;
        await use({homePage,listBooks});
    }
})