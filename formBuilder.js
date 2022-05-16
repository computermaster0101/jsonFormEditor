exports.getFormFromJSON = (object) => {return buildForm(object)}

const form = document.createElement('form')

function buildForm(object){
	form.innerHTML = ""
	expandObject(object)
	return form
}

function expandObject(object){
	Object.keys(object).forEach(key => {
		if(object[key] == null ){
			addInputToForm(key,"null")
		} else {
			switch (typeof(object[key])){
				case 'string':
					addInputToForm(key,object[key])
					break
				case 'number':
					addInputToForm(key,object[key])
					break
				case 'boolean':
					addInputToForm(key,object[key])
					break
				case 'object':
					addInputToForm(key,"object")
					expandObject(object[key])
					break
			}
		}
	})
}

function addInputToForm(key,value){
	console.log(`key: ${key}`, typeof(key),`object: null`)
	form.appendChild(document.createElement("br"))
	label = document.createElement('label')
	input = document.createElement('input')
	strong = document.createElement('strong')
	strong.innerHTML = key
	label.appendChild(strong)
	setAttr(label ,{
			"id": "1",
			"for": "null"
		})
	setAttr(input,{
		"type": "text",
		"name": `${key}.${value}`,
		"placeholder": value,
		"readonly": "true"
	})
	appendElementsToForm([label, input])
}


function setAttr(element , attributes){
	Object.keys(attributes).forEach(key => {
		element.setAttribute(key , attributes[key])
	})
}

function appendElementsToForm(elements){
	elements.forEach(element => {
		form.appendChild(element)
	})
}

function addTypeListToForm(key,type){
	console.log(key,type)
	select = document.createElement('select')
	string = document.createElement('option')
	number = document.createElement('option')
	bool = document.createElement('option')
	object = document.createElement('option')
	list = document.createElement('option')

}