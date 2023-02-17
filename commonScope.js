var com = {};

/**
 * 인코딩된 세션 데이터를 디코드하여 변수에 설정한다.
 *
 * @param encodedValue: 인코딩된 세션 데이터
 */
com.cm_setDecodedValue = function(encodedValue) {
    try {
        if (com.cm_isNullString(encodedValue))
            return;
        
        var decData = com.cm_trim( WebSquare.text.BASE64URLDecoder(encodedValue));
        var decDatas = decData.split('|');

        gcm.SS_userId				= decDatas[0];
        gcm.SS_userName		= decDatas[1];
        gcm.SS_userType			= decDatas[2];
        gcm.SS_ctRight			= decDatas[3];
        gcm.SS_fnRight			= decDatas[4];
        gcm.SS_deptCode		= decDatas[5];
        gcm.SS_officeCode		= decDatas[6];
        gcm.SS_teamCode		= decDatas[7];
        gcm.SS_sysType			= decDatas[8];
        gcm.SS_roleId				= decDatas[9];
        gcm.SS_deptType		= decDatas[10];
        gcm.SS_startTime			= decDatas[11];
        gcm.SS_stTime			= decDatas[12];
        gcm.SS_fsTime			= decDatas[13];
        gcm.SS_svrType			= decDatas[14];
        gcm.SS_connectDate	= decDatas[15];
    } catch (e) {
    	com.cm_logPrint("com.cm_setDecodedValue(): " + e.message);
        alert("com.cm_setDecodedValue(): " + e.message);
    }
};


/**
 * AMS Path 셋팅
 *
 * @param encodedValue: 인코딩된 ams path 데이터
 */
com.cm_setAmsPath = function(encodedValue) {
    try {
        if (com.cm_isNullString(encodedValue))
            return;

        var decData = com.cm_trim( WebSquare.text.BASE64URLDecoder(encodedValue));
        //var decDatas = decData.split('|');

        AMS_path				= decData;
    } catch (e) {
        com.cm_logPrint("com.cm_setAmsPath(): " + e.message);
        alert("com.cm_setAmsPath(): " + e.message);
    }
};


/**
 * 공통 페이지 초기화 함수입니다. 
 */
com.cm_pageInitialize = function() {
	try {
		//그리드 리사이즈
		com.cm_gridSize();		
		
		//별 navigator	 ==> navigation 분리는 아직 미정(2014.10.13)
		com.cm_setNavigator();		
		
		//화면별 권한 체크
		com.cm_chkPgmRole();
		
		//화면별 버튼 활성화/비활성화 처리
		com.cm_setPgmBtnAuthProcess();
		
	} catch (e) {
		com.cm_logPrint("com.cm_pageInitialize(): " + e.message);
        alert("com.cm_pageInitialize(): " + e.message);
	}
};


/**
 * 화면 접속 로그 등록 [ pgmId : gMenuId(2자리) + mMenuId(2자리) + programId(1~2자리) ]
 */
com.cm_usePgmLog = function(pgmId) {
	try {
		var gv_systemPath = gcm.SYS_COMMON; 
		if ( pgmId == null){
			pgmId = com.cm_ProgramId();
		}
		var gMenuId = "";
		var mMenuId = "";
		var programId = "";
		
		var len = pgmId.length;		
		if ( len == 5 || len == 6 ) {
			gMenuId = pgmId.substring(0, 2);
			mMenuId = pgmId.substring(2, 4);
			programId = pgmId.substring(4);
		} else {
			return;
		}
		
		var requestData = {};
		requestData.gMenuId	= gMenuId;
		requestData.mMenuId	= mMenuId;
		requestData.programId	= programId; 

		var action		= "insertUseProgramInfo";
		var callBack	= "";
		com.cm_submitAjax( gv_systemPath, action, requestData, callBack );	//서버 ajax 통신

	} catch (e) {
		com.cm_logPrint("com.cm_usePgmLog(): " + e.message);
        alert("com.cm_usePgmLog(): " + e.message);
	}
};


com.cm_savePageAct = function(actNm) {
	try {
		
		if( !actNm )
		{
			return;
		}
		var gv_systemPath = gcm.SYS_COMMON;		
		
		pgmId = com.cm_ProgramId();

		var gMenuId = "";
		var mMenuId = "";
		var programId = "";
		
		var len = pgmId.length;		
		if ( len == 5 || len == 6 ){
			gMenuId = pgmId.substring(0, 2);
			mMenuId = pgmId.substring(2, 4);
			programId = pgmId.substring(4);
		} else {
			return;
		}
		
		var requestData = {};
		requestData.gmenuId	= gMenuId;
		requestData.mmenuId	= mMenuId;
		requestData.programId = programId;
		requestData.actNm = actNm;

		var action		= "savePageActInfo";
		var callBack	= "";
		com.cm_submitAjax( gv_systemPath, action, requestData, callBack, false, false );	//서버 ajax 통신		

	} catch (e) {
        com.cm_logPrint("com.cm_savePageAct(): " + e.message);
        alert("com.cm_savePageAct(): " + e.message);
	}
};


com.cm_savePageAct2 = function(actNm, actReasonCd, actReasonTxt) {
	try {
		
		if( !actNm )
		{
			return;
		}
		var gv_systemPath = gcm.SYS_COMMON;		
		
		pgmId = com.cm_ProgramId();

		var gMenuId = "";
		var mMenuId = "";
		var programId = "";
		
		var len = pgmId.length;		
		if ( len == 5 || len == 6 ){
			gMenuId = pgmId.substring(0, 2);
			mMenuId = pgmId.substring(2, 4);
			programId = pgmId.substring(4);
		} else {
			return;
		}
		
		var requestData = {};
		requestData.gmenuId	= gMenuId;
		requestData.mmenuId	= mMenuId;
		requestData.programId = programId;
		requestData.actNm = actNm;
		requestData.actReasonCd = actReasonCd;
		requestData.actReasonTxt = actReasonTxt;

		var action		= "savePageActInfo2";
		var callBack	= "";
		com.cm_submitAjax( gv_systemPath, action, requestData, callBack, false, false );	//서버 ajax 통신		

	} catch (e) {
        com.cm_logPrint("com.cm_savePageAct2(): " + e.message);
        alert("com.cm_savePageAct2(): " + e.message);
	}
};


/**
함수명: com.cm_paramSet
설  명: 파라미터 셋팅용 내부 호출 함수  
인  자: 
리  턴: 
*/	        
com.cm_paramSet = function( arrayObj, data ) {
	try {
		var conditionParam = new Object();
		conditionParam.cond = data;
		arrayObj.push(conditionParam);
		return arrayObj;
	} catch (e) {
	    com.cm_logPrint("com.cm_paramSet(): " + e.message);
	    alert("com.cm_paramSet(): " + e.message);	
	}	        
};


/**
 * 로그아웃 처리 
 */
com.cm_logout = function() {
	try {
		//CTI 관련 로그아웃 처리 
		com.cm_ctiLogout();
		
		var gv_systemPath = gcm.SYS_COMMON;
		var requestData = {};
		var action		= "logout";
		var callBack	= com.cm_logout_RESULT;
		com.cm_submitAjax(gv_systemPath, action, requestData, callBack);	//서버 ajax 통신	
	} catch (e) {
		com.cm_logPrint("com.cm_logout(): " + e.message);
		WebSquare.exception.printStackTrace(e);
	}
};


com.cm_logout_RESULT = function(resultData) {
    try {
    	//cm_logPrint("resultdata=>"+JSON.stringify(resultData));	//결과로그 출력
    	com.cm_error();		//로그인 페이지 이동 
    } catch (e) {
    	com.cm_logPrint("com.cm_logout_RESULT(): " + e.message);
		WebSquare.exception.printStackTrace(e);
	}
};


/**
 * 화면별 권한 체크
 */
com.cm_chkPgmRole = function (pgmId) {
	try {
		var gv_systemPath = gcm.SYS_COMMON; 
		if ( pgmId == null){
			pgmId = com.cm_ProgramId();
		}
	
		var gMenuId = "";
		var mMenuId = "";
		var programId = "";
		
		var len = pgmId.length;		
		if ( len == 5 || len == 6 || len == 10 ){
			gMenuId = pgmId.substring(0, 2);
			mMenuId = pgmId.substring(2, 4);
			programId = pgmId.substring(4);
		} else {
			//화면ID 가 없을 경우 로그아웃 처리
			com.cm_logout();
			return;
		}

		var url = gv_systemPath + "/selectProgramRoleInfo.do";
		
		var requestData = new Object();
		requestData.memberId= gcm.SS_userId;
		requestData.gMenuId	= gMenuId;
		requestData.mMenuId	= mMenuId;
		requestData.programId	= programId; 
	
		$.ajax({
			type : "POST",
			url  : url,
			dataType : "json",
			data : {"reqParams" : JSON.stringify(requestData)},
			success : function(data, textStatus, jqXHR ){
				//권한에 해당하는 프로그램이 아닐경우 로그아웃 처리 	
				if ( data.resultInfo == null ){
					//com.cm_logout();
				}
			},
			error : function(jqXHR, textStatus, errorThrown ){
				//com.cm_msg("정보 조회 중 예상하지 못한 오류가 발생하였습니다.");				
				com.cm_error();	
			}		
		});
	} catch (e) {
        com.cm_logPrint("com.cm_chkPgmRole(): " + e.message);
        alert("com.cm_chkPgmRole(): " + e.message);
	}
};


/**
 * 화면별 버튼권한 활성화/비활성화 처리 (공통으로 호출함)
 * @Description	화면별 버튼권한 조회 하여 활성화/비활성화 처리 (권한 : 1, 미권한 : 0)
 * @param 		pgmCode : 프로그램코드 (gMenuId + mMenuId + programId  => ex: 101510 권한신청관리)
 * @returns 		화면에 버튼의 활성화/비활성화 처리
 */
com.cm_setPgmBtnAuthProcess = function (pgmCode,btnType) {
	try {
		var pgm_code2 = pgmCode;
		if (typeof pgmCode == "undefined" || pgmCode == null || pgmCode == "") {
			pgm_code2 = com.cm_ProgramId();
		}
		
		var CODE_TYPE	= "programAuthInfo";
		var url 				= "/commCodeContent.do";
		
		var conditionParams = new Array();
		conditionParams = com.cm_paramSet( conditionParams, gcm.SS_userId );	//권한ID
		conditionParams = com.cm_paramSet( conditionParams, pgm_code2 );	//윈도우컨테이너ID or POPUP ID (gMenuId + mMenuId + programId)
		
		var requestData = new Object();
		requestData.type = "commonCode."+CODE_TYPE;
		requestData.conditions = conditionParams;
	
		$.ajax({
			type : "POST",
			url  : url,
			dataType : "json",
			data : {"reqParams" : JSON.stringify(requestData)},
			success : function(data, textStatus, jqXHR ){
				//콜백 함수일 경우 콜백함수 호출
				com.cm_setPgmBtnSet(data,btnType);
			},
			error : function(jqXHR, textStatus, errorThrown ){
				//cm_msg("정보 조회 중 예상하지 못한 오류가 발생하였습니다.");				
				com.cm_error();	
			}		
		});
	} catch (e) {
		com.cm_logPrint("com.cm_setPgmBtnAuthProcess(): " + e.message);
		alert("com.cm_setPgmBtnAuthProcess(): " + e.message);
	}
};


/**
 * 에러 발생 시 로그인 페이지로 이동 
 *
 */
com.cm_error = function() {
    try {
		//팝업 일 경우 
		if (opener != null) {
			if (opener.top.frames["frmMain"] == null){
				opener.top.location.href = "/index.do";
			} else {
				opener.com.cm_moveW2xPath("/index.do", opener.top.frames["frmMain"]);
			}
			self.close();	
		} 
		
		//업무 화면일 경우 
		else if (parent != null) {
			if (parent.top.frames["frmMain"] == null) {
				parent.top.location.href = "/index.do";
			} else {
				//parent.com.cm_moveW2xPath("/index.do", parent.top.frames["frmMain"]);
				com.cm_moveW2xPath("/index.do", parent.top.frames["frmMain"]);
			}	
		} else {
			top.location.href = "/index.do";
		}			
    	
    } catch (e) {
        com.cm_logPrint("com.cm_error(): " + e.message);
        alert("com.cm_error(): " + e.message);
    }
};


/**
 * 버튼 권한 설정
 *<pre>
 * 상단버튼영역 : <xf:group class="fr" id="top_but_li" style="" tagname="li"></xf:group>
 * 하단버튼영역 : <xf:group class="btn_area clearfix" id="bottom_but_div" style=""></xf:group>
 * </pre> *
 * @param url: 이동하려는 페이지
 * @param target: 이동할 목적지, 미지정시 self
 */
com.cm_setPgmBtnSet = function(resultData, btnRightType) {
    try {
		var jsonNode = WebSquare.json.JSON2XML(resultData);
		
		var save_yn	= WebSquare.xml.getValue(jsonNode, "object/codes/object/content3");		//저장
		var query_yn	= WebSquare.xml.getValue(jsonNode, "object/codes/object/content4");		//조회
		var fix_yn 		= WebSquare.xml.getValue(jsonNode, "object/codes/object/content5");		//확정
		var new_yn		= WebSquare.xml.getValue(jsonNode, "object/codes/object/content6");		//신규
		var del_yn		= WebSquare.xml.getValue(jsonNode, "object/codes/object/content7");		//삭제
		var add_yn 	= WebSquare.xml.getValue(jsonNode, "object/codes/object/content8");		//추가
		var print_yn 	= WebSquare.xml.getValue(jsonNode, "object/codes/object/content9");		//출력
		var excel_yn 	= WebSquare.xml.getValue(jsonNode, "object/codes/object/content10");	//excel
		var nofix_yn 	= WebSquare.xml.getValue(jsonNode, "object/codes/object/content11");	//확정취소
		var etc_yn 		= WebSquare.xml.getValue(jsonNode, "object/codes/object/content12");	//수정
		var create_yn 	= WebSquare.xml.getValue(jsonNode, "object/codes/object/content13");	//생성
				
		if (typeof top_but_li != "undefined" && typeof bottom_but_div != "undefined"){
			
			//상단
			var add1 = '';
			//하단
			var add2 = '<div id="group277" class="w2group btn_lt">';
			var add3 = '<div id="group277" class="w2group btn_rt">';
			
			//우측 상단
			if (query_yn == "1"){
				add1 += '<a id="BTN_QUERY" class="w2textbox btn_search" href="#;" onclick="fnQuery();" aria-hidden="false" style="visibility: visible;">조회</a>';
			}
			if (new_yn == "1") {
				add1 += '<a id="BTN_NEW" class="w2textbox btn_new" href="#;" onclick="fnClear();" aria-hidden="false" style="visibility: visible;">CLEAR</a>';
			}
			
			//좌측 하단
			if (add_yn == "1"){
				add2 += '<a id="BTN_ADD" class="w2anchor2 btn_blue2" href="#;" onclick="fnAddRow();" aria-hidden="false" style="visibility: visible;">행추가</a>';
				add2 += '<a id="BTN_ADDDEL" class="w2anchor2 btn_blue2" href="#;" onclick="fnDelRow();" aria-hidden="false" style="visibility: visible;">행삭제</a>';
			}
			if (print_yn == "1"){
				add2 += '<a id="BTN_PRINT" class="w2anchor2 btn_blue2" href="#;" onclick="fnPrint();" aria-hidden="false" style="visibility: visible;">출력</a>';
			}
			if (excel_yn == "1"){
				add2 += '<a id="BTN_EXCEL" class="w2anchor2 btn_blue2" href="#;" onclick="fnExcel();" aria-hidden="false" style="visibility: visible;">EXCEL</a>';
			}
			
			//우측 하단
			if (save_yn == "1"){
				add3 += '<a id="BTN_SAVE" class="w2anchor2 btn_blue2" href="#;" onclick="fnSave();" aria-hidden="false" style="visibility: visible;">저장</a>';
			}
			if (del_yn == "1"){
				add3 += '<a id="BTN_DEL" class="w2anchor2 btn_blue2" href="#;" onclick="fnDel();" aria-hidden="false" style="visibility: visible;">삭제</a>';
			}
			if (create_yn == "1"){
				add3 += '<a id="BTN_CREATE" class="w2anchor2 btn_blue2" href="#;" onclick="fnCreate();" aria-hidden="false" style="visibility: visible;">생성</a>';
			}
			if (fix_yn == "1"){
				add3 += '<a id="BTN_FIX" class="w2anchor2 btn_blue2" href="#;" onclick="fnFix();" aria-hidden="false" style="visibility: visible;">확정</a>';
			}
			if (nofix_yn == "1"){
				add3 += '<a id="BTN_FIXCANCEL" class="w2anchor2 btn_blue2" href="#;" onclick="fnNotix();" aria-hidden="false" style="visibility: visible;">확정취소</a>';
			}
			if (etc_yn == "1"){
				add3 += '<a id="BTN_ETC" class="w2anchor2 btn_blue2" href="#;" onclick="fnEtc();" aria-hidden="false" style="visibility: visible;">기타</a>';
			}
			
			add1 += '';
			add2 += '</div>';
			add3 += '</div>';
			
			$('#top_but_li').children().remove();
			$('#bottom_but_div').children().remove();
			
			$('#top_but_li').append(add1);
			$('#bottom_but_div').append(add2);
			$('#bottom_but_div').append(add3);
			
			try{
				if( checkButtonButDiv ) 
				{
					if( typeof checkButtonButDiv === "function" )
					{
						checkButtonButDiv();
					}
				}
			}
			catch(e){}
			
			
		} else {
			
			if (typeof BTN_NEW != "undefined"){
				if (new_yn == "1")	BTN_NEW.show("");
				else						BTN_NEW.hide();	
			}
			//초기화도 신규(BTN_NEW) 와 동일 
			if (typeof BTN_INIT != "undefined"){
				if (new_yn == "1")	BTN_INIT.show("");
				else						BTN_INIT.hide();	
			}
			
			if (typeof BTN_QUERY != "undefined"){
				if (query_yn == "1")	BTN_QUERY.show("");
				else						BTN_QUERY.hide();	
			}
			if (typeof BTN_SAVE != "undefined"){
				if (save_yn == "1")	BTN_SAVE.show("");
				else						BTN_SAVE.hide();	
			}
			if (typeof BTN_DEL != "undefined"){
				if (del_yn == "1")		BTN_DEL.show("");
				else						BTN_DEL.hide();	
			}
			if (typeof BTN_ADD != "undefined"){
				if (add_yn == "1")	BTN_ADD.show("");
				else						BTN_ADD.hide();	
			}
			//행삭제(신규행) 추가 (2014.10.30)
			if (typeof BTN_ADDDEL != "undefined"){
				if (add_yn == "1")	BTN_ADDDEL.show("");
				else						BTN_ADDDEL.hide();	
			}		
			if (typeof BTN_PRINT != "undefined"){
				if (print_yn == "1")	BTN_PRINT.show("");
				else						BTN_PRINT.hide();	
			}
			if (typeof BTN_EXCEL != "undefined"){
				if (excel_yn == "1")	BTN_EXCEL.show("");
				else						BTN_EXCEL.hide();	
			}				
			if (typeof BTN_CREATE != "undefined"){
				if (create_yn == "1")	BTN_CREATE.show("");
				else						BTN_CREATE.hide();	
			}
			if (typeof BTN_FIX != "undefined"){
				if (fix_yn == "1")		BTN_FIX.show("");
				else						BTN_FIX.hide();	
			}
			if (typeof BTN_FIXCANCEL != "undefined"){
				if (nofix_yn == "1")	BTN_FIXCANCEL.show("");
				else						BTN_FIXCANCEL.hide();	
			}
			if (typeof BTN_ETC != "undefined"){
				if (etc_yn == "1")		BTN_ETC.show("");
				else						BTN_ETC.hide();	
			}
			
		}
		
		if (btnRightType == "CLASS")
		{			
			if (new_yn == "1") {
				$(".BTN_NEW").show();
			}else{				
				$(".BTN_NEW").hide();
			}
			if (query_yn == "1") {
				$(".BTN_QUERY").show();
			}else{				
				$(".BTN_QUERY").hide();
			}
			if (save_yn == "1") {
				$(".BTN_SAVE").show();
			}else{				
				$(".BTN_SAVE").hide();
			}
			if (del_yn == "1") {
				$(".BTN_DEL").show();
			}else{				
				$(".BTN_DEL").hide();
			}
			if (add_yn == "1") {
				$(".BTN_ADD").show();
			}else{				
				$(".BTN_ADD").hide();
			}
			if (print_yn == "1") {
				$(".BTN_PRINT").show();
			}else{				
				$(".BTN_PRINT").hide();
			}
			if (create_yn == "1") {
				$(".BTN_CREATE").show();
			}else{				
				$(".BTN_CREATE").hide();
			}
			if (fix_yn == "1") {
				$(".BTN_FIX").show();
			}else{				
				$(".BTN_FIX").hide();
			}
			if (nofix_yn == "1") {
				$(".BTN_FIXCANCEL").show();
			}else{				
				$(".BTN_FIXCANCEL").hide();
			}
			if (etc_yn == "1") {
				$(".BTN_ETC").show();
			}else{				
				$(".BTN_ETC").hide();
			}		
		}
    } catch (e) {
        com.cm_logPrint("com.cm_setPgmBtnSet(): " + e.message);
        alert("com.cm_setPgmBtnSet(): " + e.message);
    }
};


/**
 * WebSquare 페이지 이동을 도와주는 함수입니다.
 *
 * @param url: 이동하려는 페이지
 * @param target: 이동할 목적지, 미지정시 self
 */
com.cm_moveW2xPath = function(url, target) {
    try {
        if (target == null)
            target = self;
        target.location.href = "/nibs.jsp?w2xPath=" + url.replace(/\?/ig, "&");
    } catch (e) {
        com.cm_logPrint("com.cm_moveW2xPath(): " + e.message);
        alert("com.cm_moveW2xPath(): " + e.message);
    }
};


/**
 * 파라미터로 넘어온 값을 WebSquare Log 창에 보여준다.
 * 
 * @param str
 */
com.cm_logPrint = function(str) {
	WebSquare.logger.printLog(str);
};


/**
 * 문자열 좌우의 공백을 제거합니다.
 *
 * @param source: 원본 문자열
 * @returns 좌우의 공백이 제거된 문자열
 */
com.cm_trim = function(source) {
    try {
        if (com.cm_isNullString(source))
            return "";

        return source.toString().replace(/(^\s*)|(\s*$)/gi, "");
    } catch (e) {
        com.cm_logPrint("com.cm_trim(): " + e.message);
        alert("com.cm_trim(): " + e.message);
    }
};


/**
 * 지정한 문자열의 null 여부를 반환합니다.
 *
 * @param source: 원본 문자열
 * @param checkEmpty: 빈 문자열도 null 로 간주할지 여부, 기본값은 true.
 * @returns true, false
 */
com.cm_isNullString = function(source, checkEmpty) {
    try {
        if (checkEmpty == null)
            checkEmpty = true;

        if (com.cm_isNull(source))
            return true;

        return (checkEmpty && source.toString().replace(/(^\s*)|(\s*$)/gi, "").length == 0);
    } catch (e) {
        com.cm_logPrint("com.cm_isNullString(): " + e.message);
        alert("com.cm_isNullString(): " + e.message);
    }
};


/**
 * 지정한 개체의 null 여부를 반환합니다.
 *
 * @param object: 점검할 개체
 * @returns true, false
 */
com.cm_isNull = function(object) {
    try {
    	if (typeof object == "boolean"){
    		return false;
    	} else {
            return (object == null || typeof object == "undefined" || object === "");    		
    	}

    } catch (e) {
        com.cm_logPrint("com.cm_isNull(): " + e.message);
        alert("com.cm_isNull(): " + e.message);
    }
};


/**
 * 지정한 문자열이 null 이면 안전한 빈 문자열을 반환합니다.
 * 반환되는 모든 문자열은 Trim 처리가 적용됩니다.
 *
 * @param source: 원본 문자열
 * @returns null 이 아니고 Trim 처리가 적용된 문자열
 */
com.cm_safeString = function(source) {
    try {
        if (com.cm_isNullString(source))
            return "";

        return com.cm_trim(source);
    } catch (e) {
        com.cm_logPrint("com.cm_safeString(): " + e.message);
        alert("com.cm_safeString(): " + e.message);
    }
};


/**
 * 프로그램 새창 열기(메뉴로 등록된 프로그램의 경우)
 *
 * @param		id 			: 화면 id [대분류메뉴ID + 중분류메뉴ID + 프로그램ID : 총 5~6자리(101010)] 
 * @param		winType	: 창 뛰우는 Type
 * 								existWindow	: id가 동일한 윈도우가 떠있으면 그 윈도우를 사용하여 다시 표시
 *								newWindow		: 항상 새로운 창을 생성
 *								selectWindow	: id가 동일한 창이 있으면 그 윈도우를 선택
  * @example 	com.cm_programOpen(  id, winType );
 * 						com.cm_programOpen(  "101010", "existWindow" );
 */
com.cm_programOpen = function( id, winType ) {
	try {
		var gMenuId = "";
		var mMenuId = "";
		var programId = "";
		
		var len = id.length;
		if ( len == 5 || len == 6 ){
			gMenuId = id.substring(0, 2);
			mMenuId = id.substring(2, 4);
			programId = id.substring(4);
		} else {
			return;
		}

		var CODE_TYPE	= "programUrlInfo";
		var url 				= "/commCodeContent.do";
		
		var conditionParams = new Array();
		conditionParams = com.cm_paramSet( conditionParams, gMenuId );
		conditionParams = com.cm_paramSet( conditionParams, mMenuId );	
		conditionParams = com.cm_paramSet( conditionParams, programId );	
		
		var requestData = new Object();
		requestData.type = "commonCode."+CODE_TYPE;
		requestData.conditions = conditionParams;		
		
		$.ajax({
			type : "POST",
			url  : url,
			dataType : "json",
			data : {"reqParams" : JSON.stringify(requestData)},
			success : function(data, textStatus, jqXHR ){

				var jsonNode 		= WebSquare.json.JSON2XML(data);
				var programNm	= WebSquare.xml.getValue(jsonNode, "object/codes/object/content1");
				var url				= WebSquare.xml.getValue(jsonNode, "object/codes/object/content2");
				//alert("programNm=>"+programNm+", url=>"+url+", id=>"+id+", winType=>"+winType);
				
				com.cm_winContainerOpen( url, programNm, id, winType );
			},
			error : function(jqXHR, textStatus, errorThrown ){
				//com.cm_error();	
			}		
		});
	} catch (e) {
		com.cm_logPrint("com.cm_programOpen(): " + e.message);
		alert("com.cm_programOpen(): " + e.message);
	} 		
};


/**
 * 윈도우 컨테이너 새창 열기
 *
 * @param		url			: 화면 URL
 * @param		name		: Display 화면 명
 * @param		id 			: 화면 id [메뉴등록 프로그램의 경우 : 대분류메뉴ID + 중분류메뉴ID + 프로그램ID : 총 6자리(801001)] , [메뉴미등록 프로그램의 경우 : 임의ID 지정] 
 * @param		winType	: 창 뛰우는 Type
 * 								existWindow	: id가 동일한 윈도우가 떠있으면 그 윈도우를 사용하여 다시 표시
 *								newWindow		: 항상 새로운 창을 생성
 *								selectWindow	: id가 동일한 창이 있으면 그 윈도우를 선택
 * @example	com.cm_winContainerOpen( url, name, id, winType );
		  			com.cm_winContainerOpen( "/mn/sys/pgmmng/menuLargeGroup.do", "메뉴대분류등록", "801001", "existWindow" );
		  			com.cm_winContainerOpen( "/mn/sys/pgmmng/menuLargeGroup2.do", "메뉴대분류등록2", "menuLargeGroup2", "existWindow" );
 */
com.cm_winContainerOpen = function( url, name, id, winType ) {
	try {
		if ( typeof parent != "undefined" && parent != null && parent != "" ){
			if ( typeof parent.fncClickMenu == "function") {
				parent.fncClickMenu( url ,name, id, winType );
			} else if ( typeof fncClickMenu == "function") {
				fncClickMenu( url ,name, id, winType );
			}
		} else {
			if ( typeof fncClickMenu == "function") {
				fncClickMenu( url ,name, id, winType );
			}
		}
	} catch (e) {
		com.cm_logPrint("com.cm_winContainerOpen(): " + e.message);
		alert("com.cm_winContainerOpen(): " + e.message);
	} 		
};


/**
 * Message 출력(모든 메시지 출력 대체용)
 *
 * @param		msg 		: 뿌려줄 메시지
 * @param		alertYn 	: alert창으로 뿌려줄지 여부(true: alert창으로 출력, default: 하단 Footer영역에 출력) 
 * @example com.cm_msg("조회가 완료 되었습니다.");			//Footer 영역에 출력됨
 * 						com.cm_msg("조회가 완료 되었습니다.", true);	//alert 창으로 출력됨
 * 
 */
com.cm_msg = function( msg, alertYn ) {
	try {
		if ( typeof alertYn == "undefined" ){
			alertYn = false;
		}
	
		if ( typeof parent != "undefined" && parent != null && parent != "" && !alertYn ){ 
			if ( typeof parent.fncSetFooterMsg == "function") {
				parent.fncSetFooterMsg( msg );
			} else {
				alert(msg);
			}
		} else {
			alert(msg);
		}
	} catch (e) {
		com.cm_logPrint("com.cm_msg(): " + e.message);
		alert("com.cm_msg(): " + e.message);
	} 		
};


/**
 * Footer 조회건수 설정 
 *
 * @param		cnt	: 조회한 건수 
 */
com.cm_searchCntSet = function ( cnt ) {
	try {
		if ( typeof parent != "undefined" && parent != null && parent != "" ){ 
			if ( typeof parent.fncSetSearchCnt == "function") {
				parent.fncSetSearchCnt( cnt );
			}
		}
	} catch (e) {
		com.cm_logPrint("com.cm_seacrhCntSet(): " + e.message);
		alert("com.cm_seacrhCntSet(): " + e.message);
	} 		
};


/**
 * Footer 메시지 설정 
 *
 * @param		msg	: footer에 설정할 message 
 */
com.cm_footerMessageSet = function( msg ) {
	try {
		if ( typeof parent != "undefined" && parent != null && parent != "" ){ 
			if ( typeof parent.fncSetFooterMsg == "function") {
				parent.fncSetFooterMsg( msg );
			}
		}
	} catch (e) {
		com.cm_logPrint("com.cm_footerMessageSet(): " + e.message);
		alert("com.cm_footerMessageSet(): " + e.message);
	} 		
};


/**
 * 시스템 공통 메시지를 가져옵니다. 
 * 이 기능이 정상적으로 동작하려면 반드시 페이지가 index.jsp 내부에 존재해야만 합니다.
 * 
 * @param key: 가져올 공통 메시지 키
 * @param value: 메시지 내부에서 치환할 값. %s의 형태와 {n}의 형태를 모두 치환할 수 있습니다.
 * 
 * @returns 값이 치환된 메시지
 */
