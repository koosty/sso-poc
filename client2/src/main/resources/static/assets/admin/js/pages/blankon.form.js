/* ==========================================================================
 * Plugins used: chosen select, bootstrap switch, jquery inputmask,
 *               bootstrap datepicker, bootstrap wysihtml5, summernote,
 *               jquery validation, jquery mockjax, twitter bootstrap wizard,
 *               textarea maxlength
 * --------------------------------------------------------------------------
 * TABLE OF CONTENT
 * --------------------------------------------------------------------------
 * - CHOSEN SELECT
 * - BOOTSTRAP SWITCH
 * - JQUERY INPUTMASK
 * - BOOTSTRAP DATEPICKER
 * - BOOTSTRAP WYSIHTML5
 * - SUMMERNOTE
 * - JQUERY VALIDATION
 * - TWITTER BOOTSTRAP WIZARD
 * - TEXTAREA MAXLENGTH
 * - TEXTAREA AUTOSIZE
 ============================================================================ */

$(document).ready(function(){

    // =========================================================================
    // CHOSEN SELECT
    // =========================================================================
    if($('.chosen-select').length){
        $('.chosen-select').chosen();
    }

    // =========================================================================
    // BOOTSTRAP SWITCH
    // =========================================================================
    if($('.switch').length){
        $('.switch').bootstrapSwitch();
    }

    // =========================================================================
    // JQUERY INPUTMASK
    // =========================================================================
    if($('#input-mask').length){
        $(":input").inputmask();
    }

    // =========================================================================
    // BOOTSTRAP DATEPICKER
    // =========================================================================
    if($('#dp').length){
        $('#dp1').datepicker({
            format: 'mm-dd-yyyy',
            todayBtn: 'linked'
        });

        $('#dp2').datepicker();
        $('#btn2').click(function(e){
            e.stopPropagation();
            $('#dp2').datepicker('update', '03/17/12');
        });

        //inline
        $('#dp3').datepicker({
            todayBtn: 'linked'
        });

        $('#btn3').click(function(){
            $('#dp3').datepicker('update', '15-05-1984');
        });
    }

    // =========================================================================
    // BOOTSTRAP WYSIHTML5
    // =========================================================================
    if($('#wysihtml5-textarea').length){
        $('#wysihtml5-textarea').wysihtml5();
    }

    // =========================================================================
    // SUMMERNOTE
    // =========================================================================
    if($('#summernote-textarea').length){
        $('#summernote-textarea').summernote();
    }

    if($('.editable').length){
        $('.editable').summernote({
            height: 300,
            airMode: true
        });
    }

    // =========================================================================
    // JQUERY VALIDATION
    // =========================================================================

    if($('#basic-validate').length){

        $.mockjax({
            url: 'users.action',
            response: function(settings) {
                var user = settings.data.bv_username,
                    users = ["john", "peter", "bill", "jokowi"];
                this.responseText = "true";
                if ( $.inArray( user, users ) !== -1 ) {
                    this.responseText = 'false';
                }
            },
            responseTime: 500
        });

        $('#basic-validate').validate({
            rules:{
                bv_required:{
                    required:true
                },
                bv_email:{
                    required:true,
                    email: true
                },
                bv_date:{
                    required:true,
                    date: true
                },
                bv_url:{
                    required:true,
                    url: true
                },
                bv_username: {
                    required: true,
                    minlength: 2,
                    remote: "users.action"
                }
            },
            messages: {
                bv_email: {
                    remote: jQuery.validator.format("{0} is already in use")
                },
                bv_username: {
                    remote: jQuery.validator.format("{0} is already in use")
                }
            },
            highlight:function(element) {
                $(element).parents('.form-group').addClass('has-error has-feedback');
            },
            unhighlight: function(element) {
                $(element).parents('.form-group').removeClass('has-error');
            },
            submitHandler: function() {
                alert("submitted!");
            }
        });
    }

    if($('#number-validate').length){
        $('#number-validate').validate({
            rules:{
                nv_number:{
                    required:true,
                    number:true
                },
                nv_min:{
                    required: true,
                    min:5
                },
                nv_max:{
                    required:true,
                    max:5
                }
            },
            highlight:function(element) {
                $(element).parents('.form-group').addClass('has-error has-feedback');
            },
            unhighlight: function(element) {
                $(element).parents('.form-group').removeClass('has-error');
            },
            submitHandler: function() {
                alert("submitted!");
            }
        });
    }

    if($('#password-validate').length){
        $('#password-validate').validate({
            rules:{
                pv_password:{
                    required: true,
                    minlength:5,
                    maxlength:20
                },
                pv_password2:{
                    required:true,
                    minlength:5,
                    maxlength:20,
                    equalTo:"#pv_password"
                }
            },
            highlight:function(element) {
                $(element).parents('.form-group').addClass('has-error has-feedback');
            },
            unhighlight: function(element) {
                $(element).parents('.form-group').removeClass('has-error');
            },
            submitHandler: function() {
                alert("submitted!");
            }
        });
    }

    if($('#checkbox-radio-validate').length){
        $('#checkbox-radio-validate').validate({
            rules:{
                cr_gender:{
                    required: true
                },
                cr_skill:{
                    required:true,
                    minlength: 2
                }
            },
            highlight:function(element) {
                $(element).parents('.form-group').addClass('has-error has-feedback');
            },
            unhighlight: function(element) {
                $(element).parents('.form-group').removeClass('has-error');
            },
            submitHandler: function() {
                alert("submitted!");
            }
        });
    }

    if($('#select-validate').length){
        $('#select-validate').validate({
            rules:{
                sv_skill_programming:{
                    required: true
                },
                sv_position:{
                    required: true
                }
            },
            highlight:function(element) {
                $(element).parents('.form-group').addClass('has-error has-feedback');
            },
            unhighlight: function(element) {
                $(element).parents('.form-group').removeClass('has-error');
            },
            submitHandler: function() {
                alert("submitted!");
            }
        });
    }

    if($('#sample-validation-1').length){

        $.mockjax({
            url: 'emails.action2',
            response: function(settings) {
                var email = settings.data.sv1_email,
                    emails = ["jokowi@jk.co.id", "george@bush.gov", "bill@gates.com"];
                this.responseText = "true";
                if ( $.inArray( email, emails ) !== -1 ) {
                    this.responseText = 'false';
                }
            },
            responseTime: 500
        });

        $.mockjax({
            url: 'users.action2',
            response: function(settings) {
                var user = settings.data.sv1_username,
                    users = ["john", "peter", "bill", "jokowi"];
                this.responseText = "true";
                if ( $.inArray( user, users ) !== -1 ) {
                    this.responseText = 'false';
                }
            },
            responseTime: 500
        });

        $("#sample-validation-1").validate({
            rules: {
                sv1_firstname: "required",
                sv1_lastname: "required",
                sv1_username: {
                    required: true,
                    minlength: 2,
                    remote: "users.action2"
                },
                sv1_password: {
                    required: true,
                    minlength: 5
                },
                sv1_password_confirm: {
                    required: true,
                    minlength: 5,
                    equalTo: "#password"
                },
                sv1_email: {
                    required: true,
                    email: true,
                    remote: "emails.action2"
                },
                sv1_gender: "required",
                sv1_terms: "required"
            },
            messages: {
                sv1_firstname: "Enter your firstname",
                sv1_lastname: "Enter your lastname",
                sv1_username: {
                    required: "Enter a username",
                    minlength: jQuery.validator.format("Enter at least {0} characters"),
                    remote: jQuery.validator.format("{0} is already in use")
                },
                sv1_password: {
                    required: "Provide a password",
                    rangelength: jQuery.validator.format("Enter at least {0} characters")
                },
                sv1_password_confirm: {
                    required: "Repeat your password",
                    minlength: jQuery.validator.format("Enter at least {0} characters"),
                    equalTo: "Enter the same password as above"
                },
                sv1_email: {
                    required: "Please enter a valid email address",
                    minlength: "Please enter a valid email address",
                    remote: jQuery.validator.format("{0} is already in use")
                },
                sv1_gender: "Choose your gender",
                sv1_terms: "Please check our terms of use again"
            },
            highlight:function(element) {
                $(element).parents('.form-group').addClass('has-error has-feedback');
            },
            unhighlight: function(element) {
                $(element).parents('.form-group').removeClass('has-error');
            },
            submitHandler: function() {
                alert("submitted!");
            }
        });
    }

    if($('#sample-validation-2').length){
        $("#sample-validation-2").validate({
            rules: {
                sv2_company_name: "required",
                sv2_firstname: "required",
                sv2_lastname: "required",
                sv2_city: "required",
                sv2_state: "required",
                sv2_phone: {
                    required: true,
                    number: true
                },
                sv2_email: {
                    required: true,
                    email: true,
                    remote: "emails.action"
                },
                sv2_password: {
                    required: true,
                    minlength: 5
                },
                sv2_password_confirm: {
                    required: true,
                    minlength: 5,
                    equalTo: "#sv2_password"
                },
                sv2_credit_card: {
                    required: true,
                    minlength: 1
                },
                sv2_credit_card_number: {
                    required: true,
                    number: true
                }
            },
            messages: {
                sv2_company_name: "Enter your company name",
                sv2_firstname: "Enter your firstname",
                sv2_lastname: "Enter your lastname",
                sv2_city: "Enter your city",
                sv2_state: "Enter your state",
                sv2_phone: "Enter your phone number",
                sv2_username: {
                    required: "Enter a username",
                    minlength: jQuery.validator.format("Enter at least {0} characters")
                },
                sv2_email: {
                    required: "Please enter a valid email address",
                    minlength: "Please enter a valid email address"
                },
                sv2_password: {
                    required: "Provide a password",
                    rangelength: jQuery.validator.format("Enter at least {0} characters")
                },
                sv2_password_confirm: {
                    required: "Repeat your password",
                    minlength: jQuery.validator.format("Enter at least {0} characters"),
                    equalTo: "Enter the same password as above"
                },
                sv2_credit_card: {
                    required: "Choose your credit card",
                    minlength: jQuery.validator.format("Enter at least {0} credit card")
                },
                sv2_credit_card_number: {
                    required: "Please enter credit card number",
                    minlength: jQuery.validator.format("Enter at least {0} credit card")
                }
            },
            highlight:function(element) {
                $(element).parents('.form-group').addClass('has-error has-feedback');
            },
            unhighlight: function(element) {
                $(element).parents('.form-group').removeClass('has-error');
            },
            submitHandler: function() {
                alert("submitted!");
            }
        });
    }

    // =========================================================================
    // TWITTER BOOTSTRAP WIZARD
    // =========================================================================

    if($('#basic-wizard-horizontal').length){
        $('#basic-wizard-horizontal').bootstrapWizard();
    }

    if($('#basic-wizard-vertical').length){
        $('#basic-wizard-vertical').bootstrapWizard();
    }

    if($('#progress-wizard').length){
        $('#progress-wizard').bootstrapWizard({
            'nextSelector': '.next',
            'previousSelector': '.previous',
            onNext: function(tab, navigation, index) {
                var $total = navigation.find('li').length;
                var $current = index+1;
                var $percent = ($current/$total) * 100;
                jQuery('#progress-wizard').find('.progress-bar').css('width', $percent+'%');
            },
            onPrevious: function(tab, navigation, index) {
                var $total = navigation.find('li').length;
                var $current = index+1;
                var $percent = ($current/$total) * 100;
                jQuery('#progress-wizard').find('.progress-bar').css('width', $percent+'%');
            },
            onTabShow: function(tab, navigation, index) {
                var $total = navigation.find('li').length;
                var $current = index+1;
                var $percent = ($current/$total) * 100;
                jQuery('#progress-wizard').find('.progress-bar').css('width', $percent+'%');
            }
        });
    }

    if($('#disabled-tab-wizard').length){
        $('#disabled-tab-wizard').bootstrapWizard({onTabClick: function(tab, navigation, index) {
            alert('on tab click disabled');
            return false;
        }});
    }

    if($('#validation-wizard').length){
        var $validator = $("#form-wizard").validate({
            rules: {
                firstname: {
                    required: true,
                    minlength: 3
                },
                gender: {
                    required: true
                },
                productid: {
                    required: true
                },
                productname: {
                    required: true
                },
                category: {
                    required: true
                },
                creditcard: {
                    required: true
                },
                creditcardnumber: {
                    required: true,
                    number: true
                }
            },
            highlight:function(element) {
                $(element).parents('.form-group').addClass('has-error has-feedback');
            },
            unhighlight: function(element) {
                $(element).parents('.form-group').removeClass('has-error');
            },
            submitHandler: function() {
                alert("submitted!");
            }
        });
        $('#validation-wizard').bootstrapWizard({
            'onNext': function(tab, navigation, index) {
                var $valid = $("#form-wizard").valid();
                if(!$valid) {
                    $validator.focusInvalid();
                    return false;
                }
            },
            onTabClick: function(tab, navigation, index) {
                var $valid = $("#form-wizard").valid();
                if(!$valid) {
                    $validator.focusInvalid();
                    return false;
                }
            }
        });
    }

    // =========================================================================
    // TEXTAREA MAXLENGTH
    // =========================================================================
    if($('.character-limit').length){
        $('.character-limit').maxlength({
            alwaysShow: true,
            threshold: 20,
            warningClass: "label label-success",
            limitReachedClass: "label label-danger",
            separator: ' of ',
            preText: 'You have ',
            postText: ' chars remaining.',
            placement: 'centered-right'
        });
    }

    // =========================================================================
    // TEXTAREA AUTOSIZE
    // =========================================================================
    if($('.autosize').length){
        $('.autosize').autosize();
    }

});