function (e) {
    if (e.propertyName != 'value') {
        return false;
    };
    console.log("e.target.value:");
    var snippetCur = $(that).val().toString().toLowerCase();
    var sName = $(that).attr('data-searchname');
    var sNameStr = "[data-searchlistname=" + sName + "]";
    // console.log(sNameStr + " [data-searchitemid]");
    // $(sNameStr + " [data-searchitemid]").not("[data-selected=true]").each(
    $(sNameStr + " [data-searchitemid]").each(
        function (index, element) {
            var arrStr = $(that).attr("data-searchmatch");
            console.log("arrStr:")
            console.log(arrStr)
            var isMatch = false;
            // 确保取值可用
            if (arrStr) {
                var arr = arrStr.toString().toLowerCase().split(','); //转数组
                if (searchByRegExp(snippetCur, arr)) {
                    $(that).css({
                        "display": "block"
                    });
                } else {
                    $(that).hide();
                }
            } else {
                return true;
            }
        }
    );
    // 多选隐藏搜索后的已选项
    if ($(that).attr("data-searchmulti") === "true") {
        $(sNameStr + " [data-selected=true]").hide();
    }
    // $(that).trigger('input');
}
