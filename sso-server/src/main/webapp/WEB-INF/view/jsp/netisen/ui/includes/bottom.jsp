<%--

    Licensed to Jasig under one or more contributor license
    agreements. See the NOTICE file distributed with this work
    for additional information regarding copyright ownership.
    Jasig licenses this file to you under the Apache License,
    Version 2.0 (the "License"); you may not use this file
    except in compliance with the License.  You may obtain a
    copy of the License at the following location:

      http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.

--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
   

<!-- START JAVASCRIPT SECTION (Load javascripts at bottom to reduce load time) -->
	<!-- START @CORE PLUGINS -->
	<script src="assets/global/plugins/jquery/jquery.min.js"></script>
	<script
		src="assets/global/plugins/jquery-cookie/jquery.cookie.js"></script>
	<script
		src="assets/global/plugins/bootstrap/js/bootstrap.min.js"></script>
	<script
		src="assets/global/plugins/jpreloader-v2/js/jpreloader.min.js"></script>
	<script
		src="assets/global/plugins/jquery-easing/jquery.easing.1.3.js"></script>
	<script
		src="assets/global/plugins/ion-sound/js/ion.sound.min.js"></script>
	<!--/ END CORE PLUGINS -->

	<!-- START @PAGE LEVEL PLUGINS -->
	<script
		src="assets/global/plugins/jquery-validation/jquery.validate.js"></script>
	<!--/ END PAGE LEVEL PLUGINS -->

	<!-- START @PAGE LEVEL SCRIPTS -->
	<script src="assets/admin/js/apps.js"></script>
	<!-- 	<script th:src="@{/assets/admin/js/pages/blankon.sign.js}"></script> -->
	<!--/ END PAGE LEVEL SCRIPTS -->
	<!--/ END JAVASCRIPT SECTION -->
    <script type="text/javascript" src="https://github.com/cowboy/javascript-debug/raw/master/ba-debug.min.js"></script>
	
        <%-- 
        JavaScript Debug: A simple wrapper for console.log 
        See this link for more info: http://benalman.com/projects/javascript-debug-console-log/
    --%>
    <spring:theme code="cas.javascript.file" var="casJavascriptFile" text="" />
    <script type="text/javascript" src="<c:url value="${casJavascriptFile}" />"></script>
	
	<!-- 	
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
	-->