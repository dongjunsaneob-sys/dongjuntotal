/**
 * ==============================================================================
 * [원스톱 견적서 구글 스프레드시트 자동 저장 & 카테고리 분리 저장 스크립트]
 * 
 * Target Google Spreadsheet URL:
 * https://docs.google.com/spreadsheets/d/10JE5X_vOkixaxp0b5yaqz7atXy3xhf_zdo77ncHabSU/edit
 * ==============================================================================
 * 
 * [배포(Deploy) 1분 가이드]
 * 1. 위의 구글 스프레드시트 접속 -> 상단 메뉴 [확장 프로그램] -> [Apps Script] 클릭
 * 2. 기존 코드를 모두 지우고 이 파일의 전체 코드를 복사해서 붙여넣기 합니다.
 * 3. 우측 상단 [배포] 버튼 -> [새 배포] 클릭
 * 4. 유형 선택: [웹 앱 (Web App)] 선택
 *    - 설명: 원스톱 견적서 연동 API
 *    - 다음 사용자 권한으로 실행: [나 (Me)]
 *    - 액세스 권한 있는 사용자: [모든 사용자 (Anyone)] <- 필수!
 * 5. [배포] 버튼을 누르고 생성된 [웹 앱 URL]을 복사하여 관리자 에디터(admin.html)의 구글 시트 연동 탭에 입력하세요.
 * ==============================================================================
 */

function doPost(e) {
  try {
    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else {
      data = e.parameter;
    }

    var ss = SpreadsheetApp.openById('10JE5X_vOkixaxp0b5yaqz7atXy3xhf_zdo77ncHabSU');
    
    // 1. 공통 헤더 정의
    var headers = ['접수일시', '서비스 구분', '고객명/상호', '연락처', '공간 유형', '예상 평수', '상세 문의내용', '처리 상태'];
    
    // 2. 입력 데이터 정제
    var now = new Date();
    var timestamp = Utilities.formatDate(now, 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss');
    var serviceType = data.serviceType || data.service || '통합'; // '철거', '인테리어', '통합'
    var name = data.name || data.username || '미입력';
    var phone = data.phone || data.tel || '미입력';
    var spaceType = data.spaceType || data.space || '기타';
    var area = data.area || data.sq || '미입력';
    var message = data.message || data.note || '내용 없음';
    var status = '접수완료';

    var rowData = [timestamp, serviceType, name, phone, spaceType, area, message, status];

    // 3. '전체 견적 접수' 시트 저장
    var mainSheetName = '전체 견적 접수';
    var mainSheet = getOrCreateSheet(ss, mainSheetName, headers);
    mainSheet.appendRow(rowData);

    // 4. 카테고리별(철거 / 인테리어 / 통합) 개별 시트 자동 분리 저장
    var categorySheetName = serviceType;
    if (categorySheetName.indexOf('철거') !== -1) categorySheetName = '철거 견적';
    else if (categorySheetName.indexOf('인테리어') !== -1) categorySheetName = '인테리어 견적';
    else categorySheetName = '통합 견적';

    var catSheet = getOrCreateSheet(ss, categorySheetName, headers);
    catSheet.appendRow(rowData);

    // 5. 구글 이메일(Gmail)로 실시간 신청 알림 전송
    try {
      var recipientEmail = Session.getActiveUser().getEmail();
      if (recipientEmail) {
        var subject = '[원스톱 견적 접수] ' + name + ' 고객님의 신규 문의가 도착했습니다.';
        var bodyText = '🚀 원스톱 웹사이트에서 새로운 견적 문의가 접수되었습니다!\n\n' +
                       '• 접수일시: ' + timestamp + '\n' +
                       '• 서비스 구분: ' + serviceType + '\n' +
                       '• 고객명/상호: ' + name + '\n' +
                       '• 연락처: ' + phone + '\n' +
                       '• 공간 유형: ' + spaceType + '\n' +
                       '• 예상 평수: ' + area + '\n' +
                       '• 문의 내용: ' + message + '\n\n' +
                       '📊 구글 시트에서 전체 접수 목록 확인하기:\n' + ss.getUrl();
        MailApp.sendEmail(recipientEmail, subject, bodyText);
      }
    } catch (mailErr) {}

    return ContentService.createTextOutput(JSON.stringify({
      result: 'success',
      message: '견적서가 구글 스프레드시트에 성공적으로 저장되었습니다.',
      category: categorySheetName,
      data: rowData
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'online',
    message: '원스톱 견적서 구글 연동 API가 정상 작동 중입니다.'
  })).setMimeType(ContentService.MimeType.JSON);
}

// 시트가 없으면 자동으로 생성하고 헤더 스타일을 지정하는 헬퍼 함수
function getOrCreateSheet(ss, sheetName, headers) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(headers);
    
    // 헤더 스타일 서식 적용 (다크 럭셔리 스타일)
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#1E293B');
    headerRange.setFontColor('#FFFFFF');
    headerRange.setFontWeight('bold');
    headerRange.setHorizontalAlignment('center');
    sheet.setFrozenRows(1);
  }
  return sheet;
}
