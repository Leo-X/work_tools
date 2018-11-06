var ctrip = (function(window) {
    var ctrip = function(data) {
        return new ctrip.fn.init(data);
    };
    ctrip.fn = ctrip.prototype = {
        constructor: ctrip,
        init: function(data) {},
        createDom: function(domId, isIE, boxNum, multiple_) {
            var isIE_ = typeof isIE != "undefined" ? isIE : false;
            var styleStr =
                "    .calendar-wrapper{position: relative;display: inline-block;}" +
                '.d-calendar{display: none; position: absolute;top: 36px;left: 0;z-index: 2; padding: 20px 10px 0 10px;width: 550px;overflow: auto; background-color: #fff;box-shadow:0 2px 8px 0 rgba(0,0,0,0.2);font-family:"Microsoft YaHei","微软雅黑",arial,simhei;color: #333;' +
                "outline: none;" +
                "}" +
                ".visible{display: block;}" +
                ".hidden{display: none;}" +
                ".d-calendar .d-calendar-header{padding:5px 10px; text-align: center; font-size: 16px;font-weight: bold;}" +
                ".d-calendar .d-calendar-box{position: relative;display:inline-block;*zoom:1;*display: inline; width: 256px;vertical-align: top;}" +
                ".d-calendar .d-calendar-box.d-calendar-box01{margin-right: 10px;margin-bottom: 10px;}" +
                ".d-calendar-date{position: relative; padding: 0 24px 10px 24px; text-align: center; font-size: 16px;}" +
                ".d-calendar-box .btn-prev{position: absolute;top: 0;left: 0;  width: 24px;line-height: 24px;text-align: center;color:#06c;font-size: 20px;cursor: pointer;}" +
                ".d-calendar-box .btn-next{position: absolute;top: 0;right: 0; width: 24px;line-height: 24px;text-align: center;color:#06c;font-size: 20px;cursor: pointer;}" +
                ".d-c-week .d-week-item{position: relative;float: left; display:inline-block;*zoom:1;*display: inline;width: 36px;height: 36px;line-height: 36px;text-align: center; overflow: hidden;font-size:14px; z-index:2;}" +
                ".d-c-day .d-day-item{position: relative;float: left; display:inline-block;*zoom:1;*display: inline;width: 36px;height: 36px; line-height: 36px;text-align: center; font-size: 14px; overflow: hidden;cursor: pointer;}" +
                ".d-c-day .d-day-item .special-day{position: absolute;top: 0;right: 0;color: #f52121;line-height: 1;font-size: 12px;}" +
                ".d-c-day .d-day-item.d-applicable{background-color: #eee;}" +
                ".d-c-day .d-day-item.disabled{color: #bdbdbd;}" +
                ".d-c-day .d-day-item.selected{background-color: #07c;color: #fff;}" +
                ".d-c-day .cur-day{color:#07c;font-weight: bold;}" +
                ".d-c-day .cur-day.disabled{color:#8ec1e6;font-weight: bold;}" +
                ".d-c-day .d-day-item:hover{background-color: #07c;color: #fff;}" +
                ".d-c-day .d-day-item.disabled:hover{background-color: #fff; color: #bdbdbd;cursor: default;}" +
                ".d-c-day .cur-day.disabled:hover{color:#8ec1e6;font-weight: bold;}" +
                ".d-c-day .d-day-item.d-day-item-white{cursor: default;}" +
                ".d-c-day .d-day-item.d-day-item-white:hover{background-color: #fff;}" +
                '.clearfix::after{content: " ";clear: both;display: block;visibility: hidden;overflow: hidden;height: 0;*zoom:1}' +
                "@media screen and (max-width: 768px) {" +
                "    .d-calendar {width: 286px;}" +
                "}";

            // 多个时间表单下 multiple为ture 不添加多余 style标签
            if (!multiple_) {
                if (isIE_) {
                    var styles = document.createElement("style");
                    document.getElementsByTagName("head")[0].appendChild(styles);
                    styles.setAttribute("type", "text/css");
                    styles.styleSheet.cssText = styleStr;
                } else {
                    var styles = document.createElement("style");
                    styles.innerHTML = styleStr;
                    document.getElementsByTagName("head")[0].appendChild(styles);
                }
            }

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

            var dCalendar = document.createElement("div");
            dCalendar.className = "d-calendar";
            dCalendar.setAttribute("tabindex", 0);
            if (boxNum === 1) {
                dCalendar.innerHTML = calendaDom1;
            } else if (boxNum == 2) {
                dCalendar.innerHTML = calendaDom2;
            }
            document.getElementById(domId).parentElement.appendChild(dCalendar);
        },
        calendar2: function(setting) {
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
            // 一个页面多个表单时，填写,默认false
            _this.multiple = typeof setting.multiple != "undefined" ? setting.multiple : false;
            //创建dom
            _this.createDom(setting.id[0], _this.browser_ie8, 2, _this.multiple);
            var addEvent = function(el, type, handler) {
                if (_this.browser_ie8) {
                    return el.attachEvent("on" + type, handler);
                } else {
                    return el.addEventListener(type, handler, false);
                }
            };
            // 兼容IE8  end

            _this.calendarItem = [];
            _this.datePicker = [];
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

            // 定义输入框和对应的 d-calendar-box
            if (setting.id.length > 1) {
                _this.datePicker[0] = document.getElementById(setting.id[0]); //第一个输入框
                _this.datePicker[1] = document.getElementById(setting.id[1]); //第二个输入框
                _this.datePicker[0].setAttribute("tabindex", 0);
                _this.datePicker[1].setAttribute("tabindex", 0);
            } else {
                _this.datePicker[0] = document.getElementById(setting.id[0]); //第一个输入框
                _this.datePicker[0].setAttribute("tabindex", 0);
            }
            _this.calendarBox = _this.datePicker[0].parentNode;
            _this.calendarBox.style.position = "relative";
            _this.calendarBox.style.overflow = "visible";

            if (_this.browser_ie8) {
                _this.calendarPop = _this.datePicker[0].parentNode.lastChild;
            } else {
                _this.calendarPop = _this.datePicker[0].parentNode.lastElementChild;
            }

            if (typeof setting.position != "undefined") {
                //默认top 36px  left 0
                _this.calendarPop.style.top = setting.position.top;
                _this.calendarPop.style.left = setting.position.left;
                _this.calendarPop.style.right = setting.position.right;
                _this.calendarPop.style.bottom = setting.position.bottom;
            }

            if (_this.browser_ie8) {
                _this.calendarItem[0] = _this.datePicker[0].parentNode.lastChild.lastChild.previousSibling; //第1个 d-calendar-box
                _this.calendarItem[1] = _this.datePicker[0].parentNode.lastChild.lastChild; //第2个 d-calendar-box
            } else {
                _this.calendarItem[0] = _this.datePicker[0].parentNode.lastElementChild.children[1]; //第1个 d-calendar-box
                _this.calendarItem[1] = _this.datePicker[0].parentNode.lastElementChild.children[2]; //第2个 d-calendar-box
            }

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
            if (_this.browser_ie8) {
                _this.e_title = _this.datePicker[0].parentNode.lastChild.children[0];
            } else {
                _this.e_title = _this.datePicker[0].parentNode.lastElementChild.children[0];
            }

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
            _this.unitYear = typeof setting.unitYear != "undefined" ? setting.unitYear : "";
            _this.title = typeof setting.title != "undefined" ? setting.title : undefined;

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
            // var cccc = getDateBydays('2018-9-27', 365);
            // console.log(`cccc ：${ cccc }`);

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
            // 定义有效操作日期区间
            if (typeof setting.today != "undefined") {
                var dateArr = setting.today.split("-");
                _this.curYear = parseInt(dateArr[0]);
                _this.curMonth = parseInt(dateArr[1]);
                _this.curDay = parseInt(dateArr[2]);
                _this.curDate = setting.today;
                // console.log(`给定了当日日期:${_this.curDate}`);
            }

            if (typeof setting.limitDate != "undefined") {
                _this.limitDate1 = typeof setting.limitDate1 != "undefined" ? setting.limitDate1 : _this.curDate;
                _this.limitDate2 = typeof setting.limitDate2 != "undefined" ? setting.limitDate2 : getDateBydays(_this.curDate, 365);
            } else {
                _this.limitDate1 = getDateBydays(_this.curDate, -3650);
                _this.limitDate2 = getDateBydays(_this.curDate, 3650); //默认前后限制日期 10年
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
            _this.render = function(year_, month_, day_) {
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
            };

            function traversalBox(date_, classNames) {
                // console.log(`date_ ：${ date_ }`);
                // console.log(`classNames ：${ classNames }`);
                var year_ = _this.year;
                var month_ = _this.month;
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
                    if (hasClass(_this.dayBox[0].children[i], "d-day-item-white")) {
                        continue;
                    }
                    if (hasClass(_this.dayBox[0].children[i], "disabled")) {
                        continue;
                    }

                    if (_this.dayBox[0].children[i].childNodes.length > 1) {
                        dateRenderNow1 = year_ + "-" + month_ + "-" + _this.dayBox[0].children[i].childNodes[0].nodeValue;
                    } else {
                        dateRenderNow1 = year_ + "-" + month_ + "-" + _this.dayBox[0].children[i].innerText;
                    }
                    if (compareDate(date_, dateRenderNow1) === 0) {
                        addClass(_this.dayBox[0].children[i], classNames);
                    }
                }
                for (var j = 0; j < k1; j++) {
                    if (hasClass(_this.dayBox[1].children[j], "d-day-item-white")) {
                        continue;
                    }
                    if (hasClass(_this.dayBox[1].children[j], "disabled")) {
                        continue;
                    }
                    if (_this.dayBox[1].children[j].childNodes.length > 1) {
                        dateRenderNow2 = year_2 + "-" + month_2 + "-" + _this.dayBox[1].children[j].childNodes[0].nodeValue;
                    } else {
                        dateRenderNow2 = year_2 + "-" + month_2 + "-" + _this.dayBox[1].children[j].innerText;
                    }
                    if (compareDate(date_, dateRenderNow2) === 0) {
                        addClass(_this.dayBox[1].children[j], classNames);
                    }
                }
                return false;
            }

            function traversalDateDom(findDate) {
                // console.log(`寻找  ：${ findDate }`);
                var year_ = _this.year;
                var month_ = _this.month;
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
                    if (hasClass(_this.dayBox[0].children[i], "d-day-item-white")) {
                        continue;
                    }
                    if (hasClass(_this.dayBox[0].children[i], "disabled")) {
                        continue;
                    }

                    if (_this.dayBox[0].children[i].childNodes.length > 1) {
                        dateRenderNow1 = year_ + "-" + month_ + "-" + _this.dayBox[0].children[i].childNodes[0];
                    } else {
                        dateRenderNow1 = year_ + "-" + month_ + "-" + _this.dayBox[0].children[i].innerText;
                    }

                    if (compareDate(findDate, dateRenderNow1) === 0) {
                        // console.log(`找到 ：${ dateRenderNow1 }`);
                        return _this.dayBox[0].children[i];
                    }
                }
                for (var j = 0; j < k1; j++) {
                    if (hasClass(_this.dayBox[1].children[j], "d-day-item-white")) {
                        continue;
                    }
                    if (hasClass(_this.dayBox[1].children[j], "disabled")) {
                        continue;
                    }
                    if (_this.dayBox[1].children[j].childNodes.length > 1) {
                        dateRenderNow2 = year_2 + "-" + month_2 + "-" + _this.dayBox[1].children[j].childNodes[0].nodeValue;
                    } else {
                        dateRenderNow2 = year_2 + "-" + month_2 + "-" + _this.dayBox[1].children[j].innerText;
                    }
                    if (compareDate(findDate, dateRenderNow2) === 0) {
                        return _this.dayBox[1].children[j];
                    }
                }
                // console.log(`两边日历都没找到该日期`);
                return false;
            }

            function renderSpecialDays(arr) {
                if (arr.length === 0) {
                    return false;
                }
                for (var i = 0; i < arr.length; i++) {
                    var specialDay = traversalDateDom(arr[i].date);
                    if (specialDay) {
                        var element = document.createElement("div");
                        element.className = "special-day";
                        element.innerText = arr[i].text;
                        specialDay.appendChild(element);
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
                var year_ = _this.year;
                var month_ = _this.month;
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
                    if (hasClass(_this.dayBox[0].children[i], "d-day-item-white")) {
                        continue;
                    }
                    if (hasClass(_this.dayBox[0].children[i], "disabled")) {
                        continue;
                    }
                    if (_this.dayBox[0].children[i].childNodes.length > 1) {
                        dateRenderNow1 = year_ + "-" + month_ + "-" + _this.dayBox[0].children[i].childNodes[0].nodeValue;
                    } else {
                        dateRenderNow1 = year_ + "-" + month_ + "-" + _this.dayBox[0].children[i].innerText;
                    }
                    if (compareDate(d1, dateRenderNow1) < 0 || compareDate(d2, dateRenderNow1) > 0) {
                        continue;
                    } else {
                        addClass(_this.dayBox[0].children[i], classNames);
                    }
                }
                for (var y = 0; y < k1; y++) {
                    if (hasClass(_this.dayBox[1].children[y], "d-day-item-white")) {
                        continue;
                    }
                    if (hasClass(_this.dayBox[1].children[y], "disabled")) {
                        continue;
                    }

                    if (_this.dayBox[1].children[y].childNodes.length > 1) {
                        dateRenderNow2 = year_2 + "-" + month_2 + "-" + _this.dayBox[1].children[y].childNodes[0].nodeValue;
                    } else {
                        dateRenderNow2 = year_2 + "-" + month_2 + "-" + _this.dayBox[1].children[y].innerText;
                    }

                    if (compareDate(d1, dateRenderNow2) < 0 || compareDate(d2, dateRenderNow2) > 0) {
                        continue;
                    } else {
                        addClass(_this.dayBox[1].children[y], classNames);
                    }
                }
                return false;
            }

            addEvent(_this.btn_prev[0], "click", function() {
                if (_this.month <= 1) {
                    _this.month = 12;
                    _this.year -= 1;
                } else {
                    _this.month -= 1;
                }
                _this.render(_this.year, _this.month);
            });

            addEvent(_this.btn_next[0], "click", function() {
                //  12 进 1
                if (_this.month >= 12) {
                    _this.month = 1;
                    _this.year += 1;
                } else {
                    _this.month += 1;
                }
                _this.render(_this.year, _this.month);
            });
            addEvent(_this.btn_next[1], "click", function() {
                //  12 进 1
                if (_this.month >= 12) {
                    _this.month = 1;
                    _this.year += 1;
                } else {
                    _this.month += 1;
                }
                _this.render(_this.year, _this.month);
            });

            function getClickDate(element) {
                var month_ = _this.month;
                var year_ = _this.year;
                var month_2 = 0;
                var year_2 = 0;
                var clickDate_ = "";
                if (month_ >= 12) {
                    month_2 = 1;
                    year_2 = year_ + 1;
                } else {
                    month_2 = month_ + 1;
                    year_2 = year_;
                }
                if (hasClass(element.parentNode, "d-c-day01")) {
                    if (element.childNodes.length > 1) {
                        clickDate_ = year_ + "-" + month_ + "-" + element.childNodes[0].nodeValue;
                    } else {
                        clickDate_ = year_ + "-" + month_ + "-" + element.innerText;
                    }
                } else if (hasClass(element.parentNode, "d-c-day02")) {
                    if (element.childNodes.length > 1) {
                        clickDate_ = year_2 + "-" + month_2 + "-" + element.childNodes[0].nodeValue;
                    } else {
                        clickDate_ = year_2 + "-" + month_2 + "-" + element.innerText;
                    }
                }
                return clickDate_;
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

            function fillInDate(dateArr, idArr) {
                if (dateArr.length !== 2) {
                    return false;
                }
                var d1 = dateArr[0];
                var d2 = dateArr[1];
                if (compareDate(d1, d2) < 0) {
                    var mid = d1;
                    d1 = d2;
                    d2 = mid;
                }
                // 添加数据
                if (setting.id.length > 1) {
                    idArr[0].setAttribute("data-date1", d1);
                    idArr[1].setAttribute("data-date2", d2);
                } else {
                    idArr[0].setAttribute("data-date1", d1);
                    idArr[0].setAttribute("data-date2", d2);
                }
                // 转换成 yyyy-0m-0d 格式
                d1 = dateForm1(d1);
                d2 = dateForm1(d2);

                if (idArr[0].tagName == "INPUT") {
                    if (setting.id.length > 1) {
                        idArr[0].value = d1;
                        idArr[1].value = d2;
                    } else {
                        idArr[0].value = d1 + " " + _this.hyphen + " " + d2;
                    }
                } else {
                    if (setting.id.length > 1) {
                        idArr[0].innerHTML = d1;
                        idArr[1].innerHTML = d2;
                    } else {
                        idArr[0].innerHTML = d1 + " " + _this.hyphen + " " + d2;
                    }
                }

                // return false;
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

            function showPop(e) {
                stopPropagation(e);

                // console.log(`_this.clickDate456.length ：${ _this.clickDate.length }`);
                if (_this.datePicker.length === 2) {
                    // _this.clickDate[0] = _this.datePicker[0].value;
                    // _this.clickDate[1] = _this.datePicker[1].value;
                } else {
                    // _this.clickDate[0] = _this.datePicker[0].value;
                }
                // console.log(`_this.clickDate456.length ：${ _this.clickDate.length }`);
                // console.log(`_this.year：${ _this.year }`);
                // console.log(`_this.month：${ _this.month }`);
                // console.log(`_this.day：${ _this.day }`);
                _this.render(_this.year, _this.month, _this.day);

                if (_this.browser_ie8) {
                    // var oldStyle=_this.calendarPop.cssText;
                    // _this.calendarPop.cssText="display:block;"+oldStyle;
                } else {
                    // _this.calendarPop.style.display = "block";
                }
                _this.calendarPop.style.display = "block";
                _this.calendarPop.focus();

                // 用户未设置position，自适应
                adjustPosition();
            }

            function adjustPosition() {
                var screenWidth = document.documentElement.clientWidth;

                if (typeof setting.position == "undefined") {
                    //默认top 36px  left 0
                    _this.calendarPop.style.left = 0;
                    _this.calendarPop.style.right = "auto";
                    var x_right = _this.calendarPop.getBoundingClientRect().right;
                    var x_left = _this.calendarPop.getBoundingClientRect().left;
                    var rightOut = x_right - screenWidth > 0 ? true : false;
                    if (rightOut) {
                        _this.calendarPop.style.left = screenWidth - x_right - 10 + "px";
                        _this.calendarPop.style.right = "auto";
                    }
                }
                // 设置top
                if (typeof setting.position != "undefined") {
                    _this.calendarPop.style.top = setting.position.top;
                }

                if (screenWidth < 752) {
                    _this.btn_next[0].style.display = "block";
                    _this.btn_next[1].style.display = "none";
                } else {
                    _this.btn_next[0].style.display = "none";
                    _this.btn_next[1].style.display = "block";
                }
            }

            function hidePop(e) {
                stopPropagation(e);
                _this.calendarPop.style.display = "none";
            }

            // 绑定焦点事件
            // if (_this.datePicker.length === 2) {
            //     _this.datePicker[0].addEventListener("focus", showPop);
            //     _this.datePicker[1].addEventListener("focus", showPop);
            //     _this.datePicker[0].addEventListener("blur", function () {
            //         // console.log("输入框1失焦")
            //     });
            //     _this.datePicker[1].addEventListener("blur", function () {
            //         // console.log("输入框2失焦")
            //     });
            // } else {
            //     _this.datePicker[0].addEventListener("focus", showPop);
            // }
            // _this.calendarPop.addEventListener("blur", hidePop);
            // _this.calendarPop.addEventListener("mousedown", function (e) {
            //     e.preventDefault();
            //     _this.calendarPop.focus();
            // });

            // 绑定焦点事件

            if (_this.datePicker.length === 2) {
                addEvent(_this.datePicker[0], "focus", showPop);
                addEvent(_this.datePicker[1], "focus", showPop);
            } else {
                addEvent(_this.datePicker[0], "focus", showPop);
            }

            if (!_this.browser_ie8) {
                addEvent(_this.calendarPop, "blur", hidePop);
            }

            addEvent(_this.calendarPop, "mousedown", function(e) {
                stopPropagation(e);
                if (_this.browser_ie8) {
                    // var e = window.event;
                    // e.returnValue = false;
                } else {
                    e.preventDefault();
                }

                _this.calendarPop.focus();
            });

            // 给日期绑定点击事件
            function selectDate(e) {
                stopPropagation(e);
                var e_day_box = e.target || e.srcElement;
                // var e_day_box = e.target;
                // var selectedNumberArr = _this.clickDate;
                // var selectedNumber = selectedNumberArr.length; //读取已选selected数量
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
                    if (compareDate(dateClick, _this.clickDate[0]) === 0) {
                    } else {
                        _this.clickDate.push(dateClick);
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
                    _this.calendarPop.style.display = "none";
                }
                return false;
            }

            // _this.dayBox[0].addEventListener("click", selectDate);
            // _this.dayBox[1].addEventListener("click", selectDate);

            addEvent(_this.dayBox[0], "click", selectDate);
            addEvent(_this.dayBox[1], "click", selectDate);

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
            // 绑定hover事件
            // _this.dayBox[0].addEventListener("mouseover", hoverDate);
            // _this.dayBox[1].addEventListener("mouseover", hoverDate);

            addEvent(_this.dayBox[0], "mouseover", hoverDate);
            addEvent(_this.dayBox[1], "mouseover", hoverDate);
            // 初始化
            _this.render(_this.year, _this.month, _this.day);
        },
        // feedBackDate:this.calendar2.clickDate,
        calendar1: function(setting) {
            var _this = this;
            _this.browser_ie8 = false;
            // 兼容IE8  start
            var browser_cur = navigator.appName;
            var b_version = navigator.appVersion;
            var version = b_version.split(";");
            var trim_Version = version[1].replace(/[ ]/g, "");
            if (browser_cur == "Microsoft Internet Explorer" && trim_Version == "MSIE8.0") {
                _this.browser_ie8 = true;
                // console.log("现在是ie8");
            }
            //创建dom
            _this.createDom(setting.id[0], _this.browser_ie8, 1);

            var addEvent = function(el, type, handler) {
                if (_this.browser_ie8) {
                    return el.attachEvent("on" + type, handler);
                } else {
                    return el.addEventListener(type, handler, false);
                }
            };
            // 兼容IE8  end

            _this.calendarItem = [];
            _this.datePicker = [];
            _this.e_date_bar = [];
            _this.btn_prev = [];
            _this.btn_next = [];
            _this.dayBox = [];
            _this.weekDayNameBar = [];
            _this.selectedDate = []; //已选日期
            _this.clickDate = []; //点击的年月
            _this.specialDays = []; //特殊日

            _this.hyphen = typeof setting.hyphen != "undefined" ? setting.hyphen : "至";
            // 定义输入框和对应的 d-calendar-box
            if (setting.id.length > 1) {
                _this.datePicker[0] = document.getElementById(setting.id[0]); //第一个输入框
                _this.datePicker[1] = document.getElementById(setting.id[1]); //第二个输入框
                _this.datePicker[0].setAttribute("tabindex", 0);
                _this.datePicker[1].setAttribute("tabindex", 0);
            } else {
                _this.datePicker[0] = document.getElementById(setting.id[0]); //第一个输入框
                _this.datePicker[0].setAttribute("tabindex", 0);
            }
            _this.calendarBox = _this.datePicker[0].parentNode;
            _this.calendarBox.style.position = "relative";
            _this.calendarBox.style.display = "inline-block";

            if (_this.browser_ie8) {
                _this.calendarPop = _this.datePicker[0].parentNode.lastChild;
            } else {
                _this.calendarPop = _this.datePicker[0].parentNode.lastElementChild;
            }
            // _this.calendarPop.setAttribute("tabindex", 2);
            // _this.calendarPop.tabindex = 0;

            if (_this.browser_ie8) {
                _this.calendarItem[0] = _this.datePicker[0].parentNode.lastChild.lastChild.previousSibling; //第1个 d-calendar-box
                _this.calendarItem[1] = _this.datePicker[0].parentNode.lastChild.lastChild; //第2个 d-calendar-box
            } else {
                _this.calendarItem[0] = _this.datePicker[0].parentNode.lastElementChild.children[1]; //第1个 d-calendar-box
                _this.calendarItem[1] = _this.datePicker[0].parentNode.lastElementChild.children[2]; //第2个 d-calendar-box
            }

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
            // 删除第一个右箭头
            _this.btn_next[0].parentNode.removeChild(_this.btn_next[0]);

            _this.btn_prev[1] = _this.calendarItem[1].children[0].children[0];
            _this.btn_next[1] = _this.calendarItem[1].children[0].children[1];
            // 删除第二个左箭头
            _this.btn_prev[1].parentNode.removeChild(_this.btn_prev[1]);
            // 定义天数box
            _this.dayBox[0] = _this.calendarItem[0].children[2];
            _this.dayBox[1] = _this.calendarItem[1].children[2];

            // 定义日历标题
            if (_this.browser_ie8) {
                _this.e_title = _this.datePicker[0].parentNode.lastChild.children[0];
                // console.log(_this.e_title.className);
            } else {
                _this.e_title = _this.datePicker[0].parentNode.lastElementChild.children[0];
            }

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
            _this.unitYear = typeof setting.unitYear != "undefined" ? setting.unitYear : "";
            _this.title = typeof setting.title != "undefined" ? setting.title : undefined;

            function addClass(obj, class_name) {
                var obj_class = obj.className; //获取 class 内容.
                var blank = obj_class != "" ? " " : ""; //判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
                var added = obj_class + blank + class_name; //组合原来的 class 和需要添加的 class.
                obj.setAttribute("class", added);

                // obj.className = added; //替换原来的 class.
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
            // var cccc = getDateBydays('2018-9-27', 365);
            // console.log(`cccc ：${ cccc }`);

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
            // 定义有效操作日期区间
            if (typeof setting.today != "undefined") {
                var dateArr = setting.today.split("-");
                _this.curYear = parseInt(dateArr[0]);
                _this.curMonth = parseInt(dateArr[1]);
                _this.curDay = parseInt(dateArr[2]);
                _this.curDate = setting.today;
                // console.log(`给定了当日日期:${_this.curDate}`);
            }

            if (typeof setting.limitDate != "undefined") {
                _this.limitDate1 = typeof setting.limitDate1 != "undefined" ? setting.limitDate1 : _this.curDate;
                _this.limitDate2 = typeof setting.limitDate2 != "undefined" ? setting.limitDate2 : getDateBydays(_this.curDate, 365);
            } else {
                _this.limitDate1 = getDateBydays(_this.curDate, -3650);
                _this.limitDate2 = getDateBydays(_this.curDate, 3650); //默认前后限制日期 10年
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
            _this.render = function(year_, month_, day_) {
                var month_2 = 0;
                var year_2 = 0;
                if (month_ >= 12) {
                    month_2 = 1;
                    year_2 = year_ + 1;
                } else {
                    month_2 = month_ + 1;
                    year_2 = year_;
                }
                _this.e_title.innerText = _this.title; //设置日历标题
                if (typeof setting.title == "undefined") {
                    _this.e_title.style.diplay = "none";
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
            };

            function traversalBox(date_, classNames) {
                // console.log(`date_ ：${ date_ }`);
                // console.log(`classNames ：${ classNames }`);
                var year_ = _this.year;
                var month_ = _this.month;
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
                    if (hasClass(_this.dayBox[0].children[i], "d-day-item-white")) {
                        continue;
                    }
                    if (hasClass(_this.dayBox[0].children[i], "disabled")) {
                        continue;
                    }

                    if (_this.dayBox[0].children[i].childNodes.length > 1) {
                        dateRenderNow1 = year_ + "-" + month_ + "-" + _this.dayBox[0].children[i].childNodes[0].nodeValue;
                    } else {
                        dateRenderNow1 = year_ + "-" + month_ + "-" + _this.dayBox[0].children[i].innerText;
                    }
                    if (compareDate(date_, dateRenderNow1) === 0) {
                        addClass(_this.dayBox[0].children[i], classNames);
                    }
                }
                for (var j = 0; j < k1; j++) {
                    if (hasClass(_this.dayBox[1].children[j], "d-day-item-white")) {
                        continue;
                    }
                    if (hasClass(_this.dayBox[1].children[j], "disabled")) {
                        continue;
                    }
                    if (_this.dayBox[1].children[j].childNodes.length > 1) {
                        dateRenderNow2 = year_2 + "-" + month_2 + "-" + _this.dayBox[1].children[j].childNodes[0].nodeValue;
                    } else {
                        dateRenderNow2 = year_2 + "-" + month_2 + "-" + _this.dayBox[1].children[j].innerText;
                    }
                    if (compareDate(date_, dateRenderNow2) === 0) {
                        addClass(_this.dayBox[1].children[j], classNames);
                    }
                }
                return false;
            }

            function traversalDateDom(findDate) {
                // console.log(`寻找  ：${ findDate }`);
                var year_ = _this.year;
                var month_ = _this.month;
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
                    if (hasClass(_this.dayBox[0].children[i], "d-day-item-white")) {
                        continue;
                    }
                    if (hasClass(_this.dayBox[0].children[i], "disabled")) {
                        continue;
                    }

                    if (_this.dayBox[0].children[i].childNodes.length > 1) {
                        dateRenderNow1 = year_ + "-" + month_ + "-" + _this.dayBox[0].children[i].childNodes[0];
                    } else {
                        dateRenderNow1 = year_ + "-" + month_ + "-" + _this.dayBox[0].children[i].innerText;
                    }

                    if (compareDate(findDate, dateRenderNow1) === 0) {
                        // console.log(`找到 ：${ dateRenderNow1 }`);
                        return _this.dayBox[0].children[i];
                    }
                }
                for (var j = 0; j < k1; j++) {
                    if (hasClass(_this.dayBox[1].children[j], "d-day-item-white")) {
                        continue;
                    }
                    if (hasClass(_this.dayBox[1].children[j], "disabled")) {
                        continue;
                    }
                    if (_this.dayBox[1].children[j].childNodes.length > 1) {
                        dateRenderNow2 = year_2 + "-" + month_2 + "-" + _this.dayBox[1].children[j].childNodes[0].nodeValue;
                    } else {
                        dateRenderNow2 = year_2 + "-" + month_2 + "-" + _this.dayBox[1].children[j].innerText;
                    }
                    if (compareDate(findDate, dateRenderNow2) === 0) {
                        return _this.dayBox[1].children[j];
                    }
                }
                // console.log(`两边日历都没找到该日期`);
                return false;
            }

            function renderSpecialDays(arr) {
                if (arr.length === 0) {
                    return false;
                }
                for (var i = 0; i < arr.length; i++) {
                    var specialDay = traversalDateDom(arr[i].date);
                    if (specialDay) {
                        var element = document.createElement("div");
                        element.className = "special-day";
                        element.innerText = arr[i].text;
                        specialDay.appendChild(element);
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
                var year_ = _this.year;
                var month_ = _this.month;
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
                    if (hasClass(_this.dayBox[0].children[i], "d-day-item-white")) {
                        continue;
                    }
                    if (hasClass(_this.dayBox[0].children[i], "disabled")) {
                        continue;
                    }
                    if (_this.dayBox[0].children[i].childNodes.length > 1) {
                        dateRenderNow1 = year_ + "-" + month_ + "-" + _this.dayBox[0].children[i].childNodes[0].nodeValue;
                    } else {
                        dateRenderNow1 = year_ + "-" + month_ + "-" + _this.dayBox[0].children[i].innerText;
                    }
                    if (compareDate(d1, dateRenderNow1) < 0 || compareDate(d2, dateRenderNow1) > 0) {
                        continue;
                    } else {
                        addClass(_this.dayBox[0].children[i], classNames);
                    }
                }
                for (var y = 0; y < k1; y++) {
                    if (hasClass(_this.dayBox[1].children[y], "d-day-item-white")) {
                        continue;
                    }
                    if (hasClass(_this.dayBox[1].children[y], "disabled")) {
                        continue;
                    }

                    if (_this.dayBox[1].children[y].childNodes.length > 1) {
                        dateRenderNow2 = year_2 + "-" + month_2 + "-" + _this.dayBox[1].children[y].childNodes[0].nodeValue;
                    } else {
                        dateRenderNow2 = year_2 + "-" + month_2 + "-" + _this.dayBox[1].children[y].innerText;
                    }

                    if (compareDate(d1, dateRenderNow2) < 0 || compareDate(d2, dateRenderNow2) > 0) {
                        continue;
                    } else {
                        addClass(_this.dayBox[1].children[y], classNames);
                    }
                }
                return false;
            }

            addEvent(_this.btn_prev[0], "click", function() {
                if (_this.month <= 1) {
                    _this.month = 12;
                    _this.year -= 1;
                } else {
                    _this.month -= 1;
                }
                _this.render(_this.year, _this.month);
            });
            addEvent(_this.btn_next[1], "click", function() {
                //  12 进 1
                if (_this.month >= 12) {
                    _this.month = 1;
                    _this.year += 1;
                } else {
                    _this.month += 1;
                }
                _this.render(_this.year, _this.month);
            });

            function getClickDate(element) {
                var month_ = _this.month;
                var year_ = _this.year;
                var month_2 = 0;
                var year_2 = 0;
                var clickDate_ = "";
                if (month_ >= 12) {
                    month_2 = 1;
                    year_2 = year_ + 1;
                } else {
                    month_2 = month_ + 1;
                    year_2 = year_;
                }
                if (hasClass(element.parentNode, "d-c-day01")) {
                    if (element.childNodes.length > 1) {
                        clickDate_ = year_ + "-" + month_ + "-" + element.childNodes[0].nodeValue;
                    } else {
                        clickDate_ = year_ + "-" + month_ + "-" + element.innerText;
                    }
                } else if (hasClass(element.parentNode, "d-c-day02")) {
                    if (element.childNodes.length > 1) {
                        clickDate_ = year_2 + "-" + month_2 + "-" + element.childNodes[0].nodeValue;
                    } else {
                        clickDate_ = year_2 + "-" + month_2 + "-" + element.innerText;
                    }
                }
                return clickDate_;
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

            function dateForm1(dateStr) {
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
                // var d2 = dateArr[1];
                // if (compareDate(d1, d2) < 0) {
                //     var mid = d1;
                //     d1 = d2;
                //     d2 = mid;
                // };
                // 转换成 yyyy-0m-0d 格式
                idArr[0].setAttribute("data-date", d1);
                d1 = dateForm1(d1);
                if (idArr[0].tagName == "INPUT") {
                    idArr[0].value = d1;
                } else {
                    idArr[0].innerHTML = d1;
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

            function showPop(e) {
                stopPropagation(e);

                // console.log(`_this.clickDate456.length ：${ _this.clickDate.length }`);
                if (_this.datePicker.length === 2) {
                    // _this.clickDate[0] = _this.datePicker[0].value;
                    // _this.clickDate[1] = _this.datePicker[1].value;
                } else {
                    // _this.clickDate[0] = _this.datePicker[0].value;
                }
                _this.render(_this.year, _this.month, _this.day);
                _this.calendarPop.style.display = "block";
                _this.calendarPop.focus();
            }

            function hidePop(e) {
                stopPropagation(e);
                _this.calendarPop.style.display = "none";
            }

            // 绑定焦点事件
            if (_this.datePicker.length === 2) {
                addEvent(_this.datePicker[0], "focus", showPop);
                addEvent(_this.datePicker[1], "focus", showPop);
            } else {
                addEvent(_this.datePicker[0], "focus", showPop);
            }

            if (!_this.browser_ie8) {
                addEvent(_this.calendarPop, "blur", hidePop);
            }

            addEvent(_this.calendarPop, "mousedown", function(e) {
                stopPropagation(e);
                if (_this.browser_ie8) {
                    // var e = window.event;
                    // e.returnValue = false;
                } else {
                    e.preventDefault();
                }
                _this.calendarPop.focus();
            });

            // 给日期绑定点击事件
            function selectDate(e) {
                stopPropagation(e);
                var e_day_box = e.target || e.srcElement;
                // var e_day_box = e.target;
                // var selectedNumberArr = _this.clickDate;
                // var selectedNumber = selectedNumberArr.length; //读取已选selected数量
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
                    _this.clickDate.push(dateClick);
                }
                selectClean("d-applicable");
                if (_this.clickDate.length === 1) {
                    renderSelectedClass(_this.clickDate, "d-applicable");
                    fillInDate(_this.clickDate, _this.datePicker);
                    _this.calendarPop.style.display = "none";
                }
                return false;
            }

            addEvent(_this.dayBox[0], "click", selectDate);
            addEvent(_this.dayBox[1], "click", selectDate);
            // 初始化
            _this.render(_this.year, _this.month, _this.day);
        }
    };
    ctrip.fn.init.prototype = ctrip.fn;
    return ctrip;
})();