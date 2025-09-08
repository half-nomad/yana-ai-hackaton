# 프로젝트 핵심 지침 (Project Core Directives)

## 목표
-   YANA AI 해커톤 랜딩 페이지를 `plan.md`에 명시된 4시간 안에 완성한다.

## 필수 준수 사항
1.  **PRD 준수:** 모든 기능과 콘텐츠는 `PRD.md 버전을 최종 명세로 간주하고 엄격히 따른다.
2.  **폴더 구조:** 제시된 폴더 구조를 반드시 유지한다.
3.  **디자인 시스템:** `design-system.json`에 정의된 값을 `css/styles.css` 내 CSS 변수로 선언하고, 이를 통해 전역 스타일을 관리한다. agencyyolo.com의 미니멀하고 임팩트 있는 정적 디자인 요소를 참고하여 대형 타이포그래피, 선언적 메시지 스타일, 깔끔한 레이아웃을 적용한다.
4.  **폰트:** Pretendard 폰트를 CDN으로 연결하여 사용한다.
5.  **컴포넌트:** shadcn/ui를 참고하되 agencyyolo의 미니멀 스타일에 맞춰 재사용 가능한 컴포넌트(Accordion, Button 등)를 `css/components.css`와 `js/main.js`에 Vanilla JS와 CSS로 직접 구현한다. 모서리 없는 디자인, 대형 버튼, 깔끔한 간격을 적용한다.
6.  **핵심 인터랙션:**
    -   히어로 섹션의 스크롤에 따른 이미지 전환 효과를 반드시 구현한다.
    -   24시간 일정표는 독립 섹션으로 구성하여 항상 가시성을 확보한다.
    -   커리큘럼 모달 팝업으로 상세 정보를 표시한다.
    -   모든 내부 링크(CTA 포함)는 Smooth Scroll로 동작해야 한다.
    -   요구된 모든 토글(Accordion) 기능은 Vanilla JS로 구현한다.
    -   소셜 미디어 공유를 위한 Open Graph 및 Twitter Card 메타 태그를 포함한다.
7.  **기술 제약:** React, Vue 등의 프레임워크나 jQuery 같은 라이브러리를 사용하지 않고, 순수 HTML, CSS, JavaScript로만 프로젝트를 완성한다.