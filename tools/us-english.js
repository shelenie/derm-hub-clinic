// Одноразова правка EN-текстів на американський лад: js/prices-en.js і англійська частина tools/build-en.js.
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const L = [
  // spelling
  ['Programmes', 'Programs'], ['programmes', 'programs'], ['programme', 'program'],
  ['colouring', 'coloring'], ['haemoglobin', 'hemoglobin'], ['seborrhoeic', 'seborrheic'], ['seborrhoea', 'seborrhea'],
  ['ageing', 'aging'], ['paediatrician', 'pediatrician'], ['décolleté', 'décolletage'], ['Décolleté', 'Décolletage'],
  ['Injection anaesthesia', 'Local anesthetic injection'], ['Licence', 'License'],
  // terms Americans actually use
  ['Dermatology and cosmetology centre in Boryspil: evidence-based dermatology, trichology, device and injectable cosmetology. Prices on the website, online booking.',
   'Dermatology and aesthetics clinic in Boryspil, Ukraine: evidence-based dermatology, hair and scalp care, laser and injectable treatments. Transparent prices and online booking.'],
  ['dermatology and cosmetology in Boryspil', 'dermatology & aesthetics in Boryspil'],
  ['Dermatology · Trichology · Cosmetology · Boryspil', 'Dermatology · Hair & Scalp · Aesthetics · Boryspil'],
  ['Evidence-based dermatology, trichology, device and injectable cosmetology.', 'Evidence-based dermatology, hair and scalp care, plus laser and injectable aesthetics.'],
  ['Evidence-based dermatology <span class="it">and cosmetology</span>', 'Evidence-based dermatology <span class="it">and aesthetics</span>'],
  ['Injectable <span class="it">cosmetology</span>', 'Injectable <span class="it">aesthetics</span>'],
  ['Injectable cosmetology', 'Injectable aesthetics'],
  ['Botulinum therapy, bio-repair, contouring', 'Botox, skin boosters, fillers'],
  ['botulinum therapy · from', 'Botox · from'],
  ['Botulinum therapy', 'Botox & neurotoxins'],
  ['Botulinum toxin relaxes', 'Neurotoxins like Botox relax'],
  ['Lip contouring', 'Lip filler'], ['lip contouring · from', 'lip filler · from'],
  ['Bio-repair', 'Skin boosters'], ['bio-repair · from', 'skin boosters · from'],
  ['Microneedle RF lifting', 'RF microneedling'], ['Microneedle RF', 'RF microneedling'], ['microneedle RF · from', 'RF microneedling · from'],
  ['Microneedle<br><span class="it">RF lifting</span>', 'RF<br><span class="it">microneedling</span>'],
  ['Microneedle RF combines microneedling and radiofrequency lifting.', 'RF microneedling combines microneedling with radiofrequency energy.'],
  ['I had three microneedle RF treatments with you.', 'I had three RF microneedling sessions with you.'],
  ['Facial cleansing and HydraFacial', 'Facials and HydraFacial'],
  ["'Skincare and cleansing'", "'Facials and skincare'"], ['<option>Skincare and cleansing</option>', '<option>Facials and skincare</option>'],
  ['Device and combined cleansing, back cleansing', 'Machine and combination facials, back facials'],
  ['HydraFacial is a device treatment:', 'HydraFacial is a machine-based treatment:'],
  ["'device cleansing'", "'hydradermabrasion'"],
  ['Combined facial cleansing', 'Deep-cleansing facial'],
  ['Facial cleansing + alginate mask', 'Deep-cleansing facial + alginate mask'],
  ['Cleansing + superficial acid peel', 'Deep-cleansing facial + light chemical peel'],
  ['Back cleansing', 'Back facial'],
  ['<b>Facial cleansing</b>', '<b>Deep-cleansing facial</b>'], ['<b>Skin cleansing</b>', '<b>Facial</b>'],
  ["title: 'Peels'", "title: 'Chemical peels'"], ['<b>Peels</b>', '<b>Chemical peels</b>'], ["h: 'Peels'", "h: 'Chemical peels'"],
  ['Mandelic, azelaic, RETIX', 'Mandelic, azelaic, RETIX'],
  ['Glabella', 'Frown lines'], ['Forehead · glabella', 'Forehead · frown lines'],
  ["'hyperhidrosis treatment'", "'for excessive sweating'"],
  ['periorbital area', 'under-eye area'],
  ["'full · linea alba'", "'full · belly line'"],
  ['Clinic’s medication', 'Medication provided by the clinic'],
  ['By size, 1 pc', 'By size, per growth'], ['By type, 1 pc', 'By type, per growth'],
  ['5 to 10 pcs', '5–10 growths'], ['10 to 20 pcs', '10–20 growths'],
  ['Dermatologist, trichologist, cosmetologist, children', 'Dermatology, trichology, aesthetics, pediatric'],
  ['Children, first visit', 'Pediatric, first visit'], ['Children, follow-up', 'Pediatric, follow-up'],
  ["['Cosmetology', 'skincare selection, treatment plan'", "['Aesthetics', 'skincare routine, treatment plan'"],
  ['trichology + cosmetology', 'trichology + aesthetics'],
  ['offers a children’s trichology consultation', 'offers pediatric trichology consultations'],
  ['Anastasiia Taraban — children', 'Anastasiia Taraban — pediatric'],
  ['The doctor examines your skin or hair, makes a diagnosis and draws up a treatment or skincare plan.', 'Your doctor examines your skin or hair, makes a diagnosis and puts together a treatment or skincare plan.'],
  ['The trichologist finds the cause of the problem and draws up a treatment plan.', 'The trichologist finds the root cause and puts together a treatment plan.'],
  ['Home care consultation', 'At-home care consultation'],
  // UI copy
  ['<span>Chief physician · cosmetologist, dermatologist, trichologist</span>', '<span>Medical director · dermatologist, trichologist, aesthetic physician</span>'],
  ['<span>Cosmetologist, dermatologist</span>', '<span>Dermatologist, aesthetic physician</span>'],
  ['<span>Cosmetologist, dermatologist, trichologist</span>', '<span>Dermatologist, trichologist, aesthetic physician</span>'],
  ['Chief physician — Tetiana Zaients. The team includes dermatologists, trichologists, cosmetologists and a hair specialist.',
   'Led by medical director Tetiana Zaients, our team includes dermatologists, trichologists, aesthetic physicians and a hair care specialist.'],
  ['alt="Hair specialist"', 'alt="Hair care specialist"'], ['<span>Hair specialist</span>', '<span>Hair care specialist</span>'],
  ['<small>treatments are performed by doctors</small>', '<small>all treatments done by physicians</small>'],
  ['<small>mole examination</small>', '<small>mole mapping</small>'],
  ['(&nbsp;We treat&nbsp;)', '(&nbsp;What we treat&nbsp;)'],
  ['<li>dull tone</li>', '<li>dull skin</li>'], ['<li>swelling</li>', '<li>puffiness</li>'],
  ['Choose a doctor when booking — or let the administrator choose for you.', 'Pick your doctor when you book, or let our front desk find the right match.'],
  ['Other — the administrator will advise', 'Not sure — our front desk will help'],
  ['<option>Any available</option>', '<option>First available</option>'],
  ['placeholder="How should we address you"', 'placeholder="Your name"'],
  ['<span>Free time · tomorrow</span>', '<span>Available times · tomorrow</span>'],
  ['aria-label="Free time"', 'aria-label="Available times"'],
  ['<span>01</span>Choose a service and a doctor', '<span>01</span>Choose a service and doctor'],
  ['<span>02</span>Pick a free time slot — it comes from the clinic’s schedule', '<span>02</span>Pick an open time slot from the clinic’s schedule'],
  ['<span>03</span>Get a confirmation via Telegram or SMS', '<span>03</span>Get a confirmation by Telegram or text'],
  ['<span>04</span>Reminders a day and 2 hours before your visit', '<span>04</span>Get reminders 24 hours and 2 hours before your visit'],
  ['<dt>Hours</dt><dd>daily 10:00–20:00</dd>', '<dt>Hours</dt><dd>daily, 10 AM–8 PM</dd>'],
  ['<span>Daily 10:00–20:00</span>', '<span>Daily, 10 AM–8 PM</span>'],
  ['Boryspil, daily 10:00–20:00.', 'Boryspil, daily, 10 AM–8 PM.'],
  ['Choose a treatment and a free time slot', 'Pick a treatment and an open time slot'],
  ['The doctor will choose a treatment during your visit', 'Your doctor will recommend a treatment at your visit'],
  // reviews
  ['Sincerely grateful to you.', 'I’m so grateful.'],
  ['Thank you for our Tania’s golden hands 💕', 'Thanks to Tania’s magic hands 💕'],
  ['My mum is very happy with the visit, and a happy mum means a happy me 🥰', 'My mom loved the visit, and a happy mom means a happy me 🥰'],
  ['My child’s wonderful paediatrician', 'My child’s wonderful pediatrician'],
  ['Ms Anastasiia', 'Ms. Anastasiia'],
  ['“Good afternoon! I liked everything, thank you! I’ll be back, more than once)”', '“Hi! I loved everything, thank you! I’ll definitely be back)”'],
  ['“Good afternoon, I liked everything, all is well, we’ll see the result”', '“Hi, I liked everything, all good, we’ll see how the results turn out”'],
  // policy
  ['Version of 22 November 2026', 'Last updated: November 22, 2026'],
  ['This is a translation for convenience. The Ukrainian version of this policy prevails.', 'This translation is provided for convenience. If there’s any discrepancy, the Ukrainian version applies.'],
];
for (const f of ['js/prices-en.js', 'tools/build-en.js']) {
  const p = path.join(root, f); let s = fs.readFileSync(p, 'utf8'); let n = 0;
  for (const [a, b] of L) if (s.includes(a)) { s = s.split(a).join(b); n++; }
  fs.writeFileSync(p, s); console.log(f, n, 'rules applied');
}
// слоти — у форматі AM/PM
const b = path.join(root, 'tools/build-en.js'); let s = fs.readFileSync(b, 'utf8');
if (!s.includes("['>10:00</button>'")) s = s.replace("  ['js/prices.js?', 'js/prices-en.js?'],", "  ['js/prices.js?', 'js/prices-en.js?'],\n  ['>10:00</button>', '>10:00 AM</button>'], ['>11:30</button>', '>11:30 AM</button>'], ['>13:00</button>', '>1:00 PM</button>'], ['>15:30</button>', '>3:30 PM</button>'], ['>17:00</button>', '>5:00 PM</button>'], ['>18:30</button>', '>6:30 PM</button>'],");
s = s.replace("'<span class=\"bt\">Book for 11:30</span>'", "'<span class=\"bt\">Book for 11:30 AM</span>'");
fs.writeFileSync(b, s);
