function Calculator(){}
Calculator.prototype = {
	numText:null,//输入的表达式文本
	answerText:null,//显示结果文本
	//初始化
	initialization:function(){
		this.numText = document.getElementById("number");
		this.answerText = document.getElementById("answer");
	},
	//按钮封装程序入口
	buttonAction:function(){
		this.btnAction("numberButton","#707070","#404040");
		this.btnAction("opButton","#707070","#505050");
		this.btnAction("op2Table","#33CCCC","#33FFCC");
		this.delText();
		this.openOp2button();
	},
	//按钮功能、变色
	btnAction:function(btnName,color1,color2){
		var btn = document.getElementById(btnName);
		var that = this;
		EventUtil.addHandler(btn, "click", function(event){
			event = EventUtil.getEvent(event);
			var target = EventUtil.getTarget(event);
			//事件委托
			switch(target.id){
				case '=':
					if(that.answerText.innerHTML == "Infinity" || that.answerText.innerHTML == "NaN"){
						that.numText.innerHTML = "";
					}
					else{
						that.numText.innerHTML = that.answerText.innerHTML;
					}
					that.answerText.innerHTML = "";
					EventUtil.stopPropagation(event);
					break;
				case 'del':
					if(that.numText.innerHTML.length > 0){
						that.numText.firstChild.deleteData(that.numText.innerHTML.length-1,1);
					}
					break;
				default:
					EventUtil.preventDefault(event);
					that.numText.innerHTML += target.id;
					break;
			}
		});
		EventUtil.addHandler(btn, "mouseover", function(event){
			event = EventUtil.getEvent(event);
			var target = EventUtil.getTarget(event);

			target.style.backgroundColor = color1;
		});
		EventUtil.addHandler(btn, "mouseout", function(event){
			event = EventUtil.getEvent(event);
			var target = EventUtil.getTarget(event);
		
			target.style.backgroundColor = color2;
		});
	},
	//del长按事件
	delText:function(){
		var delBtn = document.getElementById("del");
		var mark = false;		//用于记录鼠标的状态，down为true，up为false
		var that = this;
		EventUtil.addHandler(delBtn, "mousedown", function(){
			mark = true;
			//延时750毫秒后检测鼠标是否触发mouseup，没触发则视为长按事件
			setTimeout(function(){
				if(mark){
					that.answerText.innerHTML = "";
					that.numText.innerHTML = "";
				}
			},750);
		});
		EventUtil.addHandler(delBtn, "mouseup", function(){
			mark = false;
		});
	},
	//二级菜单
	openOp2button: function(){
		var open = document.getElementById("op2Button");
		var mark = false;
		EventUtil.addHandler(open, "mouseover", function(event){
			mark = true;
			setTimeout(function(){
				if(mark){
					document.getElementById("op2Table").style.display = "block";
				}else{
					document.getElementById("op2Table").style.display = "none";
				}
			},500);
		});
		EventUtil.addHandler(open, "mouseout", function(event){
			mark = false;
			setTimeout(function(){
				if(mark){
					document.getElementById("op2Table").style.display = "block";
				}else{
					document.getElementById("op2Table").style.display = "none";
				}
			},500);
		});
	},
	calculation:function(){
		EventUtil.addHandler(document.body, "click", function(){
			var formula = document.getElementById("number").innerHTML;			//获取表达式
			for( ; formula.length > 0 ; ){//去掉末尾无效的运算符
				if(formula[formula.length-1] == '%') break;
				if(isNaN(parseFloat(formula[formula.length-1])))
					formula = formula.slice(0, formula.length-1);
				else
					break;
			}
			var isne = true;//负数
			var rpn = "";					//储存逆波兰表达式
			var op = new Array();			//储存符号的堆栈
			//模块1－－中缀表达式转为逆波兰表达式
			for(var i=0, len=formula.length; i<len; i++){
				//是数字则直接存入rpn
				if(!isNaN(parseFloat(formula[i])) || formula[i] == '.'){
				rpn = rpn + formula[i];
				//遇到右括号
				}else if(formula[i] == ')'){
					(function(){
						for( ; op.length > 0 ; ){
							//遇到做括号 出栈不输出
							if(op[op.length-1] == '('){
								op.pop();
								break;
							}
							rpn = rpn + ' ';
							rpn = rpn + op.pop();
							rpn = rpn + ' ';
						}
					})();
				//遇到运算符
				}else{
					isne = true;
					//如果符号栈是空的直接压入
					if(op.length == 0){
						rpn = rpn + ' ';
						op.push(formula[i]);
						rpn = rpn + ' ';
					//优先级比栈内符号大 压入栈
					}else if(Math.opWeightValue(op[op.length-1], 1) < Math.opWeightValue(formula[i], 0) ){
						rpn = rpn + ' ';
						op.push(formula[i]);
						rpn = rpn + ' ';
					//优先级比栈内符号 小 或 相等
					}else{
						//符号栈一直弹出，直到栈空 或 栈内符号 小于 栈外符号
						for( ; op.length > 0 ; ){
							//栈内符号 小于 栈外符号 结束弹出
							if(Math.opWeightValue(op[op.length-1],1) <= Math.opWeightValue(formula[i], 0)){
								rpn = rpn + ' ';
								rpn = rpn + op.pop();
								rpn = rpn + ' ';
								break;
							}
							rpn = rpn + ' ';
							rpn = rpn + op.pop();
							rpn = rpn + ' ';
						}
						op.push(formula[i]);
					}
				}
			}
			for(;op.length > 0;){
				if(op[op.length-1] == '(') op.pop();
				else{
					rpn = rpn + ' '; 
					rpn = rpn + op.pop();
					rpn = rpn + ' ';
				}
			}
			console.log(rpn);
			//模块2－－计算逆波兰表达式
			(function(){
				var a, b, max;
				var numStack = new Array();		//储存数字的堆栈
				var numArray = rpn.split(" ");	//以空格来分割字符串
				for(var i=0, len=numArray.length ; i<len ; i++){
					//是数字压入堆栈
					if(!isNaN(parseFloat(numArray[i]))){
						numStack.push(parseFloat(numArray[i]));
					//无数据跳过
					}else if(numArray[i] == ""){
						continue;
					//遇到运算符进一步进行判断
					}else{		
						switch(numArray[i]){
							case '+':
								a = numStack.pop();
								b = numStack.pop();
								//获取ab最高的小数数位
								max = Math.max(Math.getDigit(a), Math.getDigit(b));
								numStack.push(Math.formatFloat(a + b, max));
								break;
							case '-':
								a = numStack.pop();
								b = numStack.pop();
								max = Math.max(Math.getDigit(a), Math.getDigit(b));
								numStack.push(Math.formatFloat(b-a, max));
								break;
							case '*':
								a = numStack.pop();
								b = numStack.pop();
								//结果的数位是ab小数数位之和
								max = Math.getDigit(a) + Math.getDigit(b);
								numStack.push(Math.formatFloat(b*a, max));
								break;
							case '/':
								a = numStack.pop();
								b = numStack.pop();
								max = Math.max(Math.getDigit(a), Math.getDigit(b));
								numStack.push(b/a);
								break;
							case '^':
								b = numStack.pop();
								a = numStack.pop();
								numStack.push(Math.pow(a,b));
								break;
							case '%':
								numStack.push(numStack.pop()/100);
								break;
							case '√':
								numStack.push(Math.sqrt(numStack.pop()));
								break;
							default:
								throw "未知的符号";
								break;
							}
						}	
					}
				var end = numStack.pop();
				//表达式为空时，不输出
				if(end == undefined)
					document.getElementById("answer").innerHTML = "";
				//将结果存入答案区域
				else
					document.getElementById("answer").innerHTML = end;
			})(rpn);
		})
	}
}