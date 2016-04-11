function card(){}
card.prototype = {
	box:null,//容器
	imgUrl:[],//存放图片
	count:0,//图片数量
	main:null,//图片容器
	nav:null,//标签页导航
	imglist:null,//
	imgWidth:0,//图片宽度
	inner:null,//
	index:0,//当前页
	timer:null,

	$:function(obj){
		if(typeof obj == "string"){
			if(obj.indexOf("#") >= 0){
				obj = obj.replace("#", "");
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
		var that = this;
		this.box = this.$(id);
		var top = this.$("div");
		top.className = "top";
		this.box.appendChild(top);

		var bar = this.$("div");
		bar.className = "bar";
		this.box.appendChild(bar);

		this.main = this.$("div");
		this.main.className = "main";
		this.nav = this.$("nav");
		this.nav.className = "menu";
		for(var i=0 ; i<this.count ; i++){
			var a = this.$("a");
			a.innerHTML = i+1;
			a.href = "javascript:;";
			a.className = i==0?"on":"";
			this.nav.appendChild(a);
		}
		this.main.appendChild(this.nav);

		this.inner = this.$("div");
		this.inner.className = "inner";
		this.imglist = this.$("ul");
		for(i=0 ; i<this.count ; i++){
			var li = this.$("li");
			li.innerHTML = this.imgUrl[i];
			this.imglist.appendChild(li);
		}
		this.imglist.style.left = 0;
		this.inner.appendChild(this.imglist);
		this.main.appendChild(this.inner);
		this.box.appendChild(this.main);

		this.numlist = this.nav.getElementsByTagName('a');
		this.imgWidth = this.imglist.getElementsByTagName("li")[0].offsetWidth;

		var bottom = this.$("div");
		bottom.className = "bottom";
		this.box.appendChild(bottom);
	},
	//
	action:function(){
		this.mouseAction(this.numlist);
	},
	//图片滑动 target目标位置
	imgshow:function(obj, target){
		for(var i=0 ; i<this.count ; i++){
			this.numlist[i].className = "";
		}
		this.numlist[this.index].className = "on";
			
		obj.style.transform = 'translate(' + (target) + 'px, 0)';
		obj.style.transition = '.5s';
	},
	//鼠标事件
	mouseAction:function(numlist){
		var that = this;
		for(var i=0 ; i<numlist.length ; i++){
			numlist[i].index = i;
			numlist[i].onclick = function(){
				that.index = this.index;
				that.imgshow(that.imglist, -that.index*that.imgWidth);
			}
		}
	}
}
window.onload = function(){
	var pcCard = new card();
	pcCard.imgUrl = [
	"<img src=\"images/1.jpg\">",
	"<img src=\"images/2.jpg\">",
	"<img src=\"images/3.jpg\">"];
	pcCard.count = 3;
	pcCard.info("#warp");
	pcCard.action();
}