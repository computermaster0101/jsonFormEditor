process.env.NODE_ENV = 'development'

const electron = require('electron')
const url = require('url')
const path = require('path')
const fs = require('fs')
const {app, BrowserWindow, Menu, ipcMain, dialog} = electron

let mainWindow

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
 
app.on('ready', function(){
	mainWindow = new BrowserWindow({
		webPreferences: {
			preload: path.join(app.getAppPath(), 'preload.js')
		}
	})
	
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
ipcMain.on('displayItem', (event,item) => { displayItem(item) })

function openDialog(){
	//console.log("loadFolder hit!")
	mainWindow.webContents.send('clearItems')
	folderToLoad=(dialog.showOpenDialogSync(mainWindow, { properties: ['openDirectory'] }))

	if ( typeof(folderToLoad) !== 'undefined' && folderToLoad ){
		expandFolder(folderToLoad)
	} else {
		//console.log(`folder to load is ${typeof(folderToLoad)}`)
	}
}

function expandFolder(folder){
	noFiles=true
	fs.readdirSync(`${folder}`).forEach((item) => {
		stat=fs.statSync(path.join(`${folder}`,item))
		if (stat.isFile()){
			if (item.substr(-5) == ".json"){
				if (noFiles){
					noFiles=false
					mainWindow.webContents.send('addItem', folder, folder)
				}
				//console.log(`${item} is a json file`)
				mainWindow.webContents.send('addItem',folder, item)
			}
		} else if (stat.isDirectory){
			//console.log(`${item} is a directory`)
			expandFolder(path.join(`${folder}`, item))
		}
	})
}

function displayItem(item){
	mainWindow.webContents.send('clearData')
	//console.log("item: " + typeof(item) + item)
	try {stat = fs.statSync(item).isFile()}
	catch (e) {stat=false}
	finally {
		if (stat){
			//console.log(`${item} is a file`)
			try {
				//console.log(`content: ${JSON.stringify(JSON.parse(fs.readFileSync(item)))}`)
				mainWindow.webContents.send("isJSON", item, JSON.parse(fs.readFileSync(item)))
			}
			catch (err) {
				mainWindow.webContents.send("notJSON", item, err)
			}
		}
	}
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