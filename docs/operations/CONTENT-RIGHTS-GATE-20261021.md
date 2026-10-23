# MEOWDE 콘텐츠·자산 권리 및 OOP 릴리스 게이트 — 2026-10-21 KST

## 범위와 판정
- 이 변경에서 새로 작성한 `object-collaboration`의 개념 설명·Label/Panel 예제·TaskLog/LogSummary 과제·예측 문제·힌트·평가기준·해설은 MEOWDE 전용 독립 창작물이다. 외부 강의의 구체적 문장·이미지·문항·정답·파일을 복제하지 않았다.
- `docs/python-learning-coverage.json`은 기존 **15개 제공 강의/노트 파일의 학습 목표 대응표**이며, 파일명·쪽수 기록이나 개념 참고가 콘텐츠 재이용 허가를 뜻하지 않는다. 원본 PDF/IPYNB를 공개 저장소나 정적 배포 번들에 추가하지 않는다.
- `docs/LINUX_CONTENT_REVIEW.md`는 식별 가능한 외부 기관 표기와 일부 원문 기반 Linux 과제를 이전에 제거했음을 기록한다. 이는 과거 배포·커밋과 잔여 자료의 완전한 권리 검증이 아니다.
- `docs/brand-assets.md`는 기존 6개 캐릭터 및 SVG의 원본 제작자·이용 허가 증빙이 **미확인**임을 밝힌다. 기존 자산을 보존하되 신규 마케팅/재판매 범위의 권리가 확인됐다고 주장하지 않는다.
- Pretendard 폰트의 라이선스 고지 보존 여부와 Pyodide 및 포함 패키지의 전체 의존성/라이선스 검토는 **미완료**다. 배포를 승인하기 전에 빌드·CDN·자산별 허용 범위와 고지 요건을 확인한다.
- 저장소 최상위 `LICENSE`는 이 기준 SHA에서 조회되지 않았다. 파일 부재만으로 권리 침해를 단정할 수 없으며, 코드·콘텐츠·이미지의 외부 재사용 허락 역시 추론하지 않는다.

## 출시 전 차단 조건
1. 특정 외부 강의·문항·이미지·정답·표현과 상당한 유사성이 의심되면 해당 항목을 **배포 대상에서 보류**, 출처와 허가를 확인하거나 새 시나리오로 대체한다. 문장 치환이나 출처 표시만으로 허가를 추정하지 않는다.
2. 이미지·폰트·라이브러리별 **원작자, 유래/취득 경로, 적용 라이선스, 용도 범위, 고지·귀속 조건, 증빙 링크**를 기록한다. 권리 확인 전 공개 마케팅 및 유료 상품 포함을 자동 승인하지 않는다.
3. CI/정적 테스트가 PASS여도 저작권 법률·라이선스 검증은 자동으로 PASS가 되지 않는다. 역사적 Git 기록이나 구버전 배포 문제는 별도 평가한다.
4. OOP 새 단원은 기존 `meowde-python-lab-v1` 저장 키와 기존 18개 단원 ID를 그대로 유지한다. 새 고유 ID만 추가한다. main/Production 또는 공개 별칭 변경은 작업별 명시 승인 후 실시한다.

## 이 변경의 QA
- 신규 OOP 합성 학습 목표: mutable class vs instance, shallow list copy vs contained object references.
- JSON 구조 검사/정적 스키마/추가된 6개 실행 기준, 브라우저에서 모델 코드 제출·오답 거절·새로고침 보존을 검증할 것.
- 이번 파일은 **검증 계획과 권리 위험 기록**이며, 독립 법률 의견이나 완전한 저작권 클리어런스가 아니다.


## 2026-10-21 추가 라이선스 감사 — 외부 원문 대조

