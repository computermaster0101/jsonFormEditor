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
})

ipcRenderer.on('addItem',(err, item) => {
	const li = document.createElement('li')
	const itemText = document.createTextNode(item)
	const ul = document.querySelector('ul')

	li.appendChild(itemText)
	li.id = "listItem" + listItemCounter++
	li.addEventListener("click",print)
	ul.appendChild(li)
})

function print(){
	console.log(this.id + ":" + this.innerHTML)
	ipcRenderer.send("hit", "this is sent to the server: " + this.innerHTML)
}