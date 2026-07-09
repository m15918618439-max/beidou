const nav=document.getElementById('nav');
addEventListener('scroll',()=>{nav.classList.toggle('scrolled',scrollY>30)});

// ---- router ----
const pages=['home','agent','products','solutions','sol-traffic','sol-safety','sol-property','sol-public','sc-rail','sc-hub','sc-highway','sc-railpolice','sc-border','sc-residential','sc-commercial','sc-office','sc-park','sc-gov','sc-hospital','sc-school','tech','t-perception','t-worldmodel','t-event','t-knowledge','t-agentsys','t-execution','about'];
const sectionRoutes={'t-stack':['tech','t-stack'],'t-flywheel':['tech','t-flywheel'],'t-asset':['tech','t-asset'],'t-cert':['tech','t-cert']};
const pageTitles={
  home:'北斗智能 · 空间智能体 | 值得信赖的行业 AI 赋能专家',
  agent:'空间智能体 | 北斗智能',
  products:'产品体系 | 北斗智能',
  solutions:'行业解决方案 | 北斗智能',
  tech:'核心技术 | 北斗智能',
  about:'关于我们 | 北斗智能'
};
function showPage(id,scrollTo){
  if(sectionRoutes[id]){const [page,section]=sectionRoutes[id];showPage(page,section);return;}
  if(!pages.includes(id))id='home';
  document.title=pageTitles[id] || (id.startsWith('sol-')||id.startsWith('sc-') ? '行业解决方案 | 北斗智能' : id.startsWith('t-') ? '核心技术 | 北斗智能' : '北斗智能 · 空间智能体');
  document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id==='page-'+id));
  // 二级页时，父级导航保持高亮
  let navKey = (id.startsWith('sol-')||id.startsWith('sc-')) ? 'solutions' : id;
  if(id.startsWith('t-')) navKey='tech';
  document.querySelectorAll('.nav-links a').forEach(a=>a.classList.toggle('active',a.dataset.nav===navKey));
  // reset reveals in newly shown page then observe
  const cur=document.getElementById('page-'+id);
  applyRevealStagger(cur);
  cur.querySelectorAll('.reveal').forEach(el=>{el.classList.remove('in');io.observe(el)});
  cur.querySelectorAll('[data-count]').forEach(el=>{co.observe(el)});
  if(id==='home')setTimeout(initHeroLight,80);
  if(id==='home'||id==='products')setTimeout(()=>document.querySelectorAll('.emp-grid').forEach(t=>t._empUpdate?.()),100);
  if(scrollTo){const t=document.getElementById(scrollTo);if(t){setTimeout(()=>t.scrollIntoView({behavior:'smooth'}),60);return;}}
  window.scrollTo({top:0,behavior:'instant'in window?'instant':'auto'});
}
function nav2(id){location.hash=id;}
document.querySelectorAll('a[data-nav]').forEach(a=>{if(!a.hasAttribute('href'))a.setAttribute('href','#'+a.dataset.nav);});
document.querySelectorAll('a[data-scroll]').forEach(a=>{if(!a.hasAttribute('href'))a.setAttribute('href','#'+a.dataset.scroll);});
document.addEventListener('click',e=>{
  const n=e.target.closest('[data-nav]');
  if(n){e.preventDefault();nav2(n.dataset.nav);return;}
  const s=e.target.closest('[data-scroll]');
  if(s){e.preventDefault();const t=document.getElementById(s.dataset.scroll);if(t)t.scrollIntoView({behavior:'smooth'});}
});
addEventListener('hashchange',()=>showPage(location.hash.slice(1)));

// ---- reveal ----
const io=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
// ---- counters ----
function animateCount(el){
  const target=+el.dataset.count;const suffix=el.dataset.suffix||'';const inner=el.querySelector('.u');
  const dur=1400;const t0=performance.now();
  if(inner&&(!el.firstChild||el.firstChild.nodeType!==3)){el.insertBefore(document.createTextNode('0'),inner);}
  function step(now){const p=Math.min((now-t0)/dur,1);const eased=1-Math.pow(1-p,3);const val=Math.round(target*eased);
    if(inner){el.firstChild.nodeValue=val.toLocaleString();}else{el.textContent=val.toLocaleString()+suffix;}
    if(p<1)requestAnimationFrame(step);}
  requestAnimationFrame(step);
}
const co=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){animateCount(e.target);co.unobserve(e.target)}})},{threshold:.5});

