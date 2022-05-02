process.env.NODE_ENV = 'development'

const electron = require('electron')
const url = require('url')
const path = require('path')
const fs = require('fs')
const {app, BrowserWindow, Menu, ipcMain, dialog} = electron

let mainWindow
 
app.on('ready', function(){
	mainWindow = new BrowserWindow({})
	
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'mainWindow.html'),
		protocol: 'file:',
		slashes:true
	}))

	mainWindow.on('closed', function(){
		app.quit()
	})
	
	const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
	Menu.setApplicationMenu(mainMenu)
})

ipcMain.on('loadFolder', () => { openDialog() })

function openDialog(){
	console.log("loadFolder hit!")
	folderToLoad=(dialog.showOpenDialog(mainWindow, { properties: ['openDirectory'] }))

	if ( typeof(folderToLoad) !== 'undefined' && folderToLoad ){
		expandFolder(folderToLoad)
	} else {
		console.log(`folder to load is ${typeof(folderToLoad)}`)
	}
}

function expandFolder(folder){
	fs.readdirSync(`${folder}`).forEach((item) => {
		item = path.join(`${folder}`,item)
		stat=fs.statSync(item)
		if (stat.isFile()){
			if (item.substr(-5) == ".json"){
				console.log(`${item} is a json file`)
			}
		} else if (stat.isDirectory){
			console.log(`${item} is a directory`)
			expandFolder(item)
		}
	})
}

const mainMenuTemplate = [
	{
		label: 'File',
		submenu: [
			{
				label: 'Open Directory',
				accelerator: process.platform == 'darwin' ? 'Command+O' : 'Ctrl+O',
				click(){
					openDialog()
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