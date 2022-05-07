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
		console.log(parent)
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
	this.getData = function(){
		if(this.canReadData){
			rewind(this.myObject , this.data , this.id)
		}
		return this.data;
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