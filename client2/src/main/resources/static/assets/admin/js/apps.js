/* ==========================================================================
 * Template: Blankon Fullpack Admin Theme
 * Version: 1.0.0
 * Plugins used: niceScroll, JQuery.scrollTo, JQuery sparklines, JQuery mousewheel
 * ---------------------------------------------------------------------------
 * Author: djava ui
 * Website: http://djavaui.com
 * Email: support@djavaui.com
 * ==========================================================================


 * ==========================================================================
 * TABLE OF CONTENT
 * ==========================================================================
   01. IE SUPPORT
   02. LOADING
   03. CHECK COOKIE
   04. SOUNDS
   05. BACK TOP
   06. SIDEBAR NAVIGATION
   07. SIDEBAR CLOSE CONTENT
   08. SIDEBAR LEFT NICESCROLL
   09. SIDEBAR RIGHT PROFILE
   10. SIDEBAR RIGHT SETTING
   11. SIDEBAR RIGHT CHAT
   12. MESSAGES NICESCROLL
   13. NOTIFICATION NICESCROLL
   14. PANEL NICESCROLL
   15. SIDEBAR RESPONSIVE
   16. TYPEAHEAD
   17. FULLSCREEN TRIGGER
   18. TOOLTIP
   19. POPOVER
   20. COLLAPSE PANEL
   21. REMOVE PANEL
   22. REFRESH PANEL
   23. JQUERY SPARKLINE
   24. CLEAR ALL COOKIE
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

    // Fix input placeholder issue for IE8 and IE9
    if (isIE8 || isIE9) { // ie8 & ie9
        // this is html5 placeholder fix for inputs, inputs with placeholder-no-fix class will be skipped(e.g: we need this for password fields)
        $('input[placeholder]:not(.placeholder-no-fix), textarea[placeholder]:not(.placeholder-no-fix)').each(function () {
            var input = $(this);

            if (input.val() == '' && input.attr("placeholder") != '') {
                input.addClass("placeholder").val(input.attr('placeholder'));
            }

            input.focus(function () {
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                }
            });

            input.blur(function () {
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.val(input.attr('placeholder'));
                }
            });
        });
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
    // CHECK COOKIE
    // =========================================================================
    // Check (onLoad) if the cookie is there and set the class if it is

    // Set cookie sidebar minimize page
    if ($.cookie('page_sidebar_minimize') == 'active') {
        $('body').addClass('page-sidebar-minimize');
    }

    // =========================================================================
    // SOUNDS
    // =========================================================================
    if($('.page-sound').length){
        ion.sound({
            sounds: [
                {name: "beer_can_opening"},
                {name: "bell_ring", volume: 0.6},
                {name: "branch_break", volume: 0.3},
                {name: "button_click"},
                {name: "button_click_on"},
                {name: "button_push"},
                {name: "button_tiny", volume: 0.6},
                {name: "camera_flashing"},
                {name: "camera_flashing_2", volume: 0.6},
                {name: "cd_tray"},
                {name: "computer_error"},
                {name: "door_bell"},
                {name: "door_bump", volume: 0.3},
                {name: "glass"},
                {name: "keyboard_desk"},
                {name: "light_bulb_breaking", volume: 0.6},
                {name: "metal_plate"},
                {name: "metal_plate_2"},
                {name: "pop_cork"},
                {name: "snap"},
                {name: "staple_gun"},
                {name: "tap", volume: 0.6},
                {name: "water_droplet"},
                {name: "water_droplet_2"},
                {name: "water_droplet_3", volume: 0.6}
            ],
            path: "../../../assets/global/plugins/ion-sound/sounds/",
            preload: true
        });

        // Add effect sound water droplet type 3
        $('.dropdown-toggle').on('click', function(){
            ion.sound.play("water_droplet_3");
        });

    }

    // =========================================================================
    // BACK TOP
    // =========================================================================
    $('#back-top').hide();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#back-top').addClass('show animated pulse');
        } else {
            $('#back-top').removeClass('show animated pulse');
        }
    });

    // scroll body to 0px on click
    $('#back-top').click(function () {
        // Add sound
        ion.sound.play("cd_tray");
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    // =========================================================================
    // SIDEBAR NAVIGATION
    // =========================================================================
    // Create trigger click for open menu sidebar
    $('.submenu > a').click(function() {

        var parentElement = $(this).parent('.submenu'),
            nextElement = $(this).nextAll(),
            arrowIcon = $(this).find('.arrow'),
            plusIcon = $(this).find('.plus');

        // Add effect sound button click
        if($('.page-sound').length){
            ion.sound.play("button_click_on");
        }

        if(parentElement.parent('ul').find('ul:visible')){
            parentElement.parent('ul').find('ul:visible').slideUp('fast');
            parentElement.parent('ul').find('.open').removeClass('open');
        }

        if(nextElement.is('ul:visible')) {
            arrowIcon.removeClass('open');
            plusIcon.removeClass('open');
            nextElement.slideUp('fast');
        }

        if(!nextElement.is('ul:visible')) {
            arrowIcon.addClass('open');
            plusIcon.addClass('open');
            nextElement.slideDown('fast');
        }

    });

    // =========================================================================
    // SIDEBAR CLOSE CONTENT
    // =========================================================================
    $('.close').click(function(){
        $(this).parent('.sidebar-content').hide();
    });

    // =========================================================================
    // SIDEBAR LEFT NICESCROLL
    // =========================================================================
    // Optimalisation: Store the references outside the event handler:
    function checkHeightSidebar() {
        // Check if there is class page-sidebar-fixed
        if($('.page-sidebar-fixed').length){
            // =========================================================================
            // SIDEBAR LEFT
            // =========================================================================
            // Setting dinamic height sidebar menu
            var heightSidebarLeft       = $(window).outerHeight() - $('#header').outerHeight() - $('.sidebar-footer').outerHeight() - $('.sidebar-content').outerHeight(),
                heightSidebarRight      = $(window).outerHeight() - $('#sidebar-right .panel-heading').outerHeight(),
                heightSidebarRightChat  = $(window).outerHeight() - $('#sidebar-right .panel-heading').outerHeight() - $('#sidebar-chat .form-horizontal').outerHeight();
            $('#sidebar-left .sidebar-menu').height(heightSidebarLeft)
                .niceScroll({
                    cursorwidth: '3px',
                    cursorborder: '0px',
                    railalign: 'left'
                });

            // =========================================================================
            // SIDEBAR RIGHT PROFILE
            // =========================================================================
            $('#sidebar-profile .sidebar-menu').height(heightSidebarRight)
                .niceScroll({
                    cursorwidth: '3px',
                    cursorborder: '0px'
                });

            // =========================================================================
            // SIDEBAR RIGHT LAYOUT
            // =========================================================================
            $('#sidebar-layout .sidebar-menu').height(heightSidebarRight)
                .niceScroll({
                    cursorwidth: '3px',
                    cursorborder: '0px'
                });

            // =========================================================================
            // SIDEBAR RIGHT SETTING
            // =========================================================================
            $('#sidebar-setting .sidebar-menu').height(heightSidebarRight)
                .niceScroll({
                    cursorwidth: '3px',
                    cursorborder: '0px'
                });

            // =========================================================================
            // SIDEBAR RIGHT CHAT
            // =========================================================================
            $('#sidebar-chat .sidebar-menu').height(heightSidebarRightChat)
                .niceScroll({
                    cursorwidth: '3px',
                    cursorborder: '0px'
                });

        }
    }
    // Execute on load
    checkHeightSidebar();
    // Bind event listener
    $(window).resize(checkHeightSidebar);

    // =========================================================================
    // MESSAGES NICESCROLL
    // =========================================================================
    if($('.navbar-message .niceScroll').length){
        $('.navbar-message .niceScroll').niceScroll({
            cursorwidth: '3px',
            cursorborder: '0px'
        });
    }

    // =========================================================================
    // NOTIFICATION NICESCROLL
    // =========================================================================
    if($('.navbar-notification .niceScroll').length){
        $('.navbar-notification .niceScroll').niceScroll({
            cursorwidth: '3px',
            cursorborder: '0px'
        });
    }

    // =========================================================================
    // PANEL NICESCROLL
    // =========================================================================
    if($('.panel-scrollable').length){
        $('.panel-scrollable .panel-body').niceScroll({
            cursorwidth: '3px',
            cursorborder: '0px'
        });
    }

    // =========================================================================
    // SIDEBAR RESPONSIVE
    // =========================================================================
    // Optimalisation: Store the references outside the event handler:
    var $window = $(window);
    function checkWidth() {
        var windowsize = $window.width();
        // Check if view screen on greater then 720px and smaller then 1024px
        if (windowsize > 768 && windowsize <= 1024) {
            $('body').addClass('page-sidebar-minimize-auto');
        }
        else if (windowsize <= 768) {
            $('body').removeClass('page-sidebar-minimize');
            $('body').removeClass('page-sidebar-minimize-auto');
        }
        else{
            $('body').removeClass('page-sidebar-minimize-auto');
        }
    }
    // Execute on load
    checkWidth();
    // Bind event listener
    $(window).resize(checkWidth);

    // When the minimize trigger is clicked
    $('.navbar-minimize a').on('click',function(){
        
        // Add effect sound button click
        if($('.page-sound').length){
            ion.sound.play("button_click");
        }

        // Check class sidebar right show
        if($('.page-sidebar-right-show').length){
            $('body').removeClass('page-sidebar-right-show');
        }

        // Check class sidebar minimize auto
        if($('.page-sidebar-minimize-auto').length){
            $('body').removeClass('page-sidebar-minimize-auto');
        }else{
            // Toggle the class to the body
            $('body').toggleClass('page-sidebar-minimize');
        }

        // Check the current cookie value
        // If the cookie is empty or set to not active, then add page_sidebar_minimize
        if ($.cookie('page_sidebar_minimize') == "undefined" || $.cookie('page_sidebar_minimize') == "not_active") {

            // Set cookie value to active
            $.cookie('page_sidebar_minimize','active', {expires: 1});
        }

        // If the cookie was already set to active then remove it
        else {

            // Remove cookie with name page_sidebar_minimize
            $.removeCookie('page_sidebar_minimize');

            // Create cookie with value to not_active
            $.cookie('page_sidebar_minimize','not_active',  {expires: 1});

        }

    });

    $('.navbar-setting a').on('click',function(){
        // Add effect sound button click
        if($('.page-sound').length){
            ion.sound.play("button_click");
        }
        if($('.page-sidebar-minimize.page-sidebar-right-show').length){
            $('body').toggleClass('page-sidebar-minimize page-sidebar-right-show');
        }
        else if($('.page-sidebar-minimize').length){
            $('body').toggleClass('page-sidebar-right-show');
        }else{
            $('body').toggleClass('page-sidebar-minimize page-sidebar-right-show');
        }
    });

    // This action available on mobile view
    $('.navbar-minimize-mobile.left').on('click',function(){
        if($('body.page-sidebar-right-show').length){
            $('body').removeClass('page-sidebar-right-show');
            $('body').removeClass('page-sidebar-minimize');
        }
        $('body').toggleClass('page-sidebar-left-show');
    });
    $('.navbar-minimize-mobile.right').on('click',function(){
        if($('body.page-sidebar-left-show').length){
            $('body').removeClass('page-sidebar-left-show');
            $('body').removeClass('page-sidebar-minimize');
        }
        $('body').toggleClass('page-sidebar-right-show');
    });

    // =========================================================================
    // TYPEAHEAD
    // =========================================================================
    if($('.typeahead').length){
        var repos;

        repos = new Bloodhound({
            datumTokenizer: function(d) { return d.tokens; },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            prefetch: '../../../assets/global/plugins/typeahead/typeahead-sample.json'
        });

        repos.initialize();

        $('.typeahead').typeahead(null, {
            name: 'typeahead-sample',
            source: repos.ttAdapter(),
            templates: {
                empty: [
                    '<div class="empty-message">',
                    'unable to find your type that match the current query',
                    '</div>'
                ].join('\n'),
                suggestion: Handlebars.compile([
                    '<a href="javascript:void(0);" class="media border-dotted animated fadeIn">',
                    '<span class="media-object pull-left">',
                    '<i class="fa fa-{{icon}} bg-{{color}}"></i>',
                    '</span>',
                    '<span class="media-body">',
                    '<span class="media-heading">{{name}}</span>',
                    '<span class="media-text">{{description}}</span>',
                    '</span>',
                    '</a>'
                ].join(''))
            }
        });
    }

    // =========================================================================
    // FULLSCREEN TRIGGER
    // =========================================================================
    var state;
    $('#fullscreen').on('click', function() {
        state = !state;
        if (state) {
            // Trigger for fullscreen
            // Add effect sound bell ring
            if($('.page-sound').length){
                ion.sound.play("bell_ring");
            }
            $(this).toggleClass('fg-theme');
            $(this).attr('data-original-title','Exit Fullscreen');
            var docElement, request;
            docElement = document.documentElement;
            request = docElement.requestFullScreen || docElement.webkitRequestFullScreen || docElement.mozRequestFullScreen || docElement.msRequestFullScreen;
            if(typeof request!="undefined" && request){
                request.call(docElement);
            }
        } else {
            // Trigger for exit fullscreen
            // Add effect sound bell ring
            if($('.page-sound').length){
                ion.sound.play("bell_ring");
            }
            $(this).removeClass('fg-theme');
            $(this).attr('data-original-title','Fullscreen')
            var docElement, request;
            docElement = document;
            request = docElement.cancelFullScreen|| docElement.webkitCancelFullScreen || docElement.mozCancelFullScreen || docElement.msCancelFullScreen || docElement.exitFullscreen;
            if(typeof request!="undefined" && request){
                request.call(docElement);
            }
        }
    });

    // =========================================================================
    // TOOLTIP
    // =========================================================================
    if($('[data-toggle=tooltip]').length){
        $('[data-toggle=tooltip]').tooltip({
            animation: 'fade'
        });
    }

    // =========================================================================
    // POPOVER
    // =========================================================================
    if($('[data-toggle=popover]').length){
        $('[data-toggle=popover]').popover();
    }

    // =========================================================================
    // COLLAPSE PANEL
    // =========================================================================
    $('[data-action=collapse]').click(function(){
        var targetCollapse = $(this).parents('.panel').find('.panel-body'),
            targetCollapse2 = $(this).parents('.panel').find('.panel-sub-heading'),
            targetCollapse3 = $(this).parents('.panel').find('.panel-footer')
        if((targetCollapse.is(':visible'))) {
            $(this).find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
            targetCollapse.slideUp();
            targetCollapse2.slideUp();
            targetCollapse3.slideUp();
        }else{
            $(this).find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
            targetCollapse.slideDown();
            targetCollapse2.slideDown();
            targetCollapse3.slideDown();
        }
    });

    // =========================================================================
    // REMOVE PANEL
    // =========================================================================
    $('[data-action=remove]').click(function(){
        $(this).parents('.panel').fadeOut();
    });

    // =========================================================================
    // REFRESH PANEL
    // =========================================================================
    $('[data-action=refresh]').click(function(){
        var targetElement = $(this).parents('.panel').find('.panel-body');
        targetElement.append('<div class="indicator"><span class="spinner"></span></div>');
        setInterval(function(){
            $.getJSON('../assets/data/reload-sample.json', function(json) {
                $.each(json, function() {
                    // Retrieving data from json...
                });
                targetElement.find('.indicator').hide();
            });
        },5000);
    });

    // =========================================================================
    // JQUERY SPARKLINE
    // =========================================================================
    if($('.sparklines').length){
        $('.average').sparkline('html',{type: 'bar', barColor: '#37BC9B', height: '30px'});
        $('.traffic').sparkline('html',{type: 'bar', barColor: '#8CC152', height: '30px'});
        $('.disk').sparkline('html',{type: 'bar', barColor: '#E9573F', height: '30px'});
        $('.cpu').sparkline('html',{type: 'bar', barColor: '#F6BB42', height: '30px'});
    }

    // =========================================================================
    // CLEAR ALL COOKIE
    // =========================================================================
    $('#reset-setting').on('click', function(){
        var cookies = $.cookie();
        for(var cookie in cookies) {
            $.removeCookie(cookie);
        }
        location.reload(true);
    });

});
