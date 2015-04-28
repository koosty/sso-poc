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
<!DOCTYPE html>

<%@ page pageEncoding="UTF-8" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<html lang="en">
<head>
	<c:set var="url">${pageContext.request.requestURL}</c:set>
    <base href="${fn:substring(url, 0, fn:length(url) - fn:length(pageContext.request.requestURI))}${pageContext.request.contextPath}/" />
	
	<!-- START @META SECTION -->
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
	<meta name="description" content="Login page for SSO" />
	<meta name="keywords" content="" />
	<meta name="author" content="Djava UI" />
	<title>SSO | MCMatrix</title>
	<!--/ END META SECTION -->
	
    <!-- START @FAVICONS -->
	<link
		href="assets/global/img/ico/apple-touch-icon-144x144-precomposed.png"
		rel="apple-touch-icon-precomposed" sizes="144x144" />
	<link
		href="assets/global/img/ico/apple-touch-icon-114x114-precomposed.png"
		rel="apple-touch-icon-precomposed" sizes="114x114" />
	<link
		href="assets/global/img/ico/apple-touch-icon-72x72-precomposed.png"
		rel="apple-touch-icon-precomposed" sizes="72x72" />
	<link
		href="assets/global/img/ico/apple-touch-icon-57x57-precomposed.png"
		rel="apple-touch-icon-precomposed" />
	<link href="assets/global/img/ico/icon.png" rel="shortcut icon" />
	<!--/ END FAVICONS -->
	
	<!-- START @FONT STYLES -->
	<!-- <link -->
	<!-- 	href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&amp;subset=all" -->
	<!-- 	rel="stylesheet" /> -->
	<link href="assets/fonts/google-fonts.css" rel="stylesheet" />
	<!--/ END FONT STYLES -->

	<!-- START @GLOBAL MANDATORY STYLES -->
	<link
		href="assets/global/plugins/bootstrap/css/bootstrap.min.css"
		rel="stylesheet" />
	<!--/ END GLOBAL MANDATORY STYLES -->

	<!-- START @PAGE LEVEL STYLES -->
	<link
		href="assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
	<link href="assets/global/plugins/animate/animate.css" rel="stylesheet" />
	<!--/ END PAGE LEVEL STYLES -->
	
	<!-- START @THEME STYLES -->
	<link href="assets/admin/css/layout.css" rel="stylesheet" />
	<link href="assets/admin/css/components.css" rel="stylesheet" />
	<link href="assets/admin/css/plugins.css" rel="stylesheet" />
	<link href="assets/admin/css/themes/amazon.theme.css"
		rel="stylesheet" id="theme" />
	<link href="assets/admin/css/pages/sign.css" rel="stylesheet" />
	<link href="assets/admin/css/custom.css" rel="stylesheet" />
	<!--/ END THEME STYLES -->
	
	<spring:theme code="standard.custom.css.file" var="customCssFile" />
	<!-- <link rel="stylesheet" href="<c:url value="${customCssFile}" />" /> -->
  
	<!-- START @IE SUPPORT -->
	<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
	<!--[if lt IE 9]>
			<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
			<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
			<![endif]-->
	<!--/ END IE SUPPORT -->
	
</head>