const electron = require('electron')
const url = require('url')
const path = require('path')

process.env.NODE_ENV = 'development'

const {app, BrowserWindow, Menu, ipcMain} = electron
let mainWindow
 
// listen for the app to be ready
app.on('ready', function(){
  //create new window
  mainWindow = new BrowserWindow({})
  //load html file into the window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:',
    slashes:true
  }));
  // Quit app when closed
  mainWindow.on('closed', function(){
    app.quit();
  });
  
  //Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
  //Insert menu
  Menu.setApplicationMenu(mainMenu)
})

ipcMain.on('hit', function(e, dir){
  console.log("hit!")
  console.log(dir)
});

const mainMenuTemplate = [
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

// If OSX, add empty object to menu
if(process.platform == 'darwin'){
  mainMenuTemplate.unshift({});
}

if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu:[
      {
        role: 'reload'
      },
      {
        label: 'Toggle DevTools',
        accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}