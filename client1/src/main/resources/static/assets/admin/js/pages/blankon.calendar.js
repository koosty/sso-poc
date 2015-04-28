/* ==========================================================================
 * Plugins used: bootstrap calendar, chosen select
 ============================================================================ */

(function($) {

    "use strict";

    var options = {
        events_source: '../../../assets/global/plugins/bootstrap-calendar/calendar-events-sample.json',
        view: 'month',
        tmpl_path: '../../../assets/global/plugins/bootstrap-calendar/tmpls/',
        tmpl_cache: false,
        day: '2013-03-12',
        onAfterEventsLoad: function(events) {
            if(!events) {
                return;
            }
            var list = $('#eventlist');
            list.html('');

            $.each(events, function(key, val) {
                $(document.createElement('li'))
                    .html('<a href="' + val.url + '"><i class="fa fa-calendar mr-10"></i> ' + val.title + '</a>')
                    .appendTo(list);
            });
        },
        onAfterViewLoad: function(view) {
            $('.page-header h4').text(this.getTitle());
            $('button').removeClass('active');
            $('.calendar-menu-mobile ul li').removeClass('active');
            $('button[data-calendar-view="' + view + '"]').addClass('active');
            $('a[data-calendar-view="' + view + '"]').parent('li').addClass('active');
        },
        classes: {
            months: {
                general: 'label'
            }
        }
    };

    var calendar = $('#calendar').calendar(options);

    $('[data-calendar-nav]').each(function() {
        var $this = $(this);
        $this.click(function() {
            calendar.navigate($this.data('calendar-nav'));
        });
    });

    $('[data-calendar-view]').each(function() {
        var $this = $(this);
        $this.click(function() {
            calendar.view($this.data('calendar-view'));
        });
    });

    $('#language').change(function(){
        calendar.setLanguage($(this).val());
        calendar.view();
    });

    $('#events-in-modal').change(function(){
        var val = $(this).is(':checked') ? $(this).val() : null;
        calendar.setOptions({modal: val});
    });
    $('#events-modal .modal-header, #events-modal .modal-footer').click(function(e){
        //e.preventDefault();
        //e.stopPropagation();
    });

    // =========================================================================
    // CHOSEN SELECT
    // =========================================================================
    $('.chosen-select').chosen();
}(jQuery));