$(function(){
    $.ajax({
        type:"get",
        url:"http://139.199.157.195:9090/api/getsitenav",
        success:function(result){
            var html= template("ym-shopbar",result);
            $(".barbox").html(html);

        }
    });
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