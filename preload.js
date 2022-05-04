const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
  'electron',
  {
    loadFolder: () => ipcRenderer.send("loadFolder")
  },
  {
	addItem: () => ipcRenderer.on('addItem',(err, item) => {
	  const li = document.createElement('li')
	  const itemText = document.createTextNode(item)
	  li.appendChild(itemText)
	  li.addEventListener("click",displayItem)
	  ul.appendChild(li)
	})
  },
  {
  	clearItems: () => ipcRenderer.on('clearItems',(err) => {
	  ul.innerHTML = ""
	})
  }
)
