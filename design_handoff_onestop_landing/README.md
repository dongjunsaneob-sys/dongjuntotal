# Handoff: 원스톱 인테리어 랜딩 페이지 (Onestop Interior Landing)

## Overview

무촌(muchon.kr) 스타일을 참고하여 만든 **"철거 + 인테리어 원스톱" 서비스** 랜딩 페이지입니다. 사용자는 진입 시 최상단 게이트에서 **철거 / 인테리어** 중 원하는 서비스를 선택하여 각각의 전문 페이지로 이동하는 구조입니다.

두 개의 랜딩 페이지로 구성됩니다:

1. **Landing Page (Main / Gate)** — 브랜드 소개 + 서비스 선택 게이트 + 통합 랜딩
2. **Interior Page** — 인테리어 전용 랜딩 (스타일 갤러리 · 공간별 시공 · 디자인 프로세스 · 마감재)

메인 CTA는 **"무료 견적받기"** 이며, 브랜드 전화번호는 **1533-6968** 입니다.

---

## About the Design Files

이 번들에 포함된 HTML/CSS/JS 파일은 **디자인 레퍼런스(prototypes)** 입니다. 최종 룩·인터랙션·카피를 확정한 프로토타입이며, **실제 프로덕션 코드로 그대로 사용하기 위한 것이 아닙니다.**

개발자는 이 디자인을 프로젝트의 **기존 환경(React, Vue, Next.js, Nuxt, SwiftUI 등)** 위에서 그 프로젝트의 컨벤션·컴포넌트·디자인 시스템을 사용하여 재구현해야 합니다. 아직 개발 환경이 없다면, 랜딩 페이지 특성상 **Next.js (App Router) + Tailwind CSS + Framer Motion** 조합을 권장합니다.

- HTML/CSS의 값들(색상·타이포·간격)은 **디자인 토큰**으로 취급하여 CSS 변수 또는 Tailwind 설정으로 옮기세요.
- 인라인 SVG 아이콘은 그대로 재사용 가능하지만, 프로젝트에 아이콘 라이브러리(lucide-react, heroicons 등)가 있다면 그것을 사용하는 편이 좋습니다.
- 플레이스홀더 이미지(줄무늬 SVG 패턴)는 **실제 시공 사진으로 반드시 교체**되어야 합니다.

---

## Fidelity

**High-fidelity (hifi)** — 픽셀 퍼펙트 목업입니다.

- 최종 컬러 팔레트, Pretendard 폰트 타입 스케일, 스페이싱, 라운드, 그림자, 호버·클릭 상태까지 모두 확정되어 있습니다.
- 개발자는 이 디자인을 코드베이스의 기존 컴포넌트 시스템으로 **픽셀 그대로** 재현해야 합니다.
- Interior 페이지의 세리프 강조 텍스트(예: `공간의 가치를 다시 짓다`의 "다시")는 이탤릭 세리프 서체를 사용합니다 — 웹폰트로 Noto Serif KR 또는 Playfair Display를 준비해야 합니다.

---

## Screens / Views

### 1. Landing Page (Main / Gate) — `Landing Page.html`

메인 진입 페이지. 최상단에 서비스 선택 게이트가 있고, 그 아래로 무촌 스타일의 통합 랜딩 콘텐츠가 이어집니다.

#### 섹션 순서

| 순서 | 섹션 ID | 설명 |
|---|---|---|
| 0 | `nav` | 상단 스티키 내비게이션 (backdrop-blur, 68px 높이) |
| 1 | `#top` (Gate) | **철거 / 인테리어 선택 카드 2개** |
| 2 | Hero | 3가지 변형(A/B/C) — 기본은 A |
| 3 | Trust strip | 신뢰 지표 4개 (실적 · 완공기간 · 직영 · AS) |
| 4 | `#kpi` | KPI 카드 4개 (100% · -40% · 1,500+ · 0원) |
| 5 | `#process` | 원스톱 프로세스 Step 1-4 (교차형 리스트) |
| 6 | `#why` | 차별점 3-column (일정 지연 ZERO · 책임 창구 하나 · 비용 낭비 차단) |
| 7 | `#portfolio` | 포트폴리오 12개 그리드 (카테고리 필터: 전체/상가/사무실/주거) |
| 8 | `#cost` | 투명 견적 테이블 (공간 유형별 시작가 · 공사기간) |
| 9 | `#faq` | FAQ 아코디언 (6개, `<details>` 요소 사용) |
| 10 | `#contact` | 무료 상담 신청 폼 (검정 배경 강조) |
| 11 | `footer` | 4-column 푸터 |
| Fixed | `.float-call` | 우하단 플로팅 전화 상담 버튼 |

