import chai from "chai";
import logger from "../loggerConfig";

export const strictEqual = (actual: any, expected: any, passMessage: string, failMessage?: string) => {
    let equality: boolean;
    try {
     if (failMessage === undefined) {
        chai.assert.strictEqual(actual, expected);
     } else {
         chai.assert.strictEqual(actual, expected, failMessage);
     }
     equality = true;
 } catch (error) {
     logger.testFailed(error.stack);
     equality = false;
 }
    if (equality === true) {
     logger.testPassed(passMessage);
 }
};