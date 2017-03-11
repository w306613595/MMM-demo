$(function(){
    var lisNum =0;
    var width=0;
    var step =0;
    var swidth =0;
    var lis=null;
    var res= window.location.search;
    var mwidth = 0;
    var objNew={};
    function num(str){
        str.replace(/\d+/g, function () {
            return arguments[0];
        });

    }
    var min =num(res)
    $.ajax({
       type:"get",
        url:"http://139.199.157.195:9090/api/getcoupon",
        success:function(res){
            var html =template("shadetpl",res);
            $("#min").html(html)
        }
    });
    var data =[];
    var objNew = {};
    $.ajax({
        type:"get",
        url:"http://139.199.157.195:9090/api/getcouponproduct"+res,
        success:function(result){
            data =result.result.slice(0, 30);
            objNew ={result:data}

            var html= template("infotpl",objNew);
            $("#ym-kd2").html(html);
            mwidth=$("#ym-shade img").width();

            $("body").on("click","#ym-kd2>li",function(){
                if($("#lorBox").hasClass("pop")){
                    $("#lorBox").removeClass("pop bounceInDown")
                    $(".neiBox").removeClass("pop bounceInDown")
                }else{
                    $("#lorBox").addClass("pop bounceInDown")
                    $(".neiBox").addClass("pop bounceInDown")
                }
            })
            $("#lorBox").click(function(){
                $(this).removeClass("pop bounceInDown")
            })
        //�ֲ�ͼImg

            $.ajax({
                type:"get",
                url:"http://139.199.157.195:9090/api/getcouponproduct"+res,
                success:function(res){
                    var html =template("col-Box",res);
                    $("#ym-shade").append(html)
                    $("#ym-shade")[0].appendChild($("#ym-shade").find("li")[0].cloneNode(true));
                    lis =$("#ym-shade li");
                    lisNum =lis.length;
                    width =lis.length*200;
                    $("#ym-shade").width(width);
                    getSrc()
                },
                complete:function(){
                }
            });
        $(".neiBox").on("click","#post-r",function(){
            if(step>=lisNum-1){
                step=0;
                $("#ym-shade")[0].style.left=0;
            }
            step++;
            swidth=step*200;
            $("#ym-shade").animate({
                "left":-swidth
            },500)
            return false;
        })
        $(".neiBox").on("click","#post-l",function(){

                if(step<=0){
                    step=lisNum-1;
                    $("#ym-shade")[0].style.left=-(step)*200+"px";
                }
                step--;
                swidth=-(step)*200;
                $("#ym-shade").animate({
                    "left":swidth
                },500)
                return false;
            })
        }

    })
    var startX = 0,
        moveX = 0,
        distanceX= 0,
        isMove =false;
    var addTransition = function(){
        $("#ym-shade")[0].style.webkitTransition = "all .2s";/*����*/
        $("#ym-shade")[0].style.transition = "all .2s";
    }
    var removeTransition = function(){
        $("#ym-shade")[0].style.webkitTransition = "none";/*����*/
        $("#ym-shade")[0].style.transition = "mone";
    }
    var setTranslateX = function(x){
        $("#ym-shade")[0].style.webkitTransform = "translateX("+x+"px)";
        $("#ym-shade")[0].style.transform = "translateX("+x+"px)";
    }
    function getSrc(){
        $("#ym-kd2").find("li").on("click",function(){
            var index =$(this).index()
            step=index;
            $("#ym-shade")[0].style.left=-index*200+"px";
        })
    }


    function moveMbile(){
        $(".neiBox").on("click","#ym-shade>li>img",function(){
            return false;
        })

        $("#ym-shade")[0].addEventListener('touchstart',function(e){
            startX= e.touches[0].clientX;
        });

        $("#ym-shade")[0].addEventListener('touchmove',function(e){
            isMove=true;
            moveX= e.touches[0].clientX;
            distanceX =moveX-startX;


            setTranslateX(-step*200+distanceX);
        });
        $("#ym-shade")[0].addEventListener("webkitTransitionEnd",function(){
                if(step>=lisNum){
                    step=1;
                    setTranslateX(-step*200);
                }else if(step<=0){
                    step=lisNum-1;
                    setTranslateX(-step*200)
                }
        })
        window.addEventListener("touchend",function(e){
            if(Math.abs(distanceX)>80&&isMove){

                if(distanceX>0){
                   step--;
                }else{
                    step++;
                }
                addTransition()
                setTranslateX(-step*200)
            }else{
                addTransition()
                setTranslateX(-step*200)
            }
            startX = 0;
            moveX = 0;
            distanceX = 0;
            isMove = false;

        })
    };

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

    $.touchGoHistory();
})