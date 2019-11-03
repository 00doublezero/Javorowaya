import puppeteer from "puppeteer-core";
import { proxyDebugLaunch } from "../../launchConfig";
import * as revisor from "../../utils/revisor";
import { notebookViewport } from "../../viewportConfig";
import ExamplePage from "../pages/example/ExamplePage";

(async () => {
    const browser = await puppeteer.launch(proxyDebugLaunch);
    const page = await browser.newPage();
    await page.setViewport(notebookViewport);
    {
        const examplePage = new ExamplePage(page);
        await examplePage.open("https://example.com");
        await examplePage.waitUntilPageLoaded();
        const exampleText = await examplePage.getElementText("h1");
        revisor.strictEqual(exampleText, "Example Domain1", "Example page has no such text");
    }
    await browser.close();
})();