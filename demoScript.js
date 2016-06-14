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
	var xhr = createXHR();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if(xhr.status == 200 || xhr.status == 304){
				var demo = new Demo();
				demo.data = JSON.parse(xhr.responseText);
				demo.init("warp");
				demo.mouseAction();
			}else{
				console.log("Request was unsuccessful: " + xhr.status);
			}
		}
	};
	xhr.open("get", "list.json", true);
	xhr.send(null);
}
function createXHR(){
	if(typeof XMLHttpRequest != "undefined"){
		return new XMLHttpRequest();
	}else if (typeof ActiveXObject != "undefined") {
		if(typeof arguments.callee.activeXstring != "string"){
			var versions = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],
				i,len;

			for(i=0, len=versions.length; i<len ; i++){
				try{
					new ActiveXObject(versions[i]);
					arguments.callee.activeXstring = versions[i];
					break;
				}catch(ex){
					//跳过
				}
			}
		}
		return new ActiveXObject(arguments.callee.activeXstring);
	}else{
		throw new Error("No XHR object available.");
	}
}