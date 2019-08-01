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
            logger.info(`Can't navigate to page '${path}'. Programm terminated.`);
            process.exit();
        });
        logger.info(`User navigated to page ${path}`);
    }

    public async clearInput(selector: string) {
        await this.page.evaluate((selector: string) => {
            document.body.querySelector(selector)!.setAttribute("value", "");
        }, selector);
        logger.info(`Text input for "${selector}" selector cleared`);
    }

    // async screenshot() {
    //     const uuid = await uuidv4();
    //     await this.page.screenshot({ path: uuid + ".png" });
    //     logger.info(`The screenshot was taken`)
    // }

    public async waitUntilPageLoaded() {
        await this.page.waitForSelector(this.hookElement, { timeout: 10000 }).catch(() => {
            logger.info(`Can't load element '${this.hookElement}'. Programm terminated.`);
            process.exit();
        });
        await this.page.waitForSelector("body").catch(() => {
            logger.info(`Can't navigate to page '${"body"}'. Programm terminated.`);
            process.exit();
        });
        logger.info(`After load page user on page: ${await this.page.title()}`);
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
            logger.info(`Page scrolled down`);
        }
    }

}