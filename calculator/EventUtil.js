//所有对元素添加或删除事件，用它进行
var EventUtil = {
	//添加方法
	addHandler: function(element,type, handler){
		//可以使用addEventListener就用它
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		//如果是IE就用ie独有的方法
		}else if(element.attachEvent){
			element.attachEvent("on" + type, handler);
		//以上两种都不行用dom0级添加方法
		}else{
			element["on" + type] = handler;
		}
	},
	//获取event变量
	getEvent: function(event){
		return event ? event : window.event;
	},
	//获取事件的目标 事件源
	getTarget: function(event){
		return event.target || event.srcElement;
	},
	//取消默认行为
	preventDefault: function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	},
	//删除方法
	removeHandler: function(element,type,handler){
		if(element.removeEventListener){
			element.removeEventListener(type,handler,false);
		}else if(element.detachEvent){
			element.detachEvent("on" + type, handler);
		}else{
			element["on" + type] = null;
		}
	},
	//取消事件冒泡
	stopPropagation: function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
	},
	//获取相关元素(mouseout从哪里到哪里)
	getRelatedTarget: function(event){
		if (event.relatedTarget) {
			return event.relatedTarget;
		}else if(event.toElement){
			return event.toElement;
		}else if(event.fromElement){
			return event.fromElement;
		}else{
			return null;
		}
	},
	//鼠标事件
	getButton: function(event){
		if(doucment.implementation.hasFeature("MouseEvents", "2.0")){
			return event.button;
		}else{
			switch(event.button){
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
					return 0;
				case 2:
				case 6:
					return 2;
				case 4:
					return 1;
			}
		}
	},
	//获取键盘字符编码
	getCharCode: function(event){
		if(typeof event.charCode == "number"){
			return event.charCode;
		}else{
			return event.keyCode;
		}
	},
	//剪贴板事件
	getClipboardText: function(event){
		var clipboardData = (event.clipboardData || window.clipboardData);
		return clipboardData.getData("text");
	},
	setClipboardText: function(event){
		if(event.clipboardData){
			return event.clipboardData.setData("text/plain", value);
		}else if(window.clipboardData){
			return window.clipboardData.setData("text", value);
		}
	}
};