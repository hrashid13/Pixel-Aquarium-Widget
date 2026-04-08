const { app, BrowserWindow, screen, ipcMain, Tray, Menu, nativeImage } = require('electron')
const path = require('path')

let win, tray
let currentW = 400, currentH = 250

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize

  win = new BrowserWindow({
    width: currentW,
    height: currentH,
    x: width - currentW - 20,
    y: height - currentH - 20,
    frame: false,
    transparent: true,
    resizable: true,        // must be true for setBounds to work
    movable: false,
    skipTaskbar: true,
    alwaysOnTop: false,
    focusable: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.showInactive()
  win.loadFile('aquarium.html')

  win.webContents.on('did-finish-load', () => {
    // Send authoritative size to renderer after page loads
    win.webContents.send('init', { w: currentW, h: currentH })
    win.setIgnoreMouseEvents(true, { forward: true })
  })
}

function createTray() {
  const icon = nativeImage.createFromDataURL(
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAHklEQVQ4jWNgYGD4TyMMABDyBRIYAAqGBQUFBQQAAoEA/9v3GzIAAAAASUVORK5CYII='
  )
  tray = new Tray(icon)
  tray.setToolTip('Pixel Aquarium')
  rebuildTrayMenu()
}

function rebuildTrayMenu() {
  const menu = Menu.buildFromTemplate([
    { label: 'Pixel Aquarium', enabled: false },
    { type: 'separator' },
    {
      label: 'Snap to corner',
      submenu: [
        { label: 'Bottom-right', click: () => snapToCorner('bottom-right') },
        { label: 'Bottom-left',  click: () => snapToCorner('bottom-left') },
        { label: 'Top-right',    click: () => snapToCorner('top-right') },
        { label: 'Top-left',     click: () => snapToCorner('top-left') },
      ]
    },
    {
      label: 'Resize',
      submenu: [
        { label: 'Small  (400×250)', click: () => resizeTo(400, 250) },
        { label: 'Medium (600×375)', click: () => resizeTo(600, 375) },
        { label: 'Large  (800×500)', click: () => resizeTo(800, 500) },
      ]
    },
    { type: 'separator' },
    { label: 'Quit', click: () => app.quit() }
  ])
  tray.setContextMenu(menu)
}

function snapToCorner(corner) {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  const pad = 20
  const map = {
    'bottom-right': { x: width  - currentW - pad, y: height - currentH - pad },
    'bottom-left':  { x: pad,                     y: height - currentH - pad },
    'top-right':    { x: width  - currentW - pad, y: pad },
    'top-left':     { x: pad,                     y: pad },
  }
  const pos = map[corner]
  win.setBounds({ x: pos.x, y: pos.y, width: currentW, height: currentH })
}

function resizeTo(w, h) {
  currentW = w
  currentH = h
  const [x, y] = win.getPosition()
  // setBounds resizes and repositions atomically — no flicker
  win.setBounds({ x, y, width: w, height: h }, true)
  win.webContents.send('resize', { w, h })
}

ipcMain.on('drag-move', (e, { dx, dy }) => {
  const [x, y] = win.getPosition()
  win.setPosition(x + dx, y + dy)
})

ipcMain.on('set-ignore-mouse', (e, ignore) => {
  win.setIgnoreMouseEvents(ignore, { forward: true })
})

app.whenReady().then(() => {
  createWindow()
  createTray()
})

app.on('window-all-closed', () => app.quit())
