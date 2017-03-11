$(function () {
    /*==================方法的调用=================*/
    init();
    /*==================方法的定义=================*/
    function init() {
        getSaveMoney();
        //getNum();

    }

    var pagem = 0;
    var str = '';

        function getSaveMoney()
    {
        template.helper('getNum', getNum);
        function getNum(str) {
            return str.replace(/[^\d]/g, '');
        }

        $.ajax({
            url: 'http://139.199.157.195:9090/api/getmoneyctrl',
            beforeSend: function () {
                $('.mask').removeClass('hide');
            },
            complete: function () {
                $('.mask').addClass('hide');
            },
            success: function (res) {
                var html = template('moneyTpl', res);
                $('.container').html(html);
                pagem = Math.ceil(res.totalCount / res.pagesize);
                for (var i = 1; i <= pagem; i++) {
                    str += '<option value="' + i + '">' + i + '/' + pagem + '</option>';
                }
                $('#selectPages').html(str);
            }
        })
    }

    var index = 1;
    var targetIndex = index;
    $('.pages').on('click', '.button', function () {
        if ($(this).hasClass('pre')) {
            targetIndex = index <= 1 ? 1 : index - 1;
        } else {
            targetIndex = index >= pagem ? pagem : index + 1;
        }


        if (targetIndex !== index) {
            $.ajax({
                url: 'http://139.199.157.195:9090/api/getmoneyctrl?pageid=' + targetIndex,
                beforeSend: function () {
                    $('#selectPages').find('option').prop('selected', false).eq(targetIndex - 1).prop('selected', true);
                    $(this).prop('disabled', true);
                    $('.mask').removeClass('hide');
                },
                //页面等待效果
                complete: function () {
                    $('.mask').addClass('hide');

                },

                success: function (res) {
                    var html = template('moneyTpl', res);
                    $.scrollTo(0, 300);
                    $('.container').html(html);
                    $(this).prop('disabled', false);

                    index = targetIndex;
                }
            })
        }
    });

    $('.pages').on('change', 'select', function () {
        targetIndex = $('select option:selected').index() + 1;
        $.ajax({
            url: 'http://139.199.157.195:9090/api/getmoneyctrl?pageid=' + targetIndex,
            beforeSend: function () {
                $('.mask').removeClass('hide');
            },
            complete: function () {
                $('.mask').addClass('hide');
            },
            success: function (res) {
                var html = template('moneyTpl', res);
                $.scrollTo(0, 300);
                $('.container').html(html);
                index = targetIndex;
            }
        })

    })
});













