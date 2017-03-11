/**
 * Created by aweb on 2017/2/17 0017.
 */
$(function () {

    (function () {
        $.pageData = function () {
            var o = {};
            var urlString = window.location.search.slice(1);
            var urlArray = urlString.split("&");
            for (var i = 0; i < urlArray.length; i++) {
                var urlItem = urlArray[i];
                var item = urlItem.split("=");
                o[item[0]] = item[1];
            }
            return o;
        };
    })();


    var category = $.pageData().categoryid - 0;
    int();
    function int() {
        list(category, 1, page);


    }
    function list(category, i, fn) {
        $(".info").empty();     
        $(".animate").removeClass("hide");

        $.ajax({
            url: "http://139.199.157.195:9090/api/getproductlist?categoryid=" + category + "&pageid=" + i,
            success: function (res) {
                var html = template("everyone", res);
                $(".animate").addClass("hide");
                $(".info").append(html);
                fn && fn(res);
            },
        })
    }

    /*获取总页数*/
    $.fixSearchBar();
    function page(res) {
        var pages = res["totalCount"] / res["pagesize"];
        pages = Math.ceil(pages);
        for (var i = 1; i <= pages; i++) {
            var opt = document.createElement("option");
            opt.innerHTML = i + "/" + pages;
            opt.value = i;
            $(".sel").append(opt);
        }
        select();
        preNext();
    }

    function option() {
        select();
        preNext();
    }

    /*选择页码翻页*/
    function select() {
        $(".sel")[0].onchange = function () {
            var pag = $(":selected").val();
            list(category, pag);
        }
    }

    /*点击翻页函数*/
    function preNext() {
        $(".page>div").on("click", function () {
            var numb = $(":selected").val() - 0;
            var max = $("option").length - 0;
            if (!(numb > 0 && numb <= max)) {
                return false;
            }
            if ($(this).hasClass("down")) {
                if (numb === max) {
                    return false;
                }
                $(":selected").next().prop("selected", "selected");
            } else {
                if (numb === 1) {
                    return false;
                }
                $(":selected").prev().prop("selected", "selected");
            }
            numb = $(":selected").val() - 0;
            list(category, numb);
        })
    }
})