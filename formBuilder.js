exports.getFormFromJSON = function(object){
	form = buildForm(object)
}

function buildForm(object){
	console.log(object)
	console.log(typeof(object))
	expandObject(object)
}

function expandObject(object){
	Object.keys(object).forEach(key => {
		if(object[key] == null ){
			addNullToForm(key)
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
	console.log(`key: ${key}`, typeof(key),`object: null`)
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