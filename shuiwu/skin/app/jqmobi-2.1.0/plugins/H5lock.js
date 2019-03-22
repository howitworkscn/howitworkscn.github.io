(function(){
        window.H5lock = function(obj){
            this.height = obj.height || "350";
            this.width = obj.width || "350";
            this.chooseType = obj.chooseType || 3;
            this.setPassword = obj.setPassword;
            this.init();
        };

        /**
         * 修改轨迹内圆圈的样式（该方法可供外部使用）
         */
        H5lock.prototype.updateCircleStyle = function(style) { 
            for (var i = 0 ; i < this.lastPoint.length ; i++) {
                this.ctx.strokeStyle = style;
                this.ctx.lineWidth = 5;
                this.ctx.beginPath();
                this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r, 0, Math.PI * 2, true);
                this.ctx.closePath();
                this.ctx.stroke();
            }
        };

        /**
         * 修改轨迹内圆圈的样式（该方法可供外部使用）
         */
        H5lock.prototype.setTitle = function(title) { 
        	document.getElementById('title').innerHTML = title;
        };

        /**
         * 显示九宫格（该方法可供外部使用）
         */
        H5lock.prototype.show = function() { 
        	document.getElementById('wrapDiv').style.display = "block";
        };

        /**
         * 隐藏九宫格（该方法可供外部使用）
         */
        H5lock.prototype.hide = function() { 
        	document.getElementById('wrapDiv').style.display = "none";
    		this.setTitle("绘制密码图案");
        };
////////////////////////////////////////////////////////////////////////////////////
        H5lock.prototype.drawCle = function(x, y) { // 初始化解锁密码面板
            this.ctx.strokeStyle = '#CFE6FF';
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.arc(x, y, this.r, 0, Math.PI * 2, true);
            this.ctx.closePath();
            this.ctx.stroke();
        };
        H5lock.prototype.drawPoint = function() { // 初始化圆心
            for (var i = 0 ; i < this.lastPoint.length ; i++) {
                this.ctx.fillStyle = '#CFE6FF';
                this.ctx.beginPath();
                this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r / 1.5, 0, Math.PI * 2, true);
                this.ctx.closePath();
                this.ctx.fill();
            }
        };
        H5lock.prototype.drawLine = function(po, lastPoint) {// 解锁轨迹
            this.ctx.beginPath();
            this.ctx.lineWidth = 8;
            this.ctx.moveTo(this.lastPoint[0].x, this.lastPoint[0].y);
            console.log(this.lastPoint.length);
            for (var i = 1 ; i < this.lastPoint.length ; i++) {
                this.ctx.lineTo(this.lastPoint[i].x, this.lastPoint[i].y);
            }
            this.ctx.lineTo(po.x, po.y);
            this.ctx.stroke();
            this.ctx.closePath();

        };
        H5lock.prototype.createCircle = function() {// 创建解锁点的坐标，根据canvas的大小来平均分配半径

            var n = this.chooseType;
            var count = 0;
            this.r = this.ctx.canvas.width / (2 + 4 * n);// 公式计算
            this.lastPoint = [];
            this.arr = [];
            this.restPoint = [];
            var r = this.r;
            for (var i = 0 ; i < n ; i++) {
                for (var j = 0 ; j < n ; j++) {
                    count++;
                    var obj = {
                        x: j * 4 * r + 3 * r,
                        y: i * 4 * r + 3 * r,
                        index: count
                    };
                    this.arr.push(obj);
                    this.restPoint.push(obj);
                }
            }
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            for (var i = 0 ; i < this.arr.length ; i++) {
                this.drawCle(this.arr[i].x, this.arr[i].y);
            }
            //return arr;
        };
        H5lock.prototype.getPosition = function(e) {// 获取touch点相对于canvas的坐标
            var rect = e.currentTarget.getBoundingClientRect();
            var po = {
                x: e.touches[0].clientX - rect.left,
                y: e.touches[0].clientY - rect.top
              };
            return po;
        };
        H5lock.prototype.update = function(po) {// 核心变换方法在touchmove时候调用
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

            for (var i = 0 ; i < this.arr.length ; i++) { // 每帧先把面板画出来
                this.drawCle(this.arr[i].x, this.arr[i].y);
            }

            this.drawPoint(this.lastPoint);// 每帧花轨迹
            this.drawLine(po , this.lastPoint);// 每帧画圆心

            for (var i = 0 ; i < this.restPoint.length ; i++) {
                if (Math.abs(po.x - this.restPoint[i].x) < this.r && Math.abs(po.y - this.restPoint[i].y) < this.r) {
                    this.drawPoint(this.restPoint[i].x, this.restPoint[i].y);
                    this.lastPoint.push(this.restPoint[i]);
                    this.restPoint.splice(i, 1);
                    break;
                }
            }

        };
        H5lock.prototype.getPassword = function(psw) {// 获取密码
            var p = '';
            for (var i = 0 ; i < psw.length ; i++) {
                p += psw[i].index;
            }
            return p;
        };
        H5lock.prototype.storePass = function(psw) {// touchend结束之后对密码和状态的处理
        	this.setPassword(this.getPassword(psw));
        };
        H5lock.prototype.setChooseType = function(type){
            chooseType = type;
            init();
        };
        H5lock.prototype.initDom = function(){
        	if(document.getElementById("wrapDiv")==null){
                var wrap = document.createElement('div');
                var str = '<h4 id="title" style="color: #22C3AA;font-size: 1.5em;margin-top:20%;">请输入密码</h4>'+
                          '<canvas id="canvas" width="'+this.width+'" height="'+this.height+'" style="background-color: #305066;display: inline-block;margin-top: 15px;"></canvas>';
                wrap.setAttribute('style','position: absolute;top:0;left:0;right:0;bottom:0;z-index: 99999;background-color: #305066;text-align:center;');
                wrap.setAttribute('id','wrapDiv');
                wrap.innerHTML = str;
                document.body.appendChild(wrap);
        	}else{
        		document.getElementById("wrapDiv").style.display = "block";
        	}
        };
        H5lock.prototype.init = function() {
            this.initDom();
            this.lastPoint = [];
            this.touchFlag = false;
            this.canvas = document.getElementById('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.createCircle();
            this.bindEvent();
        };
        H5lock.prototype.reset = function() {
            this.createCircle();
        };
        H5lock.prototype.bindEvent = function() {
            var self = this;
            this.canvas.addEventListener("touchstart", function (e) {
                e.preventDefault();// 某些android 的 touchmove不宜触发 所以增加此行代码
                 var po = self.getPosition(e);
                 console.log(po);
                 for (var i = 0 ; i < self.arr.length ; i++) {
                    if (Math.abs(po.x - self.arr[i].x) < self.r && Math.abs(po.y - self.arr[i].y) < self.r) {

                        self.touchFlag = true;
                        self.drawPoint(self.arr[i].x,self.arr[i].y);
                        self.lastPoint.push(self.arr[i]);
                        self.restPoint.splice(i,1);
                        break;
                    }
                 }
             }, false);
             this.canvas.addEventListener("touchmove", function (e) {
                if (self.touchFlag) {
                    self.update(self.getPosition(e));
                }
             }, false);
             this.canvas.addEventListener("touchend", function (e) {
                 if (self.touchFlag) {
                     self.touchFlag = false;
                     self.storePass(self.lastPoint);
                     setTimeout(function(){
                        self.reset();
                    }, 300);
                 }


             }, false);
             document.addEventListener('touchmove', function(e){
                e.preventDefault();
             },false);
        };
})();
