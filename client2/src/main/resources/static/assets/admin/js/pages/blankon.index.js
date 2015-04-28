/* ==========================================================================
 * Plugins used: niceScroll, waypoints, ion sounds
 * --------------------------------------------------------------------------
 * TABLE OF CONTENT
 * --------------------------------------------------------------------------
 * 01. IE SUPPORT
 * 02. LOADING
 * 03. SOUNDS
 * 04. BACK TOP
 * 05. NICESCROLL PANEL
 * 06. ANIMATIONS ON SCROLL
 ============================================================================ */

$(document).ready(function(){

    // =========================================================================
    // IE SUPPORT
    // =========================================================================
    // IE mode
    var isIE8 = false;
    var isIE9 = false;
    var isIE10 = false;

    // initializes main settings for IE
    isIE8 = !! navigator.userAgent.match(/MSIE 8.0/);
    isIE9 = !! navigator.userAgent.match(/MSIE 9.0/);
    isIE10 = !! navigator.userAgent.match(/MSIE 10.0/);

    if (isIE10) {
        $('html').addClass('ie10'); // detect IE10 version
    }

    if (isIE10 || isIE9 || isIE8) {
        $('html').addClass('ie'); // detect IE8, IE9, IE10 version
    }

    // =========================================================================
    // LOADING
    // =========================================================================
    if($('#wrapper').length){
        $('#wrapper').jpreLoader({
                loaderVPos: '50%',
                autoClose: true
            },
            function() {
                $('#wrapper').animate({"opacity":'1'},{queue:false,duration:700,easing:"easeInOutQuad"});
                $('#loading').fadeOut('fast');
            });
    }

    // =========================================================================
    // SOUNDS
    // =========================================================================
    if($('.page-sound').length){
        ion.sound({
            sounds: [
                {name: "bell_ring", volume: 0.6}
            ],
            path: "../../../assets/global/plugins/ion-sound/sounds/",
            preload: true
        });

    }

    // =========================================================================
    // BACK TOP
    // =========================================================================
    // hide #back-top first
    $("#back-top").hide();

    // fade in #back-top
    $(window).scroll(function () {
        if ($(this).scrollTop() > 773) {
            $('#back-top').fadeIn();
        } else {
            $('#back-top').fadeOut();
        }
    });

    // scroll body to 0px on click
    $('#back-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
    $('#to-reasons').click(function () {
        // Add effect animate on body or HTML
        $('body,html').animate({
            scrollTop: $(this).parents('[data-target="height-content"]').height()
        }, 2000);
        return false;
    });

    // =========================================================================
    // NICESCROLL PANEL
    // =========================================================================
    $('.panel-scrollable .panel-body').niceScroll({
        cursorcolor: '#81b71a',
        cursorwidth: '3px',
        cursorborder: '0px'
    });

    // =========================================================================
    // ANIMATIONS ON SCROLL
    // =========================================================================
    var waypointClass = '#wrapper [class*="col-"]';
    var waypointSummary = '#summary p';
    var animationClass = 'fadeIn';
    var delayTime;

    // Fix opacity landing issue for IE8 and IE9
    if (isIE8 || isIE9) { // ie8 & ie9
        $(waypointClass).css({opacity: '1'});
    }else{
        $(waypointClass).css({opacity: '0'});
    }

    $(waypointClass).waypoint(function() {
            delayTime += 100;
            $(this).delay(delayTime).queue(function(next){
                $(this).toggleClass('animated');
                $(this).toggleClass(animationClass);
                delayTime = 0;
                next();
            });
        },
        {
            offset: '73%',
            triggerOnce: true
        });

    $(waypointSummary).waypoint(function() {
            delayTime += 100;
            $(this).delay(delayTime).queue(function(next){
                $(this).toggleClass('animated');
                $(this).toggleClass('tada');
                delayTime = 0;
                next();
                // Add effect sound
                if($('.page-sound').length){
                    ion.sound.play("bell_ring");
                }
            });
        },
        {
            offset: '90%',
            triggerOnce: true
        });

});