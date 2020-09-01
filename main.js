const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const url = require('url');

if (process.env.NODE_ENV === undefined) process.env.NODE_ENV = 'production';

const isDev = process.env.NODE_ENV === 'development' && process.argv.indexOf('--noDevServer') === -1;

let mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  });
  
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:8080'
      : url.format({
        pathname: path.join(__dirname, 'dist', 'index.html'),
        protocol: 'file',
        slashes: true
      })
  );

  mainWindow.on('closed', () => app.quit());

  const mainMenu = Menu.buildFromTemplate(
    createMainMenuTemplate(baseMainMenuTemplate)
  );
  Menu.setApplicationMenu(mainMenu);
});

// menu template
const baseMainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q', // Hotkey for this action
        click: () => app.quit()
      }
    ]
  }
];

const devToolsMenuTemplate = [{
  label: 'Developer tools',
  submenu: [
    {
      label: 'Toggle DevTools',
      accelerator: process.platform === 'darwin' ? 'Command+I' : 'Ctrl+I',
      click: (item, focusedWindow) => {
        focusedWindow.toggleDevTools();
      }
    },
    {
      role: 'reload'
    }
  ]
}];

const createMainMenuTemplate = (baseTemplate) => {
  const template = process.platform === 'darwin'
    ? [{ label: '' }, ...baseTemplate]
    : baseTemplate;
  
  return process.env.NODE_ENV !== 'production'
    ? [...template, ...devToolsMenuTemplate]
    : template;
};
