import PPage from "../PPage";

export default class getpocketTagPage extends PPage {
    protected hookElement: string = "article";

    public async getTwitterName(): Promise<string> {
        return this.page.evaluate(
            (userNameSelector) => document.body.querySelector(userNameSelector)!.textContent, this.hookElement);
    }

    public async thereAreArticles(): Promise<boolean> {
        const returnValue = await this.page.waitForSelector(this.hookElement).then(() => true,
        ).catch(() => false);
        return returnValue;
    }

}