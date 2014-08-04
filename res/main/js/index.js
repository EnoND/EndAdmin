$(function() {
  if (/msie/.test(navigator.userAgent.toLowerCase())) { //如果是ie
    location.href = "bsie.html";
  }
});
//首页js模块
define(function(require, exports, module) {
  // var $ = require('jquery');
  //初始化系统设置
  seajs.use(['cookieSetting', 'alink'], function(setting, alink) {
    setting.init();
    
    //加载处理a标签ajax跳转
    alink.init({ scope: '.main_content' });
    alink.init({ scope: 'nav' });
  });

  //菜单加载，并处理单击事件
  seajs.use(["menu"], function(menu) {
    menu.init({
      selector: "#menu", //菜单选择器 默认  #menu;
      beforeClick: function(obj) { //执行跳转前回调，返回false 停止跳转。默认返回true
        // console.info(obj);
      },
      itemClick: function(obj) { //跳转后执行，无返回值
        // console.info(obj);
      }
    });
  });

  //监听设置选中的checkbox
  seajs.use(['jquery_cookie'], function(cookie) {
    $("input[name='ckbSetting']").click(function() {
      selectCbk($(this));
    });
    //选中checkbox
    var selectCbk = function(obj) {
      if ($(obj).prop("checked")) {
        if ($(obj).val() === "3") {
          $("input[name='ckbSetting'][value='1'],input[name='ckbSetting'][value='2']").prop("checked", true);
        } else if ($(obj).val() === "2") {
          $("input[name='ckbSetting'][value='1']").prop("checked", true);
        }
      } else {
        if ($(obj).val() === "1") {
          $("input[name='ckbSetting'][value='2'],input[name='ckbSetting'][value='3']").prop("checked", false);
        } else if ($(obj).val() === "2") {
          $("input[name='ckbSetting'][value='3']").prop("checked", false);
        }
      }
    }
  });

  //系统设置弹窗
  var settingDialog; //弹窗index
  function alertSetting() {
    seajs.use(['alert', 'cookieSetting'], function(dialog, setting) {
      // setting.setting();    //读取 系统设置默认选中
      settingDialog = dialog.dom("系统设置", "#settingDialog", "190px", "200px", function() {
        setting.setting();
        dialog.layer.close(settingDialog);
      }, function() {});
    });
  }

  //初始化 回到顶部按钮
  $(window).scroll(function(e) {
    $(this).scrollTop() > 0 ? ($(".btn_scroll_up").is(":hidden") ? $(".btn_scroll_up").click(function() {
      $("body,html").stop().animate({
        scrollTop: 0
      }, 500);
    }).show() : 0) : $(".btn_scroll_up").hide().unload();
  });

  return {
    alertSetting: alertSetting
  }
});

//打开设置菜单
function alertSetting() {
  seajs.use(['./res/main/js/index.js'], function(index) {
    index.alertSetting();
  });
}