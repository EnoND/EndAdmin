/**
* End Admin 统一加载复制按钮
* 实际项目中 基本无需该插件
*/
define(function(require, exports, module){
  // var hijs = require('highlight');
  var zero = require('zeroClipboard');
  var myDialog = require('alert');

  var defaults = {
    btn: '.btn_copy'    //复制按钮的选择器
  };

  var copyTip;    //复制按钮的提示
  //加载
  function init(options){
    var options = $.extend(defaults, options);
    var btn = $(options.btn);
    var client = new zero(btn);
    client.on("ready", function(readyEvent){    //加载事件
      client.on( "copy", function( event ) {    //点击按钮事件
        zero.setData({
          'text/plain': $(event.target).next("pre").find("code").text()   //动态设置要复制的内容
        });
      });

      client.on("aftercopy", function(event){   //点击按钮之后 触发 事件
        var msg = "失败";
        if(event.success["text/plain"]){
          msg = "复制成功";
        }
        console.info(msg);
        copyTip = myDialog.tip(msg, nowBtn);
        
      });
    });

    //tips小提示
    var nowBtn;
    $(options.btn).mouseenter(function(){
      nowBtn = this;
      copyTip = myDialog.tip("点击复制", nowBtn);
    }).mouseleave(function(){
      myDialog.layer.close(copyTip);
    })
  }

  return {
    init:init
  }
});