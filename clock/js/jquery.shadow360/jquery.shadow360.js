;(function($, window, document){
	var pluginName = "shadow360";
	var plugin = function(element, options){
		var that = {};
		that.elm = element;
		that.defaults = {
			colorShadow	: "#333",
			sizeShadow	: 100,
			angleShadow	: 135
		}
		that.options = $.extend({}, that.defaults, options);

		that.setShadow = function(){
			var color = that.options.colorShadow,
				textShadow = color + " 0px 0px 0px",
				angle = that.options.angleShadow-90,
				x,
				y;
	
			for(var i=0,len=that.options.sizeShadow;i<len;i++){
				x = i * Math.cos(angle * Math.PI / 180) + "px";
				y = i * Math.sin(angle * Math.PI / 180) + "px";
				textShadow += "," + color + " " + x + " " + y + " 0px";
			}

			return that.elm.css("text-shadow", textShadow);
		}

		return that;
	}

	$.fn[pluginName] = function(options) {
		var Plugin = plugin(this,options);
		return Plugin.setShadow();
    }
})(jQuery, window, document);