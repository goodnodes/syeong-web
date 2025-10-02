# Syeong Web - GitHub 배포 설정 가이드

## 📋 체크리스트

배포 전 다음 사항들을 확인하세요:

- [ ] `.github/workflows/deploy.yml` 파일 생성됨
- [ ] `.gitignore` 파일 생성됨
- [ ] `package.json`의 프로젝트 이름 확인
- [ ] 로컬 빌드 테스트 완료

## 🚀 GitHub에 업로드 및 자동 배포 설정

### 1단계: GitHub 저장소 생성

#### GitHub 웹사이트에서:
1. https://github.com/goodnodes 접속
2. **New repository** 클릭
3. Repository 정보 입력:
   - Repository name: `syeong-web`
   - Description: 수영장 정보 제보 웹 애플리케이션
   - Public/Private: 선택
   - **Initialize this repository**는 체크 해제
4. **Create repository** 클릭

### 2단계: 로컬 프로젝트 Git 초기화 및 푸시

```bash
cd /Users/ijongseog/Desktop/goodnodes/syeong-web

# Git 초기화 (아직 안 했다면)
git init

# .gitignore 파일 생성 (아래 내용 추가)
cat > .gitignore << 'EOF'
node_modules
dist
dist-ssr
*.local
.DS_Store
.env.local
.env.*.local
logs
*.log
EOF

# 모든 파일 스테이징
git add .

# 첫 커밋
git commit -m "Initial commit: syeong-web pool report form"

# GitHub 원격 저장소 추가
git remote add origin https://github.com/goodnodes/syeong-web.git

# main 브랜치로 변경 (아직 main이 아니라면)
git branch -M main

# GitHub에 푸시
git push -u origin main
```

### 3단계: GitHub Pages 활성화

1. GitHub 저장소 페이지에서 **Settings** 클릭
2. 왼쪽 메뉴에서 **Pages** 클릭
3. **Source** 섹션에서:
   - Source: `GitHub Actions` 선택
4. 설정 자동 저장됨

### 4단계: 첫 배포 실행

#### 자동 배포 (권장):
```bash
# 아무 변경사항이나 추가 후
git add .
git commit -m "Trigger initial deployment"
git push origin main
```

#### 수동 배포:
1. GitHub 저장소 → **Actions** 탭
2. **Deploy to GitHub Pages** 워크플로우 클릭
3. **Run workflow** 버튼 클릭
4. `main` 브랜치 선택
5. **Run workflow** 확인

### 5단계: 배포 상태 확인

1. **Actions** 탭에서 워크플로우 실행 확인
2. 각 단계별 로그 확인:
   - ✅ Checkout
   - ✅ Setup Node.js
   - ✅ Install dependencies
   - ✅ Build
   - ✅ Upload artifact
   - ✅ Deploy to GitHub Pages

3. 배포 완료 후 접속:
   ```
   https://goodnodes.github.io/syeong-web/
   ```

## ⚙️ 환경 변수 설정 (선택사항)

API URL을 변경하려면:

### GitHub Secrets 추가

1. Repository → **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret** 클릭
3. Secret 추가:

   **Name:**
   ```
   VITE_API_BASE_URL
   ```

   **Value:**
   ```
   https://api.syeong.com
   ```
   (또는 원하는 API URL)

4. **Add secret** 클릭

## 🔧 로컬 빌드 테스트

배포 전 반드시 로컬에서 빌드 테스트:

```bash
# 의존성 설치
npm install

# 빌드 실행
npm run build

# 빌드 성공 확인
ls -la dist/

# 빌드 결과 미리보기
npm run preview
# ➜ http://localhost:4173
```

## 📊 배포 후 확인 사항

### ✅ 체크리스트

- [ ] Actions 탭에서 배포 성공 확인 (녹색 체크)
- [ ] 배포 URL 접속 확인
- [ ] 폼 입력 테스트
- [ ] API 연결 테스트
- [ ] 모바일/데스크톱 반응형 확인

### 🐛 문제 해결

#### 배포 실패 시

**1. Actions 로그 확인**
```
Repository → Actions → 실패한 워크플로우 클릭 → 에러 메시지 확인
```

**2. 로컬 빌드 테스트**
```bash
npm run build
```

**3. 의존성 재설치**
```bash
rm -rf node_modules package-lock.json
npm install
```

#### 404 에러 발생 시

**원인:** GitHub Pages 설정이 잘못됨

**해결:**
1. Settings → Pages
2. Source가 `GitHub Actions`인지 확인
3. 브랜치 변경 후 다시 `GitHub Actions`로 설정

#### API 연결 실패 시

**원인:** CORS 또는 환경 변수 문제

**해결:**
1. GitHub Secrets에 `VITE_API_BASE_URL` 확인
2. API 서버 CORS 설정 확인
3. 브라우저 개발자 도구 → Network 탭 확인

## 🔄 업데이트 배포

코드 변경 후 자동 배포:

```bash
# 변경사항 커밋
git add .
git commit -m "Update: feature description"

# GitHub에 푸시 (자동 배포 트리거)
git push origin main

# Actions 탭에서 배포 진행 상황 확인
```

## 📱 커스텀 도메인 설정 (선택사항)

### DNS 설정

```
Type: CNAME
Name: pool-report (또는 원하는 서브도메인)
Value: goodnodes.github.io
```

### GitHub Pages 설정

1. Settings → Pages
2. Custom domain에 도메인 입력
   ```
   pool-report.syeong.com
   ```
3. **Save** 클릭
4. **Enforce HTTPS** 체크

## 📞 도움이 필요하신가요?

- GitHub Actions 로그 확인
- 로컬 빌드 테스트
- [Issues](https://github.com/goodnodes/syeong-web/issues) 등록
- 팀에 문의

## 🎉 완료!

모든 설정이 완료되었습니다!

이제 `main` 브랜치에 푸시할 때마다 자동으로 배포됩니다.

**배포 URL:** https://goodnodes.github.io/syeong-web/
