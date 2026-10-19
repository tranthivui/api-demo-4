import { Locator, Page } from "playwright";

export class HomePage{
    readonly url="https://demoqa.com/books";
    readonly page: Page;
    readonly listBook: Locator;
    readonly loginBtn: Locator;

    constructor(page: Page){
        this.page=page;
        this.listBook=this.page.locator("//div[@class='books-wrapper']//tbody/tr");
        this.loginBtn=this.page.getByRole("button",{name: "Login"});
    }

    async getBookTitke(book: Locator): Promise<string>{
        return await book.locator("//a").innerText();
    }

    async goto(){
        await this.page.goto(this.url);
    }
}