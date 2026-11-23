// Збирає en.html з index.html: заміни UA → EN. Запуск: node tools/build-en.js
// Після будь-яких змін в index.html запускати знову — en.html перезаписується.
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
let s = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

const DOC = {
  'Заєнц Тетяна': 'Tetiana Zaients', 'Тарабан Анастасія': 'Anastasiia Taraban', 'Мазурець Уляна': 'Uliana Mazurets',
  'Лікар Тетяна Заєнц': 'Dr. Tetiana Zaients', 'Лікар Анастасія Тарабан': 'Dr. Anastasiia Taraban',
};

// [українською, англійською] — довші фрази йдуть першими (сортуємо нижче)
const P = [
  // head / meta
  ['<html lang="uk"', '<html lang="en"'],
  ['<title>Derm Hub — дерматологія і косметологія у Борисполі</title>', '<title>Derm Hub — dermatology & aesthetics in Boryspil</title>'],
  ['Дермато-косметологічний центр у Борисполі: доказова дерматологія, трихологія, апаратна та ін\'єкційна косметологія. Ціни на сайті, онлайн-запис.', 'Dermatology and aesthetics clinic in Boryspil, Ukraine: evidence-based dermatology, hair and scalp care, laser and injectable treatments. Transparent prices and online booking.'],
  ['Derm Hub — на головну', 'Derm Hub — home'],
  ['aria-label="Розділи"', 'aria-label="Sections"'],
  ['<div class="langs"><button type="button" class="on">UA</button><button type="button">EN</button></div>', '<div class="langs en"><button type="button">UA</button><button type="button" class="on">EN</button></div>'],
  ['aria-label="Меню"', 'aria-label="Menu"'],
  ['Послуги і ціни', 'Services &amp; prices'], ['>Обладнання<', '>Equipment<'], ['>Лікарі<', '>Doctors<'], ['>Відгуки<', '>Reviews<'], ['>Контакти<', '>Contacts<'], ['>Про клініку<', '>About the clinic<'],
  ['Записатися онлайн', 'Book online'],
  ['<a class="btn head-cta" href="#booking">Записатися</a>', '<a class="btn head-cta" href="#booking">Book now</a>'],
  // hero
  ['Жінка з доглянутою шкірою відкриває очі й усміхається', 'A woman with well-cared-for skin opens her eyes and smiles'],
  ['Жінка з доглянутою шкірою заплющує й відкриває очі', 'A woman with well-cared-for skin closes and opens her eyes'],
  ['<b>Мімічні зморшки</b><span>ботулінотерапія · від 1 900 грн</span>', '<b>Expression lines</b><span>Botox · from UAH 1,900</span>'],
  ['<b>Дрібні зморшки</b><span>бланшинг · від 1 250 грн</span>', '<b>Fine lines</b><span>blanching · from UAH 1,250</span>'],
  ['<b>Зневоднена шкіра</b><span>біорепарація · від 3 500 грн</span>', '<b>Dehydrated skin</b><span>skin boosters · from UAH 3,500</span>'],
  ['<b>Судини і пігментація</b><span>жовтий лазер · від 200 грн</span>', '<b>Vessels and pigmentation</b><span>yellow laser · from UAH 200</span>'],
  ['<b>Рубці і постакне</b><span>CO2-шліфування · від 1 000 грн</span>', '<b>Scars and post-acne</b><span>CO2 resurfacing · from UAH 1,000</span>'],
  ['<b>Губи</b><span>контурна пластика · від 6 000 грн</span>', '<b>Lips</b><span>lip filler · from UAH 6,000</span>'],
  ['<b>Пори і тон шкіри</b><span>мікроголковий RF · від 5 000 грн</span>', '<b>Pores and skin tone</b><span>RF microneedling · from UAH 5,000</span>'],
  ['<b>Овал обличчя</b><span>ліфтинг і моделювання · від 6 500 грн</span>', '<b>Facial contour</b><span>lifting and contouring · from UAH 6,500</span>'],
  ['Дерматологія · Трихологія · Косметологія · Бориспіль', 'Dermatology · Hair & Scalp · Aesthetics · Boryspil'],
  ['Доказова дерматологія, трихологія, апаратна та ін\'єкційна косметологія.', 'Evidence-based dermatology, hair and scalp care, plus laser and injectable aesthetics.'],
  ['<b class="hg-name">Мімічні зморшки</b>', '<b class="hg-name">Expression lines</b>'],
  ['Послуги та ціни<i></i>', 'Services and prices<i></i>'],
  // dirs
  ['aria-label="Популярні процедури"', 'aria-label="Popular treatments"'],
  ['Популярні <span class="it">процедури</span>', 'Popular <span class="it">treatments</span>'],
  ['aria-label="Назад"', 'aria-label="Back"'], ['aria-label="Далі"', 'aria-label="Next"'],
  ['<b>Ботулінотерапія</b><small>від 1 900 грн</small>', '<b>Botox & neurotoxins</b><small>from UAH 1,900</small>'],
  ['<b>Контурна пластика губ</b><small>від 6 000 грн</small>', '<b>Lip filler</b><small>from UAH 6,000</small>'],
  ['<b>Біорепарація</b><small>від 3 500 грн</small>', '<b>Skin boosters</b><small>from UAH 3,500</small>'],
  ['<b>Ліфтинг і моделювання</b><small>від 6 500 грн</small>', '<b>Lifting and contouring</b><small>from UAH 6,500</small>'],
  ['<b>Пілінги</b><small>від 1 000 грн</small>', '<b>Chemical peels</b><small>from UAH 1,000</small>'],
  ['<b>Чистки і HydraFacial</b><small>від 1 500 грн</small>', '<b>Facials and HydraFacial</b><small>from UAH 1,500</small>'],
  ['<b>Мезо- і плазмотерапія</b><small>ціни в прайсі</small>', '<b>Meso- and plasma therapy</b><small>prices in the price list</small>'],
  // services
  ['Послуги <span class="it">і ціни</span>', 'Services <span class="it">and prices</span>'],
  ['aria-label="Напрями"', 'aria-label="Areas"'],
  // reviews
  ['(&nbsp;Роботи лікарів Derm Hub&nbsp;)', '(&nbsp;by Derm Hub doctors&nbsp;)'],
  ['До <span class="it">і після</span>', 'Before <span class="it">and after</span>'],
  ['Більше відгуків у Instagram', 'More reviews on Instagram'],
  ['Більше в Instagram', 'More on Instagram'],
  ['aria-label="Фільтр"', 'aria-label="Filter"'],
  ['data-f="all">Усі<', 'data-f="all">All<'], ['data-f="face">Обличчя<', 'data-f="face">Face<'], ['data-f="hair">Волосся<', 'data-f="hair">Hair<'],
  ['<span class="b1">До</span><span class="b2">Після</span>', '<span class="b1">Before</span><span class="b2">After</span>'],
  [': до і після"', ': before and after"'],
  ['Гніздова алопеція, тотальна форма', 'Alopecia areata, total form'],
  ['Гніздова алопеція', 'Alopecia areata'],
  ['Синдром втраченого анагену', 'Loose anagen syndrome'],
  ['Гостре дифузне випадіння', 'Acute diffuse hair loss'],
  ['Мікроголковий RF-ліфтинг', 'RF microneedling'],
  ['Контурна пластика губ', 'Lip filler'],
  ['>Бланшинг<', '>Blanching<'], ['"Бланшинг:', '"Blanching:'],
  ['RF-ліфтинг', 'RF lifting'],
  ['Лікування акне', 'Acne treatment'],
  ['Жовтий лазер', 'Yellow laser'],
  ['Після 2 процедур, 1 раз на місяць · ', 'After 2 treatments, once a month · '],
  ['Після 3 процедур · ', 'After 3 treatments · '],
  ['1 → 10 місяців лікування · ', '1 → 10 months of treatment · '],
  ['Лікування 3 місяці · ', '3 months of treatment · '],
  ['Лікування 6 місяців · ', '6 months of treatment · '],
  ['3 місяці: волосся потовщилось, менше випадає · ', '3 months: thicker hair, less shedding · '],
  ['(&nbsp;Відгуки пацієнтів&nbsp;)', '(&nbsp;Patient feedback&nbsp;)'],
  ['Що пишуть <span class="it">після візиту</span>', 'What patients say <span class="it">after a visit</span>'],
  ['«Зробила у вас три процедури мікроголкового RF. Як результат, зменшились пори, покращився тон шкіри, а що найважливіше, підтягнулося не тільки обличчя, а і носогубка. Результат був помітний вже після першої процедури, а зараз я просто в захваті. Раджу всім 🤍»',
   '“I had three RF microneedling sessions with you. As a result, my pores got smaller, my skin tone improved and, most importantly, not only my face but also my nasolabial area got lifted. The result was visible after the first treatment, and now I’m simply delighted. I recommend it to everyone 🤍”'],
  ['«Зробила у вас дві процедури з лазерного видалення судин, за дві процедури більше ніж на 50% зменшилися почервоніння, результат чудовий 🔥🔥🔥 Щиро вдячна вам.»',
   '“I had two laser vessel removal treatments with you, and after two treatments the redness went down by more than 50%. The result is great 🔥🔥🔥 I’m so grateful.”'],
  ['«Вчора робила RF. Це просто вау процедура!!! Практично безболісно, але навіть той маленький біль, який був, він вартий кінцевого результату. Дякую за золоті руки нашої Тані 💕»',
   '“I had RF yesterday. It’s simply a wow treatment!!! Almost painless, and even the little pain there was is worth the final result. Thanks to Tania’s magic hands 💕”'],
  ['«Можете передати Анастасії дякую за чистку обличчя і за підібраний догляд, я вже бачу результат, шкіра зволожена та не стягнута, все зробила, що вона порекомендувала, і я дуже вдячна 🤍»',
   '“Please pass on my thanks to Anastasiia for the facial cleansing and the skincare she chose. I can already see the result: my skin is hydrated and not tight. I did everything she recommended and I’m very grateful 🤍”'],
  ['«Хочу висловити слова подяки Анастасії 🤗 Як і минулого разу Анастасія була дуже уважною та чуйною. Мама дуже задоволена візитом, а щаслива мама — щаслива я 🥰»',
   '“I want to thank Anastasiia 🤗 Just like last time, Anastasiia was very attentive and caring. My mom loved the visit, and a happy mom means a happy me 🥰”'],
  ['«Візит був дуже вдалим, дякую! Маю вже свого косметолога Анастасію, прекрасний педіатр моєї дитини стала ще професійним косметологом, відчувається професійна школа)!»',
   '“The visit went very well, thank you! Now I have my own skin doctor, Anastasiia. My child’s wonderful pediatrician turns out to be a pro in aesthetics too — you can tell she’s had great training)!”'],
  ['«Мені дуже сподобалась лікар Анастасія. Одразу викликала до себе прихильність 🥰 Дуже уважна, просто та зрозуміло все пояснила, підібрала догляд 🥰 Дякую 🫶»',
   '“I really liked Dr. Anastasiia. She won me over right away 🥰 Very attentive, explained everything simply and clearly, and chose my skincare 🥰 Thank you 🫶”'],
  ['«Хотіла б залишити відгук про лікаря Анастасію. Ну така вона вже ж хороша! Мені було дуууже комфортно. Дякую ❤️»',
   '“I’d like to leave a review about Dr. Anastasiia. She is just so lovely! I felt sooo comfortable. Thank you ❤️”'],
  ['«Так, мені все сподобалось, лікар дуже ввічлива та позитивна, я дуже задоволена, що обрала вашу клініку)»',
   '“Yes, I liked everything, the doctor is very polite and positive, I’m very happy I chose your clinic)”'],
  ['«Теж все добре, була нещодавно на чистці шкіри, дуже сподобалася пані Анастасія 🌸»',
   '“All good too, I recently had a skin cleansing and really liked Ms. Anastasiia 🌸”'],
  ['«Добрий день! Все сподобалось, дякую! Ще повернусь і не раз)»',
   '“Hi! I loved everything, thank you! I’ll definitely be back)”'],
  ['«Добрий день, все сподобалось, все добре, будемо дивитися на результат»',
   '“Hi, I liked everything, all good, we’ll see how the results turn out”'],
  ['aria-hidden="true">ТЗ<', 'aria-hidden="true">TZ<'], ['aria-hidden="true">АТ<', 'aria-hidden="true">AT<'],
  ['<b>Мікроголковий RF</b>', '<b>RF microneedling</b>'],
  ['<b>Видалення судин</b>', '<b>Vessel removal</b>'],
  ['<b>Чистка обличчя</b>', '<b>Deep-cleansing facial</b>'],
  ['<b>Чистка шкіри</b>', '<b>Facial</b>'],
  ['<b>Відгук про лікаря</b>', '<b>Review of the doctor</b>'],
  ['<b>Відгук про клініку</b>', '<b>Review of the clinic</b>'],
  ['<b>Підбір догляду</b>', '<b>Skincare selection</b>'],
  ['aria-label="Переглянути оригінал повідомлення" title="Оригінал повідомлення"', 'aria-label="View the original message (in Ukrainian)" title="Original message (in Ukrainian)"'],
  ['Ще відгуки <span class="rvx-n">', 'More reviews <span class="rvx-n">'],
  // equipment
  ['Обладнання <span class="it">і методики</span>', 'Equipment <span class="it">and techniques</span>'],
  ['alt="Діагностика шкіри"', 'alt="Skin diagnostics"'],
  ['<span class="tag">Діагностика</span>', '<span class="tag">Diagnostics</span>'],
  ['FotoFinder <span class="it">і трихоскопія</span>', 'FotoFinder <span class="it">and trichoscopy</span>'],
  ['Родимки, волосся і шкіра голови', 'Moles, hair and scalp'],
  ['<span class="tag">Лазер</span>', '<span class="tag">Laser</span>'],
  ['Жовтий лазер<br><span class="it">Asclepion</span>', 'Yellow laser<br><span class="it">Asclepion</span>'],
  ['<li>Судини і розацеа</li><li>Пігментація</li><li>Омолодження</li>', '<li>Vessels and rosacea</li><li>Pigmentation</li><li>Rejuvenation</li>'],
  ['alt="Лазерна епіляція"', 'alt="Laser hair removal"'],
  ['Лазерна <span class="it">епіляція</span>', 'Laser <span class="it">hair removal</span>'],
  ['Жінки і чоловіки, зони і комплекси', 'Women and men, areas and packages'],
  ['CO2-шліфування<br><span class="it">Medicalazer</span>', 'CO2 resurfacing<br><span class="it">Medicalazer</span>'],
  ['<li>Рубці і постакне</li><li>Текстура шкіри</li><li>Зона під очима</li>', '<li>Scars and post-acne</li><li>Skin texture</li><li>Under-eye area</li>'],
  ['alt="Ін\'єкційна процедура"', 'alt="Injection treatment"'],
  ['<span class="tag">Ін\'єкції</span>', '<span class="tag">Injections</span>'],
  ['Ін\'єкційна <span class="it">косметологія</span>', 'Injectable <span class="it">aesthetics</span>'],
  ['Ботулінотерапія, біорепарація, контурна пластика', 'Botox, skin boosters, fillers'],
  ['<span class="tag">Апарати</span>', '<span class="tag">Devices</span>'],
  ['Мікроголковий<br><span class="it">RF-ліфтинг</span>', 'RF<br><span class="it">microneedling</span>'],
  ['<li>Пори і тон</li><li>Ліфтинг обличчя і шиї</li><li>Тіло</li>', '<li>Pores and tone</li><li>Face and neck lifting</li><li>Body</li>'],
  // about
  ['(&nbsp;Про клініку&nbsp;)', '(&nbsp;About the clinic&nbsp;)'],
  ['Доказова дерматологія <span class="it">і косметологія</span>', 'Evidence-based dermatology <span class="it">and aesthetics</span>'],
  ['Головний лікар — Тетяна Заєнц. У команді дерматологи, трихологи, косметологи і майстер з волосся.', 'Led by medical director Tetiana Zaients, our team includes dermatologists, trichologists, aesthetic physicians and a hair care specialist.'],
  ['<span class="b-k">Ліцензія</span><b>МОЗ України</b><small>процедури проводять лікарі</small>', '<span class="b-k">License</span><b>Ministry of Health of Ukraine</b><small>all treatments done by physicians</small>'],
  ['<span class="b-k">Діагностика родимок</span><b>FotoFinder</b><small>огляд родимок</small>', '<span class="b-k">Mole diagnostics</span><b>FotoFinder</b><small>mole mapping</small>'],
  ['<span class="b-k">Діагностика волосся</span><b>Трихоскопія</b><small>волосся і шкіра голови</small>', '<span class="b-k">Hair diagnostics</span><b>Trichoscopy</b><small>hair and scalp</small>'],
  ['href="#booking">Записатися<i class="ln"', 'href="#booking">Book now<i class="ln"'],
  ['(&nbsp;Лікуємо&nbsp;)', '(&nbsp;What we treat&nbsp;)'],
  ['<li>акне</li><li>постакне і рубці</li><li>розацеа</li><li>судини</li><li>пігментація</li><li>мімічні зморшки</li><li>втрата пружності</li><li>овал обличчя</li><li>розширені пори</li><li>зневоднена шкіра</li><li>тьмяний тон</li><li>новоутворення</li><li>кератоми і папіломи</li><li>випадіння волосся</li><li>алопеція</li><li>лупа і себорея</li><li>пошкоджене волосся</li><li>небажане волосся</li><li>набряки</li><li>целюліт</li>',
   '<li>acne</li><li>post-acne and scars</li><li>rosacea</li><li>vessels</li><li>pigmentation</li><li>expression lines</li><li>loss of firmness</li><li>facial contour</li><li>enlarged pores</li><li>dehydrated skin</li><li>dull skin</li><li>skin growths</li><li>keratomas and papillomas</li><li>hair loss</li><li>alopecia</li><li>dandruff and seborrhea</li><li>damaged hair</li><li>unwanted hair</li><li>puffiness</li><li>cellulite</li>'],
  ['Лікарі <span class="it">Derm Hub</span>', 'Derm Hub <span class="it">doctors</span>'],
  ['Оберіть лікаря під час запису — або довірте вибір адміністратору.', 'Pick your doctor when you book, or let our front desk find the right match.'],
  ['<span>Головний лікар · косметолог, дерматолог, трихолог</span>', '<span>Medical director · dermatologist, trichologist, aesthetic physician</span>'],
  ['<span>Лікар-косметолог, дерматолог</span>', '<span>Dermatologist, aesthetic physician</span>'],
  ['<span>Косметолог, дерматолог, трихолог</span>', '<span>Dermatologist, trichologist, aesthetic physician</span>'],
  ['alt="Майстер з волосся"', 'alt="Hair care specialist"'],
  ['<b>Оксана</b><span>Майстер з волосся</span>', '<b>Oksana</b><span>Hair care specialist</span>'],
  ['aria-label="Записатися до Тетяни Заєнц"', 'aria-label="Book with Tetiana Zaients"'],
  ['aria-label="Записатися до Анастасії Тарабан"', 'aria-label="Book with Anastasiia Taraban"'],
  ['aria-label="Записатися до Уляни Мазурець"', 'aria-label="Book with Uliana Mazurets"'],
  ['aria-label="Записатися до Оксани"', 'aria-label="Book with Oksana"'],
  // booking
  ['(&nbsp;Онлайн-запис&nbsp;)', '(&nbsp;Online booking&nbsp;)'],
  ['<h2>Записатися<br><span class="it">онлайн</span></h2>', '<h2>Book<br><span class="it">online</span></h2>'],
  ['<span>01</span>Оберіть послугу і лікаря', '<span>01</span>Choose a service and doctor'],
  ['<span>02</span>Виберіть вільний час — він береться з розкладу клініки', '<span>02</span>Pick an open time slot from the clinic’s schedule'],
  ['<span>03</span>Отримайте підтвердження в Telegram або SMS', '<span>03</span>Get a confirmation by Telegram or text'],
  ['<span>04</span>Нагадування за день і за 2 години до візиту', '<span>04</span>Get reminders 24 hours and 2 hours before your visit'],
  ['<label class="field">Послуга', '<label class="field">Service'],
  ['<option>Догляди і чистки</option><option>Ботулінотерапія</option><option>Контурна пластика губ</option><option>Жовтий лазер</option><option>Мікроголковий RF-ліфтинг</option><option>Лазерна епіляція</option><option>Трихологія</option><option>Ендосфера</option><option>Інше — підкаже адміністратор</option>',
   '<option>Facials and skincare</option><option>Botox & neurotoxins</option><option>Lip filler</option><option>Yellow laser</option><option>RF microneedling</option><option>Laser hair removal</option><option>Trichology</option><option>Endosphere</option><option>Not sure — our front desk will help</option>'],
  ['<label class="field">Лікар', '<label class="field">Doctor'],
  ['<option>Будь-який вільний</option>', '<option>First available</option>'],
  ['<span>Вільний час · завтра</span>', '<span>Available times · tomorrow</span>'],
  ['aria-label="Вільний час"', 'aria-label="Available times"'],
  ['<label class="field">Ім\'я<input type="text" placeholder="Як до вас звертатися"', '<label class="field">Name<input type="text" placeholder="Your name"'],
  ['<label class="field">Телефон<input', '<label class="field">Phone<input'],
  ['<span>Погоджуюсь на обробку даних для запису та нагадувань (<a href="#privacy" data-privacy>політика конфіденційності</a>)</span>', '<span>I agree to the processing of my data for booking and reminders (<a href="#privacy" data-privacy>privacy policy</a>)</span>'],
  ['<span class="bt">Записатися на 11:30</span>', '<span class="bt">Book for 11:30 AM</span>'],
  ['або напишіть у <a', 'or message us on <a'],
  // footer
  ['(&nbsp;Контакти&nbsp;)', '(&nbsp;Contacts&nbsp;)'],
  ['<h2>Чекаємо вас <span class="it">у Борисполі</span></h2>', '<h2>See you <span class="it">in Boryspil</span></h2>'],
  ['<dt>Адреса</dt>', '<dt>Address</dt>'], ['>вул. Шевченка, 37</a>', '>37 Shevchenka St</a>'],
  ['<dt>Графік</dt><dd>щодня 10:00–20:00</dd>', '<dt>Hours</dt><dd>daily, 10 AM–8 PM</dd>'],
  ['<dt>Телефон</dt>', '<dt>Phone</dt>'], ['<dt>Соцмережі</dt>', '<dt>Social media</dt>'],
  ['Прокласти маршрут', 'Get directions'],
  ['aria-label="Відкрити Derm Hub на Google Картах"', 'aria-label="Open Derm Hub in Google Maps"'],
  ['startOffset="22%">вул. Шевченка</textPath>', 'startOffset="22%">Shevchenka St</textPath>'],
  ['Відкрити в Google Maps', 'Open in Google Maps'],
  ['(&nbsp;Розділи&nbsp;)', '(&nbsp;Sections&nbsp;)'],
  ['>Бориспіль, вул. Шевченка, 37</a><span>Щодня 10:00–20:00</span>', '>37 Shevchenka St, Boryspil</a><span>Daily, 10 AM–8 PM</span>'],
  ['<a class="btn btn-red btn-sm btn-arrow" href="#booking">Записатися<i', '<a class="btn btn-red btn-sm btn-arrow" href="#booking">Book now<i'],
  ['© Derm Hub, Бориспіль', '© Derm Hub, Boryspil'],
  ['data-privacy>Політика конфіденційності</a>', 'data-privacy>Privacy policy</a>'],
  // dialogs
  ['Політика <span class="it">конфіденційності</span>', 'Privacy <span class="it">policy</span>'],
  ['aria-label="Закрити"', 'aria-label="Close"'],
  ['aria-label="Оригінал відгуку"', 'aria-label="Original review"'],
  ['alt="Оригінал повідомлення з відгуком"', 'alt="Original message with the review"'],
  ['aria-label="Нагору"', 'aria-label="Back to top"'],
  ['js/prices.js?', 'js/prices-en.js?'],
  ['<link rel="canonical" href="https://derm-hub-clinic.vercel.app/">', '<link rel="canonical" href="https://derm-hub-clinic.vercel.app/en.html">'],
  ['<meta property="og:locale" content="uk_UA">', '<meta property="og:locale" content="en_US">'],
  ['<meta property="og:title" content="Derm Hub — дерматологія і косметологія у Борисполі">', '<meta property="og:title" content="Derm Hub — dermatology &amp; aesthetics in Boryspil">'],
  ['<meta property="og:description" content="Доказова дерматологія, трихологія, апаратна та ін\'єкційна косметологія. Ціни на сайті, онлайн-запис.">', '<meta property="og:description" content="Evidence-based dermatology, hair and scalp care, laser and injectable treatments. Transparent prices and online booking.">'],
  ['<meta property="og:url" content="https://derm-hub-clinic.vercel.app/">', '<meta property="og:url" content="https://derm-hub-clinic.vercel.app/en.html">'],
  ['og-uk.jpg?v=1', 'og-en.jpg?v=1'],
  ['<meta property="og:image:alt" content="Derm Hub — дерматологія і косметологія у Борисполі">', '<meta property="og:image:alt" content="Derm Hub — dermatology &amp; aesthetics in Boryspil">'],
  ['Піраміда <span class="it">догляду</span>', 'The skincare <span class="it">pyramid</span>'],
  ["(&nbsp;План догляду&nbsp;)", "(&nbsp;Care plan&nbsp;)"],
  ["Від щоденного догляду вдома до процедур у клініці.<br>Лікар складає план: що і як часто робити саме вам.", "From your daily routine at home to in-clinic treatments.<br>Your doctor builds a plan around exactly what you need and how often."],
  ["<b>Тіло</b><span>ендосфера, пресотерапія</span>", "<b>Body</b><span>Endosphere, pressotherapy</span>"],
  ["Курсами за планом лікаря", "In courses, per your plan"],
  ["<b>Ін'єкції</b><span>ботулінотерапія, біорепарація, філери</span>", "<b>Injectables</b><span>Botox, skin boosters, fillers</span>"],
  ["Раз на 6–8 місяців", "Every 6–8 months"],
  ["<b>Апаратні процедури</b><span>жовтий лазер, CO2, мікроголковий RF</span>", "<b>Laser & devices</b><span>Yellow laser, CO2, RF microneedling</span>"],
  ["Курсом, раз на пів року", "A course every 6 months"],
  ["<b>Доглядові процедури</b><span>чистки, HydraFacial, пілінги</span>", "<b>In-clinic skincare</b><span>Facials, HydraFacial, chemical peels</span>"],
  ["Щомісяця", "Monthly"],
  ["<b>Домашній догляд</b><span>засоби, які підбирає лікар: очищення, зволоження, SPF</span>", "<b>At-home routine</b><span>Doctor-picked products: cleanse, hydrate, SPF</span>"],
  ["Щодня: ранок і вечір", "Daily: AM &amp; PM"],
  ['>10:00</button>', '>10:00 AM</button>'], ['>11:30</button>', '>11:30 AM</button>'], ['>13:00</button>', '>1:00 PM</button>'], ['>15:30</button>', '>3:30 PM</button>'], ['>17:00</button>', '>5:00 PM</button>'], ['>18:30</button>', '>6:30 PM</button>'],
];

