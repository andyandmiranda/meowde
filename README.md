# MEOWDE

일반 입문자를 위한 Linux·Python 게임형 학습 웹앱. 정적 HTML/JavaScript이며 Python은 브라우저 Pyodide, Linux는 제한된 메모리 시뮬레이터를 사용한다. Linux 입력을 실제 셸이나 기기에 실행하지 않는다.

## 개발·검증

Node.js 24, pnpm 11.25.0을 사용한다.

```sh
pnpm install --frozen-lockfile --ignore-scripts
pnpm validate
pnpm exec playwright install chromium
pnpm test:browser
pnpm preview:local
```

로컬 주소는 `http://127.0.0.1:4173`. `/`는 기존 `/v412.html` bootstrap을 내부 제공하며 `/index.html`을 직접 열면 전체 enhancement 경로와 다르다. 기존 `/v412.html` URL도 유지한다. 테스트 실행기는 별도 로컬 서버를 자동 실행한다.

설치된 Chrome으로 검사하려면 `MEOWDE_BROWSER_CHANNEL=chrome`을 설정한다. 배포 환경 검증은 `MEOWDE_BASE_URL`에 정확한 Preview origin을 지정한다. Vercel 인증을 통과한 접근 경로가 먼저 필요하며 비밀 헤더·인증 쿠키를 저장소나 진단 파일에 남기지 않는다. 실제 Python 실행 검사는 Pyodide CDN 연결이 필요하다. Linux 오프라인 복귀 검사는 같은 origin에서 서비스 워커 설치 후 수행한다.

## 프로젝트 자료

- [운영 기록](docs/OPERATIONS.md), [현황·검증·남은 위험](docs/project-status.md)
- [결정·승인 기록](docs/project-decisions.md), [브랜드 기준 자산](docs/brand-assets.md)
- [학습 기록·복구](docs/learning-data.md), [Linux 콘텐츠 검토](docs/LINUX_CONTENT_REVIEW.md)
- [입문자 관찰 실행안](docs/research/novice-study.md), [고객·사업 검증 실행안](docs/research/customer-discovery.md)

코드·CI·Preview·Production은 별도 상태다. Production 반영은 정확한 변경 묶음과 검증 결과에 대한 PO 승인을 받은 뒤 진행한다.
