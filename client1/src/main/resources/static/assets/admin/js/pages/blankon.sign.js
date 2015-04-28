/* ==========================================================================
 * Plugins used: JQuery Validate
 * ---------------------------------------------------------------------------
 * TABLE OF CONTENT
 * - FORM VALIDATION
 ============================================================================ */

$(document).ready(function(){

    // =========================================================================
    // FORM VALIDATION
    // =========================================================================
    // Just demo form validation on desktop view width screen large then 1024px, not available on tablet and mobile view.
    if($('#sign-in').length && $(window).width() >= 1024){

        $('#sign-in').validate(
            {
                invalidHandler:
                    function() {
                        // Add effect animation css
                        $('.sign-wrapper').toggleClass('animated shake');

                        // Add effect sound
                        if($('.page-sound').length){
                            ion.sound.play("light_bulb_breaking");
                        }
                    },
                rules:{
                    username: {
                        required: true
                    },
                    password: {
                        required: true
                    }
                },
                messages: {
                    username: {
                        required: "Just fill anything mr awesome"
                    },
                    password: {
                        required: "Please provide a password."
                    }
                },
                highlight:function(element) {
                    $(element).parents('.form-group').addClass('has-error has-feedback');
                },
                unhighlight: function(element) {
                    $(element).parents('.form-group').removeClass('has-error');
                },
                submitHandler: function(form){
                    var btn = $('#login-btn');
                    btn.html('Checking ...');
                    btn.attr('disabled', 'disabled');
                    setTimeout(function() {
                        btn.text('Great MR AWESOME !');
                    }, 2000);
                    btn.removeAttr('disabled');
                    setTimeout(function () {
                        form.submit();
                    }, 2500);
                }
            }
        );
    }

});