// політика конфіденційності — увесь блок
const polUA = s.slice(s.indexOf('<div class="pol-body">'), s.indexOf('</dialog>'));
const polEN = `<div class="pol-body">
    <p class="pol-date">Last updated: November 22, 2026</p>
    <p class="pol-note">This translation is provided for convenience. If there’s any discrepancy, the Ukrainian version applies.</p>
    <p>This policy explains what data the Derm Hub clinic website (37 Shevchenka St, Boryspil) collects, why it is needed and how we protect it. We process personal data in accordance with the Law of Ukraine “On Personal Data Protection”.</p>
    <h3>1. What data we receive</h3>
    <p>Only what you enter in the booking form yourself:</p>
    <ul><li>your name — so we know how to address you;</li><li>your phone number — to confirm the booking and remind you of the visit;</li><li>the chosen service, doctor, date and time.</li></ul>
    <p>Please do not enter diagnoses, test results or other health information in the form. The doctor will discuss them with you in person at the consultation.</p>
    <h3>2. Why we use it</h3>
    <ul><li>to book you with a doctor and confirm the booking;</li><li>to send you a reminder before the visit;</li><li>to contact you if the appointment time changes.</li></ul>
    <p>We do not send marketing messages without your separate consent and we do not sell data to third parties.</p>
    <h3>3. Legal basis</h3>
    <p>Your consent, which you give by ticking the box in the booking form. You can withdraw your consent at any time.</p>
    <h3>4. Who has access to the data</h3>
    <p>The clinic’s front desk staff and doctors — to the extent needed for booking and the appointment. We may use Telegram or SMS for confirmations and reminders: in that case the delivery service receives only your number and the message text.</p>
    <h3>5. How long we keep the data</h3>
    <p>As long as needed for booking and contacting you, or until you withdraw your consent. Medical records kept by the doctor during the appointment are stored according to the rules set by Ukrainian law.</p>
    <h3>6. How we protect the data</h3>
    <p>Only staff who need it for their work have access to bookings. We do not make your data publicly available.</p>
    <h3>7. Cookies</h3>
    <p>The website does not use advertising cookies and does not track you on other websites. Technical browser data may be stored only for the page to work correctly.</p>
    <h3>8. Your rights</h3>
    <p>You can find out what data of yours we store, correct it, ask us to delete it or withdraw your consent to processing. To do so, contact the clinic:</p>
    <ul><li>phone: <a href="tel:+380686065269">+380 68 606 52 69</a>;</li><li>Telegram: <a href="https://t.me/Doctors_AppointmentDERM_HUB" target="_blank" rel="noopener">@Doctors_AppointmentDERM_HUB</a>;</li><li>address: 37 Shevchenka St, Boryspil, daily, 10 AM–8 PM.</li></ul>
    <p>If you believe your rights have been violated, you can contact the Ukrainian Parliament Commissioner for Human Rights.</p>
    <h3>9. Changes to the policy</h3>
    <p>We may update this policy. The current version is always available on this website; the update date is shown at the top.</p>
  </div>
`;
s = s.replace(polUA, polEN);

// імена лікарів (у тому числі в data-doc і alt) — після фраз з «Лікар …»
const pairs = [...P, ...Object.entries(DOC)].sort((a, b) => b[0].length - a[0].length);
const missing = [];
for (const [ua, en] of pairs) {
  if (!s.includes(ua)) { missing.push(ua.slice(0, 70)); continue; }
  s = s.split(ua).join(en);
}
s = s.replace(/<option>Тарабан Анастасія<\/option>/g, '<option>Anastasiia Taraban</option>');
fs.writeFileSync(path.join(root, 'en.html'), s);

const left = [...new Set((s.match(/[А-Яа-яІіЇїЄєҐґ][^<>"]*/g) || []).map(x => x.slice(0, 60)))];
console.log('missing:', missing.length ? missing : 'none');
console.log('cyrillic left:', left.length ? left : 'none');
