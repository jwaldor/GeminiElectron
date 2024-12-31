import { app, BrowserWindow } from "electron";
import registerListeners from "./helpers/ipc/listeners-register";
// "electron-squirrel-startup" seems broken when packaging with vite
//import started from "electron-squirrel-startup";
import path from "path";

const inDevelopment = process.env.NODE_ENV === "development";
console.log("here test 1");
function createWindow() {
    const preload = path.join(__dirname, "preload.js");
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            devTools: inDevelopment,
            contextIsolation: true,
            nodeIntegration: true,
            nodeIntegrationInSubFrames: false,

            preload: preload,
        },
        titleBarStyle: "hidden",
    });
    registerListeners(mainWindow);
    console.log("here test 2");
    console.log("Dev server URL:", MAIN_WINDOW_VITE_DEV_SERVER_URL);
    console.log("Vite name:", MAIN_WINDOW_VITE_NAME);

    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        console.log("Loading from dev server");
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
        console.log("Loading from file");
        mainWindow.loadFile(
            path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
        );
    }
}

app.whenReady().then(createWindow);

//osX only
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
//osX only ends
