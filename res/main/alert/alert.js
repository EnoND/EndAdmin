//重新封装的  layer 弹窗
define(function(require, exports, module){
	// var $ = require("jquery");
	var layer = require("layer").layer;

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

	//接口
	return {
		layer: layer,
		html: html,
		dom: dom
	}
});