#### 게이트 섹션 (핵심)

두 개의 카드가 나란히 배치됩니다.

- **좌 (철거)** — 밝은 카드 (`background: #ffffff`, border: `--line`), 우상단 hover 시 accent 방사형 그라디언트
  - Tag: `01 · 필요한 공간을 비우다`
  - Title: `철거` (clamp 38–66px, 900 weight, letter-spacing -0.045em)
  - Description: `상가 원상복구, 사무실 인테리어 철거, 부분 철거까지 — 최저가 철거 견적을 받아보세요.`
  - Arrow button: 72×72 원형, 검정 배경, hover 시 accent + rotate(-20deg)
  - **Link → `https://http2026.cafe24.com/`**

- **우 (인테리어)** — 검정 카드 (`background: --ink`, border: `--ink`)
  - Tag: `02 · 새롭게 만들다`
  - Title: `인테리어` (같은 스타일, 컬러는 `--bg`)
  - Description: `상가 · 사무실 · 주거 — 설계부터 시공까지. 포트폴리오와 견적을 확인하세요.`
  - Arrow button: 72×72 원형, accent 배경
  - **Link → `Interior.html`** (같은 프로젝트 내 인테리어 페이지)

- **호버 인터랙션**
  - 카드 전체: `transform: translateY(-4px)`, border-color 변경, 방사형 그라디언트 opacity 0 → 1
  - Arrow: 배경색 변경 + `rotate(-20deg) scale(1.05)`, 내부 SVG는 `rotate(20deg)` 반대 회전으로 화살표 방향 유지
  - 전환: `transform 0.28s cubic-bezier(.2,.7,.2,1)`

#### Hero 변형 3종 (Tweaks로 토글)

- **A · Editorial** (기본) — 좌측 헤드라인 + CTA, 우측 대형 이미지 (aspect-ratio 4/5), 우측 이미지 위에 좌상단(1500+ 실적)/우하단(만족도 4.9) 뜨는 배지 2개
- **B · Before/After** — 중앙 정렬 헤드라인 + 하단 21:9 Before/After 슬라이더 (드래그 핸들, `clip-path: inset(0 0 0 var(--split))`)
- **C · Full-bleed** — 88vh 대형 배경 이미지 + 하단 정렬 카피 + 그라디언트 오버레이 (0 → 72% 검정)

### 2. Interior Page — `Interior.html`

인테리어 전용 랜딩. 게이트에서 "인테리어" 클릭 시 이동.

#### 섹션 순서

| 순서 | 섹션 ID | 설명 |
|---|---|---|
| 0 | Nav | 좌측 로고 옆에 "인테리어" 서브텍스트, "← 메인" 뒤로가기 링크 |
| 1 | `#top` Hero | 대형 세리프+산세리프 믹스 헤드라인 + 3분할 이미지 스트립 (2fr : 1fr : 1fr) |
| 2 | Cat strip | 카테고리 지표 4개 (1,500+ · 4.9 · 15명 · 1년) |
| 3 | `#styles` | 디자인 스타일 갤러리 (Bento grid, 6개 카드) |
| 4 | `#spaces` | 공간별 시공 3-column (상가/사무실/주거, aspect-ratio 3/4) |
| 5 | `#process` | 5단계 디자인 프로세스 (3번째 카드가 `hi` 강조) |
| 6 | `#materials` | 마감재 리스트 (컬러 스와치 6개) |
| 7 | CTA band | 검정 배경 밴드, 우측에 전화·카톡 카드 |
| 8 | `#contact` | 좌측 요약(무엇을/언제까지/예산은) + 우측 폼 |
| 9 | Footer | 하단에 "메인으로 돌아가기" |

#### 스타일 갤러리 Bento 레이아웃

