function ImgRun(){}
ImgRun.prototype = {
	box:null,//最外容器
	tab:null,//分页标签容器
	tabAction:null,
	imgCount:null,//每页图片数
	count:0,//总页数
	imgBox:null,//隐藏溢出区域的图片
	imgContainer:null,//图片容器 滑动他
	width:0,//容器可视宽度
	imgUrl:[],//存放图片
	prev:null,//
	next:null,//
	timer:null,//图片滑动效果
	play:null,//图片自动循环
	index:0,//当前页

	$:function(obj){
		if(typeof obj == "string"){
			if(obj.indexOf("#") >= 0){
				obj = obj.replace("#","");
				if(document.getElementById(obj)){
					return document.getElementById(obj);
				}else{
					throw "没有容器";
					return null;
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
		this.box = this.$(id);
		this.width = this.box.offsetWidth;
		//分页标签
		this.tab = this.$("div");
		this.tab.className = "tab";
		this.box.appendChild(this.tab);
		var ul = this.$("ul");
		for(var i=0 ; i<2 ; i++){
			var li = this.$("li");
			li.innerHTML = " ";
			li.className = i==0?"page on":"page";
			ul.appendChild(li);
		}
		this.tab.appendChild(ul);
		//载入图片
		this.imgBox = this.$("div");
		this.imgBox.className = "imgBox";
		this.imgContainer = this.$("div");
		this.imgContainer.className = "container";
		for(i=0 ; i<2 ; i++){
			var imgul = this.$("ul");
			for(var j=0; j<this.imgCount ; j++){
				var imgli = this.$("li");
				var a = this.$("a");
				a.href = "#"
				a.innerHTML = i==0?this.imgUrl[j]:this.imgUrl[j+this.imgCount];
				imgli.appendChild(a);
				imgul.appendChild(imgli);
			}
			this.imgContainer.appendChild(imgul);
		}
		this.imgContainer.innerHTML += this.imgContainer.innerHTML;
		this.imgBox.appendChild(this.imgContainer);
		this.box.appendChild(this.imgBox);
		//左右方向箭头
		for(i=0 ; i<2 ; i++){
			var arrow = this.$("a");
			arrow.href = "#";
			if(i == 0){
				this.prev = arrow;
				arrow.className = "arrow prev";
				arrow.innerHTML = "<";
			}else{
				this.next = arrow;
				arrow.className = "arrow next";
				arrow.innerHTML = ">";
			}
			this.box.appendChild(arrow);
		}
	},
	//封装入口
	action:function(){
		this.autoplay();
		this.mouseoverout(this.box, this.prev, this.next);
	},
	setLeft:function(num){
		return num.toString() + "px";
	},
	getLeft:function(){
		return this.imgContainer.style.left.replace("px", "");
	},
	tabScr:function(){
		var tabli = this.tab.getElementsByTagName('li');
		var t = tabli[0].className;
		tabli[0].className = tabli[1].className;
		tabli[1].className = t;
	},
	//滑动效果
	scroll:function(obj, target){
		var that = this;
		clearInterval(this.timer);
		this.tabScr();

		this.timer = setInterval(function(){
			var stop = true;
			var start = parseInt(that.getLeft());
			var speed = (target-start)/8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			if(start != target){
				stop = false;
				obj.style.left = that.setLeft(start+speed);
			}
			if(stop){
				clearInterval(that.timer);
			}
		},30);
	},
	//自动播放
	autoplay:function(){
		var that = this;
		this.play = setInterval(function(){
			that.next.onclick();
		},3000);
	},
	//鼠标事件
	mouseoverout:function(box, prev, next){
		var that = this;
		box.onmouseover = function(){
			clearInterval(that.play);
		};
		box.onmouseout = function(){
			that.autoplay();
		};
		prev.onclick = function(){
			if(that.index > 0){
				that.index--;
			}else{
				that.index = that.count-1;
				that.imgContainer.style.left = that.setLeft(that.count*-that.width);
			}
			that.scroll(that.imgContainer, -that.index*that.width);
		};
		next.onclick = function(){
			if(that.index < that.count){
				that.index++;
			}else{
				that.index = that.count-1;
				that.imgContainer.style.left = 0;
			}
			that.scroll(that.imgContainer, -that.index*that.width);
		};
	}

}
window.onload = function(){
	var run = new ImgRun();
	run.imgUrl = [
	"<img src=\"http://p4.music.126.net/NvWqhjmxm3TLyTMyZdbEGw==/3411784581722851.jpg?param=200y200\">",
	"<img src=\"http://p3.music.126.net/IEeAe3ndDG8uadAVP-gSfQ==/1409573909400400.jpg?param=200y200\">",
	"<img src=\"http://p4.music.126.net/oR3zmBf5ZwoVPEz36NdvxA==/3253454916152312.jpg?param=140y140\">",
	"<img src=\"http://p3.music.126.net/sreBHTClWG7OW58wIRa5dA==/1364493973896475.jpg?param=200y200\">",
	"<img src=\"http://p3.music.126.net/yudV6QVMrvUy-KdyYJfDqA==/3297435383115329.jpg?param=200y200\">",
	"<img src=\"http://p3.music.126.net/0H5iltbAjygsy0DxU2v8rA==/6016527627199824.jpg?param=200y200\">",
	"<img src=\"http://p4.music.126.net/69UvJeww927sMtnjfwlO0Q==/1371091002111924.jpg?param=140y140\">",
	"<img src=\"http://p4.music.126.net/VjPPjRrphW1C61EaLpZnkQ==/1405175862939299.jpg?param=140y140\">",
	"<img src=\"http://p3.music.126.net/xaPQ8FujJ4HfwDQ3acorEw==/1365593504416269.jpg?param=140y140\">",
	"<img src=\"http://p3.music.126.net/V4SGa2kzXgR_ei4h7GkzpA==/1417270491047832.jpg?param=140y140\">",
	"<img src=\"http://p4.music.126.net/Uv5b2CbOJbgesFFuyhwvvg==/1396379769792268.jpg?param=140y140\">",
	"<img src=\"http://p4.music.126.net/9FDsBTCJk15UmxEu_DIrSw==/3262251005717734.jpg?param=140y140\">"];
	run.imgCount = 6;
	run.count = 2;
	run.info("#box");
	run.action();
}