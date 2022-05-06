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
	const fileNameLabel = document.createElement('label')
	const fileName = document.createElement('input')
	fileNameLabel.innerHTML = "File Name"
	fileNameLabel.setAttribute("for", "fileName")

	fileName.setAttribute("type", "text")
	fileName.setAttribute("name", "fileName")
	fileName.setAttribute("placeholder", file)
	form.appendChild(fileNameLabel)
	form.appendChild(fileName)
	form.appendChild(br.cloneNode())
	
	for (item in content){
		console.log(item, content[item], typeof(content[item]))
		newFormItem = document.createElement('input')
		newFormItem.setAttribute("type", "text")
		newFormItem.setAttribute("name", item)
		newFormItem.setAttribute("placeholder", content[item])
		newFormItemLabel = document.createElement('label')
		newFormItemLabel.innerHTML = item
		newFormItemLabel.setAttribute("for", item)
		form.appendChild(br.cloneNode())
		form.appendChild(newFormItemLabel)
		form.appendChild(newFormItem)
	}

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