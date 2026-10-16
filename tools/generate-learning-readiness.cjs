'use strict';
const fs=require('node:fs');
const {load}=require('./effective-curriculum.cjs');
const data=load();
const python=data.ko.map((lesson,index)=>({number:index+1,id:lesson.slug,title:lesson.title,enTitle:data.en[index].title,focus:lesson.focus||[],implementation:'개념·문제·작성형 실습 구현',verification:'작성형 정답·오답 자동 실행 검사 / 단원 전체 학습 검증 필요'}));
const linux=[
 {id:'mkdir-intro',title:'첫 폴더 만들기',implementation:'개념 → 예제 → 직접 작성 → 다른 이름에 적용',verification:'실제 브라우저 정답·오답·재시도·저장 검사',href:'/linux-start.html'},
 {id:'linux-e1',title:'E1 · 위치와 파일',implementation:'개념·퀴즈 + 폴더·파일 생성·복사 실습',verification:'제한된 시뮬레이터 자동 검사',href:'/linux-crash-course.html'},
 {id:'linux-e2',title:'E2 · 파일 읽기',implementation:'개념·퀴즈 + 마지막 줄 읽기 실습',verification:'tail 정답·head 오답 브라우저 검사',href:'/linux-crash-course.html'},
 {id:'linux-e3',title:'E3 · 찾기와 검색',implementation:'개념·퀴즈 + 로그 검색 실습',verification:'검색 결과 자동 검사',href:'/linux-crash-course.html'},
 ...[['e4','파이프와 텍스트'],['e5','권한'],['e6','프로세스'],['e7','패키지']].map(([id,title])=>({id:'linux-'+id,title:id.toUpperCase()+' · '+title,implementation:'개념·퀴즈만 제공 / 실행 실습 준비 중',verification:'실제 실행 실습 미구현',href:'/linux-crash-course.html'})),
 {id:'linux-e8',title:'E8 · 셸 스크립트',implementation:'변수 개념·퀴즈 + 숫자 조건 흐름 관찰',verification:'일반 셸 스크립트 실행 미지원',href:'/linux-crash-course.html'},
 {id:'linux-e9',title:'E9 · 조건문',implementation:'개념·퀴즈 + 제한된 if/else 직접 작성',verification:'여러 경계값·오답 자동 검사',href:'/linux-crash-course.html'}
];
const missingPython=['외부 패키지 설치·네트워크 API 실행','힌트 없이 낯선 문제를 푸는 독립 역량 평가','모든 레슨의 실제 초보자 학습 검증','출력 첫 개념 외의 단원별 집중 복습 (출력 개념 파일럿은 제공)'];
const missingLinux=['터미널 편집기 직접 사용','권한·소유권 상태 실습','프로세스 제어 실습','파이프·리다이렉션 상태 실습','셸 반복문','종합 실습·방탈출','폴더 만들기 외의 단원별 집중 복습 (첫 폴더 개념 파일럿은 제공)'];
const report={schemaVersion:1,sourceBase:'c06f6444abe270ecfd190f5df27b8c3ce9bb578c',python,linux,missingPython,missingLinux,warning:'자동 실행·구조 검사 통과는 단원 전체의 교육 품질 검증이나 독립 프로그램 작성 역량을 의미하지 않아요.'};
fs.writeFileSync('assets/learning-readiness.json',JSON.stringify(report,null,2)+'\n');
console.log('Generated '+python.length+' Python and '+linux.length+' Linux implemented-unit records, with incomplete scope disclosed.');
