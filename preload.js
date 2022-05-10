const { contextBridge, ipcRenderer } = require('electron')
const path = require('path')
const katiusha = require('./katiusha.js')

var listItemCounter = 0
contextBridge.exposeInMainWorld(
	'electron',
	{
		loadFolder: () => ipcRenderer.send("loadFolder")
	}
)

ipcRenderer.on('clearItems',(err) => {
	const dl = document.querySelector('dl')
	dl.innerHTML = ""
	
//	const li = document.createElement('li')
//	li.appendChild(document.createTextNode(".."))
//	li.setAttribute("value", "..")
//	li.addEventListener("click", displayItem)
//	ul.appendChild(li)
	
//	const form = document.querySelector('form')
//	form.innerHTML = ""
})

ipcRenderer.on('clearData',(err) => {
	const dl = document.querySelector('dl')
	const ul = document.querySelector('ul')
	ul.innerHTML = ""
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
	/*
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
		//console.log(item, content[item], typeof(content[item]))
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
	*/
	template = document.getElementById('fileDataItem')
	
    katiushas = []
	configs = []
	configs.push(content)
	
	configs.forEach(item => {
		htmlItem = template.cloneNode(true)
		template.parentElement.appendChild(htmlItem)
		element = document.getElementById('fileDataItem')
		k = new katiusha(item , element)
		k.generateForm()

		katiushas.push(k)
	})
	
})



ipcRenderer.on('notJSON',(err, file, error) => {
	const form = document.querySelector('form')
	const header = form.createElement('h3')
	header.appentChile(file)
	form.appendChild(header)

})


function displayItem(){
	//console.log("displayItem:" + this.getAttribute("value"))
	ipcRenderer.send("displayItem", this.getAttribute("value"))
}

