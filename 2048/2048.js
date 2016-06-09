function My2048(width, height){
	this.width = width;
	this.height = height;
	this.length = width*height;
	this.grid = [];for(var i=0 ; i<this.length ; i++) this.grid[i] = 0;
	this.prev = [];//上次移动数据
	this.oldScore = 0;
	this.color = ['(238,228,218)','(237,224,200)','(242,177,121)','(244,152,100)','(246,127,95)','(246,94,59)','(236,207,114)','(237,204,97)','(231,196,78)','(237,197,63)','(237,194,47)','(61,58,51)'];
	this.box = null;
	this.score = 0;//游戏得分 分数计算机制是，旧分数加上新的两块相加的合
}
My2048.prototype = {
	//初始化棋盘
	init:function(id){
		this.box = document.getElementById(id);
		var ul = "";
		for(var i=0 ; i<this.height ; i++){
			var row = "";
			for(var j=0 ; j<this.width ; j++){
				if(j==0){
					row += "<ul><li id='" + "li_"+(i*this.width+j) + "'></li>";
				}else{
					row += "<li id='" + "li_"+(i*this.width+j) + "'></li>";
				}
				if(j==this.width-1){
					row += "</ul>";
				}
			}
			ul += row;
		}
		this.box.innerHTML += "<div class='gameBox'>"+ul+"</div>";
		var scoreNode = "<div class='score'><span>得分</span><span class='score-num'>0</span></div>";
		this.box.innerHTML += "<h1>2048</h1>"+scoreNode;
		this.box.innerHTML += "<button class='revocation'></button>";
		this.box.innerHTML += "<button class='reset'></button>";
		this.box.innerHTML += "<button class='home'></button>";
	},
	//生成随机位置的方块
	random:function(){
		var num = [2,2,2,2];
		var nextNum = Math.floor(Math.random()*4+0);
		var nextLoca = 0;
		for( ; ; ){
			nextLoca = Math.floor(Math.random()*this.length+0);
			if(this.grid[nextLoca] == 0){
				this.grid[nextLoca] = num[nextNum];
				break;
			}
		}
		this.draw();
	},
	//将数组中的状态显示在界面中
	draw:function(){
		//全部初始化样式
		for(var i=0 ; i<this.length ; i++){
			document.getElementById("li_"+i).innerHTML = '';
			document.getElementById("li_"+i).style.backgroundColor = 'rgb(206,192,178)';
			document.getElementById("li_"+i).style.color = "#fff";
			document.getElementById("li_"+i).style.fontSize = "50px";
		}
		for(var i=0 ; i<this.length ; i++){
			if(this.grid[i] != 0){
				document.getElementById("li_"+i).innerHTML = this.grid[i];
				this.changeColor("li_"+i);
			}
		}
	},
	//改变方块颜色
	changeColor:function(id){
		var num = document.getElementById(id).innerHTML;
		for(var i=1 ; i<=this.color.length ; i++){
			if(Math.pow(2,i) == num){
				break;
			}
		}
		if(num == 2 || num == 4){
			document.getElementById(id).style.color = "#606060";
		}
		if(num > 1024){
			document.getElementById(id).style.fontSize = "30px";
		}
		document.getElementById(id).style.backgroundColor = "rgb" + this.color[i];
	},
	//计算得分
	countScore:function(num){
		this.oldScore = this.score;
		this.score += num;
		document.getElementsByClassName("score-num")[0].innerHTML = this.score;
	},
	merge:function(str){
		var temp;
		for(var i=0 ; i<str.length-1 ; i++){
			for(var j=i+1 ; j<str.length ; j++){
				if(str[i]==0){
					break;
				}
				if(str[i]==str[j]){
					str[i]*=2;
					this.countScore(str[i]);
					str[j]=0;
					break;
				}else if(str[j] != 0){
					break;
				}
			}
		}
		//把0扔到最后
		for(var i=0 ; i<str.length-1 ; i++){
			for(var j=i+1 ; j<str.length ; j++){
				if(str[i]==0 && str[j]!=0){
					temp = str[i];
					str[i] = str[j];
					str[j] = temp;
					break;
				}
			}
		}
	},
	//移动方块
	moveGrid:function(arrow){
		var step1 = 1;//i
		var srep2 = 0;//j
		var start = 0;
		var end1 = 0;//i
		var end2 = 0;//j
		var str = [];
		switch(arrow){
			case 't':case 'b':
				start = 0;
				end1 = this.width;
				end2 = this.length-this.width+1;
				step1 = 1;
				step2 = this.width;
				break;
			case 'l':case 'r':
				start = 0;
				end1 = this.length-this.width+1;
				end2 = this.width;
				step1 = this.width;
				step2 = 1;
				break;
			default:
				break;
		}
		//合并相邻并且相同方块
		for(var i=start ; i<end1 ; i+=step1){
			str.length = 0;

			for(var j=i ; j<end2+i ; j+=step2){
				str.push(this.grid[j]);
			}
			if(arrow == 'b' || arrow == 'r'){
				str.reverse();
			}
			this.merge(str);
			if(arrow == 'b' || arrow == 'r'){
				str.reverse();
			}
			for(var j=i ; j<end2+i ; j+=step2){
				this.grid[j] = str.shift();
			}
		}
		this.draw();
	},
	//键盘操作
	keyboardEvent:function(){
		var that = this;
		document.body.onkeyup = function(event){
			var event = event || window.event;
			var flag = false;
			for(var i=0 ; i<that.length ; i++){
				that.prev[i] = that.grid[i];
			}
			switch(event.keyCode){
				case 37:
					that.moveGrid('l');
					break;
				case 39:
					that.moveGrid('r');
					break;
				case 40:
					that.moveGrid('b');
					break;
				case 38:
					that.moveGrid('t');
					break;
				default:
					return false;
			}
			for(var i=0 ; i<that.length ; i++){
				if(that.prev[i] != that.grid[i]){
					flag = true;
					break;
				}
			}
			if(flag){
				that.random();
			}
			if(!that.canMove()){
				console.log("GG");
				document.getElementsByClassName("die")[0].style.display="block";
				return false;
			}
		}
	},
	btn:function(){
		var that = this;
		var play = document.getElementById("play");
		var home = document.getElementsByClassName("home")[0];
		var revocation = document.getElementsByClassName("revocation")[0];
		var reset = document.getElementsByClassName("reset")[0];
		home.onclick = function(){
			 document.getElementById("game").style.display = "none";
			  document.getElementsByClassName("start")[0].style.display = "block";
		}
		play.onclick = function(){
			 document.getElementById("game").style.display = "block";
			 document.getElementsByClassName("start")[0].style.display = "none";
			 that.begin();
		}
		revocation.onclick = function(){
			for(var i=0 ; i<that.length ; i++){
				that.grid[i] = that.prev[i];
			}
			that.score = that.oldScore;
			document.getElementsByClassName("score-num")[0].innerHTML = that.score;
			document.getElementsByClassName("die")[0].style.display="none";
			that.draw();
		}
		reset.onclick = function(){
			that.score = that.oldScore = 0;
			that.countScore(that.score);
			that.begin();
		}
	},
	//判断能否移动
	canMove:function(){
		//竖排对比
		for(var i=0 ; i<this.width ; i++){
			for(var j=i ; j<(this.height-1)*this.width+i ; j+=this.width){
				if(this.grid[j] == 0 || this.grid[j+this.width] == 0){
					return true;
				}else if(this.grid[j] == this.grid[j+this.width]){
					return true;
				}
			}
		}
		//横排对比
		for(var i=0 ; i<this.length ; i+=this.width){
			for(var j=i ; j<i+this.width-1 ; j++){
				if(this.grid[j] == this.grid[j+1]){
					return true;
				}
			}
		}
		return false;
	},
	//初始化数字 游戏开始 重置
	begin:function(){
		document.getElementsByClassName("die")[0].style.display="none";
		for(var i=0 ; i<this.length ; i++){
			document.getElementById("li_"+i).innerHTML = '';
			this.grid[i] = 0;
		}
		this.random();
		this.random();
		this.keyboardEvent();
	},
}
window.onload = function(){
	var my2048 = new My2048(4,4);
	my2048.init("game");
	my2048.btn();
}