import { Page } from "puppeteer-core";
import logger from "../../loggerConfig";
import { createDir } from "../../utils";

export default abstract class PuppeteerPage {
    public page: Page;
    protected hookElement!: string;

    constructor(page: Page) {
        this.page = page;
    }

    public async open(path: string) {
        await this.page.goto(path).catch(() => {
            logger.msg(`Can't navigate to page '${path}'. Programm terminated.`);
            process.exit();
        });
        logger.msg(`User navigated to page ${path}`);
    }

    public async clearInput(selector: string) {
        await this.page.evaluate((selector: string) => {
            document.body.querySelector(selector)!.setAttribute("value", "");
        }, selector);
        logger.msg(`Text input for "${selector}" selector cleared`);
    }

    // async screenshot() {
    //     const uuid = await uuidv4();
    //     await this.page.screenshot({ path: uuid + ".png" });
    //     logger.msg(`The screenshot was taken`)
    // }

    public async waitUntilPageLoaded() {
        // FIX: should completely rewrite this important method
        await this.page.waitForSelector(this.hookElement, { timeout: 10000 }).catch(() => {
            logger.err(`Can't load element '${this.hookElement}'. Programm terminated.`);
            process.exit();
        });
        await this.page.waitForSelector("body").catch(() => {
            logger.err(`Can't navigate to page '${"body"}'. Programm terminated.`);
            process.exit();
        });
        logger.msg(`The page is loaded and its title: ${await this.page.title()}`);
    }

    public async getHREF(aElement: string): Promise<string> {
        return await this.page.evaluate((aElement: string) => {
            return document.querySelector(aElement)!.getAttribute("href")!;
        }, aElement);
    }
    public async getSRC(aElement: string): Promise<string> {
        return await this.page.evaluate((aElement: string) => {
            return document.querySelector(aElement)!.getAttribute("src")!;
        }, aElement);
    }
    public async quit() {
        await this.page.close();
    }

    public async createDirFromTextContentOfElement(selector: string): Promise<string> {
        const textOfElement: string = await this.page.evaluate((selector: string) => {
            return document.querySelector(selector)!.textContent!;
        }, selector);
        const dirName = await createDir(textOfElement);
        return dirName;
    }
    public async getElementText(selector: string): Promise<string> {
        return await this.page.evaluate((selector) => {
            return document.querySelector(selector)!.textContent!;
        }, selector);
    }

    public async scrollDownPage() {
        let previousHeight = await this.page.evaluate(() => document.body.scrollHeight);
        let currentHeight = 0;
        try {
            while (previousHeight !== currentHeight) {
                previousHeight = await this.page.evaluate(() => document.body.scrollHeight);
                await this.page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
                await this.page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
                await this.page.waitFor(500);
                currentHeight = await this.page.evaluate("document.body.scrollHeight");
            }
        } catch (e) {
            logger.msg(`Page scrolled down`);
        }
    }

}