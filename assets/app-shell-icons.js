/* Identical five-tab SVG icon outlines on standalone and Linux pages.
   Python root already renders these same paths with icon(). */
(function(){
'use strict';
const routes={
 '홈':'M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10.5z',
 '학습':'M9 18l-6 3V6l6-3 6 3 6-3v15l-6 3-6-3zM9 3v15M15 6v15',
 '심화':'M8 9l-4 3 4 3M16 9l4 3-4 3M14 5l-4 14',
 '함께':'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
 '마이':'M20 21a8 8 0 0 0-16 0M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10'
};
for(const nav of document.querySelectorAll('.meowde-lab-tabbar,.linux-tabbar')){
 for(const link of nav.querySelectorAll('a')){
  const path=routes[link.getAttribute('aria-label')];if(!path)continue;
  const holder=link.querySelector('.lab-nav-icon')||link.querySelector('span:first-child');if(!holder)continue;
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('class','meowde-tab-icon');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('aria-hidden','true');
  const p=document.createElementNS('http://www.w3.org/2000/svg','path');p.setAttribute('d',path);svg.append(p);
  holder.replaceChildren(svg);
 }
}
})();
