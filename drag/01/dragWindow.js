var minWidth = 300;
var minHeight = 200;

function drag(obj){
	var box = document.getElementsByClassName(obj)[0];
	var title = box.getElementsByClassName("title")[0];
	box.style.left = (window.innerWidth - box.offsetWidth)/2 + "px";
	box.style.top = (window.innerHeight - box.offsetHeight)/2 + "px";
	var min = box.getElementsByClassName("min")[0];
	var max = box.getElementsByClassName("max")[0];
	var revert = box.getElementsByClassName("revert")[0];
	var close = box.getElementsByClassName("close")[0];

	//拖动改变窗口位置
	title.onmousedown = function(event){
		var event = event || window.event;
		var disX = event.clientX - box.offsetLeft;
		var disY = event.clientY - box.offsetTop;
		document.onmousemove = function(event){
			var event = event || window.event;
			var moveX = event.clientX - disX;
			var moveY = event.clientY - disY;

			if(moveX < 0){
				moveX = 0;
			}else if(moveX > window.innerWidth - box.offsetWidth){
				moveX = window.innerWidth - box.offsetWidth;
			}
			if (moveY < 0) {
				moveY = 0;
			}else if(moveY > window.innerHeight - box.offsetHeight){
				moveY = window.innerHeight - box.offsetHeight;
			} 
			box.style.left = moveX + "px";
			box.style.top = moveY + "px";
		};
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
		};
		return false;
	};
	//
	min.onclick = close.onclick = function(){
		box.style.display = "none";
		var back = document.createElement("a");
		box.parentNode.appendChild(back);
		back.className = "back";
		back.onclick = function(){
			box.style.display = "block";
			box.parentNode.removeChild(this);
		};
	};
	max.onclick = function(){
		max.style.display = "none";
		revert.style.display = "block";
		box.style.width = window.innerWidth + "px";
		box.style.height = window.innerHeight + "px";
		box.style.left = box.style.top = 0;
	};
	revert.onclick = function(){
		revert.style.display = "none";
		max.style.display = "block";
		box.style.width = minWidth + "px";
		box.style.height = minHeight + "px";
		box.style.left = (window.innerWidth - box.offsetWidth)/2 + "px";
		box.style.top = (window.innerHeight - box.offsetHeight)/2 + "px";
	}
}
function resize(parent, obj, isTop, isLeft, lockX, lockY){
	obj.onmousedown = function(event){
		var event = event || window.event;
		var disX = event.clientX - obj.offsetLeft;
		var disY = event.clientY - obj.offsetTop;
		var iparentW = parent.offsetWidth;
		var iparentH = parent.offsetHeight;
		var iparentL = parent.offsetLeft;
		var iparentT = parent.offsetTop;

		document.onmousemove = function(event){
			var event = event || window.event;

			var iL = event.clientX - disX;
			var iT = event.clientY - disY;
			var MaxW = window.innerWidth - parent.offsetLeft - 2;
			var MaxH = window.innerHeight - parent.offsetTop - 2;
			var iW = isLeft ? iparentW - iL : obj.offsetWidth + iL;
			var iH = isTop ? iparentH - iT : obj.offsetHeight + iT;

			isLeft && (parent.style.left = iparentL + iL + "px");
			isTop && (parent.style.top = iparentT + iT + "px");

			iW < minWidth && (iW = minWidth);
			iW > MaxW && (iW = MaxW);
			lockX || (parent.style.width = iW + "px");

			iH < minHeight && (iH = minHeight);
			iH > MaxH && (iH = MaxH);
			lockY || (parent.style.height = iH + "px");

			if((isLeft && iW == minWidth) || (isTop && iH == minHeight))
				document.onmousemove = null;
			return false;
		};
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
		};
		return false;
	};
}
window.onload = window.onresize = function(){
	drag("box");
	var box = document.getElementsByClassName("box")[0];
	var L = document.getElementsByClassName("resizeL")[0];
	var R = document.getElementsByClassName("resizeR")[0];
	var T = document.getElementsByClassName("resizeT")[0];
	var B = document.getElementsByClassName("resizeD")[0];
	var LT = document.getElementsByClassName("resizeLT")[0];
	var LB = document.getElementsByClassName("resizeLD")[0];
	var RT = document.getElementsByClassName("resizeRT")[0];
	var RB = document.getElementsByClassName("resizeRD")[0];

	resize(box, L, false, true, false, true);
	resize(box, R, false, false, false, true);
	resize(box, T, true, false, true, false);
	resize(box, B, false, false, true, false);
	resize(box, LT, true, true, false, false);
	resize(box, LB, false, true, false, false);
	resize(box, RT, true, false, false, false);
	resize(box, RB, false, false, false, false);
}