com.cm_getMessage = function (key, value) {
	try {
		var messages = top.g_message;
		//var messages = g_message;
		if (messages == null) {
			//팝업에서 사용 시 
			if (typeof opener != "undefined" && opener != null && opener != "") {
				messages = opener.top.g_message;	
			}
			if (messages == null) {
				//com.cm_msg("공통 메시지를 조회할 수 없습니다.");
				return "";
			}
		}
		
		var message = "";
		var length = messages.length;
		
		for (var i = 0; i < length; i ++) {
			if (messages[i].key == key) {
				message = com.cm_trim(messages[i].message);
				break;
			}
		}
		
		if (com.cm_isNullString(message))
			return "";
		
		var argLength = arguments.length;
		if (argLength == 2) {
			// 치환할 값이 1개 존재하는 경우.
			message = message.replace(/%s/ig, com.cm_safeString(value)).replace(/\{0\}/img, com.cm_safeString(value));	
		} else if (argLength > 2) {
			// 치환할 값이 1개 이상 존재하는 경우.
			for (var i = 1; i < argLength; i++) {
				var regEx = new RegExp("\\{" + (i - 1).toString() + "\\}", "img");
				message = message.replace(regEx, com.cm_safeString(arguments[i]));
			}
			message = message.replace(/\{\d{1,3}\}?/img, "");
		}
		
		return message;
	} catch (e) {
		com.cm_logPrint("com.cm_getMessage(): " + e.message);
		alert("com.cm_getMessage(): " + e.message);
	}
};


/**
 * 엔터키 입력 시 함수 콜
 * @description	엔터키 입력 시 함수 콜   
 * @param			e : e
 * 						fName 	: 호출할 함수 명  						
 * @example 	cm_inputEnter(e, "fn_selectNoticeInfo()");
 */
com.cm_inputEnter = function (e, fName) {
	try {
		if ( e.keyCode == 13 ){
			if ( typeof fName == "function" ) {
				fName(e);
			} else {
				eval(fName);	
			}
		}
	} catch (e) {
		com.cm_logPrint("com.cm_inputEnter(): " + e.message);
		alert("com.cm_inputEnter(): " + e.message);
	}
};


/**
 * 그리드뷰 필수입력항목 체크(값 입력여부)
 * @description	그리드뷰 필수입력항목 체크한다(값 입력여부) 
 * @param			paramArray : 필수입력 체크할 항목
 * @example 	var param = new Array();
 *				param[0] = new Array("grid1", "dataList1", "field1|field2|field3");	-- 첫번째 그리드( "그리드뷰ID", "데이타리스트ID", "체크필드ID | 체크필드ID | ..." )
 *				param[1] = new Array("grid2", "dataList2", "field1|field2");			-- 두번째 그리드 ...
 *				...
 *				com.cm_chkRequiredGridView( param );
 *
 *				그리드 헤더컬럼ID 값은 "HD_"+바디컬럼ID 로 구성... 헤더컬럼 Value 값이 없을 경우 바디컬럼 ID 값 출력
 *				ex) COL ==> HD_COL
 */
com.cm_chkRequiredGridView = function ( paramArray ) {
	try {
    	if ( typeof paramArray != "undefined" && paramArray == null ) {
    		com.cm_msg("체크할 정보가 없습니다");
    		return false;
    	} else {
    		var tmpArr = null;
    		var grdObj = null;
    		var dataObj = null;
    		var fieldArr = null;
    		var displayVal = "";
    		/*
    		for ( var ii=0; ii< paramArray.length; ii++ ) {
    			tmpArr = paramArray[ii];
    			grdObj = eval(tmpArr[0]);
    			dataObj = eval(tmpArr[1]);
    			fieldArr = tmpArr[2].split("|");
    			for ( var i=0; i<grdObj.getDataLength(); i++ ) {
    				if ( dataObj.getRowStatus(i) == "C" || dataObj.getRowStatus(i) == "U" ) { 
    					for ( var j=0; j<grdObj.getTotalCol(); j++ ) {
    						for ( var k=0; k<fieldArr.length; k++ ){
    							var colId = grdObj.getColumnID(j);
    							if ( colId == fieldArr[k] ) {
    								if ( dataObj.getCellData(i,colId) == null || dataObj.getCellData(i,colId) == "" ) {
    									displayVal = grdObj.getHeaderValue("HD_"+colId);
    									if ( typeof displayVal == "undefined" || displayVal=="") displayVal = colId;
    									
    									com.cm_msg("[ "+displayVal + " ] 항목은 필수 입력 항목 입니다.");
    									grdObj.setFocusedCell(i, j, true);
    									return false;
    								}//end if ( dataObj.getCellData(i,colId) == "" ) 
    							}//end if ( colId == fieldArr[k] )
    						}//end for ( var k=0; k<fieldArr.length; k++ )
    					}//end for ( var j=0; j<grdObj.getTotalCol(); j++ )
    				}//end if ( dataObj.getRowStatus(i) == "C" || dataObj.getRowStatus(i) == "U" ) 
    			}//end for ( var i=0; i<grdObj.getDataLength(); i++ )
    		}//end for ( var ii=0; ii< paramArray.length; ii++ )
    		*/
    		/* 변경 후 */
    		for ( var ii=0; ii< paramArray.length; ii++ ) {
    			tmpArr = paramArray[ii];
    			grdObj = eval(tmpArr[0]);
    			dataObj = eval(tmpArr[1]);
    			fieldArr = tmpArr[2].split("|");
    			// getDataLength() 함수를 반복 호출하는 것은 성능상 좋지 않기 때문에 한번만 참조하도록 변수를 선언했습니다.
    			var dataLength = dataObj.getRowCount();  
    			for ( var i = 0; i < dataLength; i++ ) {
    				if ( dataObj.getRowStatus(i) == "C" || dataObj.getRowStatus(i) == "U" ) { 
    					for ( var k=0; k < fieldArr.length; k++ ) {
    						var cellValue = dataObj.getCellData(i, fieldArr[k]);
    						if ( cellValue == null || cellValue == "" ) {
    							displayVal = grdObj.getHeaderValue("HD_"+fieldArr[k]);
    							com.cm_msg("[ "+displayVal + " ] 항목은 필수 입력 항목 입니다.");
    							grdObj.setFocusedCell(i, fieldArr[k], true);
    							return false;
    						}
    					}					
     				} //end if ( dataObj.getRowStatus(i) == "C" || dataObj.getRowStatus(i) == "U" ) 
    			} //end for ( var i=0; i<grdObj.getDataLength(); i++ )
    			
    		} //end for ( var ii=0; ii< paramArray.length; ii++ )    	
    		
    		return true;
    	}
	} catch (e) {
		com.cm_logPrint("com.cm_chkRequiredGridView(): " + e.message);
		alert("com.cm_chkRequiredGridView(): " + e.message);
	}    	
};


/**
 * 그리드뷰 필수입력항목 체크(값 입력여부)
 * @description	그리드뷰 필수입력항목 체크한다(값 입력여부) 
 * @param			paramArray : 필수입력 체크할 항목
 * @example 	var param = new Array();
 *				param[0] = new Array("grid1", "dataList1", "field1|field2|field3");	-- 첫번째 그리드( "그리드뷰ID", "데이타리스트ID", "체크필드ID | 체크필드ID | ..." )
 *				param[1] = new Array("grid2", "dataList2", "field1|field2");			-- 두번째 그리드 ...
 *				...
 *				com.cm_chkRequiredGridView( param );
 *
 *				그리드 헤더컬럼ID 값은 "HD_"+바디컬럼ID 로 구성... 헤더컬럼 Value 값이 없을 경우 바디컬럼 ID 값 출력
 *				ex) COL ==> HD_COL
 */
com.cm_chkRequiredGridView2 = function ( paramArray ) {
	try {
		if ( typeof paramArray != "undefined" && paramArray == null ) {
    		com.cm_msg("체크할 정보가 없습니다");
    		return false;
    	} else {
    		var tmpArr = null;
    		var grdObj = null;
    		var dataObj = null;
    		var fieldArr = null;
    		var displayVal = "";
    		
    		/* 변경 후 */
    		for ( var ii=0; ii< paramArray.length; ii++ ) {
    			tmpArr = paramArray[ii];
    			grdObj = eval(tmpArr[0]);
    			dataObj = eval(tmpArr[1]);
    			fieldArr = tmpArr[2].split("|");
    			// getDataLength() 함수를 반복 호출하는 것은 성능상 좋지 않기 때문에 한번만 참조하도록 변수를 선언했습니다.
    			var dataLength = dataObj.getRowCount();  
    			for ( var i = 0; i < dataLength; i++ ) {
					for ( var k=0; k < fieldArr.length; k++ ) {
						var cellValue = dataObj.getCellData(i, fieldArr[k]);
						if ( cellValue == null || cellValue == "" ) {
							displayVal = grdObj.getHeaderValue("HD_"+fieldArr[k]);
							alert("[ "+displayVal + " ] 항목은 필수 입력 항목 입니다.");
							grdObj.setFocusedCell(i, fieldArr[k], true);
							return false;
						}
					}					
    			}
    		}
    		
    		return true;
    	}
	} catch (e) {
		com.cm_logPrint("com.cm_chkRequiredGridView(): " + e.message);
		alert("com.cm_chkRequiredGridView(): " + e.message);
	}    	
};


com.cm_gridSize = function () {
	// 브라우저 종류에 따른 cross browsing은 현재 고려하지 않음
	var container_wrap =  0;
	var con_tit = 0;
	var con_hd = 0;
	var con_ft = 0;
	var tabControl1 = 0;
	var btnArea = 0;
	
	try{
		//var screenHeight = parseInt($(window).height()) - 15; // -10은 브라우저 별로 마진을 준것음(원래는 브라우저 종류별로 달라야 함)
		/*
		container_wrap =  parseInt($("#container_wrap").height());		
		try{con_tit = parseInt($("#con_tit").height()) + 15;}catch(e){}
		try{con_hd = parseInt($("#con_hd").height()) + 15;}catch(e){}
		try{con_ft = parseInt($("#con_ft").height()) + 15;}catch(e){}
		try{tabControl1 = parseInt($("#tabControl1").height()) + 15;}catch(e){}
		
		var listHeight = container_wrap - con_tit - con_hd - con_ft - tabControl1 ;
		
		try{$("#grid_wrap").css("height", listHeight);}catch(e){}		
		*/

		container_wrap	= com.cm_isNull($("#container_wrap").height()) ? 0 : parseInt($("#container_wrap").height());	//윈도우컨테이너 높이
		con_tit			= com.cm_isNull($("#con_tit").height()) ? 15 : parseInt($("#con_tit").height())+15;				//타이틀 영역 높이 
		con_hd			= com.cm_isNull($("#con_hd").height()) ? 15 : parseInt($("#con_hd").height())+15;				//조회영역 높이
		con_ft			= com.cm_isNull($("#con_ft").height()) ? 15 : parseInt($("#con_ft").height())+15;				//탭영역 높이
		tabControl1		= com.cm_isNull($("#tabControl1").height()) ? 15 : parseInt($("#tabControl1").height())+15;		
		if ( typeof top_but_li != 'undefined' ){ btnArea = 25;}
		//if ( top_but_li ){ btnArea = 25;}
		
		container_wrap 	= container_wrap <= 640 ? 665 : container_wrap;
		var listHeight = container_wrap - con_tit - con_hd - con_ft - tabControl1 - btnArea;		//그리드 높이 지정		
		try{$("#grid_wrap").css("height", listHeight);}catch(e){}
		
	}catch(e){
		
	}
	
	//$("#box2").css("height", box2);
	
};


/**
 * 서버의 현재 날짜를 가져옵니다.
 * 
 * @param pattern: 조회할 날짜 패턴
 *		- y Year: 1996, 96
 *		- M Month: 07
 *		- d Day: 10
 *		- H Hour: (0-23) 0
 *		- m Minute: 30
 *		- s Second: 55
 *		- S Millisecond: 978
 *
 * @returns 지정한 패턴의 서버 날짜 문자열
 */
com.cm_getCurrentDate = function(pattern) {
	try {
		if ( typeof pattern == "undefined" || parent == null || parent == "" ){ 
			pattern = "yyyyMMdd";		//yyyy-MM-dd
		}
		return WebSquare.date.getCurrentServerDate(pattern);
	} catch (e) {
		com.cm_logPrint("com.cm_getCurrentDate(): " + e.message);
		alert("com.cm_getCurrentDate(): " + e.message);
	}
};


/**
 * 정규식을 이용하여 천단위마다 콤마 추가
 * @param amt
 * @returns
 */
com.cm_getCurrency = function(amt) {
	amt = amt.replace(/,/gi,"");
	return amt.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,'); 
};


/**

 * 날짜형식 체크

 * 각 형식별로 날짜형식에 맞으면 "OK" return

 * 맞지 않으면 해당하는 에러메시지 return

 */
com.cm_checkDate = function(sDate) {
	var maxDays = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	var maxDay = 0;

	if(isNaN(sDate)) {
		return "숫자만 입력하세요";
	} else if(sDate.length == 4) {
		return "OK";
	} else if(sDate.length == 6 || sDate.length == 8) {
		if (sDate.length == 6){
			sDate = sDate + "01";
		}
		var iYear = Math.floor(sDate / 10000);
		var iMonth = Math.floor(sDate / 100 - iYear * 100);
		var iDay = sDate % 100;
		if(iMonth < 1 || iMonth > 12) {
			return "월은 1 ~ 12월 까지입니다";
		} else if(sDate.length == 6) {
			return "OK";
		}

		if(sDate.length == 8) {
			if((iMonth == 2) && (iYear % 4 == 0 && iYear % 100 != 0 || iYear % 400 == 0)) {
				maxDay = 29;
			} else {
				maxDay = maxDays[iMonth - 1];
			}

			if(iDay < 1 || iDay > maxDay) {
				return iMonth + "월은 " + "1 ~ " + maxDay + " 일까지입니다";
			} else {
				return "OK";
			}
		}
	} else {
		return "날짜의 자릿수가 맞지 않습니다.";
	}
};


/**
 * 조직 코드 만드는 함수 
 * @param deptCd
 * @param officeCd 기본값 '00'
 * @param teamCd 기본값 '00'
 * @example com.cm_makeOrnz('11', '22', '33') return '112233'
 * 			com.cm_makeOrnz('11', '22') return '112200' 
 * 			com.cm_makeOrnz('11') return '110000'
 * @returns ornz_cd
 */
com.cm_makeOrnzCd = function(deptCd, officeCd, teamCd) {
	officeCd = (typeof officeCd !== 'undefined') ? officeCd : '00';
	teamCd = (typeof teamCd !== 'undefined') ? teamCd : '00';
	
	return deptCd + officeCd + teamCd;
};


/**
 * Process 메시지 출력 (꼭! Process 메시지 닫기 와 쌍을 이루어야 함) 
 *
 * @param		msg	: 출력할 메시지 내용 (미입력 시 처리중 출력) 
 */
com.cm_processMsgStart = function(msg) {
	try {
		var message = "처리중...";
		if ( typeof msg != "undefined" && msg != null && msg != "" ){
			message = msg;
		}
		WebSquare.layer.showProcessMessage( message );
	} catch (e) {
		com.cm_logPrint("com.cm_processMsgStart(): " + e.message);
		alert("com.cm_processMsgStart(): " + e.message);
	} 		
};


/**
 * Process 메시지 닫기
 * 
 */
com.cm_processMsgEnd = function() {
	try {
		WebSquare.layer.hideProcessMessage();
	} catch (e) {
		com.cm_logPrint("com.cm_processMsgEnd(): " + e.message);
		alert("com.cm_processMsgEnd(): " + e.message);
	} 		
};


/**
 * 윈도우컨테이너 화면 프로그램ID ( T_CM_PROGRAM 의 gMenuId+mMenuId+programId )
 * @Description	: 현재 실행중인 윈도우컨테이너 화면 의 ID 반환 (업무메인화면에서만 가능. 팝업에서는 제대로 인식 못함)
 * @param 	
 * @returns 	프로그램ID  
 */
com.cm_ProgramId = function() {
	var pgm_code = "";
	if ( $p.main().win_main ) {
		pgm_code = $p.main().win_main.getSelectedWindowId();
	}

	//업무화면이 팝업일 경우
	if ( pgm_code == "" ) {
		pgm_code = com.cm_safeString(WebSquare.net.getParameter( "popupID" ));
	}
		
	return pgm_code;
};


/**
 * 숫자 앞에 0 또는 'z'에 해당하는 문자로 채우는 함수
 * com.cm_pad( 숫자, 전체길이, [ 체울문자 ] )
 * @param n 입력숫자
 * @param width 전체길이
 * @param z 체울문자 기본값 '0'
 * @example com.cm_pad(7, 2);
 * 			>> '07'
 * @returns 
 */
com.cm_pad = function(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};


/**
 * 지정한 년도가 윤년인지 여부를 반환합니다.
 * 
 * @param year: 년도
 * @returns 윤년 여부
 */
com.cm_isLeaf = function(year) {
	try {
		try {
			if (isNaN(parseInt(year, 10)))
				return false;
		} catch(parseE) {
			return false;
		}
		
		var leaf = false;
		if (year % 4 == 0) {
			leaf = true;
			
			if (year % 100 == 0)
	        	leaf = false;
			
			if (year % 400 == 0)
	            leaf = true;
	    }
	    return leaf;
	} catch (e) {
		com.cm_logPrint("com.cm_isLeaf(): " + e.message);
		alert("com.cm_isLeaf(): " + e.message);
	}
};


/**
 * 지정한 날짜 문자열의 유효성을 검토합니다.
 * 
 * @param source: 유효성을 검토할 날짜 문자열입니다. 구분자를 제외하고 8자리 이상의 숫자여야 합니다.
 * @returns 유효성 여부 (true, false)
 */
com.cm_isValidDate = function (source) {
	try {
		source = source.replace(/\D/ig, "");
		if (isNaN(source) || source.length < 8) {
			return false;
		}
		
	    var isValid = false;
	    var month_day = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	    
	    var year  = parseInt(source.substring(0, 4), 10);
	    var month = parseInt(source.substring(4, 6), 10);
	    var day   = parseInt(source.substring(6, 8), 10);
	    
	    if (month < 1 || month > 12)
	    	return false;
	    
	    if (day < 1)
	        return false;
	    
	    if (com.cm_isLeaf(year)) {
	        if (month == 2) {
	            if (day <= month_day[month - 1] + 1)
	                isValid = true;
	        } else {
	            if (day <= month_day[month - 1])
	                isValid = true;
	        }
	    } else {
	        if (day <= month_day[month - 1])
	            isValid = true;
	    }
	    
	    return isValid;
	} catch (e) {
		com.cm_logPrint("com.cm_isValidDate(): " + e.message);
		return false;
	}
};


/**
 * 지정한 날짜(yyyyMMdd)에 지정한 개월을 추가합니다.
 * 
 * @param source: 기준 날짜입니다. 구분자를 제외하고 8자리 숫자여야 합니다.
 * @param addMonth: 추가할 개월 수 입니다. (- 값을 지정할 수 있습니다.)
 * @returns yyyyMMdd 형태의 결과 날짜
 */
com.cm_addMonthYMD = function(source, addMonth) {
	try {
		source = source.replace(/\D/ig, "");
		if (isNaN(source) || source.length < 8) {
			return "";
		}
		
		if (com.cm_isValidDate(source)) {
			var year  = source.substring(0, 4);
			var month = source.substring(4, 6);
			var day   = source.substring(6, 8);
		
			month = parseInt(month, 10) + parseInt(addMonth, 10);
		
			var newDate  = new Date(year, month - 1, day);
			var newYear  = newDate.getFullYear();
			var newMonth = newDate.getMonth() + 1;
			var newDay   = newDate.getDate();
			
			if (newMonth.toString().length < 2)
				newMonth = "0" + newMonth;
			
			if (newDay.toString().length < 2)
				newDay = "0" + newDay;
		
			return newYear.toString() + newMonth.toString() + newDay.toString();
		} else {
			com.cm_msg("날짜 문자열 형식이 올바르지 않습니다.");
			return "";
		}
	} catch (e) {
		com.cm_logPrint("com.cm_addMonthYMD(): " + e.message);
		alert("com.cm_addMonthYMD(): " + e.message);
	}
};

/**
 * 지정한 날짜(yyyyMM)에 지정한 개월을 추가합니다.
 * 
 * @param source: 기준 날짜입니다. 구분자를 제외하고 6자리 숫자여야 합니다.
 * @param addMonth: 추가할 개월 수 입니다. (- 값을 지정할 수 있습니다.)
 * @returns yyyyMM 형태의 결과 날짜
 */
com.cm_addMonthYM = function(source, addMonth) {
	try {
		source = source.replace(/\D/ig, "");
		if (isNaN(source) || source.length < 6) {
			return "";
		}
		
		return com.cm_addMonthYMD(source + "01", addMonth).substr(0, 6);
	} catch (e) {
		com.cm_logPrint("com.cm_addMonthYM(): " + e.message);
		alert("com.cm_addMonthYM(): " + e.message);
	}
};


/**
 * 지정한 날짜(yyyyMMdd)에 지정한 날을 추가합니다.
 * 
 * @param source: 기준 날짜입니다. 구분자를 제외하고 8자리 숫자여야 합니다.
 * @param addDay: 추가할 날의 수 입니다. (- 값을 지정할 수 있습니다.)
 * @returns yyyyMMdd 형태의 결과 날짜
 */
com.cm_addDayYMD = function(source, addDay) {
	try {
		source = source.replace(/\D/ig, "");
		if (isNaN(source) || source.length < 8) {
			return "";
		}

		return WebSquare.date.dateAdd(source.substr(0, 8), addDay);
	} catch (e) {
		com.cm_logPrint("com.cm_addDayYMD(): " + e.message);
		alert("com.cm_addDayYMD(): " + e.message);
	}
};


/**
 * 기준 월(yyyyMM)로부터 비교대상 월(yyyyMM)까지 차이나는 달 수를 반환합니다.
 * 
 * @param fromMonth: 기준 월 (구분자를 제외하고 6자리 이상의 숫자여야 합니다.)
 * @param toMonth: 비교대상 월 (구분자를 제외하고 6자리 이상의 숫자여야 합니다.)
 * @return 기준 월부터 비교대상 월 간의 차이 (비교대상 월이 더 크면 양수)  
 */
com.cm_getMonthInterval = function(fromMonth, toMonth) {
	try {
		fromMonth = fromMonth.replace(/\D/ig, "");
		if (isNaN(fromMonth) || fromMonth.length < 6) {
			com.cm_msg("구분자를 제외하고 최소 6자 이상의 숫자값을 입력하여 주십시오.");
			return "";
		}
		
		toMonth = toMonth.replace(/\D/ig, "");
		if (isNaN(toMonth) || toMonth.length < 6) {
			com.cm_msg("구분자를 제외하고 최소 6자 이상의 숫자값을 입력하여 주십시오.");
			return "";
		}
		
		var intervalYear  = parseInt(toMonth.substr(0, 4), 10) - parseInt(fromMonth.substr(0, 4), 10);
		var intervalMonth = parseInt(toMonth.substr(4, 2), 10) - parseInt(fromMonth.substr(4, 2), 10);
		
		return (12 * intervalYear) + intervalMonth;
	} catch (e) {
		com.cm_logPrint("com.cm_getMonthInterval(): " + e.message);
		alert("com.cm_getMonthInterval(): " + e.message);
	}
};


/**
 * 두 날짜 사이의 차이나는 날짜 수를 반환합니다.
 * 
 * @param fromDate: 기준일자 (구분자를 제외하고 8자리 이상의 숫자여야 합니다.)
 * @param toDate: 비교대상 일자 (구분자를 제외하고 8자리 이상의 숫자여야 합니다.)
 * @returns 기준일자와 비교대상 일자 간의 날짜 수
 */
com.cm_getDayInterval = function(fromDate, toDate) {
	try {
		fromDate = fromDate.replace(/\D/ig, "");
		if (isNaN(fromDate) || fromDate.length < 8) {
			com.cm_msg("구분자를 제외하고 최소 8자 이상의 숫자값을 입력하여 주십시오.");
			return "";
		}
		
		toDate = toDate.replace(/\D/ig, "");
		if (isNaN(toDate) || toDate.length < 8) {
			com.cm_msg("구분자를 제외하고 최소 8자 이상의 숫자값을 입력하여 주십시오.");
			return "";
		}
		
		return WebSquare.date.dateDiff(fromDate.substr(0, 8), toDate.substr(0, 8));	
	} catch (e) {
		com.cm_logPrint("com.cm_getDayInterval(): " + e.message);
		alert("com.cm_getDayInterval(): " + e.message);
	}
};


/**
 * 지정한 날짜의 요일을 반환합니다.
 * 
 * @param source: 요일을 검사할 날짜입니다. 구분자를 제외하고 8자리 이상의 숫자여야 합니다.
 * @returns 요일명
 */
com.cm_getDayOfWeek = function(source) {
	try {
		var result = "";
		
		var date = com.cm_parseDate(source);
		if (com.cm_isNull(date))
			return "";
		
		switch (date.getDay()) {
			case 0:
				result = "일";
				break;
			case 1:
				result = "월";
				break;
			case 2:
				result = "화";
				break;
			case 3:
				result = "수";
				break;
			case 4:
				result = "목";
				break;
			case 5:
				result = "금";
				break;
			case 6:
				result = "토";
				break;
		}
		
		return result;
	} catch (e) {
		com.cm_logPrint("com.cm_getDayOfWeek(): " + e.message);
		alert("com.cm_getDayOfWeek(): " + e.message);
	}
};


/**
 * 지정한 날짜의 음력 날짜를 반환합니다.
 * 
 * @param source: 음력 날짜로 변환할 날짜입니다. 구분자를 제외하고 8자리 이상의 숫자여야 합니다.
 * @returns 음력날짜
 */
com.cm_getLunarDate = function(source) {
	try {
		source = source.replace(/\D/ig, "");
		if (isNaN(source) || source.length < 8) {
			com.cm_msg("구분자를 제외하고 최소 8자 이상의 숫자값을 입력하여 주십시오.");
			return "";
		}
		
		return WebSquare.date.toLunar(source.substr(0, 8));
	} catch (e) {
		com.cm_logPrint("com.cm_getLunarDate(): " + e.message);
		alert("com.cm_getLunarDate(): " + e.message);
	}
};


/**
 * 지정한 날짜를 Date 개체로 변환합니다.
 * 
 * @param source: 변경할 날짜입니다. 구분자를 제외하고 8자리 숫자여야 합니다.
 * @returns Date 개체
 */
com.cm_parseDate = function(source) {
	try {
		source = source.replace(/\D/ig, "");
		if (isNaN(source) || source.length != 8) {
			com.cm_msg("구분자를 제외하고 최소 8자 이상의 숫자값을 입력하여 주십시오.");
			return null;
		}
		
		// 구현 변경: WebSquare 내부 함수 사용
		return WebSquare.date.parseDate(source.substr(0, 8)); 
	} catch (e) {
		com.cm_logPrint("com.cm_parseDate(): " + e.message);
		alert("com.cm_parseDate(): " + e.message);
	}
};


/**
 * 현재 선택된 윈도우컨테이너(MDI)창 닫기 
 *
 */
com.cm_winContainerClose = function() {
	try {
		if ( typeof parent != "undefined" && parent != null && parent != "" ){ 
			if ( typeof parent.fncCloseMenu == "function") {
				parent.fncCloseMenu();
			}
		}
	} catch (e) {
		com.cm_logPrint("com.cm_winContainerClose(): " + e.message);
		alert("com.cm_winContainerClose(): " + e.message);
	} 		
};


/**
 * 화면별 navigator 설정
 * 
 * @param		pgmId: 윈도우컨테이너ID (대분류ID + 중분류ID + 프로그램ID)
 * @returns	각 화면의 navigator 에 명칭 셋팅 
 */
com.cm_setNavigator = function(pgmId) {
	try {
		if ( pgmId == null){
			pgmId = com.cm_ProgramId();
		}
	
		var gMenuId = "";
		var mMenuId = "";
		var programId = "";
		
		var len = pgmId.length;		
		if ( len == 5 || len == 6 ){
			gMenuId = pgmId.substring(0, 2);
			mMenuId = pgmId.substring(2, 4);
			programId = pgmId.substring(4);
		} else {
			return;
		}

		var CODE_TYPE	= "setNavigator";
		var url 				= "/commCodeContent.do";
		
		var conditionParams = new Array();
		conditionParams = com.cm_paramSet( conditionParams, gMenuId );
		conditionParams = com.cm_paramSet( conditionParams, mMenuId );	
		conditionParams = com.cm_paramSet( conditionParams, programId );	
		
		var requestData = new Object();
		requestData.type = "commonCode."+CODE_TYPE;
		requestData.conditions = conditionParams;		
		
		$.ajax({
			type : "POST",
			url  : url,
			dataType : "json",
			data : {"reqParams" : JSON.stringify(requestData)},
			success : function(data, textStatus, jqXHR ){

				var jsonNode 		= WebSquare.json.JSON2XML(data);
				var gMenuNm		= WebSquare.xml.getValue(jsonNode, "object/codes/object/content1");
				var mMenuNm		= WebSquare.xml.getValue(jsonNode, "object/codes/object/content2");
				var programNm 	= WebSquare.xml.getValue(jsonNode, "object/codes/object/content3");
				var programCd 	= WebSquare.xml.getValue(jsonNode, "object/codes/object/content4");
				//alert("gMenuNm=>"+gMenuNm+", mMenuNm=>"+mMenuNm+", programNm=>"+programNm+", programCd=>"+programCd);
				
				//화면 프로그램명
				if (typeof tit_nm != "undefined" && programNm != ""){
					var titleNm = programNm;
					if ( programCd != "" ){
						titleNm = titleNm + " (" + programCd + ")" ;		//프로그램코드(SCR_CM_001) 추가 
					}
					tit_nm.setValue(titleNm);	
				}
				//대분류명
				if (typeof navi_nm_1 != "undefined" && gMenuNm != ""){
					navi_nm_1.setValue(gMenuNm);
				}
				//중분류명
				if (typeof navi_nm_2 != "undefined" && mMenuNm != ""){
					navi_nm_2.setValue(mMenuNm);
				}
				//프로그램명
				if (typeof navi_nm_3 != "undefined"){
					navi_nm_3.addClass( "bold" );			//강조 처리
					if ( programNm != "" ){
						navi_nm_3.setValue(programNm);						
					}
				}			
				
			},
			error : function(jqXHR, textStatus, errorThrown ){
				//com.cm_msg("정보 조회 중 예상하지 못한 오류가 발생하였습니다.");
				com.cm_error();	
			}		
		});
	} catch (e) {
        com.cm_logPrint("com.cm_setNavigator(): " + e.message);
        alert("com.cm_setNavigator(): " + e.message);
	}
};


/**
 * Textarea 글자수 체크하여 leng보다 클 경우는 자동 삭제 처리
 */
