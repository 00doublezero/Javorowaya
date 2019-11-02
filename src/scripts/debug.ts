import puppeteer from "puppeteer-core";
import { proxyDebugLaunch } from "../launchConfig";
import { notebookViewport } from "../viewportConfig";

(async () => {
    const browser = await puppeteer.launch(proxyDebugLaunch);
    const page = await browser.newPage();
    await page.setViewport(notebookViewport);
})();