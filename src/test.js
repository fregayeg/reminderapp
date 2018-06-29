var isPizza = true;

if(isPizza){
	var isPizza = true
	var isRunning = false
	console.log('is Pizza from if block ', isPizza)
	console.log('is running from if block ', isRunning )
	throw new Error('I m kidding, this is only to test')
}


console.log('is running from global ', isRunning)
console.log('is Pizza from global ', isPizza) 