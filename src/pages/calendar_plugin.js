var ctrip = (function (window) {
    var ctrip = function (data) {
        return new ctrip.fn.init(data);
    };
    ctrip.fn = ctrip.prototype = {
        constructor: ctrip,
        init: function (data) {},
        deepCopy: function (p, c) {
            var c = c || {};
            var _this = this;
            for (var i in p) {
                if (typeof p[i] === "object") {
                    c[i] = p[i].constructor === Array ? [] : {};
                    _this.deepCopy(p[i], c[i]);
                } else {
                    c[i] = p[i];
                }
            }
            return c;
        },
        compareArray: function (aArray1, aArray2) {
            if (aArray1.sort().toString() === aArray2.sort().toString()) {
                return true;
            } else {
                return false;
            }
        },
        renderCalendar: function (config) {
            var _this = this;
            var newSetting = {};
            // 逻辑    setting 为总体设置
            // 内置英文设置，中文设置，与setting平级，但优先于setting
            // localSetting为局部设置，优先级最高
            // 最终输出newSetting

            var en = {
                dateForm: "mm-yyyy", //两种二选一  年月 yyyy-mm（默认）,  月年 "mm-yyyy"
                weekDayName: ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"], //星期单位无论语言按中文从周七到周一
                arrMonth: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], // 月份名称，针对多语言
                hyphen: "to" // 双日期单输入框时设置的语言连字符
            };
            // weekStartDay 中文下多个一周开始日可选配置 默认值 7，可接受1
            // 还有个服务端参数： today，可选，默认为本地日期
            if (config.en == true) {
                newSetting = _this.deepCopy(config.setting);
                newSetting.dateForm = en.dateForm;
                newSetting.weekDayName = en.weekDayName;
                newSetting.arrMonth = en.arrMonth;
                newSetting.hyphen = en.hyphen;
            } else if (typeof config.setting !== "undefined") {
                newSetting = _this.deepCopy(config.setting);
            }
            // console.table(newSetting);
            var calendarItem = config.idList;
            var tools = [];
            for (var i = 0; i < calendarItem.length; i++) {
                tools[i] = ctrip();
                var finalSetting = {};
                finalSetting = _this.deepCopy(newSetting);
                finalSetting.id = calendarItem[i];
                // 此处遍历特殊设置处的 配置项目
                if (config.options !== undefined) {
                    for (var k = 0; k < config.options.length; k++) {
                        if (_this.compareArray(finalSetting.id, config.options[k].id) === true) {
                            finalSetting.doubleCalendar = config.options[k].doubleCalendar !== undefined ? config.options[k].doubleCalendar : false;
                            finalSetting.singleDate = config.options[k].singleDate;
                            finalSetting.position = config.options[k].position;
                            finalSetting.limitDate = config.options[k].limitDate;
                            finalSetting.limitDate1 = config.options[k].limitDate1;
                            finalSetting.limitDate2 = config.options[k].limitDate2;
                            finalSetting.duringDays = config.options[k].duringDays;
                            finalSetting.unitYear = config.options[k].unitYear;
                            finalSetting.outputForm = config.options[k].outputForm;
                            finalSetting.specialDays = config.options[k].specialDays;
                        }
                    }
                }
                // console.table(finalSetting);
                // 根据id 个数和额外参数配置调用不同方法
                // 默认一个id用 calendar1，两个id用calendar2，其余情况加参数解决
                // case1 一个id 一个日历 calendar1  默认 单次点击
                // case2 两个id两个日历   双次点击支持单点
                // 特殊 case   一个id 两个日历 单次点击  或者双次点击支持单点
                // 哪个日历支持单点通过参数配置，本人不建议这种方式，先默认支持单点
                if (finalSetting.id.length === 1) {
                    finalSetting.doubleCalendar === true ? tools[i].calendar2(finalSetting) : tools[i].calendar1(finalSetting);
                } else if (finalSetting.id.length === 2) {
                    tools[i].calendar2(finalSetting);
                }
            }
        },
        isIE8: function () {
            var isie8 = false;
            if (navigator.userAgent.indexOf("Firefox") >= 0) {
                isie8 = false;
            } else {
                var browser_cur = navigator.appName;
                var b_version = navigator.appVersion;
                var version = b_version.split(";");
                var trim_Version = version[1].replace(/[ ]/g, "");
                if (browser_cur == "Microsoft Internet Explorer" && trim_Version == "MSIE8.0") {
                    isie8 = true;
                }
            }
            return isie8;
        },
        createDom: function (domId, isIE, boxNum, styleID) {
            var isIE_ = typeof isIE != "undefined" ? isIE : false;
            var styleStr = "#" + styleID;
            var styleCont =
                styleStr +
                "{position: absolute;display: none;width: 550px;height:320px;z-index: 1200;outline: none;}" +
                styleStr +
                ' .d-calendar{display: block;z-index: 1100; padding: 20px 10px 10px 10px;width: 530px;-moz-box-sizing:content-box;-webkit-box-sizing:content-box; box-sizing:content-box;overflow: auto; background-color: #fff;box-shadow:0 2px 20px 0 rgba(0,0,0,0.2);font-family:"Microsoft YaHei","微软雅黑",arial,simhei;color: #333;outline: none;' +
                "}" +
                styleStr +
                " .d-calendar-header{padding:5px 10px; text-align: center; font-size: 16px;font-weight: bold;}" +
                styleStr +
                " .d-calendar-box{position: relative;display:inline-block;*zoom:1;*display: inline; width: 256px;vertical-align: top;}" +
                styleStr +
                " .d-calendar-box.d-calendar-box01{margin-right: 10px;margin-bottom: 10px;}" +
                styleStr +
                " .d-calendar-date{position: relative; padding: 0 24px 10px 24px; text-align: center; font-size: 16px;}" +
                styleStr +
                " .d-calendar-box .btn-prev{position: absolute;top: 0;left: 0;  width: 24px;line-height: 24px;text-align: center;color:#06c;font-size: 20px;cursor: pointer;}" +
                styleStr +
                " .d-calendar-box .btn-next{position: absolute;top: 0;right: 0; width: 24px;line-height: 24px;text-align: center;color:#06c;font-size: 20px;cursor: pointer;}" +
                styleStr +
                " .d-c-week .d-week-item{position: relative;float: left; display:inline-block;*zoom:1;*display: inline;width: 36px;height: 36px;line-height: 36px;text-align: center; overflow: hidden;font-size:14px; z-index:1100;}" +
                styleStr +
                " .d-c-day .d-day-item{position: relative;float: left; display:inline-block;*zoom:1;*display: inline;width: 36px;height: 36px; line-height: 36px;text-align: center; font-size: 14px; overflow: hidden;cursor: pointer;}" +
                styleStr +
                " .d-c-day .d-day-item.special-day{font-size:12px;line-height:34px; color: #f52121;}" +
                styleStr +
                " .d-c-day .d-day-item.d-applicable{background-color: #eee;}" +
                styleStr +
                " .d-c-day .d-day-item.disabled{color: #bdbdbd;}" +
                styleStr +
                " .d-c-day .d-day-item.selected{background-color: #07c;color: #fff;}" +
                styleStr +
                " .d-c-day .cur-day{color:#07c;font-weight: bold;}" +
                styleStr +
                " .d-c-day .cur-day.disabled{color:#8ec1e6;font-weight: bold;}" +
                styleStr +
                " .d-c-day .d-day-item:hover{background-color: #07c;color: #fff;}" +
                styleStr +
                " .d-c-day .d-day-item.disabled:hover{background-color: #fff; color: #bdbdbd;cursor: default;}" +
                styleStr +
                " .d-c-day .cur-day.disabled:hover{color:#8ec1e6;font-weight: bold;}" +
                styleStr +
                " .d-c-day .d-day-item.d-day-item-white{cursor: default;}" +
                styleStr +
                " .d-c-day .d-day-item.d-day-item-white:hover{background-color: #fff;}" +
                styleStr +
                " .d-calendar-layer{display:none; position:fixed;width:100%;height:100%;background-color: rgba(0, 0, 0, .5);left:0;right:0;top: 0;bottom:0;margin:auto;z-index: -1;}" +
                styleStr +
                " " +
                '.clearfix::after{content: " ";clear: both;display: block;visibility: hidden;overflow: hidden;height: 0;*zoom:1}' +
                "@media screen and (max-width: 768px) {" +
                styleStr +
                "{width: 286px;height:auto;}" +
                styleStr +
                " .d-calendar{width: 266px;height:auto;overflow:auto;}" +
                "}";

            var calendaDom2 =
                '            <div class="d-calendar-header">入住日期</div>' +
                '            <div class="d-calendar-box d-calendar-box01">' +
                '                <div class="d-calendar-date">' +
                '                    <div class="btn-prev">&lt;</div>' +
                '                    <div class="btn-next">&gt;</div>' +
                '                    <span class="d-date-bar"></span>' +
                "                </div>" +
                '                <div class="d-c-week clearfix"></div>' +
                '                <div class="d-c-day d-c-day01 clearfix"></div>' +
                "            </div>" +
                '            <div class="d-calendar-box">' +
                '                <div class="d-calendar-date">' +
                '                    <div class="btn-prev">&lt;</div>' +
                '                    <div class="btn-next">&gt;</div>' +
                '                    <span class="d-date-bar"></span>' +
                "                </div>" +
                '                <div class="d-c-week clearfix"></div>' +
                '                <div class="d-c-day d-c-day02 clearfix"></div>' +
                "            </div>";

            var calendaDom1 =
                '            <div class="d-calendar-header">入住日期</div>' +
                '            <div class="d-calendar-box d-calendar-box01">' +
                '                <div class="d-calendar-date">' +
                '                    <div class="btn-prev">&lt;</div>' +
                '                    <div class="btn-next">&gt;</div>' +
                '                    <span class="d-date-bar"></span>' +
                "                </div>" +
                '                <div class="d-c-week clearfix"></div>' +
                '                <div class="d-c-day d-c-day01 clearfix"></div>' +
                "            </div>";

            var dCalendar = document.createElement("div");
            dCalendar.className = "d-calendar";
            // dCalendar.setAttribute("tabindex", -1);
            if (boxNum === 1) {
                dCalendar.innerHTML = calendaDom1;
            } else if (boxNum == 2) {
                dCalendar.innerHTML = calendaDom2;
            }
            var dWrapper = document.createElement("div");
            dWrapper.setAttribute("tabindex", -1);
            dWrapper.setAttribute("id", styleID);
            dWrapper.setAttribute("data-calendarname", "");
            dWrapper.appendChild(dCalendar);

            // 添加蒙层
            var calendarLayer = document.createElement("div");
            calendarLayer.className = "d-calendar-layer";
            dWrapper.appendChild(calendarLayer);

            var body_ = document.body;
            body_.insertBefore(dWrapper, body_.children[0]);
            // document.getElementById(domId).parentElement.appendChild(dCalendar);
            var styles = document.createElement("style");
            if (isIE_) {
                styles.setAttribute("type", "text/css");
                styles.styleSheet.cssText = styleCont;
            } else {
                styles.innerHTML = styleCont;
                document.getElementsByTagName("head")[0].appendChild(styles);
            }
            document.getElementById(styleID).appendChild(styles);
        },
        calendar2: function (setting) {
            var _this = this;
            _this.browser_ie8 = _this.isIE8();
            function addEvent(el, type, handler, useCapture) {
                if (typeof useCapture == "undefined") {
                    useCapture = false;
                }
                if (_this.browser_ie8) {
                    return el.attachEvent("on" + type, handler, useCapture);
                } else {
                    return el.addEventListener(type, handler, useCapture);
                }
            }
            function removeEvent(element, type, fn) {
                //判断当前浏览器是否支持addEventListener方法
                if (element.removeEventListener) {
                    element.removeEventListener(type, fn);
                } else if (element.detachEvent) {
                    element.detachEvent("on"+type, fn);
                } else {
                    element["on" + type] = null; //相当于element.onclick=fn;
                }
            }

            function RollId() {
                var canledarId = "canledar";
                for (var i = 0; i < 6; i++) {
                    canledarId += Math.floor(Math.random() * 10);
                }
                return canledarId;
            }

            _this.datePicker = [];
            // 定义输入框和对应的 d-calendar-box

            if (!document.getElementById(setting.id[0])) {
                // 没有此元素时 方法终结
                return false;
            }

            // 单次点击除非日历回填
            _this.singleDate = setting.singleDate === true ? true : false;
            // 只传入一个id
            if (_this.singleDate && setting.id.length === 1) {
                _this.datePicker[0] = document.getElementById(setting.id[0]); //第一个输入框
                _this.datePicker[0].setAttribute("tabindex", -1);
            } else {
                if (setting.id.length > 1) {
                    _this.datePicker[0] = document.getElementById(setting.id[0]); //第一个输入框
                    _this.datePicker[1] = document.getElementById(setting.id[1]); //第二个输入框
                    _this.datePicker[0].setAttribute("tabindex", -1);
                    _this.datePicker[1].setAttribute("tabindex", -1);
                } else {
                    _this.datePicker[0] = document.getElementById(setting.id[0]); //第一个输入框
                    _this.datePicker[0].setAttribute("tabindex", -1);
                }
            }

            // 绑定点击事件
            if (_this.datePicker.length === 2) {
                addEvent(_this.datePicker[0], "click", function (e) {
                    stopPropagation(e);
                    initials();
                });
                addEvent(_this.datePicker[1], "click", function (e) {
                    stopPropagation(e);
                    initials();
                });
            } else if (_this.datePicker.length === 1) {
                addEvent(_this.datePicker[0], "click", function (e) {
                    stopPropagation(e);
                    initials();
                });
            }

            // 初始化日历
            function initials() {
                var canledarId = RollId();
                //创建dom
                // dWrapper.setAttribute("data-calendarname", "");
                var calendarNowDom = "body [data-calendarname]";
                var oldDom=document.querySelector(calendarNowDom);
                if (oldDom) {
                    oldDom.parentNode.removeChild(oldDom);
                }

                _this.createDom(setting.id[0], _this.browser_ie8, 2, canledarId);
                // 兼容IE8  end
                _this.calendarItem = [];

                _this.e_date_bar = [];
                _this.btn_prev = [];
                _this.btn_next = [];
                _this.dayBox = [];
                _this.weekDayNameBar = [];
                _this.selectedDate = []; //已选日期
                _this.clickDate = []; //点击的年月
                _this.specialDays = []; //特殊日
                _this.outputForm = ""; //输出格式

                _this.hyphen = typeof setting.hyphen != "undefined" ? setting.hyphen : "至";
                _this.outputForm = typeof setting.outputForm != "undefined" ? setting.outputForm : "yymmdd";

                _this.calendarBox = document.getElementById(canledarId);
                _this.calendarPop = _this.calendarBox.children[0];
                _this.calendarLayer = _this.calendarBox.children[1];
                var body_top = _this.datePicker[0].getBoundingClientRect().top;
                var body_bottom = document.documentElement.clientHeight - _this.datePicker[0].getBoundingClientRect().bottom;
                if (document.documentElement.clientWidth < 768 && body_top > 572 && body_bottom < 572) {
                    _this.calendarBox.style.top = _this.datePicker[0].getBoundingClientRect().top + document.documentElement.scrollTop - 572 - 8 + "px";
                    // console.log("572上方渲染");
                } else if (document.documentElement.clientWidth >= 768 && body_top > 320 && body_bottom < 320) {
                    _this.calendarBox.style.top = _this.datePicker[0].getBoundingClientRect().top + document.documentElement.scrollTop - 320 - 6 + "px";
                    // console.log("320上方渲染");
                } else {
                    _this.calendarBox.style.top = _this.datePicker[0].getBoundingClientRect().bottom + document.documentElement.scrollTop + 8 + "px";
                    // console.log(`下方渲染`);
                }
                var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
                if (isMobile && document.documentElement.clientWidth <= 768) {
                    _this.calendarBox.style.position = "fixed";
                    _this.calendarBox.style.top = "0";
                    _this.calendarBox.style.right = "0";
                    _this.calendarBox.style.bottom = "0";
                    _this.calendarBox.style.left = "0";
                    _this.calendarBox.style.margin = "auto";
                    _this.calendarBox.style.height = "570px";

                    _this.calendarLayer.style.display = "block";
                    addEvent(_this.calendarLayer, "mousedown", function (e) {
                        stopPropagation(e);
                        // _this.calendarBox.style.display = "none";
                    });
                }

                _this.calendarItem[0] = _this.calendarPop.children[1]; //第1个 d-calendar-box
                _this.calendarItem[1] = _this.calendarPop.children[2]; //第2个 d-calendar-box

                // 定义 时间条显示的日期
                _this.e_date_bar[0] = _this.calendarItem[0].children[0].children[2]; //第一个时间条
                _this.e_date_bar[1] = _this.calendarItem[1].children[0].children[2]; //第二个时间条
                // 定义星期几-名称条
                _this.weekDayNameBar[0] = _this.calendarItem[0].children[1]; //第一个星期条
                _this.weekDayNameBar[1] = _this.calendarItem[1].children[1]; //第二个星期条
                _this.weekStartDay = setting.weekStartDay === 1 ? setting.weekStartDay : 7;
                // 默认周日开始
                // console.log(`_this.weekStartDay ：${ _this.weekStartDay}`);
                // 定义星期内容数组
                _this.weekDayName = typeof setting.weekDayName != "undefined" ? setting.weekDayName : ["日", "一", "二", "三", "四", "五", "六"];
                if (_this.weekStartDay === 1) {
                    // 存储第一个星期表述，剪切下来，然后保存到数组末尾
                    var weekDayNameFoo = _this.weekDayName[0];
                    _this.weekDayName = _this.weekDayName.splice(1);
                    _this.weekDayName.push(weekDayNameFoo);
                }
                // console.log(`_this.weekDayName ：${ _this.weekDayName}`);
                _this.weekDayNameBar[0].innerHTML = "";
                _this.weekDayNameBar[1].innerHTML = "";
                for (var week7 = 0; week7 < 7; week7++) {
                    //利用获取到的当月最后一天 把 前边的 天数 都循环 出来
                    var div_week1 = document.createElement("div");
                    var div_week2 = document.createElement("div");
                    div_week1.innerText = _this.weekDayName[week7];
                    div_week2.innerText = _this.weekDayName[week7];
                    addClass(div_week1, "d-week-item");
                    addClass(div_week2, "d-week-item");
                    _this.weekDayNameBar[0].appendChild(div_week1);
                    _this.weekDayNameBar[1].appendChild(div_week2);
                }
                _this.btn_prev[0] = _this.calendarItem[0].children[0].children[0];
                _this.btn_next[0] = _this.calendarItem[0].children[0].children[1];
                // 隐藏第一个右箭头
                _this.btn_next[0].style.display = "none";
                // _this.btn_next[0].parentNode.removeChild(_this.btn_next[0]);

                _this.btn_prev[1] = _this.calendarItem[1].children[0].children[0];
                _this.btn_next[1] = _this.calendarItem[1].children[0].children[1];
                // 隐藏第二个左箭头
                // _this.btn_prev[1].parentNode.removeChild(_this.btn_prev[1]);
                _this.btn_prev[1].style.display = "none";

                // 定义天数box
                _this.dayBox[0] = _this.calendarItem[0].children[2];
                _this.dayBox[1] = _this.calendarItem[1].children[2];

                // 定义日历标题
                _this.e_title = _this.calendarPop.children[0];

                // 定义月份名称数组
                if (typeof setting.arrMonth != "undefined") {
                    _this.arrMonth = setting.arrMonth;
                } else {
                    // 默认中文 月名称
                    _this.arrMonth = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
                }
                // 定义显示的日历格式
                if (typeof setting.dateForm != "undefined") {
                    _this.dateForm = setting.dateForm;
                } else {
                    // 默认yyyy-mm
                    _this.dateForm = "yyyy-mm";
                }
                _this.unitYear = typeof setting.unitYear != "undefined" ? setting.unitYear : "年";
                _this.title = typeof setting.title != "undefined" ? setting.title : undefined;

                //是否使用设定时间，如未设定则使用本地时间
                var date_local = new Date();
                if (typeof setting.today != "undefined") {
                    var dateArr = setting.today.split("-");
                    _this.curYear = parseInt(dateArr[0]);
                    _this.curMonth = parseInt(dateArr[1]);
                    _this.curDay = parseInt(dateArr[2]);
                    _this.curDate = setting.today;
                    // console.log(`给定了当日日期:${_this.curDate}`);
                } else {
                    _this.curYear = date_local.getFullYear();
                    _this.curMonth = date_local.getMonth() + 1; //中文状态的数字
                    _this.curDay = date_local.getDate();
                    _this.curDate = _this.curYear + "-" + _this.curMonth + "-" + _this.curDay;
                    // console.log(`本地当日日期:_this.curDate:${_this.curDate}`);
                }

                if (typeof setting.specialDays != "undefined") {
                    _this.specialDays = setting.specialDays;
                    // console.table(_this.specialDays);
                }
                // 渲染显示的日期
                _this.year = _this.curYear;
                _this.month = _this.curMonth;
                _this.day = _this.curDay;

                // 定义有效操作日期区间
                if (typeof setting.today != "undefined") {
                    var dateArr = setting.today.split("-");
                    _this.curYear = parseInt(dateArr[0]);
                    _this.curMonth = parseInt(dateArr[1]);
                    _this.curDay = parseInt(dateArr[2]);
                    _this.curDate = setting.today;
                    // console.log(`给定了当日日期:${_this.curDate}`);
                }

                _this.limitDate = typeof setting.limitDate != "undefined" ? setting.limitDate : false;
                _this.duringDays = typeof setting.duringDays != "undefined" ? setting.duringDays : undefined;
                if (_this.limitDate == true && _this.duringDays != undefined) {
                    _this.limitDate1 = typeof setting.limitDate1 != "undefined" ? setting.limitDate1 : _this.curDate;
                    _this.limitDate2 = getDateBydays(_this.limitDate1, _this.duringDays);
                } else if (_this.limitDate === true) {
                    _this.limitDate1 = typeof setting.limitDate1 != "undefined" ? setting.limitDate1 : _this.curDate;
                    _this.limitDate2 = typeof setting.limitDate2 != "undefined" ? setting.limitDate2 : getDateBydays(_this.curDate, 36500);
                } else {
                    _this.limitDate1 = getDateBydays(_this.curDate, -36500);
                    _this.limitDate2 = getDateBydays(_this.curDate, 36500); //默认前后限制日期 100年
                }

                addEvent(_this.btn_prev[0], "click", function () {
                    if (parseInt(_this.month) <= 1) {
                        _this.month = 12;
                        _this.year = parseInt(_this.year) - 1;
                    } else {
                        _this.month = _this.month - 1;
                    }
                    render(_this.year, _this.month);
                });

                addEvent(_this.btn_next[0], "click", function () {
                    //  12 进 1
                    if (_this.month >= 12) {
                        _this.month = 1;
                        _this.year += 1;
                    } else {
                        _this.month += 1;
                    }
                    render(_this.year, _this.month);
                });
                addEvent(_this.btn_next[1], "click", function () {
                    //  12 进 1
                    if (_this.month >= 12) {
                        _this.month = 1;
                        _this.year += 1;
                    } else {
                        _this.month += 1;
                    }
                    render(_this.year, _this.month);
                });
                addEvent(_this.dayBox[0], "click", selectDate);
                addEvent(_this.dayBox[1], "click", selectDate);
                // 单日历不监听hover
                if (_this.singleDate !== true) {
                    addEvent(_this.dayBox[0], "mouseover", hoverDate);
                    addEvent(_this.dayBox[1], "mouseover", hoverDate);
                }
                showPop();
            }

            function addClass(obj, class_name) {
                var obj_class = obj.className; //获取 class 内容.
                var blank = obj_class != "" ? " " : ""; //判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
                var added = obj_class + blank + class_name; //组合原来的 class 和需要添加的 class.
                obj.setAttribute("class", added);
            }

            function hasClass(obj, class_name) {
                var obj_class = obj.className, //获取 class 内容.
                    obj_class_lst = obj_class.split(/\s+/); //通过split空字符将class_name转换成数组.
                x = 0;
                for (x in obj_class_lst) {
                    if (obj_class_lst[x] == class_name) {
                        //循环数组, 判断是否包含class_name
                        return true;
                    }
                }
                return false;
            }

            function removeClass(obj, class_name) {
                var obj_class = " " + obj.className + " "; //获取 class 内容, 并在首尾各加一个空格
                (obj_class = obj_class.replace(/(\s+)/gi, " ")), //将多余的空字符替换成一个空格
                (removed = obj_class.replace(" " + class_name + " ", " ")); //在原来的
                removed = removed.replace(/(^\s+)|(\s+$)/g, ""); //去掉首尾空格
                obj.className = removed; //替换原来的 class.
            }

            function getDateBydays(date, days) {
                var t1 = date.split("-");
                var ms = new Date(t1[0], t1[1] - 1, t1[2]).getTime();
                ms += days * 24 * 60 * 60 * 1000;
                var dateNew = new Date(ms);
                var newDateString = dateNew.getFullYear() + "-" + (dateNew.getMonth() + 1) + "-" + dateNew.getDate();
                return newDateString;
            }

            function compareDate(date1, date2) {
                var t1 = date1.split("-");
                var startDate = new Date(t1[0], t1[1] - 1, t1[2]);
                var t2 = date2.split("-");
                var endDate = new Date(t2[0], t2[1] - 1, t2[2]);
                if (endDate - startDate > 0) {
                    return 1;
                } else if (endDate - startDate == 0) {
                    return 0;
                } else {
                    return -1;
                }
            }

            //判断闰年
            function runNian(_year) {
                if (_year % 400 === 0 || (_year % 4 === 0 && _year % 100 !== 0)) {
                    return true;
                } else {
                    return false;
                }
            }
            //判断某年某月的1号是星期几
            function getFirstDay(_year, _month) {
                var allDay = 0,
                    y = _year - 1,
                    i = 1;
                allDay = y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + 1;
                for (; i < _month; i++) {
                    switch (i) {
                        case 1:
                            allDay += 31;
                            break;
                        case 2:
                            if (runNian(_year)) {
                                allDay += 29;
                            } else {
                                allDay += 28;
                            }
                            break;
                        case 3:
                            allDay += 31;
                            break;
                        case 4:
                            allDay += 30;
                            break;
                        case 5:
                            allDay += 31;
                            break;
                        case 6:
                            allDay += 30;
                            break;
                        case 7:
                            allDay += 31;
                            break;
                        case 8:
                            allDay += 31;
                            break;
                        case 9:
                            allDay += 30;
                            break;
                        case 10:
                            allDay += 31;
                            break;
                        case 11:
                            allDay += 30;
                            break;
                        case 12:
                            allDay += 31;
                            break;
                    }
                }
                return allDay % 7;
            }

            function getCurrentMonthDays(year_, month_) {
                // 输入年 和 月  返还 某年某月 的天数
                var curMonthDays = new Date(year_, month_, 0).getDate();
                return curMonthDays;
            }
            // 初始化数据
            function render(year_1, month_1, day_1) {
                var year_ = parseInt(year_1);
                var month_ = parseInt(month_1);
                var day_ = parseInt(day_1);
                var month_2 = 0;
                var year_2 = 0;
                if (month_ >= 12) {
                    month_2 = 1;
                    year_2 = year_ + 1;
                } else {
                    month_2 = month_ + 1;
                    year_2 = year_;
                }
                //设置日历标题
                _this.e_title.innerText = _this.title;
                if (typeof setting.title == "undefined") {
                    _this.e_title.style.display = "none";
                }

                // console.log(`重新渲染日期:${year_}-${month_} 至 ${year_2}-${month_2}`);
                // 判断日期格式   默认yyyy-mm,  月年 "mm-yyyy"
                if (_this.dateForm === "mm-yyyy") {
                    var dateText1 = _this.arrMonth[month_ - 1] + "&nbsp;" + year_;
                    var dateText2 = _this.arrMonth[month_2 - 1] + "&nbsp;" + year_2;
                } else {
                    var dateText1 = year_ + _this.unitYear + _this.arrMonth[month_ - 1];
                    var dateText2 = year_2 + _this.unitYear + _this.arrMonth[month_2 - 1];
                }

                var curMonthDays1 = getCurrentMonthDays(year_, month_); //获取当前月有多少天
                var curWeek1 = getFirstDay(year_, month_); //获取当前月第一天 是 周几
                var curMonthDays2 = getCurrentMonthDays(year_2, month_2); //获取当前月有多少天
                var curWeek2 = getFirstDay(year_2, month_2); //获取当前月第一天 是 周几
                if (_this.weekStartDay === 1) {
                    if (curWeek1 == 0) {
                        curWeek1 = 6;
                    } else {
                        curWeek1 -= 1;
                    }
                    if (curWeek2 == 0) {
                        curWeek2 = 6;
                    } else {
                        curWeek2 -= 1;
                    }
                }
                _this.e_date_bar[0].innerHTML = dateText1; //显示日期bar
                _this.e_date_bar[1].innerHTML = dateText2; //显示日期bar
                _this.dayBox[0].innerHTML = "";
                _this.dayBox[1].innerHTML = "";
                for (var i = 0; i < curWeek1; i++) {
                    //渲染空白 与 星期 对应上
                    var div_space = document.createElement("div");
                    addClass(div_space, "d-day-item d-day-item-white");
                    _this.dayBox[0].appendChild(div_space);
                }
                for (var i2 = 0; i2 < curWeek2; i2++) {
                    //渲染空白 与 星期 对应上
                    var div_space = document.createElement("div");
                    addClass(div_space, "d-day-item d-day-item-white");
                    _this.dayBox[1].appendChild(div_space);
                }
                for (var k = 1; k <= curMonthDays1; k++) {
                    //利用获取到的当月最后一天 把 前边的 天数 都循环 出来
                    var div_day = document.createElement("div");
                    div_day.innerText = k;
                    // 当前渲染的单元格对应的日期为
                    var dateNow1 = year_ + "-" + month_ + "-" + k; //当前要渲染出的日期格子
                    div_day.setAttribute("data-dateitem", dateNow1);
                    var x1 = compareDate(_this.limitDate1, dateNow1);
                    var x2 = compareDate(_this.limitDate2, dateNow1);
                    addClass(div_day, "d-day-item");
                    if (year_ == _this.curYear && month_ == _this.curMonth && k == _this.curDay) {
                        addClass(div_day, "cur-day");
                    }
                    if (x1 < 0 || x2 > 0) {
                        addClass(div_day, "disabled");
                    }
                    _this.dayBox[0].appendChild(div_day);
                }
                for (var k2 = 1; k2 <= curMonthDays2; k2++) {
                    //利用获取到的当月最后一天 把 前边的 天数 都循环 出来
                    var div_day = document.createElement("div");
                    div_day.innerText = k2;
                    // 当前渲染的单元格对应的日期为
                    var dateNow2 = year_2 + "-" + month_2 + "-" + k2; //当前要渲染出的日期格子
                    div_day.setAttribute("data-dateitem", dateNow2);
                    var y1 = compareDate(_this.limitDate1, dateNow2);
                    var y2 = compareDate(_this.limitDate2, dateNow2);
                    addClass(div_day, "d-day-item");
                    if (year_2 == _this.curYear && month_2 == _this.curMonth && k2 == _this.curDay) {
                        addClass(div_day, "cur-day");
                    }
                    if (y1 < 0 || y2 > 0) {
                        addClass(div_day, "disabled");
                    }
                    _this.dayBox[1].appendChild(div_day);
                }
                renderClass(_this.clickDate, "selected");
                renderSelectedClass(_this.clickDate, "d-applicable");
                renderSpecialDays(_this.specialDays);
            }

            function traversalBox(date_, classNames) {
                var dateRenderNow1 = "";
                var dateRenderNow2 = "";
                var k0 = _this.dayBox[0].children.length;
                var k1 = _this.dayBox[1].children.length;
                for (var i = 0; i < k0; i++) {
                    if (_this.dayBox[0].children[i].getAttribute("data-dateitem")) {
                        dateRenderNow1 = _this.dayBox[0].children[i].getAttribute("data-dateitem");
                        if (compareDate(date_, dateRenderNow1) === 0) {
                            // 没有时才加此class
                            if (!hasClass(_this.dayBox[0].children[i], classNames)) {
                                addClass(_this.dayBox[0].children[i], classNames);
                            }
                        }
                    }
                }
                for (var j = 0; j < k1; j++) {
                    if (_this.dayBox[1].children[j].getAttribute("data-dateitem")) {
                        dateRenderNow2 = _this.dayBox[1].children[j].getAttribute("data-dateitem");
                        if (compareDate(date_, dateRenderNow2) === 0) {
                            addClass(_this.dayBox[1].children[j], classNames);
                        }
                    }
                }
                return false;
            }

            function traversalDateDom(findDate) {
                var dateRenderNow1 = "";
                var dateRenderNow2 = "";
                var k0 = _this.dayBox[0].children.length;
                var k1 = _this.dayBox[1].children.length;
                for (var i = 0; i < k0; i++) {
                    if (_this.dayBox[0].children[i].getAttribute("data-dateitem")) {
                        dateRenderNow1 = _this.dayBox[0].children[i].getAttribute("data-dateitem");
                        if (compareDate(findDate, dateRenderNow1) === 0) {
                            return _this.dayBox[0].children[i];
                        }
                    }
                }
                for (var j = 0; j < k1; j++) {
                    if (_this.dayBox[1].children[j].getAttribute("data-dateitem")) {
                        dateRenderNow2 = _this.dayBox[1].children[j].getAttribute("data-dateitem");
                        if (compareDate(findDate, dateRenderNow2) === 0) {
                            return _this.dayBox[1].children[j];
                        }
                    }
                }
                return false;
            }

            function renderSpecialDays(arr) {
                if (arr.length === 0) {
                    return false;
                }
                for (var i = 0; i < arr.length; i++) {
                    var specialDay = traversalDateDom(arr[i].date);
                    if (specialDay) {
                        addClass(specialDay, "special-day");
                        specialDay.innerText = arr[i].text;
                    }
                }
            }

            function renderClass(date_arr, classNames) {
                if (date_arr.length === 0) {
                    return false;
                }
                selectClean(classNames);
                for (var z = 0; z < date_arr.length; z++) {
                    traversalBox(date_arr[z], classNames);
                }
                return false;
            }

            function renderSelectedClass(date_arr, classNames) {
                if (date_arr.length !== 2) {
                    return false;
                }
                selectClean("d-applicable");
                var d1 = date_arr[0];
                var d2 = date_arr[1];
                if (compareDate(d1, d2) < 0) {
                    var mid = d1;
                    d1 = d2;
                    d2 = mid;
                }
                var year_ = parseInt(_this.year);
                var month_ = parseInt(_this.month);
                var month_2 = 0;
                var year_2 = 0;
                if (month_ >= 12) {
                    month_2 = 1;
                    year_2 = year_ + 1;
                } else {
                    month_2 = month_ + 1;
                    year_2 = year_;
                }
                var dateRenderNow1 = "";
                var dateRenderNow2 = "";
                var k0 = _this.dayBox[0].children.length;
                var k1 = _this.dayBox[1].children.length;
                for (var i = 0; i < k0; i++) {
                    if (_this.dayBox[0].children[i].getAttribute("data-dateitem")) {
                        dateRenderNow1 = _this.dayBox[0].children[i].getAttribute("data-dateitem");
                        if (compareDate(d1, dateRenderNow1) < 0 || compareDate(d2, dateRenderNow1) > 0) {
                            continue;
                        } else {
                            addClass(_this.dayBox[0].children[i], classNames);
                        }
                    }
                }
                for (var y = 0; y < k1; y++) {
                    if (_this.dayBox[1].children[y].getAttribute("data-dateitem")) {
                        dateRenderNow2 = _this.dayBox[1].children[y].getAttribute("data-dateitem");
                        if (compareDate(d1, dateRenderNow2) < 0 || compareDate(d2, dateRenderNow2) > 0) {
                            continue;
                        } else {
                            addClass(_this.dayBox[1].children[y], classNames);
                        }
                    }
                }
                return false;
            }

            function getClickDate(element) {
                if (element.getAttribute("data-dateitem")) {
                    clickDate_ = element.getAttribute("data-dateitem");
                    return clickDate_;
                }
                return false;
            }

            function selectClean(classCleaning) {
                var k0 = _this.dayBox[0].children.length;
                var k1 = _this.dayBox[1].children.length;
                for (var i = 0; i < k0; i++) {
                    if (hasClass(_this.dayBox[0].children[i], classCleaning)) {
                        removeClass(_this.dayBox[0].children[i], classCleaning);
                    }
                }
                for (var y = 0; y < k1; y++) {
                    if (hasClass(_this.dayBox[1].children[y], classCleaning)) {
                        removeClass(_this.dayBox[1].children[y], classCleaning);
                    }
                }
                return false;
            }

            function dateForm1(dateStr, yymmdd) {
                var dateArr = dateStr.split("-");
                if (parseInt(dateArr[1]) < 10) {
                    dateArr[1] = "0" + parseInt(dateArr[1]);
                }
                if (parseInt(dateArr[2]) < 10) {
                    dateArr[2] = "0" + parseInt(dateArr[2]);
                }
                var dateArrNow = dateArr;
                if (_this.outputForm === "mmdd") {
                    dateArrNow = dateArr.slice(1, 3);
                } else if (_this.outputForm === "yy") {
                    dateArrNow = dateArr.slice(0, 1);
                } else if (_this.outputForm === "mm") {
                    dateArrNow = dateArr.slice(1, 2);
                } else if (_this.outputForm === "dd") {
                    dateArrNow = dateArr.slice(2, 3);
                } else if (_this.outputForm === "yymm") {
                    dateArrNow = dateArr.slice(0, 2);
                } else if (_this.outputForm === "mmyy") {
                    dateArrNow = [];
                    dateArrNow[0] = dateArr.slice(1, 2).join("");
                    dateArrNow[1] = dateArr.slice(0, 1).join("");
                    // dateArrNow = dateArr.slice(2,3);
                } else if (_this.outputForm === "ddmm") {
                    dateArrNow = [];
                    dateArrNow[0] = dateArr.slice(2, 3).join("");
                    dateArrNow[1] = dateArr.slice(1, 2).join("");
                } else if (_this.outputForm === "mmddyy") {
                    dateArrNow = [];
                    dateArrNow[0] = dateArr.slice(1, 2).join("");
                    dateArrNow[1] = dateArr.slice(2, 3).join("");
                    dateArrNow[2] = dateArr.slice(0, 1).join("");
                } else if (_this.outputForm === "ddmmyy") {
                    dateArrNow = [];
                    dateArrNow[1] = dateArr.slice(2, 3).join("");
                    dateArrNow[0] = dateArr.slice(1, 2).join("");
                    dateArrNow[2] = dateArr.slice(0, 1).join("");
                }
                return dateArrNow.join("-");
            }

            function dateForm2(dateStr) {
                var dateArr = dateStr.split("-");
                if (parseInt(dateArr[1]) < 10) {
                    dateArr[1] = "0" + parseInt(dateArr[1]);
                }
                if (parseInt(dateArr[2]) < 10) {
                    dateArr[2] = "0" + parseInt(dateArr[2]);
                }
                return dateArr.join("-");
            }

            function fillInDate(dateArr, idArr) {
                // 改变回填逻辑，根据日期数组长度来匹配id，决定回填方式，
                // case1 一个id  两个日期
                // case2 一个id  一个日期
                // case3 两个id  两个日期 也可能第二个日期木有，那就不填第二个
                var data_date1 = "";
                var data_date2 = "";
                var show_date1 = "";
                var show_date2 = "";
                // 一个日期回填到一个id，不管日期几个
                if (dateArr.length === 1 && idArr.length > 0) {
                    data_date1 = dateForm2(dateArr[0]);
                    idArr[0].setAttribute("data-date1", data_date1); //设置标签属性,默认日期格式
                    show_date1 = dateForm1(data_date1); //标签上要显示的日期格式
                    if (idArr[0].tagName == "INPUT") {
                        idArr[0].value = show_date1;
                    } else {
                        idArr[0].innerHTML = show_date1;
                    }
                } else if (dateArr.length === 2 && idArr.length === 1) {
                    // 两个日期回填到一个id
                    data_date1 = dateForm2(dateArr[0]);
                    data_date2 = dateForm2(dateArr[1]);
                    if (compareDate(data_date1, data_date2) < 0) {
                        var mid = data_date1;
                        data_date1 = data_date2;
                        data_date2 = mid;
                    }
                    idArr[0].setAttribute("data-date1", data_date1);
                    idArr[0].setAttribute("data-date2", data_date2);
                    show_date1 = dateForm1(data_date1); //标签上要显示的日期格式
                    show_date2 = dateForm1(data_date2); //标签上要显示的日期格式
                    if (idArr[0].tagName == "INPUT") {
                        idArr[0].value = show_date1 + " " + _this.hyphen + " " + show_date2;
                        // console.log(`idArr[0].value ：${idArr[0].value}`);
                    } else {
                        idArr[0].innerHTML = show_date1 + " " + _this.hyphen + " " + show_date2;
                    }
                } else if (dateArr.length === 2 && idArr.length === 2) {
                    // 两个日期回填到两个id
                    data_date1 = dateForm2(dateArr[0]);
                    data_date2 = dateForm2(dateArr[1]);
                    if (compareDate(data_date1, data_date2) < 0) {
                        var mid = data_date1;
                        data_date1 = data_date2;
                        data_date2 = mid;
                    }
                    idArr[0].setAttribute("data-date1", data_date1);
                    idArr[1].setAttribute("data-date2", data_date2);
                    show_date1 = dateForm1(data_date1); //标签上要显示的日期格式
                    show_date2 = dateForm1(data_date2); //标签上要显示的日期格式
                    if (idArr[0].tagName == "INPUT") {
                        idArr[0].value = show_date1;
                        idArr[1].value = show_date2;
                    } else {
                        idArr[0].innerHTML = show_date1;
                        idArr[1].innerHTML = show_date2;
                    }
                } else {
                    return false;
                }
            }

            function stopPropagation(e) {
                // var e = event || window.event;
                var e = e || event;
                if (e.stopPropagation) {
                    //W3C阻止冒泡方法
                    e.stopPropagation();
                    // console.log("chrome阻止冒泡成功");
                } else {
                    e.cancelBubble = true; //IE阻止冒泡方法
                    // console.log("IE阻止冒泡成功");
                }
            }

            function stopDefault(e) {
                if (e && e.preventDefault) {
                    e.preventDefault(); //防止浏览器默认行为(W3C)
                } else  {
                    if ( !_this.browser_ie8) {
                        window.event.returnValue = false; //IE中阻止浏览器行为
                    }
                }
                return false;
            }

            // 显示回填信息
            function showPop(e) {
                if (e) {
                    stopPropagation(e);
                }
                var day_selected1 = "";
                var day_selected2 = "";
                if (setting.id.length === 2) {
                    day_selected1 = _this.datePicker[0].getAttribute("data-date1");
                    day_selected2 = _this.datePicker[1].getAttribute("data-date2");
                } else if (setting.id.length === 1 && setting.doubleCalendar === true) {
                    day_selected1 = _this.datePicker[0].getAttribute("data-date1");
                    day_selected2 = _this.datePicker[0].getAttribute("data-date2");
                }
                if (day_selected1 && day_selected2) {
                    _this.clickDate[0] = day_selected1;
                    _this.clickDate[1] = day_selected2;
                    var t1 = _this.clickDate[0].split("-");
                    _this.year = parseInt(t1[0]);
                    _this.month = parseInt(t1[1]);
                    _this.day = parseInt(t1[2]);
                    render(_this.year, _this.month);
                } else {
                    render(_this.year, _this.month, _this.day);
                }

                if (setting.id.length === 1 && _this.singleDate === true) {
                    day_selected1 = _this.datePicker[0].getAttribute("data-date1");
                }
                if (day_selected1) {
                    _this.clickDate[0] = day_selected1;
                    var t1 = _this.clickDate[0].split("-");
                    _this.year = parseInt(t1[0]);
                    _this.month = parseInt(t1[1]);
                    _this.day = parseInt(t1[2]);
                    render(_this.year, _this.month);
                } else {
                    render(_this.year, _this.month, _this.day);
                }
                _this.calendarBox.style.display = "block";
                adjustPosition();
                addEvent(_this.calendarBox, "click", function (e) {
                    stopPropagation(e);
                    stopDefault(e);
                    // e.preventDefault();
                });

                var bodyDom = document.getElementsByTagName("body")[0];
                addEvent(bodyDom, "click", function (e) {
                    var calendarNowDomQuery = "body [data-calendarname]";
                    var doms = document.querySelectorAll(calendarNowDomQuery);
                    if (doms.length > 0) {
                        _this.calendarBox.style.display = "none";
                        // console.log(`_this.clickDate.length ：${ _this.clickDate.length }`);
                        // console.log(`_this.clickDate ：${ _this.clickDate }`);
                        if (_this.clickDate.length == 1 && _this.singleDate !== true) {
                            var date_cur = _this.clickDate[0];
                            _this.clickDate = [];
                            _this.clickDate[0] = date_cur;
                            var d1 = dateForm2(_this.clickDate[0]);
                            show_date1 = dateForm1(d1); //标签上要显示的日期格式
                            if (_this.datePicker.length === 1) {
                                _this.datePicker[0].setAttribute("data-date2", "");
                                if (_this.datePicker[0].tagName == "INPUT") {
                                    _this.datePicker[0].value = "";
                                } else {
                                    _this.datePicker[0].innerHTML = "";
                                }
                            } else if (_this.datePicker.length === 2) {
                                _this.datePicker[1].setAttribute("data-date2", "");
                                if (_this.datePicker[1].tagName == "INPUT") {
                                    _this.datePicker[1].value = "";
                                } else {
                                    _this.datePicker[1].innerHTML = "";
                                }
                            }
                            fillInDate(_this.clickDate, _this.datePicker);
                        }
                        hidePop();
                    }
                });
            }

            function adjustPosition() {
                var screenWidth = document.documentElement.clientWidth;
                var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
                // 用移动端且宽度<= 768
                if (isMobile && document.documentElement.clientWidth <= 768) {} else if (typeof setting.position == "undefined") {
                    _this.calendarBox.style.position = "absolute";
                    _this.calendarBox.style.left = _this.datePicker[0].getBoundingClientRect().left + "px";
                    _this.calendarBox.style.right = "auto";
                    var x_right = _this.calendarBox.getBoundingClientRect().right;
                    var rightOut = x_right - screenWidth > 0 ? true : false;
                    if (rightOut) {
                        _this.calendarBox.style.left = _this.datePicker[0].getBoundingClientRect().left + screenWidth - x_right - 10 + "px";
                        _this.calendarBox.style.right = "auto";
                    }
                }

                // 设置top
                if (typeof setting.position != "undefined") {
                    _this.calendarBox.style.top = setting.position.top;
                    _this.calendarBox.style.left = setting.position.left;
                    _this.calendarBox.style.right = setting.position.right;
                    _this.calendarBox.style.bottom = setting.position.bottom;
                }

                if (screenWidth < 768) {
                    _this.btn_next[0].style.display = "block";
                    _this.btn_next[1].style.display = "none";
                } else {
                    _this.btn_next[0].style.display = "none";
                    _this.btn_next[1].style.display = "block";
                }
            }

            function hidePop(e) {
                stopPropagation(e);
                var calendarNowDomQuery = "body [data-calendarname]";
                var doms = document.querySelectorAll(calendarNowDomQuery);
                // console.log(`doms.length ：${ doms.length }`);

                if (doms) {
                    for (var i = 0; i < doms.length; i++) {
                        doms[i].parentNode.removeChild(doms[i]);
                    }
                }
                // if (_this.calendarBox.style.display=="block" || _this.calendarBox.style.display=="none") {
                //     _this.calendarBox.style.display = "none";
                //     _this.calendarBox.parentNode.removeChild(_this.calendarBox);
                // }
                return false;
            }

            // 给日期绑定点击事件
            function selectDate(e) {
                // console.log(点击单元格);
                if (!_this.browser_ie8) {
                    stopPropagation(e);
                }
                var e_day_box = e.target || e.srcElement;
                if (hasClass(e_day_box, "d-c-day")) {
                    return false;
                }
                if (hasClass(e_day_box, "disabled")) {
                    return false;
                }
                if (hasClass(e_day_box, "d-day-item-white")) {
                    return false;
                }
                var dateClick = getClickDate(e_day_box);
                if (_this.clickDate.length === 0) {
                    selectClean("selected");
                    addClass(e_day_box, "selected");
                    _this.clickDate.push(dateClick);
                } else if (_this.clickDate.length === 1) {
                    if (_this.singleDate === true) {
                        // 单日期直接回填
                        removeClass(e_day_box, "selected");
                        addClass(e_day_box, "selected");
                        _this.clickDate = []; //置空状态
                        _this.clickDate[0] = dateClick;
                    } else {
                        removeClass(e_day_box, "selected");
                        addClass(e_day_box, "selected");
                        if (compareDate(dateClick, _this.clickDate[0]) === 0) {
                            // 个人不喜欢这种隐藏点击
                            _this.clickDate.push(dateClick);
                        } else {
                            _this.clickDate.push(dateClick);
                        }
                    }
                } else if (_this.clickDate.length > 1) {
                    selectClean("selected");
                    addClass(e_day_box, "selected");
                    _this.clickDate = []; //置空状态
                    _this.clickDate.push(dateClick);
                }
                selectClean("d-applicable");

                if (_this.clickDate.length === 2) {
                    renderSelectedClass(_this.clickDate, "d-applicable");
                    fillInDate(_this.clickDate, _this.datePicker);
                    _this.calendarBox.style.display = "none";
                    if (_this.browser_ie8) {
                        hidePop();
                    }
                }
                if (_this.clickDate.length === 1 && _this.singleDate === true) {
                    fillInDate(_this.clickDate, _this.datePicker);
                    _this.calendarBox.style.display = "none";
                    if (_this.browser_ie8) {
                        hidePop();
                    }
                }
                return false;
            }

            function hoverDate(e) {
                stopPropagation(e);
                var e_day_box = e.target || e.srcElement;

                if (hasClass(e_day_box, "d-c-day")) {
                    return false;
                }
                if (hasClass(e_day_box, "disabled")) {
                    return false;
                }
                if (hasClass(e_day_box, "d-day-item-white")) {
                    return false;
                }
                var dateClick = getClickDate(e_day_box);

                if (_this.clickDate.length === 1) {
                    var dateArr = [dateClick, _this.clickDate[0]];
                    selectClean("d-applicable");
                    renderSelectedClass(dateArr, "d-applicable");
                }
                return false;
            }
        },
        calendar1: function (setting) {
            var _this = this;
            _this.browser_ie8 = false;
            // 兼容IE8  start
            if (navigator.userAgent.indexOf("Firefox") >= 0) {
                _this.browser_ie8 = false;
            } else {
                var browser_cur = navigator.appName;
                var b_version = navigator.appVersion;
                var version = b_version.split(";");
                var trim_Version = version[1].replace(/[ ]/g, "");
                if (browser_cur == "Microsoft Internet Explorer" && trim_Version == "MSIE8.0") {
                    _this.browser_ie8 = true;
                    // console.log("现在是ie8");
                }
            }
            var addEvent = function (el, type, handler) {
                if (_this.browser_ie8) {
                    return el.attachEvent("on" + type, handler);
                } else {
                    return el.addEventListener(type, handler, false);
                }
            };

            function RollId() {
                var canledarId = "canledar";
                for (var i = 0; i < 6; i++) {
                    canledarId += Math.floor(Math.random() * 10);
                }
                return canledarId;
            }

            _this.datePicker = [];
            // 定义输入框和对应的 d-calendar-box
            if (setting.id.length === 1) {
                _this.datePicker[0] = document.getElementById(setting.id[0]);
                _this.datePicker[0].setAttribute("tabindex", -1);

                // 绑定点击事件
                addEvent(_this.datePicker[0], "click", function () {
                    initials();
                });
            }

            function initials() {
                var canledarId = RollId();
                //创建dom
                _this.createDom(setting.id[0], _this.browser_ie8, 1, canledarId);
                // 兼容IE8  end
                _this.calendarItem = [];

                _this.e_date_bar = [];
                _this.btn_prev = [];
                _this.btn_next = [];
                _this.dayBox = [];
                _this.weekDayNameBar = [];
                _this.selectedDate = []; //已选日期
                _this.clickDate = []; //点击的年月
                _this.specialDays = []; //特殊日
                _this.outputForm = ""; //输出格式

                // _this.hyphen = typeof setting.hyphen != "undefined" ? setting.hyphen : "至";
                _this.outputForm = typeof setting.outputForm != "undefined" ? setting.outputForm : "yymmdd";

                _this.calendarBox = document.getElementById(canledarId);
                _this.calendarPop = _this.calendarBox.children[0];
                _this.calendarLayer = _this.calendarBox.children[1];

                var body_top = _this.datePicker[0].getBoundingClientRect().top;
                var body_bottom = document.documentElement.clientHeight - _this.datePicker[0].getBoundingClientRect().bottom;
                if (body_top > 314 && body_bottom < 314) {
                    _this.calendarBox.style.top = body_top + document.documentElement.scrollTop - 314 + "px";
                    // console.log("304上方渲染");
                } else {
                    _this.calendarBox.style.top = _this.datePicker[0].getBoundingClientRect().bottom + document.documentElement.scrollTop + 8 + "px";
                    // console.log(`下方渲染`);
                }
                // 不用加上面的代码 不用上面出 就这样
                // _this.calendarBox.style.top = _this.datePicker[0].getBoundingClientRect().bottom + document.documentElement.scrollTop + 8 + "px";
                var isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
                if (isMobile && document.documentElement.clientWidth < 768) {
                    _this.calendarBox.style.position = "fixed";
                    _this.calendarBox.style.top = "0";
                    _this.calendarBox.style.right = "0";
                    _this.calendarBox.style.bottom = "0";
                    _this.calendarBox.style.left = "0";
                    _this.calendarBox.style.margin = "auto";
                    _this.calendarBox.style.height = "270px";
                    _this.calendarLayer.style.display = "block";
                    addEvent(_this.calendarLayer, "mousedown", function (e) {
                        stopPropagation(e);
                        _this.calendarBox.style.display = "none";
                    });
                } else {
                    _this.calendarBox.style.height = "auto";
                }
                _this.calendarPop.style.width = "266px";
                _this.calendarBox.style.width = "280px";

                if (typeof setting.position != "undefined") {
                    //默认top 36px  left 0
                    _this.calendarBox.style.top = setting.position.top;
                    _this.calendarBox.style.left = setting.position.left;
                    _this.calendarBox.style.right = setting.position.right;
                    _this.calendarBox.style.bottom = setting.position.bottom;
                }

                _this.calendarItem[0] = _this.calendarPop.children[1]; //第1个 d-calendar-box
                _this.calendarItem[0].style.margin = "0";

                // 定义 时间条显示的日期
                _this.e_date_bar[0] = _this.calendarItem[0].children[0].children[2]; //第一个时间条
                // 定义星期几-名称条
                _this.weekDayNameBar[0] = _this.calendarItem[0].children[1]; //第一个星期条
                // _this.weekDayNameBar[1] = _this.calendarItem[1].children[1]; //第二个星期条
                _this.weekStartDay = setting.weekStartDay === 1 ? setting.weekStartDay : 7;
                // 默认周日开始
                // console.log(`_this.weekStartDay ：${ _this.weekStartDay}`);
                // 定义星期内容数组
                _this.weekDayName = typeof setting.weekDayName != "undefined" ? setting.weekDayName : ["日", "一", "二", "三", "四", "五", "六"];
                if (_this.weekStartDay === 1) {
                    // 存储第一个星期表述，剪切下来，然后保存到数组末尾
                    var weekDayNameFoo = _this.weekDayName[0];
                    _this.weekDayName = _this.weekDayName.splice(1);
                    _this.weekDayName.push(weekDayNameFoo);
                }
                // console.log(`_this.weekDayName ：${ _this.weekDayName}`);
                _this.weekDayNameBar[0].innerHTML = "";
                for (var week7 = 0; week7 < 7; week7++) {
                    //利用获取到的当月最后一天 把 前边的 天数 都循环 出来
                    var div_week1 = document.createElement("div");
                    div_week1.innerText = _this.weekDayName[week7];
                    addClass(div_week1, "d-week-item");
                    _this.weekDayNameBar[0].appendChild(div_week1);
                }
                _this.btn_prev[0] = _this.calendarItem[0].children[0].children[0];
                _this.btn_next[0] = _this.calendarItem[0].children[0].children[1];
                // 隐藏第一个右箭头
                // _this.btn_next[0].style.display = "none";
                // _this.btn_next[0].parentNode.removeChild(_this.btn_next[0]);

                // 定义天数box
                _this.dayBox[0] = _this.calendarItem[0].children[2];
                // _this.dayBox[1] = _this.calendarItem[1].children[2];

                // 定义日历标题
                _this.e_title = _this.calendarPop.children[0];

                // 定义月份名称数组
                if (typeof setting.arrMonth != "undefined") {
                    _this.arrMonth = setting.arrMonth;
                } else {
                    // 默认中文 月名称
                    _this.arrMonth = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
                }
                // 定义显示的日历格式
                if (typeof setting.dateForm != "undefined") {
                    _this.dateForm = setting.dateForm;
                } else {
                    // 默认yyyy-mm
                    _this.dateForm = "yyyy-mm";
                }
                _this.unitYear = typeof setting.unitYear != "undefined" ? setting.unitYear : "年";

                _this.title = typeof setting.title != "undefined" ? setting.title : undefined;

                //是否使用设定时间，如未设定则使用本地时间
                var date_local = new Date();
                if (typeof setting.today != "undefined") {
                    var dateArr = setting.today.split("-");
                    _this.curYear = parseInt(dateArr[0]);
                    _this.curMonth = parseInt(dateArr[1]);
                    _this.curDay = parseInt(dateArr[2]);
                    _this.curDate = setting.today;
                    // console.log(`给定了当日日期:${_this.curDate}`);
                } else {
                    _this.curYear = date_local.getFullYear();
                    _this.curMonth = date_local.getMonth() + 1; //中文状态的数字
                    _this.curDay = date_local.getDate();
                    _this.curDate = _this.curYear + "-" + _this.curMonth + "-" + _this.curDay;
                    // console.log(`本地当日日期:_this.curDate:${_this.curDate}`);
                }

                if (typeof setting.specialDays != "undefined") {
                    _this.specialDays = setting.specialDays;
                    // console.table(_this.specialDays);
                }
                // 渲染显示的日期
                _this.year = _this.curYear;
                _this.month = _this.curMonth;
                _this.day = _this.curDay;

                // 定义有效操作日期区间
                if (typeof setting.today != "undefined") {
                    var dateArr = setting.today.split("-");
                    _this.curYear = parseInt(dateArr[0]);
                    _this.curMonth = parseInt(dateArr[1]);
                    _this.curDay = parseInt(dateArr[2]);
                    _this.curDate = setting.today;
                    // console.log(`给定了当日日期:${_this.curDate}`);
                }

                _this.limitDate = typeof setting.limitDate != "undefined" ? setting.limitDate : _this.curDate;
                if (_this.limitDate === true) {
                    _this.limitDate1 = typeof setting.limitDate1 != "undefined" ? setting.limitDate1 : _this.curDate;
                    _this.limitDate2 = typeof setting.limitDate2 != "undefined" ? setting.limitDate2 : getDateBydays(_this.curDate, 3650);
                } else {
                    _this.limitDate1 = getDateBydays(_this.curDate, -36500);
                    _this.limitDate2 = getDateBydays(_this.curDate, 36500); //默认前后限制日期 100年
                }

                addEvent(_this.btn_prev[0], "click", function () {
                    if (parseInt(_this.month) <= 1) {
                        _this.month = 12;
                        _this.year = parseInt(_this.year) - 1;
                    } else {
                        _this.month = _this.month - 1;
                    }
                    _this.render(_this.year, _this.month);
                });

                addEvent(_this.btn_next[0], "click", function () {
                    //  12 进 1
                    if (_this.month >= 12) {
                        _this.month = 1;
                        _this.year += 1;
                    } else {
                        _this.month += 1;
                    }
                    _this.render(_this.year, _this.month);
                });

                // 绑定焦点事件
                if (_this.datePicker.length === 1) {
                    addEvent(_this.datePicker[0], "focus", showPop);
                }

                if (!_this.browser_ie8) {
                    addEvent(_this.calendarBox, "blur", hidePop);
                }

                addEvent(_this.calendarBox, "mousedown", function (e) {
                    stopPropagation(e);
                    if (_this.browser_ie8) {} else {
                        e.preventDefault();
                    }
                    _this.calendarBox.focus();
                });
                addEvent(_this.dayBox[0], "click", selectDate);
                showPop();
            }

            function addClass(obj, class_name) {
                var obj_class = obj.className; //获取 class 内容.
                var blank = obj_class != "" ? " " : ""; //判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
                var added = obj_class + blank + class_name; //组合原来的 class 和需要添加的 class.
                obj.setAttribute("class", added);
            }

            function hasClass(obj, class_name) {
                var obj_class = obj.className, //获取 class 内容.
                    obj_class_lst = obj_class.split(/\s+/); //通过split空字符将class_name转换成数组.
                x = 0;
                for (x in obj_class_lst) {
                    if (obj_class_lst[x] == class_name) {
                        //循环数组, 判断是否包含class_name
                        return true;
                    }
                }
                return false;
            }

            function removeClass(obj, class_name) {
                var obj_class = " " + obj.className + " "; //获取 class 内容, 并在首尾各加一个空格
                (obj_class = obj_class.replace(/(\s+)/gi, " ")), //将多余的空字符替换成一个空格
                (removed = obj_class.replace(" " + class_name + " ", " ")); //在原来的
                removed = removed.replace(/(^\s+)|(\s+$)/g, ""); //去掉首尾空格
                obj.className = removed; //替换原来的 class.
            }

            // 计算日期相差天数
            function getDaysBlock(limitDate1, limitDate2) {
                var startDate = Date.parse(limitDate1.replace("/-/g", "/"));
                var endDate = Date.parse(limitDate2.replace("/-/g", "/"));
                var diffDate = endDate - startDate + 1 * 24 * 60 * 60 * 1000;
                var days = parseInt(diffDate / (1 * 24 * 60 * 60 * 1000));
                return days;
            }

            function getDateBydays(date, days) {
                var t1 = date.split("-");
                var ms = new Date(t1[0], t1[1] - 1, t1[2]).getTime();
                ms += days * 24 * 60 * 60 * 1000;
                var dateNew = new Date(ms);
                var newDateString = dateNew.getFullYear() + "-" + (dateNew.getMonth() + 1) + "-" + dateNew.getDate();
                return newDateString;
            }

            function compareDate(date1, date2) {
                var t1 = date1.split("-");
                var startDate = new Date(t1[0], t1[1] - 1, t1[2]);
                var t2 = date2.split("-");
                var endDate = new Date(t2[0], t2[1] - 1, t2[2]);
                if (endDate - startDate > 0) {
                    return 1;
                } else if (endDate - startDate == 0) {
                    return 0;
                } else {
                    return -1;
                }
            }

            //判断闰年
            function runNian(_year) {
                if (_year % 400 === 0 || (_year % 4 === 0 && _year % 100 !== 0)) {
                    return true;
                } else {
                    return false;
                }
            }
            //判断某年某月的1号是星期几
            function getFirstDay(_year, _month) {
                var allDay = 0,
                    y = _year - 1,
                    i = 1;
                allDay = y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + 1;
                for (; i < _month; i++) {
                    switch (i) {
                        case 1:
                            allDay += 31;
                            break;
                        case 2:
                            if (runNian(_year)) {
                                allDay += 29;
                            } else {
                                allDay += 28;
                            }
                            break;
                        case 3:
                            allDay += 31;
                            break;
                        case 4:
                            allDay += 30;
                            break;
                        case 5:
                            allDay += 31;
                            break;
                        case 6:
                            allDay += 30;
                            break;
                        case 7:
                            allDay += 31;
                            break;
                        case 8:
                            allDay += 31;
                            break;
                        case 9:
                            allDay += 30;
                            break;
                        case 10:
                            allDay += 31;
                            break;
                        case 11:
                            allDay += 30;
                            break;
                        case 12:
                            allDay += 31;
                            break;
                    }
                }
                return allDay % 7;
            }

            function getCurrentMonthDays(year_, month_) {
                // 输入年 和 月  返还 某年某月 的天数
                var curMonthDays = new Date(year_, month_, 0).getDate();
                return curMonthDays;
            }
            // 初始化数据
            _this.render = function (year_1, month_1, day_1) {
                var year_ = parseInt(year_1);
                var month_ = parseInt(month_1);
                var day_ = parseInt(day_1);
                var month_2 = 0;
                var year_2 = 0;
                if (month_ >= 12) {
                    month_2 = 1;
                    year_2 = year_ + 1;
                } else {
                    month_2 = month_ + 1;
                    year_2 = year_;
                }
                //设置日历标题
                _this.e_title.innerText = _this.title;
                if (typeof setting.title == "undefined") {
                    _this.e_title.style.display = "none";
                }

                // console.log(`重新渲染日期:${year_}-${month_} 至 ${year_2}-${month_2}`);
                // 判断日期格式   默认yyyy-mm,  月年 "mm-yyyy"
                if (_this.dateForm === "mm-yyyy") {
                    var dateText1 = _this.arrMonth[month_ - 1] + "&nbsp;" + year_;
                    var dateText2 = _this.arrMonth[month_2 - 1] + "&nbsp;" + year_2;
                } else {
                    var dateText1 = year_ + _this.unitYear + _this.arrMonth[month_ - 1];
                    var dateText2 = year_2 + _this.unitYear + _this.arrMonth[month_2 - 1];
                }

                var curMonthDays1 = getCurrentMonthDays(year_, month_); //获取当前月有多少天
                var curWeek1 = getFirstDay(year_, month_); //获取当前月第一天 是 周几
                var curMonthDays2 = getCurrentMonthDays(year_2, month_2); //获取当前月有多少天
                var curWeek2 = getFirstDay(year_2, month_2); //获取当前月第一天 是 周几
                if (_this.weekStartDay === 1) {
                    if (curWeek1 == 0) {
                        curWeek1 = 6;
                    } else {
                        curWeek1 -= 1;
                    }
                    if (curWeek2 == 0) {
                        curWeek2 = 6;
                    } else {
                        curWeek2 -= 1;
                    }
                }
                _this.e_date_bar[0].innerHTML = dateText1; //显示日期bar
                // _this.e_date_bar[1].innerHTML = dateText2; //显示日期bar
                _this.dayBox[0].innerHTML = "";
                // _this.dayBox[1].innerHTML = "";
                for (var i = 0; i < curWeek1; i++) {
                    //渲染空白 与 星期 对应上
                    var div_space = document.createElement("div");
                    addClass(div_space, "d-day-item d-day-item-white");
                    _this.dayBox[0].appendChild(div_space);
                }
                for (var k = 1; k <= curMonthDays1; k++) {
                    //利用获取到的当月最后一天 把 前边的 天数 都循环 出来
                    var div_day = document.createElement("div");
                    div_day.innerText = k;
                    // 当前渲染的单元格对应的日期为
                    var dateNow1 = year_ + "-" + month_ + "-" + k; //当前要渲染出的日期格子
                    div_day.setAttribute("data-dateitem", dateNow1);
                    var x1 = compareDate(_this.limitDate1, dateNow1);
                    var x2 = compareDate(_this.limitDate2, dateNow1);
                    addClass(div_day, "d-day-item");
                    if (year_ == _this.curYear && month_ == _this.curMonth && k == _this.curDay) {
                        addClass(div_day, "cur-day");
                    }
                    if (x1 < 0 || x2 > 0) {
                        addClass(div_day, "disabled");
                    }
                    _this.dayBox[0].appendChild(div_day);
                }
                renderClass(_this.clickDate, "selected");
                renderSpecialDays(_this.specialDays);
            };

            function traversalBox(date_, classNames) {
                var dateRenderNow1 = "";
                var k0 = _this.dayBox[0].children.length;
                for (var i = 0; i < k0; i++) {
                    if (_this.dayBox[0].children[i].getAttribute("data-dateitem")) {
                        dateRenderNow1 = _this.dayBox[0].children[i].getAttribute("data-dateitem");
                        if (compareDate(date_, dateRenderNow1) === 0) {
                            addClass(_this.dayBox[0].children[i], classNames);
                        }
                    }
                }
                return false;
            }

            function traversalDateDom(findDate) {
                var dateRenderNow1 = "";
                var k0 = _this.dayBox[0].children.length;
                for (var i = 0; i < k0; i++) {
                    if (_this.dayBox[0].children[i].getAttribute("data-dateitem")) {
                        dateRenderNow1 = _this.dayBox[0].children[i].getAttribute("data-dateitem");
                        if (compareDate(findDate, dateRenderNow1) === 0) {
                            return _this.dayBox[0].children[i];
                        }
                    }
                }
                return false;
            }

            function renderSpecialDays(arr) {
                if (arr.length === 0) {
                    return false;
                }
                for (var i = 0; i < arr.length; i++) {
                    var specialDay = traversalDateDom(arr[i].date);
                    if (specialDay) {
                        addClass(specialDay, "special-day");
                        specialDay.innerText = arr[i].text;
                    }
                }
            }

            function renderClass(date_arr, classNames) {
                if (date_arr.length === 0) {
                    return false;
                }
                selectClean(classNames);
                for (var z = 0; z < date_arr.length; z++) {
                    traversalBox(date_arr[z], classNames);
                }
                return false;
            }

            function getClickDate(element) {
                if (element.getAttribute("data-dateitem")) {
                    clickDate_ = element.getAttribute("data-dateitem");
                    return clickDate_;
                }
                return false;
            }

            function selectClean(classCleaning) {
                var k0 = _this.dayBox[0].children.length;
                // var k1 = _this.dayBox[1].children.length;
                for (var i = 0; i < k0; i++) {
                    if (hasClass(_this.dayBox[0].children[i], classCleaning)) {
                        removeClass(_this.dayBox[0].children[i], classCleaning);
                    }
                }
                return false;
            }

            function dateForm1(dateStr, yymmdd) {
                var dateArr = dateStr.split("-");
                if (dateArr[1] < 10) {
                    dateArr[1] = "0" + dateArr[1];
                }
                if (dateArr[2] < 10) {
                    dateArr[2] = "0" + dateArr[2];
                }
                var dateArrNow = dateArr;
                if (_this.outputForm === "mmdd") {
                    dateArrNow = dateArr.slice(1);
                }
                return dateArrNow.join("-");
            }

            function dateForm2(dateStr) {
                var dateArr = dateStr.split("-");
                if (dateArr[1] < 10) {
                    dateArr[1] = "0" + dateArr[1];
                }
                if (dateArr[2] < 10) {
                    dateArr[2] = "0" + dateArr[2];
                }
                return dateArr.join("-");
            }

            function fillInDate(dateArr, idArr) {
                if (dateArr.length !== 1) {
                    return false;
                }
                var d1 = dateArr[0];
                var data_date = dateArr[0];
                if (setting.id.length === 1) {
                    idArr[0].setAttribute("data-date1", dateForm2(data_date));
                }
                // 转换成 yyyy-0m-0d 格式
                d1 = dateForm1(d1);

                if (idArr[0].tagName == "INPUT") {
                    idArr[0].value = d1;
                } else {
                    idArr[0].innerHTML = d1;
                }
            }

            function stopPropagation(e) {
                var e = e || event;
                if (e.stopPropagation) {
                    //W3C阻止冒泡方法
                    e.stopPropagation();
                    // console.log("chrome阻止冒泡成功");
                } else {
                    e.cancelBubble = true; //IE阻止冒泡方法
                    // console.log("IE阻止冒泡成功");
                }
            }

            function showPop(e) {
                if (e) {
                    stopPropagation(e);
                }
                var day_selected1 = "";
                if (setting.id.length === 1) {
                    day_selected1 = _this.datePicker[0].getAttribute("data-date1");
                }

                if (day_selected1) {
                    _this.clickDate[0] = day_selected1;
                    var t1 = _this.clickDate[0].split("-");
                    _this.year = parseInt(t1[0]);
                    _this.month = parseInt(t1[1]);
                    _this.day = parseInt(t1[2]);
                    _this.render(_this.year, _this.month);
                } else {
                    _this.render(_this.year, _this.month, _this.day);
                }
                _this.calendarBox.style.display = "block";
                _this.calendarBox.focus();
                adjustPosition();
            }

            function adjustPosition() {
                var screenWidth = document.documentElement.clientWidth;
                var isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
                // 用移动端且宽度< 768
                if (isMobile && document.documentElement.clientWidth < 768) {} else if (typeof setting.position == "undefined") {
                    _this.calendarBox.style.position = "absolute";
                    _this.calendarBox.style.left = _this.datePicker[0].getBoundingClientRect().left + "px";
                    _this.calendarBox.style.right = "auto";
                    var x_right = _this.calendarBox.getBoundingClientRect().right;
                    var rightOut = x_right - screenWidth > 0 ? true : false;
                    if (rightOut) {
                        _this.calendarBox.style.left = _this.datePicker[0].getBoundingClientRect().left + screenWidth - x_right - 10 + "px";
                        _this.calendarBox.style.right = "auto";
                    }
                }

                // 设置top
                if (typeof setting.position != "undefined") {
                    _this.calendarBox.style.top = setting.position.top;
                    _this.calendarBox.style.left = setting.position.left;
                    _this.calendarBox.style.right = setting.position.right;
                    _this.calendarBox.style.bottom = setting.position.bottom;
                }
            }

            function hidePop(e) {
                stopPropagation(e);
                _this.calendarBox.style.display = "none";
                _this.calendarBox.parentNode.removeChild(_this.calendarBox);
            }

            // 给日期绑定点击事件
            function selectDate(e) {
                stopPropagation(e);
                var e_day_box = e.target || e.srcElement;
                if (hasClass(e_day_box, "d-c-day")) {
                    // console.log("阻止冒泡失败");
                    return false;
                }
                if (hasClass(e_day_box, "disabled")) {
                    return false;
                }
                if (hasClass(e_day_box, "d-day-item-white")) {
                    return false;
                }
                var dateClick = getClickDate(e_day_box);

                if (_this.clickDate.length === 0) {
                    selectClean("selected");
                    addClass(e_day_box, "selected");
                    _this.clickDate.push(dateClick);
                } else if (_this.clickDate.length === 1) {
                    removeClass(e_day_box, "selected");
                    addClass(e_day_box, "selected");
                    _this.clickDate = []; //置空状态
                    _this.clickDate[0] = dateClick;
                }
                // selectClean("d-applicable");
                if (_this.clickDate.length === 1) {
                    fillInDate(_this.clickDate, _this.datePicker);
                    _this.calendarBox.style.display = "none";
                    if (_this.browser_ie8) {
                        hidePop();
                    }
                }
                return false;
            }
        }
    };
    ctrip.fn.init.prototype = ctrip.fn;
    return ctrip;
})();