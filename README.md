# YANA AI 해커톤 랜딩 페이지

YANA AI 해커톤을 위한 반응형 랜딩 페이지입니다. Vanilla HTML, CSS, JavaScript로 구현되었습니다.

## 🎯 프로젝트 개요

생성형 AI 1박 2일 밤샘 마스터 과정인 YANA AI 해커톤을 소개하는 랜딩 페이지입니다. 
agencyyolo.com의 미니멀하고 임팩트 있는 디자인을 참고하여 제작했습니다.

## 🌟 주요 기능

### 인터랙티브 요소
- **히어로 섹션 이미지 전환**: noon/night 이미지가 2초마다 자동으로 페이드
- **커리큘럼 모달 팝업**: 각 커리큘럼 카드 클릭 시 상세 정보 모달 표시
- **스무스 스크롤**: 모든 내부 링크에 부드러운 스크롤 적용
- **포스터 스크롤 효과**: 스크롤에 따른 포스터 이미지 brightness 변화
- **플로팅 CTA 배너**: 하단 고정 신청 배너

### 반응형 디자인
- **데스크톱**: 5칼럼 그리드 레이아웃
- **태블릿**: 적응형 그리드 시스템
- **모바일**: 3:2 레이아웃 (첫 줄 3개, 둘째 줄 2개)

### 디자인 시스템
- **폰트**: Pretendard (CDN 연결)
- **아이콘**: Lucide SVG 아이콘 시스템
- **컴포넌트**: 재사용 가능한 Button, Accordion, Modal 컴포넌트
- **색상**: CSS Variables를 통한 일관된 색상 시스템

## 🛠️ 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: 
  - CSS Grid & Flexbox
  - CSS Variables (CSS Custom Properties)
  - 반응형 디자인 (Mobile-first)
  - 트랜지션 & 애니메이션
- **Vanilla JavaScript**:
  - ES6+ 문법
  - 모듈러 클래스 구조
  - Intersection Observer API
  - requestAnimationFrame

## 📁 프로젝트 구조

```
yana-hackathon-landing-page/
├── index.html              # 메인 HTML 파일
├── css/
│   ├── styles.css          # 메인 스타일시트
│   └── components.css      # 컴포넌트 스타일
├── js/
│   └── main.js            # 메인 JavaScript 파일
├── assets/
│   ├── hero_noon.png      # 낮 히어로 이미지
│   ├── hero_night.png     # 밤 히어로 이미지
│   └── poster1.png        # 포스터 이미지
├── design-system.json     # 디자인 시스템 토큰
├── PRD.md                 # 제품 요구사항 문서
├── plan.md                # 개발 계획서
└── CLAUDE.md             # 개발 가이드라인

```

## 🚀 설치 및 실행

1. **저장소 클론**
   ```bash
   git clone [repository-url]
   cd yana-hackathon-landing-page
   ```

2. **로컬 서버 실행**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (http-server 패키지 필요)
   npx http-server
   
   # Live Server (VS Code 확장)
   Live Server 확장 프로그램 사용
   ```

3. **브라우저에서 확인**
   ```
   http://localhost:8000
   ```

## 📱 반응형 브레이크포인트

- **모바일**: ~ 768px
- **태블릿**: 769px ~ 1024px  
- **데스크톱**: 1025px ~

## 🎨 컴포넌트

### Button 컴포넌트
```css
.btn--primary    /* 주요 버튼 */
.btn--secondary  /* 보조 버튼 */
.btn--large      /* 큰 버튼 */
```

### Modal 컴포넌트
```css
.modal           /* 모달 컨테이너 */
.modal__overlay  /* 배경 오버레이 (backdrop-blur) */
.modal__content  /* 모달 콘텐츠 */
```

### Curriculum Grid
```css
.curriculum__flow  /* 6칼럼 그리드 */
.flow-item        /* 각 커리큘럼 카드 */
```

## 🔧 커스터마이징

### 색상 변경
`css/styles.css`의 CSS Variables 수정:
```css
:root {
  --brand-primary: #F2E500;    /* 메인 브랜드 컬러 */
  --bg-primary: #0A0A0A;       /* 배경색 */
  --fg-primary: #F5F5F5;       /* 텍스트 색상 */
}
```

### 애니메이션 속도 조정
```css
:root {
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
}
```

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 연락처

프로젝트 관련 문의사항이 있으시면 언제든지 연락해 주세요.

---

*🤖 Generated with [Claude Code](https://claude.ai/code)*