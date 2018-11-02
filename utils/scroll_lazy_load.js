$(function () {
    //数据绑定到组件
    function domRender(dataItem) {
        var dom = "<div class=\"roomlist-li ib vt\">" +
            "	<div class=\"roomlist-item\">" +
            "		<div class=\"roomlist-picbox\">" +
            "			<img src=\"//dimg04.c-ctrip.com/images/200h0m000000dg752ABA3_R_300_225.jpg\" alt=\"...\">" +
            "			<p class=\"roomlist-picnum\">3 pictures</p>" +
            "		</div>" +
            "		<div class=\"roomlist-info\">" +
            "			<h5>Standard Double Room <span class=\"ebk-c-Grayish\">|</span> 标准大床房" +
            "				<span class=\"tag tag-fail\">CHANGE DENIED</span>" +
            "			</h5>" +
            "			<p class=\"mb5\"><i class=\"room-icon room-icon1\"></i>1074685</p>" +
            "			<p class=\"mb5\"><i class=\"room-icon room-icon2\"></i>Double bed</p>" +
            "			<p class=\"mb5\"><i class=\"room-icon room-icon4\"></i>30-40m²</p>" +
            "			<p class=\"mb5\"><i class=\"room-icon room-icon5\"></i>1-3 floor</p>" +
            "		</div>" +
            "		<div class=\"roomlist-edit\">" +
            "			<a type=\"button\" class=\"btn btn-shadow btn-xs txt14\" href=\"information_roomInfo.php?r=release\">View Details</a>" +
            "		</div>" +
            "	</div>" +
            "</div>";
        return dom;
    }
    // 判断是否达到加载条件
    // id:容器 子元素类名 ，提前加载的系数 x*可视区域高度 默认1.4
    function needReload(id, ChildClass, coefficient) {
        var coefficient_Y = typeof coefficient != "undefined" ? coefficient : 1.4;

        function isIE8() {
            var browser_cur = navigator.appName;
            var b_version = navigator.appVersion;
            var version = b_version.split(";");
            var trim_Version = version[1].replace(/[ ]/g, "");
            if (browser_cur == "Microsoft Internet Explorer" && trim_Version == "MSIE8.0") {
                return true;
            } else {
                return false;
            }
        }
        var element = {};
        if (isIE8()) {
            element = document.getElementById(id).lastChild;
        } else {
            element = document.getElementById(id).lastElementChild;
        }
        var outerHeight = $('#' + id + ' .' + ChildClass).last().outerHeight(true);
        var screenY = element.getBoundingClientRect().bottom - coefficient_Y * parseInt($(window).height()) - outerHeight;
        if (screenY < 0) {
            return true;
        } else {
            return false;
        }
    }
    var successRender = true;
    var requestTime = 0; //懒加载请求次数，累加
    $(window).scroll(function () {
        var parentId = "scrollList01"; //设置懒加载元素的父元素id
        var ChildClassName = "roomlist-li"; //设置懒加载元素的父元素id
        //添加loading
        function addLoading() {
            var loading =
                "<div class=\"add-loading-plugin mv20 p20 txt18 txtc\"><div class=\"ebk-loading-18\"><img class=\"pic\" src=\"//pic.c-ctrip.com/htlpic/ebk_fast/ico_loading_32.gif\" alt=\"\"></div></div>";
            $('#' + parentId).append(loading);
        }
        //删除loading
        function removeLoading() {
            $('#' + parentId + " .add-loading-plugin").remove();
        }
        // 发送请求前的回调
        function handleBeforeSend() {
            addLoading();
            successRender = false;
        }

        // 此处responseText.roomList 仅仅表示请求到的数组长度，开发自定义变量名
        function handleResponse(responseText) {
            removeLoading(); //移除loading  后面开始循环输出请求到的listItem
            for (var i = 0; i < responseText.roomList.length; i++) {
                var dom = domRender(responseText.roomList[i]); //给渲染函数传单项数据
                $('#' + parentId).append(dom); //添加到容器末尾，渲染完成
            }
            //处理完成
            successRender = true; //表示渲染成功，后续的滚动可以继续开始ajax 请求了
            requestTime += 1; //计数发送了多少次ajax 请求
            // console.log(`requestTime ：${ requestTime }`);
        }

        // 1.先判断是否需要加载更多数据
        var isNeed = needReload(parentId, ChildClassName);

        // 2.确定需要则发起请求,并且保证一次请求成功后渲染完毕之前不再连续发送请求
        // 此处开发可添加限定条件比如获得服务端的全部数据后，服务端提供字段，
        // 根据此字段，卸载此监听函数$(window).scroll，避免性能损耗
        if (isNeed && successRender) {
            // 此处模拟请求，具体请求get post，开发填写
            // $.ajax({
            // 	type: "get",
            // 	url: "http://10.32.150.128:3006/tests.json",
            // 	dataType: "json",
            // 	beforeSend: handleBeforeSend,
            // 	data: {
            // 		id: "123456"
            // 	},
            // 	success: handleResponse,
            // 	error: function () {
            // 		removeLoading();
            // 		console.log("列表懒加载请求数据失败");
            // 	}
            // });
            // 实际使用时,删除如下部分，使用ajax中的回调函数
            // 实际使用时 删除  Start
            handleBeforeSend();
            var reponseText = {
                roomList: [{
                        item: 1
                    },
                    {
                        item: 2
                    },
                    {
                        item: 3
                    },
                    {
                        item: 4
                    },
                ]
            }
            handleResponse(reponseText);
            // 实际使用时 删除  end

        }

    });
});
