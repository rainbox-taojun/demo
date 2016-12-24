var clock = function(boxName){
	var that = {};

	that.loadTime = function(){
		var myDate,
			hour,
			minute,
			second;
		setInterval(function(){
			myDate = new Date();
			hour = myDate.getHours();
			minute = myDate.getMinutes();
			second = myDate.getSeconds();

			$(boxName+" .hour").html(hour<10?("0"+hour):hour);
			$(boxName+" .minute").html(minute<10?("0"+minute):minute);
			$(boxName+" .second").html(second<10?("0"+second):second);

			that.setLongshadow();
		},500);
	}

	that.setLongshadow = function(){
		$(".clock li").longShadow({
			colorShadow: '#333',
			sizeShadow: 1000,
			directionShadow: 'bottom'
		});
	}


	return that;
}