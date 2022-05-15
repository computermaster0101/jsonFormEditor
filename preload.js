const { contextBridge, ipcRenderer } = require('electron')
const path = require('path')
const formBuilder = require('./formBuilder.js')

/*
var katiusha = (function(obj , el){
	
	//this = this
	this.myObject = obj;
	this.id = uuid()
	this.data = {};
	this.canReadData = false
	this.canGenerate = true
	this.element = el

	//self = this
	function uuid(){
		var dt = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (dt + Math.random()*16)%16 | 0;
			dt = Math.floor(dt/16);
			return (c=='x' ? r :(r&0x3|0x8)).toString(16);
		});
		return uuid;
	}

	function deep(it , parent , id , el){
		//console.log("here",self)
		Object.keys(it).forEach(key => {
			if(typeof it[key] === 'string') {
				it[`${key}${id}`] = createText(key,it[key], parent,el)
				this.canReadData = true
			}
			if(typeof it[key] === 'number'){
				it[`${key}${id}`] = createNumber(key,it[key], parent,el)
				this.canReadData = true
			}  
			if(typeof it[key] === 'boolean'){
				it[`${key}${id}`] = createBoolean(key,it[key], parent,el)
				this.canReadData = true
			}
			if(typeof it[key] === 'object'){
				appendLi(key , parent,el);
				deep(it[key] , `${parent}-${key}`,id,el);
			}
		});
	}
	
	function rewind(it , ret , id){
		//console.log(it , id)
		//if(!this.canReadData)
		//    return

		Object.keys(it).forEach(key => {
			if(typeof it[key] === 'string') {
				ret[key] = it[`${key}${id}`].value
				//delete it[`${key}_element_katiusha_co`]
			}
			if(typeof it[key] === 'number')
			{
				ret[key] = parseInt(it[`${key}${id}`].value)
			}
			if(typeof it[key] === 'boolean')
			{
				ret[key] = it[`${key}${id}`].checked
			}
			if(typeof it[key] === 'object'  && !key.includes(id)){
				ret[key] = {}
				rewind(it[key] , ret[key],id);
			}
		});
	}

	function clear(it , id){
		//this.id = uuid()
		//self.data = {}
		//self.canReadData = false;
		Object.keys(it).forEach(key => {
			if(typeof it[key] === 'string' | typeof it[key] === 'number' | typeof it[key] === 'boolean') {
				//data[key] = it[`${key}_element_katiusha_co`].value
				delete it[`${key}${id}`]
			}
			if(typeof it[key] === 'object'  && !key.includes(id)){
				//data[key] = {}
				clear(it[key] , id);
			}
		});
		//self.id = uuid();
	}

	function appendLi(id , parent , el){
		parentHtml = document.getElementById(parent) || el;
		li = document.createElement('li');
		span = document.createElement('span');
		setAttr(span , {
			"class":"caret"
		});
		span.innerText = id;
		li.appendChild(span);
		ul = document.createElement('ul');
		setAttr(ul,{
			"id": `${parent}-${id}`
		});
		li.appendChild(ul)
		parentHtml.appendChild(li)
		
		return li;
	}
	
	function setAttr(element , attributes){
		 Object.keys(attributes).forEach(key => {
			element.setAttribute(key , attributes[key]);
		 });
	}
	function createText(name ,value, parent , el){
		parent = document.getElementById(parent) || el;

		div = document.createElement('div')
		setAttr(div , {
			"class" : "form-group"
		})
		label = document.createElement('label')
		//label.innerText = name
		strong = document.createElement('strong')
		strong.innerText = name
		label.appendChild(strong)
		div.appendChild(label)
		input = document.createElement('input')
		setAttr(input ,{
			"name": name,
			"type": "text",
			"class": "form-control",
			"value": value
		})
		div.appendChild(input)
		li = document.createElement('li');
		li.appendChild(div);
		parent.appendChild(li);
		return input
	}
	function createNumber(name ,value, parent,el){
		parent = document.getElementById(parent) || el;
		div = document.createElement('div')
		setAttr(div , {
			"class" : "form-group"
		})
		label = document.createElement('label')
		//label.innerText = name
		strong = document.createElement('strong')
		strong.innerText = name
		label.appendChild(strong)
		div.appendChild(label)
		input = document.createElement('input')
		setAttr(input ,{
			"name": name,
			"type": "number",
			"class": "form-control",
			"value": value
		})
		div.appendChild(input)
		li = document.createElement('li');
		li.appendChild(div);
		parent.appendChild(li);
		return input
	
	}
	function createBoolean(name ,value, parent,el){
		parent = document.getElementById(parent) || el;
		div = document.createElement('div')
		setAttr(div , {
			"class" : "form-check"
		})
		input = document.createElement('input')
		input.checked = value
		setAttr(input ,{
			"name": name,
			"type": "checkbox",
			"class": "form-check-input"
		})
		div.appendChild(input)
		label = document.createElement('label')
		setAttr(label ,{
			"class":"form-check-label"
		})
		strong = document.createElement('strong')
		strong.innerText = name
		label.appendChild(strong)
		div.appendChild(label)
		li = document.createElement('li');
		li.appendChild(div);
		//console.log(parent)
		parent.appendChild(li);
		return input
	};

	this.generateForm = function(){
		if(this.canGenerate){
			deep(this.myObject , this.id , this.id , this.element)
			this.canReadData = true
			this.canGenerate = false
		}
	}
	this.clear = function() {
		this.element.innerText = ''
		this.data = {}
		this.canGenerate = true
		this.canReadData = false
		clear(this.myObject, this.id);
	}
	return this
});
*/

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
	const br = document.createElement("br")
	fileDataDiv = document.getElementById("fileData")
	form = formBuilder.getFormFromJSON(content)
	fileDataDiv.appendChild(form)
	
	
	/*
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
	template = document.getElementById('fileDataItem')
	
	configs = []
	configs.push(content)
	
	configs.forEach(item => {
		htmlItem = template.cloneNode(true)
		template.parentElement.appendChild(htmlItem)
		element = document.getElementById('fileDataItem')
		k = new katiusha(item , element)
		k.generateForm()

	})
	*/
	
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

