<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="org.springframework.web.context.WebApplicationContext"%>
<%@ page import="org.springframework.web.context.support.WebApplicationContextUtils"%>
<%@ page import="org.springframework.core.io.Resource"%>
<%@ page import="java.io.InputStream"%>
<%@ page import="java.util.Properties"%>
<%@ page import="java.util.Set" %>
<%@ page import="com.nicetcm.nibsplus.common.CommonConstants" %>
<%@ page import="com.nicetcm.nibsplus.common.util.SessionUtil" %>

<%
	//공통 메시지 처리
	WebApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(getServletContext());
	Resource resource = context.getResource("classpath:/message/message_codes_ko_KR.properties");
	InputStream is = resource.getInputStream();
	Properties prop = new Properties();
	prop.load(is);
	Set<String> set = prop.stringPropertyNames();

	//시스템타입 체크
    String systemType = System.getenv("system.type");
    if (StringUtil.isNull(systemType)) {
        systemType = System.getProperty("system.type");
    }
	systemType = StringUtil.replaceNull(systemType, "op");

	//시스템타입에 따라서 호출하는 WebSquare 구동 JSP 변경
	//운영 
	String websquareJsp	= "nibs.jsp";												
//	String websquareJsp	= "nibs.html";
	String defaultPath	= CommonConstants.MnRequestMapping.SYS_COMMON;
	
	//파트너
	if ( systemType.equals("pt") ){
		websquareJsp = "nibs_pt.jsp";		
		defaultPath	= CommonConstants.PtRequestMapping.PT_MNGR;
	}
	
	//모바일	
	else if ( systemType.equals("mo") ){
		websquareJsp = "nibs_mo.jsp";	
		defaultPath	= CommonConstants.MoRequestMapping.MO_LGNMBLCM;
	}
	
	//감사업무	
	else if ( systemType.equals("au") ){
		websquareJsp = "nibs_au.jsp";	
		defaultPath	= CommonConstants.AuRequestMapping.AU_AUDAFF;
	}	
	
	//w2xPath	
	String w2xPath = request.getAttribute("w2xPath") == null ? "" : (String) request.getAttribute("w2xPath");	
	
	String encPhNo = request.getAttribute("encPhNo") == null ? "" : (String) request.getAttribute("encPhNo");
	String realPhNo = request.getAttribute("realPhNo") == null ? "" : (String) request.getAttribute("realPhNo");
	
	
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
<title><%=title%></title>
<script language="javascript" src="/js/jquery-1.9.0.min.js"></script>
<script type="text/javascript">
<%
	out.println("var g_message = [];");
	for (String key : set) {
		out.println("g_message.push({ \"key\": \"" + key + "\", \"message\": \"" + prop.getProperty(key) + "\"});");
	}
%>	


/* 로그아웃 시킬지 여부 Flag => location.href 등으로 화면 이동시에는 로그아웃되지 않도록 처리 위해서 */
var logoutFlag = "";

/* 로그아웃 처리 => 브라우져 닫을때 & refresh 시 로그아웃 처리 요청(연구소)  */
function browserLogout(){
	var actionUrl = "<%=defaultPath%>"+ "/logout.do";
	try{	
		//CTI 관련 로그아웃 처리 
		if( hiddenFrame3.ecsWebCTI == "undefined" || hiddenFrame3.ecsWebCTI == null ){
		}else{
			hiddenFrame3.Logout();
			hiddenFrame3.vcRecLogout();
		}
		
		//로그아웃 처리 
		$.ajax({
			type : "POST",
			async : false,
			url  : actionUrl,
			dataType : "json",
			data : {"reqParams" : "{}"},
			success : function(data, textStatus, jqXHR ){

			},
			error : function(jqXHR, textStatus, errorThrown ){

			}
		});
		
	} catch (e) {
	}
}

/* 브라우져 닫을때 & refresh 시 */ 
$(window).on('beforeunload', function() {
	if ( logoutFlag == "" ){
		/* systemType 운영, 파트너 일 경우에만 로그아웃 처리 */ 
		if ( "op" == "<%=systemType%>" || "pt" == "<%=systemType%>" ) {
//			browserLogout();			//테스트용으로 주석처리 => 추후 주석 해제 해야함 (2014.10.13)
		}
	}
});

</script>
</head>
<% 
	if(systemType.equals("mo")){
		%>
			<iframe name="frmMain" style="position:absolute;left:0px;top:0px;width:100%;height:100%;" scrolling="on" src="<%=contextPath%>/<%=websquareJsp %>?w2xPath=<%=w2xPath%>&encPhNo=<%=encPhNo%>&realPhNo=<%=realPhNo%>" />
		<%
	} else {
		%>
			<frameset rows="100%, 0%, 0%, 0%" cols="1*">
				<frame name="frmMain" spa="true" spaReplaceHistory="true" scrolling="auto" marginwidth="10" marginheight="14" src="<%=contextPath%>/<%=websquareJsp %>?w2xPath=<%=w2xPath%>" />
				<frame name="foot" scrolling="auto" marginwidth="10" marginheight="14" src="<%=contextPath%>/common/blank.html" noresize="noresize" />
				<frame name="hiddenFrame3" src="<%=contextPath%>/common/escCTI.jsp" />
				<frame name="hidden1" src="<%=contextPath%>/pop.jsp"/>
			</frameset>
		<% 
	}
%>
</html>
