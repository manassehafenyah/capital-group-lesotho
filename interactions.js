
(()=>{
 const button=document.getElementById('motion-toggle');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let paused=false;
 const sync=()=>{document.documentElement.classList.toggle('motion-paused',paused);button.disabled=reduced.matches;button.textContent=reduced.matches?'Reduced motion enabled':paused?'Play animations':'Pause animations';button.setAttribute('aria-pressed',String(paused||reduced.matches));};
 button.addEventListener('click',()=>{paused=!paused;sync();});reduced.addEventListener('change',sync);sync();
 function openModule(){const id=location.hash.slice(1);const el=document.getElementById(id);if(el&&el.matches('details.module'))el.open=true;}
 document.querySelectorAll('.menu-tile').forEach(a=>a.addEventListener('click',()=>{const el=document.querySelector(a.getAttribute('href'));if(el)el.open=true;}));window.addEventListener('hashchange',openModule);openModule();
 document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelector('.cta-menu')?.removeAttribute('open');});
})();

(()=>{const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav-links');function close(){toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');nav.classList.remove('is-open')}toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav.classList.toggle('is-open',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});document.addEventListener('click',e=>{if(!e.target.closest('.nav'))close()});})();

(()=>{const dropdown=document.querySelector('.services-dropdown');const trigger=dropdown.querySelector('summary');dropdown.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{const el=document.querySelector(a.getAttribute('href'));if(el?.matches('details.module'))el.open=true;dropdown.open=false}));document.addEventListener('click',e=>{if(!dropdown.contains(e.target))dropdown.open=false});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&dropdown.open){dropdown.open=false;trigger.focus()}});})();
