const {
    app,
    BrowserWindow,
    Menu,
    MenuItem
} = require('electron');
const electron = require('electron');
const path = require('path');
const url = require('url');

let win;

const menuTemplate = [
    {
        label: 'File',
        submenu: [
        { type: 'separator' },
        { role: 'quit' }
        ]
    },
    {
        label: 'View',
        submenu: [
        { label: 'Menu Bar', type: 'checkbox' },
        { label: 'Dashboard', type: 'checkbox' },
        { label: 'Top Toolbar', type: 'checkbox' },
        { label: 'Map Toolbar', type: 'checkbox' },
        { type: 'separator' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { label: 'Pan to selected' },
        { label: 'Zoom full' },
        { label: 'Zoom to layer' },
        { label: 'Zoom to selected' },
        { label: 'Zoom last' },
        { label: 'Zoom next' },
        { role: 'reload' }
        ]
    },
    {
        label: 'Mode',
        submenu: [
        { label: 'Pan' },
        { label: 'Select' },
        { label: 'Info' }
        ]
    },
    {
        label: 'Tools',
        submenu: [
        { label: 'Pivot table' }
        ]
    },
    {
        label: 'Help',
        submenu: [
        { role: 'help' },
        { role: 'about' },
        { label: 'Learn More' }
        ]
    }
]

function createWindow () {
    const _width = 1200, _height = 800
    win = new BrowserWindow({
        width: _width,
        height: _height,
        minWidth: 800,
        minHeight: 600,
        icon: './assets/img/icons/app.ico',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    })

    win.loadFile('index.html')

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
  
    const contextMenu = new Menu();
    contextMenu.append(new MenuItem({ label: 'Menu Bar', type: 'checkbox' }))
    contextMenu.append(new MenuItem({ label: 'Dashboard', type: 'checkbox' }))
    contextMenu.append(new MenuItem({ label: 'Top Toolbar', type: 'checkbox' }))
    contextMenu.append(new MenuItem({ label: 'Map Toolbar', type: 'checkbox' }))
  
    win.webContents.on('context-menu', function(e, params){
      contextMenu.popup(win, params.x, params.y)
    })

    // win.webContents.openDevTools();
    win.on('closed', () => {
        win = null;
    })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
