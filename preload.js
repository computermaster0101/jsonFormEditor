const { contextBridge, ipcRenderer } = require('electron')
const path = require('path')
const formBuilder = require('./formBuilder.js')

contextBridge.exposeInMainWorld(
	'electron',
	{
		loadFolder: () => ipcRenderer.send("loadFolder")
	}
)

ipcRenderer.on('clearItems',(err) => {
	const dl = document.querySelector('dl')
	dl.innerHTML = ""
	
})

ipcRenderer.on('clearData',(err) => {
	const fileDataDiv = document.getElementById('fileData')
	fileDataDiv.innerHTML = ""
})

ipcRenderer.on('addItem',(err, folder, file) => {
	const dl = document.querySelector('dl')
	
	//console.log("folder: " + folder)
	//console.log("file: " + file)
	
	if (folder == file) { 
		const dt = document.createElement('dt')
		dt.appendChild(document.createTextNode(file))
		dt.setAttribute("value", folder)
		dt.addEventListener("click", displayItem)
		dl.appendChild(dt)
	}else{
		const dd = document.createElement('dd')
		dd.appendChild(document.createTextNode(" - " + file))
		dd.setAttribute("value", path.join(`${folder}`,`${file}`))
		dd.addEventListener("click", displayItem)
		dl.appendChild(dd)
	}
})

ipcRenderer.on('isJSON',(err, file, content) => {
	//console.log(`${file}:${JSON.stringify(content)}`)
	fileDataDiv = document.getElementById("fileData")
	form = formBuilder.getFormFromJSON(content)
	fileDataDiv.appendChild(form)
		
})



ipcRenderer.on('notJSON',(err, file, error) => {
	fileDataDiv = document.getElementById("fileData")
	console.log(file, typeof(file))
	form = document.createElement('form')
	form.innerHTML = `<br><strong>file:</strong> ${file} <br><strong>error:</strong> ${error}`
	fileDataDiv.appendChild(form)

})


function displayItem(){
	//console.log("displayItem:" + this.getAttribute("value"))
	ipcRenderer.send("displayItem", this.getAttribute("value"))
}

