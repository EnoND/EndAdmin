define(function(require, exports, module) {
	var cookie = require("jquery_cookie"); //引入cookie
	var layer = require("layer").layer;
	var setting = require("cookieSetting");

  	var adminSetting = setting.getSetting();
	// var alink = require("alink");

	var animating = false; //是否在动画中
	var speed = 200; //动画速度

	var defaults = {
		selector: ".bsMenu", //选择器
		beforeClick: function() {
			return true;
		}, //单击之前回调
		itemClick: function() {} //点击每项回调
	};

	//加载
	var init = function(options) {
		var options = $.extend(defaults, options);
		var obj = $(options.selector);
		obj.addClass("bsMenu");
		obj.find("li ul").addClass("submenu well");
		obj.find(".active").parents("ul").addClass("open");
		obj.find("li a").mouseup(function() {
			toggleItem($(this));
		});
		obj.find("li a[data-ajax='true']").click(function() {
			return false;
		});
		//初始化mini
		mini();

		//手机版 打开菜单按钮
		$("#btnMenu").click(function() {
			togglePhoneMenu();
		});
	}

	//显示或隐藏下级菜单
	var toggleItem = function(item) {
		if (!animating) {
			var parent = item.parent("li"); //获得父li
			var submenu = parent.find(">ul.submenu"); //获得子菜单

			if (submenu[0]) {
				animating = true;
				if (parent.hasClass("open")) {
					parent.removeClass("open");
					submenu.slideUp(speed, function() {
						animating = false;
					});
				} else {
					parent.addClass("open").siblings("li.open").removeClass("open").find("ul.submenu").slideUp(speed);
					submenu.slideDown(speed, function() {
						animating = false;
					});
				}
			} else {
				$(".bsMenu a.active").removeClass("active");
				item.addClass("active").parents("li.open").find("a:first").addClass("active"); //选中点击的a标签  同时选中 根标签	
				$(".sbMenu li.open").removeClass("open").find("ul.submenu").slideUp(speed);
			}
			var bool = defaults.beforeClick(item);
			bool = (bool == null) ? true : bool; //如果没有返回值，默认true
			if (bool) { //返回 false 不继续执行
				var href = item.attr("href");
				var reg = /javascript|[^\w]/
				if (href && reg.test(href)) { //判断是否合法 
					var index = layer.load(null, 0); //打开loading
					$(".main_content").hide();
					$(".main_content").load(href, function(response, status, xhr) { //ajax页面加载
						layer.close(index); //关闭loading
						setting.setting();
						$(".main_content").show();
						if (status === "success" && cookie("phone") === "true") { //如果加载成功 再关闭菜单（也是防止打开子菜单时误关闭了菜单）
							togglePhoneMenu();
						}
					});
					// $.get(href, function(data){
					// 	if(typeof(data) === "string"){
					// 		layer.close(index); //关闭loading
					// 		$(".main_content").html(data).show();
					// 		setting.setting();
					// 		if (status === "success" && cookie("phone") === "true") { //如果加载成功 再关闭菜单（也是防止打开子菜单时误关闭了菜单）
					// 			togglePhoneMenu();
					// 		}
					// 	}
					// 	defaults.itemClick(item, data); //点击回调
					// });
				}
			}
			defaults.itemClick(item); //点击回调
		}
	}

	//mini菜单初始化
	var mini = function() {
		$(".bsMenu_collapse a").click(function() {
			if(!$(".sidebar").hasClass("bsMenu_mini")){
				$(".sidebar").addClass("bsMenu_mini");
				//绑定鼠标移开事件
				$(".bsMenu > li").mouseenter(function() {
					$(this).addClass("open").find(">.submenu").css("display", "block");
				}).mouseleave(function() {
					$("li.open").removeClass("open").find(">.submenu").css("display", "none");
				});
				adminSetting.menu_mini = true;
			}else{
				$(".sidebar").removeClass("bsMenu_mini");
				$(".bsMenu > li").unbind(); //移除事件
				adminSetting.menu_mini = false;
			}
			setting.saveSetting(adminSetting);
		});
	}

	//根据href的值来选中 菜单中的某一项
	var selectItem = function(url) {
		toggleItem($(".bsMenu a[href='" + url + "']"));
	}

	//手机版 打开或关闭菜单方法
	var togglePhoneMenu = function(bool) {
		if (!animating) {
			animating = true;
			if (bool == null) bool = $(".sidebar").is(":hidden");
			// $(".sidebar").is(":hidden")?($(".sidebar").show(),$(this).addClass("active")):($(".sidebar").removeAttr("style"),$(this).removeClass("active"));
			bool ? ($(".sidebar").css({
				left: "-190px",
				display: "block"
			}), $(".sidebar").animate({
				left: 0
			}, speed, function() {
				animating = false;
			}), $(this).addClass("active")) : ($(".sidebar").animate({
				left: "-190px"
			}, speed, function() {
				animating = false;
				$(this).removeClass("active").removeAttr("style");
			}));
			$(".sidebar").removeClass("bsMenu_mini");
			$(".bsMenu > li").unbind(); //移除事件
			adminSetting.menu_mini = false;
			setting.saveSetting(adminSetting);
			// cookie("menu_mini", false);
		}
	}

	return {
		init: init,
		mini: mini,
		selectItem: selectItem,
		togglePhoneMenu: togglePhoneMenu
	}
});