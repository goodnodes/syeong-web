# 배포 가이드

## 빌드된 파일 확인

```bash
npm run build
```

빌드 후 `dist/` 폴더에 다음 파일들이 생성됩니다:
- `index.html` - 메인 HTML 파일
- `assets/` - JavaScript, CSS 번들 파일

## 배포 옵션

### 1. Vercel (추천)

가장 간단한 배포 방법입니다.

```bash
# Vercel CLI 설치 (처음 한 번만)
npm install -g vercel

# 프로젝트 루트에서 실행
vercel

# 프로덕션 배포
vercel --prod
```

또는 GitHub 저장소와 연결하여 자동 배포:
1. https://vercel.com 에서 GitHub 저장소 연결
2. Build Command: `npm run build`
3. Output Directory: `dist`
4. 환경 변수에 `VITE_API_BASE_URL` 설정

### 2. Netlify

```bash
# Netlify CLI 설치
npm install -g netlify-cli

# 빌드
npm run build

# 배포
netlify deploy --prod --dir=dist
```

또는 Netlify 웹사이트에서:
1. https://app.netlify.com 에서 "Add new site" 클릭
2. GitHub 저장소 연결 또는 `dist/` 폴더 드래그 앤 드롭
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

### 3. GitHub Pages

`.github/workflows/deploy.yml` 파일 생성:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

### 4. AWS S3 + CloudFront

```bash
# AWS CLI 설치 및 설정 후
npm run build

# S3에 업로드
aws s3 sync dist/ s3://your-bucket-name --delete

# CloudFront 캐시 무효화
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

### 5. Firebase Hosting

```bash
# Firebase CLI 설치
npm install -g firebase-tools

# Firebase 로그인
firebase login

# Firebase 초기화
firebase init hosting

# 설정:
# - Public directory: dist
# - Single-page app: Yes
# - Automatic builds with GitHub: 선택사항

# 배포
firebase deploy
```

## 환경 변수 설정

각 플랫폼별 환경 변수 설정 방법:

### Vercel
1. 프로젝트 설정 → Environment Variables
2. `VITE_API_BASE_URL` 추가
3. Production/Preview/Development 환경별로 설정 가능

### Netlify
1. Site settings → Environment variables
2. `VITE_API_BASE_URL` 추가

### GitHub Pages
1. Repository → Settings → Secrets and variables → Actions
2. New repository secret 추가
3. Workflow 파일에서 환경 변수 사용

## 커스텀 도메인 설정

### Vercel/Netlify
- 플랫폼 대시보드에서 도메인 추가
- DNS 설정에 CNAME 또는 A 레코드 추가

### CloudFront
- ACM에서 SSL 인증서 발급
- CloudFront 배포에 도메인 추가
- Route 53 또는 DNS에 레코드 추가

## 성능 최적화

빌드 크기가 큰 경우:

```bash
# 번들 분석
npm run build -- --stats

# Vite 번들 분석 플러그인 사용
npm install -D rollup-plugin-visualizer
```

`vite.config.ts`에 추가:
```typescript
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true })
  ]
});
```

## 트러블슈팅

### 빌드 실패
- Node.js 버전 확인 (18 이상 필요)
- `npm install` 재실행
- `node_modules` 삭제 후 재설치

### API 연결 실패
- `.env` 파일의 `VITE_API_BASE_URL` 확인
- CORS 설정 확인
- 브라우저 개발자 도구 Network 탭 확인

### 스타일 깨짐
- Toss Design System 폰트 로딩 확인
- CSS 파일이 올바르게 번들링되었는지 확인
