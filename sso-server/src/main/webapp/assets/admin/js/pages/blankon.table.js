/* ==========================================================================
 * Plugins used: datatable
 * ---------------------------------------------------------------------------
 * TABLE OF CONTENT
 * - DATATABLE
 * - USING AJAX
 * - USING DOM
 ============================================================================ */

'use strict';
$(document).ready(function(){

    // =========================================================================
    // DATATABLE
    // =========================================================================
    var responsiveHelperAjax = undefined;
    var responsiveHelperDom = undefined;
    var breakpointDefinition = {
        tablet: 1024,
        phone : 480
    };

    var tableAjax = $('#datatable-ajax');
    var tableDom = $('#datatable-dom');

    // =========================================================================
    // USING AJAX
    // =========================================================================
    tableAjax.dataTable({
        autoWidth      : false,
        ajax           : '/assets/global/plugins/datatables/datatable-sample.json',
        preDrawCallback: function () {
            // Initialize the responsive datatables helper once.
            if (!responsiveHelperAjax) {
                responsiveHelperAjax = new ResponsiveDatatablesHelper(tableAjax, breakpointDefinition);
            }
        },
        rowCallback    : function (nRow) {
            responsiveHelperAjax.createExpandIcon(nRow);
        },
        drawCallback   : function (oSettings) {
            responsiveHelperAjax.respond();
        }
    });

    // =========================================================================
    // USING DOM
    // =========================================================================
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