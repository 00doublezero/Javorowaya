import puppeteer from "puppeteer-core";
import { proxyDebugLaunch } from "../launchConfig";
import { notebookViewport } from "../viewportConfig";

(async () => {
    const browser: puppeteer.Browser = await puppeteer.launch(proxyDebugLaunch);
    const page: puppeteer.Page = await browser.newPage();
    await page.setViewport(notebookViewport);
    await page.goto("https://www.whatismyip.com/");
    await browser.close();
})();