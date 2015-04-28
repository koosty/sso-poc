/* ==========================================================================
 * Plugins used: ion.rangeSlider
 * ---------------------------------------------------------------------------
 * TABLE OF CONTENT
 * - BASIC SLIDER
 * - CONTEXTUAL CLASSES SLIDER
 * - SKIN SLIDER
 ============================================================================ */

$(document).ready(function(){

    // =========================================================================
    // BASIC SLIDER
    // =========================================================================
    $("#slider-1").ionRangeSlider({
        min: 0,
        max: 10,
        from: 1
    });
    $("#slider-2").ionRangeSlider({
        min: 0,
        max: 10,
        from: 1,
        type: 'single',
        prefix: "$",
        maxPostfix: "+",
        prettify: false
    });
    $("#slider-3").ionRangeSlider({
        values: [
            "January", "February",
            "March", "April",
            "May", "June",
            "July", "August",
            "September", "October",
            "November", "December"
        ],
        type: 'single',
        from: 1
    });
    $("#slider-4").ionRangeSlider({
        min: 0,
        max: 10,
        from: 1,
        type: 'single',
        step: 0.1,
        postfix: " carats",
        prettify: false
    });

    // =========================================================================
    // CONTEXTUAL CLASSES SLIDER
    // =========================================================================
    $("#default-slider").ionRangeSlider({
        min: 0,
        max: 10,
        from: 1
    });
    $("#primary-slider").ionRangeSlider({
        min: 0,
        max: 10,
        from: 2
    });
    $("#success-slider").ionRangeSlider({
        min: 0,
        max: 10,
        from: 3,
        type: 'single'

    });
    $("#info-slider").ionRangeSlider({
        min: 0,
        max: 10,
        from: 4
    });
    $("#warning-slider").ionRangeSlider({
        min: 0,
        max: 10,
        from: 5
    });
    $("#danger-slider").ionRangeSlider({
        min: 0,
        max: 10,
        from: 6
    });
    $("#lilac-slider").ionRangeSlider({
        min: 0,
        max: 10,
        from: 7
    });
    $("#teal-slider").ionRangeSlider({
        min: 0,
        max: 10,
        from: 6
    });
    $("#inverse-slider").ionRangeSlider({
        min: 0,
        max: 10,
        from: 5
    });

    // =========================================================================
    // SKIN SLIDER
    // =========================================================================
    $("#type-slider-1").ionRangeSlider({
        min: 0,
        max: 10,
        from: 3
    });
    $("#type-slider-2").ionRangeSlider({
        min: 0,
        max: 10,
        from: 6
    });
    $("#type-slider-3").ionRangeSlider({
        min: 0,
        max: 10,
        from: 3
    });

});