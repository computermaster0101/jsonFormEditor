const electron = require('electron')
const url = require('url')
const path = require('path')

const {app, BrowserWindow, Menu} = electron
let mainWindow
 
// listen for the app to be ready
app.on('ready', function(){
  //create new window
  mainWindow = new BrowserWindow({})
  //load html file into the window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:',
    slashes: true
  }))
  
  //Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTempate)
  //Insert menu
  Menu.setApplicationMenu(mainMenu)
})

const mainMenuTempate = [
  {
    label: 'File',
	submenu: [
	  {
	    label: 'Open Directory',
		accelerator: process.platform == 'darwin' ? 'Command+O' : 'Ctrl+O',
		click(){
			app.quit()
		}
	  },
	  {
		label: 'Quit',
		accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
	    click(){
		  app.quit()
	    }
	  }
	]
  }
]