| 항목 | 이번 확인 | 아직 필요한 확인 / 처리 |
|---|---|---|
| 새 `object-collaboration` 문제·해설·예제·테스트 | 이번 작업에서 독립 창작, 기존 교육 자료의 문제 문장·예제·정답·그림 미복제 | 다른 공개·사내 강의와의 전체 유사성 검사를 완료한 것은 아님 |
| 기존 Python 교육자료 15개 | `docs/python-learning-coverage.json`에 파일명/학습 목표/범위 대응이 존재. 이 대응표는 허가증이 아님 | 자료별 제공자, 저작권자, 제공 경위, 재이용·상업적 이용 범위. 원문 PDF/IPYNB, 세트 문제/정답 공개 금지 |
| 기존 Linux/로보틱스 자료 | `docs/LINUX_CONTENT_REVIEW.md`가 식별 가능한 기관 표기·원문 유래 공개 과제 제거 범위를 서술 | 모든 과거 Git 커밋·배포·포크, 남은 유사 문항과 실제 원저작물 대조는 미검증 |
| 기존 캐릭터 SVG 및 여섯 `assets/characters/v451/` WebP | 코드의 `approved` 명칭 및 기존 자산 기준 SHA는 있음 | **창작자·의뢰/양도 계약·AI 생성 도구 조건·상업적 변경/배포 허가 증빙 미확인**. 파일명과 웹 노출이 권리 증빙은 아님 |
| Pretendard 글꼴 v1.3.9 | 공식 배포본은 SIL Open Font License 1.1, 저작자·Reserved Font Name 및 복제/재배포 조건을 명시함. [배포 LICENSE](https://github.com/orioncactus/pretendard/blob/main/packages/pretendard/dist/LICENSE.txt) | 현재 실제 로드되는 CDN 파일·고지 제공·자체 호스팅 여부, 배포본과 원저작권 표시 일치 검증. OFL의 상업적 사용 허용과 고지 의무를 구분 |
| Pyodide v0.28.0 | 공식 [프로젝트 문서](https://pyodide.org/en/0.28.0/project/about.html)는 핵심 Pyodide 프로젝트를 **Mozilla Public License 2.0**으로 표시함 | 런타임이 가져오는 CPython·NumPy·pandas·Matplotlib·기타 번들 패키지의 각각 다른 라이선스, 고지 의무, 수정/배포 형태 감사 미완료 |
| jsDelivr CDN | [2026-05-30 이용조건](https://github.com/jsdelivr/jsdelivr/blob/master/Terms%20of%20Use.md)은 조건 준수 시 상업적 CDN 사용을 허용하며, 원호스팅 플랫폼의 라이선스/약관도 따를 것을 요구함 | CDN 약관은 배포된 외부 코드·폰트·이미지의 저작권 이용 허가를 대체하지 않음 |
| Playwright 1.62.1 | 현 저장소 `package.json`의 테스트 개발 의존성; 배포 앱에 번들된다는 증거 없음 | 실제 배포 트리와 전이 의존성 고지 요구 확인 |
| MEOWDE 저장소 최상위 LICENSE | 현재 기준 브랜치에 `LICENSE` 404 | 프로젝트 전체 소스/자산 재사용 권리·기여자 계약 분리 정리. 라이선스 파일 부재가 침해 입증은 아님 |

**확인 범위 한계:** 이 감사는 접근 가능한 저장소 파일, 기존 보존 기록, 상기 공식 외부 라이선스 문서 중심이며 **공개 저장소 전체와 과거 배포 아티팩트를 법률적으로 완전 조사한 결과가 아니다.** 새로운 재배포·상업화 이전에 권리 자료를 연결하고 미확인 콘텐츠는 제외 또는 독창적 대안으로 교체한다. 외부 폰트/라이브러리의 오픈소스 라이선스 확인이 기존 캐릭터나 강의자료 사용 허가를 보증하지 않는다.

## 2026-10-21 공식 원문 추가 확인 — 권리 확인과 배포물 고지는 별도

- Pretendard 공식 [원본 저장소 LICENSE](https://github.com/orioncactus/pretendard/blob/main/packages/pretendard/dist/LICENSE.txt)는 **SIL Open Font License 1.1**, Reserved Font Name Pretendard, 복제·번들 배포 시 저작권 및 라이선스 고지 포함 조건을 명시한다. 공식 [README](https://github.com/orioncactus/pretendard/blob/main/packages/pretendard/README.md)도 상업적 사용·재배포 허용을 설명한다. **라이선스 유형 확인**, 실제 MEOWDE CDN 로드 자산에 고지가 충분히 제공되는지는 별도 **미검증**. 폰트 파일을 새로 재배포하거나 보호 조건을 변경하지 않았다.
- Pyodide **0.28.0** 공식 [프로젝트 문서](https://pyodide.org/en/0.28.0/project/about.html)는 **MPL-2.0**을 밝힌다. 공식 [배포 패키지 목록](https://pyodide.org/en/0.28.0/usage/packages-in-pyodide.html)은 Pyodide가 수많은 서드파티 패키지를 포함한다고 명시하지만, 목록 자체는 각 패키지의 라이선스 허가증이나 현재 앱의 런타임 로드 목록은 아니다. **Pyodide 자체 라이선스 확인**, 현재 앱이 로드하는 개별 패키지·전이 의존성·고지·CDN 제공 조건은 **미검증**.
- Preview 테스트의 정상 인증 경로는 기존 Vercel 인증 상태의 `vc curl <full-preview-url>` 또는 **짧은 수명 개발 OIDC 토큰을 인증 브라우저의 요청 헤더에만 적용**하는 방법이다. 이 실행 환경에는 `vc` 인증 CLI/브라우저 조작 기능이 없으며, 배포 보호 설정·우회 토큰·공유 링크·별칭을 변경하지 않았다. 보호 여부를 직접 HTTP 상태 코드로 입증하지 못했으므로 **Preview 실사용 접근 미검증**.
