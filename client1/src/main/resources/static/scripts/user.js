$(document)
		.ready(
				function() {

					var oTable = $('#listTable')
							.dataTable(
									{
										"bProcessing" : true,
										"bServerSide" : true,
										"sAjaxSource" : "/api/user/findEntries",
										"sDom" : "<'row'<'col-lg-6'l><'col-lg-6'p>>t<'row'<'col-lg-12'p>>r",
										"sPaginationType" : "bootstrap",
										"oLanguage" : {
											"sLengthMenu" : "Show _MENU_ entries"
										},
										"aoColumns" : [ {
											"mData" : "login"
										},  {
											"mData" : "login",
											"sName" : "login"
										},	{
											"mData" : "firstName",
											"sName" : "firstName"
										}, {
											"mData" : "lastName",
											"sName" : "lastName"
										}, {
											"mData" : "email",
											"sName" : "email"
										}

										],
										"aoColumnDefs" : [ {
											"aTargets" : [ 0 ],
											"mData" : null,
											"mRender" : function(data, type,
													full) {
												return '<a href="/dashboard/user/detail?id='
														+ data
														+ '"'
														+ 'class = "btn btn-warning" >'
														+ '<i class = "fa fa-pencil" > </i>'
														+ '</a>'
														+ ' '
														+ '<button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteConfirmationModal" data-id="'
														+ data
														+ '">'
														+ '<span style="display:none">'
														+ data
														+ '</span>'
														+ '<i class = "fa fa-trash" > </i>'
														+ '</button>';
											}
										} ],
										"fnDrawCallback" : function(oSettings) {

											// $(".delete-confirm").on(ace.click_event,
											// function() {
											// var deleteUrl =
											// "/dashboard/client/delete?id="+$(this).find('span').text();
											// bootbox.confirm('<spring:message
											// code="delete_confirmation" />',
											// function(result) {
											// if (result) {
											// window.location = deleteUrl;
											// }
											// })
											// })

										}
									});

					oTable.parent().addClass('table-responsive');

					$('#deleteConfirmationModal').on(
							'show.bs.modal',
							function(event) {
								var button = $(event.relatedTarget);
								var id = button.data('id');
								var modal = $(this);
								var deleteUrl = modal.find('.modal-footer > a')
										.attr('href');
								modal.find('.modal-title').text(
										'Confirm Delete for ID: ' + id);
								modal.find('.modal-footer > a').attr('href',
										deleteUrl + id);
							})

				});