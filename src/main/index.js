'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
import Settings from 'electron-settings'

import Datastore from 'nedb'

const defaultSetting = {
  utilisateur: {
    prenom: 'Christophe',
    nom: 'Dos Santos'
  },
  pointage: {
    maxMatin: null,
    minApresMidi: null,
    bonusDebut: null,
    bonusFin: null,
    minPauseMediane: null
  },
  dbFile: ''
}

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let db
let settings
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  // Settings.set('settings', defaultSetting)
  settings = Settings.get('settings', defaultSetting)

  if (settings.dbFile && settings.dbFile.length > 0) {
    db = new Datastore({filename: settings.dbFile, autoload: true})
  }

  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 800,
    useContentSize: true,
    width: 1280
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('setSetting', (event, arg) => {
  // Print 1
  Settings.set('settings', arg)
  // Reply on async message from renderer process
  event.sender.send('setSetting-reply')

  // load database if necessary
  if (arg.dbFile && arg.dbFile.length > 0) {
    db = new Datastore({filename: arg.dbFile, autoload: true})
  }
})

ipcMain.on('getSetting', (event) => {
  // Reply on async message from renderer proces
  event.sender.send('getSetting-reply', Settings.get('settings', defaultSetting))
})

ipcMain.on('getDocument', (event, arg) => {
  if (db) {
    db.find({mois: arg}, (err, docs) => {
      if (!err) {
        event.sender.send('getDocument-reply', docs)
      } else {
        event.sender.send('getDocument-error', err)
      }
    })
  } else {
    event.sender.send('getDocument-error', 'pas de base de donnée')
  }
})

ipcMain.on('saveDocument', (event, arg) => {
  if (db) {
    db.update({mois: arg.mois}, arg, {upsert: true}, (err, numAffected) => {
      event.sender.send('saveDocument-reply',{numAffected, err})
    })
  } else {
    event.sender.send('saveDocument-reply', {null, 'pas de base de donnée'})
  }
})

ipcMain.on('getReady', (event) => {
  event.sender.send('getReady-reply', db !== null && db!== undefined)
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
