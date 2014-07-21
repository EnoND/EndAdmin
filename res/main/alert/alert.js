//重新封装的  layer 弹窗
define(function(require, exports, module){

	var layer = require("layer").layer;

	//html弹窗，传入html内容
	var html = function(title, html, width, height, yes, no){
		var btns = 0;
		if(yes){btns++;}
		if(no){btns++;}
		return $.layer({
		    type: 1,
		    title: title || false,
		    area: [width || 'auto', height || 'auto'],
		    shade: [0.5, '#000'],
		    page: {
		        html: html
		    },
		    btns: btns,
		    btn: ['确定', '取消'],
		    yes: yes || function(){},
		    no: no || function(){},
		    success: function(){
		        layer.shift('top', 200); //动画弹出
		    }
		});
	}
	// dom弹窗，只需selecter
	var dom = function(title, dom, width, height, yes, no){
		var btns = 0;
		if(yes){btns++;}
		if(no){btns++;}
		return $.layer({
		    type: 1,
		    title: title || false,
		    area: [width || 'auto', height || 'auto'],
		    shade: [0.5, '#000'],
		    page: {
		        dom: dom
		    },
		    btns: btns,
		    btn: ['确定', '取消'],
		    yes: yes || function(){},
		    no: no || function(){},
		    success: function(){
		    	$(dom).show();
		        layer.shift('top', 200); //动画弹出
		    },
		    end: function(){
		    	$(dom).hide();
		    }
		});
	}

	//tip 封装
	var tip = function(content, obj, parme){
		var parme = parme || {};
		var defaults = {
	        style: ['background-color:#000; color:#fff', '#000'],
	        maxWidth:150
	    };
	    defaults = $.extend(defaults, parme);
		return layer.tips(content, obj, defaults);
	}

	//接口
	return {
		layer: layer,
		html: html,
		tip: tip,
		dom: dom
	}
});