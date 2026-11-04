/* Opt-in MEOWDE shared shell. Does not touch learning state. */
(function(root){"use strict";
const subjects=Object.freeze({
python:{label:"Python",home:"/?tab=home",learn:"/?tab=map",deepen:"/python-lab.html?view=overview"},
linux:{label:"Linux",home:"/linux-home.html?tab=home",learn:"/linux-home.html?tab=learn",deepen:"/linux-crash-course.html?view=concept"},
ml:{label:"ML",home:"/ml-foundations.html",learn:"/ml-foundations.html",deepen:"/ml-foundations.html"},
dl:{label:"DL",home:"/deep-learning.html",learn:"/deep-learning.html#units",deepen:"/deep-learning.html#units"}
});
function hrefs(subject){const s=subjects[subject];if(!s)throw Error("Unknown subject");return {home:s.home,learn:s.learn,deepen:s.deepen,together:"/together.html?subject="+subject,my:"/?tab=my"};}
function mount(host,subject,active="learn"){if(!host||!host.ownerDocument)throw Error("DOM host required");const doc=host.ownerDocument,links=hrefs(subject),shell=doc.createElement("section");shell.className="meowde-common-shell";shell.setAttribute("aria-label","MEOWDE 공통 학습 구조");
const header=doc.createElement("header");header.className="meowde-common-header";const brand=doc.createElement("strong");brand.textContent="MEOWDE";header.append(brand);
const select=doc.createElement("select");select.setAttribute("aria-label","과목 선택");Object.entries(subjects).forEach(([key,s])=>{const o=doc.createElement("option");o.value=key;o.textContent=s.label;select.append(o);});select.value=subject;select.addEventListener("change",()=>root.location.assign(hrefs(select.value).learn));header.append(select);shell.append(header);
const map=doc.createElement("a");map.href=links.learn;map.className="meowde-common-map";map.textContent="학습 지도 보기";shell.append(map);
const nav=doc.createElement("nav");nav.className="meowde-common-tabs";nav.setAttribute("aria-label","MEOWDE 메인 메뉴");[["home","홈"],["learn","학습"],["deepen","심화"],["together","함께"],["my","마이"]].forEach(([id,label])=>{const a=doc.createElement("a");a.href=links[id];a.textContent=label;if(active===id)a.setAttribute("aria-current","page");nav.append(a);});shell.append(nav);host.append(shell);return shell;}
root.MeowdeCommonShellV1=Object.freeze({subjects,hrefs,mount});
})(typeof window==="undefined"?globalThis:window);