com.cm_chByte = function(fieldId, leng) {
	var string = fieldId.getValue();
	var string_len = string.length;
	var cal_byte = 0;
	var f_string_len = 0;
	var onechar;
	var result = false;
	for( var k=0;k<string_len;k++ ) {
		onechar = string.charAt(k);
		if (escape(onechar).length > 4) {
			cal_byte += 2;
		}else if (onechar!='\r') {
			cal_byte++;
		}

		if(cal_byte <= leng) {
			f_string_len = k + 1;
		}
	}

	if( cal_byte > leng ) {
		com.cm_msg(leng+"byte 이상의 메시지를 전송하실 수 없습니다. \n 초과된 내용은 자동으로 삭제 됩니다. ");
		f_string = string.substr(0, f_string_len);
		fieldId.setValue(f_string);
		result = false;
	} else {
		result = true;
	}

	fieldId.focus();

	return result;
};


/**
 * 입력값의 바이트 길이를 리턴
 * @param string 입력문자열
 * @returns 입력문자열의 byte
 */
com.cm_getByte = function(string) {
    var byteLength = 0;
    for (var inx = 0; inx < string.length; inx++) {
        var oneChar = escape(string.charAt(inx));
        if ( oneChar.length == 1 ) {
            byteLength ++;
        } else if (oneChar.indexOf("%u") != -1) {
            byteLength += 2;
        } else if (oneChar.indexOf("%") != -1) {
            byteLength += oneChar.length/3;
        }
    }
    return byteLength;
};


/**
 * byte길이만큼 문자열 반환
 * @param string 전체문자열
 * @param byteLength 반환할 문자열 길이
 * @returns 요청한 byte보다 같거나 적은 문자열 반환
 */
com.cm_getByteString = function(string, byteLength) {
	if( !byteLength ){
		byteLength = 80;
	}
	var blength = 0;
	var tmp = 0;
	var inx = 0;
    for (; inx < string.length; inx++) {
        var oneChar = escape(string.charAt(inx));
        if ( oneChar.length == 1 ) {
            tmp = blength + 1;
            if(tmp > byteLength){            	
            	break;
            }
            blength = tmp;
        } else if (oneChar.indexOf("%u") != -1) {
        	tmp = blength + 2;
        	if(tmp > byteLength){
        		break;
            }
        	blength = tmp;
        } else if (oneChar.indexOf("%") != -1) {
        	tmp = blength + oneChar.length/3;
        	if(blength > byteLength){
        		break;
            }
        	blength = tmp;
        }
    }
    return string.substring(0,inx);
};


/**
 * 한글인 경우 Java에서 length()에서 1문자로 인식되는 문제를 해결하기 위하여,
 * 한글을 2byte로 인식하여 길이를 구한다.
*/
com.cm_getByteLength = function(source) {
	var str = com.cm_getValue(source);
	var byteStr = escape(str);
	var realLength = 0;
	var tmpChr;

	for (var i = 0; i < byteStr.length; i++) {
		tmpChr = byteStr.charAt(i);
		if (tmpChr == '%') {
			if (byteStr.charAt(i + 1) == 'u') {
				realLength += 2;
				i += 5;
			}	else {
				realLength++;
				i += 2;
			}
		} else {
			realLength++;
		}
	}

	return realLength;
};
 

/**
 * source가 Object인 경우, value를 그렇지 않은 경우 source의 값을
 * com.cm_trim()하여 return 한다.
 */
com.cm_getValue = function(source) {
	return source == '[object]' ? com.cm_trim(source.getValue()) : com.cm_trim(String(source));
};


/**
 * 일자체크
 * com.cm_dateCheck(this);
 */
com.cm_dateCheck = function(pDate) {
	
	try {
		var vDate   = pDate.getValue();
		var iYear   = Math.floor(vDate / 10000);
		var iMonth  = Math.floor(vDate / 100 - iYear * 100);
		var iDay    = vDate % 100;
		var maxDays = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
		var maxDay  = 0;
		
		if((iMonth == 2) && (iYear % 4 == 0 && iYear % 100 != 0 || iYear % 400 == 0)) {
			maxDay = 29;
		} else {
			maxDay = maxDays[iMonth - 1];
		}
		
		if(vDate.length > 0) {
			if(vDate.length != 8){
				// 날짜의 자릿수가 맞지 않습니다.
				com.cm_msg(com.cm_getMessage("FUND.E0036"));
				pDate.focus();
				return;
			}
			if(iMonth < 1 || iMonth > 12) {
				// 날짜 형식이 잘못 되었습니다.
				com.cm_msg(com.cm_getMessage("FUND.E0138"));
				pDate.focus();
				return;
			} 
			if(iDay < 1 || iDay > maxDay) {
				// 날짜 형식이 잘못 되었습니다.
				com.cm_msg(com.cm_getMessage("FUND.E0138"));
				pDate.focus();
				return;
			}
			return "ok";
		}
		
	} catch (e) {
		alert("com.cm_dateCheck(): " + e.message);
		WebSquare.exception.printStackTrace(e);
	}
	
};


com.cm_dateGridCheck = function(pRow, pCol, pValue) {
	
	try {
		var vDate   = pValue;
		var iYear   = Math.floor(vDate / 10000);
		var iMonth  = Math.floor(vDate / 100 - iYear * 100);
		var iDay    = vDate % 100;
		var maxDays = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
		var maxDay  = 0;
		
		if((iMonth == 2) && (iYear % 4 == 0 && iYear % 100 != 0 || iYear % 400 == 0)) {
			maxDay = 29;
		} else {
			maxDay = maxDays[iMonth - 1];
		}
		
		if(vDate.length > 0) {
			if(vDate.length != 8){
				// 날짜의 자릿수가 맞지 않습니다.
				com.cm_msg(com.cm_getMessage("FUND.E0036"));
				return true;
			}
			if(iMonth < 1 || iMonth > 12) {
				// 날짜 형식이 잘못 되었습니다.
				com.cm_msg(com.cm_getMessage("FUND.E0138"));
				return true;
			} 
			if(iDay < 1 || iDay > maxDay) {
				// 날짜 형식이 잘못 되었습니다.
				com.cm_msg(com.cm_getMessage("FUND.E0138"));
				return true;
			}
			return false;
		}
		
	} catch (e) {
		alert("com.cm_dateGridCheck(): " + e.message);
		WebSquare.exception.printStackTrace(e);
	}
	
};


/**
 * 일자체크
 * 8자리 숫자string으로 조회할 경우
 * any는 어떤 값이든 상관없음
 * com.cm_dateCheck(this);
 */
com.cm_dateStringCheck = function(pDate, any) {
	
	try {
		var vDate   = pDate;
		var iYear   = Math.floor(vDate / 10000);
		var iMonth  = Math.floor(vDate / 100 - iYear * 100);
		var iDay    = vDate % 100;
		var maxDays = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
		var maxDay  = 0;
		
		if((iMonth == 2) && (iYear % 4 == 0 && iYear % 100 != 0 || iYear % 400 == 0)) {
			maxDay = 29;
		} else {
			maxDay = maxDays[iMonth - 1];
		}
		
		if(com.cm_getByteLength(vDate) > 0) {
			if(com.cm_getByteLength(vDate) != 8){
				// 날짜의 자릿수가 맞지 않습니다.
				com.cm_msg(com.cm_getMessage("FUND.E0036"));
				pDate.focus();
				return;
			}
			if(iMonth < 1 || iMonth > 12) {
				// 날짜 형식이 잘못 되었습니다.
				com.cm_msg(com.cm_getMessage("FUND.E0138"));
				pDate.focus();
				return;
			} 
			if(iDay < 1 || iDay > maxDay) {
				// 날짜 형식이 잘못 되었습니다.
				com.cm_msg(com.cm_getMessage("FUND.E0138"));
				pDate.focus();
				return;
			}
			return "ok";
		}
		
	} catch (e) {
		alert("com.cm_dateCheck(): " + e.message);
		WebSquare.exception.printStackTrace(e);
	}
	
};


/**
 * 월체크
 * com.cm_monCheck(this);
 */
com.cm_monCheck = function(pMon) {
	
	try {
		var vMon   = pMon.getValue();
		var iYear   = Math.floor(vMon / 100);
		var iMonth  = vMon - iYear * 100;
		
		if(vMon.length > 0) {
			if(vMon.length != 6){
				// 날짜의 자릿수가 맞지 않습니다.
				com.cm_msg(com.cm_getMessage("FUND.E0036"));
				// com.cm_msg(vMon);
				pMon.focus();
				return;
			}
			if(iMonth < 1 || iMonth > 12) {
				// 날짜 형식이 잘못 되었습니다.
				com.cm_msg(com.cm_getMessage("FUND.E0138"));
				pMon.focus();
				return;
			} 
			if(iYear < 1999 || iYear > 2099) {
				// 날짜 형식이 잘못 되었습니다.
				//com.cm_msg(cm_getMessage("FUND.E0138"));
				com.cm_msg(com.cm_getMessage("FUND.E0138"));
				pMon.focus();
				return;
			} 
			return "ok";
		}
		
	} catch (e) {
		alert("com.cm_monCheck(): " + e.message);
		WebSquare.exception.printStackTrace(e);
	}
	
};


/**
 * 시간체크
 * com.cm_timeCheck(this);
 */
com.cm_timeCheck = function(pTime) {
	
	try {
		var vTime = pTime.getValue();
		if(vTime.length != 6) {
			// 시간의 자릿수가 맞지 않습니다.
			com.cm_msg(com.cm_getMessage("FUND.E0137"));
			pTime.focus();
			return "";
		}
		
		if(23 < parseInt(vTime.substring(0,2),10)) {
			// 시간 형식이 잘못 되었습니다.
			com.cm_msg(com.cm_getMessage("FUND.E0139"));
			pTime.focus();
			return "";
		} 
		if(59 < parseInt(vTime.substring(2,4),10)) {
			// 시간 형식이 잘못 되었습니다.
			com.cm_msg(com.cm_getMessage("FUND.E0139"));
			pTime.focus();
			return "";
		} 
		if(59 < parseInt(vTime.substring(4,6),10)) {
			// 시간 형식이 잘못 되었습니다.
			com.cm_msg(com.cm_getMessage("FUND.E0139"));
			pTime.focus();
			return "";
		}
	} catch (e) {
		alert("com.cm_timeCheck(): " + e.message);
		WebSquare.exception.printStackTrace(e);
	}
	
};


/**
 * 시간체크
 * com.cm_timeCheck(this);
 */
com.cm_timeCheck2 = function(pTime) {
	
	try {
		var vTime = pTime.getValue();
		if(vTime.length != 4) {
			// 시간의 자릿수가 맞지 않습니다.
			com.cm_msg(com.cm_getMessage("FUND.E0137"));
			pTime.focus();
			return "";
		}
		
		if(23 < parseInt(vTime.substring(0,2),10)) {
			// 시간 형식이 잘못 되었습니다.
			com.cm_msg(com.cm_getMessage("FUND.E0139"));
			pTime.focus();
			return "";
		} 
		if(59 < parseInt(vTime.substring(2,4),10)) {
			// 시간 형식이 잘못 되었습니다.
			com.cm_msg(com.cm_getMessage("FUND.E0139"));
			pTime.focus();
			return "";
		}
	} catch (e) {
		alert("com.cm_timeCheck2(): " + e.message);
		WebSquare.exception.printStackTrace(e);
	}
	
};


/**
 * 시간체크(6자리)
 * com.cm_timeGridCheck(this);
 */
com.cm_timeGridCheck = function(pRow, pCol, pValue) {
	
	try {
		var vTime = pValue;
		if(vTime.length != 6) {
			// 시간의 자릿수가 맞지 않습니다.
			com.cm_msg(com.cm_getMessage("FUND.E0137"));
			return true;
		}
		
		if(23 < parseInt(vTime.substring(0,2),10)) {
			// 시간 형식이 잘못 되었습니다.
			com.cm_msg(com.cm_getMessage("FUND.E0139"));
			return true;
		} 
		if(59 < parseInt(vTime.substring(2,4),10)) {
			// 시간 형식이 잘못 되었습니다.
			com.cm_msg(com.cm_getMessage("FUND.E0139"));
			return true;
		} 
		if(59 < parseInt(vTime.substring(4,6),10)) {
			// 시간 형식이 잘못 되었습니다.
			com.cm_msg(com.cm_getMessage("FUND.E0139"));
			return true;
		}
		return false;
	} catch (e) {
		alert("com.cm_timeGridCheck(): " + e.message);
		WebSquare.exception.printStackTrace(e);
	}
	
};


/**
 * 시간체크(4자리)
 * com.cm_timeGridCheck(this);
 */
com.cm_4timeGridCheck = function(pRow, pCol, pValue) {
	
	try {
		var vTime = pValue;
		if(vTime.length != 4) {
			// 시간의 자릿수가 맞지 않습니다.
			com.cm_msg(com.cm_getMessage("FUND.E0137"));
			return true;
		}
		
		if(23 < parseInt(vTime.substring(0,2),10)) {
			// 시간 형식이 잘못 되었습니다.
			com.cm_msg(com.cm_getMessage("FUND.E0139"));
			return true;
		} 
		if(59 < parseInt(vTime.substring(2,4),10)) {
			// 시간 형식이 잘못 되었습니다.
			com.cm_msg(com.cm_getMessage("FUND.E0139"));
			return true;
		} 
		if(59 < parseInt(vTime.substring(4,6),10)) {
			// 시간 형식이 잘못 되었습니다.
			com.cm_msg(com.cm_getMessage("FUND.E0139"));
			return true;
		}
		return false;
	} catch (e) {
		alert("com.cm_timeGridCheck(): " + e.message);
		WebSquare.exception.printStackTrace(e);
	}
	
};


/**
 * 요일을 숫자로 변환(0~6)
 */
com.cm_day = function(pDate) {
	
	var vDate = WebSquare.date.getDay(pDate);
	var result = "";
	if(vDate=="일요일"){
		result = "0";
	}else if(vDate=="월요일"){
		result = "1";
	}else if(vDate=="화요일"){
		result = "2";
	}else if(vDate=="수요일"){
		result = "3";
	}else if(vDate=="목요일"){
		result = "4";
	}else if(vDate=="금요일"){
		result = "5";
	}else if(vDate=="토요일"){
		result = "6";
	}
	return  result;
	
};


/**
 * CTI 관련 로그아웃 처리 
 */
com.cm_ctiLogout = function() {
	try {
		if( window.parent.hiddenFrame3.ecsWebCTI == "undefined" || window.parent.hiddenFrame3.ecsWebCTI == null ){
			
		}else{
			window.parent.hiddenFrame3.Logout();
			window.parent.hiddenFrame3.vcRecLogout();
		}		
	} catch (e) {
		com.cm_logPrint("com.cm_ctiLogout(): " + e.message);
		WebSquare.exception.printStackTrace(e);
	}
};


/**
 * 선택된 날짜는 오늘 이후만 가능
 */
com.cm_isPickDateAfterToday = function(obj) {
	if (obj.getValue() != "" && obj.getValue() < com.cm_getCurrentDate()) {
		obj.setValue(comcm_getCurrentDate());
	}
};


/**
 * 시작일자가 종료일자보다 limit 1년 체크 
 * com.cm_startDateOnchange(txt_retvStrDate,txt_retvEndDate);
 */
com.cm_checkDateLimitYear = function(pStartDate, pEndDate) {
	try {
		var startDate = pStartDate.getValue();
		var endDate = pEndDate.getValue();
		if ( startDate == "" || endDate == "" ){
			return true;
		}
		
		var interval = com.cm_getDayInterval(startDate, endDate);
		if ( interval > 365 ){
			com.cm_msg("기간 은 최대 1년 기준 입니다.");
			pEndDate.setValue("");
			return false;
		}
		return true;
	} catch (e) {
		alert("com.cm_startDateOnchange(): " + e.message);
		WebSquare.exception.printStackTrace(e);
	}
	
};


/**
 * 시작일자가 종료일자보다 클 경우 시작일자를 종료일자에 자동 셋팅
 * com.cm_startDateOnchange(txt_retvStrDate,txt_retvEndDate);
 */
com.cm_startDateOnchange = function(pStartDate, pEndDate, maxDays) {
	try {
		if( !maxDays ){			
			//기간 최대 1년 체크 
			if ( ! com.cm_checkDateLimitYear(pStartDate, pEndDate) ){
				return
			}
		}
		else
		{
			var interval = com.cm_getDayInterval(pStartDate.getValue(), pEndDate.getValue());
			if( interval > maxDays)
			{
				com.cm_msg("기간 은 최대 " +maxDays+ "일기준 입니다.");
				pEndDate.setValue(pStartDate.getValue());
				return false;
			}
		}
		
		if(pStartDate.getValue()!="" && com.cm_dateCheck(pStartDate)=="ok"){
			if(pStartDate.getValue()>pEndDate.getValue()){
				pEndDate.setValue(pStartDate.getValue());
			}
		}
	} catch (e) {
		alert("com.cm_startDateOnchange(): " + e.message);
		WebSquare.exception.printStackTrace(e);
	}	
};


com.cm_startDateNoLimitOnchange = function(pStartDate, pEndDate) {
	try {
		if(pStartDate.getValue()!="" && com.cm_dateCheck(pStartDate)=="ok"){
			if(pStartDate.getValue()>pEndDate.getValue()){
				pEndDate.setValue(pStartDate.getValue());
			}
		}
	} catch (e) {
		alert("com.cm_startDateOnchange(): " + e.message);
		WebSquare.exception.printStackTrace(e);
	}	
};


/**
 * 종료일자가 시작일자보다 작을 경우 종료일자를 시작일자에 자동 셋팅
 * com.cm_endDateOnchange(txt_retvStrDate,txt_retvEndDate);
 */
com.cm_endDateOnchange = function(pStartDate, pEndDate, maxDays) {	
	try {
		
		if( !maxDays ){			
			//기간 최대 1년 체크 
			if ( ! com.cm_checkDateLimitYear(pStartDate, pEndDate) ){
				return
			}
		}
		else
		{
			var interval = com.cm_getDayInterval(pStartDate.getValue(), pEndDate.getValue());
			if( interval > maxDays)
			{
				com.cm_msg("기간 은 최대 " +maxDays+ "일기준 입니다.");
				pStartDate.setValue(pEndDate.getValue());
				return false;
			}
		}		
		
		if(pEndDate.getValue()!="" && com.cm_dateCheck(pEndDate)=="ok"){
			if(pStartDate.getValue()>pEndDate.getValue()){
				pStartDate.setValue(pEndDate.getValue());
			}
		}
	} catch (e) {
		alert("com.cm_endDateOnchange(): " + e.message);
		WebSquare.exception.printStackTrace(e);
	}	
};


com.cm_endDateNoLimitOnchange = function(pStartDate, pEndDate) {	
	try {
		if(pEndDate.getValue()!="" && com.cm_dateCheck(pEndDate)=="ok"){
			if(pStartDate.getValue()>pEndDate.getValue()){
				pStartDate.setValue(pEndDate.getValue());
			}
		}
	} catch (e) {
		alert("com.cm_endDateOnchange(): " + e.message);
		WebSquare.exception.printStackTrace(e);
	}	
};


/**
 * 그리드뷰 신규 행 삭제 처리 
 * 
 * @param		dataListObj	: dataList object 
 * 					checkId		: 그리드뷰의 checkbox ID
 * @returns	그리드뷰에서 체크박스 체크된 데이터 중 신규 데이터만 삭제 처리 
 * @example	 
 * 					com.cm_addRowDel(dataList1, "dml");
 */
com.cm_addRowDel = function(dataListObj, checkId) {
	try {
		var dmlRow1 = dataListObj.getMatchedIndex(checkId, "1", true);
		var dmlRow4 = dataListObj.getMatchedIndex(checkId, "4", true);
		if(dmlRow1.length==0 && dmlRow4.length==0){
			// 삭제할 데이타가 없습니다. 삭제할 데이타를 선택하세요.
			com.cm_msg(com.cm_getMessage("I0032"));
			return;
		}
		for(var i=0; i<dmlRow1.length; i++){
			if(dataListObj.getRowStatus(dmlRow1[i])!="C"){
				// 행삭제할 수 없습니다.
				com.cm_msg(com.cm_getMessage("E0058"));
				gridView1.setFocusedCell(dmlRow1[i] , checkId, false);
				return;
			}
		}
		dataListObj.removeRows(dmlRow1);
		
		for(var i=0; i<dmlRow4.length; i++){
			if(dataListObj.getRowStatus(dmlRow4[i])!="C"){
				// 행삭제할 수 없습니다.
				com.cm_msg(com.cm_getMessage("E0058"));
				gridView1.setFocusedCell(dmlRow4[i] , checkId, false);
				return;
			}
		}
		dataListObj.removeRows(dmlRow4);		
	} catch (e) {
		com.cm_logPrint("com.cm_addRowDel(): " + e.message);
		WebSquare.exception.printStackTrace(e);
	}
};


/**
 * 그리드뷰 체크박스+타이틀 
 * 
 * @param 
 * 	    _gridView	: 그리드객체
 *  	_col 		: 컬럼명
 *  	_title 		: check박스 옆에 나타날 타이틀
 *  	_w			: check박스 크기 
 * @returns	check박스 object 
 * @example	 
 * 		com.cm_getGvHeaderCheckboxObj("dml", "삭제", 10);
 */
com.cm_getGvHeaderCheckboxObj = function(_gridView, _col,_title, _w) {
	    if( !_w ){
	    	_w = 20;
	    }
	    var obj = {
			    image : null,
			    div: null,
			    text : null,
				getContent : function(){
					var chkbox = document.createElement("input");
					chkbox.style.width = _w+"px";
					chkbox.type = "checkbox";
					chkbox.value = "0";
					chkbox.id = "chkId";
	                
					this.div = document.createElement("div");
					this.text = document.createTextNode(_title); //제목							
					this.div.appendChild(chkbox);
					this.div.appendChild(this.text);
											
				    //var _this = this;
				    WebSquare.event.addListener(chkbox, "onclick", function(e){
				        if(this.checked){
				        	_gridView.checkAll(_col, true);
			            }
			            else{
			            	_gridView.checkAll(_col, false);
			            }
				    } ); //클릭시 사용자 구현함수						
				    return this.div;
				}
		}
		return obj;
};


/**
 * json 문자열 >, < 변환
 * 
 * @param 
 * @returns	 
 * @example	 
 * 		
 */
com.cm_replaceJson = function( jsonObj ) {
	if(jsonObj != null){
		return JSON.parse(((JSON.stringify(jsonObj)).replace(/\&lt;/g,"<")).replace(/\&gt;/g,">"));
	} else {
		return jsonObj;
	}
};


/**
 * Sha2 암호화
 * @param msg
 * @returns
 */
com.cm_encrypt = function(msg) {
	return Sha256.hash(Sha1.hash(msg).toUpperCase());
};


/**
 * 서버와 Ajax 통신 처리
 * @param systemPath        	: 시스템 Path
 * @param serviceId         		: 화면 ID 서버 Controller의 RequestMapping 정보와 동일
 * @param requestData       	: 서버에 전송 하는 값 
 * @param successCallBackFn	: 서버 통신 후 처리를 위한 콜백함수
 * @param processMsgYn 		: 서버 통신 시 Process 메시지 보여주기 여부(true:출력, false:미출력  => 미입력시 default : 출력)
 */
com.cm_submitMapAjax = function(systemPath, serviceId, requestData, successCallBackFn, processMsgYn, alertYn) {
	try{	
		var url = "";
		
		if(systemPath == ""){ 
			url = "/"+serviceId+".do";
		}else{
			var seperate = systemPath.substring(0, 1);
			if (seperate == "/"){
				systemPath = systemPath.substring(1, systemPath.length);
			}
			
			url = "/"+systemPath+"/"+serviceId+".do";
		}
		
		//Process 메시지 출력 
		if ( typeof processMsgYn == "undefined" || processMsgYn == true ){ 
			gcm.win,cm_processMsgStart();
		}
		
		if(WebSquare.util.isNull(alertYn)){
			alertYn = true;
		}

		$.ajax({
			type : "POST",
			url  : url,
			dataType : "json",
			data : JSON.stringify(requestData),
			contentType:"application/json",
			success : function(data, textStatus, jqXHR ){

				//Process 메시지 닫기
				if ( typeof processMsgYn == "undefined" || processMsgYn == true ){ 
					com.cm_processMsgEnd();
				}	
				
				//cm_msg(JSON.stringify(data));
				if(data.rtn_code != "0" && alertYn){
					com.cm_msg(data.rtn_message);
				}
				
				//에러가 발생한 경우
				if(data.rtn_success != "0"){
					//화면 컴포넌트 id가 존재 할경우
					if(data.rtn_id != null && data.rtn_id != ""){
						if(!WebSquare.util.isNull(data.rtn_rowNum) && 
								!WebSquare.util.isNull(data.rtn_colId)){
							var grid =  WebSquare.util.getComponentById(data.rtn_id);
							var colIndex = grid.getColumnIndex(data.rtn_colId);
							//그리드의 셀로 포커스 이동
							grid.setFocusedCell(data.rtn_rowNum , colIndex);
						}else{
							//해당 컴포넌트로 포커스 이동
							WebSquare.util.getComponentById(data.rtn_id).focus();
						}
					}
					return;
				}
				
				//콜백 함수일 경우 콜백함수 호출
				if(typeof(successCallBackFn) == "function"){
					successCallBackFn(data);
				}
			},
			error : function(jqXHR, textStatus, errorThrown ){
				//Process 메시지 닫기
				if ( typeof processMsgYn == "undefined" || processMsgYn == true ){ 
					com.cm_processMsgEnd();
				}
				com.cm_error();	
			}
		});
		
	} catch (e) {
	    com.cm_logPrint("com.cm_submitMapAjax(): " + e.message);
	    alert("com.cm_submitMapAjax(): " + e.message);
	}
}


/**
 * 서버와 Ajax 통신 처리
 * @param systemPath        	: 시스템 Path
 * @param serviceId         		: 화면 ID 서버 Controller의 RequestMapping 정보와 동일
 * @param requestData       	: 서버에 전송 하는 값 
 * @param successCallBackFn	: 서버 통신 후 처리를 위한 콜백함수
 * @param processMsgYn 		: 서버 통신 시 Process 메시지 보여주기 여부(true:출력, false:미출력  => 미입력시 default : 출력)
 */
com.cm_submitAjax = function(systemPath, serviceId, requestData, successCallBackFn, processMsgYn, alertYn) {
	try{	
		var url = "";
		 
		if(systemPath == ""){ 
			url = "/"+serviceId+".do";
		}else{
			var seperate = systemPath.substring(0, 1);
			if (seperate == "/"){
				systemPath = systemPath.substring(1, systemPath.length);
			}
			
			url = "/"+systemPath+"/"+serviceId+".do";
		}
		
		//Process 메시지 출력 
		if ( typeof processMsgYn == "undefined" || processMsgYn == true ){ 
			com.cm_processMsgStart();
		}
		
		if(WebSquare.util.isNull(alertYn)){
			alertYn = true;
		}
		
		$.ajax({
			type : "POST",
			url  : url,
			dataType : "json",
			data : {"reqParams" : JSON.stringify(requestData)},
			success : function(data, textStatus, jqXHR ){

				//Process 메시지 닫기
				if ( typeof processMsgYn == "undefined" || processMsgYn == true ){ 
					com.cm_processMsgEnd();
				}	
				
				//cm_msg(JSON.stringify(data));
				if(data.rtn_code != "0" && alertYn){
					com.cm_msg(data.rtn_message);
				}
				
				//에러가 발생한 경우
				if(data.rtn_success != "0"){
					//화면 컴포넌트 id가 존재 할경우
					if(data.rtn_id != null && data.rtn_id != ""){
						if(!WebSquare.util.isNull(data.rtn_rowNum) && 
								!WebSquare.util.isNull(data.rtn_colId)){
							var grid =  WebSquare.util.getComponentById(data.rtn_id);
							var colIndex = grid.getColumnIndex(data.rtn_colId);
							//그리드의 셀로 포커스 이동
							grid.setFocusedCell(data.rtn_rowNum , colIndex);
						}else{
							//해당 컴포넌트로 포커스 이동
							WebSquare.util.getComponentById(data.rtn_id).focus();
						}
					}
					return;
				}
				
				//콜백 함수일 경우 콜백함수 호출
				if(typeof(successCallBackFn) == "function"){
					successCallBackFn(data);
				}
			},
			error : function(jqXHR, textStatus, errorThrown ){
				//Process 메시지 닫기
				if ( typeof processMsgYn == "undefined" || processMsgYn == true ){ 
					com.cm_processMsgEnd();
				}
				com.cm_error();	
			}
		});
		
	} catch (e) {
	    com.cm_logPrint("com.cm_submitAjax(): " + e.message);
	    alert("com.cm_submitAjax(): " + e.message);
	}
}


/**
 * 서버와 Ajax 통신 처리(공통코드 콤보용)
 * @param systemPath        	: 시스템 Path
 * @param serviceId         		: 화면 ID 서버 Controller의 RequestMapping 정보와 동일
 * @param requestData       	: 서버에 전송 하는 값 
 * @param successCallBackFn 	: 서버 통신 후 처리를 위한 콜백함수
 * @param codeType 				: 공통코드 종류 as-is codeType과 동일
 * @param id 						: 콤보박스 id 공통 코드 조회 후 해당 ID에 코드 목록 설정 (콤보박스에 셋팅 안할경우 null 또는 "" 로 셋팅)
 * @param displayYn 				: 콤보에 code/value 표시여부 default = flase
 * @param userCallbackFn 		: 조회 이후 호출할 화면 Callback 함수
 */
com.cm_submitCodeAjax = function(systemPath, serviceId, requestData, successCallBackFn, codeType, id, displayYn, optionYn, userCallbackFn) {
	try{
		var url = "";
		 
		if(systemPath == ""){ 
			url = "/"+serviceId+".do";
		}else{
			var seperate = systemPath.substring(0, 1);
			if (seperate == "/"){
				systemPath = systemPath.substring(1, systemPath.length);
			}			
			url = "/"+systemPath+"/"+serviceId+".do";
		}
		
		$.ajax({
			type : "POST",
			url  : url,
			dataType : "json",
			data : {"reqParams" : JSON.stringify(requestData)},
			success : function(data, textStatus, jqXHR ){
				//cm_msg(JSON.stringify(data));
				//if(data.rtn_code != "0"){
				//	com.cm_msg(data.rtn_message);
				//}
				
				if(data.rtn_code == "E9999"){
					com.cm_msg(data.rtn_message);
					return;
				}
				//콜백 함수일 경우 콜백함수 호출
				if(typeof(successCallBackFn) == "function"){
					successCallBackFn(data, codeType, id, displayYn, optionYn, userCallbackFn);
				}
			},
			error : function(jqXHR, textStatus, errorThrown ){
				com.cm_error();	
			}
		});
	} catch (e) {
	    com.cm_logPrint("com.cm_submitCodeAjax(): " + e.message);
	    alert("com.cm_submitCodeAjax(): " + e.message);
	}	
}


