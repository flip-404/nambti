## 브랜치 전략

- 모든 작업은 dev 브랜치에서 새로운 브랜치를 분기하여 진행합니다.
- 작업이 완료되면 dev 브랜치로 Pull Request(PR) 를 생성합니다.
- 코드 리뷰를 받은 후, dev 브랜치에 병합(Merge) 합니다.

## 디렉토리 구조

```bash
/src
├── app
│ ├── api # Next.js 서버 API 라우트
│ └── Other Directory # 파일 기반 페이지 라우팅
├── components # 공통 컴포넌트
├── hooks # 커스텀 React 훅
└── utils # 유틸리티/헬퍼 함수
```

## 기술 스택

- Next.js 15
- Tailwind CSS v4
- Zustand – 전역 상태 관리
