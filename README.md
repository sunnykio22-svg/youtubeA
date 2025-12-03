# YouTube 대본 생성기

기존 대본을 입력하면 AI가 연관된 주제를 추천하고, 선택한 주제로 새로운 대본을 자동 생성하는 웹 애플리케이션입니다.

## 주요 기능

### 📝 선형적인 워크플로우
1. **대시보드** - 저장된 대본 목록 확인
2. **입력 단계** - 기존 대본 입력
3. **주제 추천** - AI가 3~5개의 연관 주제 생성
4. **주제 선택** - 원하는 주제 1개 선택
5. **대본 생성** - 서론-본론-결론 구조의 새 대본 자동 생성
6. **편집 및 저장** - 생성된 대본 수정 후 저장

### 💾 데이터 저장
- LocalStorage를 사용한 브라우저 기반 저장
- 제목, 날짜, 내용 자동 저장

## 설치 방법

### 1. Node.js 설치
먼저 Node.js가 설치되어 있어야 합니다.
- [Node.js 공식 사이트](https://nodejs.org/)에서 LTS 버전 다운로드
- 설치 후 터미널에서 확인:
  ```bash
  node --version
  npm --version
  ```

### 2. 프로젝트 의존성 설치
```bash
npm install
```

## 실행 방법

### 개발 모드 실행
```bash
npm run dev
```

브라우저에서 표시되는 주소(예: http://localhost:5173)로 접속하세요.

### 프로덕션 빌드
```bash
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

## 프로젝트 구조

```
YoutubeA/
├── src/
│   ├── components/          # React 컴포넌트
│   │   ├── Dashboard.jsx    # 대시보드 (대본 목록)
│   │   ├── ScriptInput.jsx  # 대본 입력 단계
│   │   ├── TopicSelection.jsx  # 주제 선택 단계
│   │   ├── ScriptEditor.jsx    # 대본 편집 단계
│   │   └── *.css            # 각 컴포넌트 스타일
│   ├── services/
│   │   └── aiService.js     # AI API 서비스 (주제 추천, 대본 생성)
│   ├── utils/
│   │   └── storage.js       # LocalStorage 관리
│   ├── App.jsx              # 메인 앱 컴포넌트
│   ├── App.css              # 전역 스타일
│   ├── main.jsx             # 진입점
│   └── index.css            # 기본 스타일
├── index.html
├── package.json
└── vite.config.js
```

## AI API 연동 방법

현재 `src/services/aiService.js`에는 더미 데이터가 구현되어 있습니다.

실제 AI API를 연동하려면:

### OpenAI API 사용 예시
```javascript
export async function generateTopics(originalScript) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer YOUR_API_KEY`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{
        role: 'user',
        content: `다음 대본을 분석하고 연관된 주제 5개를 추천해주세요:\n\n${originalScript}`
      }]
    })
  });
  const data = await response.json();
  // 응답 파싱 후 주제 배열 반환
}
```

### 환경 변수 설정
`.env` 파일을 생성하여 API 키를 안전하게 관리하세요:
```
VITE_OPENAI_API_KEY=your_api_key_here
```

코드에서 사용:
```javascript
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
```

## 사용 방법

1. **새 대본 만들기** 버튼 클릭
2. 기존 대본 텍스트 입력 또는 붙여넣기
3. **주제 추천받기** 버튼 클릭 (AI가 5개 주제 생성)
4. 원하는 주제 1개 선택
5. **이 주제로 대본 생성** 버튼 클릭
6. 생성된 대본 확인 및 수정
7. 제목 입력 후 **저장하기** 버튼 클릭
8. 대시보드에서 저장된 대본 확인

## 기술 스택

- **React 18** - UI 라이브러리
- **Vite** - 빌드 도구
- **CSS3** - 스타일링
- **LocalStorage** - 데이터 저장

## 주요 특징

- ✅ 단순하고 직관적인 선형 워크플로우
- ✅ 단계별 진행 상태 관리
- ✅ 반응형 디자인
- ✅ 로컬 데이터 저장
- ✅ AI 기반 주제 추천 및 대본 생성
- ✅ 실시간 대본 편집

## 라이선스

MIT License
