(function () {
    "use strict";
    var regxp_old = /.*(\?|\&)(b|branch)=([^\&]*).*/g,//匹配b|branch关键字的值（旧版）
        regxp_new = /.*(\?|\&)(r)=([^\&]*).*/g,//匹配r关键字的值（新版）
        hostname = location.hostname,
        search = location.search,
        branch_old = regxp_old.test(search) ? search.replace(regxp_old,'$3') : '',//获取分支（旧版）
        branch_new = regxp_new.test(search) ? search.replace(regxp_new,'$3') : '',//获取分支（新版）
        branch = '',//branch的值与新旧分支挂钩
        repertory,//仓库
        iframe = document.getElementsByTagName('iframe'),
        csslinks = document.getElementsByTagName('link'),
        lc_nt = /\.lc\./.test(hostname),
        target,//存储css的需要被替换成的url
        href = window.location.href,
        branch_hd,
        css_link,//存储页面调用css旧的url
        regxp_link = /\/([^\/]*)\//,//匹配url中两个/之间的字符串
        repertoryAll = {'ResHotelEbooking':true, 'Cpms':true, 'Pres.Static':true, 'Hotel.Supplier.Ebooking':true, 'Hotel.MIP.Manager':true, 'Order.Audit':true, 'PlatformWeb':true};//所有仓库

    //如果url带分支，则重新设置branch的值
    if (!(!branch_old && !branch_new)) {//排除掉branch_old和branch_new同时为空的情况
        for (var i = 0, len_c = csslinks.length; i < len_c; i++) {
            //匹配url有http://webresource.c-ctrip.com/或者http://webresint.sh.ctriptravel.com/的css
            var a = csslinks[i].href.indexOf('webresource.c-ctrip.com/') < 0;
            var b = csslinks[i].href.indexOf('webresint.sh.ctriptravel.com/') < 0;

            if (csslinks[i].rel == 'stylesheet' && (!a || !b)) {
                css_link = csslinks[i].href.substr(7);//去掉http://
                repertory = regxp_link.exec(css_link)[1];//获取仓库名
                if(repertoryAll[repertory] == true){
                    break;
                }
            }
        };
        branch = branch_old ? branch_old : repertory + '/_b_' + branch_new;//根据新旧分支设定值
    };

    target = hostname + (lc_nt ? '/ws' : '/ws/' + branch);//css新的url的值

    for (var k = 0, len_i = iframe.length; k < len_i; k++) {
        if(branch){
            //如果是旧版
            if(branch_old && iframe[k].src && iframe[k].src.indexOf('branch=') < 0 && iframe[k].src && iframe[k].src.indexOf('b=') < 0){
                branch_hd = iframe[k].src.indexOf('?') >= 0 ? "&b=" : "?b=";
                iframe[k].src += branch_hd + branch_old;
            };

            //如果是新版
            if(branch_new && iframe[k].src && iframe[k].src.indexOf('r=') < 0){
                branch_hd = iframe[k].src.indexOf('?') >= 0 ? "&r=" : "?r=";
                iframe[k].src += branch_hd + branch_new;
            };
        }
    };

    for (var i = 0, len_c = csslinks.length; i < len_c; i++) {
        // white list
        var a = csslinks[i].href.indexOf('/kolibre/kolibre.') < 0 &&
                csslinks[i].href.indexOf('/h5/common/main.css') < 0 &&
                csslinks[i].href.indexOf('/h5/common/n_main.css') < 0 &&
                csslinks[i].href.indexOf('/styles/common/') < 0;

        if(csslinks[i].rel == 'stylesheet' && a){
            var reg_rep;
            if(branch_new && !lc_nt){//如果是新版 替换的正则加上repertory
                reg_rep = new RegExp('(webresource\.(c-)?ctrip|webresint\.sh\.ctriptravel)\.com\/' + repertory);
            }else{
                reg_rep = new RegExp('(webresource\.(c-)?ctrip|webresint\.sh\.ctriptravel)\.com');
            };
                csslinks[i].href = csslinks[i].href.replace(reg_rep, target);
        }
    };

    //设置lc/nt切换快捷键 81（字母Q）
    document.onkeyup = function (event) {
        var ev = event || window.event;
        var keynum = 'which' in ev ? ev.which : ev.keyCode;
        if (keynum == 81) {
            window.location.href = lc_nt ? href.replace(/\.lc\./, '.nt.') : href.replace(/\.nt\./, '.lc.');
        }
    };

    // h5预览功能
    var H5Preview=function(){
        this.isH5 = false ;
        this._href = window.location.href;
        this.reg_href = /iphone[4-7]/gi;
        this.jqueryURL = "http://hfdoc.qa.nt.ctripcorp.com/online/hotelinternational121211/inn/jquery-1.12.0.min.js";
        this.scrollStyle = '<style type="text/css">::-webkit-scrollbar{width:6px;height:6px;}::-webkit-scrollbar-track-piece{background-color:#CCCCCC;-webkit-border-radius:6px;}::-webkit-scrollbar-thumb:vertical{height:5px;background-color:#999999;-webkit-border-radius:6px;}::-webkit-scrollbar-thumb:horizontal{width:5px;background-color:#CCCCCC;-webkit-border-radius:6px;}body{overflow-x:hidden;overflow-y:scroll;}</style>' ;
        this.iframeId = "aaaa" ;
        this.phone = {
            "width" : 0 ,
            "height" : 0
        };
        this.swidth = 6 ;
    }
    H5Preview.prototype = {
        "constructor" : "H5Preview",
        "testHref" : function(){
            if(this.reg_href.test(this._href)){
                this.isH5 = true ;
                this.getPhoneSize();
                this._href = this._href.replace(this.reg_href,this.iframeId);
            }
        },
        "getPhoneSize" : function(){
            var iphone4 = /iphone4/;
            var iphone5 = /iphone5/;
            var iphone6 = /iphone6/;
            var iphone7 = /iphone7/;
            if(iphone4.test(this._href)){
                this.phone = {
                    "width" : 320 + this.swidth + 'px' ,
                    "height" : 480 + 'px'
                }
            }
            if(iphone5.test(this._href)){
                this.phone = {
                    "width" : 320 + this.swidth + 'px' ,
                    "height" : 568 + 'px'
                }
            }
            if(iphone6.test(this._href)){
                this.phone = {
                    "width" : 375 + this.swidth + 'px' ,
                    "height" : 667 + 'px'
                }
            }
            if(iphone7.test(this._href)){
                this.phone = {
                    "width" : 414 + this.swidth + 'px' ,
                    "height" : 763 + 'px'
                }
            }
        },
        "createEle" : function(ele){
            var _ele = document.createElement(ele);
            return _ele;
        },
        "insertJquery" : function(){
            var _that = this ;
            var cjquery = this.createEle("script") ;
            cjquery.src = this.jqueryURL ;
            document.body.appendChild(cjquery);
            cjquery.onload=function(){
                _that.hiddenDom();
                _that.insertIframe(_that._href);
                _that.modifyScroll();
            }
        },
        "hiddenDom" : function(){
            $('body *').wrapAll('<div class="hidden" style="display:none;"></div>');
        },
        "insertIframe" : function(href){
            var w = this.phone.width;
            var h =this.phone.height;
            var size = 'width:'+w+';height:'+h+';';
            $('body').append('<div style="'+size+'margin:0 auto;padding-top:20px;"><iframe id="'+this.iframeId+'" border="0" style="'+size+'overflow-x:hidden;border:none;" src="'+href+'"></iframe></div>');
        },
        "modifyScroll" : function(){
            var _that = this ;
            var id = this.iframeId ;
            setTimeout(function(){
                    $('body',document.getElementById(id).contentWindow.document).append(_that.scrollStyle);
                },1000,id);
        },
        "init" : function(){
            this.testHref();
            if(this.isH5){
                this.insertJquery();
            }
        }
    }


    function insertWeinre(e){
        e.setAttribute("src","http://"+boundHost+":"+weinrePort+"/target/target-script-min.js#anonymous");
        document.getElementsByTagName("body")[0].appendChild(e);
    }

    var h5 = new H5Preview();
    h5.init();

    var ip_reg=/.*(\?|\&)(ip)=([^\&]*).*/g,
        port_reg=/.*(\?|\&)(port)=([^\&]*).*/g,
        boundHost = ip_reg.test(search) ? search.replace(ip_reg,'$3') : '',
        weinrePort =port_reg.test(search) ? search.replace(port_reg,'$3') : '8080';
    if(boundHost != ''){
            insertWeinre(document.createElement("script"));
            console.log("http://"+boundHost+":8080/target/target-script-min.js#anonymous");
    }
})();