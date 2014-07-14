define(function(require, exports, module){
	var cookie = require("jquery_cookie");		//引入jq
	// require("../css/menu.css");
	var animating = false;		//是否在动画中
	var speed = 200;		//动画速度

	var defaults = {
		selector: ".bsMenu",		//选择器
		itemClick: function(){}		//点击每项回调
	};

	//加载
	var init = function(options){
		var options = $.extend(defaults, options);
		var obj = $(options.selector);
		obj.addClass("bsMenu");
		obj.find("li ul").addClass("submenu well");
		obj.find(".active").parents("ul").addClass("open");
		obj.find("li a").mouseup(function(){ toggleItem($(this)); });
		obj.find("li a[data-ajax='true']").click(function(){ return false; });		//绑定单击事件
		$(".bsMenu_collapse a").click(function(){ 
			cookie("menu_mini") === "false"?cookie("menu_mini", "true"):cookie("menu_mini", "false");
			mini(); 
		});		//绑定mini 单击事件
		//初始化mini
		mini();

		//手机版 打开菜单按钮
		$("#btnMenu").click(function(){
			togglePhoneMenu();
		});
	}

	//显示或隐藏下级菜单
	var toggleItem = function(item){
		if(!animating){
			var parent = item.parent("li");		//获得父li
			var submenu = parent.find(">ul.submenu");		//获得子菜单
			
			if(submenu[0]){
				animating = true;
				if(parent.hasClass("open")){
					parent.removeClass("open");
					submenu.slideUp(speed, function(){ animating = false; });
				}else{
					parent.addClass("open").siblings("li.open").removeClass("open").find("ul.submenu").slideUp(speed);
					submenu.slideDown(speed, function(){ animating = false; });
				}
			}else{
				$(".bsMenu a.active").removeClass("active");
				item.addClass("active");
				if(cookie("menu_mini") === "true"){
					item.parents("li").find("a:first").addClass("active");
				}
				$(".sbMenu li.open").removeClass("open").find("ul.submenu").slideUp(speed);
			}
		}
		defaults.itemClick(item);		//点击回调
	}

	//mini菜单切换
	var mini = function(){
		if(cookie("menu_mini") === "true"){
			$(".sidebar").addClass("bsMenu_mini");

			//绑定鼠标移开事件
			$(".bsMenu > li").mouseenter(function(){
				$(this).addClass("open").find(".submenu").css("display","block");
			}).mouseleave(function(){
				$("li.open").removeClass("open").find("ul").css("display","none");
			});
		}else{
			$(".sidebar").removeClass("bsMenu_mini");
			$(".bsMenu > li").unbind();		//移除事件
		}
	}

	//监听浏览器大小变化
	var resize = function(){
		$(window).resize(function() {
			if($(window).width() <= 768){

			}
		});
	}

	//根据href的值来选中 菜单中的某一项
	var selectItem = function(url){
		toggleItem($(".bsMenu a[href='"+url+"']"));
	}

	//手机版 打开或关闭菜单方法
	var togglePhoneMenu = function(){
		if(!animating){
			animating = true;
			// $(".sidebar").is(":hidden")?($(".sidebar").show(),$(this).addClass("active")):($(".sidebar").removeAttr("style"),$(this).removeClass("active"));
			$(".sidebar").is(":hidden")?($(".sidebar").css({left:"-190px",display:"block"}),$(".sidebar").animate({left:0},speed,function(){animating=false;}),$(this).addClass("active")):($(".sidebar").animate({left:"-190px"},speed,function(){animating=false;$(this).removeClass("active").removeAttr("style");}));
			$(".sidebar").removeClass("bsMenu_mini");
			$(".bsMenu > li").unbind();		//移除事件
			cookie("menu_mini", false);
		}
	}

	return {
		init: init,
		mini: mini,
		selectItem: selectItem,
		togglePhoneMenu: togglePhoneMenu
	}
});