function applyRevealStagger(root=document){
  root.querySelectorAll('.cards-3,.emp-grid,.mgrid,.sol-grid,.cap6,.tech3,.asset4,.contact-grid,.sol-entry,.metric-row').forEach(group=>{
    Array.from(group.children).forEach((el,i)=>el.style.setProperty('--stagger',`${Math.min(i*70,420)}ms`));
  });
}

function initSpotlightCards(root=document){
  const selector='#page-home .pcard,#page-home .layer,#page-home .emp,#page-home .mcell,#page-home .sol,#page-home .ccard';
  root.querySelectorAll(selector).forEach(card=>{
    if(card.dataset.spotlightReady)return;
    card.dataset.spotlightReady='true';
    card.classList.add('spotlight-card');
    card.addEventListener('pointerenter',()=>card.classList.add('is-lit'));
    card.addEventListener('pointerleave',()=>{
      card.classList.remove('is-lit');
      card.style.setProperty('--mx','50%');
      card.style.setProperty('--my','50%');
    });
    card.addEventListener('pointermove',e=>{
      const rect=card.getBoundingClientRect();
      card.style.setProperty('--mx',`${e.clientX-rect.left}px`);
      card.style.setProperty('--my',`${e.clientY-rect.top}px`);
    });
  });
}

