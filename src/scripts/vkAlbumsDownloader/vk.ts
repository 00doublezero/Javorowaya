import program from "commander";
import puppeteer from "puppeteer-core";
import { proxyDebugLaunch } from "../../launchConfig";
import logger from "../../loggerConfig";
import {linksLine2Line} from "../../utils/inputParser";
import {vkAlbumsLinkValidate} from "../../utils/validator";
import { notebookViewport } from "../../viewportConfig";

program
  .requiredOption("-i, --input <input>", "Input file", linksLine2Line);
program.parse(process.argv);
const inputLinks: string[] = program.input;
const vkAlbumsValidLinks = inputLinks.filter((link: string) => {
  if (vkAlbumsLinkValidate(link.trim()) === true) {
    return true;
  } else {
    logger.dbg(link + ": Not a link to the album");
    return false;
  }
});

(async () => {
    const browser = await puppeteer.launch(proxyDebugLaunch);
    const vkPage = await browser.newPage();
    await vkPage.setViewport(notebookViewport);

    const megaPage = await browser.newPage();
    await megaPage.setViewport(notebookViewport);

    await browser.close();
})();