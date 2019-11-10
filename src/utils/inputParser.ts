import fs from "fs-extra";
import logger from "../loggerConfig";

export function linksLine2Line(path: string, previous: string): string[] {
    let result: string[] = [];
    try {
        result = fs.readFileSync(path).toString().split("\n");
    } catch (error) {
        logger.dbg("Parse input failed");
        logger.dbg(error);
        process.exit();
    }
    return result;
}