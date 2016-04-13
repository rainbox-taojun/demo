function Snake(){
	this.battle = null;
	this.body = [];
}
Snake.prototype = {
	init:function(id){
		this.box = document.getElementById(id);
		var ul = "";
		for(var i=0 ; i<10 ; i++){
			var row = '';
			for(var j=0 ; j<10 ; j++){
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
	}
}
window.onload = function(){
	var snake = new Snake();
	snake.init("battlefield");
}