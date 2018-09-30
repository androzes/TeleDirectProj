<%@page import="com.teleDirect.server.ServerCoordinator"%>
<%
// get the request string
String reqString = request.getParameter("json");

ServerCoordinator coord = new ServerCoordinator();
coord.getRequest(reqString);
coord.parseRequest();

// get the reponse content
String respContent = coord.sendResponse();
// write the content to the response
response.getWriter().write(respContent); 
%>