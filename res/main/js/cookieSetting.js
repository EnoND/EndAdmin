define('cookieSetting', function(require, exports, module){
        // var $ = require("jquery");
        var cookie = require("jquery_cookie");

        //加载
        function init(){
          cookie("navbar")?"":cookie("navbar", false);
          cookie("menu")?"":cookie("menu", false);
          cookie("breadcrumb")?"":cookie("breadcrumb", false);
          cookie("container")?"":cookie("container", false);
          cookie("menu_mini")?"":cookie("menu_mini", false);
          // console.info(cookie("navbar"));
        }

        //设置悬浮
        function setting(){
          $("[name='ckbSetting']").each(function(){
            if($(this).val() === "1"){    //导航悬浮
              if(cookie("navbar") === "true"){
                $(".navbar").addClass("navbar-fixed-top");
                $("body").addClass("navbar-fixed");
                $(this).prop("checked", true);
              }else{
                $(".navbar").removeClass("navbar-fixed-top");
                $("body").removeClass("navbar-fixed");
                $(this).prop("checked", false);
              }
            }
            if($(this).val() === "2"){    //左侧菜单悬浮
              if(cookie("menu") === "true"){
                $(".sidebar").addClass("sidebar_fixed");
                $(this).prop("checked", true);
              }else{
                $(".sidebar").removeClass("sidebar_fixed");
                $(this).prop("checked", false);
              }
            }
            if($(this).val() === "3"){    //面包屑悬浮
              if(cookie("breadcrumb") === "true"){
                $(".breadcrumb").addClass("breadcrumb_fixed");
                $(".container_shadow").addClass("container_fixed");
                // $("body").removeClass("navbar_fixed");
                // $("body").addClass("navbar_breadcrumb_fixed");
                $(this).prop("checked", true);
              }else{
                $(".breadcrumb").removeClass("breadcrumb_fixed");
                $(".container_shadow").removeClass("container_fixed");
                // $("body").removeClass("navbar_breadcrumb_fixed");
                $(this).prop("checked", false);
              }
            }
            if($(this).val() === "4"){    //窄屏
              if(cookie("container") === "true"){
                $(".container_shadow").addClass("container");
                $(".navbar_container").addClass("container");
                $(this).prop("checked", true);
              }else{
                $(".container_shadow").removeClass("container");
                $(".navbar_container").removeClass("container");
                $(this).prop("checked", false);
              }
            }
          });

          //设置mini菜单
          if(cookie("menu_mini") === "true"){
            $(".sidebar").addClass("bsMenu_mini");
          }else{
            $(".sidebar").removeClass("bsMenu_mini");
          }
        }

        return {
          init:init,
          setting:setting
        }
      });