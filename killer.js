function notification_killer(array){
	array = array.split(",")
	console.log(array);
	for(var i=0; i < array.length; i++){
		console.log("requesting" + array[i]);
		$.ajax({ url: array[i] });
	}
}
