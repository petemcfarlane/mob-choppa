const {app, Tray, Menu, BrowserWindow} = require('electron')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({show: false})
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', function() {
  createWindow()

  const appIcon = new Tray(`${__dirname}/iconTemplate.png`)

  const contextMenu = Menu.buildFromTemplate([
    {label: '1 Min', type: 'radio', click: () => mainWindow.webContents.send('setDuration', 1)},
    {label: '5 Min', type: 'radio', click: () => mainWindow.webContents.send('setDuration', 5)},
    {label: '6 Min', type: 'radio', click: () => mainWindow.webContents.send('setDuration', 6), checked: true},
    {label: '7 Min', type: 'radio', click: () => mainWindow.webContents.send('setDuration', 7)},
    {label: '8 Min', type: 'radio', click: () => mainWindow.webContents.send('setDuration', 8)},
    {type: 'separator'},
    {label: 'Play Sounds', type: 'checkbox', checked: true, click: () => mainWindow.webContents.send('toggleSounds')},
    {label: 'Quit', click: () => app.quit() }
  ])
  appIcon.setToolTip('Mob Choppa')
  appIcon.setContextMenu(contextMenu)
  app.dock.hide()
})
