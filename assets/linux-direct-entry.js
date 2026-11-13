(function(){
'use strict';
const requested=Number(new URLSearchParams(location.search).get('lesson'));
if(!Number.isInteger(requested)||requested<1||requested>9)return;
const button=document.querySelectorAll('#nav button')[requested-1];
if(button)button.click();
})();
