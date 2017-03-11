$(function () {
    init();
    var turnData = {};
    var length;

    //初始化
    function init() {
        gnzkMenu();
        onScroll();

    }

    function gnzkMenu() {
        $.ajax({
            url: "http://139.199.157.195:9090/api/getinlanddiscount",
            beforeSend: function () {
                $(".animations").show();
            },
            success: function (res) {
                turnData.result = res.result;
                turnData.result = turnData.result.concat(turnData.result);
                execute();
            },
            complete: function () {
                $(".animations").hide();
            }
        });
    }

    //封装获取参数成功后要执行的代码,并且此代码可以被下拉时候,的onScroll调用
    function execute() {
        if(!turnData.result){
            return;
        }
        var data = {
            result: []
        };
        length = 8;
        if (turnData.result.length <= 8) {
            length = turnData.result.length;
        }
        for (var i = 0; i < length; i++) {
            data.result.push(turnData.result.shift());
        }
        var html = template("zfMenuTpl", data);
        $("#menu>.container>.row").append(html);
    }

    function onScroll() {
        $(window).on("scroll", function () {
            if (length == 0) {
                return;
            }
            var offsetTop = $("#menu>.container>.row").offset().top;
            var height = $("#menu>.container>.row").height();
            var scrollTop = $(this).scrollTop();
            var winHeight = $(this).height();

            //计算滚动条的位置
            var offset = offsetTop + height - scrollTop - winHeight;
            if (offset <= offset / 3) {
                execute();
            }
        });
    }
});