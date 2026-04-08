const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  dragMove:       (dx, dy) => ipcRenderer.send('drag-move', { dx, dy }),
  setIgnoreMouse: (ignore) => ipcRenderer.send('set-ignore-mouse', ignore),
  onInit:         (cb) => ipcRenderer.on('init',   (e, data) => cb(data)),
  onResize:       (cb) => ipcRenderer.on('resize', (e, data) => cb(data)),
})
