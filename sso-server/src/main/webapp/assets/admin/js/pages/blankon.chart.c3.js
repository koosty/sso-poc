/* ==========================================================================
 * Plugins used: c3js chart
 * --------------------------------------------------------------------------
 * TABLE OF CONTENT
 * --------------------------------------------------------------------------
 * - C3JS CHART / LINE
 * - C3JS CHART / BAR
 * - C3JS CHART / AREA
 * - C3JS CHART / STACKED
 * - C3JS CHART / PIE
 * - C3JS CHART / DONUT
 * - C3JS CHART / COMBINATION
 ============================================================================ */

// =========================================================================
// C3JS CHART / LINE
// =========================================================================
$(function () {
    var chart = c3.generate({
        bindto: '#c3js-line-chart',
        data: {
            columns: [
                ['data1', 30, 200, 100, 400, 150, 250],
                ['data2', 50, 20, 10, 40, 15, 25]
            ]
        },
        regions: [
            {start:4, end:5, class:'danger'}
        ],
        color: {
            pattern: ['#E9573F', '#00B1E1']
        }
    });

    setTimeout(function () {
        chart.load({
            columns: [
                ['data1', 230, 190, 300, 500, 300, 400]
            ]
        });
    }, 1000);

    setTimeout(function () {
        chart.load({
            columns: [
                ['data3', 130, 150, 200, 300, 200, 100]
            ]
        });
    }, 1500);

    setTimeout(function () {
        chart.unload('data1');
    }, 2000);
});

// =========================================================================
// C3JS CHART / BAR
// =========================================================================
$(function () {
    var chart = c3.generate({
        bindto: '#c3js-bar-chart',
        data: {
            columns: [
                ['data1', 30, 200, 100, 400, 150, 250],
                ['data2', 130, 100, 140, 200, 150, 50]
            ],
            type: 'bar'
        },
        color: {
            pattern: ['#E9573F', '#00B1E1', '#37BC9B']
        },
        bar: {
            width: {
                ratio: 0.5 // this makes bar width 50% of length between ticks
            }
            // or
            //width: 100 // this makes bar width 100px
        }
    });

    setTimeout(function () {
        chart.load({
            columns: [
                ['data3', 130, -150, 200, 300, -200, 100]
            ]
        });
    }, 1000);
});

// =========================================================================
// C3JS CHART / AREA
// =========================================================================
$(function () {
    var chart = c3.generate({
        bindto: '#c3js-area-chart',
        data: {
            columns: [
                ['data1', 300, 350, 300, 0, 0, 0],
                ['data2', 130, 100, 140, 200, 150, 50]
            ],
            types: {
                data1: 'area',
                data2: 'area-spline'
            }
        },
        color: {
            pattern: ['#E9573F', '#00B1E1', '#37BC9B']
        }
    });
});

// =========================================================================
// C3JS CHART / STACKED
// =========================================================================
$(function () {
    var chart = c3.generate({
        bindto: '#c3js-stacked-chart',
        data: {
            columns: [
                ['data1', -30, 200, 200, 400, -150, 250],
                ['data2', 130, 100, -100, 200, -150, 50],
                ['data3', -230, 200, 200, -300, 250, 250]
            ],
            type: 'bar',
            groups: [
                ['data1', 'data2']
            ]
        },
        color: {
            pattern: ['#E9573F', '#00B1E1', '#37BC9B', '#906094']
        },
        grid: {
            y: {
                lines: [{value:0}]
            }
        }
    });

    setTimeout(function () {
        chart.groups([['data1', 'data2', 'data3']])
    }, 1000);

    setTimeout(function () {
        chart.load({
            columns: [['data4', 100, -50, 150, 200, -300, -100]]
        });
    }, 1500);

    setTimeout(function () {
        chart.groups([['data1', 'data2', 'data3', 'data4']])
    }, 2000);
});

// =========================================================================
// C3JS CHART / PIE
// =========================================================================
$(function () {
    var chart = c3.generate({
        bindto: '#c3js-pie-chart',
        data: {
            // iris data from R
            columns: [
                ['data1', 30],
                ['data2', 120]
            ],
            type : 'pie'
        },
        color: {
            pattern: ['#E9573F', '#00B1E1', '#37BC9B']
        },
        pie: {
            onclick: function (d, i) { console.log(d, i); },
            onmouseover: function (d, i) { console.log(d, i); },
            onmouseout: function (d, i) { console.log(d, i); }
        }
    });

    setTimeout(function () {
        chart.load({
            columns: [
                ["Internet Explorer", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
                ["Mozilla Firefox", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
                ["Google Chrome", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8]
            ]
        });
    }, 1500);

    setTimeout(function () {
        chart.unload('data1');
        chart.unload('data2');
    }, 2500);
});

// =========================================================================
// C3JS CHART / DONUT
// =========================================================================
$(function () {
    var chart = c3.generate({
        bindto: '#c3js-donut-chart',
        data: {
            columns: [
                ['data1', 30],
                ['data2', 120]
            ],
            type : 'donut'
        },
        color: {
            pattern: ['#E9573F', '#00B1E1', '#37BC9B']
        },
        donut: {
            title: "Smartphone market",
            onclick: function (d, i) { console.log(d, i); },
            onmouseover: function (d, i) { console.log(d, i); },
            onmouseout: function (d, i) { console.log(d, i); }
        }
    });

    setTimeout(function () {
        chart.load({
            columns: [
                ["Blackberry", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
                ["Android", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
                ["Iphone", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8]
            ]
        });
    }, 1500);

    setTimeout(function () {
        chart.unload('data1');
        chart.unload('data2');
    }, 2500);
});

// =========================================================================
// C3JS CHART / COMBINATION
// =========================================================================
$(function () {
    var chart = c3.generate({
        bindto: '#c3js-combination-chart',
        data: {
            columns: [
                ['data1', 30, 20, 50, 40, 60, 50],
                ['data2', 200, 130, 90, 240, 130, 220],
                ['data3', 300, 200, 160, 400, 250, 250],
                ['data4', 200, 130, 90, 240, 130, 220],
                ['data5', 130, 120, 150, 140, 160, 150]
            ],
            types: {
                data1: 'bar',
                data2: 'bar',
                data3: 'spline',
                data4: 'line',
                data5: 'bar'
            },
            groups: [
                ['data1','data2']
            ]
        },
        color: {
            pattern: ['#E9573F', '#00B1E1', '#37BC9B', '#906094']
        },
        axis: {
            x: {
                type: 'categorized'
            }
        }
    });
});