/**
 * 서버와 Sync 통신 처리(공통코드 콤보용)
 * @param systemPath        	: 시스템 Path
 * @param serviceId         		: 화면 ID 서버 Controller의 RequestMapping 정보와 동일
 * @param requestData       	: 서버에 전송 하는 값 
 * @param successCallBackFn 	: 서버 통신 후 처리를 위한 콜백함수
 * @param codeType 				: 공통코드 종류 as-is codeType과 동일
 * @param id 						: 콤보박스 id 공통 코드 조회 후 해당 ID에 코드 목록 설정 (콤보박스에 셋팅 안할경우 null 또는 "" 로 셋팅)
 * @param displayYn 				: 콤보에 code/value 표시여부 default = flase
 * @param userCallbackFn 		: 조회 이후 호출할 화면 Callback 함수
 */
com.cm_submitCodeSync = function(systemPath, serviceId, requestData, successCallBackFn, codeType, id, displayYn, optionYn, userCallbackFn) {
	try{
		var url = "";
		 
		if(systemPath == ""){ 
			url = "/"+serviceId+".do";
		}else{
			var seperate = systemPath.substring(0, 1);
			if (seperate == "/"){
				systemPath = systemPath.substring(1, systemPath.length);
			}			
			url = "/"+systemPath+"/"+serviceId+".do";
		}
		
		$.ajax({
			type : "POST",
			async : false,
			url  : url,
			dataType : "json",
			data : {"reqParams" : JSON.stringify(requestData)},
			success : function(data, textStatus, jqXHR ){
				//com.cm_msg(JSON.stringify(data));
				//if(data.rtn_code != "0"){
				//	com.cm_msg(data.rtn_message);
				//}
				
				if(data.rtn_code == "E9999"){
					com.cm_msg(data.rtn_message);
					return;
				}
				//콜백 함수일 경우 콜백함수 호출
				if(typeof(successCallBackFn) == "function"){
					successCallBackFn(data, codeType, id, displayYn, optionYn, userCallbackFn);
				}
			},
			error : function(jqXHR, textStatus, errorThrown ){
				com.cm_error();	
			}
		});
	} catch (e) {
	    com.cm_logPrint("com.cm_submitCodeSync(): " + e.message);
	    alert("com.cm_submitCodeSync(): " + e.message);
	}	
}

/**
 * 서버와 Ajax 통신 처리
 * @param systemPath        		: 시스템 Path
 * @param serviceId         		: 화면 ID 서버 Controller의 RequestMapping 정보와 동일
 * @param requestData       		: 서버에 전송 하는 값 
 * @param successCallBackFn			: 서버 통신 후 처리를 위한 콜백함수
 * @param processMsgYn 				: 서버 통신 시 Process 메시지 보여주기 여부(true:출력, false:미출력  => 미입력시 default : 출력)
 */
com.cm_submitAjaxPo = function(systemPath, serviceId, requestData, successCallBackFn, processMsgYn, alertYn) {

	try{	
		var url = "";
		 
		if(systemPath == ""){ 
			url = "/"+serviceId+".do";
		}else{
			var seperate = systemPath.substring(0, 1);
			if (seperate == "/"){
				systemPath = systemPath.substring(1, systemPath.length);
			}
			
			url = "/"+systemPath+"/"+serviceId+".do";
		}
		
		//Process 메시지 출력 
		if ( typeof processMsgYn == "undefined" || processMsgYn == true ){ 
			com.cm_processMsgStart();
		}
		
		if(WebSquare.util.isNull(alertYn)){
			alertYn = true;
		}
		
		$.ajax({
			type : "POST",
			url  : url,
			dataType : "json",
			data : requestData ,
			success : function(data, textStatus, jqXHR ){

				//Process 메시지 닫기
				if ( typeof processMsgYn == "undefined" || processMsgYn == true ){ 
					gcm.win.cm_processMsgEnd();
				}	
				
				//com.cm_msg(JSON.stringify(data));
				if(data.rtn_code != "0" && alertYn){
					com.cm_msg(data.rtn_message);
				}
				
				//에러가 발생한 경우
				if(data.rtn_success != "0"){
					//화면 컴포넌트 id가 존재 할경우
					if(data.rtn_id != null && data.rtn_id != ""){
						if(!WebSquare.util.isNull(data.rtn_rowNum) && 
								!WebSquare.util.isNull(data.rtn_colId)){
							var grid =  WebSquare.util.getComponentById(data.rtn_id);
							var colIndex = grid.getColumnIndex(data.rtn_colId);
							//그리드의 셀로 포커스 이동
							grid.setFocusedCell(data.rtn_rowNum , colIndex);
						}else{
							//해당 컴포넌트로 포커스 이동
							WebSquare.util.getComponentById(data.rtn_id).focus();
						}
					}
					return;
				}
				
				//콜백 함수일 경우 콜백함수 호출
				if(typeof(successCallBackFn) == "function"){
					successCallBackFn(data);
				}
			},
			error : function(jqXHR, textStatus, errorThrown ){
				//Process 메시지 닫기
				if ( typeof processMsgYn == "undefined" || processMsgYn == true ){ 
					com.cm_processMsgEnd();
				}
				com.cm_error();	
			}
		});
		
	} catch (e) {
	    com.cm_logPrint("com.cm_submitAjaxPo(): " + e.message);
	    alert("com.cm_submitAjaxPo(): " + e.message);
	}
}


/**
 * 서버와 Ajax 통신 처리 Sync
 * @param systemPath        	: 시스템 Path
 * @param serviceId         		: 화면 ID 서버 Controller의 RequestMapping 정보와 동일
 * @param requestData       	: 서버에 전송 하는 값 
 * @param successCallBackFn	: 서버 통신 후 처리를 위한 콜백함수
 * @param processMsgYn 		: 서버 통신 시 Process 메시지 보여주기 여부(true:출력, false:미출력  => 미입력시 default : 출력)
 */
com.cm_submitAjaxSync = function(systemPath, serviceId, requestData, successCallBackFn, processMsgYn, alertYn) {
	try{	
		var url = "";
		 
		if(systemPath == ""){ 
			url = "/"+serviceId+".do";
		}else{
			var seperate = systemPath.substring(0, 1);
			if (seperate == "/"){
				systemPath = systemPath.substring(1, systemPath.length);
			}
			
			url = "/"+systemPath+"/"+serviceId+".do";
		}
		
		//Process 메시지 출력 
		if ( typeof processMsgYn == "undefined" || processMsgYn == true ){ 
			com.cm_processMsgStart();
		}
		
		if(WebSquare.util.isNull(alertYn)){
			alertYn = true;
		}
		
		$.ajax({
			type : "POST",
			url  : url,
			async : false,
			dataType : "json",
			data : {"reqParams" : JSON.stringify(requestData)},
			success : function(data, textStatus, jqXHR ){

				//Process 메시지 닫기
				if ( typeof processMsgYn == "undefined" || processMsgYn == true ){ 
					com.cm_processMsgEnd();
				}	
				
				//com.cm_msg(JSON.stringify(data));
				if(data.rtn_code != "0" && alertYn){
					com.cm_msg(data.rtn_message);
				}
				
				//에러가 발생한 경우
				if(data.rtn_success != "0"){
					//화면 컴포넌트 id가 존재 할경우
					if(data.rtn_id != null && data.rtn_id != ""){
						if(!WebSquare.util.isNull(data.rtn_rowNum) && 
								!WebSquare.util.isNull(data.rtn_colId)){
							var grid =  WebSquare.util.getComponentById(data.rtn_id);
							var colIndex = grid.getColumnIndex(data.rtn_colId);
							//그리드의 셀로 포커스 이동
							grid.setFocusedCell(data.rtn_rowNum , colIndex);
						}else{
							//해당 컴포넌트로 포커스 이동
							WebSquare.util.getComponentById(data.rtn_id).focus();
						}
					}
					return;
				}
				
				//콜백 함수일 경우 콜백함수 호출
				if(typeof(successCallBackFn) == "function"){
					successCallBackFn(data);
				}
			},
			error : function(jqXHR, textStatus, errorThrown ){
				//Process 메시지 닫기
				if ( typeof processMsgYn == "undefined" || processMsgYn == true ){ 
					com.cm_processMsgEnd();
				}
				com.cm_error();	
			}
		}); 
		
	} catch (e) {
	    com.cm_logPrint("com.cm_submitAjaxSync(): " + e.message);
	    alert("com.cm_submitAjaxSync(): " + e.message);
	}
}


com.cm_webserviceAjax = function(action, requestData, callback, type ) {
	if( !type ){ type = "JSON"; }
    $.ajax({
        type : "POST"
      , url  : action
      , dataType : type
      , data : requestData
      , success : callback
      , error : function(jqXHR, textStatus, errorThrown ){
           alert(textStatus);			               
        }			              
  });
}


/**
 * 공통 코드 콤보 박스 처리(내부함수)
 * @param codeType	: 공통코드 종류 as-is codeType과 동일
 * @param conditions	: 공통코드 조회 조건 배열
 * @param id				: 콤보박스 id 공통 코드 조회 후 해당 ID(배열 가능)에 코드 목록 설정 (콤보박스에 셋팅 안할경우 string 형태로 node명을 넘길것)
 * @param displayYn	: 콤보에 code/value 표시여부 default = flase
 * @param optionYn	: 콤보에 default(------------) 표시여부 default 표시(true)
 * @param userCallbackFn : 조회 이후 호출할 화면 Callback 함수 (Callback 필요없을 시 null 이나 값 넘기지 않아도 가능)
 * 				com.cm_setCommonCode("sysTypeAll", ["111", "222"], sel_sysType, false);
 * 				com.cm_setCommonCode("sysTypeAll", ["111", "222"], [sel_sysType, sel_sysType2], false);
 * 				com.cm_setCommonCode("sysTypeAll", ["111", "222"], sel_sysType, false, true, fncEndComomCode);	     
 *  
 */
com.cm_setCommonCode = function(codeType, conditions, id, displayYn, optionYn, userCallbackFn) {
	try{
		
		if(displayYn == null ){
			displayYn = false;
		}
		
		if(optionYn == null ){
			optionYn = true;
		}
		
		var conditionParam = new Object();
		var conditionParams = new Array();
	
		for(var i=0; i<conditions.length; i++){
			conditionParam.cond = conditions[i];
			conditionParams.push(conditionParam);
			conditionParam={};
		}
	
		var requestData = new Object();
		requestData.type = "commonCode."+codeType;
		requestData.conditions = conditionParams;
	
		//서버 ajax 통신
		com.cm_submitCodeAjax("","commCode", requestData, com.cm_successCommonCode, codeType, id, displayYn, optionYn, userCallbackFn);
	} catch (e) {
	    com.cm_logPrint("com.cm_setCommonCode(): " + e.message);
	    alert("com.cm_setCommonCode(): " + e.message);
	}
}


/**
 * 공통 코드 콤보 박스 처리(내부함수) AMS
 * @param codeType	: 공통코드 종류 as-is codeType과 동일
 * @param conditions	: 공통코드 조회 조건 배열
 * @param id				: 콤보박스 id 공통 코드 조회 후 해당 ID(배열 가능)에 코드 목록 설정 (콤보박스에 셋팅 안할경우 string 형태로 node명을 넘길것)
 * @param displayYn	: 콤보에 code/value 표시여부 default = flase
 * @param optionYn	: 콤보에 default(------------) 표시여부 default 표시(true)
 * @param userCallbackFn : 조회 이후 호출할 화면 Callback 함수 (Callback 필요없을 시 null 이나 값 넘기지 않아도 가능)
 * 				com.cm_setCommonCode("sysTypeAll", ["111", "222"], sel_sysType, false);
 * 				com.cm_setCommonCode("sysTypeAll", ["111", "222"], [sel_sysType, sel_sysType2], false);
 * 				com.cm_setCommonCode("sysTypeAll", ["111", "222"], sel_sysType, false, true, fncEndComomCode);	     
 *  
 */
com.cm_setCommonCodeAms = function(codeType, conditions, id, displayYn, optionYn, userCallbackFn) {
	try{
		
		if(displayYn == null ){
			displayYn = false;
		}
		
		if(optionYn == null ){
			optionYn = true;
		}
		
		var conditionParam = new Object();
		var conditionParams = new Array();
	
		for(var i=0; i<conditions.length; i++){
			conditionParam.cond = conditions[i];
			conditionParams.push(conditionParam);
			conditionParam={};
		}
	
		var requestData = new Object();
		requestData.type = "commonCode."+codeType;
		requestData.conditions = conditionParams;
	
		//서버 ajax 통신
		com.cm_submitCodeAjax("","commCodeAms", requestData, com.cm_successCommonCode, codeType, id, displayYn, optionYn, userCallbackFn);
	} catch (e) {
	    com.cm_logPrint("com.cm_setCommonCode(): " + e.message);
	    alert("com.cm_setCommonCode(): " + e.message);
	}
}


/**
 * 공통 코드 콤보 박스 처리(내부함수)
 * @param codeType	: 공통코드 종류 as-is codeType과 동일
 * @param conditions	: 공통코드 조회 조건 배열
 * @param id				: 콤보박스 id 공통 코드 조회 후 해당 ID(배열 가능)에 코드 목록 설정 (콤보박스에 셋팅 안할경우 string 형태로 node명을 넘길것)
 * @param displayYn	: 콤보에 code/value 표시여부 default = flase
 * @param optionYn	: 콤보에 default(------------) 표시여부 default 표시(true)
 * @param userCallbackFn : 조회 이후 호출할 화면 Callback 함수 (Callback 필요없을 시 null 이나 값 넘기지 않아도 가능)
 * 				com.cm_setCommonCode("sysTypeAll", ["111", "222"], sel_sysType, false);
 * 				com.cm_setCommonCode("sysTypeAll", ["111", "222"], [sel_sysType, sel_sysType2], false);
 * 				com.cm_setCommonCode("sysTypeAll", ["111", "222"], sel_sysType, false, true, fncEndComomCode);	     
 *  
 */
com.cm_setCommonCodeSync = function(codeType, conditions, id, displayYn, optionYn, userCallbackFn) {
	try{
		
		if(displayYn == null ){
			displayYn = false;
		}
		
		if(optionYn == null ){
			optionYn = true;
		}
		
		var conditionParam = new Object();
		var conditionParams = new Array();
	
		for(var i=0; i<conditions.length; i++){
			conditionParam.cond = conditions[i];
			conditionParams.push(conditionParam);
			conditionParam={};
		}
	
		var requestData = new Object();
		requestData.type = "commonCode."+codeType;
		requestData.conditions = conditionParams;
	
		//서버 Sync 통신
		com.cm_submitCodeSync("","commCode", requestData, com.cm_successCommonCode, codeType, id, displayYn, optionYn, userCallbackFn);
	} catch (e) {
	    com.cm_logPrint("com.cm_setCommonCodeSync(): " + e.message);
	    alert("com.cm_setCommonCodeSync(): " + e.message);
	}
};


/**
 * 공통코드 조회 콜백
 * 공통 코드 조회 서비스 통신 후 코드 리스트를 가공 한다.
 * @param resultData : 서버에서 넘겨준 공통 코드 리스트
 */
com.cm_successCommonCode = function(resultData, codeType, id, displayYn, optionYn, userCallbackFn) {
	try{		
		//dataList 명 정하기 
		var selNode = "";
		if ( typeof(id) == "object" ) {
			if ((id.length !== undefined) && (id.length > 0)) {
				selNode = id[0].getID();		//ID를 배열로 넘기는 경우 첫번째 ID명으로 셋팅 
			} else {
				selNode = id.getID();
			}
		} else {
			selNode = id;
		}
		
		var newCodes = resultData.codes;
		
		//옵션을 보여 줘야 할 경우
		if ( optionYn ) {
			newCodes = [{"code":"","name":" "}];				//기존 ------------- => 빈여백으로 변경 (연구소 요청)
			
			for(var i=0; i<resultData.codes.length; i++){
				newCodes.push(resultData.codes[i]);
			}
			
			resultData.codes = newCodes;
		}
		
		// 코드 정보를 저장할 DataList를 생성한다.
		//var dltObjectName = "dlt_" + codeType;			//동일 코드타입 데이터 조회할 경우 문제 발생함.
		var dltObjectName = "dlt_" + selNode;
		var dltObject = $p.getComponentById(dltObjectName);

		//기존 dataList 없을 경우에만 생성 
		if ( typeof dltObject == "undefined" ) {
			var dltCodeOption = {"id" : dltObjectName, 
					 "type" : "dataList" , 
					 "option" : { "baseNode" : "codes", "repeatNode" : "object" },
					 "columnInfo":[
										{"id":"code", "name":"코드", "dataType":"text"},
										{"id":"name", "name":"코드명", "dataType":"text"},
										{"id":"content1", "name":"content1", "dataType":"text"},
										{"id":"content2", "name":"content2", "dataType":"text"},
										{"id":"content3", "name":"content3", "dataType":"text"},
										{"id":"content4", "name":"content4", "dataType":"text"},
										{"id":"content5", "name":"content5", "dataType":"text"},
										{"id":"content6", "name":"content6", "dataType":"text"},
										{"id":"content7", "name":"content7", "dataType":"text"},
										{"id":"content8", "name":"content8", "dataType":"text"},
										{"id":"content9", "name":"content9", "dataType":"text"},
										{"id":"content10", "name":"content10", "dataType":"text"},
										{"id":"content11", "name":"content11", "dataType":"text"},
										{"id":"content12", "name":"content12", "dataType":"text"},
										{"id":"content13", "name":"content13", "dataType":"text"},
										{"id":"content14", "name":"content14", "dataType":"text"},
										{"id":"content15", "name":"content15", "dataType":"text"},
										{"id":"content16", "name":"content16", "dataType":"text"},
										{"id":"content17", "name":"content17", "dataType":"text"},
										{"id":"content18", "name":"content18", "dataType":"text"},
										{"id":"content19", "name":"content19", "dataType":"text"},
										{"id":"content20", "name":"content20", "dataType":"text"},
										{"id":"content21", "name":"content21", "dataType":"text"}
					               ]
					};
			$p.data.create(dltCodeOption);
			dltObject = $p.getComponentById(dltObjectName);			
		}

		//코드와 코드명을 같이 보여줘여 할 경우 ( ex => 10 : 기초정보 )
		if(displayYn){
			/*
			//JSON 데이터 XML 변환하여 셋팅할 경우 여백 데이터의 경우 빈 데이터로 변경됨 => 사용X 
			var jsonNode = WebSquare.json.JSON2XML(resultData);
			var codes = WebSquare.xml.findNodes(jsonNode, "object/codes/object/code");
			var names = WebSquare.xml.findNodes(jsonNode, "object/codes/object/name");
			var objects = WebSquare.xml.findNodes(jsonNode, "object/codes/object");
			var codeName="";
	
			for(var i=0; i<codes.length;i++){
				if(optionYn && i==0)continue;
				codeName = WebSquare.xml.getTextNodeValue(codes[i]) +" "+WebSquare.xml.getTextNodeValue(names[i]);
				WebSquare.xml.setValue(objects[i], "name" ,codeName);
			}
			
			var srcNode = WebSquare.xml.findNode(jsonNode, "object/codes");
			dltObject.setXML(srcNode);
			*/
			var codes = resultData.codes;
			var codeName="";			
			for(var i=0; i<codes.length;i++){
				if(optionYn && i==0)continue;
				var code = codes[i].code;
				var name = codes[i].name;
				codeName = code + " " + name;
				codes[i].name = codeName;
			}
			dltObject.setJSON(codes);			
		}
		//코드명만 보여줘야 할 경우 ( ex => 기초정보 )
		else{
			/*
			//JSON 데이터 XML 변환하여 셋팅할 경우 여백 데이터의 경우 빈 데이터로 변경됨 => 사용X 
			var srcNode = WebSquare.xml.findNode(WebSquare.json.JSON2XML(resultData), "object/codes");
			dltObject.setXML(srcNode);
			*/
			dltObject.setJSON(resultData.codes);
		}	

		//공통 코드 노드를 Set (콤보박스 에 셋팅 할 경우에만...)
		if ( id != null && id != "" ){
			if ( typeof(id) == "object"){
				if ((id.length !== undefined) && (id.length > 0)) {
					var objLength = id.length;
					for (var i = 0; i < objLength; i++) {
						id[i].setNodeSet("data:" + "dlt_" + selNode, "name", "code");
					}
				} else {
					id.setNodeSet("data:" + "dlt_" + selNode, "name", "code");
				}	
			}
		}
		
		//사용자콜백함수 있을 경우 콜백함수 호출
		if ( typeof userCallbackFn != "undefined" && userCallbackFn != null && userCallbackFn != "" ){ 
			if(typeof(userCallbackFn) == "function"){
				userCallbackFn();
			}
		}		
	} catch (e) {
	    com.cm_logPrint("com.cm_successCommonCode(): " + e.message);
	    alert("com.cm_successCommonCode(): " + e.message);
	}

}


/**
 * 코드에 해당하는 코드명 세팅
 * @param codeType	: 공통코드 종류 as-is codeType과 동일
 * @param conditions	: 공통코드 조회 조건 배열
 * @param id				: 셋팅할 코드명 컴포넌트ID
 */
com.cm_setCodeName = function (codeType, conditions, id) {
	try{
		
		var conditionParam = new Object();
		var conditionParams = new Array();
	
		for(var i=0; i<conditions.length; i++){
			conditionParam.cond = conditions[i];
			conditionParams.push(conditionParam);
			conditionParam={};
		}
	
		var requestData = new Object();
		requestData.type = "commonCode."+codeType;
		requestData.conditions = conditionParams;
	
		//서버 ajax 통신
		com.cm_submitCodeAjax("","commCodeContent", requestData, com.cm_successCodeName, "", id, "", "", "");
	} catch (e) {
	    com.cm_logPrint("com.cm_setCommonCode(): " + e.message);
	    alert("com.cm_setCommonCode(): " + e.message);
	}
}

/**
 * 
 * @param resultData
 * @param id
 */
com.cm_successCodeName = function(resultData, codeType, id, displayYn, optionYn, userCallbackFn) {
	//alert(resultData.codes[0].name);
	if(!com.cm_isNull(resultData.codes[0])){
		id.setValue(resultData.codes[0].name);
	}else{
		id.setValue("");
	}
}


/**
 * 코드에 해당하는 코드 + 코드명 세팅 (해당 데이터 없을 경우 코드, 코드명 리셋 처리)
 * @param codeType	: 공통코드 종류 as-is codeType과 동일
 * @param conditions	: 공통코드 조회 조건 배열
 * @param codeId		: 셋팅할 코드 컴포넌트 ID
 * @param nameId		: 셋팅할 코드명 컴포넌트ID
 */
com.cm_setCodeIdName = function (codeType, conditions, codeId, nameId) {
	try{		
		
		if (codeId.getValue() == "") {
			codeId.setValue("");
			nameId.setValue("");
			
			return;
		}
		
		var conditionParam = new Object();
		var conditionParams = new Array();
	
		for(var i=0; i<conditions.length; i++){
			conditionParam.cond = conditions[i];
			conditionParams.push(conditionParam);
			conditionParam={};
		}
	
		var requestData = new Object();
		requestData.type = "commonCode."+codeType;
		requestData.conditions = conditionParams;
	
		//서버 ajax 통신
		var url = "/commCodeContent.do";
		$.ajax({
			type : "POST",
			async : false,
			url  : url,
			dataType : "json",
			data : {"reqParams" : JSON.stringify(requestData)},
			success : function(data, textStatus, jqXHR ){
				if ( typeof data.codes[0] == "undefined" ){
					codeId.setValue("");
					nameId.setValue("");
					codeId.focus();
				} else {
					codeId.setValue(com.cm_safeString(data.codes[0].code));
					nameId.setValue(com.cm_safeString(data.codes[0].name));					
				}
			},
			error : function(jqXHR, textStatus, errorThrown ){
				com.cm_error();	
			}
		});	
	} catch (e) {
	    com.cm_logPrint("com.cm_setCodeIdName(): " + e.message);
	    alert("com.cm_setCodeIdName(): " + e.message);
	}
}


/**
 * 코드에 해당하는 코드 + 코드명 + 기타 세팅 (해당 데이터 없을 경우 코드, 코드명 리셋 처리)
 * @param codeType	: 공통코드 종류 as-is codeType과 동일
 * @param conditions	: 공통코드 조회 조건 배열
 * @param codeId		: 셋팅할 코드 컴포넌트 ID
 * @param nameId		: 셋팅할 코드명 컴포넌트ID
 * @param etcId		: 셋팅할 기타 컴포넌트ID
 */
com.cm_setCodeIdNameEtc = function (codeType, conditions, codeId, nameId, etcId) {
	try{		
		var conditionParam = new Object();
		var conditionParams = new Array();
	
		for(var i=0; i<conditions.length; i++){
			conditionParam.cond = conditions[i];
			conditionParams.push(conditionParam);
			conditionParam={};
		}
	
		var requestData = new Object();
		requestData.type = "commonCode."+codeType;
		requestData.conditions = conditionParams;
	
		//서버 ajax 통신
		var url = "/commCodeContent.do";
		$.ajax({
			type : "POST",
			async : false,
			url  : url,
			dataType : "json",
			data : {"reqParams" : JSON.stringify(requestData)},
			success : function(data, textStatus, jqXHR ){
				if ( typeof data.codes[0] == "undefined" ){
					codeId.setValue("");
					nameId.setValue("");
					etcId.setValue("");
				} else {
					codeId.setValue(com.cm_safeString(data.codes[0].code));
					nameId.setValue(com.cm_safeString(data.codes[0].name));
					etcId.setValue(com.cm_safeString(data.codes[0].content1));
				}
			},
			error : function(jqXHR, textStatus, errorThrown ){
				com.cm_error();	
			}
		});	
	} catch (e) {
	    com.cm_logPrint("com.cm_setCodeIdNameEtc(): " + e.message);
	    alert("com.cm_setCodeIdNameEtc(): " + e.message);
	}
}


/**
 * 코드에 해당하는 코드 + 코드명 + 기타 Array 세팅 (해당 데이터 없을 경우 리셋 처리)
 * @param codeType	: 공통코드 종류 as-is codeType과 동일
 * @param conditions	: 공통코드 조회 조건 배열
 * @param idArray		: 셋팅할 코드 컴포넌트 ID배열 [aaa,bbb,ccc]  
 * @param userCallbackFn 		: 조회 이후 호출할 화면 Callback 함수  
 */
com.cm_setCodeIdNameArray = function(codeType, conditions, idArray, userCallbackFn) {
	try{		
		var conditionParam = new Object();
		var conditionParams = new Array();
	
		for(var i=0; i<conditions.length; i++){
			conditionParam.cond = conditions[i];
			conditionParams.push(conditionParam);
			conditionParam={};
		}
	
		var requestData = new Object();
		requestData.type = "commonCode."+codeType;
		requestData.conditions = conditionParams;
	
		//서버 ajax 통신
		var url = "/commCodeContent.do";
		$.ajax({
			type : "POST",
			async : false,
			url  : url,
			dataType : "json",
			data : {"reqParams" : JSON.stringify(requestData)},
			success : function(data, textStatus, jqXHR ){				
				//콜백 함수일 경우 콜백함수 호출
				if(typeof(userCallbackFn) == "function"){
					userCallbackFn(data);
				} else {
					if ( typeof data.codes[0] == "undefined" ){
						if ( idArray != null && idArray != "" ){
							if ( typeof(idArray) == "object"){
								if ((idArray.length !== undefined) && (idArray.length > 0)) {
									var objLength = idArray.length;
									idArray[0].setValue("");
									idArray[1].setValue("");
									
									var cnt = 1;
									for (var i = 2; i < objLength; i++) {
										idArray[i].setValue("");
										cnt++;
									}
								}	
							}
						}					

					} else {
	
						if ( idArray != null && idArray != "" ){
							if ( typeof(idArray) == "object"){
								if ((idArray.length !== undefined) && (idArray.length > 0)) {
									var objLength = idArray.length;
									idArray[0].setValue(com.cm_safeString(data.codes[0].code));
									idArray[1].setValue(com.cm_safeString(data.codes[0].name));
	
									var tempArray = new Array();
									tempArray.push(data.codes[0].content1);
									tempArray.push(data.codes[0].content2);
									tempArray.push(data.codes[0].content3);
									tempArray.push(data.codes[0].content4);
									tempArray.push(data.codes[0].content5);
									tempArray.push(data.codes[0].content6);
									tempArray.push(data.codes[0].content7);
									tempArray.push(data.codes[0].content8);
									tempArray.push(data.codes[0].content9);
									tempArray.push(data.codes[0].content10);
									tempArray.push(data.codes[0].content11);
									tempArray.push(data.codes[0].content12);
									tempArray.push(data.codes[0].content13);
									tempArray.push(data.codes[0].content14);
									tempArray.push(data.codes[0].content15);
									tempArray.push(data.codes[0].content16);
									tempArray.push(data.codes[0].content17);
									tempArray.push(data.codes[0].content18);
									tempArray.push(data.codes[0].content19);
									tempArray.push(data.codes[0].content20);
									tempArray.push(data.codes[0].content21);
									
									var cnt = 0;
									for (var i = 2; i < objLength; i++) {
										idArray[i].setValue(com.cm_safeString(tempArray[cnt]));
										cnt++;
									}
								}	
							}
						}	
						
					}
				}
			},
			error : function(jqXHR, textStatus, errorThrown ){
				com.cm_error();	
			}
		});	
	} catch (e) {
	    com.cm_logPrint("com.cm_setCodeIdNameArray(): " + e.message);
	    alert("com.cm_setCodeIdNameArray(): " + e.message);
	}
}
/**
 * 코드에 해당하는 코드와 코드명반환 (해당 데이터 없을 경우 코드, 코드명 리셋 처리)
 * @param codeType		: 공통코드 종류 as-is codeType과 동일
 * @param conditions	: 공통코드 조회 조건 배열
 * @return result		: 반환되는 코드와 코드명
 */
com.cm_getCodeNameResult = function(codeType, conditions) {
	var result = {};
	try{		
		var conditionParam = new Object();
		var conditionParams = new Array();
	
		for(var i=0; i<conditions.length; i++){
			conditionParam.cond = conditions[i];
			conditionParams.push(conditionParam);
			conditionParam={};
		}
	
		var requestData = new Object();
		requestData.type = "commonCode."+codeType;
		requestData.conditions = conditionParams;
	
		//서버 ajax 통신
		var url = "/commCodeContent.do";		
		$.ajax({
			type : "POST",
			async : false,
			url  : url,
			dataType : "json",
			data : {"reqParams" : JSON.stringify(requestData)},
			success : function(data, textStatus, jqXHR ){
				if ( typeof data.codes[0] == "undefined" ){
					result.code = "";
					result.name = "";
				} else {
					result.code = com.cm_safeString(data.codes[0].code);
					result.name = com.cm_safeString(data.codes[0].name);					
				}
			},
			error : function(jqXHR, textStatus, errorThrown ){
				com.cm_error();	
			}
		});
		
	} catch (e) {
	    com.cm_logPrint("com.cm_setCodeIdNameEtc(): " + e.message);
	    alert("com.cm_setCodeIdNameEtc(): " + e.message);
	}
	return result;
}

com.cm_setNulvalue = function(resultData) {
	var newCodes = [{"code":"","name":" "}];
	
	if(resultData.codes != null){
		for(var i=0; i<resultData.codes.length; i++){
			newCodes.push(resultData.codes[i]);
		}
	}
	
	resultData.codes = newCodes;
	
	return resultData;
}

