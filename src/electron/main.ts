import { app, BrowserWindow, Menu, Tray } from "electron";
import path from "path";
import { CountManager } from "../utils/count";
import { initializeDatabase } from "../utils/database";
import "./ipc-handler";

let tray: Tray | null = null;
let mainWindow: BrowserWindow | null = null;
let isQuitting = false;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  // Handle window close event
  mainWindow.on("close", (event) => {
    if (!isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
    return false;
  });

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  await initializeDatabase();
  createWindow();
});

app.whenReady().then(() => {
  const TRAY_ICON_PATH = path.join(__dirname, "images/timetable.png"); // Adjust the path to access the public directory
  tray = new Tray(TRAY_ICON_PATH);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show App",
      click: () => {
        // Logic to show the app window
        // For example, you can show the main window if it's hidden
        if (mainWindow) {
          mainWindow.show();
        }
      },
    },
    {
      label: "Quit App",
      click: () => {
        const countManager = CountManager.getInstance();

        isQuitting = true;
        countManager.stopCounting();
        app.quit();
      },
    },
  ]);
  tray.on("click", () => {
    if (mainWindow) {
      mainWindow.show();
    }
  });
  tray.setToolTip("Click to show Checkin Record");
  tray.setContextMenu(contextMenu);
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
