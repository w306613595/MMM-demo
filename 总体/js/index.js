//rem设置

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


$(function () {

    //页面的加载部分
    //数据加载
    getNavData();
    getProData();

    //功能
    returnTop();
    getMore();
    fixSearchBar();

});

/******************************* 函数定义 *****************************/
//得到导航的数据
function getNavData() {
    $.ajax({
        type: 'get',
        url: 'http://139.199.157.195:9090/api/getindexmenu',
        success: function (rel) {
            var html = template('navTpl', rel);
            $('nav .rol').html(html);
        }
    });
}
//模板方法加入
template.helper('getNum', getNum);

function getNum(str) {
    return str.replace(/[^0-9]/g, '');
}

//得到商品的数据
function getProData() {
    var pageNow = 0;
    var pageTotal = 0;
    getData();

    $('.pro_footer button').on('click', function () {
        getData();
    });

    function getData() {
        $('.pro_footer button').css('display','none').nextAll().addClass('loading').css('display','inline-block');
        setTimeout(function(){
            $.ajax({
                type: 'get',
                url: 'http://139.199.157.195:9090/api/getmoneyctrl',
                success: function (rel) {

                    pageNow += rel.pagesize;
                    pageTotal = rel.totalCount;
                    var html = template('proTpl', rel);
                    $('.products ul').append(html);
                    
                    if (pageNow >= pageTotal - 100) {
                        $('.pro_footer').hide();
                    }
                },
                complete:function(){
                    $('.pro_footer button').css('display','inline-block').nextAll().removeClass('loading')
                    .css('display','none');
                }
            });
        },1000);
    }
}

//nav中更多
function getMore() {
    $('nav').on('click', 'div:nth-child(8)', function () {
        $(this).parent().children('div:nth-last-child(-n+4)').slideToggle();
    });
}

//返回顶部 
function returnTop() {
    $('#return').on('click', function () {
        $(document.body).animate({
            'scrollTop': 0
        });
    });
}


// 搜索栏固定
function fixSearchBar(){
    $(window).on('scroll',function(){
        if(document.body.scrollTop > $('header').height()){
            $('.search').css({
                'position':'fixed',
                'width':'100%',
                'top':0,
                'zIndex':1
            }).next().css({
                'marginTop':$('.search')[0].offsetHeight + 10
            });
        }else {
            $('.search').css({
                'position':'',
            }).next().css({
                'marginTop':10
            });
        }
    });
}

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
            if(distanceX > 200){
                history.go(-1)
            }else if(distanceX < -200){
                history.go(1);
            }
        });
    };
    $.touchGoHistory();