/**
 * 공통 코드 콤보 박스 처리(내부함수) CS
 * @param codeType	: 공통코드 종류 as-is codeType과 동일
 * @param conditions	: 공통코드 조회 조건 배열
 * @param id				: 콤보박스 id 공통 코드 조회 후 해당 ID(배열 가능)에 코드 목록 설정 (콤보박스에 셋팅 안할경우 string 형태로 node명을 넘길것)
 * @param displayYn	: 콤보에 code/value 표시여부 default = flase
 * @param optionYn	: 콤보에 default(------------) 표시여부 default 표시(true)
 * @param userCallbackFn : 조회 이후 호출할 화면 Callback 함수 (Callback 필요없을 시 null 이나 값 넘기지 않아도 가능)
 * 				com.cm_setCommonCodeCs("sysTypeAll", ["111", "222"], sel_sysType, false);
 * 				com.cm_setCommonCodeCs("sysTypeAll", ["111", "222"], [sel_sysType, sel_sysType2], false);
 * 				com.cm_setCommonCodeCs("sysTypeAll", ["111", "222"], sel_sysType, false, true, fncEndComomCode);	     
 *  
 */
com.cm_setCommonCodeCs = function (codeType, conditions, id, displayYn, optionYn, userCallbackFn) {
	try{
		
		if(displayYn == null ){
			displayYn = false;
		}
		
		if(optionYn == null ){
			optionYn = true;
		}
		
		var conditionParam = new Object();
		var conditionParams = new Array();
	
		for(var i=0; i<conditions.length; i++){
			conditionParam.cond = conditions[i];
			conditionParams.push(conditionParam);
			conditionParam={};
		}
	
		var requestData = new Object();
		requestData.type = "commonCodeCs."+codeType;
		requestData.conditions = conditionParams;
	
		//서버 ajax 통신
		com.cm_submitCodeAjax("","commCode", requestData, com.cm_successCommonCode, codeType, id, displayYn, optionYn, userCallbackFn);
	} catch (e) {
	    com.cm_logPrint("com.cm_setCommonCode(): " + e.message);
	    alert("com.cm_setCommonCode(): " + e.message);
	}
}

/**
 *  common_file 통합
 */

/**
 * 파일 다운로드 
 * @Description	업로드 된 파일을 다운로드 한다.   
 * @param 		fileName			: 저장된 파일명 [ TEST1234_2014.03.05(09 46 22).txt ]
 * 						viewFileName	: 보여줄 파일명 [ TEST.txt ]  					=> 값 안주면 fileName 으로 설정됨
 * 						fileGubun		: 파일 구분(파일:f, 사진:p, 싸인:s)				=> 값 안주면 파일로 설정됨
 * @returns 		파일 다운로드 
 * @example 	com.cm_fileDownload( fileName, viewFileName, fileGubun );
 * 					com.cm_fileDownload( "TEST123.txt", "TEST.txt" );				//파일 일 경우
 * 					com.cm_fileDownload( "TEST123.jpg", "TEST.jpg", "p" );			//사진 일 경우
 * 					com.cm_fileDownload( "TEST456.gif",  "TEST.gif",  "s" );		//싸인 일 경우
 */
com.cm_fileDownload = function( fileName, viewFileName, fileGubun ) {
    try {	
    	var f_name		= "";		//파일명
    	var v_f_name	= "";		//View용 파일명
    	var f_gubun	= "f";		//파일 구분 default 파일 (파일:f, 사진:p, 싸인:s)    	
    	
    	if ( typeof fileName == "undefined" || fileName == null || fileName == "" ) {
    		return;
    	} else {
        	f_name = fileName;    		
    	}
    	
    	if ( typeof viewFileName == "undefined" || viewFileName == null || viewFileName == "" ) {
    		v_f_name = f_name;	
    	} else {
        	v_f_name = viewFileName;    		
    	}
    	
    	if ( typeof fileGubun != "undefined" && fileGubun != null && fileGubun != "" ) {
    		f_gubun = fileGubun;
    	}
    	
    	
		var actionUrl = "/fileDownload.do?fileName="+f_name+"&viewFileName="+v_f_name+"&fileGubun="+f_gubun;
		WebSquare.net.download( actionUrl , null , null );	
	
    } catch (e) {
        alert("com.cm_fileDownload(): " + e.message);
        WebSquare.exception.printStackTrace(e);
    }	
}


/**
 * 파일 경로 다운로드 
 * @Description	업로드 된 파일을 다운로드 한다.   
 * @param 		fileName		: 저장된 파일명 [ TEST1234_2014.03.05(09 46 22).txt ]
 * 				viewFileName	: 보여줄 파일명 [ TEST.txt ]  					=> 값 안주면 fileName 으로 설정됨
 * 				filePath		: 파일 다운로드 경로
 * @returns 		파일 다운로드 
 * @example 	
 */
com.cm_filePathDownload = function( fileName, viewFileName, filePath ) {
    try {	
    	var f_name		= "";		//파일명
    	var v_f_name	= "";		//View용 파일명
    	
    	if ( typeof fileName == "undefined" || fileName == null || fileName == "" ) {
    		return;
    	} else {
        	f_name = fileName;    		
    	}
    	
    	if ( typeof viewFileName == "undefined" || viewFileName == null || viewFileName == "" ) {
    		v_f_name = f_name;	
    	} else {
        	v_f_name = viewFileName;    		
    	}
    	
		var actionUrl = "/fileDownload.do?fileName="+f_name+"&viewFileName="+v_f_name+"&fileGubun="+ "" + "&filePath=" + filePath;
		WebSquare.net.download( actionUrl , null , null );	
	
    } catch (e) {
        alert("com.cm_fileDownload(): " + e.message);
        WebSquare.exception.printStackTrace(e);
    }	
}


/**
 * AMS 파일 다운로드 
 * @Description	업로드 된 파일을 다운로드 한다.   
 * @param 		fileName			: 저장된 파일명 [ TEST1234_2014.03.05(09 46 22).txt ]
 * 						viewFileName	: 보여줄 파일명 [ TEST.txt ]  					=> 값 안주면 fileName 으로 설정됨
 * 						fileGubun		: 파일 구분(파일:f, 사진:p, 싸인:s)				=> 값 안주면 파일로 설정됨
 * @returns 		파일 다운로드 
 * @example 	com.cm_fileDownload( fileName, viewFileName, fileGubun );
 * 					com.cm_fileDownload( "TEST123.txt", "TEST.txt" );				//파일 일 경우
 * 					com.cm_fileDownload( "TEST123.jpg", "TEST.jpg", "p" );			//사진 일 경우
 * 					com.cm_fileDownload( "TEST456.gif",  "TEST.gif",  "s" );		//싸인 일 경우
 * 
 */
com.cm_amsFileDownload = function( fileName, viewFileName, fileGubun ,filePath) {
    try {	
    	var f_name		= "";		//파일명
    	var v_f_name	= "";		//View용 파일명
    	var f_gubun	= "f";		//파일 구분 default 파일 (파일:f, 사진:p, 싸인:s)    	
    	
    	if ( typeof fileName == "undefined" || fileName == null || fileName == "" ) {
    		return;
    	} else {
        	f_name = fileName;    		
    	}
    	
    	if ( typeof viewFileName == "undefined" || viewFileName == null || viewFileName == "" ) {
    		v_f_name = f_name;	
    	} else {
        	v_f_name = viewFileName;    		
    	}
    	
    	if ( typeof fileGubun != "undefined" && fileGubun != null && fileGubun != "" ) {
    		f_gubun = fileGubun;
    	}
    	if ( typeof filePath != "undefined" && filePath != null && filePath != "" ) {
    		f_filePath = filePath;
    	}
		var actionUrl = "/mn/ams/fileDownload.do?fileName="+f_name+"&viewFileName="+v_f_name+"&fileGubun="+f_gubun+"&filePath="+f_filePath;
		WebSquare.net.download( actionUrl , null , null );	
    } catch (e) {
        alert("com.cm_amsFileDownload(): " + e.message);
        WebSquare.exception.printStackTrace(e);
    }	
}


com.cm_amsJnlDownload = function( viewFileName, fileName, filePath, zipFileName, zipFilePath ) {
	try {	
		
		var actionUrl = "/mn/ams/jnlFileDownload.do"
					  + "?fileName="+fileName
		              + "&viewFileName="+viewFileName
		              + "&filePath="+filePath
		              + "&zipFileName="+zipFileName		              
		              + "&zipFilePath="+zipFilePath		              
		              ;
		
		WebSquare.net.download( actionUrl , null , null );	
		
	} catch (e) {
		alert("com.cm_amsJnlDownload(): " + e.message);
		WebSquare.exception.printStackTrace(e);
	}	
}


/**
 * 그리드뷰 엑셀다운로드
 * @description	그리드뷰 내용 엑셀로 다운로드한다
 * @param		gridView								: 다운로드할 그리드뷰 object
 * @param		optionObj.fileName				: 저장할 엑셀파일명 (null이거나 빈값이면 그리드ID로 설정)
 * @param		optionObj.hiddenYn				: 히든컬럼 제외여부 (Y:제외, null이거나 빈값이면 미제외)
 * @param		optionObj.removeColIndex		: 제외할 컬럼 Index (null이거나 빈값이면 미제외, 여러개일경우 , 로 구분)
 * @param		optionObj.useSubTotal			: SubTotal 출력여부(true, false, default : false)
 * @example 
					var optionObj = {};
					optionObj.fileName				= "사업부관리";		//엑셀 파일 명 
					optionObj.hiddenYn				= "Y";					//히든 컬럼 제외여부 (Y,N)
					optionObj.removeColIndex		= "1,2,3";			//제외할 컬럼 index (여러개일경우 , 로 구분)
					optionObj.useSubTotal			= 	"true"				//SubTotal 출력여부(true, false, default : false)
					com.cm_gridViewExcelDownload ( grid30, optionObj );
 */
com.cm_gridViewExcelDownload = function(gridView, optionObj) {
    try {
    	var options = {};	 
    	var fileExt = ".xls";			//엑셀 확장자(6만건 이하일경우)

    	//그리드 유무 체크 
    	if ( typeof gridView == "undefined" || gridView == null || gridView == "" ) {
    		return;
    	}
    	//그리드 조회 건수 체크 
    	var gridCnt = gridView.getDataLength();
		if (gridCnt == 0) {
    		com.cm_msg("엑셀다운로드 할 데이터가 없습니다.");
    		return;
		}
		
		//엑셀 확장자 지정
		if ( gridCnt > 65000 ) {
			com.cm_msg("데이터 건수가 6만5천건 이상입니다. 엑셀2007버전용 xlsx 파일로 다운로드 됩니다.");
			fileExt = ".xlsx";
		} 
		
		var curDate = com.cm_getCurrentDate("yyyyMMddHHmmss");		//현재일자시간
		var pgmId = com.cm_ProgramId();
		
		var f_name = pgmId + "_"+ curDate + fileExt;			//파일명
		
		var removeCol = "";							//제외 컬럼 index
		
		//optionObj 체크 
    	if ( typeof optionObj != "undefined" && optionObj != null && optionObj != "" ) {
    		
    		//1. 파일명 체크
        	if ( typeof optionObj.fileName != "undefined" && optionObj.fileName != null && optionObj.fileName != "" ) {
        		f_name = optionObj.fileName + "_"+ curDate + fileExt;
        	}

        	//2. 히든 제외 여부 체크 
        	if ( typeof optionObj.hiddenYn != "undefined" && optionObj.hiddenYn != null && optionObj.hiddenYn != "" && optionObj.hiddenYn == "Y" ) {    	
        		var colCnt = gridView.getTotalCol();
        		for (var i=0; i<colCnt; i++) {
        			visible = gridView.getColumnVisible(i);		// 히든컬럼은 제외한 경우 getColumnVisible(컬럼 Index)를 이용하여 
        			if (!visible) {                           		// 숨김처리가 되어있는지 확인하여 removeColumns에 숨김처리된 컬럼 목록을 지정한다.
        				removeCol = removeCol + i +",";
        			}
        		}
        		if (removeCol.length > 1)	removeCol = removeCol.substring(0, removeCol.length -1);
        	}

    		//3. 제외 컬럼 index 체크 
    		if ( typeof optionObj.removeColIndex != "undefined" && optionObj.removeColIndex != null && optionObj.removeColIndex != "" ) {
    			if (removeCol.length > 1)	removeCol = removeCol + ",";
    			removeCol = removeCol + optionObj.removeColIndex;
        	}  
    		
    		//4. SubTotal 출력여부 체크 
    		if ( typeof optionObj.useSubTotal != "undefined" && optionObj.useSubTotal != null && optionObj.useSubTotal != "" ) {
    			options.useSubTotal = optionObj.useSubTotal;		//SubTotal 출력여부 
        	}
    		
    		//5. useStyle 적용여부 체크(Default : false)
    		if ( typeof optionObj.useStyle != "undefined" && optionObj.useStyle != null && optionObj.useStyle != "" ) {
    			options.useStyle = optionObj.useStyle;
        	}
    		
    		//6. colMerge 적용여부 체크(Default : false) 
    		if ( typeof optionObj.colMerge != "undefined" && optionObj.colMerge != null && optionObj.colMerge != "" ) {
    			options.colMerge = optionObj.colMerge; 
        	}
    	}

        options.fileName					= f_name;			//파일의 이름을 결정합니다.
		options.removeColumns			= removeCol;		//제외할 컬럼 index(여러개일 경우 , 로 구분)
		
	    options.type						= "1"; 				//type이 1인 경우 눈에 보이는 데이터를 0인 경우 실제 데이터를 가지고 옵니다.
	    options.startRowIndex			= 0;					//excel에서 gird의 데이터가 시작될 row의 index입니다.
	    options.startColumnIndex		= 0;					//excel에서 gird의 데이터가 시작될 column의 index입니다.
	    //options.headerColor 			= "#C9C9C9";		//그리드의 header부분의 색(#33CCCC)	=> useStyle 설정하면 적용안됨.
	    //options.footerColor				= "#C9C9C9";		//그리드의 footer부분의 색(#008000)	=> useStyle 설정하면 적용안됨.	    
	    
	    //options.useStyle					= false;				//CSS를 제외한 style을 Excel에도 적용할지 여부(배경색, 폰트)
	    options.autoSizeColumn			= true;				//너비자동맞춤 설정 유무

	    gridView.advancedExcelDownload(options , null);

    } catch (e) {
        alert("com.cm_gridViewExcelDownload(): " + e.message);
        WebSquare.exception.printStackTrace(e);
    }
}


/**
 * 파일 업로드 확장자 체크 
 * @Description	업로드 할 파일의 확장자를 체크한다
 * @param 		uploadID		: 업로드 ID(String) 
 * @returns 		업로드 가능(true), 업로드 불가(false) 
 * @example 	var check = com.cm_uploadFileCheck( uploadID );
 */
com.cm_uploadFileCheck = function( uploadID ) {
    try {	

		/* 첨부파일 확장자 검사
		*	허용 확장자 : gif, jpg, doc, xls, ppt, pdf, txt, xlsx, png, pptx, docx, jpeg, jsp (websquare.xml 설정값 ) 
		*/ 
		var fileName = eval(uploadID).getValue();
		if ( fileName != "" ){
			var ext = fileName.slice(fileName.lastIndexOf(".")+1).toLowerCase();
			if ( ext != "gif" && ext != "jpg"  && ext != "jpeg"  && ext != "doc" && 
					ext != "xls" && ext != "ppt" && ext != "pdf" &&
						ext != "txt" && ext != "xlsx" && ext != "png" &&  
							ext != "pptx" && ext != "xml" && ext != "docx" && ext != "zip") {
				com.cm_msg("첨부파일이 등록 하실 수 없는 확장자 입니다.");
				eval(uploadID).reset();
				return false;
			}
		}
		
    } catch (e) {
        alert("com.cm_uploadFileCheck(): " + e.message);
        WebSquare.exception.printStackTrace(e);
    }
    
	return true;    
}


/**
 * 파일 업로드 지정 확장자 체크 
 * @Description	업로드 할 파일의 확장자를 체크한다
 * @param 		uploadID		: 업로드 ID(String) 
 * @returns 		업로드 가능(true), 업로드 불가(false) 
 * @example 	var check = com.cm_uploadFileCheck( uploadID );
 */
com.cm_uploadFileCheckTarget = function( uploadID, fileType ) {
    try {	

		/* 첨부파일 확장자 검사
		*	허용 확장자 : gif, jpg, doc, xls, ppt, pdf, txt, xlsx, png, pptx, docx, jpeg, jsp (websquare.xml 설정값 ) 
		*/ 
		var fileName = eval(uploadID).getValue();
		if ( fileName != "" ){
			var ext = fileName.slice(fileName.lastIndexOf(".")+1).toLowerCase();
			if (ext != fileType) {
				com.cm_msg( "첨부파일이 등록 하실 수 없는 확장자 입니다.\n(첨부가능 확장자 : "+fileType+")");
				eval(uploadID).reset();
				return false;
			}
		}
		
    } catch (e) {
        alert("com.cm_uploadFileCheckTarget(): " + e.message);
        WebSquare.exception.printStackTrace(e);
    }
    
	return true;    
}


/**
 * 파일 업로드 확장자 체크 (이미지용)
 * @Description	업로드 할 파일의 확장자를 체크한다
 * @param 		uploadID		: 업로드 ID(String)
 * @returns 		업로드 가능(true), 업로드 불가(false) 
 * @example 	var check = com.cm_uploadImageFileCheck( uploadID );
 */
com.cm_uploadImageFileCheck = function( uploadID ) {
    try {	

		/* 첨부파일 확장자 검사
		*	허용 확장자 : gif, jpg, png, jpeg (websquare.xml 설정값 ) 
		*/ 
		var fileName = eval(uploadID).getValue();
		if ( fileName != "" ){
			var ext = fileName.slice(fileName.lastIndexOf(".")+1).toLowerCase();
			if ( ext != "gif" && ext != "jpg" && ext != "png" && ext != "jpeg") {
				com.cm_msg("이미지 파일만 등록해 주세요.");
				eval(uploadID).reset();
				return false;
			}
		}
		
    } catch (e) {
        alert("com.cm_uploadImageFileCheck(): " + e.message);
        WebSquare.exception.printStackTrace(e);
    }
    
	return true;    
}


/**
 * 파일 업로드 파일명 한글포함 체크 (전자인명부)
 * @Description	업로드 할 파일명의 한글포함 여부를 체크한다
 * @param 		uploadID		: 업로드 ID(String)
 * @returns 		업로드 가능(true), 업로드 불가(false) 
 * @example 	var check = com.cm_uploadImageFileCheck( uploadID );
 */
com.cm_uploadImageFileNameCheck = function( uploadID ) {
    try {	

		// 첨부파일명 한글포함여부 검사
		var fileName = eval(uploadID).getValue();
		if ( fileName != "" ){
			var fileName = fileName.split("\\");
			var name = fileName[fileName.length - 1];
			name = name.split(".");
			name = name[0];
			
			for(var i=0; i<name.length-1; i++){
				var result = name.charCodeAt(i);
		        if (! (0x30 <= result && result <= 0x39)){
		        	com.cm_msg("파일명은 사번으로 해주세요");
					eval(uploadID).reset();
					return false;
		        }
			}
		}
		
    } catch (e) {
        alert("com.cm_uploadImageFileNameCheck(): " + e.message);
        WebSquare.exception.printStackTrace(e);
    }
    
	return true;    
}


/**
 * Rexpert 출력
 * @Description	화면에서 Rexport 출력 처리 
 * 	@example
 * 					//데이터베이스 연결정보 1개 일때 
  					var param 	= {
							CONNECT_NM	: "operdb" ,											//데이터베이스 연결정보 ( operdb, infodb )
							REPORT_NM		: "/center/OrgOpAmtReportForBOK" ,		//레포트 파일명(경로)
							PARAM_NM		: ["dept_cd", "office_cd"] , 					//파라미터 명 배열
							PARAM_VALUE	: ["10", "70"] 										//파라미터 값 배열 
	   				};
	            	com.cm_print(param);
	            	
	            	//데이터베이스 연결정보 여러개 일때(최대4개)
  					var param 	= {
							CONNECT_NM	: ["operdb","infodb"] ,							//데이터베이스 연결정보 배열 
							REPORT_NM		: "/center/OrgOpAmtReportForBOK" ,		//레포트 파일명(경로)
							PARAM_NM		: ["dept_cd", "office_cd"] , 					//파라미터 명 배열
							PARAM_VALUE	: ["10", "70"] 										//파라미터 값 배열 
	   				};
	            	com.cm_print(param);	            	
 */
com.cm_print = function( param ) {
	try {

		if ( param.PARAM_NM.length != param.PARAM_VALUE.length ){
			com.cm_msg("파라미터 명과 값의 갯수가 일치하지 않습니다.");
			return;
		}
		
		// 필수 - 레포트 생성 객체
		var oReport = GetfnParamSet();
		
		// 옵션 - 데이터베이스 연결 정보 (서버로 통해 데이터를 가져올 때) : 기본 operdb
		var connectNm = "operdb";
		if ( typeof param.CONNECT_NM != "undefined" && param.CONNECT_NM != null && param.CONNECT_NM != "" ){
			for(var i=0; i<param.CONNECT_NM.length; i++){
				oReport.con(param.CONNECT_NM[i]).type = "http";
				oReport.con(param.CONNECT_NM[i]).namespace = "*";
			}		
		} else {
			
			oReport.con(connectNm).type = "http";
			oReport.con(connectNm).namespace = "*";
		}
				 
		// 필수 - 레포트 파일명
		oReport.rptname = param.REPORT_NM;

		// 옵션 - 레포트 파라메터
		for(var i=0; i<param.PARAM_NM.length; i++){
			oReport.param(param.PARAM_NM[i]).value = param.PARAM_VALUE[i];
		}
		
		oReport.cookie = gv_rexpertCookie;
		
		// 엑셀 출력시 한 Sheet에 출력하도록 옵션 설정
		oReport.event.init = com.cm_fnReportEvent;
		
		// 뷰어 생성시 125%로 확대하도록 옵션 설정
		oReport.event.finishdocument = com.cm_fnReportEvent;
		
		//실행
		oReport.open();
		
		/* 출력정보 로그 등록 ( 연구소, 한대표님 요청 - 2014.10.16 ) */
		com.cm_printLog(param.REPORT_NM, param.PARAM_NM, param.PARAM_VALUE);		
		
	} catch (e) {
	    com.cm_logPrint("com.cm_print(): " + e.message);
	    alert("com.cm_print(): " + e.message);	
	}	        
}


/**
 * Rexpert 엑셀 출력시 옵션 설정
 * @Description	Rexpert 엑셀 출력시 옵션 설정
 */
com.cm_fnReportEvent = function(oRexCtl, sEvent, oArgs) {      
    
    if ( sEvent == "init" ) {      
		//export창에서 엑셀 한시트에 저장
   			oRexCtl.SetCSS("export.xls.option.sheetoption=2");    
		//보고서 로딩바 
	        oRexCtl.SetCSS("appearance.waitingdialog.visible=1");   
		//바로가기 export창에서 엑셀 한시트에 저장
	        oRexCtl.SetCSS("appearance.toolbar.button.exportxls.option.sheetoption=2");      
	        oRexCtl.UpdateCSS();      
    }   
    
    if ( sEvent == "finishdocument" ) {      
		//뷰어 생성시 125%로 확대하도록 옵션 설정
	        oRexCtl.Zoom("125");
    } 
}   


/**
 * Rexpert 출력 로그 등록
 * @Description	Rexpert 출력 시 로그 등록 한다
 * @param 		reportNm		: 레포트명 
 * 						paramNm		: 파라미터 명 배열
 * 						paramValue		: 파라미터 값 배열 
 */
com.cm_printLog = function( reportNm, paramNm, paramValue ) {
	try {
		var gv_systemPath = ""; 
		var pgmId = com.cm_ProgramId();
		
		var gMenuId = "";
		var mMenuId = "";
		var programId = "";
		
		var len = pgmId.length;		
		if ( len == 5 || len == 6 ){
			gMenuId = pgmId.substring(0, 2);
			mMenuId = pgmId.substring(2, 4);
			programId = pgmId.substring(4);
		} else {
			return;
		}
		
		//레포트 파라메터 ( ex : aaa=111;bbb=222; )
		var reportParam = "";
		for(var i=0; i<paramNm.length; i++){
			reportParam = reportParam + paramNm[i] + "=" + paramValue[i] + ";";
		}
		
		var requestData = {};
		requestData.gMenuId	= gMenuId;
		requestData.mMenuId	= mMenuId;
		requestData.programId	= programId;
		
		requestData.reportNm		= reportNm;		//레포트명
		requestData.parameter		= reportParam;	//레포트파라미터
		requestData.userId			= gcm.SS_userId;		//userId		
		requestData.systemType	= "OP";				//시스템Type(운영:OP, 파트너:PT)

		var action		= "insertPrintLog";
		var callBack	= "";
		com.cm_submitAjax( gv_systemPath, action, requestData, callBack );	//서버 ajax 통신

	} catch (e) {
        com.cm_logPrint("com.cm_printLog(): " + e.message);
        alert("com.cm_printLog(): " + e.message);
	}
}

/**
 * 기본 브라우저 창 형태의 팝업을 띄우는 공통 함수입니다.
 * 
 * @param fileName: 팝업으로 띄울 웹스퀘어 화면입니다. 
 * @param popupID: 팝업의 아이디입니다. 생략 가능합니다.
 * @param popupTitle: 팝업의 상단에 나타날 타이틀입니다. 생략 가능합니다. 
 * @param width: 팝업의 너비입니다. 기본값은 800입니다. 생략 가능합니다.
 * @param height: 팝업의 높이입니다. 기본값은 600입니다. 생략 가능합니다.
 * @param param: XML 문자열을 이용하여 팝업창으로 전달할 데이터입니다. 생략 가능합니다.
 * @param modal: 모달 팝업 여부입니다. 생략 가능합니다.
 * @param scrollbars: 스크롤 사용 여부
 * @param setTop: 상단의 좌표입니다. 생략 가능합니다.
 * @param setLeft: 좌측 좌표입니다. 생략 가능합니다.

 * 
 * 샘플)
 *		com.cm_popupWindowNormal("popup.xml", "popupID", "테스트 팝업", 500, 300);
 *		com.cm_popupWindowNormal("popup.xml", "popupID", "테스트 팝업", 500, 300, "[XML 문자열]");
 *		com.cm_popupWindowNormal("popup.xml", "popupID", "테스트 팝업", 500, 300, null, true);
 *
 */
com.cm_popupWindowNormal = function( fileName, popupID, popupTitle, width, height, param, modal, scrollbars, setTop, setLeft ) {
	try {
		//기존 팝업 창 띄워져 있을 경우 Return
		if ( document.getElementById(popupID) != null ) 		return;
		
		if (com.cm_isNull(popupID)) popupID = "";
		if (com.cm_isNull(popupTitle)) popupTitle = "";
		if (com.cm_isNull(width))   width   = 800;
		if (com.cm_isNull(height))  height  = 600;
		if (com.cm_isNull(param))   param   = "";
		if (com.cm_isNull(modal))   modal   = true;

		var scroll = true;
		if (typeof scrollbars != "undefined" && scrollbars == true){
			scroll = true;
		} else if (scrollbars == false) {
			scroll = false;
		}
		
		// 팝업 기본 좌표, 미지정 시 화면 크기를 고려하여 기본값을 계산합니다. 
//		var top  = !setTop  ? screen.availHeight / 2 - (height / 2) - 20 : setTop;
//		var left = !setLeft ? screen.availWidth  / 2 - (width  / 2) : setLeft;
		
		// 현제창의 좌표를 고려하여 팝업위치를 계산		
		var winX = com.cm_screenLeft(); // 현재창의 x좌표 
				
		// 팝업 기본 좌표, 미지정 시 화면 크기를 고려하여 기본값을 계산합니다. 
		var top  = 0;
		var left = 0;
		
		if(typeof setTop == "undefined") {
			top = screen.availHeight / 2 - (height / 2) - 20;
		} else {
			top = setTop;
		}
		if(typeof setLeft == "undefined") {
			left = winX + (screen.availWidth  / 2) - (width  / 2);
		} else {
			left = setLeft;
		}
		
		// 웹스케어에서 제공하는 기본 팝업 함수 사용
		//		type: "window", "browser" 중 택일. "browser"의 경우, useIFrame 속성과 상관 없이 window.open 메서드를 이용하여 팝업이 열립니다. 
	    //		popupName: popupName popup 객체의 이름으로 popup 프레임의 표시줄에 나타납니다.
		//		modal: 레이어를 이용해서 뒤 쪽 배경을 동작하지 않도록 만들기 위한 인자입니다. 
		//			이 값이 false면  배경의 컴퍼넌트를 사용할 수 있습니다.
		//		useIFrame: type 속성이 "window"인 경우 useIFrame 속성의 값에 따라 다음과 같이 동작합니다.
		//			true : IFrame을 사용하는 WebSquare 팝업이 오픈됩니다.
		//			false: window.open을 사용하는 팝업이 오픈됩니다.
		//		xml: 
		//			팝업에 넘길 XML 문서 문자열입니다.
		//			팝업 창에서 WebSquare.uiplugin.popup.getPopupParam() api를 사용해서 가져올 수 있습니다.
		//		srcData:
		//			팝업 개체의 type 속성이 "window"인 경우, 부모창에서 팝업으로 전달할 정보를 지정하는 xPath 입니다.
		//		destData:
		//			팝업 개체의 type 속성이 "window"인 경우, 팝업에서 부모창으로 전달할 정보를 지정하는 xPath 입니다.
		
		/*
		$w.openPopup(
				fileName, { 
			        id:         popupID,
			        type:       "browserPopup",
			        width:      width,
			        height:     height,
			        top:        top,
			        left:       left,
			        popupName:  popupTitle, 
			        modal:      modal,
			        useIFrame:  false,
			        resizable:  true,
			        status:     false,
			        menubar:    false,
			        scrollbars: scroll,
			        title:      false,
			        xml:        param, 
			        popupUrl:   "../nibs_popup.jsp"
			    }
		);
		*/
				
		WebSquare.uiplugin.popup.openPopup(
			fileName, { 
		        id:         popupID,
		        type:       "window",
		        width:      width,
		        height:     height,
		        top:        top,
		        left:       left,
		        popupName:  popupTitle, 
		        modal:      modal,
		        useIFrame:  false,
		        resizable:  true,
		        status:     false,
		        menubar:    false,
		        scrollbars: scroll,
		        title:      false,
		        xml:        param, 
		        popupUrl:   "../nibs_popup.jsp"
		    }
		);

	} catch (e) {
		com.cm_logPrint("com.cm_popupWindowNormal(): " + e.message);
		alert("com.cm_popupWindowNormal(): " + e.message);
	}
}


/**
 * 팝업에 전달할 XML 개체를 생성합니다.
 * 
 * @param info: XML 개체의 세부 정보
 */
