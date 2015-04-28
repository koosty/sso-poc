/* ==========================================================================
 * TABLE OF CONTENT
 * ==========================================================================
 * - GRITTER NOTIFICATION
 * - VISITOR CHART & SERVER STATUS
 * - REAL TIME STATUS
 * - DEMO COUNT NUMBER
 * --------------------------------------------------------------------------
 * Plugins used : Flot chart, Gritter notification
 ============================================================================ */

$(document).ready(function(){
    // =========================================================================
    // GRITTER NOTIFICATION
    // =========================================================================
    // display marketing alert only once
    if (!$.cookie('intro')) {

        // Gritter notification intro 1
//        setTimeout(function () {
//            var unique_id = $.gritter.add({
//                // (string | mandatory) the heading of the notification
//                title: 'Welcome to Blankon',
//                // (string | mandatory) the text inside the notification
//                text: 'Blankon is a theme fullpack admin template powered by Twitter bootstrap 3 front-end framework.',
//                // (string | optional) the image to display on the left
//                image: '../../../assets/global/img/avatar/50/1.png',
//                // (bool | optional) if you want it to fade out on its own or just sit there
//                sticky: false,
//                // (int | optional) the time you want it to be alive for before fading out
//                time: ''
//            });
//
//            // You can have it return a unique id, this can be used to manually remove it later using
//            setTimeout(function () {
//                $.gritter.remove(unique_id, {
//                    fade: true,
//                    speed: 'slow'
//                });
//            }, 12000);
//        }, 5000);

//        // Gritter notification intro 2
//        setTimeout(function () {
//            var unique_id = $.gritter.add({
//                // (string | mandatory) the heading of the notification
//                title: 'Playing sounds',
//                // (string | mandatory) the text inside the notification
//                text: 'Blankon made for playing small sounds, will help you with this task. Please make your sound system is active',
//                // (string | optional) the image to display on the left
//                image: '../../../assets/global/img/avatar/50/1.png',
//                // (bool | optional) if you want it to fade out on its own or just sit there
//                sticky: false,
//                // (int | optional) the time you want it to be alive for before fading out
//                time: ''
//            });
//
//            // You can have it return a unique id, this can be used to manually remove it later using
//            setTimeout(function () {
//                $.gritter.remove(unique_id, {
//                    fade: true,
//                    speed: 'slow'
//                });
//            }, 13000);
//        }, 8000);

        // Set cookie intro
        $.cookie('intro',1, {expires: 1});
    }

    // =========================================================================
    // VISITOR CHART & SERVER STATUS
    // =========================================================================
    if($('#visitor-chart').length){
        $.plot("#visitor-chart", [{
            label: "New Visitor",
            color: "rgba(0, 177, 225, 0.35)",
            data: [
                ["Jan", 450],
                ["Feb", 532],
                ["Mar", 367],
                ["Apr", 245],
                ["May", 674],
                ["Jun", 897],
                ["Jul", 745]
            ]
        }, {
            label: "Old Visitor",
            color: "rgba(233, 87, 63, 0.36)",
            data: [
                ["Jan", 362],
                ["Feb", 452],
                ["Mar", 653],
                ["Apr", 756],
                ["May", 670],
                ["Jun", 352],
                ["Jul", 243]
            ]
        }], {
            series: {
                lines: { show: false },
                splines: {
                    show: true,
                    tension: 0.4,
                    lineWidth: 2,
                    fill: 0.5
                },
                points: {
                    show: true,
                    radius: 4
                }
            },
            grid: {
                borderColor: "transparent",
                borderWidth: 0,
                hoverable: true,
                backgroundColor: "transparent"
            },
            tooltip: true,
            tooltipOpts: { content: "%x : %y" + " People" },
            xaxis: {
                tickColor: "transparent",
                mode: "categories"
            },
            yaxis: { tickColor: "transparent" },
            shadowSize: 0
        });
    }

    // =========================================================================
    // REAL TIME STATUS
    // =========================================================================
    if($('#realtime-status-chart').length){
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

        var plot4 = $.plot("#realtime-status-chart", [ getRandomData() ], {
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
    // DEMO COUNT NUMBER
    // =========================================================================
    $.fn.digits = function(){
        return this.each(function(){
            $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") );
        })
    };
    function counter($selector){
        $({countNum: $('.counter-' + $selector).text()}).animate({countNum: $('.counter-' + $selector).data('counter')}, {
            duration: 8000,
            easing:'linear',
            step: function() {
                $('.counter-' + $selector).text(Math.floor(this.countNum)).digits();
            },
            complete: function() {
                $('.counter-' + $selector).text(this.countNum).digits();
            }
        });
    };
    counter('visit');
    counter('unique');
    counter('page');

});