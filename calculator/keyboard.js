//键盘事件
EventUtil.addHandler(document.body, "keypress", function(event){
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	var charCode = EventUtil.getCharCode(event);
	//首先把backspace键禁用以免用户退出
	if(event.keyCode == 8)
		EventUtil.preventDefault(event);
	switch(charCode){
		//将输入的运算符添加到显示区域
		case 110: case 107: case 106: case 109: case 111:
			numText.appendData(String.fromCharCode(charCode));
			break;
		//按下enter，等同于界面上的 =
		case 13:
			if(answerText.nodeValue == "Infinity" || answerText.nodeValue == "NaN"){
				numText.nodeValue = "";
			}
			else{
				numText.nodeValue = answerText.nodeValue;
			}
			answerText.nodeValue = "";
			EventUtil.stopPropagation(event);
			break;
	}
	//遇到不是数字的按键取消
	if(!/\d/.test(String.fromCharCode(charCode)) && charCode > 9){
		EventUtil.preventDefault(event);
	}else{
		numText.appendData(String.fromCharCode(charCode));
		calculation();
	}
});
//针对不同浏览器禁用backspace键
EventUtil.addHandler(document.body, "keydown", function(event){
	event = EventUtil.getEvent(event);
	if(event.keyCode == 8)
		EventUtil.preventDefault(event);
});