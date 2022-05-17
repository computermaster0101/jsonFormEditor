exports.getFormFromJSON = (object) => {return buildFormFromObject(object)}

function buildFormFromObject(object){
	
	form = document.createElement('form')
	ul = document.createElement('ul')
	form.appendChild(ul)
	expandObject(object)
	
	return form
}

function uuid(){
	var dt = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (dt + Math.random()*16)%16 | 0;
		dt = Math.floor(dt/16);
		return (c=='x' ? r :(r&0x3|0x8)).toString(16);
	});
	return uuid;
}
	
function buildListItem(key,value,type){
	li = document.createElement('li')
	div = document.createElement('div')
	label = document.createElement('label')
	strong = document.createElement('strong')
	input = document.createElement('input')

	setAttr(strong, {
		"innerHTML": key
	})
	setAttr(label ,{
		"id": uuid(),
		"for": `${key}-${value}`
	})
	setAttr(input,{
		"type": type,
		"name": `${key}-${value}`,
		"placeholder": value
	})
	if((type == "checkbox") && (value)){setAttr(input,{"checked":value})}
	li.appendChild(div)
	div.appendChild(label)
	label.appendChild(strong)
	div.appendChild(input)
	return li
}

function expandObject(object){
	Object.keys(object).forEach(key => {
		if(object[key] == null ){
			
			buildListItem(key,object[key],"input")
			ul.appendChild(li)
	
		} else {
			switch (typeof(object[key])){
				case 'object':
					li = buildListItem(key,object[key],"input")
					ul.appendChild(li)
					expandObject(object[key])
					break
					
				case 'string':
					li = buildListItem(key,object[key],"input")
					ul.appendChild(li)
					break
					
				case 'number':
					li = buildListItem(key,object[key],"number")
					ul.appendChild(li)
					break
					
				case 'boolean':
					li = buildListItem(key,object[key],"checkbox")
					ul.appendChild(li)
					break
					
			}
		}
		
	})
}

function setAttr(element , attributes){
	Object.keys(attributes).forEach(key => {
		if(key == "innerHTML"){
			element.innerHTML = attributes[key]
		} else {
			element.setAttribute(key , attributes[key])
		}
	})
}

function appendElementsToForm(elements){
	elements.forEach(element => {
		form.appendChild(element)
	})
}