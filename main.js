const { app, BrowserWindow } = require('electron')

function createWindow () {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // add this line
        }
    })

    win.loadFile('index.html')
}

app.whenReady().then(createWindow)