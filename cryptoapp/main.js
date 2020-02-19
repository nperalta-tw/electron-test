// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu} = require('electron');
const setupEvents = require('./installers/setupEvents');
const autoUpdate = require('./updaters/autoUpdate');

if (setupEvents.handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}

const path = require('path');
const shell = require('electron').shell;
const ipc = require('electron').ipcMain;

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 400,
    //As of version 5, the default for nodeIntegration changed from true to false,
    //You can enable it hwen creating the Browser Window
    //This will allow for js scripts to use require().
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile('src/index.html');

  var menu = Menu.buildFromTemplate([
    {
      label: 'Menu',
      submenu: [
        {label: 'Adjust Notification Value'},
        {
          label: 'CoinMarketCap',
          click() {
            shell.openExternal('http://coinmarketcap.com')
          }
        },
        {type: 'separator'},
        {
          label: 'Exit',
          click() {
            app.quit()
          }
        },
      ]
    },
    {
      label: 'info'
    }
  ]);
  Menu.setApplicationMenu(menu);
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  ipc.on('update-notify-value', function(event, arg) {
    mainWindow.webContents.send('targetPriceVal', arg)
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.