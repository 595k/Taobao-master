
//定时器
var timer = null;

//检测状态
function checkElementState(path,callback){
	var ele = document.querySelector(path);
	
	if(ele){
		callback && callback();
		
	}else{
		console.log('异步加载元素中....' + path );
		setTimeout( function(){checkElementState(path,callback);},200);
	}
}


//结算
function checkOut(){
	
	console.log('结算开始....');
	var btn = document.getElementById('J_Go');
	
	if(btn){
		btn.click();
	}else{
		console.log('结算按钮没找到');
	}
	
}

function checkOutAsync(){
	checkElementState('#J_Go',checkOut);
}

//提交订单
function submitOrder(){
	
	console.log('提交订单开始....');
	
	checkElementState('.go-btn',function(){
		var btn = document.querySelector(".go-btn");
	
		if(btn){
			btn.click();
		}else{
			console.log('提交订单按钮没找到');
		}
			
	});
}


	
//进入时间判断循环
function enterTimeCheckLoop(callback){
	var date = new Date();
	
	if(checkTime(date)==false){
		console.log('等待开场！');
		setTimeout(function(){ enterTimeCheckLoop(callback);},1000*60*1);//1分钟
		return false;
	}
	
	var diff = Date.parse(dDate) - Date.parse(date) ;
	
	console.log(diff);
	
	if(diff == 30000 ){
		location.reload()
		//console.log('刷新页面数据！');
		
	}else if(diff < - 900 ){
		
		console.log('时间过了！');
		
	}else if(diff < 500 ) {

		callback && callback();
		
		console.log('时间到了！！！');
		
	}else{
		setTimeout(function(){ enterTimeCheckLoop(callback);},400);
		
		//console.log('--');
	}
	
}

//选中商品
function checkCheckbox(){
	
	window.onload = function(){
		
		//全选
		/*var sAll = document.getElementById("J_SelectAll1");
		var sAll_wq = document.querySelector('.wp');
		if(sAll_wq){
			var sAll_wq_selected = sAll_wq.querySelector('.selected');
			if(sAll!=null && sAll_wq_selected==null){
				sAll.dispatchEvent(e);
			}
		}*/
		//部分选中
		var all_class = document.getElementsByClassName("find-similar J_find_similar close");
		
		for(var i=0;i<all_class.length;i++){
			var index = goods_arr.indexOf(all_class[i].getAttribute('data-itemid'))
			if(index>=0){
				//cart-checkbox cart-checkbox-checked
				var str = all_class[i].parentNode.parentNode.parentNode;
				var CheckBoxItem = str.querySelector('.J_CheckBoxItem');
				
				if(CheckBoxItem){
					var cart_checkbox_checked = str.querySelector('.cart-checkbox-checked');
					
					if(cart_checkbox_checked==null){
						CheckBoxItem.dispatchEvent(e);
					}
				}
		
			}
		}
		

	}
	
		
}


//检查开抢时间(前后一小时)
function checkTime(date){
	var index = start_time.indexOf(date.getHours()+1);
	if(index>=0){
		//dDate.setHours(19,59,59.2);
		dDate.setHours(date.getHours(),59,59.2);
		
		//dDate.setSeconds( dDate.getSeconds() + 10 );
		return true;
	}
	var index = start_time.indexOf(date.getHours());
	if(index>=0){
		return true;
	}
	return false;
}


//主要函数
function main(){
	console.log('############################开始抢购脚本############################');
	
	var href = window.location.href;
	if(href.indexOf('cart.taobao.com') > -1 ){
		checkCheckbox();
		//进入时间判断
		enterTimeCheckLoop( checkOutAsync );
	
	}else if(href.indexOf('buy.tmall.com') > -1 || href.indexOf('buy.taobao.com') > -1 ){
		
		var anonymousPC_1 = document.getElementById("anonymousPC_1");
		if(anonymousPC_1){ //匿名购买
			anonymousPC_1.dispatchEvent(e);
		}
		//提交订单页面
		submitOrder();
	}
	
}

	//
	var e = document.createEvent("MouseEvents");
	e.initEvent("click", true, true);


	var goods_arr = ['20739895092'];//商品ID

	//目标时间
	var dDate = new Date();  
	
	var start_time = [20]; //开抢时间  10点和20点开抢
	

	main();