'use strict';

require('babel-register');

const {app, BrowserWindow} = require('electron');
const browserPage = `file://${__dirname}/app/index.html`;
const debug = /--debug/.test(process.argv[2]);

let mainWindow;
let shouldQuit = makeSingleInstance();
if (shouldQuit) return app.quit();

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    'min-width': 800,
    'min-height': 600,
    'fullscreen ': true,
    'acceptFirstMouse': true,
    'titleBarStyle ': 'hidden'
  });

  // Launch fullscreen with DevTools open, usage: npm run debug
  if (debug) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.maximize();
  
  // and load the index.html of the app.
  mainWindow.loadURL(browserPage);

  // Emitted when the window is closed.
  mainWindow.on('closed', onClosed);

  return mainWindow;
}

function onClosed() {
  // Dereference the window object, usually you would store windows
  // in an array if your app supports multi windows, this is the time
  // when you should delete the corresponding element.
  mainWindow = null
}

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance() {
  return app.makeSingleInstance(() => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
