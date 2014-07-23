/*!
 * _path 获取文件所在的绝对路径
 * _args 获取main.js文件后的url参数组，如：main.js?self=true&path=aero中的?后面的内容
 */
var  urlParameters = (function(script){
    var l = script.length;
    for(var i = 0; i < l; i++){
    	me = !!document.querySelector ? script[i].src : script[i].getAttribute('src',4);
    	if( me.substr(me.lastIndexOf('/')).indexOf('menu_hover') !== -1 ){
    		break;
    	}
    }
    return me.split('?')[1];
})(document.getElementsByTagName('script'));

/*!
 * 获取url参数值函数
 * @param  {String}
 * @return {String||null}
 * @demo main.js?path=aero | _getArgs('path') => 'aero'
 */
var _getArgs = function(name){
    if(urlParameters){
	    var p = urlParameters.split('&'), i = 0, l = p.length, a;
		for( ; i < l; i++ )		{
		    a = p[i].split('=');
			if( name === a[0] ) return a[1];
		}
	}
	return null;
}

seajs.config({
  alias: {
    // 'jquery': './res/public/jquery/jquery.min',
    'jquery_cookie': 'public/jquery/jquery.cookie',   //cookie插件
    'jquery_json': 'public/jquery/jquery.json.min',     //json插件
    'bootstrap': 'public/bootstrap/js/bootstrap.min',   //BS
    'layer':'public/layer/layer.min',   //弹窗
    'alert': 'main/alert/alert',    //封装的弹窗
    'cookieSetting': 'main/js/cookieSetting',   //处理外观设置
    'menu': 'main/menu/js/menu',   //左侧菜单
    'zeroClipboard': 'public/zeroClipboard/ZeroClipboard.min',   //flash 复制
    'alink': 'main/js/alink',      //处理a标签的ajax跳转
    'endCopy': 'main/js/end_copy'   //复制插件初始化
  },
  // base:_getArgs("path")||"",
  // base:"/admin",
  debug: 1
});