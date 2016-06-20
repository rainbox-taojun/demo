function ajax(obj){
	obj = obj || {};

	var type = obj.type || 'GET';
	var url = obj.url || '';
	var async = obj.async || true;
	var data = obj.data || null;
	var success = obj.success || function(){};

	var xhr = null;
	if(typeof XMLHttpRequest != "undefined"){
		xhr = new XMLHttpRequest();
	}else if(typeof ActiveXObject != "undefined"){
		if(typeof arguments.callee.activeXString != "string"){
			var versions = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"];

			for(var i=0 ; i<versions.length ; i++){
				try{
					new ActiveXObject(versions[i]);
					arguments.callee.activeXString = versions[i];
					break;
				}catch(ex){
					//none
				}
			}
		}
		xhr = new ActiveXObject(arguments.callee.activeXString);
	}else{
		throw new Error("No XHR object available.");
	}
	var params = [];
	for(var key in data){
		params.push(key + "=" + data[key]);
	}
	var dataStr = params.join("&");
	if(type == "post"){
		xhr.open(type,url,async);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(dataStr);
	}else{
		xhr.open(type,url + '?' + dataStr,async);
		xhr.send(null);
	}

	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			success(xhr.responseText);
		}
	};
}