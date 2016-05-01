//container容器 count总页数 pageindex当前页数
function setPage(container,count,pageindex){
	var container = container;
	var count = count;
	var pageindex = pageindex;
	var a = [];

	//prev
	if (pageindex == 1) {
		a[a.length] = "<a href=\"#\" class=\"prev unclick\">prev</a>";
	}else{
		a[a.length] = "<a href=\"#\" class=\"prev\">prev</a>";
	}

	var setPageList = function(){
		if(pageindex == i){
			a[a.length] = "<a href=\"#\" class=\"on\">"+i+"</a>";
		}else{
			a[a.length] = "<a href=\"#\">"+i+"</a>";
		}
	}
	if (count<=10) {
		for(var i=1 ; i <= count ; i++){
			setPageList();
		}
	}else{
		if (pageindex <= 4) {
			for(var i=1 ; i<=5 ; i++){
				setPageList();
			}
			a[a.length] = "...<a href=\"#\">" + count + "</a>";
		}else if (pageindex >= count-3) {
			a[a.length] = "<a href=\"#\">" + 1 + "</a>...";
			for(var i=count-4 ; i<= count ;i++){
				setPageList();
			}
		}else{
			a[a.length] = "<a href=\"#\">" + 1 + "</a>...";
			for(var i=pageindex-2 ; i<= pageindex+2 ; i++){
				setPageList();
			}
			a[a.length] = "...<a href=\"#\">" + count + "</a>";
		}

	}
	//next
	if(pageindex == count){
		a[a.length] = "<a href=\"#\" class=\"next unclick\">next</a>";
	}else{
		a[a.length] = "<a href=\"#\" class=\"next\">next</a>";
	}
	container.innerHTML = a.join("");

	var pageClick = function(){
		var inx = pageindex;
		var oAlink = container.getElementsByTagName("a");
		oAlink[0].onclick = function(){
			if (inx == 1) {
				return false;
			}
			setPage(container, count, --inx);
			return false;
		}
		for(var i=1 ; i<oAlink.length-1 ; i++){
			oAlink[i].onclick = function(){
				inx = parseInt(this.innerHTML);
				setPage(container, count, inx);
			}
		}
		inx = pageindex;
		oAlink[oAlink.length-1].onclick = function(){
			if(inx == count){
				return false;
			}
			setPage(container, count, ++inx);
		}
	}()
}
window.onload = function(){
	setPage(document.getElementsByTagName('div')[0], 11, 5);
}