com.cm_makeXmlDocForPopup = function(info) {
	try {
		//xml 형태 데이터 생성
		/*var xmlInfo = WebSquare.xml.parse("<info />");
		for (var key in info) {
			WebSquare.xml.setString(xmlInfo, key, info[key]);
		}
		
		var xmlString = WebSquare.xml.serialize( xmlInfo );	//XML String형태로 변환 
		
		return xmlString;*/
		return WebSquare.json.JSON2XML(info);
	} catch (e) {
		com.cm_logPrint("com.cm_makeXmlDocForPopup(): " + e.message);
		alert("com.cm_makeXmlDocForPopup(): " + e.message);
	}
}


/**
 * 팝업창 닫기
 */
com.cm_closePopup = function() {
	try {
		WebSquare.core.closePopupWindow();
	} catch (e) {
		com.cm_logPrint("com.cm_closePopup(): " + e.message);
		alert("com.cm_closePopup(): " + e.message);
	}
}


/*********************************************************************************/
/************************* 사용자 팝업 영역 ********************************************/
/*********************************************************************************/


/**
 * 공통코드 팝업 (코드, 코드명 의 그리드 형태 팝업)
 * commonCode-sqlMap.xml 에 등록된 SQL 데이터 가져온다.
 * 
 * @param doc: 팝업에 전달할 XML 개체
 * 
 *  호출 방법 =======================================================================================
			//공통코드 팝업 호출 
			function fncPopCommonCode(){
	            try {
					var doc 	= cm_makeXmlDocForPopup({
							CODE_TYPE	: "roleAllForPopup",						//공통코드 sql ID (commonCode-sqlMap.xml 에 등록된 SQL ID) 
							TITLE_NM	: "권한 ID 정보 조회",						//팝업창 타이틀 명 
							TEXT_NM_1	: "권한 ID",									//CODE 의 그리드 해더명
							TEXT_NM_2	: "권한 명", 									//NAME 의 그리드 해더명
	    					CALLBACK	: "fncPopCommonCode_RESULT" 	//결과 받을 callback 함수명 
	   				});
	            	cm_commonCodePopup(doc);		  
	            } catch (e) {
					alert("fncPopCommonCode(): " + e.message);
					WebSquare.exception.printStackTrace(e);
				}
			}
			
			//공통코드 팝업 결과 받아오기 
			function fncPopCommonCode_RESULT( result ){
	            try {
					alert("선택한 code=>"+result[0]+", 선택한 name=>"+result[1]);	            
					
	            } catch (e) {
					alert("fncPopCommonCode_RESULT(): " + e.message);
					WebSquare.exception.printStackTrace(e);
				}
			}  
 *  ===============================================================================================
 */
com.cm_commonCodePopup = function(doc) {
	try {
		var popup = document.getElementById("COMCODE_POPUP");
		if (popup != null)		return;
		
		//var objXml = doc;
		var TITLE_NM	= com.cm_trim(WebSquare.xml.getValue( doc, "object/TITLE_NM" ));		//팝업 타이틀 
		
    	var fileName	= "/initCommCode.do";
    	var popupID	    = "COMCODE_POPUP";
    	var popupTitle	= TITLE_NM;
    	var width		= 400;
    	var height		= 565;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		cm_logPrint("com.cm_commonCodePopup(): " + e.message);
		alert("com.cm_commonCodePopup(): " + e.message);
	}
}


/***
 * 우편번호 검색(도로명 주소) 팝업
 * @param doc
 */
com.cm_commonCodeForRoadZipPopup = function(doc) {
	try {
		
		var popup = document.getElementById("COMCODE_POPUP");
		if (popup != null)		return;
		
		//var objXml = doc;
		var TITLE_NM	= com.cm_trim(WebSquare.xml.getValue( doc, "object/TITLE_NM" ));		//팝업 타이틀 
		
    	var fileName	= "/initCommCodeForRoadZip.do";
    	var popupID	    = "COMCODE_POPUP";
    	var popupTitle	= TITLE_NM;
    	var width		= 500;
    	var height		= 620;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_commonCodePopup(): " + e.message);
		alert("com.cm_commonCodePopup(): " + e.message);
	}
}


/**
 * 비밀번호변경 팝업(process)
 * 
 * @param doc: 팝업에 전달할 XML 개체
 */
com.cm_passwordChangePopup = function(doc) {
	try {
		var popup = document.getElementById("PASSWORD_CHANGE_POPUP");
		if (popup != null)		return;
		
    	var fileName	= "/mn/sys/common/passwordChange.do";
    	var popupID	= "PASSWORD_CHANGE_POPUP";
    	var popupTitle	= "비밀번호 변경";
    	var width		= 450;
    	var height		= 340;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		cm_logPrint("com.cm_passwordChangePopup(): " + e.message);
		alert("com.cm_passwordChangePopup(): " + e.message);
	}
}


/**
 * 비밀번호변경 팝업(info)
 * 
 * @param doc: 팝업에 전달할 XML 개체
 */
com.cm_passwordChangePopup2 = function(doc) {
	try {
		var popup = document.getElementById("PASSWORD_CHANGE2_POPUP");
		if (popup != null)		return;
		
    	var fileName	= "/mn/sys/common/passwordChange2.do";
    	var popupID	= "PASSWORD_CHANGE2_POPUP";
    	var popupTitle	= "비밀번호 변경기간 알림";
    	var width		= 450;
    	var height		= 320;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_passwordChangePopup2(): " + e.message);
		alert("com.cm_passwordChangePopup2(): " + e.message);
	}
}


/**
 * 비밀번호찾기 팝업
 * 
 * @param doc: 팝업에 전달할 XML 개체
 */
com.cm_findPasswordPopup = function(doc) {
	try {
		var popup = document.getElementById("FIND_PASSWORD_POPUP");
		if (popup != null)		return;
		
    	var fileName	= "/mn/sys/common/findPassword.do";
    	var popupID	= "FIND_PASSWORD_POPUP";
    	var popupTitle	= "비밀번호 찾기";
    	var width		= 405;
    	var height		= 195;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_findPasswordPopup(): " + e.message);
		alert("com.cm_findPasswordPopup(): " + e.message);
	}
}


/**
 * 이메일 인증 팝업
 * 
 * @param doc: 팝업에 전달할 XML 개체
 */
com.cm_findPasswordConfirmPopup = function(doc) {
	try {
		var popup = document.getElementById("FIND_PASSWORD_CONFIRM_POPUP");
		if (popup != null)		return;
		
    	var fileName	= "/mn/sys/common/findPasswordConfirm.do";
    	var popupID	= "FIND_PASSWORD_CONFIRM_POPUP";
    	var popupTitle	= "이메일 등록";
    	var width		= 500;
    	var height		= 200;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_findPasswordConfirmPopup(): " + e.message);
		alert("com.cm_findPasswordConfirmPopup(): " + e.message);
	}
}


/**
 * 권한정보 팝업
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( CALLBACK )
 * @호출방법  
					var callBack	= "fncPopup_RESULT";	//결과 받을 callback 함수명(String) 
					var doc 	= cm_makeXmlDocForPopup({
									CODE_TYPE : codeType,
									CALLBACK : callBack
					});
					cm_roleInfoPopup(doc);
 *
 * @결과받는방법  
					function fncPopup_RESULT( result ){
						alert("code=>"+result[0]+", name=>"+result[1]);
					}					
 */
com.cm_roleInfoPopup = function(doc) {
	try {
		
		var objJson = JSON.parse(WebSquare.json.XML2JSONString(doc));
		
		var data = {};
		
		if(com.cm_isNull(objJson.CODE_TYPE)){
			objJson.CODE_TYPE = "roleAllForPopup";
		}
		
		data.CODE_TYPE = objJson.CODE_TYPE;	//공통코드 sql ID (commonCode-sqlMap.xml 에 등록된 SQL ID) 
		data.TITLE_NM  = "권한(Role)ID 정보 조회";	//팝업창 타이틀 명 
		data.TEXT_NM_1 = "권한(Role)ID";	//CODE 의 그리드 해더명
		data.TEXT_NM_2 = "권한(Role)명";		//NAME 의 그리드 해더명
		data.CALLBACK  = objJson.CALLBACK;	//WHERE 조건
		//data.PARAMS    = objJson.PARAMS;	//결과 받을 callback 함수명 
		
		com.cm_commonCodePopup(cm_makeXmlDocForPopup(data));

	} catch (e) {
		com.cm_logPrint("com.cm_roleInfoPopup(): " + e.message);
		alert("com.cm_roleInfoPopup(): " + e.message);
	}
}


/**
 * 금고코드정보 팝업
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( CALLBACK, deptCode, officeCode )
 * @호출방법  
					var callBack	= "fncPopup_RESULT";				//결과 받을 callback 함수명(String)  
					var doc 	= cm_makeXmlDocForPopup({
					                CODE_TYPE : codeType,
									PARAMS 	 : ["05","10"],
									CALLBACK : callBack
					});
					cm_safeInfoPopup(doc);
 *
 * @결과받는방법  
					function fncPopup_RESULT( result ){
						alert("code=>"+result[0]+", name=>"+result[1]);
					}									
 */
com.cm_safeInfoPopup = function(doc) {
	try {
		
		var objJson = JSON.parse(WebSquare.json.XML2JSONString(doc));
		
		var data = {};
		
		if(com.cm_isNull(objJson.CODE_TYPE)){
			objJson.CODE_TYPE = "safeAllForPopup";
		}
		
		data.CODE_TYPE = objJson.CODE_TYPE;	//공통코드 sql ID (commonCode-sqlMap.xml 에 등록된 SQL ID) 
		data.TITLE_NM  = "금고코드 정보 조회";	//팝업창 타이틀 명 
		data.TEXT_NM_1 = "금고코드";	//CODE 의 그리드 해더명
		data.TEXT_NM_2 = "금고명";		//NAME 의 그리드 해더명
		data.CALLBACK  = objJson.CALLBACK;	//WHERE 조건
		data.PARAMS    = objJson.PARAMS;	//결과 받을 callback 함수명 
		
		com.cm_commonCodePopup(cm_makeXmlDocForPopup(data));
		
	} catch (e) {
		com.cm_logPrint("com.cm_safeInfoPopup(): " + e.message);
		alert("com.cm_safeInfoPopup(): " + e.message);
	}
}


/**
 * 기기ID 정보 팝업
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( CALLBACK, orgCode, branchCode )
 * @호출방법  
					var callBack	= "fncPopup_RESULT";				//결과 받을 callback 함수명(String)  
					var doc 	= cm_makeXmlDocForPopup({
									CODE_TYPE    : codeType,
									PARAMS 	    : [orgCode,branchCode,deptCode,officeCode],
									CALLBACK	: callBack
					});
					cm_macIdInfoPopup(doc);
 *
 * @결과받는방법  
					function fncPopup_RESULT( result ){
						alert("code=>"+result[0]+", name=>"+result[1]);
					}								
 */
com.cm_macInfoPopup = function(doc) {
	try {
		var objJson = JSON.parse(WebSquare.json.XML2JSONString(doc));
		
		var data = {};
		
		if(com.cm_isNull(objJson.CODE_TYPE)){
			objJson.CODE_TYPE = "macForPopup3";
		}
		
		data.CODE_TYPE = objJson.CODE_TYPE;	//공통코드 sql ID (commonCode-sqlMap.xml 에 등록된 SQL ID) 
		data.TITLE_NM  = "기기ID 정보 조회";	//팝업창 타이틀 명 
		data.TEXT_NM_1 = "기기ID";	//CODE 의 그리드 해더명
		data.TEXT_NM_2 = "기기명";		//NAME 의 그리드 해더명
		data.CALLBACK  = objJson.CALLBACK;	//WHERE 조건
		data.PARAMS    = objJson.PARAMS;	//결과 받을 callback 함수명 
		
		com.cm_commonCodePopup(cm_makeXmlDocForPopup(data));
		
	} catch (e) {
		com.cm_logPrint("com.cm_macInfoPopup(): " + e.message);
		alert("com.cm_macInfoPopup(): " + e.message);
	}
}


/**
 * 기기번호 정보 팝업
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( CALLBACK, orgCode, branchCode )
 * @호출방법  
					var callBack	= "fncPopup_RESULT";				//결과 받을 callback 함수명(String)  
					var doc 	= cm_makeXmlDocForPopup({
									CODE_TYPE    : codeType,
									PARAMS 	    : [orgCode,branchCode,deptCode,officeCode],
									CALLBACK	: callBack
					});
					cm_macNoInfoPopup(doc);
 *
 * @결과받는방법  
					function fncPopup_RESULT( result ){
						alert("code=>"+result[0]+", name=>"+result[1]);
					}								
 */
com.cm_macNoInfoPopup = function(doc) {
	try {
		var objJson = JSON.parse(WebSquare.json.XML2JSONString(doc));
		
		var data = {};
		
		if(com.cm_isNull(objJson.CODE_TYPE)){
			objJson.CODE_TYPE = "macDyTotAllForPopup";
		}
		
		data.CODE_TYPE = objJson.CODE_TYPE;	//공통코드 sql ID (commonCode-sqlMap.xml 에 등록된 SQL ID) 
		data.TITLE_NM	= "기기번호 정보 조회",			//팝업창 타이틀 명 
		data.TEXT_NM_1	= "기기번호",						//CODE 의 그리드 해더명
		data.TEXT_NM_2	= "기기명", 						//NAME 의 그리드 해더명
		data.CALLBACK  = objJson.CALLBACK;	//WHERE 조건
		data.PARAMS    = objJson.PARAMS;	//결과 받을 callback 함수명 
		
		com.cm_commonCodePopup(cm_makeXmlDocForPopup(data));
		
	} catch (e) {
		com.cm_logPrint("com.cm_macNoInfoPopup(): " + e.message);
		alert("com.cm_macNoInfoPopup(): " + e.message);
	}
}


/**
 * 법인코드 정보 팝업
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( CALLBACK )
 * @호출방법  
					var callBack	= "fncPopup_RESULT";				//결과 받을 callback 함수명(String)  
					var doc 	= cm_makeXmlDocForPopup({
									CALLBACK	: callBack
					});
					cm_leaseIncInfoPopup(doc);
 *
 * @결과받는방법  
					function fncPopup_RESULT( result ){
						alert("code=>"+result[0]+", name=>"+result[1]);
					}								
 */
com.cm_leaseIncInfoPopup = function(doc) {
	try {
		
		var objJson = JSON.parse(WebSquare.json.XML2JSONString(doc));
		
		var data = {};
		
		if(com.cm_isNull(objJson.CODE_TYPE)){
			objJson.CODE_TYPE = "leaseIncByOrgForPopup";
		}
		
		data.CODE_TYPE = objJson.CODE_TYPE;	//공통코드 sql ID (commonCode-sqlMap.xml 에 등록된 SQL ID) 
		data.TITLE_NM  = "법인코드 정보 조회";	//팝업창 타이틀 명 
		data.TEXT_NM_1 = "법인코드";	//CODE 의 그리드 해더명
		data.TEXT_NM_2 = "관리법인명";		//NAME 의 그리드 해더명
		data.CALLBACK  = objJson.CALLBACK;	//WHERE 조건
		//data.PARAMS    = objJson.PARAMS;	//결과 받을 callback 함수명 
		
		com.cm_commonCodePopup(cm_makeXmlDocForPopup(data));
		
	} catch (e) {
		com.cm_logPrint("com.cm_leaseIncInfoPopup(): " + e.message);
		alert("com.cm_leaseIncInfoPopup(): " + e.message);
	}
}


/**
 * 사업자코드 정보 팝업
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( CALLBACK, deptCode, officeCode )
 * @호출방법  
					var callBack	= "fncPopup_RESULT";				//결과 받을 callback 함수명(String)  
					var doc 	= cm_makeXmlDocForPopup({
									CODE_TYPE    : codeType,
									PARAMS 	    : [deptCode,officeCode],				
									CALLBACK	: callBack
					});
					cm_saupInfoPopup(doc);
 *
 * @결과받는방법  
					function fncPopup_RESULT( result ){
						alert("code=>"+result[0]+", name=>"+result[1]);
					}								
 */
com.cm_saupInfoPopup = function(doc) {
	try {
		var objJson = JSON.parse(WebSquare.json.XML2JSONString(doc));
		
		var data = {};
		
		if(com.cm_isNull(objJson.CODE_TYPE)){
			objJson.CODE_TYPE = "saupForPopup";
		}
		
		data.CODE_TYPE = objJson.CODE_TYPE;	//공통코드 sql ID (commonCode-sqlMap.xml 에 등록된 SQL ID) 
		data.TITLE_NM  = "사업자코드 정보 조회";	//팝업창 타이틀 명 
		data.TEXT_NM_1 = "사업자코드";	//CODE 의 그리드 해더명
		data.TEXT_NM_2 = "사업자명";		//NAME 의 그리드 해더명
		data.CALLBACK  = objJson.CALLBACK;	//WHERE 조건
		data.PARAMS    = objJson.PARAMS;	//결과 받을 callback 함수명 
		
		com.cm_commonCodePopup(cm_makeXmlDocForPopup(data));
		
	} catch (e) {
		com.cm_logPrint("com.cm_saupInfoPopup(): " + e.message);
		alert("com.cm_saupInfoPopup(): " + e.message);
	}
}


/**
 * 사원번호 정보 팝업
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( CALLBACK, deptCode, officeCode )
 * @호출방법  
					var callBack	= "fncPopup_RESULT";				//결과 받을 callback 함수명(String)  
					var doc 	= cm_makeXmlDocForPopup({
									CODE_TYPE   : codeType,
									PARAMS 	    : [deptCode,officeCode],				
									CALLBACK	: callBack
					});
					cm_memberInfoPopup(doc);
 *
 * @결과받는방법  
					function fncPopup_RESULT( result ){
						alert("code=>"+result[0]+", name=>"+result[1]);
					}								
 */
com.cm_memberInfoPopup = function(doc) {
	try {
		var objJson = JSON.parse(WebSquare.json.XML2JSONString(doc));
		
		var data = {};
		
		if(com.cm_isNull(objJson.CODE_TYPE)){
			objJson.CODE_TYPE = "memberForPopup_f";
		}
		
		data.CODE_TYPE = objJson.CODE_TYPE;	//공통코드 sql ID (commonCode-sqlMap.xml 에 등록된 SQL ID) 
		data.TITLE_NM  = "사원번호 정보 조회";	//팝업창 타이틀 명 
		data.TEXT_NM_1 = "사원번호";	//CODE 의 그리드 해더명
		data.TEXT_NM_2 = "사원명";		//NAME 의 그리드 해더명
		data.CALLBACK  = objJson.CALLBACK;	//WHERE 조건
		data.PARAMS    = objJson.PARAMS;	//결과 받을 callback 함수명 
		
		com.cm_commonCodePopup(cm_makeXmlDocForPopup(data));
		
	} catch (e) {
		com.cm_logPrint("com.cm_memberInfoPopup(): " + e.message);
		alert("com.cm_memberInfoPopup(): " + e.message);
	}
}


/**
 * 부서 정보 팝업
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( CALLBACK, deptCode, officeCode )
 * @호출방법  
					var callBack	= "fncPopup_RESULT";				//결과 받을 callback 함수명(String)  
					var doc 	= cm_makeXmlDocForPopup({
									CODE_TYPE   : codeType,
									PARAMS 	    : [deptCode,officeCode],				
									CALLBACK	: callBack
					});
					cm_memberInfoPopup(doc);
 *
 * @결과받는방법  
					function fncPopup_RESULT( result ){
						alert("code=>"+result[0]+", name=>"+result[1]);
					}								
 */
com.cm_deptInfoPopup = function(doc) {
	try {
		var objJson = JSON.parse(WebSquare.json.XML2JSONString(doc));
		
		var data = {};
		
		if(com.cm_isNull(objJson.CODE_TYPE)){
			objJson.CODE_TYPE = "deptMisInfoAll";
		}
		
		data.CODE_TYPE = objJson.CODE_TYPE;	//공통코드 sql ID (commonCode-sqlMap.xml 에 등록된 SQL ID) 
		data.TITLE_NM  = "부서 정보 조회";	//팝업창 타이틀 명 
		data.TEXT_NM_1 = "부서코드";	//CODE 의 그리드 해더명
		data.TEXT_NM_2 = "부서명";		//NAME 의 그리드 해더명
		data.CALLBACK  = objJson.CALLBACK;	//WHERE 조건
		data.PARAMS    = objJson.PARAMS;	//결과 받을 callback 함수명 
		
		com.cm_commonCodePopup(cm_makeXmlDocForPopup(data));
		
	} catch (e) {
		com.cm_logPrint("com.cm_memberInfoPopup(): " + e.message);
		alert("com.cm_memberInfoPopup(): " + e.message);
	}
}


/**
 * 사원번호(작업자) 정보 팝업
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( CALLBACK, deptCode, officeCode )
 * @호출방법  
					var callBack	= "fncPopup_RESULT";				//결과 받을 callback 함수명(String)  
					var doc 	= cm_makeXmlDocForPopup({
									CODE_TYPE   : codeType,
									PARAMS 	    : [deptCode,officeCode],				
									CALLBACK	: callBack
					});
					cm_memberInfoPopup(doc);
 *
 * @결과받는방법  
					function fncPopup_RESULT( result ){
						alert("code=>"+result[0]+", name=>"+result[1]);
					}								
 */
com.cm_memberWorkTimePopup = function(doc) {
	try {
		var objJson = JSON.parse(WebSquare.json.XML2JSONString(doc));
		
		var data = {};
		
		if(com.cm_isNull(objJson.CODE_TYPE)){
			objJson.CODE_TYPE = "memberWorkTimeForPopup";
		}
		
		data.CODE_TYPE = objJson.CODE_TYPE;	//공통코드 sql ID (commonCode-sqlMap.xml 에 등록된 SQL ID) 
		data.TITLE_NM  = "사원번호 정보 조회";	//팝업창 타이틀 명 
		data.TEXT_NM_1 = "사원번호";	//CODE 의 그리드 해더명
		data.TEXT_NM_2 = "사원명";		//NAME 의 그리드 해더명
		data.CALLBACK  = objJson.CALLBACK;	//WHERE 조건
		data.PARAMS    = objJson.PARAMS;	//결과 받을 callback 함수명 
		
		com.cm_commonCodePopup(cm_makeXmlDocForPopup(data));
		
	} catch (e) {
		com.cm_logPrint("com.cm_memberInfoPopup(): " + e.message);
		alert("com.cm_memberInfoPopup(): " + e.message);
	}
}


/**
 * 예비금고코드 정보 팝업
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( CALLBACK, deptCode, officeCode )
 * @호출방법  
					var callBack	= "fncPopup_RESULT";				//결과 받을 callback 함수명(String)  
					var doc 	= cm_makeXmlDocForPopup({
					                CODE_TYPE   : codeType,
									PARAMS 	    : [deptCode,officeCode],					
									CALLBACK	: callBack
					});
					cm_preSafeInfoPopup(doc);
 *
 * @결과받는방법  
					function fncPopup_RESULT( result ){
						alert("code=>"+result[0]+", name=>"+result[1]);
					}								
 */
com.cm_preSafeInfoPopup = function(doc) {
	try {
		
		var objJson = JSON.parse(WebSquare.json.XML2JSONString(doc));
		
		var data = {};
		
		if(com.cm_isNull(objJson.CODE_TYPE)){
			objJson.CODE_TYPE = "PreSafe";
		}
		
		data.CODE_TYPE = objJson.CODE_TYPE;	//공통코드 sql ID (commonCode-sqlMap.xml 에 등록된 SQL ID) 
		data.TITLE_NM  = "예비금고코드 정보 조회";	//팝업창 타이틀 명 
		data.TEXT_NM_1 = "예비금고코드";	//CODE 의 그리드 해더명
		data.TEXT_NM_2 = "예비금고명";		//NAME 의 그리드 해더명
		data.CALLBACK  = objJson.CALLBACK;	//WHERE 조건
		data.PARAMS    = objJson.PARAMS;	//결과 받을 callback 함수명 
		
		com.cm_commonCodePopup(cm_makeXmlDocForPopup(data));
		
	} catch (e) {
		com.cm_logPrint("com.cm_preSafeInfoPopup(): " + e.message);
		alert("com.cm_preSafeInfoPopup(): " + e.message);
	}
}


/**
 * 예정완료코드 정보 팝업
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( CALLBACK, orgCode, branchCode )
 * @호출방법  
					var callBack	= "fncPopup_RESULT";				//결과 받을 callback 함수명(String)  
					var doc 	= cm_makeXmlDocForPopup({
									CODE_TYPE   : codeType,
									PARAMS 	    : [orgCode,branchCode],	
									CALLBACK	: callBack
					});
					cm_atmWorkSiteInfoPopup(doc);
 *
 * @결과받는방법  
					function fncPopup_RESULT( result ){
						alert("code=>"+result[0]+", name=>"+result[1]);
					}								
 */
com.cm_atmWorkSiteInfoPopup = function(doc) {
	try {
		
		var objJson = JSON.parse(WebSquare.json.XML2JSONString(doc));
		
		var data = {};
		
		if(com.cm_isNull(objJson.CODE_TYPE)){
			objJson.CODE_TYPE = "atmWorkSiteList";
		}
		
		data.CODE_TYPE = objJson.CODE_TYPE;	//공통코드 sql ID (commonCode-sqlMap.xml 에 등록된 SQL ID) 
		data.TITLE_NM  = "예정완료코드 정보 조회";	//팝업창 타이틀 명 
		data.TEXT_NM_1 = "예정완료코드";	//CODE 의 그리드 해더명
		data.TEXT_NM_2 = "사이트명";		//NAME 의 그리드 해더명
		data.CALLBACK  = objJson.CALLBACK;	//WHERE 조건
		data.PARAMS    = objJson.PARAMS;	//결과 받을 callback 함수명 
		
		com.cm_commonCodePopup(cm_makeXmlDocForPopup(data));
		
	} catch (e) {
		com.cm_logPrint("com.cm_atmWorkSiteInfoPopup(): " + e.message);
		alert("com.cm_atmWorkSiteInfoPopup(): " + e.message);
	}
}


/**
 * 외주업체코드 정보 팝업
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( CALLBACK )
 * @호출방법  
					var callBack	= "fncPopup_RESULT";				//결과 받을 callback 함수명(String)  
					var doc 	= cm_makeXmlDocForPopup({
					                CODE_TYPE   : codeType,
									CALLBACK	: callBack
					});
					cm_outAllSiteInfoPopup(doc);
 *
 * @결과받는방법  
					function fncPopup_RESULT( result ){
						alert("code=>"+result[0]+", name=>"+result[1]);
					}								
 */
com.cm_outAllSiteInfoPopup = function(doc) {
	try {
		
		var objJson = JSON.parse(WebSquare.json.XML2JSONString(doc));
		
		var data = {};
		
		if(com.cm_isNull(objJson.CODE_TYPE)){
			objJson.CODE_TYPE = "outAll_site";
		}
		
		data.CODE_TYPE = objJson.CODE_TYPE;	//공통코드 sql ID (commonCode-sqlMap.xml 에 등록된 SQL ID) 
		data.TITLE_NM  = "외주업체코드 정보 조회";	//팝업창 타이틀 명 
		data.TEXT_NM_1 = "외주업체코드";	//CODE 의 그리드 해더명
		data.TEXT_NM_2 = "외주업체명";		//NAME 의 그리드 해더명
		data.CALLBACK  = objJson.CALLBACK;	//WHERE 조건
		//data.PARAMS    = objJson.PARAMS;	//결과 받을 callback 함수명 
		
		com.cm_commonCodePopup(cm_makeXmlDocForPopup(data));
		
	} catch (e) {
		com.cm_logPrint("com.cm_outAllSiteInfoPopup(): " + e.message);
		alert("com.cm_outAllSiteInfoPopup(): " + e.message);
	}
}


/**
 * 용역료코드 정보 팝업
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( CALLBACK, orgCode )
 * @호출방법  
					var callBack	= "fncPopup_RESULT";				//결과 받을 callback 함수명(String)  
					var doc 	= cm_makeXmlDocForPopup({
									CODE_TYPE   : codeType,
									PARAMS		: ["10"],					//orgCode 값					
									CALLBACK	: callBack
					});
					cm_sitehFreeInfoPopup(doc);
 *
 * @결과받는방법  
					function fncPopup_RESULT( result ){
						alert("code=>"+result[0]+", name=>"+result[1]);
					}								
 */
com.cm_sitehFreeInfoPopup = function(doc) {
	try {
		
		var objJson = JSON.parse(WebSquare.json.XML2JSONString(doc));
		
		var data = {};
		
		if(com.cm_isNull(objJson.CODE_TYPE)){
			objJson.CODE_TYPE = "sitehFeeForPopup";
		}
		
		data.CODE_TYPE = objJson.CODE_TYPE;	//공통코드 sql ID (commonCode-sqlMap.xml 에 등록된 SQL ID) 
		data.TITLE_NM  = "용역료코드 정보 조회";	//팝업창 타이틀 명 
		data.TEXT_NM_1 = "용역료코드";	//CODE 의 그리드 해더명
		data.TEXT_NM_2 = "용역료사이트명";		//NAME 의 그리드 해더명
		data.CALLBACK  = objJson.CALLBACK;	//WHERE 조건
		data.PARAMS    = objJson.PARAMS;	//결과 받을 callback 함수명 
		
		com.cm_commonCodePopup(cm_makeXmlDocForPopup(data));
		
	} catch (e) {
		com.cm_logPrint("com.cm_sitehFreeInfoPopup(): " + e.message);
		alert("com.cm_sitehFreeInfoPopup(): " + e.message);
	}
}


/**
 * 우편번호 정보 팝업
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( CALLBACK )
 * @호출방법  
					var callBack	= "fncPopup_RESULT";				//결과 받을 callback 함수명(String)  
					var doc 	= cm_makeXmlDocForPopup({
									CALLBACK	: callBack
					});
					cm_zipCodeInfoPopup(doc);
 *
 * @결과받는방법  
					function fncPopup_RESULT( result ){
						alert("code=>"+result[0]+", name=>"+result[1]);
					}								
 */
com.cm_zipCodeInfoPopup = function(doc) {
	try {

		var objJson = JSON.parse(WebSquare.json.XML2JSONString(doc));
		
		var data = {};
		
		if(com.cm_isNull(objJson.CODE_TYPE)){
			objJson.CODE_TYPE = "pictureZipcodeForPopup";
		}
		
		data.CODE_TYPE = objJson.CODE_TYPE;	//공통코드 sql ID (commonCode-sqlMap.xml 에 등록된 SQL ID) 
		data.TITLE_NM  = "우편번호 정보 조회";	//팝업창 타이틀 명 
		data.TEXT_NM_1 = "우편번호";	//CODE 의 그리드 해더명
		data.TEXT_NM_2 = "읍/면/동";		//NAME 의 그리드 해더명
		data.CALLBACK  = objJson.CALLBACK;	//WHERE 조건
		//data.PARAMS    = objJson.PARAMS;	//결과 받을 callback 함수명 
		
		com.cm_commonCodePopup(cm_makeXmlDocForPopup(data));
		
	} catch (e) {
		com.cm_logPrint("com.cm_zipCodeInfoPopup(): " + e.message);
		alert("com.cm_zipCodeInfoPopup(): " + e.message);
	}
}


