
/* hamburger menu  */
$(function () {
    $('.hamburger_menu').on('click', function() {
        $(this).toggleClass('active');
        $('#gnav').toggleClass('open');
        return false;
    });
    $('#gnav li a').on('click', function() {
        $('.hamburger_menu').removeClass('active');
        $('#gnav').removeClass('open');
        return false;
    });
});


/*  Current Position  */
//$(window).on("load",function() {
$(function () {
    //ウインドウの横幅
    var currentWidth = window.innerWidth;
    var navLink = $('#gnav li a');/*グローバルナビ*/
    var headerHeight = $('header').outerHeight(true);
    $(window).on("resize",function() {
        if (currentWidth == window.innerWidth) {
            // ウインドウ横幅が変わっていないため処理をキャンセル。
            return;
        }
        location.reload();
    });
    // 各コンテンツのページ上部からの開始位置と終了位置を配列に格納
    var contentsArr = new Array();
    for (var i = 0; i < navLink.length; i++) {
        // コンテンツのIDを取得
        var targetContents = navLink.eq(i).attr('href');
        // ページ内リンクでないナビゲーションが含まれている場合は除外する
        if(targetContents.charAt(0) == '#') {
            // ページ上部からコンテンツの開始位置までの距離を取得
            if ( $(targetContents).length ) {
                var targetContentsTop = $(targetContents).offset().top - headerHeight;
            }
            // ページ上部からコンテンツの終了位置までの距離を取得
            var targetContentsBottom = targetContentsTop + $(targetContents).outerHeight(true);
            // 配列に格納
            contentsArr[i] = [targetContentsTop, targetContentsBottom]
        }
    };


    // 現在地をチェックする
    function currentCheck() {
        // 現在のスクロール位置を取得
        var windowScrolltop = $(window).scrollTop();
        for (var i = 0; i < contentsArr.length; i++) {
            // 現在のスクロール位置が、配列に格納した開始位置と終了位置の間にあるものを調べる
            if(contentsArr[i][0] <= windowScrolltop && contentsArr[i][1] >= windowScrolltop) {
                // 開始位置と終了位置の間にある場合、ナビゲーションにclass="current"をつける
                navLink.removeClass('current');
                navLink.eq(i).addClass('current');
                i == contentsArr.length;
                
            } else if (contentsArr[0][0] > windowScrolltop) {/*上に戻る際の最初のカレント消し*/
                navLink.removeClass('current');
            }
        };
    }

    // ページ読み込み時とスクロール時に、現在地をチェックする
    $(window).on('load scroll resize', function() {
        currentCheck();
    });

    // セレクターをクリックした時のスムーズスクロール
    $('#gnav li a, .btn_scroll a, .pagetop a, #logo').click(function() {
        $('html,body').animate({
            scrollTop: $($(this).attr('href')).offset().top - headerHeight
        }, 800, 'swing');
        return false;
    })
        

});





/*
=========================================
     Scroll Action
=========================================
*/
$(window).on('load scroll', function(){
    var elem = $('.animated').not('.mainslide img')/*sliderを除く*/;  
    elem.each(function () {  
      var isAnimate = $(this).data('animate');
      var elemOffset = $(this).offset().top;
      var scrollPos = $(window).scrollTop();
      var wh = $(window).height();
      if(scrollPos > elemOffset - wh + (wh /3)){
        $(this).addClass(isAnimate).addClass('Visi');
      }else{
        $(this).removeClass(isAnimate).removeClass('Visi');
      }
    });  
});


/*
=========================================
     ページ遷移エフェクト
=========================================
*/
//$(function() {
$(window).on('load', function(){
    $('body').removeClass('fadeout');
    //$('.works_img_wrapper').addClass('animated');
});
// セレクターをクリックしたら
$('.works_list a, .rtn_index a').on('click', function(e){
    e.preventDefault(); // リンク先へ遷移をキャンセル
    url = $(this).attr('href'); // 遷移先のURLを取得
    if (url !== '') {
        $('body').addClass('fadeout'); // bodyに class="fadeout"を挿入
        setTimeout(function(){
        window.location = url;  // 0.8秒後に取得したURLに遷移
    }, 800);s
    }
    return false;
});
//});