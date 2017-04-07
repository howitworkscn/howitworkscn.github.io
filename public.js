if(window.screen.width != 1536) {
	var _scale = window.screen.width / 1536
	$("meta").attr("content", "width=device-width, initial-scale=" + _scale + ",minimum-scale=" + _scale + ",maximum-scale=" + _scale + ",user-scalable=no")
}
mui.init()

var path = 'http://jdxb.torinosrc.com'
var dtpicker = new mui.DtPicker({
	type: "datetime", //设置日历初始视图模式 
	beginYear: 1987, //设置开始日期 
	endYear: 2100, //设置结束日期 
})
var userinfo,access_token