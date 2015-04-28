/* ==========================================================================
 * Plugins used: flot chart, chartjs chart
 * ---------------------------------------------------------------------------
 * TABLE OF CONTENT
 * ---------------------------------------------------------------------------
 * - FLOT CHART / BASIC
 * - FLOT CHART / BAR
 * - FLOT CHART / PIE
 * - FLOT CHART / REAL TIME UPDATE
 * ----------------------------------------------------------------------------
 * - CHARTJS CHART / BAR
 * - CHARTJS CHART / DOUGHNUT
 * - CHARTJS CHART / LINE
 * - CHARTJS CHART / PIE
 * - CHARTJS CHART / POLAR AREA
 * - CHARTJS CHART / RADAR

 ============================================================================ */

$(document).ready(function(){

    // =========================================================================
    // FLOT CHART / BASIC
    // =========================================================================

    function showTooltip(x, y, contents) {
        jQuery('<div id="tooltip" class="tooltipflot">' + contents + '</div>').css( {
            position: 'absolute',
            display: 'none',
            top: y + 5,
            left: x + 5
        }).appendTo("body").fadeIn(200);
    }

    if($('#flot-basic-chart').length){
        var series1 = [[0, 10], [1, 6], [2,3], [3, 8], [4, 5], [5, 13], [6, 8]];
        var series2 = [[0, 5], [1, 4], [2,4], [3, 1], [4, 9], [5, 10], [6, 13]];

        var plot = $.plot($("#flot-basic-chart"),
            [ { data: series1,
                label: "Series 1",
                color: "#E9573F"
            },
                { data: series2,
                    label: "Series 2",
                    color: "#00B1E1"
                }
            ],
            {
                series: {
                    lines: {
                        show: true,
                        fill: true,
                        lineWidth: 1,
                        fillColor: {
                            colors: [ { opacity: 0.5 },
                                { opacity: 0.5 }
                            ]
                        }
                    },
                    points: {
                        show: true
                    },
                    shadowSize: 0
                },
                legend: {
                    position: 'nw'
                },
                grid: {
                    hoverable: true,
                    clickable: true,
                    borderColor: '#ddd',
                    borderWidth: 1,
                    labelMargin: 10,
                    backgroundColor: '#fff'
                },
                yaxis: {
                    min: 0,
                    max: 15,
                    color: '#eee'
                },
                xaxis: {
                    color: '#eee'
                }
            });

        var previousPoint = null;
        $("#flot-basic-chart").bind("plothover", function (event, pos, item) {
            $("#x").text(pos.x.toFixed(2));
            $("#y").text(pos.y.toFixed(2));

            if(item) {
                if (previousPoint != item.dataIndex) {
                    previousPoint = item.dataIndex;

                    $("#tooltip").remove();
                    var x = item.datapoint[0].toFixed(2),
                        y = item.datapoint[1].toFixed(2);

                    showTooltip(item.pageX, item.pageY,
                        item.series.label + " of " + x + " = " + y);
                }

            } else {
                $("#tooltip").remove();
                previousPoint = null;
            }

        });

        $("#flot-basic-chart").bind("plotclick", function (event, pos, item) {
            if (item) {
                plot.highlight(item.series, item.datapoint);
            }
        });
    }

    // =========================================================================
    // FLOT CHART / BAR
    // =========================================================================
    if($('#flot-bar-chart').length){
        var bardata = [ ["Jan", 5], ["Feb", 20], ["Mar", 18], ["Apr", 8], ["May", 13], ["Jun", 24], ["Jul", 22], ["Aug", 20], ["Sep", 10], ["Oct", 5], ["Nov", 8], ["Dec", 15] ];

        $.plot("#flot-bar-chart", [ bardata ], {
            series: {
                lines: {
                    lineWidth: 1
                },
                bars: {
                    show: true,
                    barWidth: 0.5,
                    align: "center",
                    lineWidth: 0,
                    fillColor: "#81b71a"
                }
            },
            grid: {
                borderColor: '#ddd',
                borderWidth: 1,
                labelMargin: 10
            },
            xaxis: {
                mode: "categories",
                tickLength: 0
            }
        });
    }

    // =========================================================================
    // FLOT CHART / PIE
    // =========================================================================
    if($('#flot-pie-chart').length){
        var piedata = [
            { label: "Series 1", data: [[1,40]], color: '#37BC9B'},
            { label: "Series 2", data: [[1,20]], color: '#8CC152'},
            { label: "Series 3", data: [[1,50]], color: '#00B1E1'},
            { label: "Series 4", data: [[1,90]], color: '#E9573F'},
            { label: "Series 5", data: [[1,80]], color: '#906094'}
        ];

        function labelFormatter(label, series) {
            return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>";
        }

        $.plot('#flot-pie-chart', piedata, {
            series: {
                pie: {
                    show: true,
                    radius: 1,
                    label: {
                        show: true,
                        radius: 2/3,
                        formatter: labelFormatter,
                        threshold: 0.1
                    }
                }
            },
            grid: {
                hoverable: true,
                clickable: true
            }
        });

    }

    // =========================================================================
    // FLOT CHART / REAL TIME UPDATE
    // =========================================================================
    if($('#flot-realtime-chart').length){
        var data = [], totalPoints = 50;

        function getRandomData() {

            if (data.length > 0)
                data = data.slice(1);

            // Do a random walk
            while (data.length < totalPoints) {

                var prev = data.length > 0 ? data[data.length - 1] : 50,
                    y = prev + Math.random() * 10 - 5;

                if (y < 0) {
                    y = 0;
                } else if (y > 100) {
                    y = 100;
                }
                data.push(y);
            }

            // Zip the generated y values with the x values
            var res = [];
            for (var i = 0; i < data.length; ++i) {
                res.push([i, data[i]])
            }
            return res;
        }


        // Set up the control widget
        var updateInterval = 1000;

        var plot4 = $.plot("#flot-realtime-chart", [ getRandomData() ], {
            colors: ["#F6BB42"],
            series: {
                lines: {
                    fill: true,
                    lineWidth: 0
                },
                shadowSize: 0	// Drawing is faster without shadows
            },
            grid: {
                borderColor: '#ddd',
                borderWidth: 1,
                labelMargin: 10
            },
            xaxis: {
                color: '#eee'
            },
            yaxis: {
                min: 0,
                max: 100,
                color: '#eee'
            }
        });

        function update() {

            plot4.setData([getRandomData()]);

            // Since the axes don't change, we don't need to call plot.setupGrid()
            plot4.draw();
            setTimeout(update, updateInterval);
        }

        update();
    }

    // =========================================================================
    // CHARTJS CHART / BAR
    // =========================================================================

    if($('#chartjs-bar-chart').length){
        var barChartData = {
            labels : ["January","February","March","April","May","June","July"],
            datasets : [
                {
                    fillColor : "#E9573F",
                    strokeColor : "#f55b43",
                    data : [65,59,90,81,56,55,40]
                },
                {
                    fillColor : "#00B1E1",
                    strokeColor : "#00c3f4",
                    data : [28,48,40,19,96,27,100]
                }
            ]

        }

        var myLine = new Chart(document.getElementById("chartjs-bar-chart").getContext("2d")).Bar(barChartData);
    }

    // =========================================================================
    // CHARTJS CHART / DOUGHNUT
    // =========================================================================

    if($('#chartjs-doughnut-chart').length){
        var doughnutData = [
            {
                value: 20,
                color:"#37BC9B"
            },
            {
                value : 70,
                color : "#8CC152"
            },
            {
                value : 50,
                color : "#00B1E1"
            },
            {
                value : 40,
                color : "#E9573F"
            },
            {
                value : 90,
                color : "#F6BB42"
            }

        ];

        var myDoughnut = new Chart(document.getElementById("chartjs-doughnut-chart").getContext("2d")).Doughnut(doughnutData);
    }

    // =========================================================================
    // CHARTJS CHART / LINE
    // =========================================================================

    if($('#chartjs-line-chart').length){
        var lineChartData = {
            labels : ["January","February","March","April","May","June","July"],
            datasets : [
                {
                    fillColor : "#F6BB42",
                    pointColor : "rgba(220,220,220,1)",
                    pointStrokeColor : "#fff",
                    data : [30,60,90,120,150,180,210]
                },
                {
                    fillColor : "#8D8D6E",
                    pointColor : "rgba(151,187,205,1)",
                    pointStrokeColor : "#fff",
                    data : [20,40,60,80,90,110,130]
                }
            ]

        }

        var myLine = new Chart(document.getElementById("chartjs-line-chart").getContext("2d")).Line(lineChartData);
    }

    // =========================================================================
    // CHARTJS CHART / PIE
    // =========================================================================

    if($('#chartjs-pie-chart').length){
        var pieData = [
            {
                value: 30,
                color:"#8CC152"
            },
            {
                value : 40,
                color : "#E9573F"
            },
            {
                value : 50,
                color : "#F6BB42"
            }

        ];

        var myPie = new Chart(document.getElementById("chartjs-pie-chart").getContext("2d")).Pie(pieData);
    }

    // =========================================================================
    // CHARTJS CHART / POLAR AREA
    // =========================================================================

    if($('#chartjs-polararea-chart').length){
        var chartData = [
            {
                value : Math.random(),
                color: "#D97041"
            },
            {
                value : Math.random(),
                color: "#C7604C"
            },
            {
                value : Math.random(),
                color: "#21323D"
            },
            {
                value : Math.random(),
                color: "#9D9B7F"
            },
            {
                value : Math.random(),
                color: "#7D4F6D"
            },
            {
                value : Math.random(),
                color: "#584A5E"
            }
        ];
        var myPolarArea = new Chart(document.getElementById("chartjs-polararea-chart").getContext("2d")).PolarArea(chartData);
    }

    // =========================================================================
    // CHARTJS CHART / RADAR
    // =========================================================================

    if($('#chartjs-radar-chart').length){
        var radarChartData = {
            labels : ["Eating","Drinking","Sleeping","Designing","Coding","Partying","Running"],
            datasets : [
                {
                    fillColor : "rgba(220,220,220,0.5)",
                    strokeColor : "rgba(220,220,220,1)",
                    pointColor : "rgba(220,220,220,1)",
                    pointStrokeColor : "#fff",
                    data : [65,59,90,81,56,55,40]
                },
                {
                    fillColor : "rgba(151,187,205,0.5)",
                    strokeColor : "rgba(151,187,205,1)",
                    pointColor : "rgba(151,187,205,1)",
                    pointStrokeColor : "#fff",
                    data : [28,48,40,19,96,27,100]
                }
            ]

        }

        var myRadar = new Chart(document.getElementById("chartjs-radar-chart").getContext("2d")).Radar(radarChartData,{scaleShowLabels : false, pointLabelFontSize : 10});
    }

});