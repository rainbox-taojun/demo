function Tetris(){
	this.box = null;
	this.tetromino = [
		[0x0f00,0x4444,0x0f00,0x4444],//I
		[0x04e0,0x0464,0x00e4,0x04c4],//T
		[0x4620,0x6c00,0x4620,0x6c00],//反Z
		[0x2640,0xc600,0x2640,0xc600],//Z
		[0x6220,0x1700,0x2230,0x0740],//7
		[0x6440,0x0e20,0x44c0,0x8e00],//反7
		[0x0660,0x0660,0x0660,0x0660]//O
	];
	this.pob = [4,5,6,7,14,15,16,17,24,25,26,27,34,35,36,37];//方块出现区域
	this.body = [];
	this.next = null;//方块样式
	this.specific = null;//方块具体方向
	this.timer = null;
	this.speed = 500;
	this.flag = true;//是否应该生成新的方块
	this.go = null;
}
Tetris.prototype = {
	init:function(id){
		this.box = document.getElementById(id);
		var ul = "";
		for(var i=0 ; i<20 ; i++){
			var row = '';
			for(var j=0 ; j<10 ; j++){
				if(j==0){
					row += "<ul><li id='" + "li_"+(i*10+j+1) + "'></li>";
				}else{
					row += "<li id='" + "li_"+(i*10+j+1)+ "'></li>";
				}
				if(j == 9){
					row += "</ul>";
				}
			}
			ul += row;
		}
		this.box.innerHTML += ul;
	},
	//随机生成方块类型
	random:function(){
		this.next = Math.floor(Math.random() * 7 + 0);
		this.specific = Math.floor(Math.random() * 4 + 0);
		var matrix = this.tetromino[this.next][this.specific].toString(2);
		this.body.length = 0;
		for( ; ; ){
			if(matrix.length < 16) matrix = '0' + matrix;
			else break;
		}
		for(var i=0 ; i<matrix.length ; i++){
			if(matrix[i] == 1){
				document.getElementById("li_"+this.pob[i]).className = "on";
				this.body.push(this.pob[i]);
			}
		}
	},
	run:function(){
		this.flag = false;
		var stop = false;
		var that = this;
		clearInterval(this.timer);
		this.timer = setInterval(function(){
			console.log(that.body);
			for(var i=that.body.length-1 ; i>=0 ; i--){
				if(that.body[i]+10>200 || document.getElementById("li_"+(that.body[i]+10)).className == "off"){
					stop = true;
					break;
				}
			}
			if(!stop){
				for(var i=that.body.length-1 ; i>=0 ; i--){
					document.getElementById("li_"+that.body[i]).className = '';
					that.body[i] += 10;
					document.getElementById("li_"+that.body[i]).className = "on";
				}
			}else{
				that.flag = true;
				for(var j=0 ; j<that.body.length ; j++){
					document.getElementById("li_"+that.body[j]).className = "off";
				}
				clearInterval(that.timer);
			}
		},that.speed);
	},
	play:function(){
		var that = this;
		this.go = setInterval(function(){
			if(that.flag){
				that.random();
				that.run();
			}
		},1000)
	},
	start:function(){
		this.play();
	}
}
window.onload = function(){
	var tetris = new Tetris();
	tetris.init("box");
	tetris.start();
}