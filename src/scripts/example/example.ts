import puppeteer from "puppeteer-core";
import { proxyDebugLaunch } from "../../launchConfig";
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
        console.log("Text on header: " + exampleText);
    }
    await browser.close();
})();