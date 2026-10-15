# MEOWDE 확인된 현황

확인일: 2026-10-15 KST. 상태는 이 변경 묶음의 범위에 한정한다. 최신 커밋·CI·Preview 결과는 [PR #83](https://github.com/andyandmiranda/meowde/pull/83)을 함께 확인한다.

## 문제·목표·범위

- Problem: Linux 첫 레슨은 새로고침 시 진행·완료가 사라졌고, 한 번 생성한 폴더가 남아 다음 오답도 통과할 수 있었다. 과목 이동과 루트 URL 수정은 별도 미병합 PR에 분산되어 있었다.
- Outcome: 입문자가 Linux 첫 미션을 결과로 검증받고 다음 날 이어갈 수 있으며, Python 세션과 과거 Linux 기록을 보존한다.
- Scope: #83의 기존 Linux 흐름에 검증된 로컬 진도 저장·저장 실패 안내·대안 명령 지원을 추가하고 Python↔Linux 이동 및 root rewrite를 통합한다. 사용자·고객 연구 실행 자료와 공통 기록을 마련한다.
- Non-goals: 새 과목, 계정 동기화, 결제, 브랜드 전면 개편, 실제 셸 실행, 자동화·다른 대화 메시지, main 병합·Production 반영.
- 수용 기준: 빈 입력·오답은 통과 불가; 정당한 지원 문법은 결과로 채점; 새로고침·재방문 시 위치/답안 복구; 기존 키 보존; 모바일·키보드 사용 가능; 실행하지 않은 실제 기기 명령을 성공으로 표시하지 않음.

## 역할·승인

Primary Owner: Product & Engineering Lead(이 작업의 Codex). Reviewer: 같은 AI의 UX·Content QA·Quality/Security 관점 검토. Validator: 같은 AI가 실행한 Node·브라우저 검사 및 GitHub CI. 독립 전문가·실제 입문자 검증은 아직 없다. Decision Owner: PO.

작업 승인은 [결정 기록](project-decisions.md)에 명시한다. Production 승인 없음.

## 확인된 배포 기준

| 대상 | 확인 사실 | 검증 한계 |
|---|---|---|
| main | `ebdb63cc70a1525366ee12573def4b2296119543` | GitHub 커밋·PR 기준 |
| Production | `dpl_6URzxTZnULt9Ugj1r1WwWpfd19Zw`, 위 main SHA, READY | Vercel 메타데이터 확인. 이번 작업의 운영 사용자 경험 정상 판정이 아님 |
| 공식 Production alias | `https://meowde.vercel.app` | Vercel alias 확인. `moewde.vercel.app`은 다른 철자이며 조회 시 DEPLOYMENT_NOT_FOUND 반환. 공식 진입 링크에 사용하지 않음 |
| #83 시작점 | `3e92cdc88f4df21d58bf0105095e8024567a1a52` | 최종 head·Preview는 PR에서 재확인 |

추가 통합 기준: `8dccd69c2164f6ca5ad0d9608e0cb0a2442f5707`의 공개 콘텐츠 검증 진입점도 보존했다. 작업 중 #83이 `176359f211ce22854f317ac3bfdcf5cbf781327f`로 전진하여, E9 배터리 시나리오·E2/E3 예시·스타일·출처 검토를 보존했다. 원격의 root redirect 제거 의도는 기존 Python bootstrap을 유지하는 내부 rewrite로 통합했다.

## 이번 로컬 검증

| 검증 | 결과·환경·범위 |
|---|---|
| package.json validate | 통과: 19개 순차 검증 진입점. 교육 데이터·기존 저장·로더·Linux 시뮬레이터·새 저장 및 root 검사 포함 |
| 기존 추가 검사 | 통과: Phase 2/3/4/5 검증 10개 + runtime fallback 검사 |
| 실제 브라우저 | 통과: Windows의 headless Google Chrome, Playwright 1.62.1, 로컬 24개 테스트 |
| 브라우저 핵심 범위 | 정답 후 오답 회귀, 대안 명령, 재진입·단계·입력·검증된 완료 복구, 손상 저장 원본 보존·용량 초과 안내, 과목 이동/자동 Python 복귀, 기존 키 동일성, root·구버전 진입, SW 설치 후 오프라인 Linux 복귀, 퀴즈/검색 미션 |
| Python 실제 실행 | 통과: 첫 레슨 개념→예측→빈칸→오류찾기→직접 작성, 실제 Pyodide로 `print("야옹")` 출력 확인. 가짜 실행 엔진을 사용하지 않음 |
| 반응형·키보드 | 통과: 320/375/390/768px 화면 가로 넘침 검사. 키보드 Linux 진입·단계 제목 포커스·입력·Enter 제출. 스크린리더 판정은 아님 |
| 화면 검토 | 통과: Linux 개념·정답 입력 화면 캡처를 육안 검토. 모든 화면의 시각적 품질 보장을 뜻하지 않음 |
| Hosted Preview E2E | 미실행: 최종 업로드·배포 뒤 PR 결과에 별도 기록 |
| 최종 head CI | 미실행: 업로드 뒤 PR의 정확한 head에서 별도 확인 |
| 실제 iOS/Safari·소프트 키보드·스크린리더 | 미실행 |
| 입문자 관찰·고객 인터뷰 | 미실행: [입문자 실행안](research/novice-study.md), [고객 검증안](research/customer-discovery.md) 준비 |

로컬 테스트에서 실제 화면 문구·자동 복귀 동작에 맞지 않았던 테스트 선택자를 수정한 뒤 최종 24개가 통과했다. 최초 실패를 제품 결함 수정으로 잘못 보고하지 않는다. 기존 경고(레거시 교육 데이터 차이·기존 미등록 보조 저장 키)는 suite 출력에 남아 있으며 전체 저장 감사 완료를 뜻하지 않는다.

## 미해결 사항·출시 위험

1. 실제 초보자의 학습 효과·재방문 이유·지불 근거는 미확인이다. 관찰안을 준비했으나 참여자·고객 결과를 생성하지 않았다.
2. 기존 캐릭터의 원본 제작·권리 증빙은 미확인. 기존 자산을 보존하고 [브랜드 기록](brand-assets.md)에 확인 범위를 명시했다. 폰트 라이선스 표기 확인과 전체 권리 검증은 구분한다.
3. 새 저장은 로컬 브라우저 단위다. 동기화·브라우저 데이터 삭제 후 복구·동시 여러 탭 충돌 해결은 제공하지 않는다. [저장 설계](learning-data.md)를 참조한다.
4. Python 실행은 기존 `v412-hotfix.js`/`v454-input-practice.js`의 브라우저 Pyodide 경로를 유지한다. 본 작업에서 Worker 기반 격리, 실행 시간·메모리 제한, Python↔JS/네트워크 권한 통제를 구현·검증하지 않았다. 운영 서버에서 Python을 실행하지는 않지만 강한 격리나 악성 코드 안전성을 보장하지 않는다. 실제 실행 안전성 보강은 별도 우선 작업으로 남는다.
5. 선택적 Linux 라이브러리는 일부 개념에 실제 대응 미션이 없다. 예시 명령 확인은 제한된 문자열 목록이며 결과 기반 실행과 다르다. 첫 레슨 및 파일 미션의 채점 통과를 전체 Linux 교육 검증으로 확대하지 않는다.
6. Preview는 Vercel 인증 보호가 설정되어 있다. 보호 설정·접근 권한을 임의로 완화하지 않는다. 인증된 실제 Preview 검증 결과를 릴리스 근거에 추가해야 한다.

## 다음 우선순위

최종 head CI 및 Hosted Preview 검증 → 확인된 결함 보완 → 실행 안전·권리 등 출시 잔여 위험을 포함해 PO 검토 → 승인된 경우에만 Production 반영·운영 확인. 그와 별도로 실제 입문자와 고객 관찰을 시행한다. 새 대규모 기능·다른 과목·과금은 근거 없이 확정하지 않는다.

## 롤백

이번 묶음은 Draft PR에서 검토한다. Production은 기존 상태를 유지한다. 추후 출시가 승인되면 위 기존 배포를 복귀 기준으로 확보하고, 실패 시 배포 되돌리기와 root·Python 재진입을 확인한다. 새 로컬 저장 키는 남겨 두며, 기존 키 삭제·역마이그레이션은 하지 않는다. SW 캐시 교체와 학습 기록은 별도다.
