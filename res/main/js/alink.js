/**
* 处理a标签的ajax内容跳转
*/
define(function(require, exports, module){
  var layer = require('layer').layer;
  var menu = require('menu');

  var defaults = {
    scope: ''
  };
  //加载
  function init(option){
    var options = $.extend(defaults, option);   //读取和初始化 公共参数
    $(options.scope+" a[data-ajax='true']").on("mouseup", function(e){
      var obj = $(this);
      var index = layer.load(null,0);
      $(".main_content").hide();
      $(".main_content").load($(this).attr("href"),function(){      //ajax页面加载
        layer.close(index);
        // setting.setting();
        $(".main_content").show();
        menu.selectItem(obj.attr("href"));
      });
    });
    $(options.scope+" a[data-ajax='true']").on("click", function(){   //取消a标签的href跳转
      return false;
    });
  }

  return {
    init:init
  }
});