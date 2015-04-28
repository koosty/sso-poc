/* ==========================================================================
 * TABLE OF CONTENTS (This file is only for demo)
 * ==========================================================================
   01. CHOOSE THEMES
   02. NAVBAR COLOR
   03. SIDEBAR COLOR
   04. LAYOUT SETTING
 ============================================================================ */

$(document).ready(function(){
    // =========================================================================
    // CHOOSE THEMES
    // =========================================================================

    // Check cookie for color schemes
    if ($.cookie('color_schemes')) {
        $('link#theme').attr('href', '../../../assets/admin/css/themes/'+$.cookie('color_schemes')+'.theme.css');
    }
    // Check cookie for navbar color
    if ($.cookie('navbar_color')) {
        $('.navbar-toolbar').attr('class', 'navbar navbar-toolbar navbar-'+$.cookie('navbar_color'));
    }
    // Check cookie for sidebar color
    if ($.cookie('sidebar_color')) {
        // Check variant sidebar class
        if($('#sidebar-left').hasClass('sidebar-box')){
            $('#sidebar-left').attr('class','sidebar-box sidebar-'+$.cookie('sidebar_color'));
        }
        else if($('#sidebar-left').hasClass('sidebar-rounded')){
            $('#sidebar-left').attr('class','sidebar-rounded sidebar-'+$.cookie('sidebar_color'));
        }
        else if($('#sidebar-left').hasClass('sidebar-circle')){
            $('#sidebar-left').attr('class','sidebar-circle sidebar-'+$.cookie('sidebar_color'));
        }
        else if($('#sidebar-left').attr('class') == ''){
            $('#sidebar-left').attr('class','sidebar-'+$.cookie('sidebar_color'));
        }
    }

    $('.color-schemes .theme').on('click',function(){

        // Create variable name selector file css
        var themename = $(this).find('.hide').text();

        // Add effect sound
        if($('.page-sound').length){
            ion.sound.play("camera_flashing_2");
        }

        // Add attribut href css theme
        $('link#theme').attr('href', '../../../assets/admin/css/themes/'+themename+'.theme.css');

        // Set cookie theme name value to variable themename
        $.cookie('color_schemes',themename, {expires: 1});

    });

    // =========================================================================
    // NAVBAR COLOR
    // =========================================================================
    $('.navbar-color .theme').on('click',function(){
        // Create variable name selector file css
        var classname = $(this).find('.hide').text();
        // Add effect sound
        if($('.page-sound').length){
            ion.sound.play("camera_flashing_2");
        }
        // Add class navbar-color
        $('.navbar-toolbar').attr('class', 'navbar navbar-toolbar navbar-'+classname);
        // Set cookie theme name value to variable classname
        $.cookie('navbar_color',classname, {expires: 1});
    });

    // =========================================================================
    // SIDEBAR COLOR
    // =========================================================================
    $('.sidebar-color .theme').on('click',function(){
        // Create variable name selector file css
        var classname = $(this).find('.hide').text();
        // Add effect sound
        if($('.page-sound').length){
            ion.sound.play("camera_flashing_2");
        }
        // Check variant sidebar class
        if($('#sidebar-left').hasClass('sidebar-box')){
            $('#sidebar-left').attr('class','sidebar-box sidebar-'+classname);
        }
        else if($('#sidebar-left').hasClass('sidebar-rounded')){
            $('#sidebar-left').attr('class','sidebar-rounded sidebar-'+classname);
        }
        else if($('#sidebar-left').hasClass('sidebar-circle')){
            $('#sidebar-left').attr('class','sidebar-circle sidebar-'+classname);
        }
        else if($('#sidebar-left').attr('class') == ''){
            $('#sidebar-left').attr('class','sidebar-'+classname);
        }
        // Set cookie theme name value to variable classname
        $.cookie('sidebar_color',classname, {expires: 1});
    });

    // =========================================================================
    // LAYOUT SETTING
    // =========================================================================
    // Check cookie for layout setting
    if ($.cookie('layout_setting')) {
        $('body').addClass($.cookie('layout_setting'));
    }

    // Check cookie for header layout setting
    if ($.cookie('header_layout_setting')) {
        $('body').addClass($.cookie('header_layout_setting'));
    }

    // Check cookie for sidebar layout setting
    if ($.cookie('sidebar_layout_setting')) {
        $('#sidebar-left').addClass($.cookie('sidebar_layout_setting'));
    }

    // Check cookie for sidebar type layout setting
    if ($.cookie('sidebar_type_setting')) {
        $('#sidebar-left').addClass($.cookie('sidebar_type_setting'));
    }

    // Check cookie for footer layout setting
    if ($.cookie('footer_layout_setting')) {
        $('body').addClass($.cookie('footer_layout_setting'));
    }

    // Check checked status input on layout setting
    if($('body').not('.page-boxed')){
        $('.layout-setting li:eq(0) input').attr('checked','checked');
    }
    if($('body').hasClass('page-boxed')){
        $('.layout-setting li:eq(1) input').attr('checked','checked');
        $('body').removeClass('page-header-fixed');
        $('body').removeClass('page-sidebar-fixed');
        $('body').removeClass('page-footer-fixed');
        $('.header-layout-setting li:eq(1) input').attr('disabled','disabled').next().css('text-decoration','line-through');
        $('.sidebar-layout-setting li:eq(1) input').attr('disabled','disabled').next().css('text-decoration','line-through');
        $('.footer-layout-setting li:eq(1) input').attr('disabled','disabled').next().css('text-decoration','line-through');
    }

    // Check checked status input on header layout setting
    if($('body').not('.page-header-fixed')){
        $('.header-layout-setting li:eq(0) input').attr('checked','checked');
    }
    if($('body').hasClass('page-header-fixed')){
        $('.header-layout-setting li:eq(1) input').attr('checked','checked');
    }

    // Check checked status input on sidebar layout setting
    if($('body').not('.page-sidebar-fixed')){
        $('.sidebar-layout-setting li:eq(0) input').attr('checked','checked');
    }
    if($('body').hasClass('page-sidebar-fixed')){
        $('.sidebar-layout-setting li:eq(1) input').attr('checked','checked');
    }

    // Check checked status input on sidebar type layout setting
    if($('#sidebar-left').not('.sidebar-box, .sidebar-rounded, .sidebar-circle')){
        $('.sidebar-type-setting li:eq(0) input').attr('checked','checked');
    }
    if($('#sidebar-left').hasClass('sidebar-box')){
        $('.sidebar-type-setting li:eq(1) input').attr('checked','checked');
    }
    if($('#sidebar-left').hasClass('sidebar-rounded')){
        $('.sidebar-type-setting li:eq(2) input').attr('checked','checked');
    }
    if($('#sidebar-left').hasClass('sidebar-circle')){
        $('.sidebar-type-setting li:eq(3) input').attr('checked','checked');
    }

    // Check checked status input on footer layout setting
    if($('body').not('.page-footer-fixed')){
        $('.footer-layout-setting li:eq(0) input').attr('checked','checked');
    }
    if($('body').hasClass('page-footer-fixed')){
        $('.footer-layout-setting li:eq(1) input').attr('checked','checked');
    }


    $('.layout-setting input').change(function(){

        // Create variable class name for layout setting
        var classname = $(this).val();

        // Add effect sound
        if($('.page-sound').length){
            ion.sound.play("beer_can_opening");
        }

        // Add trigger change class on body HTML
        if($('body').hasClass('page-boxed')){
            $('body').removeClass('page-boxed');
            $('body').removeClass('page-header-fixed');
            $('body').removeClass('page-sidebar-fixed');
        }else{
            $('body').addClass($(this).val());
        }

        // Set cookie theme name value to variable classname
        $.cookie('layout_setting',classname, {expires: 1});

    });

    $('.header-layout-setting input').change(function(){

        // Create variable class name for layout setting
        var classname = $(this).val();

        // Add effect sound
        if($('.page-sound').length){
            ion.sound.play("beer_can_opening");
        }

        // Add trigger change class on body HTML
        if($('body').hasClass('page-header-fixed')){
            $('body').removeClass('page-header-fixed');
            $('body').removeClass('page-sidebar-fixed');
        }else{
            $('body').addClass($(this).val());
        }

        // Set cookie theme name value to variable classname
        $.cookie('header_setting',classname, {expires: 1});

    });

    $('.sidebar-layout-setting input').change(function(){

        // Create variable class name for layout setting
        var classname = $(this).val();

        // Add effect sound
        if($('.page-sound').length){
            ion.sound.play("beer_can_opening");
        }

        // Add trigger change class on body HTML
        if($('body').hasClass('page-sidebar-fixed')){
            $('body').removeClass('page-sidebar-fixed');
            $('body').removeClass('page-header-fixed');
        }else{
            $('body').addClass($(this).val());
            $('body').addClass('page-header-fixed');
            $('.header-layout-setting li:eq(0) input').removeAttr('checked');
            $('.header-layout-setting li:eq(1) input').attr('checked','checked');
        }

        // Set cookie theme name value to variable classname
        $.cookie('sidebar_layout_setting',classname, {expires: 1});

    });

    $('.sidebar-type-setting input').change(function(){

        // Create variable class name for layout setting
        var classname = $(this).val();

        // Add effect sound
        if($('.page-sound').length){
            ion.sound.play("beer_can_opening");
        }

        // Add trigger change class on sidebar left element
        if($('#sidebar-left').hasClass('sidebar-circle')){
            $('#sidebar-left').removeClass('sidebar-circle');
        }

        if($('#sidebar-left').hasClass('sidebar-box')){
            $('#sidebar-left').removeClass('sidebar-box');
        }else{
            $('#sidebar-left').addClass($(this).val());
        }

        if($('#sidebar-left').hasClass('sidebar-rounded')){
            $('#sidebar-left').removeClass('sidebar-rounded')
        }else{
            $('#sidebar-left').addClass($(this).val());
        }

        // Set cookie theme name value to variable classname
        $.cookie('sidebar_type_setting',classname, {expires: 1});

    });

    $('.footer-layout-setting input').change(function(){

        // Create variable class name for layout setting
        var classname = $(this).val();

        // Add effect sound
        if($('.page-sound').length){
            ion.sound.play("beer_can_opening");
        }

        // Add trigger change class on body HTML
        if($('body').hasClass('page-footer-fixed')){
            $('body').removeClass('page-footer-fixed')
        }else{
            $('body').addClass($(this).val());
        }

        // Set cookie theme name value to variable classname
        $.cookie('footer_layout_setting',classname, {expires: 1});

    });

});