function initHeroLight(){
  const hero=document.querySelector('#page-home .hero');
  if(!hero)return;
  if(hero.dataset.lightReady){hero._resizeLight?.();return;}
  hero.dataset.lightReady='true';
  const canvas=hero.querySelector('.hero-light-canvas');
  const ctx=canvas ? canvas.getContext('2d',{alpha:true}) : null;
  const pointer={x:.78,y:.24};
  const target={x:.78,y:.24};
  const setLight=(x=.78,y=.24)=>{
    hero.style.setProperty('--hx',`${Math.round(x*100)}%`);
    hero.style.setProperty('--hy',`${Math.round(y*100)}%`);
    hero.style.setProperty('--light-push-x',`${(x-.78)*46}px`);
    hero.style.setProperty('--light-push-y',`${(y-.24)*46}px`);
    target.x=x;target.y=y;
  };
  hero.addEventListener('pointermove',e=>{
    const rect=hero.getBoundingClientRect();
    const x=Math.min(Math.max((e.clientX-rect.left)/rect.width,.08),.92);
    const y=Math.min(Math.max((e.clientY-rect.top)/rect.height,.08),.82);
    setLight(x,y);
  });
  hero.addEventListener('pointerleave',()=>setLight());
  setLight();
  if(!ctx)return;
  let w=0,h=0,dpr=1,raf=0;
  const resize=()=>{
    const rect=canvas.getBoundingClientRect();
    dpr=Math.min(window.devicePixelRatio||1,1.5);
    w=Math.max(1,Math.floor(rect.width*dpr));
    h=Math.max(1,Math.floor(rect.height*dpr));
    canvas.width=w;canvas.height=h;
  };
  hero._resizeLight=resize;
  const drawCurve=(points,color,width,blur,alpha)=>{
    ctx.save();
    ctx.globalCompositeOperation='lighter';
    ctx.globalAlpha=alpha;
    ctx.shadowColor=color;
    ctx.shadowBlur=blur*dpr;
    ctx.strokeStyle=color;
    ctx.lineWidth=width*dpr;
    ctx.lineCap='round';
    ctx.beginPath();
    ctx.moveTo(points[0].x*w,points[0].y*h);
    ctx.bezierCurveTo(points[1].x*w,points[1].y*h,points[2].x*w,points[2].y*h,points[3].x*w,points[3].y*h);
    ctx.stroke();
    ctx.restore();
  };
  const drawRibbon=(points,energy=1)=>{
    drawCurve(points,'rgba(15,60,180,.18)',62*energy,58,.50);
    drawCurve(points,'rgba(18,90,255,.28)',34*energy,44,.58);
    drawCurve(points,'rgba(32,118,255,.40)',18*energy,30,.62);
    drawCurve(points,'rgba(77,238,255,.66)',5.5*energy,18,.50);
    drawCurve(points,'rgba(238,255,255,.58)',1.25*energy,7,.34);
  };
  const drawGlow=(x,y,r,color,alpha)=>{
    const gx=x*w,gy=y*h,gr=r*Math.min(w,h);
    const g=ctx.createRadialGradient(gx,gy,0,gx,gy,gr);
    g.addColorStop(0,color.replace('ALPHA',alpha));
    g.addColorStop(.18,color.replace('ALPHA',alpha*.72));
    g.addColorStop(.45,color.replace('ALPHA',alpha*.22));
    g.addColorStop(1,color.replace('ALPHA',0));
    ctx.fillStyle=g;
    ctx.fillRect(gx-gr,gy-gr,gr*2,gr*2);
  };
  const render=(time)=>{
    const t=time*.001;
    pointer.x+=(target.x-pointer.x)*.045;
    pointer.y+=(target.y-pointer.y)*.045;
    ctx.clearRect(0,0,w,h);
    ctx.globalCompositeOperation='source-over';
    const base=ctx.createLinearGradient(0,0,w,h);
    base.addColorStop(0,'rgba(6,12,24,0)');
    base.addColorStop(.45,'rgba(20,60,160,.08)');
    base.addColorStop(1,'rgba(4,10,20,0)');
    ctx.fillStyle=base;
    ctx.fillRect(0,0,w,h);
    const px=pointer.x,py=pointer.y;
    drawGlow(px,py,.42,'rgba(45,118,255,ALPHA)',.34);
    drawGlow(px+.06*Math.sin(t*.7),py+.04*Math.cos(t*.8),.24,'rgba(90,248,255,ALPHA)',.28);
    drawGlow(.92+.018*Math.sin(t*.45),.78,.28,'rgba(22,94,255,ALPHA)',.20);
    drawGlow(.58,.64+.04*Math.cos(t*.5),.24,'rgba(20,90,255,ALPHA)',.13);
    const wave=Math.sin(t*.65);
    const pulse=.5+.5*Math.sin(t*.9);
    const curves=[
      [{x:.02,y:1.02},{x:.24,y:.78+.05*wave},{x:.54,y:.46-.07*pulse},{x:1.08,y:.24+.04*Math.sin(t)}],
      [{x:.40,y:-.12},{x:.55,y:.12+.06*Math.sin(t*.7)},{x:.75,y:.42+.05*Math.cos(t*.8)},{x:1.10,y:.11}],
      [{x:.60,y:.04},{x:.78,y:.18},{x:.92,y:.35+.08*Math.sin(t*.55)},{x:.94,y:1.08}],
      [{x:.27,y:.72},{x:.48,y:.62+.04*Math.cos(t*.8)},{x:.73,y:.56},{x:1.04,y:.43}],
      [{x:.74,y:-.03},{x:.85,y:.18},{x:.94,y:.43+.04*Math.sin(t*.9)},{x:.86,y:1.08}],
      [{x:.52,y:.18},{x:.64,y:.36+.05*Math.sin(t*.6)},{x:.80,y:.48},{x:1.07,y:.33}],
      [{x:.05,y:.28},{x:.38,y:.15+.04*Math.cos(t*.5)},{x:.62,y:.27},{x:1.02,y:.08}]
    ];
    curves.forEach((c,i)=>{
      const influenced=c.map((p,j)=>({
        x:p.x+(px-.78)*((j===1 || j===2) ? 0.12 : 0.04),
        y:p.y+(py-.24)*((j===1 || j===2) ? 0.12 : 0.04)
      }));
      drawRibbon(influenced,i===2 || i===4 ? 1.08 : i===0 ? .92 : .72);
    });
    const sparks=[
      {x:px,y:py,r:.020,a:.75},
      {x:.82+.018*Math.sin(t*.8),y:.36+.03*Math.cos(t*.7),r:.015,a:.58},
      {x:.90+.014*Math.cos(t*.9),y:.77+.02*Math.sin(t*.6),r:.012,a:.40},
      {x:.55+.025*Math.sin(t*.55),y:.22+.018*Math.cos(t*.75),r:.010,a:.34}
    ];
    sparks.forEach(s=>drawGlow(s.x,s.y,s.r,'rgba(170,255,250,ALPHA)',s.a));
    raf=requestAnimationFrame(render);
  };
  resize();
  addEventListener('resize',resize,{passive:true});
  raf=requestAnimationFrame(render);
}

