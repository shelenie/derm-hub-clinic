// тестові режими для діагностики: ?seq=0 — хіро без покадрової анімації, ?glass=0 — без ефекту розмитого скла
const QS = new URLSearchParams(location.search);
if (QS.get('glass') === '0') document.documentElement.classList.add('noglass');
if (QS.get('seq') === '0') { document.documentElement.classList.add('noseq'); const c = document.querySelector('canvas.hero-canvas'); if (c) c.remove(); }
// Емблема як вивіска на фасаді: білий диск, DERM HUB дідонним серифом в один рядок,
// по колу гротеском «your beauty is health •» без розриву (textLength = довжина кола).
// Пропорції зняті з фото вивіски: ширина слова ≈ 50% діаметра, висота літер по колу ≈ 0,6 висоти великих літер слова.
// data-word — ширина слова як частка діаметра (для маленьких емблем трохи більша, щоб читалось).
function drawEmblems() {
  const cv = document.createElement('canvas').getContext('2d');
  document.querySelectorAll('.emblem').forEach((el, i) => {
    const s = +el.dataset.size || 150;
    if (el.dataset.variant === 'red') return drawRed(el, s, i);
    const wordW = s * (+el.dataset.word || 0.5);
    cv.font = '500 100px "Playfair Display"';
    const wordFs = 100 * wordW / cv.measureText('DERM HUB').width;   // кегль слова під потрібну ширину
    const capH = wordFs * 0.708;                                       // висота великих літер Playfair
    const ringFs = Math.max(capH * 0.6 / 0.72, 3.2) * (+el.dataset.ring || 1);                   // висхідні Montserrat ≈ 0,72 кегля
    const r = s / 2 - s * 0.045 - ringFs * 0.72;                       // базова лінія напису по колу
    const len = (2 * Math.PI * r).toFixed(1);
    // скільки разів уміщується слоган зі звичайним трекінгом (як на вивісці — щільно, без великих проміжків)
    const unit = 'your beauty is health\u00A0·\u00A0';
    cv.font = `500 ${ringFs}px Montserrat`;
    const unitW = cv.measureText(unit).width + unit.length * ringFs * 0.06;
    const reps = Math.max(1, Math.round(len / unitW));
    const id = 'ring' + i;
    el.style.width = el.style.height = s + 'px';
    el.innerHTML =
      `<svg viewBox="0 0 ${s} ${s}" aria-hidden="true"><defs><path id="${id}" d="M${s/2},${s/2} m-${r},0 a${r},${r} 0 1,1 ${2*r},0 a${r},${r} 0 1,1 -${2*r},0"/></defs>` +
      `<text style="font-family:Montserrat,sans-serif;font-size:${ringFs.toFixed(2)}px;font-weight:500;fill:#2B2A29"><textPath href="#${id}" textLength="${len}" lengthAdjust="spacing">${unit.replace("·", "<tspan font-weight=\"600\">·</tspan>").repeat(reps)}</textPath></text></svg>` +
      `<span class="word" style="font-size:${wordFs.toFixed(2)}px">DERM HUB</span>`;
  });
}
// червона версія, як аватар в Instagram: червоний диск, DERM / HUB гротеском у два рядки, білий напис по колу
function drawRed(el, s, i) {
  const cv = document.createElement('canvas').getContext('2d');
  cv.font = '600 100px Montserrat';
  const wordFs = 100 * (s * 0.5) / cv.measureText('DERM').width;
  const ringFs = Math.max(s * 0.062, 3);
  const r = s / 2 - s * 0.05 - ringFs * 0.72;
  const len = (2 * Math.PI * r).toFixed(1);
  const unit = 'your beauty is health\u00A0·\u00A0';
  cv.font = `400 ${ringFs}px Montserrat`;
  const reps = Math.max(1, Math.round(len / (cv.measureText(unit).width + unit.length * ringFs * 0.06)));
  const id = 'ringr' + i;
  el.style.width = el.style.height = s + 'px';
  el.classList.add('red');
  el.innerHTML =
    `<svg viewBox="0 0 ${s} ${s}" aria-hidden="true"><defs><path id="${id}" d="M${s/2},${s/2} m-${r},0 a${r},${r} 0 1,1 ${2*r},0 a${r},${r} 0 1,1 -${2*r},0"/></defs>` +
    `<text style="font-family:Montserrat,sans-serif;font-size:${ringFs.toFixed(2)}px;font-weight:400;fill:#fff"><textPath href="#${id}" textLength="${len}" lengthAdjust="spacing">${unit.replace("·", "<tspan font-weight=\"600\">·</tspan>").repeat(reps)}</textPath></text></svg>` +
    `<span class="word" style="font-size:${wordFs.toFixed(2)}px">DERM<br>HUB</span>`;
}
Promise.all([document.fonts.load('500 20px "Playfair Display"'), document.fonts.load('600 20px Montserrat')]).then(drawEmblems, drawEmblems);

// мова: index.html — українська, en.html — англійська; рядки, які малює скрипт, беремо з T(uk, en)
const EN = document.documentElement.lang === 'en';
const T = (uk, en) => EN ? en : uk;
// UA/EN — один тумблер: повзунок їде до іншої мови, і відкривається відповідна сторінка (з тим самим розділом)
document.querySelectorAll('.langs').forEach(t => t.onclick = () => {
  const en = t.classList.toggle('en'); t.querySelectorAll('button').forEach((x, i) => { x.classList.toggle('on', i === +en); x.setAttribute('aria-pressed', i === +en); });
  setTimeout(() => { location.href = (en ? 'en.html' : 'index.html') + location.hash; }, 220);
});

