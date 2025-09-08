# YANA AI 해커톤 랜딩 페이지 빌드업 계획

## 1. 목표

-   4시간 내에 제품요구문서(PRD) v2.2에 명시된 모든 기능을 포함한 반응형 랜딩 페이지의 초기 버전(v1.0)을 완성한다.

## 2. 기술 명세 (Tech Specs)

-   **HTML:** 시맨틱 마크업을 준수하는 HTML5
-   **CSS:**
    -   CSS 변수(Variables)를 활용한 디자인 시스템 적용
    -   Flexbox와 Grid를 사용한 레이아웃 구성
    -   `styles.css` (전역 스타일)와 `components.css` (컴포넌트 스타일) 파일 분리
-   **JavaScript:**
    -   별도의 라이브러리 없이 Vanilla JS (ES6+)만을 사용
    -   DOM 조작을 통한 인터랙션 구현
-   **폰트:** Pretendard (CDN을 통해 적용)
-   **컴포넌트:** [shadcn/ui](https://ui.shadcn.com/docs/components)의 디자인과 [agencyyolo.com](https://agencyyolo.com)의 미니멀 스타일을 결합하여, Vanilla JS와 CSS로 직접 컴포넌트(Accordion, Button 등)를 구현한다.

## 3. 빌드업 타임라인 (4시간)

### **1시간: 프로젝트 설정 및 HTML 구조 설계 (0:00 - 1:00)**

-   요구된 폴더 구조 생성
-   `index.html` 기본 보일러플레이트 작성
-   Pretendard 폰트 CDN 및 CSS/JS 파일 링크 연결
-   PRD에 명시된 모든 섹션 (`<header>`, `<main>`, `<section>`, `<footer>` 등)을 시맨틱 태그로 구조화

### **2시간: CSS 전역 스타일 및 디자인 시스템 적용 (1:00 - 2:00)**

-   `design-system.json`의 값을 `css/styles.css` 파일에 CSS 변수로 선언
-   agencyyolo 스타일 반영: 대형 타이포그래피, 미니멀 레이아웃, 모서리 없는 디자인
-   전체 페이지의 배경, 폰트, 색상 등 기본 스타일 설정
-   헤더, 히어로 섹션, 푸터 등 주요 레이아웃 스타일링
-   반응형 웹을 위한 기본 미디어 쿼리 설정

### **3시간: 컴포넌트 구현 (CSS & JS) (2:00 - 3:00)**

-   `css/components.css`와 `js/main.js` 파일에 컴포넌트 코드 작성
-   **Accordion (토글):** agencyyolo 스타일 반영한 미니멀 아코디언 컴포넌트 구현 (모서리 없음, 깔끔한 간격)
-   **Button:** 대형 CTA 버튼 스타일 정의 (모서리 없음, 큰 패딩, 선언적 텍스트)
-   **Floating Banner:** 플로팅 CTA 배너 위치 고정 및 스타일링

### **4시간: JavaScript 인터랙션 및 최종 검토 (3:00 - 4:00)**

-   **Hero Image Transition:** 히어로 섹션에서 스크롤을 내릴 때 포스터 이미지가 다른 이미지나 효과로 전환되는 기능 구현
-   **Smooth Scroll:** 모든 CTA 버튼 및 내부 링크 클릭 시 해당 섹션으로 부드럽게 이동하는 기능 구현
-   최종 스타일 검토 및 반응형 테스트, 버그 수정

## 4. 체크리스트

-   [x] 폴더 구조 생성
-   [x] `index.html` 구조 설계 완료
-   [x] `design-system.json` 작성
-   [x] `styles.css`에 CSS 변수 및 전역 스타일 적용 완료
-   [x] `components.css`에 컴포넌트 스타일 정의 완료
-   [x] Accordion (토글) 컴포넌트 기능 구현
-   [x] 플로팅 CTA 배너 기능 구현
-   [x] 히어로 섹션 스크롤 이미지 전환 효과 구현 (noon/night 2초 자동 전환)
-   [x] Smooth Scroll 기능 구현
-   [x] 반응형 레이아웃 최종 검토
-   [x] Lucide SVG 아이콘 시스템 적용 (이모지 대체)
-   [x] 커리큘럼 모달 팝업 시스템 구현
-   [x] 포스터 스크롤 brightness 효과 구현
-   [x] 모바일 커리큘럼 3:2 그리드 레이아웃 적용

## 5. 추가 구현된 기능들

### 완료된 고도화 작업
- **아이콘 시스템**: 모든 이모지를 Lucide SVG 아이콘으로 교체하여 전문적인 외관 구현
- **인터랙티브 모달**: 커리큘럼 섹션을 카드 클릭 시 상세 정보 팝업으로 변경 (backdrop-blur 효과)
- **히어로 섹션 개선**: noon/night 이미지 자동 전환, 일관된 오버레이 적용
- **모바일 최적화**: 커리큘럼 그리드를 3:2 레이아웃으로 개선하여 겹침 방지
- **포스터 인터랙션**: 스크롤에 따른 동적 brightness 조정 효과

### 기술적 개선사항
- **모듈러 JavaScript**: 클래스 기반 구조로 코드 정리 및 유지보수성 향상
- **성능 최적화**: requestAnimationFrame을 활용한 부드러운 애니메이션
- **접근성 향상**: 키보드 네비게이션 지원 (ESC 키로 모달 닫기)
- **반응형 그리드**: CSS Grid를 활용한 복잡한 레이아웃 구현