console.log('renderer process three');

const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');
const url = require('url');

const purWindowBtn = document.getElementById('purWindowBtn');
purWindowBtn.addEventListener('click', function(event){
    let pur = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });
    
    pur.loadFile('pur.html')
    pur.webContents.openDevTools();
})