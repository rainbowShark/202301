requires("uiplugin.popup");

var SYSTEM_TYPE = "op";

var gcm = {
		
	// 세션 변수 선언
	SS_userId : "",			    // 사번
	SS_userName : "",		// 원격실행자명
	SS_userType : "",			// 사원타입 
	SS_ctRight : "'",			// 관제권한
	SS_fnRight : "",			// 자금권한
	SS_deptCode : "",			//사업부코드
	SS_officeCode : "",		//지사코드
	SS_teamCode : "",		// 지소코드
	SS_sysType : "",			// 시스템구분 우선순위
	SS_roleId : "",				// 권한ID
	SS_deptType : "",			// 사업부구분
	SS_startTime : "",			// startTime
	SS_stTime : "",				// stTime
	SS_fsTime : "",				// fsTime
	SS_svrType : "",			// Server Type
	SS_connectDate : "",		// 마지막 접속일시
	
	// AMS PATH
	AMS_path : "",
	
	// 상수 선언 JS 
	DML_NULL : 0,				// 서비스 처리 코드 처리무
	DML_SELECT : 1,				// 서비스 처리 코드 조회
	DML_INSERT : 2,				// 서비스 처리 코드 등록
	DML_UPDATE : 3,			// 서비스 처리 코드 수정
	DML_DELETE : 4,				// 서비스 처리 코드 삭제
	DML_FIX : 5,					// 서비스 처리 코드 픽스
	
	// URL PATH
	// 자금 자금공통
	FUNDCM_SENDINFOMNG : "/op/fund/fundcm/sendinfomng",			// 자금 공통 현송정보관리
	FUNDCM_CLSMNG : "/op/fund/fundcm/clsmng",								// 자금 공통 마감관리
	FUNDCM_LDGRMNG : "/op/fund/fundcm/ldgrmng",							// 자금 공통 장부관리
	FUNDCM_SENDMNG : "/op/fund/fundcm/sendmng",						// 자금 공통 현송관리
	FUNDCM_ETCPRECMNG : "/op/fund/fundcm/etcprecmng",				// 자금 공통 기타현황관리
	FUNDCM_SGLMATTMNG : "/op/fund/fundcm/sglmattmng",				// 자금 공통 특이사항관리
	
	// 자금 VAN기초
	VANBAS_VANSEND : "/op/fund/vanbas/vansend",	 // VAN현송관리
	
	// 자금 관리업무
	// 기기자산
	MNGAFF_MACAST : "/op/fund/mngaff/macast",
	// 운영현황
	MNGAFF_OPRNPREC : "/op/fund/mngaff/oprnprec",
	/** 지사실적*/
	MNGAFF_BRAOCHVMSHAR : "/op/fund/mngaff/braochvmshar",
	/** 엑셀업로드*/
	MNGAFF_EXCLUPLD : "/op/fund/mngaff/exclupld",
	/** 관리업무 사이트정보 */
	MNGAFF_SITEINFO : "/op/fund/mngaff/siteinfo",
	/** 관리업무 환경관리 */
	MNGAFF_ENVMNG : "/op/fund/mngaff/envmng",
	/** 경영관리 시스템 */
	MNGAFF_BUSINESSADMST : "/op/fund/mngaff/businessadmst",
	/** 관리업무 무인경비 */
	MNGAFF_UNMANNEDPARK : "/op/fund/mngaff/unmannedpark",
	/** 관리업무 부스운영 */
	MNGAFF_BOOTHMNG : "/op/fund/mngaff/boothmng",
	/** 관리업무 회선관리 */
	MNGAFF_CIRCUIT : "/op/fund/mngaff/circuit",
	/** 관리업무 감사회시관리 */
	MNGAFF_AUDAFF : "/op/fund/mngaff/audaff",
	MNGAFF_AUDAFF2 : "/op/fund/mngaff/audaff2",
	/** 관리업무 복권자산관리 */
	MNGAFF_STOCKMNG : "/op/fund/mngaff/stockmng",
	/** 관리업무 DT */
	MNGAFF_DT : "/op/fund/mngaff/dt",

	/** 자금 자금본사 **/
	/** 자금수령*/
	FUNDHDFC_FUNDACPT : "/op/fund/fundhdfc/fundacpt",
	/** 자금본사 본사마감 */
	FUNDHDFC_HDFCCLS : "/op/fund/fundhdfc/hdfccls",
	/** 자금본사 청구관리 */
	FUNDHDFC_CLMMNG : "/op/fund/fundhdfc/clmmng",
	/** 자금본사 자금관리자 */
	FUNDHDFC_FUNDMNGR : "/op/fund/fundhdfc/fundmngr",
	/** 자금본사 종량제 */
	FUNDHDFC_MERT : "/op/fund/fundhdfc/mert",
	
	/** 관리 **/
	/** 시스템 공통 */
	SYS_COMMON : "/mn/sys/common",
	/** 시스템 프로그램관리 */
	SYS_PGMMNG : "/mn/sys/pgmmng",
	/** 모니터링 */
	SYSMO_MONITOR : "/mn/sysmonitor/monitoring",
	/** 사용 모니터링 */
	SYSMO_USERMONITOR : "/mn/sysmonitor/userMonitoring",
	/** 운영효율화 */
	SYS_MNGEFF : "/mn/mngeff",
	
	/** 시스템 사용자권한관리 */
	SYS_USERAUTRMNG : "/mn/sys/userautrmng",
	/** 기초정보 조직관리 */
	BASEINFO_ORNZMNG : "/mn/baseinfo/ornzmng",
	/** 기초정보 권한관리 */
	BASEINFO_AUTRMNG : "/mn/baseinfo/autrmng",
	/** 기초정보 시스템관리 */
	BASEINFO_SYSMNG : "/mn/baseinfo/sysmng",
	/** 기초정보 기타관리 */
	BASEINFO_ETCMNG : "/mn/baseinfo/etcmng",
	/** 기초정보 외주관리 */
	BASEINFO_OSTCMNG : "/mn/baseinfo/otscmng",
	/** 기초정보 코드관리 */
	BASEINFO_CDMNG : "/mn/baseinfo/cdmng",
	/** 기초정보 ERP가져오기 */
	BASEINFO_ERPMNG : "/mn/baseinfo/erpmng",
	
	/** 현금물류 **/
	/** 현금물류*/
	CSHLGS_CSHLGSMNG	: "/op/fund/cshlgs/cshlgsmng",
	/** 교환시재  */
	CSHLGS_EXGPRST : "/op/fund/cshlgs/exgprst",
	/** 수납공급관리  */
	CSHLGS_RCPTSPTMNG : "/op/fund/cshlgs/rcptsptmng",
	/** 수납관리  */
	CSHLGS_RCPTMNG : "/op/fund/cshlgs/rcptmng",
	/** 차량내계수  */
	CSHLGS_VHCLINSDCALC : "/op/fund/cshlgs/vhclinsdcalc",
	/** 정산기업로드  */
	CSHLGS_CALMACUPLD : "/op/fund/cshlgs/calmacupld",
	/** 일반물류  */
	CSHLGS_GENLGS : "/op/fund/cshlgs/genlgs",
	
	/** 자금 ATMCDVAN **/
	/** ATMCDVAN 예비금고 */
	ATMCDVAN_RSVSAFE : "/op/fund/atmcdvan/rsvsafe",
	/** ATMCDVAN 점주브랜드 */
	ATMCDVAN_STRWNRBRND : "/op/fund/atmcdvan/strwnrbrnd",
	/** ATMCDVAN 수익변동분석 */
	ATMCDVAN_PROFIT : "/op/fund/atmcdvan/profit",
	/** ATMCDVAN 무거래 기기관리 */
	ATMCDVAN_NODEALMAC : "/op/fund/atmcdvan/nodealmac",
	
	/** 정보 **/
	/** 자금통계 임차료 */
	FUNDST_LSAMT : "/in/fundst/lsamt",
	/** 자금통계 수수료 */
	FUNDST_CMSN : "/in/fundst/cmsn",
	/** 자금통계 */
	FUNDST_ETCST : "/in/fundst/etcst",
	/** 장애통계 지표통계 */
	TRBLST_IDXST : "/in/trblst/idxst",
	/** 장애통계 업무통계 */
	TRBLST_AFFST : "/in/trblst/affst",
	/** 장애통계 업무통계 */
	STRPT_STRPT : "/in/strpt/strpt",
	/** 금융모니터링 기기 */
	CTMNT_MAC : "/in/ctmonitor/macmnt",
	/** 금융모니터링 민원 */
	CTMNT_COMMNG : "/in/ctmonitor/commng",
	/** 금융모니터링 관리 */
	CTMNT_STICKERMNG : "/in/ctmonitor/stickermng",
	/** 금융모니터링 정산 */
	CTMNT_CALCMNG : "/in/ctmonitor/calcmng",
	/** 금융모니터링 사이트 */
	CTMNT_SITEMNT : "/in/ctmonitor/sitemnt",
	/** 금융모니터링 모니터링 */
	CTMNT_REALMNT : "/in/ctmonitor/realmnt",
	/** 금융모니터링 스케쥴링 */
	CTMNT_SCHMNG : "/in/ctmonitor/schmng",
	
	/** CMS **/
	/** CMS 조직관리 */
	CMS_GRPMNG : "/op/cms/grpmng",
	/** CMS 정보관리 */
	CMS_INFOMNG : "/op/cms/infomng",
	/** CMS 운송관리 */
	CMS_TRNMNG : "/op/cms/trnmng",
	/** CMS 재고관리 */
	CMS_STOCKMNG : "/op/cms/stockmng",
	/** CMS 마감관리 */
	CMS_CLOSEMNG : "/op/cms/closemng",
	/** CMS 업무관리 */
	CMS_WORKMNG : "/op/cms/workmng",
	
	/** AMS **/
	/** VAN-Host 저널비교  */
	AMS_JNLANDHOST : "/mn/ams/jnl",
	
	/**
	 * upload 시 subDir 설정 값
	 * 
	 * @Description	업로드 시 에 subDir 설정값 셋팅 해야함....[필수]
	 * @example 	
	 * 						upload1.setSubDir(FILE_SUBDIR);		//파일일 경우
	 * 						//upload1.setSubDir(PHOTO_SUBDIR);	//사진일 경우
	 * 						//upload1.setSubDir(SIGN_SUBDIR);		//싸인일 경우
	 * 						upload1.submit
	 * 
	 */

	FILE_SUBDIR : SYSTEM_TYPE + "_file",				//File    Websquare.xml의 설정 정보
	PHOTO_SUBDIR : SYSTEM_TYPE + "_photo",		//Photo Websquare.xml의 설정 정보
	SIGN_SUBDIR : SYSTEM_TYPE + "_sign",				//Sign   Websquare.xml의 설정 정보
	LEASE_SUBDIR :  SYSTEM_TYPE + "_leaseInfo",	//LeaseInfo   Websquare.xml의 설정 정보
	NOTICE_SUBDIR : SYSTEM_TYPE + "_notice",		//현장공지사항 첨부파일 Websquare.xml의 설정 정보
	AU_SUBDIR : SYSTEM_TYPE + "_aufile",
	
	/** 비밀번호금지어 */
	FORBIDDEN_LANG : [
	      "password","nice","tcm","nebs","nibs","cms","love","123","abc","qwe"
	     ,"!@#"
	]
		
};

gcm.init = {};

/**
 * 화면 초기 구동 시 필수 데이터를 로딩한다.
 */
gcm.init.loadData = function() {
	var requestData = {};
	var serviceId = "init";
	var systemPath = "";
	var alertYn = "Y";

	//
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
				
				com.cm_setDecodedValue(data.data.encData);
				cm_setDaumMapKey(data.data.daumMapKey);
				com.cm_setAmsPath(data.data.amsPath);
			}
		});
		
	} catch (e) {
	    com.cm_logPrint("com.cm_submitAjax(): " + e.message);
	    alert("com.cm_submitAjax(): " + e.message);
	}
};