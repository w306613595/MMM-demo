/**
 * Created by Administrator on 2017/2/15.
 */
$(function(){
    $.ajax({
        type:'get',
        url:"http://139.199.157.195:9090/api/getgsshop",
        success:function(res){
            var html= template("cdptpla",res);
            $(".ym-downl>ul").html(html);
            getPor()
        }
    })
    $.ajax({
        type:'get',
        url:"http://139.199.157.195:9090/api/getgsshoparea",
        success:function(res){
            var html= template("cdptplb",res);
            $(".ym-downc>ul").html(html);
            getArea()
        }
    })
    $.ajax({
        type:'get',
        url:"http://139.199.157.195:9090/api/getgsproduct?shopid=0&areaid=0",
        success:function(res){
            var html= template("cdptpl",res);
            $(".ym-products>ul").html(html);
            getData();
        }
    })

    $("#posta").parent("li").click(function(){
        $("#downa").toggleClass("pop");
        $("#downb").removeClass("pop");
        $("#downc").removeClass("pop");
    })
    $("#postb").parent("li").click(function(){
        $("#downb").toggleClass("pop");
        $("#downa").removeClass("pop");

    })
    $("#postc").parent("li").click(function(){
        $("#downc").toggleClass("pop");
        $("#downb").removeClass("pop");
        $("#downa").removeClass("pop");
    })
    $("#downb").click(function(){
        $(this).toggleClass("pop");
        $("#a1").removeClass("glyphicon glyphicon-triangle-top").addClass("glyphicon glyphicon-triangle-bottom")

    })
    $("#downa").click(function(){
        $(this).toggleClass("pop");
        $("#a0").removeClass("glyphicon glyphicon-triangle-top").addClass("glyphicon glyphicon-triangle-bottom")

    })
    $("#downc").click(function(){
        $(this).toggleClass("pop");
        $("#a2").removeClass("glyphicon glyphicon-triangle-top").addClass("glyphicon glyphicon-triangle-bottom")

    })

    $("#post").children("li").click(function(){
        if($(this).find("i").hasClass("glyphicon glyphicon-triangle-bottom")){
            $(this).find("i").removeClass("glyphicon glyphicon-triangle-bottom").addClass("glyphicon glyphicon-triangle-top")
        }else{
            $(this).find("i").removeClass("glyphicon glyphicon-triangle-top").addClass("glyphicon glyphicon-triangle-bottom")
        }
    })

    function getPor(){
        $("#downa>ul>li").each(function(index,ele){
            $(ele).click(function(){
                $("#posta>span").text($(this).find("span").text());
                var step =index+1;
                $.ajax({
                    type:"get",
                    url:"http://139.199.157.195:9090/api/getgsproduct?shopid=0&areaid="+step,
                    success:function(res){
                        var html = template("cdptpl",res)
                        $("#pro-ul").html(html);
                    }
                })
            })
        });
    };
    function getArea(){
        $("#downb>ul>li").each(function(index,ele){
            $(ele).click(function(){
                $("#postb>span").text(($(this).find("span").text()).substr(0,2));
                var step =index;
                $.ajax({
                    type:"get",
                    url:"http://139.199.157.195:9090/api/getgsproduct?shopid=1&areaid="+index,
                    success:function(res){
                        var html = template("cdptpl",res)
                        $("#pro-ul").html(html);
                    }
                })
            })
        });
    };
    getOne();
    function getOne(){
        $("#downc>ul>li").each(function(index,ele){
            $(ele).click(function(){
                $("#postc>span").text($(this).find("span").text());
                var step =index;
                $.ajax({
                    type:"get",
                    url:"http://139.199.157.195:9090/api/getgsproduct?shopid=2&areaid="+index,
                    success:function(res){
                        var html = template("cdptpl",res)
                        $("#pro-ul").html(html);
                    }
                })
            })
        });
    };

    var flag  = true;
    function getData(){
        $(window).on("scroll",function(){
            var offsetTop =$(".ym-products").offset().top;
            var height = $(".ym-products").height();
            var scrollTop = $(this).scrollTop();
            var selfHeight = $(this).height();
            var offset = offsetTop +height-scrollTop-selfHeight;
            if(offset<200){
                  if(flag){
                       flag = false;
                        $.ajax({
                            type:"get",
                            url:"http://139.199.157.195:9090/api/getgsproduct?shopid=0&areaid=0",
                            success:function(res){
                                var html = template("cdptpl",res);
                                $("#pro-ul").append(html);

                            },
                            complete:function(){
                                flag = true;

                            }
                        });
                    }
            }
        });
    }

    $(".foot_top>a:eq(2)").on("click",function(){
        var target = $("body")[0].scrollHeight;
        var step =0;
        clearInterval(time)
        var time =setInterval(function(){
            step++;
            target=target-5*step;
            window.scrollTo(0,target)
            if(target<0){
                clearInterval(time);
            }
        },15)

    });
    $.touchGoHistory()

})