$(document).ready(
		function() {

			$.ajax({
				url : "/api/dashboard/keywords",
				processData : false,
				type : 'GET',
				contentType : 'application/json',
				success : function(response) {

					for (var i = 0; i < response.length; i++) {

						var keywordName = response[i].name;
						generateKeywordDiv(keywordName, i);

						var keywordRequest = {
							"keyword" : keywordName,
							"onlineMediaList" : [ "kompas.com", "detik.com",
									"liputan6.com", "tribunnews.com",
									"merdeka.com" ],
							"lastPublishedDate" : "2014-12-01"
						};

						generateColumnBarChart(keywordRequest, i);
						generatePieChart(keywordRequest, i);
						generateLineChart(keywordRequest, i);
					}

				}
			});

			// generateKeywordDiv('Jokowi');
			//
			// // BEGIN Initial display
			// var keywordRequest = {
			// "keyword" : "Jokowi",
			// "onlineMediaList" : [ "kompas.com", "detik.com",
			// "liputan6.com", "tribunnews.com", "merdeka.com" ],
			// "lastPublishedDate" : "2014-12-01"
			// };
			//
			// generateColumnBarChart(keywordRequest);
			// generatePieChart(keywordRequest);
			// generateLineChart(keywordRequest);
			// // END Initial display

			$('#lastPublishedDateInput').datepicker({
				format : "yyyy-mm-dd",
				autoclose : true
			});

		});

function generateKeywordDiv(keywordName, i) {

	$('#keywordHolder').append(
			'<div class="panel panel-default">' + '<div class="panel-heading">'
					+ '<div class="pull-left">' + '<h3 class="panel-title">'
					+ '<i class="fa fa-key"></i> '
					+ keywordName
					+ '</h3>'
					+ '</div>'
					+ '<div class="clearfix"></div>'
					+ '</div>'
					+ '<!-- /.panel-heading -->'
					+ '<div id="media-reach-body" class="panel-body">'
					+ '<div class="row">'
					+ '<div class="col-md-4">'
					+ '<div id="chartAnalyticsMediaReach1'
					+ i
					+ '" style="margin: 0 auto"></div>'
					+ '</div>'
					+ '<div class="col-md-4">'
					+ '<div id="chartAnalyticsMediaReach2'
					+ i
					+ '" style="margin: 0 auto"></div>'
					+ '</div>'
					+ '<div class="col-md-4">'
					+ '<div id="chartAnalyticsBuzzTrends'
					+ i
					+ '" style="margin: 0 auto"></div>'
					+ '</div>'
					+ '</div>'
					+ '</div>' + '<!-- /.panel-body -->' + '</div>');
}

function generateColumnBarChart(keywordRequest, i) {

	var highChartSeriesList = null;

	var keywordRequestJson = JSON.stringify(keywordRequest);

	$.ajax({
		url : "/api/mediareach/columnBar",
		data : keywordRequestJson,
		processData : false,
		type : 'POST',
		contentType : 'application/json',
		success : function(highChartResponse) {

			$('#chartAnalyticsMediaReach2' + i).highcharts({
				chart : {
					type : 'column'
				},
				title : {
					text : 'Total mentions'
				},
				subtitle : {
					text : 'by media types'
				},
				xAxis : {
					categories : highChartResponse.categories
				},
				yAxis : {
					min : 0,
					title : {
						text : ''
					}
				},
				credits : {
					enabled : false
				},
				series : highChartResponse.highChartSeriesList
			});

		}
	});

}

function generatePieChart(keywordRequest, i) {

	var highChartSeriesList = null;

	var keywordRequestJson = JSON.stringify(keywordRequest);

	$
			.ajax({
				url : "/api/mediareach/pie",
				data : keywordRequestJson,
				processData : false,
				type : 'POST',
				contentType : 'application/json',
				success : function(highChartResponse) {

//					$('#mentions-table > div').html('');
//
//					var total = 0;
//					for (var i = 0; i < highChartResponse.length; i++) {
//
//						$('#mentions-table > div')
//								.append(
//										'<div>'
//												+ '<span class="btn btn-primary disabled">'
//												+ highChartResponse[i][0]
//												+ '</span>' + '<h4>'
//												+ highChartResponse[i][1]
//												+ '</h4>' + '</div>');
//
//						total = total + highChartResponse[i][1];
//
//					}
//
//					$('#mentions-table > div')
//							.append(
//									'<div>'
//											+ '<span class="btn btn-primary disabled">Total</span>'
//											+ '<h4>' + total + '</h4><div>');

					$('#chartAnalyticsMediaReach1' + i)
							.highcharts(
									{
										chart : {
											plotBackgroundColor : null,
											plotBorderWidth : null,
											plotShadow : false
										},
										title : {
											text : "Media's shares"
										},
										subtitle : {
											text : 'of the total mentions'
										},
										tooltip : {
											pointFormat : '{series.name}: <b>{point.percentage:.1f}%</b>'
										},
										plotOptions : {
											pie : {
												allowPointSelect : true,
												cursor : 'pointer',
												dataLabels : {
													enabled : false
												},
												showInLegend : true
											}
										},
										credits : {
											enabled : false
										},
										series : [ {
											type : 'pie',
											name : 'Browser share',
											data : highChartResponse
										} ]
									});

				} // success : function(highChartResponse) {
			}); // $.ajax({

}

function generateLineChart(keywordRequest, i) {

	var highChartSeriesList = null;

	var keywordRequestJson = JSON.stringify(keywordRequest);

	$.ajax({
		url : "/api/buzztrends/line",
		data : keywordRequestJson,
		processData : false,
		type : 'POST',
		contentType : 'application/json',
		success : function(highChartResponse) {

			$('#chartAnalyticsBuzzTrends' + i).highcharts({
				title : {
					text : 'The trends of total mentions',
					x : -20
				},
				subtitle : {
					text : 'by media types',
					x : -20
				},
				xAxis : {
					categories : highChartResponse.categories
				},
				plotOptions : {
					line : {
						marker : {
							enabled : false
						}
					}
				},
				yAxis : {
					min : 0,
					title : {
						text : ''
					}
				},
				credits : {
					enabled : false
				},
				series : highChartResponse.highChartSeriesList
			});
		}
	});

}

function buildKeywordRequest() {

	var jsonArr = [];
	var keywordRequest = {};
	keywordRequest.keyword = $('#keywordInput').val();

	$('#formOnlineMedia input:checkbox:checked').each(function(key, value) {

		var onlineMediaName = $(this).attr('id');
		onlineMediaName = onlineMediaName.substring(3, onlineMediaName.length);

		jsonArr.push(onlineMediaName);

	});

	keywordRequest.onlineMediaList = jsonArr;
	keywordRequest.lastPublishedDate = $('#lastPublishedDateInput').val();

	return keywordRequest;

}