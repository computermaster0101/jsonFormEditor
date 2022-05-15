exports.getFormFromJSON = (object) => {return buildForm(object)}

const form = document.createElement('form')
const br = document.createElement("br")

function buildForm(object){
	form.innerHTML = "myFirstForm"
	expandObject(object)
	return form
}

function expandObject(object){
	Object.keys(object).forEach(key => {
		if(object[key] == null ){
			addNullToForm(key)
			addTypeListToForm(key,null)
		} else if(typeof object[key] === 'string') {
			addStringToForm(key,object[key])
		} else if(typeof object[key] === 'number'){
			addNumberToForm(key,object[key])
		} else if(typeof object[key] === 'boolean'){
			addBooleanToForm(key,object[key])
		} else if(typeof object[key] === 'object'){
			addObjectToForm(key,object[key])
		} 
	})
}

function addNullToForm(key){
	form.appendChild(br.cloneNode())
	console.log(`key: ${key}`, typeof(key),`object: null`)
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
		"name": "null",
		"placeholder": "null",
		"readonly": "true"
	})
	appendElementsToForm([label, input])
}

function addStringToForm(key,value){
	console.log(`key: ${key}`, typeof(key),`object: ${value}`, typeof(value))
}
function addNumberToForm(key,value){
	console.log(`key: ${key}`, typeof(key),`object: ${value}`, typeof(value))
}
function addBooleanToForm(key,value){
	console.log(`key: ${key}`, typeof(key),`object: ${value}`, typeof(value))
}
function addObjectToForm(key,object){
	console.log(`key: ${key}`, typeof(key),`object: ${JSON.stringify(object)}`, typeof(object))
	expandObject(object)
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