define(function(require, exports, module) {
  // var $ = require("jquery");
  var cookie = require("jquery_cookie");
  require("jquery_json");

  var adminSetting = getSetting();

  //加载
  function init() {
    adminSetting.phone = $(window).width() < 768 ? true : false;
    saveSetting(adminSetting);
    $(window).resize(function() {
      adminSetting.phone = $(window).width() < 768 ? true : false;
      saveSetting(adminSetting);
    });

    //===========读取cookie初始化设置=============
    //导航悬浮
    if (adminSetting.navbar) {
      $(".navbar").addClass("navbar-fixed-top");
      $("body").addClass("navbar-fixed");
      $("#settingDialog input[value='1']").prop("checked", true);
    } else {
      $(".navbar").removeClass("navbar-fixed-top");
      $("body").removeClass("navbar-fixed");
      $("#settingDialog input[value='1']").prop("checked", false);
    }
    //左侧菜单悬浮
    if (adminSetting.menu) {
      $(".sidebar").addClass("sidebar_fixed");
      $("#settingDialog input[value='2']").prop("checked", true);
    } else {
      $(".sidebar").removeClass("sidebar_fixed");
      $("#settingDialog input[value='2']").prop("checked", false);
    }
    //面包屑悬浮
    if (adminSetting.breadcrumb) {
      $(".breadcrumb").addClass("breadcrumb_fixed");
      $(".container_shadow").addClass("container_fixed");
      $("#settingDialog input[value='3']").prop("checked", true);
    } else {
      $(".breadcrumb").removeClass("breadcrumb_fixed");
      $(".container_shadow").removeClass("container_fixed");
      $("#settingDialog input[value='3']").prop("checked", false);
    }
    //窄屏
    if (adminSetting.container) {
      $(".container_shadow").addClass("container");
      $(".navbar_container").addClass("container");
      $("#settingDialog input[value='4']").prop("checked", true);
    } else {
      $(".container_shadow").removeClass("container");
      $(".navbar_container").removeClass("container");
      $("#settingDialog input[value='4']").prop("checked", false);
    }

    //设置mini菜单
    if (adminSetting.menu_mini) {
      $(".sidebar").addClass("bsMenu_mini");
    } else {
      $(".sidebar").removeClass("bsMenu_mini");
    }
  }

  //通过读取设置弹窗来设置悬浮
  function setting() {
    adminSetting = getSetting();
    //导航悬浮
    if ($("#settingDialog input[value='1']").prop("checked")) {
      $(".navbar").addClass("navbar-fixed-top");
      $("body").addClass("navbar-fixed");
      adminSetting.navbar = true;
    } else {
      $(".navbar").removeClass("navbar-fixed-top");
      $("body").removeClass("navbar-fixed");
      adminSetting.navbar = false;
    }
    //左侧菜单悬浮
    if ($("#settingDialog input[value='2']").prop("checked")) {
      $(".sidebar").addClass("sidebar_fixed");
      adminSetting.menu = true;
    } else {
      $(".sidebar").removeClass("sidebar_fixed");
      adminSetting.menu = false;
    }
    //面包屑悬浮
    if ($("#settingDialog input[value='3']").prop("checked")) {
      $(".breadcrumb").addClass("breadcrumb_fixed");
      $(".container_shadow").addClass("container_fixed");
      adminSetting.breadcrumb = true;
    } else {
      $(".breadcrumb").removeClass("breadcrumb_fixed");
      $(".container_shadow").removeClass("container_fixed");
      adminSetting.breadcrumb = false;
    } //窄屏
    if ($("#settingDialog input[value='4']").prop("checked")) {
      $(".container_shadow").addClass("container");
      $(".navbar_container").addClass("container");
      adminSetting.container = true;
    } else {
      $(".container_shadow").removeClass("container");
      $(".navbar_container").removeClass("container");
      adminSetting.container = false;
    }

    //设置mini菜单
    if (adminSetting.menu_mini) {
      $(".sidebar").addClass("bsMenu_mini");
    } else {
      $(".sidebar").removeClass("bsMenu_mini");
    }
    saveSetting(adminSetting);
  }

  //保存设置
  var saveSetting = function(setting){
    cookie("adminSetting", JSON.stringify(setting));
  }

  //获得设置
  function getSetting(){
    return cookie("adminSetting")?$.parseJSON(cookie("adminSetting")) : new Object();
  }

  return {
    init: init,
    setting: setting,
    saveSetting: saveSetting,
    getSetting: getSetting
  }
});