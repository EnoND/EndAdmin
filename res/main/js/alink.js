/**
* 处理a标签的ajax内容跳转
*/
define(function(require, exports, module){
  var layer = require('layer').layer;
  var menu = require('menu');
  var cookie = require("jquery_cookie");
  var setting = require("cookieSetting");

  var defaults = {
    scope: 'body'
  };
  //加载
  function init(option){
    var options = $.extend(defaults, option);   //读取和初始化 公共参数
    $(document).on("mouseup", options.scope+" a[data-ajax='true']", function(e){
      var obj = $(this);
      var href = obj.attr("href");
      var reg = /javascript|[^\w]/
      if(href && reg.test(href)){ //判断是否合法 
        var index = layer.load(null,0);
        $(".main_content").hide();
        $(".main_content").load(href,function(response,status,xhr){      //ajax页面加载
          layer.close(index);
          setting.setting();
          $(".main_content").show();
          if(status === "success" && cookie("phone") === "true"){    //如果加载成功 再关闭菜单（也是防止打开子菜单时误关闭了菜单）
            menu.selectItem(obj.attr("href"));
            menu.togglePhoneMenu(false);
          }
        });
      }
    });
    $(document).on("click", options.scope+" a[data-ajax='true']", function(){   //取消a标签的href跳转
      console.info("link");
      return false;
    });
  }

  function load(href){
    var reg = /javascript|[^\w]/
    if(href && reg.test(href)){ //判断是否合法 
        var index = layer.load(null,0);
        $(".main_content").hide();
        $(".main_content").html("");
        $(".main_content").load(href,function(response,status,xhr){      //ajax页面加载
          layer.close(index);
          setting.setting();
          $(".main_content").show();
          if(status === "success" && cookie("phone") === "true"){    //如果加载成功 再关闭菜单（也是防止打开子菜单时误关闭了菜单）
            menu.selectItem(obj.attr("href"));
            menu.togglePhoneMenu(false);
          }
        });
      }
  }

  return {
    init:init,
    load: load
  }
});