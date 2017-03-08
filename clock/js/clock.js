var clock = function(boxName){
	var that = {};

	that.loadTime = function(){
		var myDate,
			hour,
			minute,
			second,
			num = 0,
			angle;
		setInterval(function(){
			myDate = new Date();
			hour = myDate.getHours();
			minute = myDate.getMinutes();
			second = myDate.getSeconds();
			angle = second*6;

			$("span").html((hour<10?"0"+hour:hour)+":"+(minute<10?"0"+minute:minute))
				.shadow360({
					colorShadow	: "#333",
					sizeShadow	: 1000,
					angleShadow	: angle
				});

		},500);
	}

	return that;
}