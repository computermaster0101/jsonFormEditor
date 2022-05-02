const electron = require('electron')
const url = require('url')
const path = require('path')
const fs = require('fs')
process.env.NODE_ENV = 'development'

const {app, BrowserWindow, Menu, ipcMain, dialog} = electron
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

ipcMain.on('loadFolder', function(e){
  console.log("loadFolder hit!")
  folderToLoad=(dialog.showOpenDialog(mainWindow, { properties: ['openDirectory'] }))
  if ( typeof(folderToLoad) !== 'undefined' && folderToLoad ){
	console.log(`folder to load is ${folderToLoad}`)
	folderContent=fs.readdirSync(`${folderToLoad}`)
	console.log(folderContent)
	folderContent.forEach((item) => {
		item = path.join(`${folderToLoad}`,item)
		console.log(item)
		stat=fs.statSync(item)
		console.log(stat)
		console.log("Path is file:", stat.isFile());
		console.log("Path is directory:", stat.isDirectory());

	})
/*
	fs.readdir(`${folderToLoad}`,(err,folderContent) => {
		console.log(folderContent)
		for ( item in folderContent){
			item = `${folderToLoad}\${folderContent[item]}`
			console.log(folderContent[item])
			fs.stat(`${folderContent[item]}`, (err, stat) => {
				if (err) {
					console.error("Error stating file.", err)
				}
				
				if (stat.isDirectory()) {
					console.log(`${folderContent[item]} is a directory`)
				} else if (stat.isFile()) {
					if ( folderContent[item].substr(-5) == ".json" ) {
						console.log(`found json file ${folderContent[item]}`)
					} else {
						console.log(`not a json file ${folderContent[item]}`)
					}
				}
			})
		}
	})
*/
  } else {
	console.log(`folder to load is ${typeof(folderToLoad)}`)
  }
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