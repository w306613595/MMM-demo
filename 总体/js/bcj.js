$(function () {


    $('.wbb-search').on('click', function () {
        $(this).toggleClass('click');
        $('.wbb-from').toggleClass('hidden');

    });
    $(".back-top>a>img").on('click', function () {
        setTime = setInterval(function () {
            var oTop = document.body.scrollTop || document.documentElement.scrollTop;
            var step = oTop / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            var leader = oTop - step;
            if (oTop > 0) {
                document.body.scrollTop = document.documentElement.scrollTop = leader;

            } else {
                clearInterval(setTime);
            }
        }, 15);
    });
    $.ajax({
        url: 'http://139.199.157.195:9090/api/getbaicaijiatitle',
        tXpe: 'get',
        data: {},
        success: function (result) {
            var html = template('nav', result);
            $('.wbb-nav-list').append(html);
            var pa = 0;
            var aa = 0;
            $('.wbb-nav-list>li').each(function (i, v) {
                var a = $(this).attr('titleid');
                leftSwipe();
                $(v).on('click', function () {
                    zhuti($(this).attr('titleid'));
                    pa = $(this).attr('titleid');
                    aa = 0;
                })

            })
            zhuti(0);
            var flag = true;
            $(window).on('scroll', function () {
                var offectTop = $(".bcj-list").offset().top;
                var boxheight = $(".bcj-list").height();
                var scrollTop = $(this).scrollTop();
                var winheight = $(this).height();
                var offset = offectTop + boxheight - scrollTop - winheight;
                if (scrollTop > winheight) {
                    $(".back-top").css('display', "inline-block");
                } else {
                    $(".back-top").css('display', "none");
                }

                if (offset < 100 && flag == true && aa < 3) {
                    flag = false;
                    $.ajax({
                        url: 'http://139.199.157.195:9090/api/getbaicaijiaproduct?titleid=' + pa,
                        type: 'get',
                        data: {},
                        success: function (da) {
                            var html = template('good', da);
                            $('.bcj-footlist>ul').append(html);
                            $('#loading').addClass('hide');

                        },
                        complete: function () {
                            flag = true;
                            aa++;
                            if (aa > 0 && aa <= 2) {
                                $(".down-loading>span").addClass('show');
                                $(".down-loading>p").removeClass('show');
                            } else {
                                $(".down-loading>span").removeClass('show');
                                $(".down-loading>p").addClass('show');
                                var timeouter = setTimeout(function () {
                                    $(".down-loading>p").removeClass('show');
                                }, 4000);
                            }
                        },
                    })
                }
            })

        }
    });
    returnTop1();
    function returnTop1() {
        $('.back-top').on('click', function () {
            $(document.body).animate({
                'scrollTop': 0
            });
        });
    }
    function zhuti(page) {
        $.ajax({
            url: 'http://139.199.157.195:9090/api/getbaicaijiaproduct?titleid=' + page,
            tXpe: 'get',
            data: {},
            success: function (da) {
                var html = template('good', da);
                $('.bcj-footlist>ul').html(html);
                $('#loading').addClass('hide');
            }
        })
    }
    leftSwipe();
    function leftSwipe() {

        var parentBox = document.querySelector('.wbb-nav');
        var childBox = parentBox.querySelector('ul');
        var parentWidth = parentBox.offsetWidth;
        var childWidth = childBox.offsetWidth;
        var lis = childBox.querySelectorAll('li');
        var distance = 150;
        var maxPosition = 0;
        var minPosition = parentWidth - childWidth;
        var maxSwipe = maxPosition + distance;
        var minSwipe = minPosition - distance;
        var currentX = 0;
        var addTransition = function () {
            childBox.style.transition = "all 0.3s";
            childBox.style.webkitTransition = "all 0.3s"; /*做兼容*/
        };
        var removeTransition = function () {
            childBox.style.transition = "none";
            childBox.style.webkitTransition = "none";
        }
        var setTranslateX = function (translateX) {
            childBox.style.transform = "translateX(" + translateX + "px)";
            childBox.style.webkitTransform = "translateX(" + translateX + "px)";
        }
        var startX = 0;
        var moveX = 0;
        var distanceX = 0;
        var isMove = false;
        childBox.addEventListener('touchstart', function (e) {
            startX = e.touches[0].clientX;
        });
        childBox.addEventListener('touchmove', function (e) {
            moveX = e.touches[0].clientX;
            distanceX = moveX - startX;
            removeTransition();
            if ((currentX + distanceX) < maxSwipe && (currentX + distanceX) > minSwipe) {
                setTranslateX(currentX + distanceX);
            }
            isMove = true;
        });
        window.addEventListener('touchend', function (e) {
            if ((currentX + distanceX) > maxPosition) {
                currentX = maxPosition;
                /*吸附效果  过渡的形式定位回去*/
                /*加过渡*/
                addTransition();
                /*做定位*/
                setTranslateX(currentX);
            } else if ((currentX + distanceX) < minPosition) {
                currentX = minPosition;
                /*吸附效果  过渡的形式定位回去*/
                /*加过渡*/
                addTransition();
                /*做定位*/
                setTranslateX(currentX);
            } else {
                /*正常情况*/
                currentX = currentX + distanceX;
            }
            /*重置参数*/
            startX = 0;
            moveX = 0;
            distanceX = 0;
            isMove = false;
        });
        childBox.onclick = function (e) {
            /*4.点击分类的时候  要求改变当前样式  
            /*target  触发事件的目标源  元素*/
            var tapLi = e.target.parentNode;
            //为当前点击的li标签增加点击效果；
            /*清除当前样式*/
            for (var i = 0; i < lis.length; i++) {
                lis[i].children[0].className = "";
                lis[i].index = i;
            }
            e.target.className = "noww";
            /*
             5.点击过后 要判断是否有滑动的位子  当前被点击的盒子要求  滑动到和顶部对齐的位子   transition
             6.点击的时候  要判断是否有滑动的位子  没有滑动的位子保持不动
            */

            /*计算将要去做定位的位置*/

            var translateX = -tapLi.index * 50;
            if (translateX > minPosition) {
                /*为了衔接滑动*/
                currentX = translateX;
                /*加过渡*/
                addTransition();
                /*做定位*/
                setTranslateX(currentX);
            }
            /* 6.点击的时候  要判断是否有滑动的位子  没有滑动的位子保持不动*/
            else {
                currentX = minPosition;
                /*加过渡*/
                addTransition();
                /*做定位*/
                setTranslateX(currentX);
            }

        };
    };

});