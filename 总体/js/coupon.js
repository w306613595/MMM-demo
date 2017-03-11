$(function(){
    $.ajax({
        type:"get",
        url:"http://139.199.157.195:9090/api/getcoupon",
        success:function(result){
            var html= template("ym-deader",result);
            $("#ym-box").html(html);

        }
    })
    $.touchGoHistory();
})