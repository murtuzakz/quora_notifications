function notification_killer(array){
	array = array.split(",")
	console.log(array);
	for(var i=0; i < array.length; i++){
		$.ajax({ url: array[i] });
	}
}

$('span.extension').click(function(){$(this).parents('li.extension').hide()});