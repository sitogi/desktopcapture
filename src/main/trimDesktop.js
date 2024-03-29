import { screen, ipcMain, BrowserWindow } from "electron";

// 透明なウィンドウを一時的に作成し、トリムするディスプレイと領域を使って何かするコールバック
// を Renderer プロセスに送信する Promise を返す
function trimDesktop() {
    const displays = screen.getAllDisplays();

    return new Promise((resolve, reject) => {
        const windows = displays.map((display, i) => {
            const {x, y, width, height} = display.bounds;
            display.name = "Screen " + (i + 1);
            const win = new BrowserWindow({
                frame: false,
                transparent: true,
                alwaysOnTop: true,
                x, y, width, height,
            });
            win.loadURL(`file://${__dirname}/../../index.html`);
            win.webContents.openDevTools();
            return {win, display};
        });

        ipcMain.once("SEND_BOUNDS", (e, {trimmedBounds}) => {
            console.log("ipcMain.once was called.");
            const sourceDisplay = windows.find(w => w.win.webContents.id === e.sender.id).display;
            const profile = {sourceDisplay, trimmedBounds};
            windows.forEach(w => w.win.close());
            resolve(profile);
        });
    });
}

export default trimDesktop;

