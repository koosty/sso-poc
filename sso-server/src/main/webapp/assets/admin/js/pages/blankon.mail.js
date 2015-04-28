/* ==========================================================================
 * Plugins used: bootstrap wysihtml5
 * ---------------------------------------------------------------------------
 * TABLE OF CONTENT
 * - CHECK
 * - STAR
 * - READ MAIL
 * - BOOTSTRAP WYSIHTML5
 ============================================================================ */

$(document).ready(function(){

    // =========================================================================
    // CHECK
    // =========================================================================
    $('.ckbox input').click(function(){
        var list = $(this);
        if(list.is(':checked')){
            list.closest('tr').addClass('selected');
        } else {
            list.closest('tr').removeClass('selected');
        }
    });

    // =========================================================================
    // STAR
    // =========================================================================
    $('.star').click(function(){
        if(!$(this).hasClass('star-checked')) {
            $(this).addClass('star-checked');
        }
        else
            $(this).removeClass('star-checked');
        return false;
    });

    // =========================================================================
    // READ MAIL
    // =========================================================================
    $('.table-email .media').click(function(){
        location.href="mail-view.html";
    });

    // =========================================================================
    // BOOTSTRAP WYSIHTML5
    // =========================================================================
    if($('#compose-editor').length){
        $('#compose-editor').wysihtml5({});
    }

});