// ПОСЛУГИ І ЦІНИ — малюємо з js/prices.js
(function renderServices() {
  const tabsEl = document.getElementById('svcTabs'), panelsEl = document.getElementById('svcPanels');
  if (!tabsEl || !window.PRICES) return;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const fmt = n => n.toLocaleString(EN ? 'en-US' : 'uk-UA').replace(/\s/g, ' ');
  const CUR = T('грн', 'UAH'), FROM = T('від', 'from'); const nums = p => p == null ? [] : typeof p === 'number' ? [p] : (String(p).replace(/(\d)\s(\d)/g, '$1$2').match(/\d+/g) || []).map(Number);
  const price = p => p == null ? '<span class="na">—</span>' : typeof p === 'number' ? `${fmt(p)}&nbsp;${CUR}` : `${esc(p)}&nbsp;${CUR}`;
  const allNums = c => [...(c.matrix ? c.matrix.rows.flatMap(r => r.slice(2).flatMap(nums)) : []), ...(c.groups || []).filter(g => !g.extra).flatMap(g => g.rows.flatMap(r => nums(r.price)))];
  const span = c => {
    const ns = allNums(c);
    const lo = c.range ? c.range[0] : c.from ?? Math.min(...ns);
    const hi = c.range ? c.range[1] : c.from ? null : Math.max(...ns);
    return { lo, hi };
  };
  const detail = c => {
    const { lo, hi } = span(c);
    let body = '';
    if (c.matrix) {
      body = `<div class="d-matrix"><table><thead><tr><th>${esc(c.matrix.head || T('Консультація', 'Consultation'))}</th>${c.matrix.cols.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>` +
        c.matrix.rows.map(r => `<tr><td>${esc(r[0])}${r[1] ? `<small>${esc(r[1])}</small>` : ''}</td>${r.slice(2).map(p => p == null ? '<td><span class="na">—</span></td>' : `<td>${typeof p === 'number' ? fmt(p) : esc(p).replace(/\d+/, d => fmt(+d))}&nbsp;${CUR}</td>`).join('')}</tr>`).join('') +
        `</tbody></table></div>`;
    }
    if (c.groups) {
      body += `<div class="d-cols${c.cols3 ? ' c3' : ''}">` + c.groups.map(g =>
        `<div class="${g.wide ? 'wide' : ''}"><h4>${esc(g.h)}</h4>${g.sub ? `<p class="d-sub">${esc(g.sub)}</p>` : ''}<ul class="pr">` +
        g.rows.map(r => `<li><span>${esc(r.name)}${r.note ? `<small>${esc(r.note)}</small>` : ''}</span><b>${price(r.price)}</b></li>`).join('') +
        `</ul></div>`).join('') + `</div>`;
      if (c.matrix) body = body.replace('<div class="d-cols', '<div class="d-cols d-after');
    }
    const ab = c.about;
    const about = ab ? `<div class="d-about${ab.photo ? ' has-photo' : ''}">${ab.photo ? `<img src="${ab.photo}" alt="" loading="lazy">` : ''}<div class="d-about-t"><p>${esc(ab.text)}</p>` +
      (ab.list ? `${ab.title ? `<h4>${esc(ab.title)}</h4>` : ''}<ul class="d-list">${ab.list.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : '') +
      (ab.foot ? `<p class="d-about-f">${esc(ab.foot)}</p>` : '') + `</div></div>` : '';
    const notes = (c.notes || []).map(n => `<li>${esc(n)}</li>`).join('');
    return `<div class="d-head"><div><span class="cat">${esc(c.cat)}</span><h3>${esc(c.title)}</h3></div>` +
      `<div class="d-range">${hi && hi !== lo ? `${fmt(lo)} – ${fmt(hi)}` : `${FROM} ${fmt(lo)}`}&nbsp;${CUR}</div></div>` + about + body +
      `<div class="d-foot">${notes ? `<ul class="d-notes">${notes}</ul>` : '<span></span>'}<a class="btn btn-red btn-arrow" href="#booking" data-svc="${esc(c.svc)}">${T('Записатися: ' + esc(c.title.toLowerCase()), 'Book: ' + esc(c.title))}<svg class="ar" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg></a></div>`;
  };
  tabsEl.innerHTML = PRICES.map((t, i) =>
    `<button type="button" role="tab" class="tab${i ? '' : ' on'}" data-tab="${t.id}" aria-selected="${!i}">${esc(t.tab)}<sup>${t.cards.length}</sup></button>`).join('');
  panelsEl.innerHTML = PRICES.map((t, i) => {
    const n = t.cards.length, few = n < 3, rest = few ? 3 - n : n < 6 ? 6 - n : (3 - n % 3) % 3;   // 2 ряди x 3 колонки поруч із фото
    const cards = t.cards.map((c, j) => {
      const { lo } = span(c);
      return `<article class="svc${few ? ' tall' : ''}" data-i="${j}"><div><span class="cat">${esc(c.cat)}</span><h3>${esc(c.title)}</h3><p>${esc(c.short)}</p></div>` + (few && c.about && c.about.photo ? `<img class="svc-pic" src="${c.about.photo}" alt="" loading="lazy">` : "") +
        `<div class="foot"><span class="price"><small>${FROM}</small>${fmt(lo)}&nbsp;${CUR}</span><span class="acts"><button type="button" class="more-btn">${T('Весь прайс', 'Full price list')}</button>` +
        `<a class="plus" href="#booking" data-svc="${esc(c.svc)}" aria-label="${T('Записатися', 'Book')}: ${esc(c.title)}">+</a></span></div></article>`;
    }).join('');
    const filler = rest ? `<a class="svc svc-cta${few ? ' tall' : ''}${rest > 1 ? ' wide' : ''}" style="--fc:${rest}" href="https://t.me/Doctors_AppointmentDERM_HUB" target="_blank" rel="noopener noreferrer"><img class="cta-doc" src="img/cta-${t.id}.webp" style="object-position:${({care:'50% 12%',inj:'50% 30%',laser:'30% 35%',derm:'70% 50%',hair:'50% 50%',body:'50% 50%'})[t.id] || '50% 50%'}" alt="" loading="lazy" decoding="async"><span class="cat">${T('Не знаєте, що обрати?', 'Not sure what to choose?')}</span><div class="cta-txt"><h3>${T('Підкажемо процедуру і лікаря', 'We’ll help you pick a treatment and a doctor')}</h3><p>${T('Напишіть адміністратору в Telegram або зателефонуйте — розповімо, з чого почати саме вам.', 'Message our front desk on Telegram or give us a call, and we’ll tell you where to start.')}</p></div><span class="btn btn-red btn-arrow"><span>${T('Написати<span class="cta-more"> в Telegram</span>', 'Message us<span class="cta-more"> on Telegram</span>')}</span><i class="ln" aria-hidden="true"></i></span></a>` : '';
    return `<div class="panel${i ? '' : ' on'} two" data-panel="${t.id}" style="--n:4">` +
      `<div class="svc photo"><img src="${t.photo}" alt="${esc(t.photoAlt)}" style="object-position:${t.photoPos || '50% 40%'}"><div class="glass"><b>${esc(t.photoNote || T('Оберіть процедуру і вільний час', 'Choose a treatment and a free time slot'))}</b><a class="btn btn-white" href="#booking">${T('Записатися', 'Book now')}</a></div></div>` +
      cards + filler + `<div class="svc-detail" aria-live="polite"></div></div>`;
  }).join('');
  panelsEl.addEventListener('click', e => {
    const b = e.target.closest('.more-btn'); if (!b) return;
    const card = b.closest('.svc'), panel = b.closest('.panel'), box = panel.querySelector('.svc-detail');
    const wasOpen = card.classList.contains('open');
    if (innerWidth <= 700) card.after(box); else if (box !== panel.lastElementChild) panel.append(box);
    panel.querySelectorAll('.svc.open').forEach(c => { c.classList.remove('open'); c.querySelector('.more-btn').textContent = T('Весь прайс', 'Full price list'); });
    if (wasOpen) { box.classList.remove('on'); return; }
    card.classList.add('open'); b.textContent = T('Згорнути', 'Collapse');
    box.innerHTML = detail(PRICES.find(t => t.id === panel.dataset.panel).cards[+card.dataset.i]);
    box.classList.remove('on'); void box.offsetWidth; box.classList.add('on');
    setTimeout(() => box.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 60);
  });
})();

// вкладки послуг
document.querySelectorAll('.tab').forEach(b => b.onclick = () => {
  document.querySelectorAll('.tab').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-selected', x === b); });
  document.querySelectorAll('.panel').forEach(p => p.classList.toggle('on', p.dataset.panel === b.dataset.tab));
});

// послуга / лікар з будь-якої кнопки → одразу у форму запису
const svcSelect = document.getElementById('fService');
const docSelect = document.getElementById('fDoctor');
document.addEventListener('click', e => {
  const s = e.target.closest('[data-svc]'), d = e.target.closest('[data-doc]');
  if (s && svcSelect) {
    const v = s.dataset.svc;
    if (![...svcSelect.options].some(o => o.value === v)) svcSelect.add(new Option(v, v), svcSelect.options.length - 1);
    svcSelect.value = v;
  }
  if (d && docSelect) docSelect.value = d.dataset.doc;
});

// слоти (демо)
const submit = document.querySelector('#bookForm button[type=submit]');
document.querySelectorAll('.slot').forEach(b => b.onclick = () => {
  document.querySelectorAll('.slot').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-checked', x === b); });
  submit.querySelector('.bt').textContent = T('Записатися на ', 'Book for ') + b.textContent;
});
document.getElementById('bookForm').onsubmit = e => { e.preventDefault(); submit.querySelector('.bt').textContent = T('Заявку надіслано ✓ (демо)', 'Request sent ✓ (demo)'); };

// підписи зон: точки задані в пікселях фото (data-px/py) і перераховуються під object-fit:cover
const heroImg = document.querySelector('.hero-frame>canvas, .hero-frame>img');
const isSeq = heroImg && heroImg.tagName === 'CANVAS';
const SEQ_W = 1600, SEQ_H = 892, SEQ_N = 91, SEQ_OY = 0.82;   // SEQ_OY — як object-position по вертикалі   // кадри img/hero-seq/f001…f091.webp (кожен кадр відео 24 fps): прокрутка закінчується на повній усмішці
const cos = [...document.querySelectorAll('.co')];
let heroK = 0;
function placeCallouts() {
  if (!heroImg || !(isSeq || heroImg.naturalWidth)) return;
  const fr = heroImg.parentElement, f = { width: fr.clientWidth, left: 0, top: 0 }, r = { left: heroImg.offsetLeft, top: heroImg.offsetTop, width: heroImg.offsetWidth, height: heroImg.offsetHeight };   // без transform анімації
  const W = 2000, H = isSeq ? 2000 * SEQ_H / SEQ_W : 2000 * heroImg.naturalHeight / heroImg.naturalWidth;   // точки задані в просторі шириною 2000
  const k = Math.max(r.width / W, r.height / H); heroK = k;
  const ox = (r.left - f.left) + (r.width - W * k) * 0.52, oy = (r.top - f.top) + (r.height - H * k) * (isSeq ? SEQ_OY : 0.30);   // як object-position:52% 30%
  const end = Math.min(ox + 1470 * k, f.width - 250);
  heroImg.parentElement.style.setProperty('--gw', innerWidth > 1100 ? (ox + 985 * k) + 'px' : '34%');   // край скла — одразу лівіше носа                     // лінії закінчуються за волоссям, підпис не вилазить
  cos.forEach(c => {
    const x = ox + c.dataset.px * k, y = oy + c.dataset.py * k;
    c.style.left = x + 'px'; c.style.top = y + 'px'; c.style.width = Math.max(end - x, 40) + 'px';
    c.classList.add('placed');
  });
  // точки, через які проходить лінія зони, — щоб ховати їх, поки ця зона активна
  cos.forEach(c => { const x = parseFloat(c.style.left), y = parseFloat(c.style.top), w = parseFloat(c.style.width); c._over = cos.filter(o => o !== c && Math.abs(parseFloat(o.style.top) - y) < 16 && parseFloat(o.style.left) > x + 8 && parseFloat(o.style.left) < x + w + 8); });
}
if (heroImg) { if (isSeq) { placeCallouts(); } else { heroImg.complete ? placeCallouts() : heroImg.addEventListener('load', placeCallouts); } addEventListener('resize', placeCallouts); }
// лічильник зон у склі синхронно з точками на обличчі
const hgNum = document.querySelector('.hg-num'), hgName = document.querySelector('.hg-name'), hgDots = [...document.querySelectorAll('.hg-dots i')];
let k = 0;
const tick = () => {
  cos.forEach((c, j) => c.classList.toggle('on', j === k));
  const hid = (cos[k] && cos[k]._over) || []; cos.forEach(c => c.classList.toggle('dim', hid.includes(c)));
  if (hgNum) { hgNum.textContent = String(k + 1).padStart(2, '0'); hgName.textContent = cos[k].querySelector('b').textContent; hgDots.forEach((d, j) => d.classList.toggle('on', j === k)); }
  k = (k + 1) % cos.length;
};
let timer;
const run = (delay = 2800) => { if (isSeq) return; clearInterval(timer); clearTimeout(timer); timer = setTimeout(() => { tick(); timer = setInterval(tick, 2800); }, delay); };
cos.forEach((c, i) => {
  const go = () => { k = i; tick(); run(6000); };   // показати зону одразу і дати час прочитати
  c.querySelector('.pt').addEventListener('click', go);
  c.querySelector('.pt').addEventListener('mouseenter', go);
});
let zoneReady = false;
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (isSeq) { if (calm) setTimeout(() => { zoneReady = true; }, 1600); } else setTimeout(() => { tick(); run(); }, 1600);

// поява секцій
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// мобільне меню
const head = document.querySelector('.head'), burger = document.querySelector('.burger');
if (burger) {
  burger.onclick = () => { const o = head.classList.toggle('open'); burger.setAttribute('aria-expanded', o); };
  document.querySelectorAll('.mnav a').forEach(a => a.addEventListener('click', () => { head.classList.remove('open'); burger.setAttribute('aria-expanded', false); }));
}
// шапка: прозора поверх хіро → скляна «пілюля» після хіро
const heroFrame = document.querySelector('.hero-frame');
const browPt = document.querySelector('.co .pt');
const setHead = () => {
  let solid = !heroFrame || scrollY > (innerWidth <= 1100 ? 8 : heroFrame.parentElement.offsetHeight - head.offsetHeight);   // планшет/телефон: шапка відокремлюється одразу з початком скролу
  if (heroFrame && browPt && browPt.offsetParent) { const b = browPt.getBoundingClientRect(), hb = head.getBoundingClientRect().bottom; solid = b.top < hb + 24; }
  head.classList.toggle('solid', solid);
  head.classList.toggle('glass', solid);
  // над хіро меню не заходить на скляну панель: якщо не вміщується правіше за неї — ущільнюємо шапку (без телефону, дрібніше меню)
  const nav = head.querySelector('.navline'), hg = document.querySelector('.hero-glass');
  head.classList.remove('nav-t1', 'nav-t2', 'nav-t3', 'nav-t4', 'nav-t5');
  if (nav && hg && innerWidth > 1100 && !solid) {
    const over = () => nav.getBoundingClientRect().left < hg.getBoundingClientRect().right + 24;
    for (const c of ['nav-t1', 'nav-t2', 'nav-t3', 'nav-t4', 'nav-t5']) { if (!over()) break; head.classList.add(c); }   // спершу ущільнюємо меню, ховаємо соцмережі; телефон — лише в крайньому разі
  }
  // після хіро: скрол вниз — шапка ховається, скрол вгору — з'являється
  const y = scrollY, d = y - lastY, past = y > (heroFrame ? heroFrame.parentElement.offsetHeight : innerHeight * .6);
  if (!past || head.classList.contains('open') || document.activeElement && head.contains(document.activeElement)) head.classList.remove('hide');
  else if (d > 6) head.classList.add('hide');
  else if (d < -6) head.classList.remove('hide');
  if (Math.abs(d) > 6 || !past) lastY = y;
};
let lastY = scrollY;
addEventListener('scroll', setHead, { passive: true });
const toTop = document.querySelector('.to-top');
if (toTop) { const bw = document.querySelector('.bigword'); const t = () => toTop.classList.toggle('on', scrollY > innerHeight * .9 && !(innerWidth <= 700 && bw && bw.getBoundingClientRect().top < innerHeight - 8)); addEventListener('scroll', t, { passive: true }); t(); } addEventListener('resize', setHead); setHead();

// стрічка напрямів → відкриває потрібну вкладку прайсу
document.querySelectorAll('[data-go]').forEach(a => a.addEventListener('click', () => {
  const t = document.querySelector('.tab[data-tab="' + a.dataset.go + '"]'); if (t) t.click();
}));

// каруселі: стрілки, смужка прогресу, перетягування мишею
document.querySelectorAll('.rail-wrap').forEach(w => {
  const r = w.querySelector('.rail'), prev = w.querySelector('[data-prev]'), next = w.querySelector('[data-next]'), bar = w.querySelector('.rail-bar i');
  const upd = () => {
    const max = r.scrollWidth - r.clientWidth, k = max > 0 ? r.scrollLeft / max : 0, part = max > 0 ? r.clientWidth / r.scrollWidth : 1;
    if (bar) { bar.style.width = (part * 100) + '%'; bar.style.transform = `translateX(${k * (1 / part - 1) * 100}%)`; }
    if (prev) prev.disabled = r.scrollLeft < 4;
    if (next) next.disabled = r.scrollLeft > max - 4;
    // картки, що виходять за правий край, м'яко тануть (сильніше — що далі за край)
    const rr = r.getBoundingClientRect().right, fade = Math.min(Math.max(innerWidth * .09, 70), 200);
    [...r.children].forEach(ch => { const b = ch.getBoundingClientRect(); const o = b.right <= rr - 2 ? 1 : Math.max(r.closest('.dirs') ? 1 : .35, Math.min(1, (rr - fade - b.left) / Math.max(b.width - fade, 1) * .7 + .3)); ch.style.opacity = o < .999 ? o.toFixed(2) : ''; });
  };
  const step = () => Math.max(r.clientWidth * .75, 280);
  prev && prev.addEventListener('click', () => r.scrollBy({ left: -step() }));
  next && next.addEventListener('click', () => r.scrollBy({ left: step() }));
  r.addEventListener('scroll', upd, { passive: true });
  addEventListener('resize', upd); addEventListener('load', upd); upd();
  r.querySelectorAll('img').forEach(im => im.complete || im.addEventListener('load', upd));
  if (window.ResizeObserver) { const ro = new ResizeObserver(upd); ro.observe(r); [...r.children].forEach(ch => ro.observe(ch)); }
  w._upd = upd;
  // drag мишею (на дотик працює нативний скрол)
  let x0 = 0, s0 = 0, down = false, moved = false;
  r.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; moved = false; x0 = e.clientX; s0 = r.scrollLeft; });
  addEventListener('pointermove', e => { if (!down) return; const dx = e.clientX - x0; if (Math.abs(dx) > 5) { moved = true; r.classList.add('drag'); } if (moved) r.scrollLeft = s0 - dx; });
  addEventListener('pointerup', () => { if (!down) return; down = false; setTimeout(() => r.classList.remove('drag'), 0); });
  r.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
  r.addEventListener('dragstart', e => e.preventDefault());
});

// фільтр результатів
document.querySelectorAll('.chips').forEach(ch => ch.addEventListener('click', e => {
  const b = e.target.closest('.chip'); if (!b) return;
  ch.querySelectorAll('.chip').forEach(c => c.classList.toggle('on', c === b));
  const w = ch.closest('.rail-wrap'), r = w.querySelector('.rail'), f = b.dataset.f;
  r.querySelectorAll(':scope > [data-cat]').forEach(it => it.hidden = !(f === 'all' || it.dataset.cat === f));
  r.scrollTo({ left: 0, behavior: 'instant' }); w._upd && w._upd();
}));

// відгуки: скрін заповнює картку по ширині, якщо влазить по висоті
const fitRv = () => document.querySelectorAll('.rv-shot img').forEach(im => {
  if (!im.naturalWidth) return;
  const box = im.parentElement, bw = box.clientWidth - 32, bh = box.clientHeight - 32;
  im.classList.toggle('wide', im.naturalHeight / im.naturalWidth * bw <= bh);
});
document.querySelectorAll('.rv-shot img').forEach(im => im.complete ? fitRv() : im.addEventListener('load', fitRv));
addEventListener('resize', fitRv);

// політика конфіденційності — поп-ап
const pol = document.getElementById('privacy');
if (pol) {
  document.querySelectorAll('[data-privacy]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); pol.showModal ? pol.showModal() : pol.setAttribute('open', ''); document.documentElement.classList.add('modal-open'); }));
  const close = () => { pol.close ? pol.close() : pol.removeAttribute('open'); document.documentElement.classList.remove('modal-open'); };
  pol.querySelector('[data-close]').addEventListener('click', close);
  pol.addEventListener('click', e => { if (e.target === pol) close(); });
  pol.addEventListener('close', () => document.documentElement.classList.remove('modal-open'));
}

// хіро на скролі: поки прокручується розпірка, кадри відео перемотуються, точки йдуть за обличчям
// трек носа по кадрах відео (24 fps, у просторі 2000 px)
const FX=[0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,-1,-1,-1,-1,-2,-2,-2,-2,-2,-2,-1,-1,-1,0,0,0,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,5,5,5,5,4,4,4,4,4,4,4,4,5,6,7,8,8,9,10,11,12,13,13,14,14,14,14,14,13,13,13,12,11,10,10,9,8,8,7,7,7,6,6,5,5,5,5,5,4,4,4,4,4,5,5,5,5,5,6,6,7,7,7,7,7,7,7,7,7,7,6,6,5,5,4,4,3,3,2,2,1,0,0,-1,-1,-2,-2,-2,-3,-3,-3,-3,-3,-3,-3,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-3,-3,-3,-3,-2,-2,-2,-2,-1,-1,-1,-1,0,0];
const FY=[0,0,0,-1,-1,-2,-2,-2,-1,-1,-1,-1,0,0,1,2,3,4,5,7,8,10,12,13,15,17,19,21,23,26,28,30,33,35,38,40,43,46,48,51,53,55,57,59,61,63,65,67,69,71,73,74,76,77,78,80,81,82,83,84,84,85,86,86,86,87,87,87,87,87,87,87,88,88,88,89,90,90,91,92,93,93,94,95,95,96,97,97,98,98,98,98,98,98,98,98,98,97,96,95,94,93,91,90,88,86,83,81,78,76,73,70,67,63,60,56,53,49,45,41,37,32,28,24,20,16,12,9,5,2,-2,-5,-9,-12,-15,-18,-21,-23,-26,-28,-30,-32,-34,-35,-36,-37,-37,-37,-37,-37,-37,-36,-36,-35,-34,-33,-32,-30,-29,-28,-27,-25,-24,-23,-22,-20,-19,-18,-17,-16,-15,-14,-13,-12,-11,-10,-8,-7,-6,-5,-4,-3,-2,-1,-1,0,0,0];
const coWrap = document.querySelector('.callouts');
if (isSeq) {
  const cv = heroImg, ctx = cv.getContext('2d'), spacer = document.querySelector('.hero-spacer');
  const frames = Array.from({ length: SEQ_N }, () => { const im = new Image(); im.decoding = 'async'; return im; });
  const src = i => 'img/hero-seq/f' + String(i + 1).padStart(3, '0') + '.webp';
  // кадри вантажимо лише на комп'ютері; на планшеті й телефоні — статичне фото (img.hero-mob)
  let seqLoaded = false;
  const loadFrames = () => { if (seqLoaded || innerWidth <= 1100) return; seqLoaded = true; frames[SEQ_N - 1].src = src(SEQ_N - 1); frames.forEach((im, i) => { if (i < SEQ_N - 1) im.src = src(i); }); };
  loadFrames(); addEventListener('resize', loadFrames);
  // вступ: усмішка → закриті очі без прокрутки; далі кадри керуються прокруткою
  let intro = !calm && scrollY < 5, introT0 = 0;
  if (!intro && !calm) zoneReady = true;   // сторінку відкрили вже прогорнутою — вступ не потрібен
  const INTRO_MS = 4200, introWait = performance.now();
  let cur = intro ? SEQ_N - 1 : 0, drawn = -1, needSize = true, lastZone = -1;
  const word = document.querySelector('.hero-word');
  let lbShift = 0, lbEl = null, auto = null;   // auto — самостійне чергування зон, поки сторінку не гортають
  const size = () => { const d = Math.min(devicePixelRatio || 1, 1.5); cv.width = Math.round(cv.clientWidth * d); cv.height = Math.round(cv.clientHeight * d); drawn = -1; };
  addEventListener('resize', () => { needSize = true; });
  // без ImageBitmap: браузер сам керує пам'яттю розпакованих кадрів; сусідні кадри лише «прогріваємо» (decode)
  const ok = im => im && im.complete && im.naturalWidth;
  const warm = [], WIN = 6;
  const keep = c => { for (let i = Math.max(0, Math.floor(c) - WIN), e = Math.min(SEQ_N - 1, Math.ceil(c) + WIN); i <= e; i++) if (!warm[i] && ok(frames[i])) { warm[i] = 1; if (frames[i].decode) frames[i].decode().catch(() => {}); } };
  const blit = (im, a) => { const s = Math.max(cv.width / SEQ_W, cv.height / SEQ_H), w = SEQ_W * s, h = SEQ_H * s; ctx.globalAlpha = a; ctx.drawImage(im, (cv.width - w) * 0.52, (cv.height - h) * SEQ_OY, w, h); ctx.globalAlpha = 1; };
  // кадр «між» сусідніми: нижній повністю, верхній з прозорістю — рух без ривків
  const drawMix = c => { const a = Math.floor(c), b = Math.min(a + 1, SEQ_N - 1), t = c - a; if (!ok(frames[a]) || (t > .01 && !ok(frames[b]))) return false; blit(frames[a], 1); if (t > .01) blit(frames[b], t); return true; };
  const draw = i => {
    let im = frames[i];
    if (!im.complete || !im.naturalWidth) { for (let d = 1; d < SEQ_N; d++) { const a = frames[i - d], b = frames[i + d]; if (a && a.complete && a.naturalWidth) { im = a; break; } if (b && b.complete && b.naturalWidth) { im = b; break; } } }
    if (!im.complete || !im.naturalWidth) return false;
    const s = Math.max(cv.width / SEQ_W, cv.height / SEQ_H), w = SEQ_W * s, h = SEQ_H * s;
    ctx.drawImage(im, (cv.width - w) * 0.52, (cv.height - h) * SEQ_OY, w, h);
    return im === frames[i];
  };
  const heroEnd = () => heroFrame ? heroFrame.parentElement.offsetHeight : 0;
  const loop = () => {
    if (!intro && scrollY > heroEnd() + 50) { requestAnimationFrame(loop); return; }   // хіро вже за екраном — нічого не малюємо
    if (needSize) { size(); needSize = false; }
    const p = spacer ? Math.min(Math.max(scrollY / Math.max(spacer.offsetHeight, 1), 0), 1) : 0;
    const target = p * (SEQ_N - 1);
    if (intro) {
      const el = performance.now() - introWait, ready = frames.every(ok) || el > 4000;   // вступ — лише коли всі кадри вже декодовані: без підвантажень посеред руху
      if (ready && !introT0) { introT0 = performance.now() + 400; zoneReady = true; }   // зони — одразу разом з відео   // пів секунди посмішки
      if (introT0) { const t = Math.min(Math.max((performance.now() - introT0) / INTRO_MS, 0), 1); const e = (1 - Math.cos(Math.PI * t)) / 2; cur = (SEQ_N - 1) * (1 - e); if (t >= 1) { intro = false; zoneReady = true; } }
      if (scrollY > 5) { intro = false; zoneReady = true; }   // почали гортати — віддаємо кадри прокрутці
    } else {
      cur += (target - cur) * 0.14;   // м'яке доганяння — без ривків від коліщатка
      if (Math.abs(target - cur) < 0.005) cur = target;
    }
    const i = Math.round(cur);
    keep(cur);
    // зони обличчя перемикаються від прокрутки: 8 зон на всю довжину
    if (!intro && zoneReady) { if (scrollY < 5) { if (!auto) auto = setTimeout(() => { tick(); auto = setInterval(tick, 2800); }, 600); } else if (auto) { clearInterval(auto); auto = null; lastZone = -1; } }   // до прокрутки зони чергуються самі; з прокруткою — знову з першої
    if (zoneReady && !auto) { const z = Math.min(cos.length - 1, Math.floor(p * cos.length)); if (z !== lastZone) { lastZone = z; k = z; tick(); } }
    if (Math.abs(cur - drawn) > .004) { if (drawMix(cur)) drawn = cur; else if (draw(i)) drawn = i; }
    if (coWrap && heroK) {
      const f = Math.min(cur, FY.length - 1), a = Math.floor(f), b = Math.min(a + 1, FY.length - 1), t = f - a;
      coWrap.style.translate = ((FX[a] + (FX[b] - FX[a]) * t) * heroK).toFixed(1) + 'px ' + ((FY[a] + (FY[b] - FY[a]) * t) * heroK).toFixed(1) + 'px';
      // підпис активної зони не заходить на DERM HUB і за нижній край екрана
      const lb = coWrap.querySelector('.co.on .lb');
      if (lb !== lbEl) { if (lbEl) lbEl.style.top = ''; lbEl = lb; lbShift = 0; }
      if (lb) {
        const r = lb.getBoundingClientRect(), base = r.bottom - (parseFloat(lb.style.top) || 0);
        let lim = Math.min(innerHeight, heroFrame.getBoundingClientRect().bottom) - 16;
        if (word && word.offsetParent && word.firstElementChild) { const w1 = word.firstElementChild.getBoundingClientRect(), w2 = word.lastElementChild.getBoundingClientRect(); if (r.right > w1.left - 20 && r.left < w2.right + 20 && w1.top < lim) lim = Math.min(lim, w1.top - 10); }
        const sh = Math.min(0, Math.round(lim - base));
        if (sh !== lbShift) { lbShift = sh; lb.style.top = sh + 'px'; }
      }
    }
    requestAnimationFrame(loop);
  };
  frames[0].onload = () => { drawn = -1; };
  requestAnimationFrame(loop);
}

// фон «Про клініку»: варіант з адреси ?about=warm|interior|wood (тимчасово, для вибору)

// поява карток: кожна секція — свій ефект; ті, що з'являються разом, — по черзі
{
  const groups = [['.dirs .dir', 'appear'], ['#results .ba', 'slide'], ['#reviews .rvx-grid', 'fade'], ['#equipment .tile', 'blur'], ['#about .ab-glass', 'pop'], ['#bookForm, .foot-card, .foot-main .map', 'fade']];
  const aio = new IntersectionObserver(es => {
    es.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
      .forEach((e, n) => { e.target.style.setProperty('--ad', Math.min(n, 7) * 110 + 'ms'); e.target.classList.add('anim-in'); aio.unobserve(e.target); });
  }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  groups.forEach(([sel, type]) => document.querySelectorAll(sel).forEach(el => { el.dataset.anim = type; aio.observe(el); }));
}

// відгуки: спершу 6, решта — за кнопкою
{ const more = document.querySelector('.rvx-more'), grid = document.querySelector('.rvx-grid');
  if (more && grid) more.addEventListener('click', () => { const open = grid.classList.toggle('all'); more.setAttribute('aria-expanded', open); more.firstChild.textContent = open ? T('Згорнути відгуки ', 'Collapse reviews ') : T('Ще відгуки ', 'More reviews '); more.querySelector('.rvx-n').hidden = open; if (!open) grid.scrollIntoView({ block: 'start' }); });
}

// оригінал відгуку — у маленькому поп-апі
{ const d = document.getElementById('shot');
  if (d) {
    const img = d.querySelector('img');
    const close = () => { d.close ? d.close() : d.removeAttribute('open'); document.documentElement.classList.remove('modal-open'); };
    document.querySelectorAll('[data-shot]').forEach(b => b.addEventListener('click', () => { img.src = b.dataset.shot; d.showModal ? d.showModal() : d.setAttribute('open', ''); document.documentElement.classList.add('modal-open'); }));
    d.querySelector('[data-close]').addEventListener('click', close);
    d.addEventListener('click', e => { if (e.target === d) close(); });
    d.addEventListener('close', () => document.documentElement.classList.remove('modal-open'));
  }
}

// телефон і планшет: замість кадрів на скролі — коротке зациклене відео (на комп'ютері не вантажиться)
{ const v = document.querySelector('video.hero-mob');
  if (v) {
    const pick = () => {
      if (innerWidth > 1100 && !document.documentElement.classList.contains('noseq')) return;
      const land = innerWidth > 640 && (innerWidth > innerHeight || innerWidth > 1100);   // планшет горизонтально — горизонтальне відео
      const src = land ? 'img/hero-face.mp4' : innerWidth <= 640 ? 'img/hero-mob.mp4' : 'img/hero-mob-hd.mp4';
      if (v.dataset.src === src) return;
      v.classList.toggle('land', land); v.poster = land ? 'img/hero-poster.jpg' : 'img/hero-mob-poster.jpg';
      v.dataset.src = src; v.src = src;
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches) { v.autoplay = true; v.play().catch(() => {}); }
    };
    pick(); addEventListener('resize', pick);
  }
}

// паралакс нижче відгуків: фон запису повільніший за текст, DERM HUB виїжджає знизу
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const book = document.querySelector('.booking'), big = document.querySelector('.bigword');
  const cl = (v, a, b) => Math.min(b, Math.max(a, v));
  let queued = false;
  const par = () => {
    queued = false;
    const H = innerHeight;
    if (book) { const r = book.getBoundingClientRect(); if (r.bottom > -100 && r.top < H + 100) book.style.setProperty('--py', (cl((r.top + r.height / 2 - H / 2) / H, -1.2, 1.2) * -150).toFixed(1) + 'px'); }
    if (big) { const r = big.getBoundingClientRect(), top0 = r.top - (big._by || 0) * r.height / 100; const k = cl((H - top0) / (r.height * 0.95), 0, 1); big._by = (1 - k) * 55; big.style.setProperty('--by', big._by.toFixed(1) + '%'); }
  };
  const ask = () => { if (!queued) { queued = true; requestAnimationFrame(par); } };
  addEventListener('scroll', ask, { passive: true }); addEventListener('resize', ask); par();
}

// курсор у стилі точок зон із хіро (лише для миші)
if (matchMedia('(hover:hover) and (pointer:fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const cur = document.createElement('div'); cur.className = 'cur off'; cur.setAttribute('aria-hidden', 'true'); document.body.appendChild(cur);
  document.documentElement.classList.add('has-cur');
  const HOT = 'a,button,select,label,summary,[role=button],.co .pt,.tab,.slot,.langs,.pyr-tier';
  const TXT = 'input:not([type=checkbox]):not([type=radio]),textarea';
  addEventListener('pointermove', e => {
    cur.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
    const t = e.target.closest ? e.target : null;
    cur.classList.toggle('off', !!(t && t.closest(TXT)));
    cur.classList.toggle('act', !!(t && t.closest(HOT)));
  }, { passive: true });
  document.addEventListener('pointerleave', () => cur.classList.add('off'));
  document.addEventListener('pointerenter', () => cur.classList.remove('off'));
}

// піраміда догляду: на дотик — показати частоту; на телефоні частота під текстом
document.querySelectorAll('.pyr-tier').forEach(t => {
  const fq = t.querySelector('.pyr-badge em'); t.querySelector('.pyr-txt').dataset.fq = fq ? fq.textContent : '';
  t.addEventListener('click', () => { const on = !t.classList.contains('on'); document.querySelectorAll('.pyr-tier.on').forEach(x => x.classList.remove('on')); t.classList.toggle('on', on); });
});

// Про клініку: ?ab=2 — показати варіант без обох карток (для порівняння)
if (/[?&]ab=2\b/.test(location.search)) document.documentElement.classList.add('ab-v2');

// піраміда: при кожному заході на екран яруси виростають знизу догори, потім ярус 01 на мить показує частоту
document.querySelectorAll('.pyr').forEach(p => {
  const sec = p.closest('section');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) { if (sec) sec.classList.add('cp-in'); return; }
  const tiers = [...p.querySelectorAll('.pyr-tier')]; tiers.forEach((t, k) => t.style.setProperty('--i', tiers.length - 1 - k));
  p.classList.add('pyr-anim'); let tm;
  new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting && e.intersectionRatio >= .45) {
      if (p.classList.contains('pyr-in')) return;
      p.classList.add('pyr-in'); if (sec) sec.classList.add('cp-in');
      if (innerWidth <= 700) return;
      const last = tiers[tiers.length - 1];
      tm = setTimeout(() => { if (!p.querySelector('.pyr-tier.on, .pyr-tier:hover')) { last.classList.add('on'); tm = setTimeout(() => last.classList.remove('on'), 2200); } }, tiers.length * 200 + 900);
    } else if (!e.isIntersecting) { p.classList.remove('pyr-in'); if (sec) sec.classList.remove('cp-in'); clearTimeout(tm); tiers.forEach(t => t.classList.remove('on')); }
  }), { threshold: [0, .45] }).observe(p);
});

// відео у «Про клініку»: грає лише коли секцію видно; на телефоні й при «менше анімацій» — заставка
document.querySelectorAll('.ab-video').forEach(v => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { v.removeAttribute('autoplay'); v.pause(); v.preload = 'none'; return; }
  new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }), { threshold: .1 }).observe(v);
});


// «До і після»: 3 варіанти фону (A — темна галерея, B — кремовий, C — разом з відгуками на градієнті); перемикач видно лише на localhost або з ?ba
(() => {
  const KEY = 'dh-ba', html = document.documentElement;
  const get = () => { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  const set = v => { html.classList.remove('ba-a', 'ba-b', 'ba-c'); html.classList.add('ba-' + v); try { localStorage.setItem(KEY, v); } catch (e) {} };
  const q = (location.search.match(/[?&]ba=([ab])/) || [])[1];
  const saved = get(); set(q || 'b');
  if (!/[?&]ba=/.test(location.search)) return; // перемикач — лише з ?ba=a|b
  const w = document.createElement('div'); w.className = 'ba-switch'; w.innerHTML = '<span>' + T('До/після:', 'Before/after:') + '</span>' + ['a', 'b'].map(v => '<button type="button" data-v="' + v + '">' + v.toUpperCase() + '</button>').join('');
  document.body.appendChild(w);
  const mark = () => w.querySelectorAll('button').forEach(b => b.classList.toggle('on', html.classList.contains('ba-' + b.dataset.v)));
  w.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; set(b.dataset.v); mark(); document.getElementById('results').scrollIntoView({ behavior: 'smooth' }); });
  mark();
})();

// відео у «Про клініку»: якщо браузер не запустив його одразу — пробуємо ще раз, коли дані підвантажились або після першої взаємодії
document.querySelectorAll('.ab-video').forEach(v => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const vis = () => { const r = v.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; };
  const kick = () => { if (v.paused && vis()) v.play().catch(() => {}); };
  v.addEventListener('loadeddata', kick); v.addEventListener('canplay', kick);
  ['pointerdown', 'keydown', 'touchstart', 'scroll'].forEach(ev => addEventListener(ev, kick, { passive: true }));
});

// карта в «Контактах»: власний векторний стиль на тайлах OpenFreeMap (без ключа) у кольорах сайту, з червоним піном; SVG — запасний варіант
(() => {
  const box = document.querySelector('.map'); if (!box) return;
  const LL = [30.9524525, 50.3566422], V = '4.7.1', EN = document.documentElement.lang === 'en';
  const C = { bg: '#E7DFD6', res: '#E3DAD0', green: '#D6D2C3', water: '#9C8F85', bld: '#D8CCC0', bldLine: '#CBBDB0',
    minor: '#FFFFFF', major: '#FFFFFF', majorCase: '#C9BAAD', trunk: '#7A6D66', rail: '#A79A90',
    txt: '#6B5F58', txtMain: '#2A2321', halo: '#E7DFD6', poi: '#4A3F3A' };
  const NAME = ['coalesce', ['get', EN ? 'name:en' : 'name:uk'], ['get', EN ? 'name:latin' : 'name'], ['get', 'name']];
  const F = ['Noto Sans Regular'], FB = ['Noto Sans Bold'], src = 'omt';
  const cls = (...c) => ['match', ['get', 'class'], c, true, false];
  const W = (a, b, c) => ['interpolate', ['exponential', 1.5], ['zoom'], 12, a, 15, b, 18, c];
  const line = (id, f, color, w, extra = {}) => ({ id, type: 'line', source: src, 'source-layer': 'transportation', filter: f, layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': color, 'line-width': w, ...extra } });
  const POI = cls('park', 'school', 'college', 'place_of_worship', 'town_hall', 'railway', 'bus', 'library', 'stadium', 'sports_centre', 'cafe', 'monument', 'attraction', 'museum', 'theatre', 'cinema');
  const style = {
    version: 8, glyphs: 'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf',
    sources: { [src]: { type: 'vector', url: 'https://tiles.openfreemap.org/planet' } },
    layers: [
      { id: 'bg', type: 'background', paint: { 'background-color': C.bg } },
      { id: 'res', type: 'fill', source: src, 'source-layer': 'landuse', filter: cls('residential', 'suburb', 'neighbourhood'), paint: { 'fill-color': C.res } },
      { id: 'green', type: 'fill', source: src, 'source-layer': 'landcover', filter: cls('grass', 'wood', 'farmland'), paint: { 'fill-color': C.green, 'fill-opacity': .8 } },
      { id: 'park', type: 'fill', source: src, 'source-layer': 'park', paint: { 'fill-color': C.green } },
      { id: 'water', type: 'fill', source: src, 'source-layer': 'water', paint: { 'fill-color': C.water } },
      { id: 'waterway', type: 'line', source: src, 'source-layer': 'waterway', paint: { 'line-color': C.water, 'line-width': 1.6 } },
      { id: 'bld', type: 'fill', source: src, 'source-layer': 'building', minzoom: 14, paint: { 'fill-color': C.bld, 'fill-outline-color': C.bldLine } },
      line('minor', cls('minor', 'service'), C.minor, W(.5, 3.2, 14)),
      line('major-case', cls('secondary', 'tertiary'), C.majorCase, W(2, 8, 26)),
      line('major', cls('secondary', 'tertiary'), C.major, W(1.2, 6, 22)),
      line('trunk', cls('primary', 'trunk', 'motorway'), C.trunk, W(2, 6, 20)),
      line('rail', cls('rail', 'transit'), C.rail, 1.4, { 'line-dasharray': [3, 2] }),
      { id: 'road-name', type: 'symbol', source: src, 'source-layer': 'transportation_name', minzoom: 13.5,
        layout: { 'symbol-placement': 'line', 'text-field': NAME, 'text-font': F, 'text-size': ['interpolate', ['linear'], ['zoom'], 14, 10.5, 17, 13], 'text-letter-spacing': .04 },
        paint: { 'text-color': C.txt, 'text-halo-color': C.halo, 'text-halo-width': 1.6 } },
      { id: 'poi-dot', type: 'circle', source: src, 'source-layer': 'poi', minzoom: 14.5, filter: ['all', ['has', 'name'], POI],
        paint: { 'circle-radius': 3.2, 'circle-color': C.poi, 'circle-stroke-color': '#fff', 'circle-stroke-width': 1.4, 'circle-opacity': .75 } },
      { id: 'poi', type: 'symbol', source: src, 'source-layer': 'poi', minzoom: 14.5, filter: ['all', ['has', 'name'], POI],
        layout: { 'text-field': NAME, 'text-font': F, 'text-size': 11.5, 'text-max-width': 8, 'text-anchor': 'left', 'text-offset': [.9, 0], 'text-justify': 'left' },
        paint: { 'text-color': C.poi, 'text-halo-color': C.halo, 'text-halo-width': 1.6 } },
      { id: 'place', type: 'symbol', source: src, 'source-layer': 'place', filter: cls('suburb', 'neighbourhood', 'quarter', 'town', 'city', 'village'),
        layout: { 'text-field': NAME, 'text-font': FB, 'text-size': ['match', ['get', 'class'], ['city', 'town'], 16, 12], 'text-transform': 'uppercase', 'text-letter-spacing': .14 },
        paint: { 'text-color': C.txtMain, 'text-halo-color': C.halo, 'text-halo-width': 2, 'text-opacity': .8 } }
    ]
  };
  const load = () => new Promise((ok, no) => {
    if (window.maplibregl) return ok();
    const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = `js/vendor/maplibre-gl.css?v=${V}`; document.head.appendChild(l);
    const s = document.createElement('script'); s.src = `js/vendor/maplibre-gl.js?v=${V}`; s.onload = ok; s.onerror = no; document.head.appendChild(s);
  });
  const init = () => load().then(() => {
    const el = document.createElement('div'); el.className = 'map-gl'; el.setAttribute('aria-hidden', 'true'); box.prepend(el);
    const m = new maplibregl.Map({ container: el, style, center: [LL[0] + .0008, LL[1] - .0012], zoom: 14.9, interactive: false, attributionControl: false, fadeDuration: 0 });
    box._gl = m;
    const pin = document.createElement('div'); pin.className = 'map-pin'; pin.innerHTML = '<i></i><b></b><span>Derm Hub</span>';
    new maplibregl.Marker({ element: pin, anchor: 'center' }).setLngLat(LL).addTo(m);
    m.once('idle', () => box.classList.add('gl-on')); m.once('load', () => setTimeout(() => box.classList.add('gl-on'), 1500));
  }).catch(e => console.warn('map:', e));
  if (!('IntersectionObserver' in window)) return init();
  const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); init(); } }, { rootMargin: '800px 0px' });
  io.observe(box);
})();

// усі фонові відео: грають, коли їх видно; якщо браузер сам зупинив (iOS, економія заряду) — запускаємо знову при дотику чи прокрутці
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const seen = new Set();
  const io = new IntersectionObserver(es => es.forEach(e => { const v = e.target; if (e.isIntersecting) { seen.add(v); v.play().catch(() => {}); } else { seen.delete(v); v.pause(); } }), { threshold: .05 });
  document.querySelectorAll('video[loop]').forEach(v => {
    v.muted = true; v.playsInline = true; io.observe(v);
    v.addEventListener('pause', () => setTimeout(() => { if (seen.has(v) && v.paused && !document.hidden) v.play().catch(() => {}); }, 250));
  });
  const kick = () => seen.forEach(v => { if (v.paused) v.play().catch(() => {}); });
  ['touchstart', 'pointerdown', 'scroll'].forEach(ev => addEventListener(ev, kick, { passive: true }));
  document.addEventListener('visibilitychange', () => { if (!document.hidden) kick(); });
})();

// телефон: піраміда догляду з ширшими ярусами (щоб текст вміщався всередині); на комп'ютері — форма з розмітки
(() => {
  const tiers = [...document.querySelectorAll('.pyr-tier')]; if (tiers.length !== 5) return;
  const orig = tiers.map(t => [t.querySelector('polygon').getAttribute('points'), t.style.getPropertyValue('--m'), t.style.getPropertyValue('--tw')]);
  const TOP = [0, 30, 36, 41, 45.5], BOT = [30, 36, 41, 45.5, 50], TW = ['52%', '58%', '68%', '78%', '86%'];
  tiers.forEach(t => { const em = t.querySelector('.pyr-badge em'), tx = t.querySelector('.pyr-txt'); if (em && tx) tx.dataset.fq = em.textContent; });
  const mq = matchMedia('(max-width:700px)');
  const apply = () => tiers.forEach((t, i) => {
    const p = t.querySelector('polygon');
    if (mq.matches) { p.setAttribute('points', `${50 - TOP[i]},0 ${50 + TOP[i]},0 ${50 + BOT[i]},100 ${50 - BOT[i]},100`); t.style.setProperty('--m', ((TOP[i] + BOT[i]) / 100).toFixed(3)); t.style.setProperty('--tw', TW[i]); }
    else { p.setAttribute('points', orig[i][0]); t.style.setProperty('--m', orig[i][1]); t.style.setProperty('--tw', orig[i][2]); }
  });
  apply(); mq.addEventListener('change', apply);
})();
