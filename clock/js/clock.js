var clock = function(boxName){
	var that = {};

	that.loadTime = function(){
		var myDate,
			hour,
			minute,
			second,
			angle;
		setInterval(function(){
			myDate = new Date();
			hour = myDate.getHours();
			minute = myDate.getMinutes();
			second = myDate.getSeconds();
			angle = second*6;

			$("span").html((hour<10?"0"+hour:hour)+":"+(minute<10?"0"+minute:minute));

			that.mySetLongshadow({
				box : ".clock",
				colorShadow : "#333",
				sizeShadow : 1000,
				angleShadow : angle
			});
		},500);
		
		console.log()
	}

	that.mySetLongshadow = function(obj){
		var parent = $(obj.box),
			colorShadow = obj.colorShadow || "#333",
			sizeShadow = obj.sizeShadow || 100,
			angleShadow  = obj.angleShadow,
			textShadow = "rgb(51, 51, 51) 0px 0px 0px",
			x,
			y;

		parent.css("text-shadow","rgb(51, 51, 51) 0px 0px 0px");

		for(var i=1;i<sizeShadow;i++){
			x = i * Math.cos((angleShadow-90) * Math.PI / 180) + "px";
			y = i * Math.sin((angleShadow-90) * Math.PI / 180) + "px";
			textShadow += "," + colorShadow + " " + x + " " + y + " 0px";
		}
		parent.css("text-shadow",textShadow);
	}


	return that;
}