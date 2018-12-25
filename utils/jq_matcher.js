var searchMatcher = (function (window) {
    var searchMatcher = function (data) {
        return new searchMatcher.fn.init(data);
    };
    searchMatcher.fn = searchMatcher.prototype = {
        constructor: searchMatcher,
        init: function (setting) {
            var _this = this;
            // 匹配逻辑
            // 1 输入片段 去 匹配 字符串 数组，如果满足条件有一个，就返回结果true 显示这个item
            // 2 循环 把每一条都匹配一下
            // 3 只匹配显示的数据，隐藏状态的数据不进入匹配队列

            //正则匹配
            function searchByRegExp(snippet, contextArr) {
                if (!(contextArr instanceof Array)) {
                    console.log("need arr");
                    return false;
                }
                var len = contextArr.length;
                // var arr = [];
                var reg = new RegExp(snippet);
                for (var i = 0; i < len; i++) {
                    //如果字符串中不包含目标字符会返回-1
                    if (contextArr[i].match(reg)) {
                        return true;
                        // arr.push(contextArr[i]);
                    }
                }
                // return arr;
                return false;
            }
            //初始化时 隐藏已选中 选项
            $('[data-searchlistname] [data-selected=true]').hide();
            if (!document.all) {
                // 非IE
                $("body").on('input', "[data-searchname]", function () {
                    // $('.dropdown-toggle').dropdown();
                    var snippetCur = $(this).val().toString().toLowerCase();
                    var sName = $(this).attr('data-searchname');
                    var sNameStr = "[data-searchlistname='" + sName + "']";
                    // console.log(sNameStr + " [data-searchitemid]");
                    $(sNameStr + " [data-searchitemid]").not("[data-selected='true']").each(
                        function (index, element) {
                            var arrStr = $(this).attr("data-searchmatch");
                            var isMatch = false;
                            // 确保取值可用
                            if (arrStr) {
                                var arr = arrStr.toString().toLowerCase().split('@'); //转数组
                                if (searchByRegExp(snippetCur, arr)) {
                                    $(this).css({
                                        "display": "block"
                                    });
                                } else {
                                    $(this).hide();
                                }
                            } else {
                                return true;
                            }
                        }
                    );
                    // console.log($(this).val());
                });
            } else {
                // 是IE
                $("[data-searchname]").each(function () {
                    var that = this;
                    if (this.attachEvent) {
                        this.attachEvent('onpropertychange', function (e) {
                            if (e.propertyName != 'value') {
                                return false;
                            };
                            // console.log($(that).val());
                            // $(that).trigger('input');
                        });
                    }
                });
            }
            // 阻止点击下拉消失
            $("body").on('click', '[data-searchname]', function (e) {
                e.stopPropagation();
                if ($(this).parent().hasClass("dropdown")) {
                    if ($(this).parent().hasClass("open")) {
                        return false;
                    } else {
                        $(this).parent().addClass("open");
                    }
                }
            });
            $("body").on("click", "[data-searchlistname] [data-searchitemid]", function (e) {
                e.stopPropagation();
                e.preventDefault();
                var searchIdNow = $(this).attr('data-searchitemid');
                var name = $(this).parents('[data-searchlistname]').eq(0).attr('data-searchlistname');
                // 找到与 input 同名的 list 容器名字
                var responseContent = $(this).attr('data-searchresponse'); //与input 同名 list 容器
                var targetBox = $("[data-searchtarget='" + name + "'] "); //回填BOX
                // 判断回填的是默认data-searchresponse 还是HTML+data-searchresponse
                var hasHtml = false; //是否配置了回填DOM
                var htmlDom = "";
                if (typeof _this.responseHtml != "undefined") {
                    for (var i = 0; i < _this.responseHtml.length; i++) {
                        if (_this.responseHtml[i].name === name) {
                            htmlDom = _this.responseHtml[i].htmlText;
                            hasHtml = true;
                            break;
                        }
                    }
                }
                $(this).attr("data-selected", "true");
                $(this).hide(); //隐藏被点击元素
                if (hasHtml) {
                    // 如果配置了回填dom 则渲染设置的HTML
                    // var reg = RegExp(/\$text/g);
                    // console.log(`htmlDom.indexOf('$text') === -1 ：${ htmlDom.indexOf('$text') === -1 }`);
                    if (htmlDom.indexOf('$text') === -1) {
                        //配置了回填数据的插槽，则 data-searchresponse 内容进入插槽
                        targetBox.append(htmlDom);
                    } else {
                        //未配置插槽则返回完整已配置htmlDom
                        var newText = htmlDom.replace(/\$text/g, responseContent);
                        targetBox.append(newText);
                    }
                } else {
                    //未调用配置方法，则通过后端模板引擎 给data-searchresponse 赋值
                    targetBox.append(responseContent);
                }
                targetBox.children(":last").attr("data-searchitemid", searchIdNow);

                // 列表无元素时自动隐藏
                var targetBoxItems=$("[data-searchtarget='" + name + "'] [data-searchitemid]").length;
                var siblings=$("[data-searchlistname='"+name+"']"+"[data-searchitemid]").length;
                var needClose=$("[data-searchname='"+name+"']").parent("dropdown").hasClass("open");
                if (targetBoxItems===siblings && needClose) {
                    $("[data-searchname='"+name+"']").parent("dropdown").removeClass("open");
                }
                // console.log(`name_or_key ：${ _this.responseHtml }`);
                // console.log(`回填信息： ${responseContent}`);
            });
            $("body").on("click", "[data-searchtarget] [data-del-selected]", function (e) {
                e.preventDefault();
                var itemId = $(this).parents("[data-searchitemid]").eq(0).attr("data-searchitemid");
                var targetName = $(this).parents("[data-searchtarget]").eq(0).attr("data-searchtarget");
                $(this).parents("[data-searchitemid]").eq(0).remove();
                // console.log(`unselected ：${ unselected }`);
                $("[data-searchlistname='" + targetName + "'] [data-searchitemid='" + itemId + "']").css({
                    "display": "block"
                });
                $("[data-searchlistname='" + targetName + "'] [data-searchitemid='" + itemId + "']").attr("data-selected",
                    "false");

            });
        },
        setResponseHtml: function (targetName, html) {
            var _this = this;
            _this.responseHtml = new Array();
            var htmlObj = new Object();
            htmlObj.name = targetName;
            htmlObj.htmlText = html;
            _this.responseHtml.push(htmlObj);
        }
    };
    searchMatcher.fn.init.prototype = searchMatcher.fn;
    return searchMatcher;
})();
var startSearch = searchMatcher();
startSearch.setResponseHtml("s1",
	'<div class="ib m-additem" data-searchitemid><span> $text </span><a class="m-del" data-del-selected href="javascript:;">×</a></div>'
);