/***
 * 우편번호 검색(도로명 주소) 팝업
 * @param doc
 */
com.cm_roadZipCodeInfoPopup = function(doc) {
	try {
		var objJson = JSON.parse(WebSquare.json.XML2JSONString(doc));
		
		var data = {};
		
		if(com.cm_isNull(objJson.CODE_TYPE)){
			objJson.CODE_TYPE = "pictureRoadZipcodeForPopup";
		}
		
		data.CODE_TYPE = objJson.CODE_TYPE;	//공통코드 sql ID (commonCode-sqlMap.xml 에 등록된 SQL ID) 
		data.CALLBACK  = objJson.CALLBACK;	//WHERE 조건
		
		com.cm_commonCodeForRoadZipPopup(cm_makeXmlDocForPopup(data));
		
	} catch (e) {
		com.cm_logPrint("com.cm_zipCodeInfoPopup(): " + e.message);
		alert("com.cm_zipCodeInfoPopup(): " + e.message);
	}
}


/**
 * 지사코드(사무소) 정보 팝업
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( CALLBACK, deptCode )
 * @호출방법  
					var callBack	= "fncPopup_RESULT";				//결과 받을 callback 함수명(String)  
					var doc 	= cm_makeXmlDocForPopup({
									PARAMS		: ["10"],				//deptCode 값					
									CALLBACK	: callBack
					});
					cm_officeInfoPopup(doc);
 *
 * @결과받는방법  
					function fncPopup_RESULT( result ){
						alert("code=>"+result[0]+", name=>"+result[1]);
					}								
 */
com.cm_officeInfoPopup = function(doc) {
	try {
		
		var objJson = JSON.parse(WebSquare.json.XML2JSONString(doc));
		
		var data = {};
		
		if(com.cm_isNull(objJson.CODE_TYPE)){
			objJson.CODE_TYPE = "officeForPopup2";
		}
		
		data.CODE_TYPE = objJson.CODE_TYPE;	//공통코드 sql ID (commonCode-sqlMap.xml 에 등록된 SQL ID) 
		data.TITLE_NM  = "지점코드 정보 조회";	//팝업창 타이틀 명 
		data.TEXT_NM_1 = "지점코드";	//CODE 의 그리드 해더명
		data.TEXT_NM_2 = "지점명";		//NAME 의 그리드 해더명
		data.CALLBACK  = objJson.CALLBACK;	//WHERE 조건
		data.PARAMS    = objJson.PARAMS;	//결과 받을 callback 함수명 
		
		com.cm_commonCodePopup(cm_makeXmlDocForPopup(data));
		
	} catch (e) {
		com.cm_logPrint("com.cm_officeInfoPopup(): " + e.message);
		alert("com.cm_officeInfoPopup(): " + e.message);
	}
}


/**
 * 지소코드(팀) 정보 팝업
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( CALLBACK, deptCode, officeCode )
 * @호출방법  
					var callBack	= "fncPopup_RESULT";				//결과 받을 callback 함수명(String)  
					var doc 	= cm_makeXmlDocForPopup({
									CODE_TYPE   : code_type,
					                PARAMS		: [deptCode,officeCode],
									CALLBACK	: callBack
					});
					cm_teamInfoPopup(doc);
 *
 * @결과받는방법  
					function fncPopup_RESULT( result ){
						alert("code=>"+result[0]+", name=>"+result[1]);
					}								
 */
com.cm_teamInfoPopup = function(doc) {
	try {
		
		var objJson = JSON.parse(WebSquare.json.XML2JSONString(doc));
		
		var data = {};
		
		if(com.cm_isNull(objJson.CODE_TYPE)){
			objJson.CODE_TYPE = "teamForPopup";
		}
		
		data.CODE_TYPE = objJson.CODE_TYPE;	//공통코드 sql ID (commonCode-sqlMap.xml 에 등록된 SQL ID) 
		data.TITLE_NM  = "지소코드 정보 조회";	//팝업창 타이틀 명 
		data.TEXT_NM_1 = "지소코드";	//CODE 의 그리드 해더명
		data.TEXT_NM_2 = "지소명";		//NAME 의 그리드 해더명
		data.CALLBACK  = objJson.CALLBACK;	//WHERE 조건
		data.PARAMS    = objJson.PARAMS;	//결과 받을 callback 함수명 
		
		com.cm_commonCodePopup(cm_makeXmlDocForPopup(data));
		
	} catch (e) {
		com.cm_logPrint("com.cm_teamInfoPopup(): " + e.message);
		alert("com.cm_teamInfoPopup(): " + e.message);
	}
}


/**
 * 국민점포 정보 팝업
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( CALLBACK, deptCode, officeCode )
 * @호출방법  
					var callBack	= "fncPopup_RESULT";				//결과 받을 callback 함수명(String)  
					var doc 	= cm_makeXmlDocForPopup({
									CODE_TYPE   : code_type,
					                PARAMS		: [carryOrgCd,carryOrgNm,deptCode,officeCode],
									CALLBACK	: callBack
					});
					cm_teamInfoPopup(doc);
 *
 * @결과받는방법  
					function fncPopup_RESULT( result ){
						alert("code=>"+result[0]+", name=>"+result[1]);
					}								
 */
com.cm_carryOrgForKbPopup = function(doc) {
	try {
		
		var objJson = JSON.parse(WebSquare.json.XML2JSONString(doc));
		
		var data = {};
		
		if(com.cm_isNull(objJson.CODE_TYPE)){
			objJson.CODE_TYPE = "carryOrgForKbPopup";
		}
		
		data.CODE_TYPE = objJson.CODE_TYPE;	//공통코드 sql ID (commonCode-sqlMap.xml 에 등록된 SQL ID) 
		data.TITLE_NM  = "국민점포 정보 조회";	//팝업창 타이틀 명 
		data.TEXT_NM_1 = "국민점포코드";	//CODE 의 그리드 해더명
		data.TEXT_NM_2 = "국민점포명";		//NAME 의 그리드 해더명
		data.CALLBACK  = objJson.CALLBACK;	//WHERE 조건
		data.PARAMS    = objJson.PARAMS;	//결과 받을 callback 함수명 
		
		com.cm_commonCodePopup(cm_makeXmlDocForPopup(data));
		
	} catch (e) {
		com.cm_logPrint("com.cm_carryOrgForKbPopup(): " + e.message);
		alert("com.cm_carryOrgForKbPopup(): " + e.message);
	}
}


/**
 * 기관코드(정산기-수납업체) 정보 팝업
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( CALLBACK, orgCode )
 * @호출방법  
					var callBack	= "fncPopup_RESULT";				//결과 받을 callback 함수명(String)  
					var doc 	= cm_makeXmlDocForPopup({
									CODE_TYPE   : code_type,
					                PARAMS		: [orgCode]	,	
									CALLBACK	: callBack
					});
					cm_branchInfoPopup(doc);
 *
 * @결과받는방법  
					function fncPopup_RESULT( result ){
						alert("code=>"+result[0]+", name=>"+result[1]);
					}								
 */
com.cm_calmacOrgInfoPopup = function(doc) {
	try {
		
		var objJson = JSON.parse(WebSquare.json.XML2JSONString(doc));
		
		var data = {};
		
		if(com.cm_isNull(objJson.CODE_TYPE)){
			objJson.CODE_TYPE = "calmacOrg";
		}
		
		data.CODE_TYPE = objJson.CODE_TYPE;	//공통코드 sql ID (commonCode-sqlMap.xml 에 등록된 SQL ID) 
		data.TITLE_NM  = "기관코드 정보 조회";	//팝업창 타이틀 명 
		data.TEXT_NM_1 = "기관코드";	//CODE 의 그리드 해더명
		data.TEXT_NM_2 = "기관명";		//NAME 의 그리드 해더명
		data.CALLBACK  = objJson.CALLBACK;	//WHERE 조건
		data.PARAMS    = objJson.PARAMS;	//결과 받을 callback 함수명 
		
		com.cm_commonCodePopup(cm_makeXmlDocForPopup(data));
		
	} catch (e) {
		com.cm_logPrint("com.cm_calmacOrgInfoPopup(): " + e.message);
		alert("com.cm_calmacOrgInfoPopup(): " + e.message);
	}
}


/**
 * 지점코드(정산기-수납업체) 정보 팝업
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( CALLBACK, orgCode )
 * @호출방법  
					var callBack	= "fncPopup_RESULT";				//결과 받을 callback 함수명(String)  
					var doc 	= cm_makeXmlDocForPopup({
									CODE_TYPE   : code_type,
					                PARAMS		: [orgCode]	,	
									CALLBACK	: callBack
					});
					cm_calmacBranchInfoPopup(doc);
 *
 * @결과받는방법  
					function fncPopup_RESULT( result ){
						alert("code=>"+result[0]+", name=>"+result[1]);
					}								
 */
com.cm_calmacBranchInfoPopup = function(doc) {
	try {
		var objJson = JSON.parse(WebSquare.json.XML2JSONString(doc));
		
		//alert(JSON.stringify(objJson));
		
		var data = {};
		
		if(com.cm_isNull(objJson.CODE_TYPE)){
			objJson.CODE_TYPE = "calmacBranch";
		}
		
		data.CODE_TYPE = objJson.CODE_TYPE;	//공통코드 sql ID (commonCode-sqlMap.xml 에 등록된 SQL ID) 
		data.TITLE_NM  = "지점코드 정보 조회";	//팝업창 타이틀 명 
		data.TEXT_NM_1 = "지점코드";	//CODE 의 그리드 해더명
		data.TEXT_NM_2 = "지점명";		//NAME 의 그리드 해더명
		data.CALLBACK  = objJson.CALLBACK;	//WHERE 조건
		data.PARAMS    = objJson.PARAMS;	//결과 받을 callback 함수명 
		
		com.cm_commonCodePopup(cm_makeXmlDocForPopup(data));
		
	} catch (e) {
		com.cm_logPrint("com.cm_calmacOrgInfoPopup(): " + e.message);
		alert("com.cm_calmacOrgInfoPopup(): " + e.message);
	}
}


/**
 * 기관코드(정산기-수납업체) 정보 팝업
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( CALLBACK, orgCode )
 * @호출방법  
					var callBack	= "fncPopup_RESULT";				//결과 받을 callback 함수명(String)  
					var doc 	= cm_makeXmlDocForPopup({
									CODE_TYPE   : code_type,
					                PARAMS		: [orgCode]	,	
									CALLBACK	: callBack
					});
					cm_branchInfoPopup(doc);
 *
 * @결과받는방법  
					function fncPopup_RESULT( result ){
						alert("code=>"+result[0]+", name=>"+result[1]);
					}								
 */
com.cm_calmacCarryOrgInfoPopup = function(doc) {
	try {
		
		var objJson = JSON.parse(WebSquare.json.XML2JSONString(doc));
		
		var data = {};
		
		if(com.cm_isNull(objJson.CODE_TYPE)){
			objJson.CODE_TYPE = "calmacCarryOrg";
		}
		
		data.CODE_TYPE = objJson.CODE_TYPE;	//공통코드 sql ID (commonCode-sqlMap.xml 에 등록된 SQL ID) 
		data.TITLE_NM  = "업체코드 정보 조회";	//팝업창 타이틀 명 
		data.TEXT_NM_1 = "업체코드";	//CODE 의 그리드 해더명
		data.TEXT_NM_2 = "업체명";		//NAME 의 그리드 해더명
		data.TEXT_NM_3 = "업체구분코드";		// content1 의 그리드 해더명
		data.CALLBACK  = objJson.CALLBACK;	//WHERE 조건
		data.PARAMS    = objJson.PARAMS;	//결과 받을 callback 함수명 
		
		com.cm_commonCodePopup(cm_makeXmlDocForPopup(data));
		
	} catch (e) {
		com.cm_logPrint("com.cm_calmacCarryOrgInfoPopup(): " + e.message);
		alert("com.cm_calmacCarryOrgInfoPopup(): " + e.message);
	}
}


/**
 * 지점코드 정보 팝업
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( CALLBACK, orgCode )
 * @호출방법  
					var callBack	= "fncPopup_RESULT";				//결과 받을 callback 함수명(String)  
					var doc 	= cm_makeXmlDocForPopup({
									CODE_TYPE   : code_type,
					                PARAMS		: [orgCode]	,	
									CALLBACK	: callBack
					});
					cm_branchInfoPopup(doc);
 *
 * @결과받는방법  
					function fncPopup_RESULT( result ){
						alert("code=>"+result[0]+", name=>"+result[1]);
					}								
 */
com.cm_branchInfoPopup = function(doc) {
	try {
		var objJson = JSON.parse(WebSquare.json.XML2JSONString(doc));
		
		var data = {};
		
		if(com.cm_isNull(objJson.CODE_TYPE)){
			objJson.CODE_TYPE = "sitehBranchForPopup1";
		}
		
		data.CODE_TYPE = objJson.CODE_TYPE;	//공통코드 sql ID (commonCode-sqlMap.xml 에 등록된 SQL ID) 
		data.TITLE_NM  = "지점코드 정보 조회";	//팝업창 타이틀 명 
		data.TEXT_NM_1 = "지점코드";	//CODE 의 그리드 해더명
		data.TEXT_NM_2 = "지점명";		//NAME 의 그리드 해더명
		data.CALLBACK  = objJson.CALLBACK;	//WHERE 조건
		data.PARAMS    = objJson.PARAMS;	//결과 받을 callback 함수명 
		
		com.cm_commonCodePopup(cm_makeXmlDocForPopup(data));
		
	} catch (e) {
		com.cm_logPrint("com.cm_branchInfoPopup(): " + e.message);
		alert("com.cm_branchInfoPopup(): " + e.message);
	}
}


/**
 * 지점코드 정보 팝업(확정용-confirmBranchForPopup)
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( CALLBACK, orgCode )
 * @호출방법  
					var callBack	= "fncPopup_RESULT";				//결과 받을 callback 함수명(String)  
					var doc 	= cm_makeXmlDocForPopup({
									orgCode		: "10",					//orgCode 값			
									CALLBACK	: callBack
					});
					cm_branchConfirmInfoPopup(doc);
 *
 * @결과받는방법  
					function fncPopup_RESULT( result ){
						alert("code=>"+result[0]+", name=>"+result[1]);
					}								
 */
/*function cm_branchConfirmInfoPopup(doc) {
	try {
		var objXml = doc;
		var CALLBACK	= cm_trim(WebSquare.xml.getString(objXml, "CALLBACK"));		//결과 받을 callback 함수명
		var param1		= cm_trim(WebSquare.xml.getString(objXml, "orgCode"));		//orgCode
		
		var tempDoc 	= cm_makeXmlDocForPopup({
			CODE_TYPE	: "confirmBranchForPopup",			//공통코드 sql ID (commonCode-sqlMap.xml 에 등록된 SQL ID) 
			TITLE_NM	: "지점코드 정보 조회",		//팝업창 타이틀 명 
			TEXT_NM_1	: "지점코드",					//CODE 의 그리드 해더명
			TEXT_NM_2	: "지점명",		 			//NAME 의 그리드 해더명
			
			param1		: param1,					//orgCode
			
			CALLBACK	: CALLBACK 				//결과 받을 callback 함수명
		});
		cm_commonCodePopup(tempDoc);
		
	} catch (e) {
		cm_logPrint("cm_branchConfirmInfoPopup(): " + e.message);
		alert("cm_branchConfirmInfoPopup(): " + e.message);
	}
}*/


/**
 * 공통코드 정보 팝업
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( CALLBACK )
 * @호출방법  
					var callBack	= "fncPopup_RESULT";				//결과 받을 callback 함수명(String)  
					var doc 	= cm_makeXmlDocForPopup({
									CALLBACK	: callBack
					});
					cm_commonCodeInfoPopup(doc);
 *
 * 	@결과받는방법  
				function fncPopup_RESULT( result ){
						alert("code=>"+result[0]+", name=>"+result[1]);
					}								
 */
com.cm_commonCodeInfoPopup = function(doc) {
	try {
		
		var objJson = JSON.parse(WebSquare.json.XML2JSONString(doc));
		
		var data = {};
		
		if(com.cm_isNull(objJson.CODE_TYPE)){
			objJson.CODE_TYPE = "CommonCodeForPopup";
		}
		
		data.CODE_TYPE = objJson.CODE_TYPE;	//공통코드 sql ID (commonCode-sqlMap.xml 에 등록된 SQL ID) 
		data.TITLE_NM  = "코드 정보 조회";	//팝업창 타이틀 명 
		data.TEXT_NM_1 = "코드";	//CODE 의 그리드 해더명
		data.TEXT_NM_2 = "코드명";		//NAME 의 그리드 해더명
		data.CALLBACK  = objJson.CALLBACK;	//WHERE 조건
		//data.PARAMS    = objJson.PARAMS;	//결과 받을 callback 함수명 
		
		com.cm_commonCodePopup(cm_makeXmlDocForPopup(data));
	} catch (e) {
		com.cm_logPrint("com.cm_commonCodeInfoPopup(): " + e.message);
		alert("com.cm_commonCodeInfoPopup(): " + e.message);
	}
}


/**
 * 현송팀 정보 팝업
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( CALLBACK )
 * @호출방법  
					var callBack	= "fncPopup_RESULT";				//결과 받을 callback 함수명(String)  
					var doc 	= cm_makeXmlDocForPopup({
									CODE_TYPE   : codeType,
									PARAMS      : [deptCode, officeCode],
									CALLBACK	: callBack
					});
					cm_cashTeamInfoPopup(doc);
 *
 * 	@결과받는방법  
				function fncPopup_RESULT( result ){
						alert("code=>"+result[0]+", name=>"+result[1]);
					}								
 */
com.cm_cashTeamInfoPopup = function(doc) {
	try {
		
		var objJson = JSON.parse(WebSquare.json.XML2JSONString(doc));
		
		var data = {};
		
		if(com.cm_isNull(objJson.CODE_TYPE)){
			objJson.CODE_TYPE = "cashteamForPopup";
		}
		
		data.CODE_TYPE = objJson.CODE_TYPE;
		data.TITLE_NM  = "현송팀코드 정보 조회";
		data.TEXT_NM_1 = "현송팀코드";
		data.TEXT_NM_2 = "현송팀명";
		data.CALLBACK  = objJson.CALLBACK;
		data.PARAMS    = objJson.PARAMS;
	
		com.cm_commonCodePopup(cm_makeXmlDocForPopup(data));
		
	} catch (e) {
		com.cm_logPrint("com.cm_cashTeamInfoPopup(): " + e.message);
		alert("com.cm_cashTeamInfoPopup(): " + e.message);
	}
}


/**
 * 권종코드 정보 팝업
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( CALLBACK, cw_1000000, cw_500000, cw_300000, cw_100000, cw_50000, cw_10000, cw_5000, cw_1000, cw_500, cw_100, cw_50, cw_10 )
 * @호출방법  
					var callBack	= "fncPopup_RESULT";				//결과 받을 callback 함수명(String)  
					var doc 	= cm_makeXmlDocForPopup({
									cw_1000000	: "10",				//백만원권 값
									cw_500000		: "10",				//오십만원권 값
									cw_300000		: "10",				//삼십만원권 값
									cw_100000		: "10",				//십만원권 값
									cw_50000		: "10",				//오만원권 값
									cw_10000		: "10",				//만원권 값
									cw_5000			: "10",				//오천원권 값
									cw_1000			: "10",				//천원권 값
									cw_500			: "10",				//오백원권 값
									cw_100			: "10",				//백원권 값
									cw_50			: "10",				//오십원권 값
									cw_10			: "10",				//십원권 값
									CALLBACK		: callBack
					});
					cm_cwCodeInfoPopup(doc);
 *
 * @결과받는방법  
					function fncPopup_RESULT( result ){
						alert("cw_1000000=>"+result[0]+", cw_500000=>"+result[1]);
					}								
 */
com.cm_cwCodeInfoPopup = function(doc) {
	try {
		var popup = document.getElementById("CW_CODE_POPUP");
		if (popup != null)		return;
		
    	var fileName	= "/cwCode.do";
    	var popupID	= "CW_CODE_POPUP";
    	var popupTitle	= "권종코드 권종정보 조회";
    	var width		= 400; 
    	var height		= 470;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_cwCodeInfoPopup(): " + e.message);
		alert("com.cm_cwCodeInfoPopup(): " + e.message);
	}
}


/**
 * 기기 조회 팝업
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( CALLBACK, macNo, macNm )
 * @호출방법  
					var callBack	= "fncPopup_RESULT";				//결과 받을 callback 함수명(String)  
					var doc 	= cm_makeXmlDocForPopup({
									macNo		: "10",					//macNo 값
									macNm		: "10",					//macNm 값
									CALLBACK		: callBack
					});
					cm_atmInfoPopup(doc);
 *
 * @결과받는방법  
					function fncPopup_RESULT( result ){
						alert("macNo=>"+result[0]+", macNm=>"+result[1]);
					}								
 */
com.cm_atmInfoPopup = function(doc) {
	try {
		var popup = document.getElementById("ATM_SEARCH_POPUP");
		if (popup != null)		return;
		
    	var fileName	= "/atmSearch.do";
    	var popupID	= "ATM_SEARCH_POPUP";
    	var popupTitle	= "기기 조회";
    	var width		= 550; 
    	var height		= 370;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_atmInfoPopup(): " + e.message);
		alert("com.cm_atmInfoPopup(): " + e.message);
	}
}


/**
 * 기기 장애 조회 팝업
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( CALLBACK, macNo, macNm )
 * @호출방법  
					var callBack	= "fncPopup_RESULT";				//결과 받을 callback 함수명(String)  
					var doc 	= cm_makeXmlDocForPopup({
									macNo		: "10",					//macNo 값
									macNm		: "10",					//macNm 값
									CALLBACK		: callBack
					});
					cm_atmTrblInfoPopup(doc);
 *
 * @결과받는방법  
					function fncPopup_RESULT( result ){
						alert("macNo=>"+result[0]+", macNm=>"+result[1]);
					}								
 */
com.cm_atmTrblInfoPopup = function(doc) {
	try {
		var popup = document.getElementById("ATM_SEARCH_TRBL_POPUP");
		if (popup != null)		return;
		
    	var fileName	= "/atmSearchTrbl.do";
    	var popupID	= "ATM_SEARCH_TRBL_POPUP";
    	var popupTitle	= "기기 조회";
    	var width		= 550; 
    	var height		= 370;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_atmInfoPopup(): " + e.message);
		alert("com.cm_atmInfoPopup(): " + e.message);
	}
}


/**
 * 사이트 조회 팝업
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( CALLBACK, siteCd, siteNm, orgCd, branchCd, deptCd, officeCd, teamNm, nullCheck )
 * @호출방법  
					var callBack	= "fncPopup_RESULT";				//결과 받을 callback 함수명(String)  
					var doc 	= cm_makeXmlDocForPopup({
									siteCd		: "10",					//siteCd 값
									siteNm		: "10",					//siteNm 값
									orgCd			: "10",					//orgCd 값
									branchCd		: "10",					//branchCd 값
									deptCd		: "10",					//deptCd 값
									officeCd		: "10",					//officeCd 값
									teamNm		: "10",					//teamNm 값
									nullCheck	: "0",						//orgCd, siteCd 값 여부 ("" 넘길경우 ORG_CD, SITE_CD 빈 데이터만 조회) 
									CALLBACK	: callBack
					});
					cm_siteInfoPopup(doc);
 *
 * @결과받는방법  
					function fncPopup_RESULT( result ){		//object형태로 넘겨줌(순서확인 어려워서)
						alert("siteCd =>"		+result.siteCd);
						alert("siteNm =>"		+result.siteNm);
						alert("orgCd =>"		+result.orgCd);
						alert("orgNm =>"		+result.orgNm);
						alert("branchCd =>"		+result.branchCd);
						alert("branchNm =>"		+result.branchNm);
						alert("deptCd =>"		+result.deptCd);
						alert("deptNm =>"		+result.deptNm);
						alert("officeCd =>"	+result.officeCd);
						alert("officeNm =>"	+result.officeCd);
						alert("teamCd =>"		+result.teamCd);
						alert("teamNm =>"		+result.teamNm);
					}								
 */
com.cm_siteInfoPopup = function(doc) {
	try {
		var popup = document.getElementById("SITE_INFO_POPUP");
		if (popup != null)		return;
		
    	var fileName	= "/siteSearch.do";
    	var popupID	= "SITE_INFO_POPUP";
    	var popupTitle	= "사이트 조회";
    	var width		= 1000; 
    	var height		= 570;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_siteInfoPopup(): " + e.message);
		alert("com.cm_siteInfoPopup(): " + e.message);
	}
}


/**
 * 사이트코드 정보 조회 팝업
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( CALLBACK, siteCd, siteNm, orgCd, branchCd, deptCd, officeCd, teamCd )
 * @호출방법  
					var callBack	= "fncPopup_RESULT";				//결과 받을 callback 함수명(String)  
					var doc 	= cm_makeXmlDocForPopup({
									siteCd		: "10",					//siteCd 값
									siteNm		: "10",					//siteNm 값
									orgCd			: "10",					//orgCd 값
									branchCd		: "10",					//branchCd 값
									deptCd		: "10",					//deptCd 값
									officeCd		: "10",					//officeCd 값
									teamCd			: "10",					//teamCd 값
									CALLBACK	: callBack
					});
					cm_siteCodeInfoPopup(doc);
 *
 * @결과받는방법  
					function fncPopup_RESULT( result ){		//object형태로 넘겨줌(순서확인 어려워서)
						alert("flag =>"+ result.flag);
						alert("orgNm =>"+ result.orgNm);
						alert("branchNm =>"+ result.branchNm);
						alert("deptNm =>"+ result.deptNm);
						alert("officeNm =>"+ result.officeNm);
						alert("teamNm =>"+ result.teamNm);
						alert("siteNm =>"+ result.siteNm);
						alert("orgCd =>"+ result.orgCd);
						alert("branchCd =>"+ result.branchCd);
						alert("deptCd =>"+ result.deptCd);
						alert("officeCd =>"+ result.officeCd);
						alert("teamCd =>"+ result.teamCd);
						alert("siteCd =>"+ result.siteCd);
						alert("serviceCd =>"+ result.serviceCd);
						alert("serviceAmt =>"+ result.serviceAmt);
						alert("siteEngNm =>"+ result.siteEngNm);
						alert("setDate =>"+ result.setDate);
						alert("closeDate =>"+ result.closeDate);
						alert("openDate =>"+ result.openDate);
						alert("operType =>"+ result.operType);
						alert("operStartTime =>"+ result.operStartTime);
						alert("operEndTime =>"+ result.operEndTime);
						alert("orgSiteCd =>"+ result.orgSiteCd);		
					}								
 */
com.cm_siteCodeInfoPopup = function(doc) {
	try {
		var popup = document.getElementById("SITECODE_INFO_POPUP");
		if (popup != null)		return;
		
    	var fileName	= "/siteCodeInfo.do";
    	var popupID	= "SITECODE_INFO_POPUP";
    	var popupTitle	= "사이트코드 정보 조회";
    	var width		= 700; 
    	var height		= 500;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_siteCodeInfoPopup(): " + e.message);
		alert("com.cm_siteCodeInfoPopup(): " + e.message);
	}
}


/**
 * 사원 조회 팝업
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( CALLBACK, memberId, memberNm )
 * @호출방법  
					var callBack	= "fncPopup_RESULT";				//결과 받을 callback 함수명(String)  
					var doc 	= cm_makeXmlDocForPopup({
									memberId		: "0415041",		//memberId 값
									memberNm		: "송호석",			//memberNm 값					
									CALLBACK	: callBack
					});
					cm_sawonInfoPopup(doc);
 *
 * @결과받는방법  
					function fncPopup_RESULT( result ){		//object형태로 넘겨줌(순서확인 어려워서)
						alert("deptNm=>"+result.deptNm);
						alert("officeNm=>"+result.officeNm);
						alert("memberTypeNm=>"+result.memberTypeNm);
						alert("memberId=>"+result.memberId);
						alert("memberNm=>"+result.memberNm);
						alert("pdaNo=>"+pdaNo);
						alert("deptCd=>"+result.deptCd);
						alert("officeCd=>"+result.officeCd);
						alert("teamCd=>"+result.teamCd);
						alert("memberType=>"+result.memberType);	
					}								
 */
com.cm_sawonInfoPopup = function(doc) {
	try {
		var popup = document.getElementById("SAWON_INFO_POPUP");
		if (popup != null)		return;
		
    	var fileName	= "/sawonInfo.do";
    	var popupID	= "SAWON_INFO_POPUP";
    	var popupTitle	= "사원 조회";
    	var width		= 700; 
    	var height		= 360;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_sawonInfoPopup(): " + e.message);
		alert("com.cm_sawonInfoPopup(): " + e.message);
	}
}


/**
 * 이미지파일 업로드 팝업
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( gubun, CALLBACK )
 * @호출방법  
					var callBack	= "fncPopup_RESULT";				//결과 받을 callback 함수명(String)  
					var doc 	= cm_makeXmlDocForPopup({
									gubun		: "f",						//업로드 구분(일반이미지:f, 사진이미지:p, 싸인이미지:s) => 넘기지않을경우 Default 일반(f)로 수행)
									CALLBACK	: callBack
					});
					cm_imageUploadPopup(doc);
 *
 * @결과받는방법  
					function fncPopup_RESULT( result ){				//object형태로 넘겨줌
		        		alert("uploadPath=>"+result.uploadPath);		//업로드 파일 경로
		        		alert("realFileName"+result.realFileName);		//업로드 실제 파일명
		        		alert("fileName"+result.fileName);					//업로드 view 파일명
					}								
 */
com.cm_imageUploadPopup = function(doc) {
	try {
		var popup = document.getElementById("IMAGE_UPLOAD_POPUP");
		if (popup != null)		return;
		
    	var fileName	= "/imageUpload.do";
    	var popupID	= "IMAGE_UPLOAD_POPUP";
    	var popupTitle	= "이미지파일 업로드";
    	var width		= 600; 
    	var height		= 150;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_imageUploadPopup(): " + e.message);
		alert("com.cm_imageUploadPopup(): " + e.message);
	}
}


/**
 * 이미지파일 Viewer 팝업
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( imageFileNm, imageFilePath )
 * @호출방법  
					var imageFileNm		= "test.jpg";		//이미지 파일 명 
					var imageFileGubun	= "f";					//이미지 파일 구분 (일반이미지:f, 사진이미지:p, 싸인이미지:s) => 넘기지않을경우 Default 일반(f)로 수행)
					var doc 	= cm_makeXmlDocForPopup({
									imageFileNm		: imageFileNm ,
									imageFileGubun	: imageFileGubun
					});
					cm_imageViewerPopup(doc);
 *
 */
com.cm_imageViewerPopup = function(doc) {
	try {
		var popup = document.getElementById("IMAGE_VIEW_POPUP");
		if (popup != null)		return;
		
    	var fileName	= "/imageViewer.do";
    	var popupID	= "IMAGE_VIEW_POPUP";
    	var popupTitle	= "이미지파일 Viewer";
    	var width		= 600; 
    	var height		= 500;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_imageViewerPopup(): " + e.message);
		alert("com.cm_imageViewerPopup(): " + e.message);
	}
}


