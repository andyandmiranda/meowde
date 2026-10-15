# MEOWDE 브랜드 기준 자산

기준일: 2026-10-15 KST. 이번 변경은 캐릭터·색상 체계·성장 시스템을 전면 개편하지 않는다.

## 기존 기준 자산

| 파일 | 코드의 버전 표기·용도 | SHA-256 |
|---|---|---|
| `assets/meowde-approved-headphones.svg` | `?v=450`, Linux 홈·레슨 / Python 학습 장면 | `61df1df71589c6b8383f79fa6b5530be3ca23fec6a524cf906a795cb4067097f` |
| `assets/meowde-approved-base.svg` | `?v=450`, Python 브랜드·복습 | `2ab293699202c44fc8247db4eaef8b8ba0f85ebd09b5698cd7377ef78643603d` |
| `assets/meowde-approved-glasses.svg` | `?v=450`, Python 복습 장면 | `b048ea6cee1a14898f924961e662132468f98ffdaba2c3817b16e5c0beb845fa` |
| `assets/meowde-approved-hero.svg` | 기존 hero 자산, SW 캐시 목록에 유지 | `8f526c63f77f036eed135d65fcd0dda5c78ceaa7bb7cdb98adbe371de4311563` |

상태: 파일명과 기존 코드에서 `approved`로 관리하는 기존 기준 자산이며 이번 작업에서 그대로 재사용한다. PO 공통 지침은 기존 승인 캐릭터 보존과 헤드폰 선호를 명시한다. 개별 자산의 최초 승인자·승인일·원본 제작 이력·권리 증빙은 이번 확인에서 찾지 못했으므로 새로 확정하지 않는다. 파일명만으로 라이선스를 증명하지 않는다.

`assets/characters/v451/` 이미지와 기존 아이콘도 변경하지 않았다. 원본 이미지·제작 도구·외부 기여가 있는 경우 권리 문서를 추가 확인해야 한다. 이 문서는 모든 자산을 법적으로 검증했다는 보고서가 아니다.

## 외부 의존성과 확인 범위

- Pretendard는 기존 고정 버전 `v1.3.9` CDN 참조를 유지한다. [프로젝트 LICENSE](https://github.com/orioncactus/pretendard/blob/main/LICENSE)에서 SIL OFL 1.1 표기를 2026-10-15 확인했다. 배포본의 저작권·라이선스 고지 보존 상태까지 모두 대조한 것은 아니다. 자체 호스팅·수정·재배포 시 배포본별 고지를 확인한다.
- Pyodide `v0.28.0`은 기존 Python 브라우저 실행 의존성이다. 새 Linux 시뮬레이터는 Pyodide나 실제 셸을 실행하지 않는다. Pyodide와 포함 패키지 전체의 라이선스 목록 확인은 별도 잔여 점검이다.
- 브라우저 검증 도구 Playwright `1.62.1`은 개발 의존성으로만 추가하며 `pnpm-lock.yaml`에 고정한다. 사용자 앱으로 번들하지 않는다.
- 외부 기관 표기와 출처 미확인 Linux 과제 제거 범위는 [LINUX_CONTENT_REVIEW.md](LINUX_CONTENT_REVIEW.md)를 참조한다. 과거 커밋·과거 배포를 삭제하거나 권리 검토가 끝났다고 주장하지 않는다.

## 남은 PO·권리 확인

기존 캐릭터 원본과 이용 권한의 증빙 위치를 확인하여 이 문서에 연결한다. 증빙이 없다는 이유로 임의 캐릭터로 교체하지 않는다. 유료·공개 상용 홍보 전 필요한 권리 확인을 마친다.
