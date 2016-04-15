function Snake(width,height){
	this.width = width;//棋盘宽度
	this.height = height;//棋盘高度
	this.body = [];//存放蛇身位置
	this.timer = null;
	this.score = 0;//得分
	this.end = false;//是否结束游戏
	this.count = width*height;
}
Snake.prototype = {
	//画出棋盘
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
	//随机生成食物
	random:function(){
		for( ; ; ){
			var num = Math.floor(Math.random() * 100 + 1);
			if(!this.test(num)){
				document.getElementById("li_" + num).className = "on";
				break;
			}
		}
	},
	//测试是不是蛇身
	test:function(num){
		for(var i=0 ; i<this.body.length ; i++){
			if(num == this.body[i]){
				return true;
			}
		}
	},
	//初始化
	start:function(){
		this.body[this.body.length] = Math.floor(Math.random() * 100 + 1);
		console.log(this.body);
		document.getElementById("li_" + this.body[0]).className = "on";
		this.random();
		this.move("l");
		this.key();
	},
	//
	move:function(fx){
		var fx = fx;
		var that = this;
		clearInterval(this.timer);
		this.timer = setInterval(function(){
			var go = that.next(fx);
			if(document.getElementById("li_" + go).classList.contains("on")){
				if(that.test(go)){
					alert("GG,你的分数是: " + that.score);
					clearInterval(that.timer);
					that.end = true;
				}else{
					that.body.unshift(go);
					that.random();
					that.score++
				}
			}else{
				document.getElementById("li_" + go).className = "on";
				document.getElementById("li_" + that.body[that.body.length-1]).className = "";
				that.body.unshift(go);
				that.body.pop();
			}
		},300);
	},
	key:function(){
		var that = this;
		var fx;
		document.body.onkeydown = function(event){
			if(that.end){
				document.body.onkeydown = null;
				return false;
			}
			var event = event || window.event;
			switch(event.keyCode){
				case 37:
					if(fx!="l" && fx!="r") that.move("l");
					fx = "l";
					break;
				case 38:
					if(fx!="u" && fx!="d") that.move("u");
					fx = "u";
					break;
				case 39:
					if(fx!="r" && fx!="l") that.move("r");
					fx = "r";
					break;
				case 40:
					if(fx!="d" && fx!="u") that.move("d");
					fx = "d";
					break;
			}
		}
	},
	//unshift()在数组头部加入
	next:function(fx){
		var go;
		var flag = true;
		switch(fx){
			case 'l':
				go = -1;
				flag = true;
				break;
			case 'r':
				go = 1;
				flag = true;
				break;
			case 'u':
				go = -this.width;
				flag = false;
				break;
			case 'd':
				go = this.width;
				flag = false;
				break;
		}
		var away = this.body[0]+go;
		if(!flag){
			if(away > this.count){
				away = away-this.count;
			}else if(away < 0){
				away =  this.body[0]+this.count-this.width;
			}else if(away == 0&&this.body[0] == this.width){
				away = this.count;
			}else if(away == this.count && this.body[0] == this.width*this.height-1){
				flag = false;
			}
		}else{
			if(this.body[0] % this.width == 0 || this.body[0] % 10 == 1){
				if(away % this.width == 1) {away -= this.width;}
				else if(away % this.width == 0) {away += this.width;}
			}
		}
		return away;
	}
}
window.onload = function(){
	var snake = new Snake(10,10);
	snake.init("battlefield");
	snake.start();
}