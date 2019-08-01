import filenamify from "filenamify";
import fsExtra from "fs-extra";
import * as readline from "readline";
import logger from "./loggerConfig";
export const createDir = async (pathString: string): Promise<string> => {
    pathString = filenamify(pathString);
    let dirExists = true;
    while (dirExists) {
        dirExists = await fsExtra.pathExists(pathString);
        if (dirExists === true) {
            pathString = pathString + "(copy)";
        }
    }
    try {
        await fsExtra.ensureDir(pathString);
        logger.info(`The directory '${pathString}' was created.`);
    } catch (err) {
        logger.info(`The directory '${pathString}' cannot be created. Programm terminated.`);
        process.exit();
    }
    return pathString;
};
export const printProgress = (progress: string) => {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0, undefined);
    process.stdout.write(progress);
};