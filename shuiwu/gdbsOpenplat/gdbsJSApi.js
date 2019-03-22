(function(window,undefined){var APPKEY,VERSION;var unparam=function(e){var t={},n=[];if(typeof e!=="string"){return t}e=e.replace(/\?/g,"");n=e.split("&");for(var a=0;a<n.length;a++){var o=n[a].split("=");var i=o[0];var s=o[1];if(!t[i]){t[i]=s}else{if(typeof t[i]==="string"){t[i]=[s]}else{t[i].push(s)}}}return t};var jsonp=function(e){var t={url:"",charset:"UTF-8",timeout:30*1e3,args:{},onComplete:null,onTimeout:null,responseName:null,varkey:"callback"};var n=-1;t=parseParam(t,e);var a=t.responseName||"GDBSSDK_"+Math.floor(Math.random()*1e3)+(new Date).getTime().toString();t.args[t.varkey]=a;var o=t.onComplete;var i=t.onTimeout;window[a]=function(e){if(n!=2&&o!=null){n=1;o(e);t.onComplete=null}};t.onTimeout=function(){if(n!=1&&i!=null){n=2;i()}};return loadJs(t)};var trim=function(e){if(typeof e!=="string"){throw"trim need a string as parameter"}var t=e.length;var n=0;var a=/(\u3000|\s|\t|\u00A0)/;while(n<t){if(!a.test(e.charAt(n))){break}n+=1}while(t>n){if(!a.test(e.charAt(t-1))){break}t-=1}return e.slice(n,t)};var convertEmptyStr=function(e){if(trim(e)==""||e==null||e=="null"||e=="undefined"||e==undefined){return""}return e};var loadJs=function(e){var t,n;var a={url:"",charset:"UTF-8",timeout:30*1e3,args:{},onComplete:null,onTimeout:null,uniqueID:null};a=parseParam(a,e);if(a.url==""){throw"url is null"}t=document.createElement("script");t.charset="UTF-8";var o=/msie/i.test(navigator.userAgent);if(a.onComplete!=null){if(o){t.onreadystatechange=function(){if(t.readyState.toLowerCase()=="complete"||t.readyState.toLowerCase()=="loaded"){clearTimeout(n);a.onComplete();t.onreadystatechange=null}}}else{t.onload=function(){clearTimeout(n);a.onComplete();t.onload=null}}}var i=function(e){if(e){var t=[];for(var n in e){t.push(n+"="+encodeURIComponent(trim(e[n])))}if(t.length){return t.join("&")}else{return""}}};var s=i(a.args);if(a.url.indexOf("?")==-1){if(s!=""){s="?"+s}}else{if(s!=""){s="&"+s}}t.src=a.url+s;document.getElementsByTagName("head")[0].appendChild(t);if(a.timeout>0&&a.onTimeout!=null){n=setTimeout(function(){a.onTimeout()},a.timeout)}return t};var parseParam=function(e,t,n){var a,o={};t=t||{};for(a in e){o[a]=e[a];if(t[a]!=null){if(n){if(e.hasOwnProperty[a]){o[a]=t[a]}}else{o[a]=t[a]}}}return o};var getAppInfo=function(){var e=document.getElementsByTagName("script");var t,n=0,a,o;if(e.length>0){t=e[n];while(t){if(/gdbsJSApi/i.test(t.src)){a=t.src.split("?").pop();break}t=e[n++]}}o=unparam(a);APPKEY=o.appkey;VERSION=o.v;return{appkey:APPKEY,version:VERSION}};var isArrContain=function(e,t){for(var n=0;n<e.length;n++){if(e[n]==t){return true}}return false};function selfEncodeUri(e){var t="";if(/ipad|iphone|mac|iOS/i.test(navigator.userAgent)){e=e.replace(/[\r\n]/g,"");var n=/[\u4E00-\u9FA5\uF900-\uFA2D]/;for(var a=0;a<e.length;a++){var o=e.charAt(a);if(n.test(o)){o=encodeURIComponent(o)}t+=o}}else{t=e}return t}var wgs84togcj02=function(e,t){var n=3.141592653589793;var a=6378245;var o=.006693421622965943;if(out_of_china(e,t)){return{lng:e,lat:t}}else{var i=transformlat(e-105,t-35);var s=transformlng(e-105,t-35);var r=t/180*n;var c=Math.sin(r);c=1-o*c*c;var l=Math.sqrt(c);i=i*180/(a*(1-o)/(c*l)*n);s=s*180/(a/l*Math.cos(r)*n);var d=t+i;var u=e+s;return{lng:u,lat:d}}};var gcj02tobd09=function(e,t){var n=3.141592653589793*3e3/180;var a=e,o=t;var i=Math.sqrt(a*a+o*o)+2e-5*Math.sin(o*n);var s=Math.atan2(o,a)+3e-6*Math.cos(a*n);var r=i*Math.cos(s)+.0065;var c=i*Math.sin(s)+.006;return{lng:r,lat:c}};var out_of_china=function(e,t){return e<72.004||e>137.8347||(t<.8293||t>55.8271||false)};var transformlat=function(e,t){var n=3.141592653589793;var a=-100+2*e+3*t+.2*t*t+.1*e*t+.2*Math.sqrt(Math.abs(e));a+=(20*Math.sin(6*e*n)+20*Math.sin(2*e*n))*2/3;a+=(20*Math.sin(t*n)+40*Math.sin(t/3*n))*2/3;a+=(160*Math.sin(t/12*n)+320*Math.sin(t*n/30))*2/3;return a};var transformlng=function(e,t){var n=3.141592653589793;var a=300+e+2*t+.1*e*e+.1*e*t+.1*Math.sqrt(Math.abs(e));a+=(20*Math.sin(6*e*n)+20*Math.sin(2*e*n))*2/3;a+=(20*Math.sin(e*n)+40*Math.sin(e/3*n))*2/3;a+=(150*Math.sin(e/12*n)+300*Math.sin(e/30*n))*2/3;return a};var hostPrefix="https://wap.gdbs.gov.cn";var ua=window.navigator.userAgent.toLowerCase();if(ua.match(/MicroMessenger/i)=="micromessenger"){document.write('<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>');var url=encodeURIComponent(window.location.href.split("#")[0]);jsonp({url:hostPrefix+"/gdbsWX/authController/getJsapiTicket?url="+url,responseName:"callWxGetJsapiTicket",onComplete:function(e){var t=e.signature,n=e.noncestr,a=e.timestamp,o=e.appId;wx.config({debug:false,appId:o,timestamp:a,nonceStr:n,signature:t,jsApiList:["getLocation","scanQRCode","chooseImage","closeWindow","checkJsApi"]});wx.ready(function(){});wx.error(function(e){var t=e})}})}var jssdkCallStatics=function(e){jsonp({url:hostPrefix+"/gdbsOpenplat/js/callStatics?version="+VERSION+"&appkey="+APPKEY+"&interName="+e})};var gdbs={init:function(){var e=getAppInfo();this.appkey=e.appkey;this.version=e.version},applyResult:function(paramJson){jssdkCallStatics("applyResult");var xhr;try{xhr=new ActiveXObject("Msxml2.XMLHTTP")}catch(e){try{xhr=new ActiveXObject("Microsoft.XMLHTTP")}catch(e){xhr=new XMLHttpRequest}}var serviceCode="",access_token="",applyNo="",random="",itemConfigId="",accessNo="",success=function(e){},fail=function(e){};try{itemConfigId=paramJson.itemConfigId;access_token=paramJson.access_token;applyNo=paramJson.applyNo;success=paramJson.success;random=paramJson.random;serviceCode=paramJson.serviceCode;accessNo=paramJson.accessNo;fail=paramJson.fail}catch(e){}xhr.onreadystatechange=function(){if(xhr.readyState==4){if(xhr.status==200){var text=xhr.responseText;var textjson=eval("("+text+")");if(textjson.ack_code=="SUCESS"){if(success){success(text)}}else{if(fail){fail(text)}}}}};itemConfigId=itemConfigId==undefined?"":itemConfigId==null?"":itemConfigId;serviceCode=serviceCode==undefined?"":serviceCode==null?"":serviceCode;access_token=access_token==undefined?"":access_token==null?"":access_token;applyNo=applyNo==undefined?"":applyNo==null?"":applyNo;accessNo=accessNo==undefined?"":accessNo==null?"":accessNo;var url=hostPrefix+"/gdbsServiceBus/bus/applyInfoCollect";var param="itemConfigId="+itemConfigId+"&access_token="+access_token+"&applyNo="+applyNo+"&random="+random+"&serviceCode="+serviceCode+"&accessNo="+accessNo;xhr.open("post",url,true);xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset=UTF-8");xhr.send(param)},commitHandleContent:function(paramJson){jssdkCallStatics("commitHandleContent");var xhr;try{xhr=new ActiveXObject("Msxml2.XMLHTTP")}catch(e){try{xhr=new ActiveXObject("Microsoft.XMLHTTP")}catch(e){xhr=new XMLHttpRequest}}var random="",itemConfigId="",accessNo="",content="",success=function(e){},fail=function(e){};try{itemConfigId=paramJson.itemConfigId;random=paramJson.random;accessNo=paramJson.accessNo;content=paramJson.content;fail=paramJson.fail;success=paramJson.success}catch(e){}xhr.onreadystatechange=function(){if(xhr.readyState==4){if(xhr.status==200){var text=xhr.responseText;var textjson=eval("("+text+")");if(textjson.ack_code=="SUCESS"){if(success){success(text)}}else{if(fail){fail(text)}}}}};itemConfigId=itemConfigId==undefined?"":itemConfigId==null?"":itemConfigId;accessNo=accessNo==undefined?"":accessNo==null?"":accessNo;content=content==undefined?"":content==null?"":content;random=random==undefined?"":random==null?"":random;var url=hostPrefix+"/gdbsServiceBus/bus/commitHandleContent";var param="itemConfigId="+itemConfigId+"&random="+random+"&accessNo="+accessNo+"&content="+content;xhr.open("post",url,true);xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset=UTF-8");xhr.send(param)},sendTemplateMsg:function(paramJson){jssdkCallStatics("sendTemplateMsg");var xhr;try{xhr=new ActiveXObject("Msxml2.XMLHTTP")}catch(e){try{xhr=new ActiveXObject("Microsoft.XMLHTTP")}catch(e){xhr=new XMLHttpRequest}}var postData={},fail=function(e){},success=function(e){};try{var type=convertEmptyStr(paramJson.type);var access_token=convertEmptyStr(paramJson.access_token);var random=convertEmptyStr(paramJson.random);var content=paramJson.content;postData.type=type;postData.access_token=access_token;postData.random=random;postData.appkey=APPKEY;for(prop in content){if(content.hasOwnProperty(prop)){postData[prop]=content[prop]}}success=paramJson.success;fail=paramJson.fail}catch(e){}xhr.onreadystatechange=function(){if(xhr.readyState==4){if(xhr.status==200){var text=xhr.responseText;var textjson=eval("("+text+")");if(textjson.ack_code=="SUCESS"){if(success){success(text)}}else{if(fail){fail(text)}}}}};var url=hostPrefix+"/gdbsWX/template/sendMsg";xhr.open("post",url,true);xhr.setRequestHeader("Content-type","application/json;charset=utf-8");xhr.send(JSON.stringify(postData))},getLocation:function(e){jssdkCallStatics("getLocation");gdbs.locationCallBack=e;if(ua.match(/MicroMessenger/i)=="micromessenger"){wx.getLocation({type:"wgs84",success:function(e){var t=e.latitude;var n=e.longitude;gdbs.locationCallBack.success(n,t)}})}else{if(!gdbs.locationReturn){if(/android|Android/i.test(navigator.userAgent)){window.ncp.getLocadion()}else if(/ipad|iphone|mac|iOS/i.test(navigator.userAgent)){var t=document.getElementById("iosFrame");if(typeof t=="undefined"||t==null){t=document.createElement("iframe");t.style.display="none";t.id="iosFrame";if(document.body){document.body.appendChild(t)}else{document.documentElement.appendChild(t)}}t.src="objc://getLocadion"}}else{gdbs.locationCallBack.success(gdbs.longitude,gdbs.latitude)}}},setBackLocation:function(e,t){this.longitude=e;this.latitude=t;this.locationReturn=true},getScanQrCode:function(e){jssdkCallStatics("getScanQrCode");gdbs.qrCodeCallBack=e;if(ua.match(/MicroMessenger/i)=="micromessenger"){wx.scanQRCode({needResult:1,scanType:["qrCode"],success:function(e){var t=e.resultStr;gdbs.qrCodeCallBack.success(t)}})}else if(/android|Android/i.test(navigator.userAgent)){window.ncp.scanQRcode()}else if(/ipad|iphone|mac|iOS/i.test(navigator.userAgent)){var t=document.getElementById("iosFrame");if(typeof t=="undefined"||t==null){t=document.createElement("iframe");t.style.display="none";t.id="iosFrame";if(document.body){document.body.appendChild(t)}else{document.documentElement.appendChild(t)}}t.src="objc://scanQRcode"}},qrCodeCallBack:{success:function(e){}},openPhone:function(e){jssdkCallStatics("openPhone");if(/android|Android/i.test(navigator.userAgent)){window.ncp.openPhone(e)}else if(/ipad|iphone|mac|iOS/i.test(navigator.userAgent)){var t=document.getElementById("iosFrame");if(typeof t=="undefined"||t==null){t=document.createElement("iframe");t.style.display="none";t.id="iosFrame";if(document.body){document.body.appendChild(t)}else{document.documentElement.appendChild(t)}}var n='{"phone_num":"'+e+'"}';t.src="objc://openPhone?paremeter="+n}},openShare:function(e){jssdkCallStatics("openShare");if(ua.match(/MicroMessenger/i)=="micromessenger"){}else if(/android|Android/i.test(navigator.userAgent)){window.ncp.openShare(e)}else if(/ipad|iphone|mac|iOS/i.test(navigator.userAgent)){var t=document.getElementById("iosFrame");if(typeof t=="undefined"||t==null){t=document.createElement("iframe");t.style.display="none";t.id="iosFrame";if(document.body){document.body.appendChild(t)}else{document.documentElement.appendChild(t)}}var n='{"text":"'+e+'"}';t.src="objc://openShare?paremeter="+n}},openMap:function(e){jssdkCallStatics("openMap");var t=e.title,n=e.address,a=e.longitude,o=e.latitude;type=e.type;var i=wgs84togcj02(a,o);var s="";if(type=="tx"){s="http://apis.map.qq.com/uri/v1/marker?marker=coord:"+i.lat+","+i.lng+";title:位置;addr:"+n+"&referer=myapp"}else if(type=="gaod"){s="http://m.amap.com/?q="+i.lat+","+i.lng+"&name="+t}else{var r=gcj02tobd09(i.lng,i.lat);s="http://api.map.baidu.com/marker?location="+r.lat+","+r.lng+"&title="+t+"&content="+n+"&output=html"}var c=window.navigator.userAgent.toLowerCase();if(c.match(/MicroMessenger/i)=="micromessenger"||c.match(/Aliapp/i)=="aliapp"){window.location.href=s}else if(/android/i.test(c)||/ipad|iphone|mac|ios/i.test(c)){if(/android|Android/i.test(navigator.userAgent)){window.ncp.openSelfPage(s,t,"")}else if(/ipad|iphone|mac|iOS/i.test(navigator.userAgent)){var l=document.getElementById("iosFrame");if(typeof l=="undefined"||l==null){l=document.createElement("iframe");l.style.display="none";l.id="iosFrame";if(document.body){document.body.appendChild(l)}else{document.documentElement.appendChild(l)}}s=encodeURIComponent(selfEncodeUri(s));var d='{"url":"'+s+'","tabName":"'+t+'","funcFlag":""}';l.src="objc://openSelfPage?paremeter="+d}}else{window.location.href=s}},chooseImage:function(e){if(ua.match(/MicroMessenger/i)=="micromessenger"){wx.chooseImage({sizeType:["original","compressed"],sourceType:["album","camera"],success:function(t){var n=t.localIds;e.success(n)}})}},closeCurrentPage:function(){if(ua.match(/MicroMessenger/i)=="micromessenger"){wx.closeWindow()}else if(ua.match(/Aliapp/i)=="aliapp"){}else if(/android|Android/i.test(navigator.userAgent)){window.ncp.closeCurrentPage()}else if(/ipad|iphone|mac|iOS/i.test(navigator.userAgent)){var e=document.getElementById("iosFrame");if(typeof e=="undefined"||e==null){e=document.createElement("iframe");e.style.display="none";e.id="iosFrame";if(document.body){document.body.appendChild(e)}else{document.documentElement.appendChild(e)}}e.src="objc://closeCurrentPage"}},setPageFooter:function(e){var t=document.createElement("div");t.style.margin="0px";t.style.width="100%";t.style.padding="0px";t.innerHTML='<div id="gdbsBusDiv" style="margin:auto; margin-top:0px;padding:0px 5px 0px 0px;"><img id="gdbsLogo" style="width:30px; float:left; margin-right:10px; margin-left:10px;margin-bottom: 1px;" src="http://wap.gdbs.gov.cn/gdbsResource/image/gdbslogo/logo_mgdbs_01.png"><li style="font-size:0.9em; width:100%; text-align:left; line-height:15px; list-style:none; color:#CCCCCC;margin-bottom: 1px;" id="gdbsOrgNameLi"></li><li style="font-size:0.9em; width:100%; text-align:left; line-height:15px; list-style:none; color:#CCCCCC;margin-bottom: 1px;">广东省信息中心</li>';document.body.appendChild(t);var n=document.createElement("span");n.id="gdbsTextSpan";n.style.display="none";n.style.lineHeight="15px";n.style.fontSize="0.9em";document.body.appendChild(n);var a=getSize(document.getElementById("gdbsTextSpan")).width;if(a>205&&a+50<window.innerWidth){document.getElementById("gdbsBusDiv").style.width=a+50+"px"}else{document.getElementById("gdbsBusDiv").style.width="250px"}var o=40;if(document.getElementById("gdbsOrgNameLi").offsetHeight>15){o+=15;document.getElementById("gdbsLogo").height=o-10;document.getElementById("gdbsLogo").width=document.getElementById("gdbsLogo").offsetWidth+3}else if(document.getElementById("gdbsOrgNameLi").offsetHeight>30){o+=30;document.getElementById("gdbsLogo").height=o-10}}};return window.gdbs=gdbs,gdbs.init(),gdbs})(this);function locationBack(e,t){gdbs.locationCallBack.success(e,t)}function qrCodeResultBack(e){gdbs.qrCodeCallBack.success(e)}function getType(e){var t;return((t=typeof e)=="object"?e==null&&"null"||Object.prototype.toString.call(e).slice(8,-1):t).toLowerCase()}function getStyle(e,t){return e.style[t]?e.style[t]:e.currentStyle?e.currentStyle[t]:window.getComputedStyle(e,null)[t]}function getStyleNum(e,t){return parseInt(getStyle(e,t).replace(/px|pt|em/gi,""))}function setStyle(e,t){if(getType(t)=="object"){for(s in t){var n=s.split("-");for(var a=1;a<n.length;a++){n[a]=n[a].replace(n[a].charAt(0),n[a].charAt(0).toUpperCase())}var o=n.join("");e.style[o]=t[s]}}else{if(getType(t)=="string"){e.style.cssText=t}}}function getSize(e){if(getStyle(e,"display")!="none"){return{width:e.offsetWidth||getStyleNum(e,"width"),height:e.offsetHeight||getStyleNum(e,"height")}}var t={display:"",position:"absolute",visibility:"hidden"};var n={};for(i in t){n[i]=getStyle(e,i)}setStyle(e,t);var a=e.clientWidth||getStyleNum(e,"width");var o=e.clientHeight||getStyleNum(e,"height");for(i in n){setStyle(e,n)}return{width:a,height:o}}