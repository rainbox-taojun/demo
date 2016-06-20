function Demo(){
	this.data = [];
	this.box = null;
}
Demo.prototype = {
	init:function(id){
		this.box = document.getElementById(id);
		var ul = document.createElement("ul");
		for(var i=0 ; i<this.data.length ; i++){
			var li = "";
			var items = this.data[i];
			for(var j=0 ; j< items.length ; j++){
				var son = items[j];
				if(j == 0){
					li += "<li class='' style='height:35px;'><h2>" + son.title + "</h2><ul>";
				}else{
					li += "<li><a href='" + son.url + "' target='_blank'>" + son.text + "</a></li>";
				}
				if(j == items.length-1){
					li += "</ul></li>";
				}
			}
			ul.innerHTML += li;
		}
		this.box.appendChild(ul);
	},
	mouseAction:function(){
		var btn = this.box.querySelectorAll("ul li");
		for(var i=0 ; i<btn.length ; i++){
			btn[i].onclick = function(){
				if(this.className == "on"){
					this.classList.remove("on");
					this.style.height = "35px";
				}else{
					for(var j=0;j<btn.length;j++){
						btn[j].classList.remove("on");
						btn[j].style.height = "35px";
					}
					this.classList.add("on");
					var childCount = this.getElementsByTagName("li").length;
					this.style.height = 35 * childCount + 37 + "px";
					this.style.transition = ".5s";
				}
			}
		}
	}
}
window.onload = function(){
	var script = document.createElement("script");
	script.src = "myAjax.js";
	document.body.appendChild(script);
	ajax({
		type:"get",
		url:"list.json",
		async:true,
		data:null,
		success = function(response){
			var demo = new Demo();
			demo.data = JSON.parse(response);
			demo.init("warp");
			demo.mouseAction();
		};
	});
}