6-column grid, 200px auto rows:
- `s1` — col span 3, row span 2 (Modern Dark 대형)
- `s2` — col span 3, row span 1 (Warm Wood)
- `s3` — col span 2, row span 1 (Minimal)
- `s4` — col span 1, row span 1 (Retro 작은 카드)
- `s5` — col span 3, row span 2 (Industrial 대형)
- `s6` — col span 3, row span 1 (Natural)

각 카드는 좌하단 오버레이(kw · h3 · p), 우상단 40×40 화살표 버튼 (glass background + border), hover 시 화살표 accent 배경 + rotate(-20deg).

---

## Interactions & Behavior

### 게이트 카드 호버 (핵심)

```
transition: transform .28s cubic-bezier(.2,.7,.2,1),
            border-color .28s ease,
            background .28s ease;

hover: translateY(-4px), border-color: var(--ink)
hover ::before: opacity 0 → 1 (방사형 그라디언트)
hover .gate-arrow: background → accent, rotate(-20deg) scale(1.05)
hover .gate-arrow svg: rotate(20deg) — 화살표 방향 보정
```

### Before/After 슬라이더 (Hero B)

- `mousedown`/`touchstart`로 dragging=true
- `mousemove`/`touchmove`에서 `((clientX - rect.left) / rect.width) * 100`을 `--split` CSS 변수에 반영
- `.after` 레이어에 `clip-path: inset(0 0 0 var(--split))` 적용
- `mouseup`/`touchend`로 dragging=false

### 포트폴리오 필터

- 상단 필터 버튼: `.pf-filter[data-cat]` — active 클래스 토글
- 클릭 시 `renderPortfolio(cat)` 재호출하여 `PORTFOLIO` 배열을 필터링 후 그리드 재생성
- 카테고리: `all` / `store` / `office` / `home`

### FAQ 아코디언

- 순수 HTML `<details>/<summary>` 사용 — JS 불필요
- `[open]` 상태일 때 `.toggle` 원형 아이콘이 `rotate(180deg)` + 검정 배경으로 반전
- **접근성 유지 필수** — 재구현 시에도 native `<details>` 또는 role="button" + aria-expanded 패턴 사용

### 폼 제출

- 현재는 프로토타입 상태로 `handleSubmit(e)`에서 `preventDefault()` + 버튼 텍스트를 "접수되었습니다" 상태로 변경, 3.5초 후 폼 리셋
- **실 구현 시**: 백엔드 API로 POST + 카카오 알림톡 연동 필요

### 공통 버튼 호버

- `.btn:hover { transform: translateY(-1px); }`
- `.btn:hover .arr { transform: translateX(3px); }` — 화살표가 살짝 오른쪽으로

### 라디오 그룹 (폼)

- `input[type=radio]`는 `display: none`, `<label>`을 pill 형태로 스타일링
- `label:has(input:checked)` 셀렉터로 active 상태 (`:has()` 지원 필수 — 최신 브라우저만)

---

## State Management

**메인 랜딩페이지**:
- `T` (TWEAKS 객체) — 히어로 변형, accent 컬러, 헤드라인/서브 카피, 브랜드명, 전화번호, 다크모드, 게이트 URL/라벨
- `PORTFOLIO` — 12개 시공 사례 데이터 (cat, ttl, sq)
- 현재 필터 상태는 DOM 클래스로만 관리 (별도 state 없음)

**Interior 페이지**:
- `T` (TWEAKS 객체) — accent, 브랜드명, 전화, 다크모드

### 실 구현 시 필요한 상태

- 히어로 변형은 **A 하나로 확정 배포** 권장 (Tweaks는 디자인 툴 전용)
- 포트폴리오 데이터는 CMS 또는 백엔드에서 로드
- 폼 제출 상태: `idle` / `submitting` / `success` / `error`
- 게이트 URL은 환경 변수 또는 CMS 설정값

---

## Design Tokens

### Colors (라이트 모드 기본)

```css
--bg:         #FBFAF7   /* 오프화이트, 웜톤 배경 */
--bg-elev:    #ffffff   /* 카드/네비 배경 */
--ink:        #14110F   /* 최심 텍스트 */
--ink-2:      #2A2724   /* 서브 텍스트 */
--muted:      #6B6560   /* 뮤티드 텍스트 */
--line:       #E8E4DE   /* 라인 · 보더 */
--line-2:     #D9D3CB   /* 강조 라인 */
--accent:     #E24B23   /* 브릭 오렌지 (포인트) */
--accent-ink: #ffffff
--chip:       #F2EEE7   /* 태그/칩 배경 */
```

