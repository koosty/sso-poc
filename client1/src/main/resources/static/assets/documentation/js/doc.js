!function ($) {
  $(function(){
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
      var msViewportStyle = document.createElement("style");
      msViewportStyle.appendChild(
        document.createTextNode(
          "@-ms-viewport{width:auto!important}"
        )
      );
      document.getElementsByTagName("head")[0].
        appendChild(msViewportStyle);
    }


    var $window = $(window)
    var $body   = $(document.body)

    var navHeight = $('.navbar').outerHeight(true) + 10

    $body.scrollspy({
      target: '.ndoboost-sidebar',
      offset: navHeight
    })

    $window.on('load', function () {
      $body.scrollspy('refresh')
    })

})

}(jQuery)

$(document).ready(function(){
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
    $(window).load(function() {prettyPrint()});
	$('.tooltips').tooltip({
	  selector: "[data-toggle=tooltip]",
	  container: "body"
	})
    $("pre.html-code").snippet("html",{style:"matlab",clipboard:"../../assets/global/plugins/jquery-snippet/ZeroClipboard.swf"});
    $("pre.html-code-no-menu").snippet("html",{style:"matlab",menu: false});
    $("pre.style-code").snippet("css",{style:"matlab"});
    $("pre.js-code").snippet("javascript",{style:"matlab",clipboard:"../../assets/global/plugins/jquery-snippet/ZeroClipboard.swf"});
    // =========================================================================
    // CHOSEN SELECT
    // =========================================================================
    $('.chosen-select').chosen();
    function targetList(selector, wrap){
        $(selector).change(function(){
            $( selector + ' option:selected').each(function(){
                var id = $(selector).val();
                $(wrap).hide();
                $('#' + id).fadeIn();
                return;
            });
        }).change();
    }
    targetList('#plugins-list','.plugins-wrap');
    targetList('#widgets-list','.widgets-wrap');

    function targetListRedirect(selector){
        $(selector).change(function(){
            var url = $(this).val(); // get selected value
            if(url == '#'){
                return false;
            }
            if (url) { // require a URL
                window.open('../../production/admin/html/'+url+'.html', '_blank') ; // redirect
            }
            return false;
        }).change();
    }
    targetListRedirect('#components-list');
    targetListRedirect('#quick-search-list');
    // =========================================================================
    // DATATABLES
    // =========================================================================
    var responsiveHelperDom = undefined;
    var breakpointDefinition = {
        tablet: 1024,
        phone : 480
    };

    var tableDom = $('.datatable');
    tableDom.dataTable({
        autoWidth        : false,
        preDrawCallback: function () {
            // Initialize the responsive datatables helper once.
            if (!responsiveHelperDom) {
                responsiveHelperDom = new ResponsiveDatatablesHelper(tableDom, breakpointDefinition);
            }
        },
        rowCallback    : function (nRow) {
            responsiveHelperDom.createExpandIcon(nRow);
        },
        drawCallback   : function (oSettings) {
            responsiveHelperDom.respond();
        }
    });
});

