exports.getFormFromJSON = (object) => {return buildFormFromObject(object)}

function buildFormFromObject(object){
	form = document.createElement('form')
	ul = document.createElement('ul')
	form.appendChild(ul)
	expandObject(object, ul)
	return form
}

function expandObject(object,attachTo){
	Object.keys(object).forEach(key => {
		if((typeof(object[key]) == 'object') && (object[key] !== null)){
			newli = document.createElement('li')
			  span = document.createElement('span')
			    newul = document.createElement('ul')
			      li = buildListItem(key,object[key])
			        nestli = document.createElement('li')
			          nestspan = document.createElement('span')
			            nestul = document.createElement('ul')
			attachTo.appendChild(newli)
			  newli.appendChild(span)
			    span.appendChild(newul)
			      newul.appendChild(li)
			        li.appendChild(nestli)
			          nestli.appendChild(nestspan)
			            nestspan.appendChild(nestul)
			expandObject(object[key], nestul)			
		} else {
			li = buildListItem(key,object[key])
			attachTo.appendChild(li)
		}
	})
}
	
function buildListItem(key,value){
	li = document.createElement('li')
	  div = document.createElement('div')
	    label = document.createElement('label')
	      strong = document.createElement('strong')
	    input = document.createElement('input')
	setAttr(label ,{
		"id": uuid(),
		"for": `${key}-${value}`
	})
	setAttr(strong, {
		"innerHTML": key
	})
	switch (typeof(value)){
		case 'string':
			type = "input"
			break
		case 'number':
			type = "number"
			break
		case 'boolean':
			type = "checkbox"
			if(value){setAttr(input,{"checked":value})}
			break
		case 'object':
			type = "input"
			if(value){setAttr(input,{"hidden": "true"})}else{setAttr(input,{"readonly": "true"})}
			break
	}
	setAttr(input,{
		"id": uuid(),
		"type": type,
		"name": `${key}-${value}`,
		"value": value
	})
	li.appendChild(div)
	  div.appendChild(label)
	    label.appendChild(strong)
	  div.appendChild(input)
	return li
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

function setAttr(element , attributes){
	Object.keys(attributes).forEach(key => {
		if(key == "innerHTML"){
			element.innerHTML = attributes[key]
		} else {
			element.setAttribute(key , attributes[key])
		}
	})
}