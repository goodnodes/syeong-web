# 🚀 Quick Start Guide

## 즉시 시작하기

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev

# 3. 브라우저에서 확인
# http://localhost:5173
```

## 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 1분 안에 배포하기

### Vercel (가장 간단)

```bash
npm install -g vercel
vercel --prod
```

### Netlify

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

## 환경 설정

API 엔드포인트를 변경하려면 `.env` 파일 수정:

```bash
VITE_API_BASE_URL=https://your-api-server.com
```

## 문제 해결

**빌드 실패 시:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**API 연결 안 됨:**
- `.env` 파일의 API URL 확인
- CORS 설정 확인

## 더 자세한 정보

- 전체 문서: `README.md`
- 배포 가이드: `DEPLOYMENT.md`
