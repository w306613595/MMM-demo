/**
 * Created by dell on 2017/2/14.
 */

$(function(){
    $.fixSearchBar();
    $.ajax({
        type: "get",
        url: "http://139.199.157.195:9090/api/getbrandtitle",
        data: "datas",
        dataType: "json",
        success: function (datas) {
            var html = '';
            for(var i=0; i<datas.result.length; i++) {
                html += '<div class="nav_names_bs" >'
                    + '<a href="brandTitle2.html?brandtitleid='
                    + i
                    + ' ">'
                    + datas.result[i].brandTitle
                    + '</a>'
                    + '</div>';
            }
            document.querySelector('.nav_names_b').innerHTML = html;
        }

    })
})





