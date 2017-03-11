(function () {
    //rem
    document.documentElement.style.fontSize = (document.body.scrollWidth) * 5 / 16 + 'px';
    window.onresize = function () {
        if (document.body.scrollWidth >= 640) {
            document.documentElement.style.fontSize = '200px';
        } else if (document.body.scrollWidth <= 320) {
            document.documentElement.style.fontSize = '100px';
        } else {
            document.documentElement.style.fontSize = (document.body.scrollWidth) * 5 / 16 + 'px';
        }
    };
    /*************************js方法引用****************************/
    returnTop();
    // fixSearchBar();




    /*************************js方法定义****************************/
    //得到页面传参
    $.pageData = function () {
        if (window.location.search && window.location.search.slice(1)) {
            var o = {};
            var urlString = window.location.search.slice(1);
            var urlArray = urlString.split("&");
            for (var i = 0; i < urlArray.length; i++) {
                var urlItem = urlArray[i];
                var item = urlItem.split("=");
                o[item[0]] = item[1];
            }
            return o;
        }else{
            return '没有数据';
        }
    };


    //返回顶部 
    function returnTop() {
        $('#return').on('click', function () {
            $(document.body).animate({
                'scrollTop': 0
            });
        });
    }

    
    // 搜索栏固定
    function fixSearchBar() {
        $(window).on('scroll', function () {
            if (document.body.scrollTop > $('header').height()) {
                $('.search').css({
                    'position': 'fixed',
                    'width': '100%',
                    'top': 0,
                    'zIndex': 1
                }).next().css({
                    'marginTop': $('.search')[0].offsetHeight + 10
                });
            } else {
                $('.search').css({
                    'position': '',
                }).next().css({
                    'marginTop': 10
                });
            }
        });
    }
    $.fixSearchBar = fixSearchBar;
    //touch事件
    $.touchGoHistory = function(){
        var startX = 0;
        var distanceX = 0;
        document.body.addEventListener('touchstart',function(e){
            startX = e.touches[0].clientX;
        });
        document.body.addEventListener('touchmove',function(e){
            distanceX =e.touches[0].clientX - startX; 
        });
        document.body.addEventListener('touchend',function(e){
            if(distanceX > 180){
                history.go(-1)
            }else if(distanceX < -180){
                history.go(1);
            }
        });
    };
    $.touchGoHistory();
})();