### Colors (다크 모드)

```css
--bg:      #14110F
--bg-elev: #1C1917
--ink:     #F7F5F1
--ink-2:   #E4DFD8
--muted:   #9E978F
--line:    #2A2724
--line-2:  #3A3632
--chip:    #23201D
```

### Accent 팔레트 옵션 (Tweaks)

- Brick: `#E24B23` (기본)
- Ink: `#111111`
- Forest: `#2C6E4A`
- Blue: `#1E5EFF`

### Spacing / Radius

```css
--radius:    14px    /* 일반 카드 */
--radius-lg: 22px    /* 대형 카드/히어로 */
--container: 1240px

섹션 세로 패딩: 110px (block), 44px (gate)
카드 내부 패딩: 34px (kpi), 40px (gate/form)
간격: 4/8/12/16/18/20/22/26/30/40/60/80/110
```

### Shadows

```css
--shadow-sm: 0 1px 2px rgba(20,17,15,.04), 0 4px 12px rgba(20,17,15,.04);
--shadow-md: 0 8px 30px rgba(20,17,15,.08);

플로팅 콜 버튼: 0 10px 30px rgba(226,75,35,.35);
```

### Typography

**주 폰트**: `Pretendard Variable` (CDN: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css`)

**세리프 폰트 (Interior 페이지 강조용)**: `Playfair Display` italic 또는 `Noto Serif KR` italic

**타입 스케일**:

| 용도 | 크기 | Weight | Letter-spacing |
|---|---|---|---|
| Body | 16px | 400 | -0.01em |
| Small | 13–14px | 500 | 0 |
| Nav 링크 | 15px | 500 | -0.01em |
| 버튼 | 15–16px | 700 | -0.01em |
| Section eyebrow | 13px | 700 | 0.14em (uppercase) |
| Section title | clamp(34px, 3.6vw, 52px) | 900 | -0.035em |
| Hero H1 (A) | clamp(44px, 6.4vw, 92px) | 900 | -0.045em |
| Hero H1 (Interior) | clamp(48px, 7.2vw, 112px) | 900 | -0.05em |
| Gate title | clamp(38px, 5vw, 66px) | 900 | -0.045em |
| KPI number | clamp(52px, 5vw, 72px) | 900 | -0.05em |

**본문 line-height**: 1.55 (body), 1.7 (long-form paragraph)

### 반응형 브레이크포인트

- `max-width: 960px` — 태블릿/모바일 전환
- `max-width: 760px` — 게이트 카드 세로 스택 전환

---

## Assets

이 디자인에는 **실제 사진 자산이 포함되어 있지 않습니다.** 모든 이미지 자리는 대각선 줄무늬 SVG 패턴 플레이스홀더로 표시되며, 각 자리에 어떤 이미지가 들어가야 하는지 `data-label` 속성으로 명시해 두었습니다.

### 필요한 이미지 자산 목록

**Landing Page.html**
- Hero A: 대표 완공 인테리어 사진 1장 (4:5 비율, 최소 800×1000)
- Hero B: Before/After 각 1장 (16:9 비율, 최소 1200×675)
- Hero C: Full-bleed 배경 사진 1장 (16:9, 최소 1920×1080)
- 포트폴리오: 12장 (4:5 비율, 카테고리별로 상가·사무실·주거 각 4장)

**Interior.html**
- Hero 스트립: 대표 사진 1장 + 사이드 4장 (총 5장)
- 스타일 갤러리 Bento: 6장 (Modern Dark / Warm Wood / Minimal White / Retro / Industrial / Natural Bio)
- 공간별 카드: 상가·사무실·주거 각 1장 (3:4 비율, 최소 750×1000)
- Materials: 큐레이션 이미지 1장 (4:5)

### 아이콘

인라인 SVG로 작성 (외부 의존성 없음). 모두 24×24 뷰박스, `stroke-width: 2` 기준의 lucide-icons 스타일.

- 전화 (phone), 시계 (clock), 체크 (check), 쉴드 (shield), 캘린더 (calendar)
- 화살표 (arrow-right, chevron-down, chevron-left)
- 상단 우측 소셜 등은 미포함

실 구현 시 `lucide-react`, `react-icons` 등의 라이브러리로 대체 가능합니다.

### 폰트 CDN

```html
<link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css" rel="stylesheet">
```

Interior의 세리프 강조는 Google Fonts 필요:

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,500&display=swap" rel="stylesheet">
```

---

## Copywriting (전체 카피 원본)

카피는 브랜드 커뮤니케이션의 핵심입니다. 재구현 시 **원문 그대로 유지**해 주세요.

### 브랜드
- 브랜드명: **원스톱**
- 대표번호: **1533-6968**
- 서비스 시간: 평일·주말 09:00 – 20:00 · 연중무휴

### 메인 헤드라인 (Hero A)
> 철거부터 인테리어까지,
> 원스톱으로 끝내다.

### 메인 서브카피
> 복잡한 견적, 여러 업체 컨택은 이제 그만. 상담 한 번으로 철거·설계·시공·AS까지 한 팀이 책임집니다.

### CTA 문구
- 메인: **무료 견적받기**
- 서브: **전화 상담 1533-6968**
- 폼 제출: **무료 견적 신청하기**

### 게이트 카피
- 게이트 헤드: "어떤 공사가 필요하세요?" / "원하시는 서비스를 선택하시면 전문 상담 페이지로 안내해 드립니다."
- 도움말: "TIP · 둘 다 필요하시다면 **원스톱**을 추천드려요"

### Interior 헤드라인
> 공간의 가치를
> *다시* **짓다.**
>
> ("다시" = 세리프 이탤릭, "짓다" = accent 컬러)

FAQ, KPI, 프로세스 카피는 각 HTML 파일에서 그대로 발췌하여 사용.

---

## Files

이 번들에 포함된 파일:

- `Landing Page.html` — 메인 랜딩 (게이트 + 통합 랜딩)
- `Interior.html` — 인테리어 전용 랜딩

두 파일 모두 **단일 파일 완결형** (외부 의존성: Pretendard 웹폰트 CDN 하나뿐)이며, HTML/CSS/JS 인라인 구조입니다.

각 파일 최상단의 `window.TWEAKS = /*EDITMODE-BEGIN*/{...}/*EDITMODE-END*/` 블록은 디자인 툴의 실시간 편집을 위한 것으로, 실 구현 시에는 환경 변수 또는 CMS로 이관하시면 됩니다.

### 코드 참고 포인트

- **게이트 카드 스타일**: `Landing Page.html` 내 `.gate-card` 관련 CSS (라인 156 부근)와 HTML (`#top` 섹션)
- **Before/After 슬라이더**: `Landing Page.html` 하단 스크립트의 `(function(){ const ba = $('#ba') ... })();` 블록
- **포트폴리오 필터링**: 같은 스크립트 내 `renderPortfolio(filter)` 함수와 `PORTFOLIO` 배열
- **Tweaks 프로토콜**: 두 파일 모두 하단의 `setTweak(patch)` / `postMessage` 관련 코드 — **실 구현 시 완전히 제거**해야 합니다 (디자인 툴 전용)
- **Bento 그리드**: `Interior.html`의 `.style-card.s1 ~ .s6` CSS

---

## 재구현 체크리스트

- [ ] Pretendard 웹폰트를 프로젝트에 셀프호스팅 (성능·안정성)
- [ ] Playfair Display italic 웹폰트 준비 (Interior 세리프 강조)
- [ ] 모든 플레이스홀더 이미지를 실제 시공 사진으로 교체
- [ ] 게이트 카드의 URL을 환경변수/CMS로 이관 (`철거 → https://http2026.cafe24.com/`)
- [ ] 폼 제출을 실제 백엔드 API + 알림톡 연동으로 교체
- [ ] `Tweaks` 관련 스크립트/DOM 제거
- [ ] 모바일 브레이크포인트에서 게이트 카드 세로 스택 확인
- [ ] `<details>` FAQ의 접근성(키보드 조작·스크린리더) 재확인
- [ ] SEO 메타 태그, OG 이미지, favicon 추가
- [ ] Google Analytics / 픽셀 스크립트 삽입
- [ ] 플로팅 콜 버튼의 클릭 이벤트 트래킹
