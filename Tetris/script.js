function Tetris(){
	this.box = null;
	this.tetromino = [
		[0x0f00,0x4444,0x0f00,0x4444],//I
		[0x04e0,0x0464,0x00e4,0x04c4],//T
		[0x4620,0x6c00,0x4620,0x6c00],//反Z
		[0x2640,0xc600,0x2640,0xc600],//Z
		[0x6220,0x1700,0x2230,0x0740],//7
		[0x6440,0x0e20,0x44c0,0x8e00],//反7
		[0x0660,0x0660,0x0660,0x0660]//o
	];
	this.pob = [4,5,6,7,14,15,16,17,24,25,26,27,34,35,36,37];//方块出现区域
	this.next = null;
	this.speed = 500;
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
		this.next = (this.tetromino[Math.floor(Math.random() * 7 + 0)])[Math.floor(Math.random() * 4 + 0)].toString(2);
		for( ; ; ){
			if(this.next.length < 16) this.next = '0' + this.next;
			else break;
		}
		for(var i=0 ; i<this.next.length ; i++){
			if(this.next[i] == 1){
				document.getElementById("li_"+this.pob[i]).className = "on";
			}
		}
	},
	run:function(){
		
	},
	start:function(){
		this.random();
	}
}
window.onload = function(){
	var tetris = new Tetris();
	tetris.init("box");
	tetris.start();
}