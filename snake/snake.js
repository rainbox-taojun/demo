function Snake(width,height){
	this.width = width;
	this.height = height;
	this.battle = null;
	this.body = [];
}
Snake.prototype = {
	init:function(id){
		this.box = document.getElementById(id);
		var ul = "";
		for(var i=0 ; i<this.height ; i++){
			var row = '';
			for(var j=0 ; j<this.width ; j++){
				if(j==0){
					row += "<ul><li id='" + "li_"+(i*10+j+1) + "'></li>";
				}else{
					row += "<li id='" + "li_" + (i*10 +j+1) + "'></li>";
				}
				if(j == 9){
					row += "</ul>";
				}
			}
			ul += row;
		}
		this.box.innerHTML = ul;
	},
	random:function(){
		for( ; ; ){
			var num = Math.floor(Math.random() * 100 + 1);
			var flag = true;
			for(var i=0 ; i<this.body.length ; i++){
				var sbody = this.body[i].className.split("_")[1];
				if(num == sbody){
					flag = false;
				}
			}
			if(flag){
				document.getElementById("li_" + num).className = "on";
				break;
			}
		}
	}
}
window.onload = function(){
	var snake = new Snake(10,10);
	snake.init("battlefield");
}