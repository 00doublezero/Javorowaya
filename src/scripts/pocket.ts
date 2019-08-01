import fsExtra from "fs-extra";
import puppeteer from "puppeteer-core";
import { debugLaunch } from "../launchConfig";
import { notebookViewport } from "../viewportConfig";
import getpocketTagPage from "./pages/getpocket/getpocketTagPage";

const articlesDirectory = "articles/";
const metaString = "<meta charset='UTF-8'>";
const pocketURL: string = "https://app.getpocket.com";

(async () => {
  await fsExtra.ensureDirSync(articlesDirectory);
  const browser: puppeteer.Browser = await puppeteer.launch(debugLaunch);
  const page: puppeteer.Page = await browser.newPage();
  await page.setViewport(notebookViewport);
  // await page.setJavaScriptEnabled(false);
  {
    /* Open getpocket page */

    const kindleTagURL = "/tags/kindle";
    const getpocketKindleTagPage = new getpocketTagPage(page);
    await getpocketKindleTagPage.open(pocketURL + kindleTagURL);
    await getpocketKindleTagPage.waitUntilPageLoaded();
    {
      for (;;) {
        const isArticle = getpocketKindleTagPage.thereAreArticles();
        if (!isArticle) {
          break;
        }
        const link = await page.evaluate(() => {
          return document.querySelector("article>a")!.getAttribute("href");
        });
      }
    }
  }

  // while (whileTrue) {
  //   await page.waitForSelector("article").then(async () => {
  //     /* open first article */
  //     const link = await page.evaluate(() => {
  //       return document.querySelector("article>a")!.getAttribute("href");
  //     });
  //     // const pocketLink = await getLinksOfPocketArticle(page);
  //     const pocketArticlePage: puppeteer.Page = await browser.newPage();
  //     await pocketArticlePage.setViewport(notebookViewport);
  //     await pocketArticlePage.goto(pocketURL + link);
  //     await pocketArticlePage.waitForSelector("div[lang]");
  //     /* get data of article */
  //     const pocketArticleTile = await pocketArticlePage.evaluate(() => {
  //       return document.querySelector("h1")!.textContent!.replace(/\s+/g, "").replace(".", "");
  //     });
  //     const pocketArticleLink = await pocketArticlePage.evaluate(() => {
  //       document.querySelector("a")!.setAttribute("target", "_self");
  //       return document.querySelector("a")!.outerHTML;
  //     });
  //     const pocketArticleText = await pocketArticlePage.evaluate(() => {
  //       document.querySelectorAll("[nodeindex]").forEach((elem) => { elem.removeAttribute("nodeindex"); });
  //       document.querySelectorAll("[brd]").forEach((elem) => { elem.removeAttribute("brd"); });
  //       return document.querySelector("div[lang]")!.outerHTML;
  //     });
  //     const articleFileName = articlesDirectory + pocketArticleTile + ".html";
  //     await fsExtra.outputFileSync(articleFileName, metaString + pocketArticleLink + pocketArticleText);
  //     /* delete article from kindle category */
  //     const tagButton = await pocketArticlePage.$("[aria-label='Tag']");
  //     await tagButton!.click();
  //     await pocketArticlePage.waitForSelector("button[type='disabled']", { visible: true });
  //     const kindleTagButton = await pocketArticlePage.$(".css-15h7uop>button");
  //     await kindleTagButton!.click();
  //     await pocketArticlePage.waitForSelector("button[type='cta']", { visible: true });
  //     const tagSaveButton = await pocketArticlePage.$("button[type='cta']");
  //     await tagSaveButton!.click();
  //     await pocketArticlePage.close();
  //     await page.reload();
  //   }).catch(() => {
  //     console.error("There are no more articles.");
  //     whileTrue = false;
  //   });
  // }

  // /* get all files in articles directory */
  // await fsExtra.readdirSync(articlesDirectory).forEach((file) => {
  //   fsExtra.appendFileSync("index.html", `<a href="${articlesDirectory + file}" target="_self">${file}</a><br>`);
  // });
  // await browser.close();

})();