function scrollCases(dir){const t=document.getElementById('caseTrack');if(t)t.scrollBy({left:dir*380,behavior:'smooth'});}
function initEmployeeCarousels(root=document){
  const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.querySelectorAll('.emp-grid').forEach(track=>{
    if(track.dataset.carouselReady)return;
    track.dataset.carouselReady='true';
    const cards=[...track.querySelectorAll('.emp')];
    if(cards.length<2)return;
    track.classList.add('is-looping');
    cards.forEach((card,i)=>{
      const clone=card.cloneNode(true);
      clone.classList.add('emp-clone');
      clone.classList.remove('reveal');
      clone.classList.add('in');
      clone.setAttribute('aria-hidden','true');
      clone.dataset.cloneOf=String(i);
      track.appendChild(clone);
    });
    let allCards=[...track.querySelectorAll('.emp')];
    const dots=document.createElement('div');
    dots.className='emp-carousel-dots';
    dots.setAttribute('aria-label','AI 员工轮播页码');
    track.insertAdjacentElement('afterend',dots);
    let active=0,visible=false,dragging=false,startX=0,startLeft=0,timer=0,resumeTimer=0,introTimer=0,scrollFrame=0,enteredOnce=false;
    const attachCardLight=card=>{
      card.addEventListener('pointermove',e=>{
        const rect=card.getBoundingClientRect();
        card.style.setProperty('--mx',`${e.clientX-rect.left}px`);
        card.style.setProperty('--my',`${e.clientY-rect.top}px`);
      });
      card.addEventListener('pointerleave',()=>{
        card.style.setProperty('--mx','50%');
        card.style.setProperty('--my','42%');
      });
    };
    allCards.forEach(attachCardLight);
    const dotBtns=cards.map((card,i)=>{
      const btn=document.createElement('button');
      btn.type='button';
      btn.className='emp-dot';
      btn.setAttribute('aria-label',`切换到第 ${i+1} 个 AI 员工`);
      btn.addEventListener('click',()=>{enteredOnce=true;pause(3600);scrollToIndex(i,'auto');});
      dots.appendChild(btn);
      return btn;
    });
    const maxScroll=()=>Math.max(0,track.scrollWidth-track.clientWidth);
    const rawLeft=card=>card.offsetLeft-track.offsetLeft;
    const loopStart=()=>rawLeft(allCards[cards.length]);
    const cardLeft=i=>Math.min(rawLeft(cards[i]),maxScroll());
    const normalizeLoop=()=>{
      const start=loopStart();
      if(start>0&&track.scrollLeft>=start-1){
        track.scrollLeft=rawLeft(cards[0])+(track.scrollLeft-start);
      }
    };
    const nearestIndex=()=>{
      const x=track.scrollLeft;
      let best=0,dist=Infinity;
      allCards.forEach((card,i)=>{
        const d=Math.abs((card.offsetLeft-track.offsetLeft)-x);
        if(d<dist){dist=d;best=i%cards.length;}
      });
      return best;
    };
    const setActiveDot=()=>{
      dotBtns.forEach((btn,i)=>{
        btn.classList.toggle('active',i===active);
        btn.setAttribute('aria-current',i===active?'true':'false');
      });
    };
    const update=()=>{
      active=nearestIndex();
      setActiveDot();
    };
    const scrollToIndex=(i,behavior='smooth')=>{
      const next=(i+cards.length)%cards.length;
      const useForwardClone=active===cards.length-1&&next===0&&allCards[cards.length];
      active=next;
      setActiveDot();
      const left=useForwardClone?Math.min(rawLeft(allCards[cards.length]),maxScroll()):cardLeft(active);
      track.scrollTo({left,behavior});
      if(useForwardClone){
        setTimeout(()=>normalizeLoop(),behavior==='auto'?0:520);
      }
    };
    const stop=()=>{clearInterval(timer);timer=0;};
    const start=()=>{
      if(reduceMotion||!visible||dragging||timer)return;
      timer=setInterval(()=>scrollToIndex(active+1),3000);
    };
    const pause=(delay=1800)=>{
      stop();
      clearTimeout(resumeTimer);
      clearTimeout(introTimer);
      if(delay)resumeTimer=setTimeout(start,delay);
    };
    track._empUpdate=update;
    track.addEventListener('scroll',()=>{
      if(scrollFrame)return;
      scrollFrame=requestAnimationFrame(()=>{scrollFrame=0;if(!dragging)normalizeLoop();update();});
    },{passive:true});
    track.addEventListener('pointerdown',e=>{
      enteredOnce=true;
      dragging=true;
      startX=e.clientX;
      startLeft=track.scrollLeft;
      track.classList.add('dragging');
      pause(0);
      track.setPointerCapture?.(e.pointerId);
    });
    track.addEventListener('pointermove',e=>{
      if(dragging)track.scrollLeft=startLeft-(e.clientX-startX);
    });
    ['pointerup','pointercancel'].forEach(type=>track.addEventListener(type,()=>{
      dragging=false;
      track.classList.remove('dragging');
      update();
      pause(2600);
    }));
    track.addEventListener('pointerenter',()=>pause(0));
    track.addEventListener('pointerleave',()=>{
      if(dragging){dragging=false;track.classList.remove('dragging');}
      pause(1600);
    });
    track.addEventListener('wheel',()=>pause(2600),{passive:true});
    track.addEventListener('touchstart',()=>pause(2600),{passive:true});
    track.addEventListener('focusin',()=>pause(0));
    track.addEventListener('focusout',()=>pause(1800));
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        visible=entry.isIntersecting;
        if(visible){
          update();
          if(!enteredOnce&&!reduceMotion){
            enteredOnce=true;
            introTimer=setTimeout(()=>{if(visible&&!dragging)scrollToIndex(active+1);},650);
          }
          start();
        }else{
          stop();
          clearTimeout(introTimer);
        }
      });
    },{threshold:.34});
    observer.observe(track);
    addEventListener('resize',()=>{allCards=[...track.querySelectorAll('.emp')];update();scrollToIndex(active,'auto');},{passive:true});
    update();
  });
}
function openModal(){document.getElementById('modal').classList.add('open');document.body.style.overflow='hidden';}
function closeModal(){document.getElementById('modal').classList.remove('open');document.body.style.overflow='';
  setTimeout(()=>{document.getElementById('formView').style.display='block';document.getElementById('successView').style.display='none';},200);}
function submitForm(){
  const name=document.getElementById('f_name');
  const org=document.getElementById('f_org');
  const tel=document.getElementById('f_tel');
  const scene=document.getElementById('f_scene');
  [name,org,tel].forEach(el=>el.style.borderColor='');
  if(!name.value.trim()){name.focus();name.style.borderColor='#ff6b6b';return;}
  if(!tel.value.trim()){tel.focus();tel.style.borderColor='#ff6b6b';return;}
  const subject=encodeURIComponent('官网商务咨询 - '+name.value.trim());
  const body=encodeURIComponent([
    '姓名：'+name.value.trim(),
    '单位：'+(org.value.trim()||'未填写'),
    '电话：'+tel.value.trim(),
    '需求场景：'+scene.value,
    '',
    '来源：北斗官网'
  ].join('\n'));
  window.location.href='mailto:info@szbit.cn?subject='+subject+'&body='+body;
  document.getElementById('formView').style.display='none';
  document.getElementById('successView').style.display='block';
}
addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

// init
initSpotlightCards();
initEmployeeCarousels();
showPage(location.hash.slice(1)||'home');

