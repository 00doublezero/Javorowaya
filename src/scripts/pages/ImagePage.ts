import fsExtra from "fs-extra";
import path from "path";
import PPage from "./PPage";

export default class ImagePage extends PPage {
    protected hookElement: string = "img";

    public async getFileExtension(): Promise<string> {
        return path.extname(await this.getFilenameFromURL());
    }
    public async getFilenameFromURL(): Promise<string> {
        return path.basename(await this.page.url());
    }
    public async saveFile(path: string) {
        await this.page.evaluate(() => {
            document.querySelector("img")!.removeAttribute("height");
            document.querySelector("img")!.removeAttribute("width");
        });
        const img = await this.page.$("img");
        await img!.screenshot({path});
    }
}