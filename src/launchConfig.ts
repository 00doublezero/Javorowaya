export const debugLaunch = {
    args: ["--start-fullscreen", "--disable-infobars"],
    headless: false,
    slowMo: 700,
    executablePath: "chromium-browser",
    userDataDir: "/home/kryger/.config/chromium/",
};
export const releaseLaunch = {
    args: ["--start-fullscreen", "--disable-infobars"],
    headless: true,
    executablePath: "chromium-browser",
    userDataDir: "/home/kryger/.config/chromium/",
};
export const proxyDebugLaunch = {
    args: ["--start-fullscreen", "--disable-infobars", "--proxy-server=socks5://127.0.0.1:26000"],
    // headless: false,
    slowMo: 180,
    executablePath: "chromium-browser",

};