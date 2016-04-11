function RunImg(){}
RunImg.prototype = {
	box:null,//大容器
	boxUl:null,//小容器
	imgUl:null,//图片位置
	imgurl:[],//图片容器
	numlist:null,//容器numlist
	count:0,//总页数
	index:0,//当前页
	play:null,//图片自动切换
	timer:null,//图片切换动画
	arrow:null,//箭头容器
	prev:null,//左️箭头
	next:null,//右箭头
	imgWidth:0,//图片尺寸

	$:function(obj){
		if(typeof obj == "string"){
			if(obj.indexOf("#")>=0){
				obj = obj.replace("#","");
				if(document.getElementById(obj))
					return document.getElementById(obj);
				else{
					throw "没有容器";
				}
			}else{
				return document.createElement(obj);
			}
		}else{
			return obj;
		}
	},
	//初始化
	info:function(id){
		this.count = this.count <=5 ? this.count : 5;
		this.box = this.$(id);
		var count;

		for(var i=0 ; i<2 ; i++){
			var ul = this.$("ul");
			if(i==0) {count = this.count+2;}
			else {count = this.count;}
			for(var j=0 ; j<count ; j++){
				var li = this.$("li");
				li.innerHTML = i == 0 ? this.imgurl[j] : "";
				ul.appendChild(li);
			}
			this.box.appendChild(ul);
		}
		this.boxUl = this.box.getElementsByTagName('ul');
		this.boxUl[0].className = "imglist";
		this.imgUl = this.boxUl[0];
		this.boxUl[1].className = "numlist";
		this.numlist = this.boxUl[1].getElementsByTagName("li");
		this.numlist[0].className = "current";
		this.imgUl.style.left = -(this.imgWidth)+"px";

		this.arrow = this.$("div");
		this.arrow.style.display = "none";
		for(var k=0 ; k<2 ; k++){
			var arr = this.$("a");
			if(k==0){
				this.prev = arr;
				arr.innerHTML = "<";
				arr.className = "arrow prev";
				arr.style.left = "20px";
			}else{
				this.next = arr;
				arr.innerHTML = ">";
				arr.className = "arrow next";
				arr.style.right = "20px";
			}
			arr.href = "#";
			this.arrow.appendChild(arr);
		}
		this.box.appendChild(this.arrow);
	},
	//封装入口
	action:function(){
		this.autoplay();
		this.mouseAction(this.box, this.arrow, this.prev, this.next, this.numlist);
	},
	//获取imgurl的left数值
	getLeft:function(){
		return this.imgUl.style.left.replace("px","");
	},
	//自动添加px值
	setLeft:function(num){
		return num.toString() + "px";
	},
	//圆点动画
	tab:function(){
		for(var i=0 ; i<this.numlist.length ; i++){
			this.numlist[i].className = "";
		}
		switch(this.index){
			case 0:
				this.numlist[this.numlist.length-1].className = "current";
				break;
			case this.count+1:
				this.numlist[0].className = "current";
				break;
			default:
				this.numlist[this.index-1].className = "current";
				break;
		}
	},
	//图片滑动效果
	imgshow:function(obj, target){
		var that = this;
		this.tab();

		clearInterval(this.timer);
		this.timer = setInterval(function(){
			var stop = true;
			var cur = parseInt(that.getLeft());
			var speed = (target-cur) / 8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if(cur != target){
				stop = false;
				obj.style.left = that.setLeft(cur+speed);
			}
			if(stop){
				clearInterval(that.timer);
			}
		},20);
	},
	//自动播放
	autoplay:function(){
		var that = this;
		this.play = setInterval(function(){
			that.next.onclick();
		},3000);
	},
	//鼠标事件
	mouseAction:function(box, arrow, prev, next, numlist){
		var that = this;
		box.onmouseover = function(){
			arrow.style.display = "block";
			clearInterval(that.play);
		};
		box.onmouseout = function(){
			arrow.style.display = "none";
			that.autoplay();
		};
		prev.onclick = function(){
			if(that.index > 0){
				that.index--;
			}else{
				that.index = that.count-1;
				that.imgUl.style.left = -(that.imgWidth*that.count) + "px";
			}
			that.imgshow(that.imgUl, that.index*(-that.imgWidth) );
		};
		next.onclick = function(){
			if(that.index < that.count+1){
				that.index++;
			}else{
				that.index = 2;
				that.imgUl.style.left = -(that.imgWidth) + "px";
			}
			that.imgshow(that.imgUl, that.index*(-that.imgWidth) );
		};
		for(var i=0 ; i<numlist.length ; i++){
			numlist[i].index = i;
			numlist[i].onclick = function(){
				that.index = this.index+1;
				that.imgshow(that.imgUl, that.index*(-that.imgWidth));
			}
		}
	}
}
window.onload = function(){
	var run = new RunImg();
	run.count = 5;	
	run.imgWidth = 490;
	run.imgurl = [
	"<img src=\"http://img03.taobaocdn.com/tps/i3/T1ITuTXbRnXXXXXXXX-490-170.png\"/>",
	"<img src=\"http://i.mmcdn.cn/simba/img/T117eTXmXqXXXXXXXX.jpg\"/>",
	"<img src=\"http://img03.taobaocdn.com/tps/i3/T1t8eTXbBtXXXXXXXX-490-170.png\"/>",
	"<img src=\"http://i.mmcdn.cn/simba/img/T1OVOUXeNjXXXXXXXX.jpg\"/>",
	"<img src=\"http://i.mmcdn.cn/simba/img/T1J.9TXc8lXXXXXXXX.jpg\"/>",
	"<img src=\"http://img03.taobaocdn.com/tps/i3/T1ITuTXbRnXXXXXXXX-490-170.png\"/>",
	"<img src=\"http://i.mmcdn.cn/simba/img/T117eTXmXqXXXXXXXX.jpg\"/>"];
	run.info("#box");
	run.action();
}