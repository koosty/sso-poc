/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$.fn.dataTableExt.oApi.fnMultiFilter = function(oSettings, oData) {
    for (var key in oData)
    {
        if (oData.hasOwnProperty(key))
        {
            for (var i = 0, iLen = oSettings.aoColumns.length; i < iLen; i++)
            {
                if (oSettings.aoColumns[i].sName == key)
                {
                    /* Add single column filter */
                    oSettings.aoPreSearchCols[ i ].sSearch = oData[key];
                    break;
                }
            }
        }
    }
    this.oApi._fnReDraw(oSettings);
};

