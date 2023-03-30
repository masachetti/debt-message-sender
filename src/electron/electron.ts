import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { IpcChannels } from "../enums/IpcChannels";
import {
  addToIgnoreList,
  getIgnoreList,
  removeFromIgnoreList,
} from "./electron-methods/ignoreStore";
import { startWpp, closeWpp, sendMessage } from "./electron-methods/wpp";
import { WppStatusResponse } from "../types/Wpp";

const env = process.env.NODE_ENV || "development";

// Hot Reloader - Only for Dev mode
if (env === "development") {
  try {
    require("electron-reloader")(module, {
      debug: true,
      watchRenderer: true,
      ignore: ["src", "public", "tokens"],
    });
  } catch (_) {
    console.log("Error");
  }
}

let mainWindow: BrowserWindow | undefined;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    height: 800,
    width: 1000,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.loadFile(path.join(__dirname, "../../dist/index.html"));
  mainWindow.webContents.openDevTools({ mode: "detach" });
  // if (env === "development")
}

function configureChannels() {
  ipcMain.handle(IpcChannels.GetIgnoreList, getIgnoreList);
  ipcMain.handle(IpcChannels.AddToIgnoreList, addToIgnoreList);
  ipcMain.handle(IpcChannels.RemoveFromIgnoreList, removeFromIgnoreList);
  ipcMain.handle(IpcChannels.WppSendMessage, sendMessage)
  ipcMain.on(IpcChannels.StartWpp, () =>
    startWpp({
      onClientReady: (clientInfo) =>
        mainWindow?.webContents.send(IpcChannels.WppReady, clientInfo),
      onQrCodeGenerated: (qr) =>
        mainWindow?.webContents.send(IpcChannels.WppQrCode, qr),
    })
  );
}

app.on("ready", () => {
  createMainWindow();
  configureChannels();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("will-quit", () => {
  closeWpp();
});

export {};
