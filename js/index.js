$(document).ready(function () {
    // Random banner DOM
    var point_count = 16;
    var html = '';
    for (var i = 0; i < point_count; i++) {
        var margin_left = Math.round(Math.random() * 30) + Math.floor(2.0 * i / point_count) * 70;
        var font_size = Math.round(16 + Math.random() * 14);
        var font_min_size = font_size - 10;
        html += '<div class="point" style="left:' + margin_left + '%;top:' + Math.round(Math.random() * 100) + '%;font-size:' + font_size + 'px;font-weight: 300;"><div class="float top" style="animation: ani-float infinite ' + (3 + Math.random() * 5) + 's ' + (1 + Math.random() * 5) + 's;"><span class="symbol" style="font-size:' + font_min_size + 'px;">▲</span><span class="num">' + (Math.random() * 10).toFixed(2) + '%</span></div></div>';
    }
    $('.anm-content').html(html);
    // Video
    var video = document.getElementById('video');
    var video_control = $('#video-control');
    $('#play-btn').click(function () {
        if (video.paused) {
            video_control.removeClass('video-end');
            video_control.addClass('video-start');
            video.play();
        } else {
            video_control.removeClass('video-start');
            video_control.addClass('video-end');
            video.pause();
        }
    });
    // 初始化动画
    new WOW().init();
    $('#send').click(function () {
        var text_error = $('#text_error');
        text_error.hide();
        var data = {};
        data.name = $('#you_name').val();
        data.company = $('#company').val();
        data.email = $('#email').val();
        var that = $(this);
        if (data.name || data.company || data.email) {
            $.ajax({
                dataType: 'json',
                type: 'POST',
                url: '/api/drquant/subscribe/',
                data: data,
                success: function (res) {
                    that.html('✓ Successfully Subscribed');
                    that.addClass('disabled');
                    that.unbind('click');
                },
                error: function (err) {
                    if (err.status >= 400) {
                        text_error.show();
                        text_error.removeClass('animated shake');
                        setTimeout(function () {
                            text_error.addClass('animated shake');
                        }, 50);
                    }
                }
            })
        }
    })
});

function to_href(url) {
    window.location.href = url;
}
