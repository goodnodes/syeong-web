# Pool Report Standalone

수영장 정보 제보 폼 - 독립 실행 가능한 React 앱

## 📋 프로젝트 소개

이 프로젝트는 **syeong-ait** 메인 앱의 `PoolUpdateRequestScreen` 컴포넌트를 독립적으로 실행 가능한 별도 앱으로 분리한 것입니다. Toss 앱 WebView 환경에 의존하지 않고 어디서나 배포하여 사용할 수 있습니다.

## 🚀 시작하기

### 필수 요구사항

- Node.js 18 이상
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`을 열어 확인할 수 있습니다.

### 빌드

```bash
npm run build
```

빌드된 파일은 `dist/` 폴더에 생성됩니다.

### 프리뷰 (빌드 결과 확인)

```bash
npm run preview
```

## ⚙️ 환경 설정

### 환경 변수

`.env` 파일을 생성하여 API 엔드포인트를 설정할 수 있습니다:

```bash
# .env 파일 예시
VITE_API_BASE_URL=https://api.syeong.com
```

사용 가능한 환경 변수:
- `VITE_API_BASE_URL`: 수영장 정보를 제출할 API 서버 주소 (기본값: https://api.syeong.com)

`.env.example` 파일을 참고하세요.

## 📦 배포

### 정적 호스팅

빌드된 `dist/` 폴더를 다음 플랫폼에 배포할 수 있습니다:

- **Vercel**: `vercel --prod`
- **Netlify**: Netlify CLI 또는 드래그 앤 드롭
- **GitHub Pages**: GitHub Actions 워크플로우
- **AWS S3 + CloudFront**
- **Firebase Hosting**

### Vercel 배포 예시

```bash
# Vercel CLI 설치
npm install -g vercel

# 배포
vercel --prod
```

### Netlify 배포 예시

```bash
# Netlify CLI 설치
npm install -g netlify-cli

# 배포
netlify deploy --prod --dir=dist
```

## 🛠 기술 스택

- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안전성
- **Vite** - 빌드 도구
- **Toss Design System** - UI 컴포넌트
  - `@toss-design-system/mobile` - 모바일 UI 컴포넌트
  - `@toss-design-system/colors` - 색상 시스템

**참고:** Toss 앱 WebView 전용 패키지(`@toss-design-system/mobile-ait`)는 제거되었습니다. 이 앱은 어디서나 독립적으로 실행됩니다.

## 📁 프로젝트 구조

```
syeong-web/
├── src/
│   ├── constants/
│   │   ├── colors.ts         # 색상 상수
│   │   └── config.ts          # 설정 상수
│   ├── PoolReportForm.tsx     # 메인 폼 컴포넌트
│   ├── App.tsx                # 루트 컴포넌트
│   ├── App.css                # 앱 스타일
│   ├── index.css              # 전역 스타일
│   └── main.tsx               # 엔트리 포인트
├── .env                       # 환경 변수
├── .env.example               # 환경 변수 예시
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🔧 컴포넌트 사용법

### PoolReportForm Props

```typescript
interface PoolReportFormProps {
  onSuccess?: () => void;        // 제보 성공 시 콜백
  onError?: (error: Error) => void;  // 제보 실패 시 콜백
}
```

### 사용 예시

```tsx
import PoolReportForm from './PoolReportForm';

function MyApp() {
  return (
    <PoolReportForm
      onSuccess={() => console.log('제보 성공!')}
      onError={(error) => console.error('제보 실패:', error)}
    />
  );
}
```

## 🎨 커스터마이징

### API 엔드포인트 변경

`src/constants/config.ts` 파일에서 API 엔드포인트를 수정하거나, `.env` 파일의 `VITE_API_BASE_URL`을 설정하세요.

### 스타일 변경

- `src/App.css`: 앱 전체 스타일
- `src/index.css`: 전역 스타일
- `src/constants/colors.ts`: 색상 팔레트

### 성공/실패 핸들링 커스터마이징

`src/App.tsx`의 `handleSuccess`와 `handleError` 함수를 수정하여 제보 성공/실패 시 동작을 커스터마이징할 수 있습니다.

## 📄 라이선스

이 프로젝트는 원본 syeong-ait 프로젝트에서 파생되었습니다.

## 🤝 기여

버그 리포트나 기능 제안은 이슈로 등록해주세요.

## 📞 문의

질문이나 문의사항은 syeong 팀에 연락해주세요.
