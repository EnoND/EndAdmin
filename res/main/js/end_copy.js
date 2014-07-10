/**
* End Admin 统一加载复制按钮
*/
define(function(require, exports, module){
  var hijs = require('highlight');
  // var layer = require('layer').layer;
  // var menu = require('menu');

  var defaults = {
    scope: ''
  };
  //加载
  function init(){
    // var client = new ZeroClipboard( document.getElementById("btn_copy") );   //copy-button是复制按钮的id
    var client = new ZeroClipboard($(".btn_copy"));
    client.on("ready", function(readyEvent){    //加载事件
      client.on( "copy", function( event ) {    //点击按钮事件
        console.info(event);
        console.info($(event.target).next("pre").find("code").text());
        ZeroClipboard.setData({
          'text/plain': $(event.target).next("pre").find("code").text()   //动态设置要复制的内容
        });
      });

      client.on("aftercopy", function(event){   //点击按钮之后 触发 事件
        // $("#copyShow").append(event.data["text/html"]+"");    //event.data["text/html"] 获取该格式的内容

        console.info(event.data["text/plain"]);
      });
    });
  }

  return {
    init:init
  }
});