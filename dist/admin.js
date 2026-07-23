/**
 * 원스톱 Live Web Builder & Admin Engine (admin.js)
 * Instant Photo, Comment & Full Site Management Engine v3.0
 */

(function () {
  // High-Quality Sample Interior & Demolition Images
  const SAMPLE_IMAGES = {
    hero: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    before: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
    after: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    portfolio: [
      { img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80', comment: '우드 톤 특유의 따뜻함을 살린 감성 브런치 공간. 철거 후 목공 마감 14일 소요.' },
      { img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80', comment: '화이트 앤 베이지 톤의 모던 아파트 리모델링. 거실 확장 및 조명 설계 완성.' },
      { img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80', comment: '오픈형 스타트업 스마트 오피스. 가벽 철거 후 유리 파티션 설치.' },
      { img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80', comment: '경쾌한 경관의 프리미엄 헤어 살롱. 경대 수전 전력 증설 작업 포함.' },
      { img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80', comment: '신혼부부를 위한 아늑한 주거 공간. 맞춤 수납장 제작.' },
      { img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80', comment: '무드 조명이 돋보이는 프라이빗 다이닝 바. 바 테이블 직영 제작.' },
      { img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80', comment: '청결하고 깔끔한 메디컬 센터. 방음 공사 완벽 완료.' },
      { img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80', comment: '베이커리 매장 원상복구 철거 후 감성 베이커리로 재탄생.' }
    ]
  };

  // INITIAL STATE (사이트 전체 설정 100% 제어)
  const DEFAULT_STATE = {
    currentPage: 'index.html',
    viewport: 'desktop',
    tweaks: {
      brandName: '원스톱 철거 인테리어',
      phone: '1533-6968',
      accent: '#F59E0B',
      interiorAccent: '#059669',
      dark: false,
      googleSheetUrl: 'https://docs.google.com/spreadsheets/d/10JE5X_vOkixaxp0b5yaqz7atXy3xhf_zdo77ncHabSU/edit?gid=0#gid=0',
      googleScriptUrl: 'https://script.google.com/macros/s/AKfycbzddLHE6DZn2ANwS6ajHrGGZ-kmfUSYLR9ZQLDkFNqw_7qwBr559_U0tJEDBmp3HpKLuQ/exec',
      gateDemoUrl: 'https://http2026.cafe24.com/',
      gateInteriorUrl: 'interior.html',
      gateDemoLabel: '철거',
      gateDemoDesc: '상가 원상복구, 사무실 인테리어 철거, 부분 철거까지 — 최저가 철거 견적을 받아보세요.',
      gateInteriorLabel: '인테리어',
      gateInteriorDesc: '상가 · 사무실 · 주거 — 설계부터 시공까지. 포트폴리오와 견적을 확인하세요.',
      heroVariant: 'A',
      heroHeadline: '철거부터 인테리어 완공까지,\n단 1개 팀으로 100% 원스톱 해결',
      heroSub: '복잡한 견적, 여러 업체 컨택은 이제 그만. 상담 한 번으로 철거·설계·시공·AS까지 한 팀이 책임집니다.',
      costTitle: '숨은 비용 없는 투명 견적.',
      costLead: '공간 유형과 평수에 따라 예상 비용대가 다릅니다. 아래는 참고용 시작가이며, 정확한 견적은 무료 현장 실측 후 안내드립니다.',
      costPrices: [
        '평당 80만원부터',
        '평당 60만원부터',
        '평당 120만원부터',
        '평당 15만원부터'
      ],
      contactTitle: '지금 무료 현장 방문 실측을 신청하세요',
      contactSub: '신청 후 30분 이내 전문 담당 매니저가 직접 연락드립니다.',
      footerCompany: '(주)원스톱인테리어',
      footerInfo: '사업자등록번호: 120-88-00000 | 대표: 홍길동 | 서울특별시 강남구 테헤란로 123'
    },
    images: {
      heroVisual: '',
      heroBefore: '',
      heroAfter: ''
    },
    portfolio: [
      { img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80', comment: '상가 원상복구 철거 후 미니멀 감성 카페 완공.' },
      { img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80', comment: '오픈형 스타트업 스마트 오피스. 가벽 철거 후 유리 파티션 설치.' },
      { img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80', comment: '경쾌한 경관의 프리미엄 헤어 살롱. 경대 수전 전력 증설 작업 포함.' },
      { img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80', comment: '신혼부부를 위한 아늑한 주거 공간. 맞춤 수납장 제작.' },
      { img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80', comment: '무드 조명이 돋보이는 프라이빗 다이닝 바. 바 테이블 직영 제작.' },
      { img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80', comment: '청결하고 깔끔한 메디컬 센터. 방음 공사 완벽 완료.' },
      { img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80', comment: '베이커리 매장 원상복구 철거 후 감성 베이커리로 재탄생.' }
    ],
    marqueePhotos: [
      { img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80', title: '상가 철거 후 미니멀 카페', badge: 'DEMO & INT' },
      { img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', title: '오픈형 스마트 오피스', badge: 'OFFICE' },
      { img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80', title: '프리미엄 헤어 살롱', badge: 'STORE' },
      { img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80', title: '아늑한 아파트 리모델링', badge: 'RESIDENCE' },
      { img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80', title: '프라이빗 다이닝 바', badge: 'BAR' },
      { img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80', title: '메디컬 방음 인테리어', badge: 'MEDICAL' },
      { img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80', title: '하이엔드 펜트하우스', badge: 'LUXURY' },
      { img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80', title: '감성 베이커리 매장', badge: 'BAKERY' },
      { img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', title: '빈티지 로프트 스튜디오', badge: 'LOFT' },
      { img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80', title: '감성 상가 카페', badge: 'CAFE' },
      { img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80', title: '내추럴 우드 주택', badge: 'WOOD' },
      { img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', title: '무몰딩 라인조명 주거', badge: 'MINIMAL' }
    ]
  };

  let state = loadFromLocalStorage() || JSON.parse(JSON.stringify(DEFAULT_STATE));

  // DOM Elements
  const iframe = document.getElementById('preview-iframe');
  const previewContainer = document.querySelector('.preview-container');
  const previewUrlText = document.getElementById('preview-url-text');
  const previewDimensionText = document.getElementById('preview-dimension-text');

  // ==================== INITIALIZATION ====================
  function init() {
    bindTabs();
    bindControls();
    bindImageUploads();
    bindGlobalPreviewDropzone();
    bindGoogleSheetTests();
    renderPortfolioManager();
    renderMarqueeManager();
    syncUIFromState();

    if (window.location.protocol === 'file:') {
      setTimeout(() => {
        showNotification('💡 탐색기 파일(file://)로 열렸습니다. <b>프로그램 실행하기.bat</b>를 더블클릭하면 1초만에 서버가 시작되어 자동 열립니다!', 'info');
      }, 1000);
    }

    window.addEventListener('message', (e) => {
      if (e.data && (e.data.type === '__edit_mode_available' || e.data.type === '__ready')) {
        sendStateToIframe();
      }
    });

    iframe.addEventListener('load', () => {
      sendStateToIframe();
    });
  }

  // ==================== UI STATE SYNC ====================
  function syncUIFromState() {
    // Brand & Theme
    document.getElementById('inp-brand-name').value = state.tweaks.brandName || '';
    document.getElementById('inp-phone').value = state.tweaks.phone || '';
    document.getElementById('inp-accent-color').value = state.tweaks.accent || '#F59E0B';
    document.getElementById('inp-accent-hex').value = state.tweaks.accent || '#F59E0B';
    
    const intAcc = state.tweaks.interiorAccent || '#059669';
    const intColEl = document.getElementById('inp-interior-accent-color');
    const intHexEl = document.getElementById('inp-interior-accent-hex');
    if (intColEl) intColEl.value = intAcc;
    if (intHexEl) intHexEl.value = intAcc;

    document.getElementById('chk-dark-mode').checked = !!state.tweaks.dark;

    // Google Sheet URL
    const gScriptInp = document.getElementById('inp-google-script-url');
    if (gScriptInp) gScriptInp.value = state.tweaks.googleScriptUrl || '';

    // Gate
    document.getElementById('inp-gate-demo-label').value = state.tweaks.gateDemoLabel || '';
    document.getElementById('inp-gate-demo-desc').value = state.tweaks.gateDemoDesc || '';
    document.getElementById('inp-gate-demo-url').value = state.tweaks.gateDemoUrl || '';
    document.getElementById('inp-gate-interior-label').value = state.tweaks.gateInteriorLabel || '';
    document.getElementById('inp-gate-interior-desc').value = state.tweaks.gateInteriorDesc || '';
    document.getElementById('inp-gate-interior-url').value = state.tweaks.gateInteriorUrl || '';

    // Hero
    const variantRadio = document.querySelector(`input[name="heroVariant"][value="${state.tweaks.heroVariant}"]`);
    if (variantRadio) variantRadio.checked = true;
    document.getElementById('inp-hero-headline').value = state.tweaks.heroHeadline || '';
    document.getElementById('inp-hero-sub').value = state.tweaks.heroSub || '';

    // Images Preview
    updateImagePreviewDisplay('prev-hero-img', 'btn-del-hero-img', state.images.heroVisual);
    updateImagePreviewDisplay('prev-before-img', 'btn-del-before-img', state.images.heroBefore);
    updateImagePreviewDisplay('prev-after-img', 'btn-del-after-img', state.images.heroAfter);

    // Estimates & Services
    document.getElementById('inp-cost-title').value = state.tweaks.costTitle || '';
    document.getElementById('inp-cost-lead').value = state.tweaks.costLead || '';
    document.querySelectorAll('.inp-cost-price').forEach((inp, idx) => {
      inp.value = state.tweaks.costPrices[idx] || '';
    });

    // Contact & Footer
    document.getElementById('inp-contact-title').value = state.tweaks.contactTitle || '';
    document.getElementById('inp-contact-sub').value = state.tweaks.contactSub || '';
    document.getElementById('inp-footer-company').value = state.tweaks.footerCompany || '';
    document.getElementById('inp-footer-info').value = state.tweaks.footerInfo || '';

    // Device & Viewport
    setViewport(state.viewport || 'desktop');
    setPage(state.currentPage || 'index.html');
  }

  function readStateFromUI() {
    state.tweaks.brandName = document.getElementById('inp-brand-name').value;
    state.tweaks.phone = document.getElementById('inp-phone').value;
    state.tweaks.accent = document.getElementById('inp-accent-color').value;

    const intHexEl = document.getElementById('inp-interior-accent-hex');
    if (intHexEl) state.tweaks.interiorAccent = intHexEl.value;

    state.tweaks.dark = document.getElementById('chk-dark-mode').checked;

    const gScriptInp = document.getElementById('inp-google-script-url');
    if (gScriptInp) state.tweaks.googleScriptUrl = gScriptInp.value;

    state.tweaks.gateDemoLabel = document.getElementById('inp-gate-demo-label').value;
    state.tweaks.gateDemoDesc = document.getElementById('inp-gate-demo-desc').value;
    state.tweaks.gateDemoUrl = document.getElementById('inp-gate-demo-url').value;
    state.tweaks.gateInteriorLabel = document.getElementById('inp-gate-interior-label').value;
    state.tweaks.gateInteriorDesc = document.getElementById('inp-gate-interior-desc').value;
    state.tweaks.gateInteriorUrl = document.getElementById('inp-gate-interior-url').value;

    const checkedVariant = document.querySelector('input[name="heroVariant"]:checked');
    if (checkedVariant) state.tweaks.heroVariant = checkedVariant.value;
    state.tweaks.heroHeadline = document.getElementById('inp-hero-headline').value;
    state.tweaks.heroSub = document.getElementById('inp-hero-sub').value;

    state.tweaks.costTitle = document.getElementById('inp-cost-title').value;
    state.tweaks.costLead = document.getElementById('inp-cost-lead').value;
    const prices = [];
    document.querySelectorAll('.inp-cost-price').forEach(inp => prices.push(inp.value));
    state.tweaks.costPrices = prices;

    state.tweaks.contactTitle = document.getElementById('inp-contact-title').value;
    state.tweaks.contactSub = document.getElementById('inp-contact-sub').value;
    state.tweaks.footerCompany = document.getElementById('inp-footer-company').value;
    state.tweaks.footerInfo = document.getElementById('inp-footer-info').value;

    sendStateToIframe();
  }

  function sendStateToIframe() {
    if (!iframe.contentWindow) return;
    try {
      const activeTweaks = Object.assign({}, state.tweaks);
      if (state.currentPage === 'interior.html' && state.tweaks.interiorAccent) {
        activeTweaks.accent = state.tweaks.interiorAccent;
      }
      iframe.contentWindow.postMessage({
        type: '__update_full_data',
        tweaks: activeTweaks,
        images: state.images,
        portfolio: state.portfolio,
        marqueePhotos: state.marqueePhotos
      }, '*');
    } catch (e) {
      console.warn('iframe postMessage warning:', e);
    }
  }

  // ==================== TABS & NAVIGATION ====================
  function bindTabs() {
    document.querySelectorAll('.tab-item').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const paneId = tab.dataset.tab;
        const targetPane = document.getElementById(paneId);
        if (targetPane) targetPane.classList.add('active');
      });
    });

    document.querySelectorAll('.page-switcher .control-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.page-switcher .control-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        setPage(btn.dataset.page);
      });
    });

    document.querySelectorAll('.device-switcher .control-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.device-switcher .control-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        setViewport(btn.dataset.device);
      });
    });
  }

  function setPage(pageName) {
    state.currentPage = pageName;
    iframe.src = pageName;
    previewUrlText.textContent = `http://localhost/${pageName}`;
  }

  function setViewport(device) {
    state.viewport = device;
    previewContainer.setAttribute('data-viewport', device);
    const labels = { desktop: '100% (Full Responsive)', tablet: '768px (Tablet)', mobile: '375px (Mobile)' };
    previewDimensionText.textContent = labels[device] || device;
  }

  // ==================== EVENT BINDING ====================
  function bindControls() {
    const liveInputs = [
      'inp-brand-name', 'inp-phone', 'inp-accent-color', 'inp-accent-hex',
      'chk-dark-mode', 'inp-google-script-url', 'inp-gate-demo-label', 'inp-gate-demo-desc', 'inp-gate-demo-url',
      'inp-gate-interior-label', 'inp-gate-interior-desc', 'inp-gate-interior-url',
      'inp-hero-headline', 'inp-hero-sub', 'inp-cost-title', 'inp-cost-lead',
      'inp-contact-title', 'inp-contact-sub', 'inp-footer-company', 'inp-footer-info'
    ];

    liveInputs.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', () => {
        if (id === 'inp-accent-color') document.getElementById('inp-accent-hex').value = el.value;
        if (id === 'inp-accent-hex') document.getElementById('inp-accent-color').value = el.value;
        readStateFromUI();
      });
      el.addEventListener('change', readStateFromUI);
      el.addEventListener('focus', () => {
        const fieldMap = {
          'inp-brand-name': 'brandName',
          'inp-phone': 'phone',
          'inp-hero-headline': 'heroHeadline',
          'inp-hero-sub': 'heroSub',
          'inp-cost-title': 'costTitle',
          'inp-gate-interior-url': 'gateInteriorUrl'
        };
        const field = fieldMap[id];
        if (field && iframe.contentWindow) {
          iframe.contentWindow.postMessage({ type: '__highlight_element', field }, '*');
        }
      });
    });

    document.querySelectorAll('input[name="heroVariant"]').forEach(r => {
      r.addEventListener('change', readStateFromUI);
    });

    document.querySelectorAll('.inp-cost-price').forEach(inp => {
      inp.addEventListener('input', readStateFromUI);
    });

    document.querySelectorAll('.preset-btn:not(.interior-preset-btn)').forEach(btn => {
      btn.addEventListener('click', () => {
        const c = btn.dataset.color;
        document.getElementById('inp-accent-color').value = c;
        document.getElementById('inp-accent-hex').value = c;
        readStateFromUI();
        showNotification(`🎨 메인 브랜딩 색상이 <b>${c}</b>(으)로 일괄 변경되었습니다!`, 'success');
      });
    });

    const intColEl = document.getElementById('inp-interior-accent-color');
    const intHexEl = document.getElementById('inp-interior-accent-hex');
    if (intColEl && intHexEl) {
      intColEl.addEventListener('input', () => { intHexEl.value = intColEl.value; readStateFromUI(); });
      intHexEl.addEventListener('input', () => { intColEl.value = intHexEl.value; readStateFromUI(); });
    }

    document.querySelectorAll('.interior-preset-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const c = btn.dataset.color;
        if (intColEl) intColEl.value = c;
        if (intHexEl) intHexEl.value = c;
        readStateFromUI();
        showNotification(`✨ 인테리어 전용 포인트 색상이 <b>${c}</b>(으)로 변경되었습니다!`, 'success');
      });
    });

    document.getElementById('btn-preset-samples').addEventListener('click', fillSampleImages);

    document.getElementById('btn-save-local').addEventListener('click', async () => {
      saveToLocalStorage();
      const result = await savePageToDisk();
      if (result.success) {
        showNotification(`💾 ${state.currentPage} — 프로젝트 원본과 dist/ 배포 파일 양쪽에 저장되었습니다!`, 'success');
      } else {
        showNotification(`⚠️ 파일 저장 실패: ${result.error || '알 수 없는 오류'} — server.js가 켜진 상태인지 확인해 주세요.`, 'error');
      }
    });

    document.getElementById('btn-reset-data').addEventListener('click', () => {
      if (confirm('모든 변경 사항을 초기화하시겠습니까?')) {
        localStorage.removeItem('onestop_admin_state');
        state = JSON.parse(JSON.stringify(DEFAULT_STATE));
        syncUIFromState();
        renderPortfolioManager();
        sendStateToIframe();
        showNotification('🔄 초기화되었습니다.', 'info');
      }
    });

    document.getElementById('btn-export-json').addEventListener('click', exportJSON);
    document.getElementById('btn-import-json-trigger').addEventListener('click', () => {
      document.getElementById('json-file-input').click();
    });
    document.getElementById('json-file-input').addEventListener('change', importJSON);
    document.getElementById('btn-export-html').addEventListener('click', exportHTMLFiles);

    // Incoming Messages from Preview Iframe (Click-to-Select)
    window.addEventListener('message', (e) => {
      const d = e.data || {};
      if (d.type === '__ready') {
        sendStateToIframe();
      }
      if (d.type === '__element_clicked') {
        if (d.tab) {
          const tabBtn = document.querySelector(`.tab-item[data-tab="${d.tab}"]`);
          if (tabBtn) tabBtn.click();
        }
        const fieldIdMap = {
          brandName: 'inp-brand-name',
          phone: 'inp-phone',
          heroHeadline: 'inp-hero-headline',
          heroSub: 'inp-hero-sub',
          gate: 'inp-gate-demo-label'
        };
        const inpId = fieldIdMap[d.field];
        if (inpId) {
          const targetInp = document.getElementById(inpId);
          if (targetInp) {
            targetInp.focus();
            targetInp.style.transition = 'box-shadow 0.3s ease';
            targetInp.style.boxShadow = '0 0 0 3px #E24B23';
            setTimeout(() => targetInp.style.boxShadow = 'none', 1200);
          }
        }
        showNotification(`✏️ 미리보기에서 <b>${d.field}</b> 항목이 선택되었습니다. 바로 수정해보세요!`, 'info');
      }
    });
  }

  function fillSampleImages() {
    state.images.heroVisual = SAMPLE_IMAGES.hero;
    state.images.heroBefore = SAMPLE_IMAGES.before;
    state.images.heroAfter = SAMPLE_IMAGES.after;

    state.portfolio.forEach((p, idx) => {
      const sample = SAMPLE_IMAGES.portfolio[idx % SAMPLE_IMAGES.portfolio.length];
      p.img = sample.img;
      if (!p.comment) p.comment = sample.comment;
    });

    syncUIFromState();
    renderPortfolioManager();
    sendStateToIframe();
    showNotification('🖼️ 실제 고화질 시공 사진과 코멘트가 적용되었습니다!', 'success');
  }

  // ==================== GOOGLE SHEET TEST BUTTONS ====================
  function bindGoogleSheetTests() {
    const btnDemo = document.getElementById('btn-test-demo-quote');
    const btnInt = document.getElementById('btn-test-interior-quote');
    const btnAll = document.getElementById('btn-test-all-quote');

    if (btnDemo) btnDemo.addEventListener('click', () => testSendQuote('철거'));
    if (btnInt)  btnInt.addEventListener('click', () => testSendQuote('인테리어'));
    if (btnAll)  btnAll.addEventListener('click', () => testSendQuote('통합'));
  }

  function testSendQuote(serviceType) {
    const url = document.getElementById('inp-google-script-url').value;
    if (!url || !url.includes('script.google.com')) {
      alert('Apps Script Web App URL을 먼저 입력해 주세요.\n(google_apps_script.gs 파일의 배포 가이드를 참조하세요)');
      return;
    }

    const testData = {
      serviceType: serviceType,
      name: '테스트 고객 (' + serviceType + ')',
      phone: '010-1234-5678',
      spaceType: '상가/매장',
      area: '35평',
      message: '어드민 에디터에서 [' + serviceType + '] 자동 분류 저장 테스트 실행 건'
    };

    showNotification('⏳ 구글 스프레드시트로 [' + serviceType + '] 테스트 견적 전송 중...', 'info');

    fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    }).then(() => {
      showNotification('✅ [' + serviceType + '] 견적 데이터가 구글 시트에 즉시 전송 기록되었습니다!', 'success');
    }).catch(err => {
      alert('전송 오류: ' + err.message);
    });
  }

  // ==================== INSTANT IMAGE UPLOADING ====================
  function bindImageUploads() {
    setupImageUploader('box-hero-img', 'file-hero-img', 'prev-hero-img', 'btn-del-hero-img', (url) => {
      state.images.heroVisual = url;
      sendStateToIframe();
      showNotification('⚡ 히어로 사진이 즉시 반영되었습니다!', 'success');
    });

    setupImageUploader('box-before-img', 'file-before-img', 'prev-before-img', 'btn-del-before-img', (url) => {
      state.images.heroBefore = url;
      sendStateToIframe();
      showNotification('⚡ Before 사진이 즉시 반영되었습니다!', 'success');
    });

    setupImageUploader('box-after-img', 'file-after-img', 'prev-after-img', 'btn-del-after-img', (url) => {
      state.images.heroAfter = url;
      sendStateToIframe();
      showNotification('⚡ After 사진이 즉시 반영되었습니다!', 'success');
    });
  }

  function setupImageUploader(boxId, inputId, previewId, delBtnId, callback) {
    const box = document.getElementById(boxId);
    const input = document.getElementById(inputId);

    if (!box || !input) return;

    box.addEventListener('click', (e) => {
      if (e.target.tagName !== 'BUTTON' && !e.target.classList.contains('btn-remove-img')) {
        input.click();
      }
    });

    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) handleImageFile(file, previewId, delBtnId, callback);
    });

    box.addEventListener('dragover', (e) => { e.preventDefault(); box.classList.add('drag-over'); });
    box.addEventListener('dragleave', () => box.classList.remove('drag-over'));
    box.addEventListener('drop', (e) => {
      e.preventDefault();
      box.classList.remove('drag-over');
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        handleImageFile(file, previewId, delBtnId, callback);
      }
    });
  }

  function bindGlobalPreviewDropzone() {
    const container = document.getElementById('preview-dropzone-container');
    if (!container) return;

    container.addEventListener('dragover', (e) => {
      e.preventDefault();
      container.style.outline = '3px dashed #38BDF8';
      container.style.outlineOffset = '-10px';
    });

    container.addEventListener('dragleave', () => { container.style.outline = 'none'; });

    container.addEventListener('drop', (e) => {
      e.preventDefault();
      container.style.outline = 'none';
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          state.images.heroVisual = evt.target.result;
          updateImagePreviewDisplay('prev-hero-img', 'btn-del-hero-img', evt.target.result);
          sendStateToIframe();
          showNotification('⚡ 대표 시공 사진이 즉시 업로드되어 반영되었습니다!', 'success');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  function handleImageFile(file, previewId, delBtnId, callback) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      updateImagePreviewDisplay(previewId, delBtnId, dataUrl);
      callback(dataUrl);
    };
    reader.readAsDataURL(file);
  }

  function updateImagePreviewDisplay(previewId, delBtnId, dataUrl) {
    const prev = document.getElementById(previewId);
    const delBtn = document.getElementById(delBtnId);
    if (!prev) return;

    if (dataUrl) {
      prev.style.backgroundImage = `url("${dataUrl}")`;
      prev.innerHTML = '';
      if (delBtn) delBtn.style.display = 'inline-block';
    } else {
      prev.style.backgroundImage = 'none';
      prev.innerHTML = '<span class="ph-text">📁 클릭하여 사진 선택 또는 드래그 앤 드롭</span>';
      if (delBtn) delBtn.style.display = 'none';
    }
  }

  // ==================== PORTFOLIO & COMMENT MANAGER ====================
  function renderPortfolioManager() {
    const container = document.getElementById('portfolio-list-container');
    if (!container) return;
    container.innerHTML = '';

    state.portfolio.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'pf-item-card';

      const thumbStyle = item.img ? `background-image: url("${item.img}")` : '';

      card.innerHTML = `
        <div class="pf-thumb-box" title="클릭하여 시공 사진 즉시 업로드" style="${thumbStyle}">
          ${!item.img ? '<span>📁 사진 등록</span>' : ''}
          <input type="file" class="pf-file-input" accept="image/*" style="display:none;" />
        </div>
        <div class="pf-item-info">
          <input type="text" class="form-control pf-inp-title" value="${escapeAttr(item.ttl)}" placeholder="프로젝트 제목 (예: 홍대 브런치 카페)" />
          <div style="display:grid; grid-template-columns: 1fr 1.2fr; gap:6px;">
            <select class="form-control pf-sel-cat">
              <option value="store" ${item.cat === 'store' ? 'selected' : ''}>상가 · 매장</option>
              <option value="office" ${item.cat === 'office' ? 'selected' : ''}>사무실</option>
              <option value="home" ${item.cat === 'home' ? 'selected' : ''}>주거</option>
            </select>
            <input type="text" class="form-control pf-inp-sq" value="${escapeAttr(item.sq)}" placeholder="평수/설명 (예: 32평 · 전체)" />
          </div>
          <input type="text" class="form-control pf-inp-comment" value="${escapeAttr(item.comment || '')}" placeholder="💬 상세 시공 코멘트 / 후기 요약" style="margin-top:2px; font-size:11.5px; border-color:rgba(56,189,248,0.4);" />
        </div>
        <button class="btn-del-pf" title="삭제">&times;</button>
      `;

      const thumbBox = card.querySelector('.pf-thumb-box');
      const fileInp = card.querySelector('.pf-file-input');
      const inpTitle = card.querySelector('.pf-inp-title');
      const selCat = card.querySelector('.pf-sel-cat');
      const inpSq = card.querySelector('.pf-inp-sq');
      const inpComment = card.querySelector('.pf-inp-comment');
      const btnDel = card.querySelector('.btn-del-pf');

      thumbBox.addEventListener('click', () => fileInp.click());

      thumbBox.addEventListener('dragover', (e) => { e.preventDefault(); thumbBox.style.borderColor = '#38BDF8'; });
      thumbBox.addEventListener('dragleave', () => { thumbBox.style.borderColor = ''; });
      thumbBox.addEventListener('drop', (e) => {
        e.preventDefault();
        thumbBox.style.borderColor = '';
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
          readAndSetPortfolioImage(file, item);
        }
      });

      fileInp.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) readAndSetPortfolioImage(file, item);
      });

      inpTitle.addEventListener('input', () => { item.ttl = inpTitle.value; sendStateToIframe(); });
      selCat.addEventListener('change', () => { item.cat = selCat.value; sendStateToIframe(); });
      inpSq.addEventListener('input', () => { item.sq = inpSq.value; sendStateToIframe(); });
      inpComment.addEventListener('input', () => { item.comment = inpComment.value; sendStateToIframe(); });

      btnDel.addEventListener('click', () => {
        state.portfolio.splice(index, 1);
        renderPortfolioManager();
        sendStateToIframe();
        showNotification('항목이 삭제되었습니다.', 'info');
      });

      container.appendChild(card);
    });
  }

  function readAndSetPortfolioImage(file, item) {
    const reader = new FileReader();
    reader.onload = (evt) => {
      item.img = evt.target.result;
      renderPortfolioManager();
      sendStateToIframe();
      showNotification('⚡ 포트폴리오 시공 사진이 즉시 업로드되었습니다!', 'success');
    };
    reader.readAsDataURL(file);
  }

  document.getElementById('btn-add-portfolio').addEventListener('click', () => {
    state.portfolio.unshift({
      id: Date.now().toString(),
      cat: 'store',
      ttl: '신규 시공 프로젝트',
      sq: '30평 · 신규 시공',
      comment: '시공 상세 코멘트를 입력하세요.',
      img: ''
    });
    renderPortfolioManager();
    sendStateToIframe();
  });

  // ==================== MOVING MARQUEE GALLERY MANAGER ====================
  function renderMarqueeManager() {
    const container = document.getElementById('marquee-list-container');
    if (!container) return;
    container.innerHTML = '';

    if (!state.marqueePhotos) {
      state.marqueePhotos = JSON.parse(JSON.stringify(DEFAULT_STATE.marqueePhotos));
    }

    state.marqueePhotos.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = 'portfolio-editor-card';
      card.style.background = 'var(--admin-card-bg)';
      card.style.border = '1px solid var(--admin-card-border)';
      card.style.borderRadius = '14px';
      card.style.padding = '14px';
      card.style.marginBottom = '12px';

      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <span style="font-weight:900; font-size:12.5px; color:var(--admin-accent);">무빙 갤러리 #${idx + 1}</span>
          <button class="action-btn secondary sm btn-del-marquee" style="color:#EF4444; padding:3px 8px; font-size:11px;">🗑️ 삭제</button>
        </div>
        <div style="display:grid; grid-template-columns:110px 1fr; gap:14px; align-items:center;">
          <div class="image-upload-box mq-thumb-box" style="height:80px; margin:0; cursor:pointer;">
            <div class="upload-preview" style="background-image:${item.img ? `url('${item.img}')` : 'none'}; background-size:cover; background-position:center; height:100%; display:flex; align-items:center; justify-content:center;">
              ${!item.img ? '<span class="ph-text" style="font-size:10px;">📁 사진 선택</span>' : ''}
            </div>
            <input type="file" class="mq-file-input" accept="image/*" style="display:none;" />
          </div>
          <div>
            <div class="form-group" style="margin-bottom:6px;">
              <label style="font-size:11px;">사진 제목 / 설명</label>
              <input type="text" class="form-control sm mq-inp-title" value="${escapeAttr(item.title || '')}" placeholder="예: 상가 철거 후 미니멀 카페" />
            </div>
            <div class="form-group" style="margin:0;">
              <label style="font-size:11px;">태그 뱃지 문구 (우측 상단 뱃지)</label>
              <input type="text" class="form-control sm mq-inp-badge" value="${escapeAttr(item.badge || '')}" placeholder="예: DEMO & INT" />
            </div>
          </div>
        </div>
      `;

      const thumbBox = card.querySelector('.mq-thumb-box');
      const fileInp = card.querySelector('.mq-file-input');
      const inpTitle = card.querySelector('.mq-inp-title');
      const inpBadge = card.querySelector('.mq-inp-badge');
      const btnDel = card.querySelector('.btn-del-marquee');

      thumbBox.addEventListener('click', () => fileInp.click());
      fileInp.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (evt) => {
            item.img = evt.target.result;
            renderMarqueeManager();
            sendStateToIframe();
            showNotification(`⚡ 무빙 갤러리 #${idx + 1} 사진이 바로 업로드되었습니다!`, 'success');
          };
          reader.readAsDataURL(file);
        }
      });

      inpTitle.addEventListener('input', () => { item.title = inpTitle.value; sendStateToIframe(); });
      inpBadge.addEventListener('input', () => { item.badge = inpBadge.value; sendStateToIframe(); });

      btnDel.addEventListener('click', () => {
        state.marqueePhotos.splice(idx, 1);
        renderMarqueeManager();
        sendStateToIframe();
        showNotification('무빙 사진이 삭제되었습니다.', 'info');
      });

      container.appendChild(card);
    });
  }

  const btnAddMq = document.getElementById('btn-add-marquee');
  if (btnAddMq) {
    btnAddMq.addEventListener('click', () => {
      if (!state.marqueePhotos) state.marqueePhotos = [];
      state.marqueePhotos.unshift({
        img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        title: '신규 무빙 시공 사진',
        badge: 'NEW'
      });
      renderMarqueeManager();
      sendStateToIframe();
    });
  }

  // ==================== IFRAME LIVE-EDIT HARVEST ====================
  // 미리보기(iframe)에서 직접 수정한 텍스트/사진을 state로 회수.
  // 회수 없이 저장하면 sendStateToIframe()가 직전 상태를 다시 적용해
  // "저장을 눌러도 미리보기 수정 내용이 되돌아가는" 문제가 발생한다.
  function harvestEditsFromIframe() {
    let doc;
    try { doc = iframe && iframe.contentDocument; } catch (e) { return; }
    if (!doc || !doc.body) return;
    const txt = el => (el ? el.innerText.trim() : '');
    const bgUrl = el => {
      if (!el) return '';
      const m = (el.style.backgroundImage || '').match(/url\(["']?(.+?)["']?\)/);
      return m ? m[1] : '';
    };

    // 공통 바인딩 텍스트 (브랜드명 · 전화번호)
    const brand = doc.querySelector('[data-bind="brandName"]');
    if (txt(brand)) state.tweaks.brandName = txt(brand);
    const phone = doc.querySelector('[data-bind="phone"]');
    if (txt(phone)) state.tweaks.phone = txt(phone);

    if (state.currentPage !== 'interior.html') {
      // 히어로 카피 (현재 표시 중인 variant 기준)
      const visibleHero = Array.from(doc.querySelectorAll('.hero[data-variant]')).find(h => h.style.display !== 'none');
      const heroRoot = visibleHero || doc;
      const copy = heroRoot.querySelector('[data-hero-copy]');
      if (txt(copy)) state.tweaks.heroHeadline = copy.innerText.trim();
      const sub = heroRoot.querySelector('[data-hero-sub]');
      if (txt(sub)) state.tweaks.heroSub = sub.innerText.trim();

      // 게이트 카드 라벨 · 설명
      const gDemoLbl = doc.querySelector('[data-gate-label="demo"]');
      if (txt(gDemoLbl)) state.tweaks.gateDemoLabel = txt(gDemoLbl);
      const gIntLbl = doc.querySelector('[data-gate-label="interior"]');
      if (txt(gIntLbl)) state.tweaks.gateInteriorLabel = txt(gIntLbl);
      const gDemoDesc = doc.querySelector('.gate-card[data-gate="demo"] .gate-desc');
      if (txt(gDemoDesc)) state.tweaks.gateDemoDesc = txt(gDemoDesc);
      const gIntDesc = doc.querySelector('.gate-card[data-gate="interior"] .gate-desc');
      if (txt(gIntDesc)) state.tweaks.gateInteriorDesc = txt(gIntDesc);

      // 히어로 이미지 (클릭/드래그로 직접 교체한 배경)
      const hv = bgUrl(doc.querySelector('.hero-visual .ph'));
      if (hv) state.images.heroVisual = hv;
      const hb = bgUrl(doc.querySelector('.side.before .ph'));
      if (hb) state.images.heroBefore = hb;
      const ha = bgUrl(doc.querySelector('.side.after .ph'));
      if (ha) state.images.heroAfter = ha;

      // 포트폴리오 카드 (제목 · 평수 · 코멘트 · 사진)
      doc.querySelectorAll('#pf-grid .pf-item').forEach((item, i) => {
        if (!state.portfolio[i]) state.portfolio[i] = {};
        const p = state.portfolio[i];
        const ttl = txt(item.querySelector('.ttl'));
        if (ttl) p.ttl = ttl;
        const sq = txt(item.querySelector('.sq'));
        if (sq) p.sq = sq;
        const cm = txt(item.querySelector('.pf-comment')).replace(/^💬\s*/, '');
        if (cm && cm !== '시공 코멘트 입력...') p.comment = cm;
        const img = bgUrl(item.querySelector('.ph'));
        if (img) p.img = img;
      });

      // 무빙 갤러리 (직접 교체한 사진 · 캡션) — 각 트랙은 무한루프용 2배 복제라 앞 절반만 회수
      const harvestTrack = (track) => {
        if (!track) return [];
        const cards = Array.from(track.children);
        return cards.slice(0, Math.floor(cards.length / 2)).map(card => {
          const img = card.querySelector('img');
          const spans = card.querySelectorAll('.card-caption span');
          return {
            img: img ? img.getAttribute('src') : '',
            title: spans[0] ? spans[0].textContent.trim() : '',
            badge: spans[1] ? spans[1].textContent.trim() : 'PROJECT'
          };
        }).filter(c => c.img);
      };
      const mq = harvestTrack(doc.getElementById('marquee-track-1')).concat(harvestTrack(doc.getElementById('marquee-track-2')));
      if (mq.length) state.marqueePhotos = mq;
    }

    // 회수한 값을 사이드바 입력칸에도 반영 — 이후 readStateFromUI()가 되덮지 않도록
    const set = (id, v) => { const el = document.getElementById(id); if (el && v !== undefined) el.value = v; };
    set('inp-brand-name', state.tweaks.brandName);
    set('inp-phone', state.tweaks.phone);
    set('inp-hero-headline', state.tweaks.heroHeadline);
    set('inp-hero-sub', state.tweaks.heroSub);
    set('inp-gate-demo-label', state.tweaks.gateDemoLabel);
    set('inp-gate-demo-desc', state.tweaks.gateDemoDesc);
    set('inp-gate-interior-label', state.tweaks.gateInteriorLabel);
    set('inp-gate-interior-desc', state.tweaks.gateInteriorDesc);
  }

  // ==================== STORAGE & EXPORT ====================
  function saveToLocalStorage() {
    harvestEditsFromIframe();
    readStateFromUI();
    localStorage.setItem('onestop_admin_state', JSON.stringify(state));
    renderPortfolioManager();
    renderMarqueeManager();
  }

  function loadFromLocalStorage() {
    try {
      const data = localStorage.getItem('onestop_admin_state');
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  function exportJSON() {
    readStateFromUI();
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    downloadBlob(blob, 'onestop_config.json');
  }

  function importJSON(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const imported = JSON.parse(evt.target.result);
        if (imported && imported.tweaks) {
          state = imported;
          syncUIFromState();
          renderPortfolioManager();
          sendStateToIframe();
          showNotification('📥 전체 설정 및 시공사례가 성공적으로 복원되었습니다.', 'success');
        }
      } catch (err) {
        alert('올바르지 않은 JSON 파일 형식입니다.');
      }
    };
    reader.readText(file);
  }

  // 배포 스냅샷에서 편집 도구 잔여물 제거 (contenteditable, 편집용 스타일/캔버스/파일입력 등)
  // — 서버(admin)에서 보이는 화면과 실제 배포 파일이 달라지는 원인 제거
  function sanitizeExportedHtml(html) {
    try {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      doc.querySelectorAll('[contenteditable]').forEach(el => el.removeAttribute('contenteditable'));
      doc.querySelectorAll('[title]').forEach(el => {
        const t = el.getAttribute('title') || '';
        if (t.startsWith('✏️') || t.startsWith('클릭하여')) el.removeAttribute('title');
      });
      doc.querySelectorAll('#visual-editor-style, #visual-editor-file-input, #canvas3d-motion, .floating-export-bar, .admin-toast-notif').forEach(el => el.remove());
      return '<!doctype html>\n' + doc.documentElement.outerHTML;
    } catch (e) {
      return html;
    }
  }

  // "💾 저장하기" 버튼이 실제로 index.html/interior.html 소스 파일에 저장되도록 하는 함수.
  // 지금까지는 이 버튼이 localStorage에만 저장하고 실제 파일은 전혀 건드리지 않아서,
  // admin 화면에서는 저장된 것처럼 보여도 index.html을 직접 열면 옛 내용이 그대로였다.
  // (server.js가 켜져 있어야 동작 — node server.js / 프로그램 실행하기.bat 로 실행했는지 확인)
  async function savePageToDisk() {
    if (!iframe || !iframe.contentDocument) {
      return { success: false, error: '미리보기를 불러오지 못했습니다' };
    }
    const pageName = state.currentPage === 'interior.html' ? 'interior.html' : 'index.html';
    const rawHtml = sanitizeExportedHtml('<!doctype html>\n' + iframe.contentDocument.documentElement.outerHTML);

    const activeTweaks = Object.assign({}, state.tweaks);
    if (pageName === 'interior.html' && state.tweaks.interiorAccent) {
      activeTweaks.accent = state.tweaks.interiorAccent;
    }

    // 문자열 치환이 아니라 DOM에서 TWEAKS/데이터 <script> 요소를 직접 찾아 textContent만 바꾼다.
    // (문자열 치환은 페이지 자신의 저장 로직 소스 코드 안에도 같은 마커 문구가 들어있어
    //  자기 자신을 오염시키는 문제가 있었다.)
    const doc = new DOMParser().parseFromString(rawHtml, 'text/html');
    const tweaksScript = Array.from(doc.querySelectorAll('head script'))
      .find(s => s.textContent.includes('window.TWEAKS = /*EDITMODE-BEGIN*/'));
    if (tweaksScript) {
      tweaksScript.textContent = '// ---- Tweakable defaults ----\nwindow.TWEAKS = /*EDITMODE-BEGIN*/' + JSON.stringify(activeTweaks, null, 2) + '/*EDITMODE-END*/;';
    }
    if (pageName === 'index.html') {
      let dataScript = doc.querySelector('#saved-page-data');
      if (!dataScript) {
        dataScript = doc.createElement('script');
        dataScript.id = 'saved-page-data';
        if (tweaksScript && tweaksScript.parentNode) {
          tweaksScript.parentNode.insertBefore(dataScript, tweaksScript.nextSibling);
        } else if (doc.querySelector('head')) {
          doc.querySelector('head').appendChild(dataScript);
        }
      }
      const lines = [
        'window.PORTFOLIO_ITEMS = ' + JSON.stringify(state.portfolio, null, 2) + ';',
        'window.MARQUEE_PHOTOS = ' + JSON.stringify(state.marqueePhotos || [], null, 2) + ';'
      ];
      dataScript.textContent = lines.join('\n');
    }
    const finalHtml = '<!doctype html>\n' + doc.documentElement.outerHTML;

    try {
      const res = await fetch('/api/save-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: pageName, html: finalHtml })
      });
      return await res.json();
    } catch (e) {
      return { success: false, error: '서버 미연결 (node server.js가 켜져 있는지 확인하세요)' };
    }
  }

  async function exportHTMLFiles() {
    harvestEditsFromIframe();
    readStateFromUI();
    try {
      let htmlMain = '';
      if (iframe && iframe.contentDocument && (state.currentPage === 'index.html' || !state.currentPage)) {
        htmlMain = sanitizeExportedHtml('<!doctype html>\n' + iframe.contentDocument.documentElement.outerHTML);
      } else {
        const respMain = await fetch('index.html');
        htmlMain = await respMain.text();
      }

      const tweaksCode = `window.TWEAKS = ${JSON.stringify(state.tweaks, null, 2)};\n` +
                         `window.HERO_IMAGES = ${JSON.stringify(state.images, null, 2)};\n` +
                         `window.PORTFOLIO_ITEMS = ${JSON.stringify(state.portfolio, null, 2)};\n` +
                         `window.MARQUEE_PHOTOS = ${JSON.stringify(state.marqueePhotos || [], null, 2)};`;

      if (htmlMain.includes('window.TWEAKS = /*EDITMODE-BEGIN*/')) {
        htmlMain = htmlMain.replace(/window\.TWEAKS = \/\*EDITMODE-BEGIN\*\/[\s\S]*?\/\*EDITMODE-END\*\/;/, tweaksCode);
      }

      const blobMain = new Blob([htmlMain], { type: 'text/html;charset=utf-8' });
      downloadBlob(blobMain, 'index.html');

      try {
        let htmlInterior = '';
        if (iframe && iframe.contentDocument && state.currentPage === 'interior.html') {
          htmlInterior = sanitizeExportedHtml('<!doctype html>\n' + iframe.contentDocument.documentElement.outerHTML);
        } else {
          const respInterior = await fetch('interior.html');
          htmlInterior = await respInterior.text();
        }

        const interiorTweaks = `window.TWEAKS = ${JSON.stringify({
          accent: state.tweaks.interiorAccent || state.tweaks.accent || "#059669",
          interiorAccent: state.tweaks.interiorAccent || "#059669",
          brandName: state.tweaks.brandName,
          phone: state.tweaks.phone,
          backUrl: "index.html",
          dark: state.tweaks.dark
        }, null, 2)};`;
        if (htmlInterior.includes('window.TWEAKS = /*EDITMODE-BEGIN*/')) {
          htmlInterior = htmlInterior.replace(/window\.TWEAKS = \/\*EDITMODE-BEGIN\*\/[\s\S]*?\/\*EDITMODE-END\*\/;/, interiorTweaks);
        }

        setTimeout(() => {
          const blobInterior = new Blob([htmlInterior], { type: 'text/html;charset=utf-8' });
          downloadBlob(blobInterior, 'interior.html');
        }, 500);

        // Also save directly to dist/ directory on disk if server is running
        try {
          fetch('/api/save-dist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ indexHtml: htmlMain, interiorHtml: htmlInterior })
          }).then(r => r.json()).then(res => {
            if (res.success) {
              showNotification('💾 project/dist/ 폴더로 배포용 최신 파일이 자동 업데이트되었습니다!', 'success');
            }
          }).catch(err => console.log('Dist auto-save skipped:', err));
        } catch (err) {
          // ignore
        }
      } catch (err) {
        console.log('Interior HTML export skipped:', err);
      }

      showNotification('🚀 Vercel 배포용 index.html & interior.html 저장 및 다운로드 완료!', 'success');
    } catch (e) {
      alert('HTML 파일 생성 중 오류가 발생했습니다: ' + e.message);
    }
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function escapeAttr(str) {
    return (str || '').replace(/"/g, '&quot;');
  }

  function showNotification(msg, type = 'info') {
    const existing = document.querySelector('.admin-toast-notif');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'admin-toast-notif';
    toast.style.cssText = `
      position: fixed; bottom: 24px; right: 24px; z-index: 99999;
      background: #1E293B; color: #FFF; border: 1px solid #38BDF8;
      padding: 14px 22px; border-radius: 12px; font-weight: 800;
      box-shadow: 0 10px 30px rgba(0,0,0,0.6); font-size: 13.5px;
      display: flex; align-items: center; gap: 10px; animation: slideUp 0.25s ease;
    `;
    toast.innerHTML = msg;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