/**
 * 이미지파일 Viewer 팝업 4컷용
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( imageFileNm, imageFilePath )
 * @호출방법  
					var imageFileNm		= "test.jpg";		//이미지 파일 명 
					var imageFileGubun	= "f";					//이미지 파일 구분 (일반이미지:f, 사진이미지:p, 싸인이미지:s) => 넘기지않을경우 Default 일반(f)로 수행)
					var doc 	= cm_makeXmlDocForPopup({
									imageFileNm		: imageFileNm ,
									imageFileGubun	: imageFileGubun
					});
					cm_imageViewerPopup(doc);
 *
 */
com.cm_imageViewerPopup4Frame = function(doc) {
	try {
		var popup = document.getElementById("IMAGE_VIEW_POPUP2");
		if (popup != null)		return;
		
    	var fileName	= "/imageViewer4Frame.do";
    	var popupID	= "IMAGE_VIEW_POPUP2";
    	var popupTitle	= "이미지파일 Viewer";
    	var width		= 870; 
    	var height		= 890;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_imageViewerPopup(): " + e.message);
		alert("com.cm_imageViewerPopup(): " + e.message);
	}
}


/**
 * 이미지파일 Viewer 팝업 확대용
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( imageFileNm, imageFilePath )
 * @호출방법  
					var imageFileNm		= "test.jpg";		//이미지 파일 명 
					var imageFileGubun	= "f";					//이미지 파일 구분 (일반이미지:f, 사진이미지:p, 싸인이미지:s) => 넘기지않을경우 Default 일반(f)로 수행)
					var doc 	= cm_makeXmlDocForPopup({
									imageFileNm		: imageFileNm ,
									imageFileGubun	: imageFileGubun
					});
					cm_imageViewerPopup(doc);
 *
 */
com.cm_imageViewerPopupEnlarge = function(doc) {
	try {
		var popup = document.getElementById("IMAGE_VIEW_POPUP3");
		if (popup != null)		return;
		
    	var fileName	= "/imageViewerEnlarge.do";
    	var popupID	= "IMAGE_VIEW_POPUP3";
    	var popupTitle	= "이미지파일 Viewer";
    	var width		= 800; 
    	var height		= 900;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_imageViewerPopup(): " + e.message);
		alert("com.cm_imageViewerPopup(): " + e.message);
	}
}


/**
 * 파일 업로드 팝업
 * 
 * @param		doc: 팝업에 전달할 XML 개체 ( CALLBACK )
 * @호출방법  
					var callBack	= "fncPopup_RESULT";				//결과 받을 callback 함수명(String)  
					var doc 	= cm_makeXmlDocForPopup({
									CALLBACK	: callBack
					});
					cm_fileUploadPopup(doc);
 *
 * @결과받는방법  
					function fncPopup_RESULT( result ){				//object형태로 넘겨줌
		        		alert("uploadPath=>"+result.uploadPath);		//업로드 파일 경로
		        		alert("realFileName"+result.realFileName);		//업로드 실제 파일명
		        		alert("fileName"+result.fileName);					//업로드 view 파일명
					}								
 */
com.cm_fileUploadPopup = function(doc) {
	try {
		var popup = document.getElementById("FILE_UPLOAD_POPUP");
		if (popup != null)		return;
		
    	var fileName	= "/fileUpload.do";
    	var popupID	= "FILE_UPLOAD_POPUP";
    	var popupTitle	= "파일 업로드";
    	var width		= 600; 
    	var height		= 150;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_fileUploadPopup(): " + e.message);
		alert("com.cm_fileUploadPopup(): " + e.message);
	}
}


/**
 * 장애접수 장애 코드 조회
 * 
 * @param doc: 팝업에 전달할 XML 개체
 */
com.cm_trblCodePopup = function(doc) {
	try {
		var popup = document.getElementById("TRBL_CODE_POPUP");
		if (popup != null)		return;
		
    	var fileName	= "/op/trouble/troubleReg/trblErrorCdPopup.do";
    	var popupID		= "TRBL_CODE_POPUP";
    	var popupTitle	= "장애코드조회";
    	var width		= 700;
    	var height		= 355;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_passwordChangePopup(): " + e.message);
		alert("com.cm_passwordChangePopup(): " + e.message);
	}
}


/**
 * 장애접수 장애 코드 조회
 * 
 * @param doc: 팝업에 전달할 XML 개체
 */
com.cm_trblUserCdPopup = function(doc) {
	try {
		var popup = document.getElementById("TRBL_USER_POPUP");
		if (popup != null)		return;
		
    	var fileName	= "/op/trouble/troubleReg/trblUserCdPopup.do";
    	var popupID		= "TRBL_USER_POPUP";
    	var popupTitle	= "사용자조회";
    	var width		= 700;
    	var height		= 355;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_passwordChangePopup(): " + e.message);
		alert("com.cm_passwordChangePopup(): " + e.message);
	}
}


/**
 * 장애접수 장애 코드 조회
 * 
 * @param doc: 팝업에 전달할 XML 개체
 */
com.cm_trblOutPopup = function(doc) {
	try {
		var popup = document.getElementById("TRBL_OUT_POPUP");
		if (popup != null)		return;
		
    	var fileName	= "/op/trouble/troubleReg/trblOutPopup.do";
    	var popupID		= "TRBL_OUT_POPUP";
    	var popupTitle	= "장애코드조회";
    	var width		= 700;
    	var height		= 355;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_passwordChangePopup(): " + e.message);
		alert("com.cm_passwordChangePopup(): " + e.message);
	}
}


/**
 * 배포그룹 관리 그룹 추가.
 * 
 * @param doc: 팝업에 전달할 XML 개체
 */
com.cm_DeploYGrpPopup = function(doc) {
	try {
		var popup = document.getElementById("DEPLOY_GRP");
		if (popup != null)		return;
		
    	var fileName	= "/mn/ams/dstb/deployGrpMngPopup.do";
    	var popupID		= "DEPLOY_GRP";
    	var popupTitle	= "배포그룹 추가";
    	var width		= 400;
    	var height		= 200;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_DeploYGrpPopup(): " + e.message);
		alert("com.cm_DeploYGrpPopup(): " + e.message);
	}
}


/**
 * 배포기기 등록.
 * 
 * @param doc: 팝업에 전달할 XML 개체
 */
com.cm_DeployMacRegPopup = function(doc) {
	try {
		var popup = document.getElementById("DEPLOY_MAC");
		if (popup != null)		return;
		
    	var fileName	= "/mn/ams/dstb/deployMacRegPopup.do";
    	var popupID		= "DEPLOY_MAC";
    	var popupTitle	= "배포기기 추가";
    	var width		= 800;
    	var height		= 400;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_DeployMacRegPopup(): " + e.message);
		alert("com.cm_DeployMacRegPopup(): " + e.message);
	}
}


/**
 * 프로그램 등록.
 * 
 * @param doc: 팝업에 전달할 XML 개체
 */
com.cm_ProgramRegPopup = function(doc) {
	try {
		var popup = document.getElementById("PROGRAM_REG");
		if (popup != null)		return;
		
    	var fileName	= "/mn/ams/dstb/programRegPopup.do";
    	var popupID		= "PROGRAM_REG";
    	var popupTitle	= "프로그램 등록";
    	var width		= 450;
    	var height		= 360;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_ProgramRegPopup(): " + e.message);
		alert("com.cm_ProgramRegPopup(): " + e.message);
	}
}


/**
 * 정규버젼 둥록 추가.
 * 
 * @param doc: 팝업에 전달할 XML 개체
 */
com.cm_DeployPrgResendPopup = function(doc) {
	try {
		var popup = document.getElementById("DEPLOYPRG_RESEND");
		if (popup != null)		return;
		
    	var fileName	= "/mn/ams/dstb/deployPrgResendPopup.do";
    	var popupID		= "DEPLOYPRG_RESEND";
    	var popupTitle	= "정규 버전 등록";
    	var width		= 430;
    	var height		= 300;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_DeployPrgResendPopup(): " + e.message);
		alert("com.cm_DeployPrgResendPopup(): " + e.message);
	}
}


/**
 * 기기 번호 조회 AMS .
 * 리턴값 다건.
 * @param doc: 팝업에 전달할 XML 개체
 */
com.cm_MacsSearchAmsPopup = function(doc) {
	try {
		var popup = document.getElementById("ATM_SEARCH");
		if (popup != null)		return;
		
    	var fileName	= "/mn/ams/remt/PopupAmsMacs.do";
    	var popupID		= "ATM_SEARCH";
    	var popupTitle	= "기기번호 조회";
    	var width		= 650;
    	var height		= 500;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_MacsSearchAmsPopup(): " + e.message);
		alert("com.cm_MacsSearchAmsPopup(): " + e.message);
	}
}


/**
 * 기기 번호 조회 AMS 단건.
 * 리턴값 단건.
 * @param doc: 팝업에 전달할 XML 개체
 */
com.cm_MacSearchAmsPopup = function(doc) {
	try {
		var popup = document.getElementById("ATM_SEARCH");
		if (popup != null)		return;
		
    	var fileName	= "/mn/ams/remt/PopupAmsMac.do";
    	var popupID		= "ATM_SEARCH";
    	var popupTitle	= "기기번호 조회";
    	var width		= 650;
    	var height		= 500;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_MacSearchAmsPopup(): " + e.message);
		alert("com.cm_MacSearchAmsPopup(): " + e.message);
	}
}


/**
 * 파일 선택 파일업로드 AMS .
 * 리턴값 단건.
 * 파일 선택 파일업로드
 */
com.cm_FileManegeAmsPopup = function(doc) {
	try {
		var popup = document.getElementById("FILE_MANAGE");
		if (popup != null)		return;
		
    	var fileName	= "/mn/ams/remt/PopupFileUpload.do";
    	var popupID		= "FILE_MANAGE";
    	var popupTitle	= "파일 선택";
    	var width		= 1220;
    	var height		= 630;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_FileManegeAmsPopup(): " + e.message);
		alert("com.cm_FileManegeAmsPopup(): " + e.message);
	}
}


/**
 * 배포 일정 등록 AMS .
 * 리턴값 단건.
 * 배포일정 등록 .
 */
com.cm_GrpManegeAmsPopup = function(doc) {
	try {
		var popup = document.getElementById("GRP_MANAGE");
		if (popup != null)		return;
		
    	var fileName	= "/mn/ams/dstb/deploySchMngPopup.do";
    	var popupID		= "GRP_MANAGE";
    	var popupTitle	= "배포일정등록";
    	var width		= 430;
    	var height		= 220;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_GrpManegeAmsPopup(): " + e.message);
		alert("com.cm_GrpManegeAmsPopup(): " + e.message);
	}
}


/**
 * 배포 일정 등록(자동배포) AMS .
 * 리턴값 단건.
 * 배포일정 등록 .
 */
com.cm_GrpManegeAmsAutoPopup = function(doc) {
	try {
		var popup = document.getElementById("GRP_MANAGE_AUTO");
		if (popup != null)		return;
		
    	var fileName	= "/mn/ams/dstb/deploySchMngAutoPopup.do";
    	var popupID		= "GRP_MANAGE_AUTO";
    	var popupTitle	= "배포일정추가";
    	var width		= 450;
    	var height		= 400;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_GrpManegeAmsPopup(): " + e.message);
		alert("com.cm_GrpManegeAmsPopup(): " + e.message);
	}
}


/**
 * 그리드 모델명 검색 AMS .
 * 리턴값 단건.
 * 그리드 모델명 검색 AMS .
 */
com.cm_ProgramRegModelPopup = function(doc) {
	try {
		var popup = document.getElementById("PRG_MODEL");
		if (popup != null)		return;
		
    	var fileName	= "/mn/ams/dstb/programRegModelCdPopup.do";
    	var popupID		= "PRG_MODEL";
    	var popupTitle	= "모델명 검색";
    	var width		= 350;
    	var height		= 150;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_ProgramRegModelPopup(): " + e.message);
		alert("com.cm_ProgramRegModelPopup(): " + e.message);
	}
}


/**
 * 현송재등록
 * 재현송 등록
 * 재현송 등록 .
 */
com.cm_sendReMovePopup = function(doc) {
	try {
		var popup = document.getElementById("FUND_SENDREMOVE");
		if (popup != null)		return;
		
    	var fileName	= "/op/fund/fundcm/sendmng/sendReMove.do";
    	var popupID		= "FUND_SENDREMOVE";
    	var popupTitle	= "현송재등록";
    	var width		= 1006;
    	var height		= 410;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_sendReMovePopup(): " + e.message);
		alert("com.cm_sendReMovePopup(): " + e.message);
	}
}


/**
 * 현송패널티 세부항목 코드 조회
 * 
 * @param doc: 팝업에 전달할 XML 개체
 */
com.cm_mcodeByGcodeForPopup = function(doc) {
	try {
		var objJson = JSON.parse(WebSquare.json.XML2JSONString(doc));
		
		var data = {};
		
		if(com.cm_isNull(objJson.CODE_TYPE)){
			objJson.CODE_TYPE = "mcodeByGcodeForPopup";
		}
		
		data.CODE_TYPE = objJson.CODE_TYPE;	    //공통코드 sql ID (commonCode-sqlMap.xml 에 등록된 SQL ID) 
		data.TITLE_NM  = "세부코드 정보 조회";	//팝업창 타이틀 명 
		data.TEXT_NM_1 = "세부코드";	        //CODE 의 그리드 해더명
		data.TEXT_NM_2 = "세부명";	     	    //NAME 의 그리드 해더명
		data.CALLBACK  = objJson.CALLBACK;	    //WHERE 조건
		data.PARAMS    = objJson.PARAMS;	    //결과 받을 callback 함수명 
		
		com.cm_commonCodePopup(cm_makeXmlDocForPopup(data));
		
	} catch (e) {
		com.cm_logPrint("com.cm_mcodeByGcodeForPopup(): " + e.message);
		alert("com.cm_mcodeByGcodeForPopup(): " + e.message);
	}
}


com.cm_cwCodeInfoPopup2 = function(doc) {
	try {
		var popup = document.getElementById("CW_CODE_POPUP2");
		if (popup != null)		return;
		
    	var fileName	= "/cwCode2.do";
    	var popupID	= "CW_CODE_POPUP2";
    	var popupTitle	= "권종코드 권종정보 조회";
    	var width		= 400; 
    	var height		= 470;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_cwCodeInfoPopup2(): " + e.message);
		alert("com.cm_cwCodeInfoPopup2(): " + e.message);
	}
}


/**
 * 일괄기기 정규현송 취소처리
 * 
 * @param doc: 팝업에 전달할 XML 개체
 */
com.cm_CancelSendTypePopup = function(doc) {
	try {
		var popup = document.getElementById("CANCELSENDTYPE");
		if (popup != null)		return;
		
    	var fileName	= "/op/fund/fundcm/sendmng/cancelSendTypePopup.do";
    	var popupID		= "CANCELSENDTYPE";
    	var popupTitle	= "일괄기기 정규현송 취소처리";
    	var width		= 260;
    	var height		= 150;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_passwordChangePopup(): " + e.message);
		alert("com.cm_passwordChangePopup(): " + e.message);
	}
}


/**
 * 장애 지사 조회
 * 
 * @param doc: 팝업에 전달할 XML 개체
 */
com.cm_TrblDeptRetv = function(doc) {
	try {
		var popup = document.getElementById("trblDetpRetv");
		if (popup != null)		return;
		
    	var fileName	= "/op/trouble/detpRetv.do";
    	var popupID		= "trblDetpRetv";
    	var popupTitle	= "지사 조회";
    	var width		= 630;
    	var height		= 520;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_passwordChangePopup(): " + e.message);
		alert("com.cm_passwordChangePopup(): " + e.message);
	}
}


/**
 * 스케줄 관리 지사 조회 팝업.
 * 
 * @param doc: 팝업에 전달할 XML 개체
 */
com.cm_AdminSchdOfficeSer = function(doc) {
	try {
		var popup = document.getElementById("SCHDDEPTSER");
		if (popup != null)		return;
		
    	var fileName	= "/mn/schd/adminschd/officeSer.do";
    	var popupID		= "SCHDDEPTSER";
    	var popupTitle	= "지사 조회";
    	var width		= 630;
    	var height		= 520;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_passwordChangePopup(): " + e.message);
		alert("com.cm_passwordChangePopup(): " + e.message);
	}
}


/**
 * 장애 전문 조회 -> 기기별 거래실적
 * 
 * @param doc: 팝업에 전달할 XML 개체
 */
com.cm_SiteErrorSendStatusPopup = function(doc) {
	try {
		var popup = document.getElementById("ERROR_SEND_POPUP");
		if (popup != null)		return;
		
    	var fileName	= "/op/fund/mngaff/envmng/siteErrorSendStatusPop.do";
    	var popupID		= "502571";
    	var popupTitle	= "장애 현송현황";
    	var width		= 1020;
    	var height		= 458;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_passwordChangePopup(): " + e.message);
		alert("com.cm_passwordChangePopup(): " + e.message);
	}
}


/**
 * 장애 전문 조회 -> 기기별 거래실적
 * 
 * @param doc: 팝업에 전달할 XML 개체
 */
com.cm_TrblTradPopup = function(doc) {
	try {
		var popup = document.getElementById("TRBL_TRAD_POPUP");
		if (popup != null)		return;
		
    	var fileName	= "/op/trblTrad/trblTradRetv.do";
    	var popupID		= "TRBL_TRAD_POPUP";
    	var popupTitle	= "기기별거래실적";
    	var width		= 1220;
    	var height		= 630;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, false );
	} catch (e) {
		com.cm_logPrint("com.cm_passwordChangePopup(): " + e.message);
		alert("com.cm_passwordChangePopup(): " + e.message);
	}
}


/**
 * 장애 전문 조회 -> 기기별 거래실적
 * 
 * @param doc: 팝업에 전달할 XML 개체
 */
com.cm_TrblTradDitailPopup = function(doc, popCnt) {
	try {
		var popup = document.getElementById("TRBL_TRAD_DITAIL_POPUP" + popCnt);
		if (popup != null)		return;
		
    	var fileName	= "/op/trblTrad/trblTradDitailRetv.do";
    	var popupID		= "TRBL_TRAD_DITAIL_POPUP" + popCnt;
    	var popupTitle	= "기기별거래실적상세";
    	var width		= 820;
    	var height		= 480;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, false );
	} catch (e) {
		com.cm_logPrint("com.cm_TrblTradDitailPopup(): " + e.message);
		alert("com.cm_TrblTradDitailPopup(): " + e.message);
	}
}


/**
 * 장애 전문 조회 -> 기기별 거래실적
 * 
 * @param doc: 팝업에 전달할 XML 개체
 */
com.cm_TrblRegGo = function(doc) {
	try {
		var popup = document.getElementById("TRBL_REG" + cm_getCurrentDate("YYYYMMDDHHmmSS"));
		if (popup != null)		return;
		
    	var fileName	= "/op/trouble/retrieve.do";
    	var popupID		= "TRBL_REG" +  cm_getCurrentDate("YYYYMMDDHHmmssSS");
    	var popupTitle	= "장애 접수";
    	var width		= 820;
    	var height		= 480;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, false );
	} catch (e) {
		com.cm_logPrint("com.cm_TrblRegGo(): " + e.message);
		alert("com.cm_TrblRegGo(): " + e.message);
	}
}


/**
 * 장애 수정 -> 인증, 경비, 현송 시간 조회
 * 
 * @param doc: 팝업에 전달할 XML 개체
 */
com.cm_TrblMoLockSendGo = function(doc) {
	try {
		var popup = document.getElementById("LOCK_SEND_VIEW");
		if (popup != null)		return;
		
    	var fileName	= "/op/trouble/modify/lockSendView.do";
    	var popupID		= "LOCK_SEND_VIEW";
    	var popupTitle	= "자애 수정 인증 ,경비 ,현송 조회";
    	var width		= 700;
    	var height		= 670;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, false );
	} catch (e) {
		com.cm_logPrint("com.cm_TrblMoLockSendGo(): " + e.message);
		alert("com.cm_TrblMoLockSendGo(): " + e.message);
	}
}


com.cm_screenLeft = function() {
	var winX = window.screenLeft; // 현재창의 x좌표
	if(typeof winX == "undefined") {
		winX = 	window.screenX;
	}	
	return winX;
}


/**
 * 상담원 상태 표시 팝업(process)
 * 
 * @param doc: 팝업에 전달할 XML 개체
 */
com.cm_ctiStatusPopup = function(doc) {
	try {
		var popup = document.getElementById("CTI_STATUS_POPUP");
		if (popup != null)		return;
		
    	var fileName	= "/mn/sys/common/ctiStatus.do";
    	var popupID		= "CTI_STATUS_POPUP";
    	var popupTitle	= "상담원 상태 표시";
    	var width		= 350;
    	var height		= 30;
    	var modal		= false;
    	var scroll		= false;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal, scroll, 0, 0 );
	} catch (e) {
		com.cm_logPrint("com.cm_ctiStatusPopup(): " + e.message);
		alert("com.cm_ctiStatusPopup(): " + e.message);
	}
}


/**
 * 상담원 상태 표시 팝업(process)
 * 
 * @param doc: 팝업에 전달할 XML 개체
 */
com.cm_siteMacNoInfoPopup = function(doc) {
	try {
		var popup = document.getElementById("SITE_MACNO_POPUP");
		if (popup != null)		return;
		
		var fileName	= "/siteMacNoInfo.do";
    	var popupID		= "SITE_MACNO_POPUP";
    	var popupTitle	= "사이트 기번 조회";
    	var width		= 750;
    	var height		= 500;
    	var modal		= false;
    	var scroll		= false;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal, scroll, 0, 0 );
	} catch (e) {
		com.cm_logPrint("com.cm_ctiStatusPopup(): " + e.message);
		alert("com.cm_ctiStatusPopup(): " + e.message);
	}
}


/**
 * 내선번호 변경 팝업
 * 
 * @param doc: 팝업에 전달할 XML 개체
 */
com.cm_inTelNoChangePopup = function(doc) {
	try {
		var popup = document.getElementById("INTELNO_CHANGE_POPUP");
		if (popup != null)		return;
		
    	var fileName	= "/mn/sys/common/inTelNo.do";
    	var popupID		= "INTELNO_CHANGE_POPUP";
    	var popupTitle	= "내선번호 변경";
    	var width		= 450;
    	var height		= 220;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_inTelNoChangePopup(): " + e.message);
		alert("com.cm_inTelNoChangePopup(): " + e.message);
	}
}


/*
 * 핀링크 장애전문조회 - 기기팝업
 */
com.cm_finAtmTrblInfoPopup = function(doc) {
	try {
		var popup = document.getElementById("FIN_SEARCH_TRBL_POPUP");
		if (popup != null)		return;
		
    	var fileName	= "/finAtmSearchTrbl.do";
    	var popupID		= "FIN_SEARCH_TRBL_POPUP";
    	var popupTitle	= "기기 조회";
    	var width		= 600; 
    	var height		= 370;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_atmInfoPopup(): " + e.message);
		alert("com.cm_atmInfoPopup(): " + e.message);
	}
}


/***
 * 핀링크 통합 기기번호 정보조회 팝업
 * @param doc
 */
com.cm_finMacInfoPopup = function(doc) {
	try {
		var popup = document.getElementById("FINMAC_INFO_POPUP");
		if (popup != null)		return;
		
    	var fileName	= "/finMacInfo.do";
    	var popupID	= "FINMAC_INFO_POPUP";
    	var popupTitle	= "핀링크 통합 기기번호 정보조회";
    	var width		= 730; 
    	var height		= 530;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_finMacInfoPopup(): " + e.message);
		alert("com.cm_finMacInfoPopup(): " + e.message);
	}
}


com.cm_carryOrgForPopup = function(doc) {
	try {
		
		var objJson = JSON.parse(WebSquare.json.XML2JSONString(doc));
		
		var data = {};
		
		if(com.cm_isNull(objJson.CODE_TYPE)){
			objJson.CODE_TYPE = "carryOrgForPopup";
		}
		
		data.CODE_TYPE = objJson.CODE_TYPE;	//공통코드 sql ID (commonCode-sqlMap.xml 에 등록된 SQL ID) 
		data.TITLE_NM  = "수납업체조회";	//팝업창 타이틀 명 
		data.TEXT_NM_1 = "수납업체코드";	//CODE 의 그리드 해더명
		data.TEXT_NM_2 = "수납업체명";		//NAME 의 그리드 해더명
		data.CALLBACK  = objJson.CALLBACK;	//WHERE 조건
		data.PARAMS    = objJson.PARAMS;	//결과 받을 callback 함수명 
		
		com.cm_commonCodePopup(cm_makeXmlDocForPopup(data));
		
	} catch (e) {
		com.cm_logPrint("com.cm_carryOrgForPopup(): " + e.message);
		alert("com.cm_carryOrgForPopup(): " + e.message);
	}
}


/**
 * 무거래 기기조회 및 점검 -> 장애/AS 상세내역
 * 
 * @param doc: 팝업에 전달할 XML 개체
 */
com.cm_noDealMacErrorAsPopup = function(doc) {
	try {
		var popup = document.getElementById("ERROR_AS_POPUP");
		if (popup != null)		return;
		
    	var fileName	= "/op/fund/atmcdvan/profit/noDealMacErrorAs.do";
    	var popupID		= "524090";
    	var popupTitle	= "장애/AS 내역";
    	var width		= 1250;
    	var height		= 680;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_nodealMacErrorAsPopup(): " + e.message);
		alert("com.cm_nodealMacErrorAsPopup(): " + e.message);
	}
}


/**
 * 무거래 기기조회 및 점검 -> 무거래기기 상세내역
 * 
 * @param doc: 팝업에 전달할 XML 개체
 */
com.cm_noDealMacDetailPopup = function(doc) {
	try {
		var popup = document.getElementById("NODEAL_DETAIL_POPUP");
		if (popup != null)		return;
		
    	var fileName	= "/op/fund/atmcdvan/profit/noDealMacDetail.do";
    	var popupID		= "524095";
    	var popupTitle	= "무거래기기 상세내역";
    	var width		= 1250;
    	var height		= 680;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_noDealMacDetailPopup(): " + e.message);
		alert("com.cm_noDealMacDetailPopup(): " + e.message);
	}
}


/**
 * 과부족마감표 - 기기별 장애조회(기간) 팝업
 * 
 * @param doc: 팝업에 전달할 XML 개체
 */
com.cm_oversShortsCloseMacErrorPopup = function(doc) {
	try {
		var popup = document.getElementById("OVERS_SHORTS_CLOSE_MAC_ERROR_POPUP");
		if (popup != null)
			return;

		var fileName = "/op/fund/fundcm/clsmng/oversShortsCloseMacErrorPopup.do";
		var popupID = "524096";
		var popupTitle = "기기별 장애조회(기간)";
		var width = 1250;
		var height = 680;
		var modal = true;

		com.cm_popupWindowNormal(fileName, popupID, popupTitle, width, height, doc, modal);
	} catch (e) {
		com.cm_logPrint("com.cm_oversShortsCloseMacErrorPopup(): " + e.message);
		alert("com.cm_oversShortsCloseMacErrorPopup(): " + e.message);
	}
}


/**
 * 예비금고조회 -> 마감 후 예비금고 상세 사용내역
 * 
 * @param doc: 팝업에 전달할 XML 개체
 */
com.cm_fnCloseDetailPop = function(doc) {
	try {
		var popup = document.getElementById("PRESAFE_DETAIL_POPUP");
		if (popup != null)		return;
		
    	var fileName	= "/op/fund/atmcdvan/rsvsafe/preSafeCloseDetail.do";
    	var popupID		= "251010";
    	var popupTitle	= "예비금고 상세 사용내역";
    	var width		= 900;
    	var height		= 600;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_noDealMacDetailPopup(): " + e.message);
		alert("com.cm_noDealMacDetailPopup(): " + e.message);
	}
}


/**
 * 시리얼번호관리 -> 기기번호저장. 기기에 연결된 시리얼번호 같이 보여주기.
 * 
 * @param doc: 팝업에 전달할 XML 개체
 */
com.cm_findMadSerialPopup = function(doc) {
	try {
		var popup = document.getElementById("MAC_SERIAL_POPUP");
		if (popup != null)		return;
		
    	var fileName	= "/findMacSerial.do";
    	var popupID	= "MAC_SERIAL_POPUP";
    	var popupTitle	= "기기 조회(시리얼번호)";
    	var width		= 550; 
    	var height		= 370;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_atmInfoPopup(): " + e.message);
		alert("com.cm_atmInfoPopup(): " + e.message);
	}
}


/**
 * 주차 사이트 업로드 팝업
 */
com.cm_parkSiteCodeInfoPopup = function(doc) {
	try {
		var popup = document.getElementById("PARKSITE_INFO_POPUP");
		if (popup != null)		return;
		
    	var fileName	= "/parkSiteCodeInfo.do";
    	var popupID	= "PARKSITE_INFO_POPUP";
    	var popupTitle	= "주차 사이트코드 정보 조회";
    	var width		= 700; 
    	var height		= 500;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_parkSiteCodeInfoPopup(): " + e.message);
		alert("com.cm_parkSiteCodeInfoPopup(): " + e.message);
	}
}


com.cm_commonPopup = function(doc, title, textNm1, textNm2) {
	try {
		var objJson = JSON.parse(WebSquare.json.XML2JSONString(doc));
		
		var data = {};
		
		data.CODE_TYPE = objJson.CODE_TYPE;	//공통코드 sql ID (commonCode-sqlMap.xml 에 등록된 SQL ID) 
		data.TITLE_NM	= title,			//팝업창 타이틀 명 
		data.TEXT_NM_1	= textNm1,						//CODE 의 그리드 해더명
		data.TEXT_NM_2	= textNm2, 						//NAME 의 그리드 해더명
		data.CALLBACK  = objJson.CALLBACK;	//WHERE 조건
		data.PARAMS    = objJson.PARAMS;	//결과 받을 callback 함수명 
		data.TEXT_TRANSFORM = objJson.TEXT_TRANSFORM;
		
		com.cm_commonCodePopup(cm_makeXmlDocForPopup(data));
		
	} catch (e) {
		com.cm_logPrint("com.cm_macNoInfoPopup(): " + e.message);
		alert("com.cm_macNoInfoPopup(): " + e.message);
	}
}


/**
 * 내선번호 변경 팝업
 * 
 * @param doc: 팝업에 전달할 XML 개체
 */
com.cm_loginReqPopup = function(doc) {
	try {
		var popup = document.getElementById("LOGIN_REQ_POPUP");
		if (popup != null)		return;
    	var fileName	= "/mn/sys/common/loginReq.do";
    	var popupID		= "LOGIN_REQ_POPUP";
    	var popupTitle	= "NIBS 로그인 권한 요청";
    	var width		= 500;
    	var height		= 250;
    	var modal		= true;

    	com.cm_popupWindowNormal( fileName, popupID, popupTitle, width, height, doc, modal );
	} catch (e) {
		com.cm_logPrint("com.cm_loginReqPopup(): " + e.message);
		alert("com.cm_loginReqPopup(): " + e.message);
	}
}


