import { app } from "electron";
import trimDesktop from "./trimDesktop";

app.disableHardwareAcceleration();

app.on("ready", () => setTimeout(createWindow, 500));

function createWindow() {
    console.log("createWindow was called.");
    trimDesktop()
        .then(({sourceDisplay, trimmedBounds}) => console.log(sourceDisplay, trimmedBounds))
        .catch((error) => console.log(error));
}

