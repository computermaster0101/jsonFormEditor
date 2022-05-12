exports.getFormFromJSON = function(object){
	form = buildForm(object)
}

function buildForm(object){
	console.log(object)
	console.log(typeof(object))
	Object.keys(object).forEach(key => {
		console.log(`key: ${key}`,`object: ${object}`)
	})
}