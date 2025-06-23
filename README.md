## 브랜치 전략

모든 작업은 dev 브랜치에서 분기합니다.
작업 완료 후, 다시 dev 브랜치로 병합(Merge)합니다.

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
