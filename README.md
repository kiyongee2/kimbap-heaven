# Kimbap - 명동김밥 주문 시스템

다국어 키오스크 주문 화면과 관리자 대시보드로 구성된 React 기반 웹 애플리케이션입니다.

---

## 프로젝트 구조

```
ui/                       # Vite + React 19 프론트엔드
├── src/
│   ├── App.jsx           # 고객용 키오스크 앱 (언어 선택 → 메뉴 → 주문)
│   ├── i18n.js           # 다국어 번역 데이터 (한국어, 영어 등)
│   ├── components/       # 공통 UI 컴포넌트
│   │   ├── LanguageSelect.jsx   # 언어 선택 화면
│   │   ├── MenuList.jsx         # 메뉴 목록 / 필터
│   │   ├── MenuDetail.jsx       # 메뉴 상세 / 장바구니 추가
│   │   └── OrderSummary.jsx     # 주문 확인 화면
│   ├── admin/            # 관리자 전용 앱
│   │   ├── AdminApp.jsx         # 관리자 앱 진입점
│   │   ├── Dashboard.jsx        # 대시보드 (오늘의 주문 현황)
│   │   ├── MenuManagement.jsx   # 메뉴 목록 관리
│   │   ├── MenuEdit.jsx         # 메뉴 추가 / 수정
│   │   ├── OrderList.jsx        # 주문 내역 조회
│   │   ├── Statistics.jsx       # 매출 통계
│   │   └── AdminSettings.jsx    # 앱 설정
│   ├── data/
│   │   └── menuData.js          # 기본 메뉴 데이터
│   └── store/
│       └── orderStore.js        # localStorage 기반 주문 상태 공유
```

---

## 주요 기능

### 고객 키오스크 (App.jsx)
- **언어 선택**: 한국어 · 영어 등 다국어 지원, 선택 언어는 localStorage에 저장
- **메뉴 탐색**: 카테고리 필터(비건 · 노포크 · 소고기 · 매운맛 등) 및 검색
- **장바구니**: 메뉴 추가 · 수량 조절 · 전체 삭제
- **주문 확정**: 주문 데이터를 localStorage에 저장하여 관리자 앱과 실시간 공유

### 관리자 대시보드 (admin/)
- **대시보드**: 금일 주문 수, 매출 요약
- **메뉴 관리**: 메뉴 추가 · 수정 · 삭제
- **주문 내역**: 접수된 주문 목록 조회
- **통계**: 기간별 매출 통계
- **설정**: 앱 환경 설정

---

## 기술 스택

| 항목 | 내용 |
|------|------|
| 프레임워크 | React 19 |
| 빌드 도구 | Vite |
| 상태 공유 | localStorage (`kimbap_orders`) |
| 다국어 | 커스텀 i18n (i18n.js) |
| 스타일 | CSS Modules (App.css, admin.css) |

---

## 시작하기

```bash
cd ui
npm install
npm run dev
```

개발 서버가 실행되면 브라우저에서 `http://localhost:5173` 으로 접속합니다.

- **고객 화면**: `/` (기본 경로)
- **관리자 화면**: URL 해시 또는 별도 진입점 (AdminApp.jsx)

---

## 빌드

```bash
npm run build
```

빌드 결과물은 `ui/dist/` 디렉터리에 생성됩니다.
