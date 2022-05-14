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
		console.log(`key: ${key}`, typeof(key),`object: ${object[key]}`, typeof(object[key]))
		if(typeof object[key] === 'string') {
			console.log("string")
		}
		if(typeof object[key] === 'number'){
			console.log("number")
		}  
		if(typeof object[key] === 'boolean'){
			console.log("boolean")
		}
		if(typeof object[key] === 'object'){
			console.log("object")
			expandObject(object[key])
		}
	})
}