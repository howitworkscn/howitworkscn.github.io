/**
 * @author maipeitian
 * af.num - 数字输入键盘
 *
 */
 
/* EXAMPLE
 $("#input").num();
 */
/* global af */
(function ($) {
    "use strict";
    $.fn.num = function () {
        return new num(this[0]);
    };
    var num = (function () {
        var num = function (containerEl) {

            if (typeof containerEl === "string" || containerEl instanceof String) {
                this.container = document.getElementById(containerEl);
            } else {
                this.container = containerEl;
            }
            if (!this.container) {
                window.alert("Error finding container for popup " + containerEl);
                return;
            }

            try {
            	$(this.container).attr("readonly","readonly");
                this.show();
            } catch (e) {
                console.log("error adding popup " + e);
            }

        };

        num.prototype = {
            show: function () {
            	numPlugin = this;
                var numInputHtml = "<table width='100%' height='100%'>" +
                		"<tr><td style='height:35px;' colspan='3'><input readonly='readonly' style='color: #1171d3;width:100%;height:100%;border:none;text-align:center;font-size:18px;' id='tmpNum'/></td></tr>" +
                		"<tr><td onclick='setNum(this);'>1</td><td onclick='setNum(this);'>2</td><td onclick='setNum(this);'>3</td></tr>" +
                		"<tr><td onclick='setNum(this);'>4</td><td onclick='setNum(this);'>5</td><td onclick='setNum(this);'>6</td></tr>" +
                		"<tr><td onclick='setNum(this);'>7</td><td onclick='setNum(this);'>8</td><td onclick='setNum(this);'>9</td></tr>" +
                		"<tr><td onclick='setNum(this);'>.</td><td onclick='setNum(this);'>0</td><td onclick='setNum(this);'>清除</td></tr>" +
                		"<tr><td onclick='setNum(this);' colspan='2'>确定</td><td onclick='setNum(this);'>取消</td></tr>" +
                		"</table>";
                numPopup = $.ui.popup({addCssClass:"numInput",message:numInputHtml,hiddeHeader:true,hiddeFooter:true});
                $("#tmpNum").val($(this.container).val().replace(/[^0-9\-\.]/gi,''));
            }
        };

        return num;
    })();

})(af);
var numPopup;
var numPlugin;
function setNum(obj){
	$(obj).css("background-color","#cccccc");
	if($(obj).html()=="清除"){
		$("#tmpNum").val($("#tmpNum").val().substring(0,$("#tmpNum").val().length-1));
	}else if($(obj).html()=="确定"){
		var v = $("#tmpNum").val();
		if(v!=""&&v.substring(v.length-1)=="."){
			v = v.substring(0,v.length-1);
		}
		$(numPlugin.container).val(v);
		numPopup.hide();
	}else if($(obj).html()=="取消"){
		numPopup.hide();
	}else if($(obj).html()=="."){
		if($("#tmpNum").val()!=null&&$("#tmpNum").val()!=""&&$("#tmpNum").val().indexOf(".")==-1){
	    	$("#tmpNum").val($("#tmpNum").val()+$(obj).html());
		}
	}else{
    	$("#tmpNum").val($("#tmpNum").val()+$(obj).html());
	}
	window.setTimeout(function(){
    	$(obj).css("background-color","#13699f");
	},100);
}