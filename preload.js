const { contextBridge, ipcRenderer } = require('electron')
var listItemCounter = 0

contextBridge.exposeInMainWorld(
	'electron',
	{
		loadFolder: () => ipcRenderer.send("loadFolder")
	}
)

ipcRenderer.on('clearItems',(err) => {
	const ul = document.querySelector('ul')
	ul.innerHTML = ""
	
	const form = document.querySelector('form')
	form.innerHTML = ""
})

ipcRenderer.on('clearData',(err) => {
	const form = document.querySelector('form')
	form.innerHTML = ""
})

ipcRenderer.on('addItem',(err, item) => {
	const li = document.createElement('li')
	const itemText = document.createTextNode(item)
	const ul = document.querySelector('ul')

	li.appendChild(itemText)
	li.id = "listItem" + listItemCounter++
	li.addEventListener("click", displayItem)
	ul.appendChild(li)
})

ipcRenderer.on('isJSON',(err, file, content) => {
	console.log(`${file}:${JSON.stringify(content)}`)
	const br = document.createElement("br")
	const form = document.querySelector('form')
	const fileName = document.createElement('input')
	fileName.setAttribute("type", "text")
	fileName.setAttribute("name", "File Name: ")
	fileName.setAttribute("placeholder", file)

	const fileData = document.createElement('input')
	fileData.setAttribute("type", "text")
	fileData.setAttribute("name", "File Data: ")
	fileData.setAttribute("placeholder", JSON.stringify(content))
	form.appendChild(fileName)
	form.appendChild(br.cloneNode())
	form.appendChild(fileData)
})

ipcRenderer.on('notJSON',(err, file, error) => {
	const form = document.querySelector('form')
	const header = form.createElement('h3')
	header.appentChile(file)
	form.appendChild(header)

})


function displayItem(){
	console.log(this.id + ":" + this.innerHTML)
	ipcRenderer.send("displayItem", this.innerHTML)
}