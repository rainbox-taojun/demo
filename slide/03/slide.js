function ImgRun(){}
ImgRun.prototype = {
	box:null,//容器
	imgBox:null,//图片容器
	navBox:null,//导航栏容器
	imgUrl:[],//存放图片
	navWord:[],//存放文字
	imglist:null,
	navlist:null,
	prev:null,
	next:null,
	pagePrev:0,
	index:0,//当前页数
	count:0,//总页数
	timer:null,
	play:null,

	$:function(obj){
		if(typeof obj == "string"){
			if(obj.indexOf("#")>=0){
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
		this.imgBox = this.$("div");
		this.imgBox.className = "imgBox";
		this.navBox = this.$("div");
		this.navBox.className = "navBox";
		this.box.appendChild(this.imgBox);
		this.box.appendChild(this.navBox);
		//载入图片
		for(var i=0 ; i<this.count ; i++){
			var div = this.$("div");
			div.style.opacity = i==0?1:0;
			var a = this.$("a");
			a.innerHTML = this.imgUrl[i];
			a.href = "#";
			div.appendChild(a);
			this.imgBox.appendChild(div);
		}
		//载入导航栏
		var ul= this.$("ul");
		for(i=0 ; i<this.count ; i++){
			var li = this.$("li");
			li.className = i==0?"current":"";
			li.innerHTML = this.navWord[i];
			ul.appendChild(li);
		}
		this.navBox.appendChild(ul);
		//前后左右箭头
		this.prev = this.$("a");
		this.prev.href = "#";
		this.prev.className = "arrow prev";
		this.next = this.$("a");
		this.next.href = "#";
		this.next.className = "arrow next";
		this.box.appendChild(this.prev);
		this.box.appendChild(this.next);
		//
		this.imglist = this.imgBox.getElementsByTagName("div");
		this.navlist = this.navBox.getElementsByTagName("li");
	},
	//封装程序入口
	action:function(){
		this.autoplay();
		this.mouseoverout(this.box,this.navlist,this.prev,this.next);
	},
	imgshow:function(num, navlist, imglist){
		var that = this;
		this.index = num;
		var opaI = 0;
		var opaP = 100;
		for(var i=0 ; i<navlist.length ; i++){
			navlist[i].className = "";
		}
		navlist[this.index].className = "current";
		for( i=0 ; i<imglist.length ; i++){
			imglist[i].style.opacity = 0;
		}
		imglist[this.pagePrev].style.opacity = opaP;
		imglist[this.index].style.opacity = opaI;
		clearInterval(this.timer);

		this.timer = setInterval(function(){
			opaI += 2;
			opaP -= 2;
			if(opaI >= 100){
				opaI = 100;
				opaP = 0;
			}
			imglist[that.pagePrev].style.opacity = opaP/100;
			imglist[that.index].style.opacity = opaI/100;
			if(opaI == 100){
				clearInterval(that.timer);
			}
		},20);

	},
	//自动播放
	autoplay:function(){
		var that = this;
		this.play = setInterval(function(){
			that.pagePrev = that.index;
			that.index++;
			if(that.index >= that.count){that.index = 0;}
			that.imgshow(that.index, that.navlist, that.imglist);
		},3000);
	},
	mouseoverout:function(box, navlist,prev,next){
		var that = this;
		box.onmouseover = function(){
			clearInterval(that.play);
			that.navBox.className = "navBox On";
		};
		box.onmouseout = function(){
			that.autoplay();
			that.navBox.className = "navBox";
		};
		for(var i=0 ; i<navlist.length ; i++){
			navlist[i].index = i;
			navlist[i].onmouseover = function(){
				that.pagePrev = that.index;
				that.imgshow(this.index, that.navlist, that.imglist);
			};
		}
		prev.onclick = function(){
			that.pagePrev = that.index;
			that.imgshow(that.index==0?navlist.length-1:that.index-1, that.navlist, that.imglist);
			return false;
		};
		next.onclick = function(){
			that.pagePrev = that.index;
			that.imgshow(that.index==navlist.length-1?0:that.index+1, that.navlist, that.imglist);
			return false;
		};
	}

}

window.onload = function() {
	var run = new ImgRun();
	run.imgUrl = [
	"<img src=\"http://g-ec4.images-amazon.com/images/G/28/kindle/merch/2016/Gen7_eInk/wk10_GW/wk11_1500x300_b._CB295350837_.jpg\">",
	"<img src=\"http://g-ec4.images-amazon.com/images/G/28/modernfamily/gw/phase2_2/xiezhu_20160301_modern_family_phas2_2_1500300._CB294699280_.jpg\">",
	"<img src=\"http://g-ec4.images-amazon.com/images/G/28/liwenbei/2016/feb/modern-keycampaign-PC0303_moden._V296061874_SX1500_SY300_.jpg\">",
	"<img src=\"http://g-ec4.images-amazon.com/images/G/28/liumingjie/2016/3/b100g20/ATF_1500X300._CB294700986_SX1500_SY300_.jpg\">",
	"<img src=\"http://g-ec4.images-amazon.com/images/G/28/bag/2016w8_DIsale_ATF._CB298188961_SX1500_SY300_.png\">",
	"<img src=\"http://g-ec4.images-amazon.com/images/G/28/a_toy/channel/toy_1500x300_lego_88zhe_1603._CB296493598_SX1500_SY300_.jpg\">",
	"<img src=\"http://g-ec4.images-amazon.com/images/G/28/pettest/201603loyal199-30TCG._CB295032569_SX1500_SY300_.jpg\">",
	"<img src=\"http://g-ec4.images-amazon.com/images/G/28/LE/2016/S7_PC_ATF_160311_fffcf9._CB294874731_SX1500_SY300_.jpg\">"];
	run.navWord = [
	"买kindle就送<br>¥1000旅游代金券",
	"居品类促销<br>最高立减400元",
	"索康尼全新上市<br>99元起",
	"45万中文图书<br>满100减20元",
	"健康生活吃好喝好<br>满199减100",
	"大牌金饰满减促销<br>最高立减258元",
	"精选运动健身<br>下单立减200元",
	"索尼电视<br>三月家装季",];
	run.count = 8;
	run.info("#box");
	run.action();
}