/**
 * Created by dell on 2017/2/15.
 */


$(function(){
    var pageData = location.search.slice(1);
    $.fixSearchBar();

    $.ajax({
        type:'get',
        url:'http://139.199.157.195:9090/api/getbrand',
        data:pageData,
        dataType:'json',
        success:function(data){
                var htm = '';
                for(var i=0; i<data.result.length; i++) {
                    htm += '<li>'
                         +'<a href="#">'
                         +'<em class = "top1">'
                         + (i+1)
                         +'</em>'
                         +'<div class = "inner">'
                         +'<div class = "tit">'
                         +data.result[i].brandName
                         +'</div>'
                         +'<p>'
                         +data.result[i].brandInfo
                         +'</p>'
                         +'</div>'
                         +'</a>'
                         +'</li>';
                }

            document.querySelector('.tv').innerHTML = htm;

        }
    })


    var pageData2 = 'brandtitleid=' + pageData.slice(-1) + '&pagesize=4';


    $.ajax({
        type:'get',
        url:'http://139.199.157.195:9090/api/getbrandproductlist',
        data:pageData2,
        dataType:'json',
        success:function(data){
            var htm1 = '';
            for(var i=0; i<4; i++) {
                htm1 += '<li>'
                    +'<a href="#">'
                    +'<div class = "pic">'
                    +data.result[i].productImg
                    +'</div>'
                    +'<div class = "info">'
                    +'<div class = "tit">'
                    +data.result[i].productName
                    +'</div>'
                    +'<div class = "price">'
                    +'<em>'
                    +data.result[i].productPrice
                    +'</em>'
                    +'</div>'
                    +'<div class = "other">'
                    +'<em>'
                    +data.result[i].productQuote
                    +'</em>'
                    +'<em>'
                    +data.result[i].productCom
                    +'</em>'
                    +'</div>'
                    +'</div>'
                    +'</a>'
                    +'</li>';
            }
            document.querySelector('.rank').innerHTML = htm1;

        }

    })
    var productId = 'productid=' + pageData.slice(-1);


    $.ajax({
        type:'get',
        url:'http://139.199.157.195:9090/api/getproductcom',
        data:productId,
        dataType:'json',
        success:function(data){
            var htm2 = '';
            for(var i=0; i<data.result.length; i++) {
                htm2 += '<li>'
                    +'<div class="plbox">'
                    +'<a href="">'
                    +'<div class="name">'
                    +data.result[i].comName
                    +'<i>'
                    +data.result[i].comTime
                    +'</i>'
                    +'</div>'
                    +'<div class="con">'
                    +data.result[i].comContent
                    +'</div>'
                    +'</a>'
                    +'</div>'
                    +'</li>';
            }
            document.querySelector('.said').innerHTML = htm2;
        }
    })


})
