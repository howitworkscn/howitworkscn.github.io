/**
 * @author maipeitian@foresee.cn
 * 站点描述
 */
/**
 * 定义需要处理的站点列表，描述站点的标题和页脚该如何展现以及描述该站点选用何种样式
 */
var sites = [];
sites["yf"] = {
	"title" : "云浮市地方税务局",
	"footer" : "<img align='absmiddle' width='25px;' src='/skin/app/jqmobi-2.1.0/images/android/common/logo.jpg' style='margin-right:2px;'/>云浮市地方税务局",
	"css" : "android"
};

$.ui.ready(function() {
	var siteName = getSiteName();
	if (siteName != null && sites[siteName] != null) {
		//设置标题
		$("title").html(sites[siteName].title);
		//设置页脚
		$("#navbar").find("td").html(sites[siteName].footer);
		//设置整体样式
		$("#afui").attr("class", "android");
	}
});

function getSiteName() {
	var reg = new RegExp("(^|&)site=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}