import chai from "chai";
import logger from "../loggerConfig";

export const strictEqual = (actual: any, expected: any, message?: string) => {
    let equality: boolean;
    try {
     if (message === undefined) {
        chai.assert.strictEqual(actual, expected);
     } else {
         chai.assert.strictEqual(actual, expected, message);
     }
     equality = true;
 } catch (error) {
     logger.err(error);
     equality = false;
 }
    if (equality === true) {
     logger.testPassed(actual + " is equal to " + expected);
 }
};