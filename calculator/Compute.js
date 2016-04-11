//返回符号优先级 position代表是否在堆栈内 1代表在栈内 0表示在栈外
Math.opWeightValue = function(op,position){
	switch(op){
		case '(':
			if(position == 1) return 1;					//栈内最小
			else return 10;								//栈外最大
		case '*': case '/':
			return 4;
		case '+': case '-':
			return 3;
		case '%': case '^': case '√':
			return 5;
		default:
			throw "未知的符号" + op;
	}
}
//修正js浮点数计算精度问题
Math.formatFloat = function(f, digit){
	var m = Math.pow(10, digit);
	return parseInt(f*m, 10) / m;
}
//获取小数位数
Math.getDigit = function(num){
	var s = num.toString().split(".");
	if(s[1]) return s[1].length;
	else return 0;
}
