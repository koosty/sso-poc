<jsp:directive.include file="includes/top.jsp" />
<!--

    |=========================================================================================================================|
	|  TABLE OF CONTENTS (Use search to find needed section)                                                                  |
	|=========================================================================================================================|
    |  01. @HEAD                        |  Container for all the head elements                                                |
	|  02. @META SECTION                |  The meta tag provides metadata about the HTML document                             |
	|  03. @FAVICONS                    |  Short for favorite icon, shortcut icon, website icon, tab icon or bookmark icon    |
	|  04. @FONT STYLES                 |  Font from google fonts                                                             |
	|  05. @GLOBAL MANDATORY STYLES     |  The main 3rd party plugins css file                                                |
	|  06. @PAGE LEVEL STYLES           |  Specific 3rd party plugins css file                                                |
	|  07. @THEME STYLES                |  The main theme css file                                                            |
	|  08. @IE SUPPORT                  |  IE support of HTML5 elements and media queries                                     |
	|=========================================================================================================================|
	|  09. @BODY                        |  Contains all the contents of an HTML document                                      |
	|  10. @LOADING ANIMATION           |  Loading animation when the page reload                                             |
	|  11. @WRAPPER                     |  Wrapping page section                                                              |
	|  12. @SIGN WRAPPER                |  Wrapping sign design                                                               |
	|=========================================================================================================================|
	|  13. @CORE PLUGINS                |  The main 3rd party plugins script file                                             |
	|  14. @PAGE LEVEL SCRIPTS          |  The main theme script file                                                         |
	|=========================================================================================================================|

    START @BODY
    |=========================================================================================================================|
	|  TABLE OF CONTENTS (Apply to body class)                                                                                |
	|=========================================================================================================================|
    |  01. page-boxed                   |  Page into the box is not full width screen                                         |
	|  02. page-sound                   |  For playing sounds on user actions and page events                                 |
	|=========================================================================================================================|

	-->
<body class="page-sound bg-light">

	<!-- START @LOADING ANIMATION -->
	<div id="loading">
		<div class="loading-inner">
			<img class="animated bounceIn"
				src="assets/global/img/loader/flat/3.gif" alt="..." />
		</div>
	</div>
	<!--/ END LOADING ANIMATION -->

	<!-- START @WRAPPER-->
	<div id="wrapper">
		<!-- START @SIGN WRAPPER -->
		<div class="sign-wrapper">

			<!-- Brand -->
			<div class="brand animated fadeInDown">
<!-- 				<img th:src="@{/assets/global/img/logo/nu-logo-white.png}" -->
<!-- 					alt="brand logo" /> -->
				<img src="assets/global/img/logo/logo.png"
					alt="brand logo" />
			</div>
			<!--/ Brand -->
			<c:if test="${not pageContext.request.secure}">
			  <div id="msg" class="alert alert-danger">
				<h2>Non-secure Connection</h2>
				<p>You are currently accessing CAS over a non-secure connection.  Single Sign On WILL NOT WORK.  In order to have single sign on work, you MUST log in over HTTPS.</p>
			  </div>
			</c:if>	

			<!-- Login form -->
			<form:form id="sign-in"  commandName="${commandName}" htmlEscape="true" class="form-horizontal animated zoomIn shadow rounded" method="post">
				<form:errors path="*" id="msg" cssClass="alert alert-danger" element="div" htmlEscape="false" /> 
				<div class="sign-header">
					<div class="form-group">
						<div class="sign-text">
							<span>Single Sign On</span>
						</div>
					</div>
					<!-- /.form-group -->
				</div>
				<!-- /.sign-header -->
				<div class="sign-body">
					<div class="form-group">
						<div class="input-group input-group-lg rounded">
							<c:choose>
								<c:when test="${not empty sessionScope.openIdLocalId}">
								  <strong>${sessionScope.openIdLocalId}</strong>
								  <input type="hidden" class="form-control input-sm" placeholder="Username or email " id="username" name="username" value="${sessionScope.openIdLocalId}" /> 
								  <span class="input-group-addon"><i class="fa fa-user"></i></span>
								</c:when>
								<c:otherwise>
								  <spring:message code="screen.welcome.label.netid.accesskey" var="userNameAccessKey" />
								  <form:input cssClass="form-control input-sm" id="username" tabindex="1" accesskey="${userNameAccessKey}" path="username" autocomplete="off" htmlEscape="true" />
								  <span class="input-group-addon"><i class="fa fa-user"></i></span>
								</c:otherwise>
							  </c:choose>							
						</div>
					</div>
					<!-- /.form-group -->
					<div class="form-group">
						<div class="input-group input-group-lg rounded">
							  <spring:message code="screen.welcome.label.password.accesskey" var="passwordAccessKey" />
							  <form:password cssClass="form-control input-sm" id="password" tabindex="2" path="password"  accesskey="${passwordAccessKey}" htmlEscape="true" autocomplete="off" />
							  <span class="input-group-addon"><i class="fa fa-lock"></i></span>
						</div>
					</div>
					<!-- /.form-group -->
				</div>
				<!-- /.sign-body -->
				<div class="sign-footer">
					<div class="form-group">
						<div class="row">
							<div class="col-xs-12">
								<div class="ckbox ckbox-theme">
									<input id="warn" name="warn" value="true" type="checkbox"  accesskey="<spring:message code="screen.welcome.label.warn.accesskey" />"/> 
									<label for="warn" class="rounded"><spring:message code="screen.welcome.label.warn" /></label>
								</div>
							</div>							
						</div>
						<div class="row">
							<div class="col-xs-12 text-right">
								<a href="login/forget" title="lost password">Lost password?(not implemented)</a>
							</div>
						</div>
					</div>
					<!-- /.form-group -->
					<div class="form-group">
						<input type="hidden" name="lt" value="${loginTicket}" />
					  <input type="hidden" name="execution" value="${flowExecutionKey}" />
					  <input type="hidden" name="_eventId" value="submit" />
						<button type="submit"
							class="btn btn-theme btn-lg btn-block no-margin rounded" accesskey="l" id="login-btn"><spring:message code="screen.welcome.button.login" /></button>
					</div>
					<!-- /.form-group -->
				</div>
				<!-- /.sign-footer -->
			</form:form>
			<!-- /.form-horizontal -->
			<!--/ Login form -->

			<!-- Content text -->
			<br />
			<!-- 			<p class="text-muted text-center animated fadeinup">
				Need an account?
				<a href="page-signup.html"> Sign up free</a>
			</p> -->
			<!--/ Content text -->

		</div>
		<!-- /#sign-wrapper -->
		<!--/ END SIGN WRAPPER -->
	</div>
	<!-- /#wrapper -->
	<!--/ END WRAPPER-->
	
	<jsp:directive.include file="includes/bottom.jsp" />	

</body>
<!-- END BODY -->

</html>