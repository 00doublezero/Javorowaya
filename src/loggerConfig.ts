import winston from "winston";
const myCustomLevels = {
    levels: {
      dbg: 0,
      msg: 1,
      testPassed: 2,
      testFailed: 3,
      err: 4,
      panic: 5,
    },
    colors: {
        dbg: "grey blackBG",
        msg: "yellow blackBG",
        testPassed: "green blackBG",
        testFailed: "red blackBG",
        err: "magenta blackBG",
        panic: "cyan redBG",
    },
  };
export default winston.createLogger({
    level: "panic",
    levels: myCustomLevels.levels,
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
    ),
    transports: [
        new winston.transports.Console(),
    ],
});
winston.addColors(myCustomLevels.colors);