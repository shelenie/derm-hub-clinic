// Derm Hub price list — English version of js/prices.js (same prices, same structure).
// Price: number (UAH) or a string when the source slide gives a range. null — no price on the slides.

const R = (name, price, note) => ({ name, price, note });

window.PRICES = [
  {
    id: 'care', tab: 'Skincare', photo: 'img/f-masktowel.jpg', photoPos: '50% 35%', photoAlt: 'Skincare: face mask',
    cards: [
      { cat: 'Skincare', title: 'Facials and HydraFacial', short: 'Machine and combination facials, back facials', svc: 'Facials and skincare',
        about: {"text":"Cleansing clears pores of comedones and excess sebum. HydraFacial is a machine-based treatment: vacuum cleansing, gentle exfoliation and hydrating serums in one visit.","title":"What it helps with","list":["Enlarged pores and comedones","Oily or combination skin","Dull complexion","Preparing skin for other treatments"]},
        groups: [{ h: 'Skincare treatments', rows: [
          R('HydraFacial', 2500, 'hydradermabrasion'), R('Deep-cleansing facial', 1500),
          R('Deep-cleansing facial + alginate mask', 1800, 'matched to skin type'), R('Deep-cleansing facial + light chemical peel', 2000),
          R('Back facial', 2500)] }] },
      { cat: 'Skincare', title: 'Chemical peels', short: 'Mandelic, azelaic, RETIX, BIOREPEEL, PRX-T33', svc: 'Peel',
        about: {"text":"A peel applies acids that exfoliate the top layer of cells and trigger skin renewal. The doctor chooses the formula and depth for your skin type and goal.","title":"What it helps with","list":["Post-acne and uneven texture","Pigmentation","Enlarged pores","Dull complexion"]},
        groups: [{ h: 'Chemical peels', rows: [
          R('Mandelic + DMAE', 1000), R('Azelaic', 1000), R('Ferulic', 1000),
          R('RETIX', 3500), R('BIOREPEEL', 2000), R('PRX-T33', 2000), R('JALUPRO GLOW PEEL', 1700)] }] },
      { cat: 'Skincare', title: 'Facials and carboxytherapy', short: 'Hydropeptide, Smart4Derma, UsoLab', svc: 'Facials and skincare',
        about: {"text":"A facial means cleansing, active serums and masks matched to your skin. Carboxytherapy saturates the skin with carbon dioxide and improves microcirculation.","title":"What it helps with","list":["Dehydrated skin","Dull complexion","Puffiness","Recovery after a season change or stress"]},
        groups: [{ h: 'Facials', rows: [
          R('Hydropeptide vitamin C facial', 1700), R('Hydropeptide facial', 1700, 'for sensitive skin'),
          R('Hydropeptide Luxe facial', 2600), R('Smart4Derma facial', 1300, 'for combination / oily skin'),
          R('Smart4Derma enzyme facial', 1300, 'for sensitive skin'),
          R('Smart4Derma carboxytherapy', 1500), R('UsoLab brightening carboxytherapy', 2000)] }] },
      { cat: 'Skincare', title: 'Dermapen', short: 'Microneedling with active cocktails', svc: 'Dermapen',
        about: {"text":"Dermapen is microneedling: the device makes controlled micro-punctures that let active cocktails into the skin. In response, the skin starts its own repair.","title":"What it helps with","list":["Post-acne and scars","Enlarged pores","Loss of firmness","Uneven tone"],"photo":"img/dermapen.webp"},
        groups: [{ h: 'Dermapen +', rows: [
          R('Skinclinic plant exosomes', 3600), R('Pressensa brightening concentrate', 2600),
          R('Skinclinic Argireline 10%', 2600), R('Skinclinic Glutathione 2%', 2600)] }] },
    ],
  },
  {
    id: 'inj', tab: 'Injections', photo: 'img/f-lips.jpg', photoPos: '50% 35%', photoAlt: 'Injectable aesthetics',
    cards: [
      { cat: 'Injections', title: 'Botox & neurotoxins', short: 'Nabota, Neuronox, Xeomin, Dysport, Botox', svc: 'Botox & neurotoxins',
        about: {"text":"Neurotoxins like Botox relax the muscles that create expression lines. The skin above them smooths out, while facial expressions stay natural.","title":"What it helps with","list":["Forehead lines","Frown line","Crow's feet around the eyes"]},
        groups: [{ h: 'Nabota · Neuronox', wide: true, rows: [
          R('Frown lines', 3600), R('Forehead · frown lines', 5500), R('Forehead · frown lines · eyes', 7500), R('Eyes', 3700),
          R('Nose', 1900), R('Eyes · nose', 4000), R('Lips', 2500), R('Platysma', 5000, 'neck'), R('Chin', 1900),
          R('Masseter', 4800), R('Underarms · palms · feet', 8700, 'for excessive sweating'), R('Full Face', 15000)] }],
        notes: ['Nabota · Neuronox for men — +15% to the price list', 'Xeomin · Dysport · Botox — +10% to the price list, +30% for men'] },
      { cat: 'Injections', title: 'Lip filler', short: 'Saypha, Belotero, Juvederm, Stylage, Aileene', svc: 'Lip filler',
        about: {"text":"Lips are shaped with hyaluronic acid fillers: adding volume, defining the contour, correcting asymmetry.","title":"What it helps with","list":["Volume","Defined contour","Asymmetry","Lip hydration"]},
        groups: [{ h: 'Lips', rows: [
          R('Saypha filler', 7000, '1 ml'), R('Belotero Lips Shape', 6300, '0.6 ml'), R('Juvederm Ultra 2', 6000, '0.55 ml'),
          R('Stylage M', 7200, '1 ml'), R('Aileene Vol.2', 6500, '1.1 ml')] },
          { h: 'Hyaluronidase', extra: true, rows: [R('PB Serum Drain+', 2500)] }] },
      { cat: 'Injections', title: 'Skin boosters', short: 'Rejuran, Plinest, Jalupro, Twac, Vitaran, ZQ II', svc: 'Skin boosters',
        about: {"text":"Biorevitalizants and polynucleotides are injected into the skin with micro-injections. They hydrate deeply and stimulate skin repair from within.","title":"What it helps with","list":["Dehydrated skin","Fine lines","Skin around the eyes","Recovery after sun exposure"],"photo":"img/serum-poster.webp"},
        groups: [{ h: 'Skin boosters', wide: true, rows: [
          R('Rejuran Healer', 5500), R('Rejuran S', 4000), R('Rejuran I', 3800), R('Rejuran HB', 4200),
          R('Plinest', 3800, '1 ml'), R('Plinest Eye', 3800, '1 ml'), R('Plinest', 6500, '2 ml'),
          R('Jalupro Classic', 3500), R('Jalupro HWM', 3900), R('Twac 2.0', 5500), R('Twac Eyes', 3800), R('Ami Eyes', 3800),
          R('Vitaran', 4500, '1 ml'), R('Vitaran', 6500, '2 ml'), R('Mezoten Agualight', 4500),
          R('Plenhyage XL Strong', 6500, '2 ml'), R('+ under-eye cannula, if needed', 7000),
          R('ZQ II', 9000, '1 syringe 5 ml · biostimulator based on poly-L-lactic and tranexamic acids')] }] },
      { cat: 'Injections', title: 'Lifting and contouring', short: 'Radiesse, Facetem, Juvelook, Lenisna', svc: 'Injectable treatments',
        about: {"text":"Collagen stimulators and fillers restore volume and a defined facial contour. The effect builds gradually, together with your own collagen.","title":"What it helps with","list":["Blurred facial contour","Volume loss","Sagging tissue","Age-related skin changes"]},
        groups: [
          { h: 'Vector lifting', rows: [R('Radiesse', 10000, '1.5 ml'), R('Radiesse', 19000, '3 ml'), R('Facetem non-surgical lift', 13500)] },
          { h: 'Facial sculpting', rows: [R('Cheekbones', 'from 6,500 to 8,500', '1 ml'), R('Chin', 'from 6,500 to 8,500', '1 ml')] },
          { h: 'Hybrid fillers', sub: 'based on 3rd-generation polylactic acid', rows: [
            R('Juvelook — under-eye area', 8500), R('Juvelook — face + neck + décolletage', 18000), R('Lenisna — face + neck', 18000)] }] },
      { cat: 'Injections', title: 'Blanching and lipolytics', short: 'Belotero, Bivishaine, FAT Apoptosis', svc: 'Injectable treatments',
        about: { text: 'Blanching suits those who want to reduce wrinkles as naturally as possible. To keep the result, the treatment should be repeated several times at 1–2 month intervals.', photo: 'img/ba-blanching.jpg' },
        groups: [
          { h: 'Blanching', rows: [R('Belotero Soft', 7000, '1 ml'), R('Belotero Balance', 7500, '1 ml'), R('Bivishaine', 6000, '1 ml')] },
          { h: 'Lipolytics', rows: [R('FAT Apoptosis', 1250, '5 ml'), R('FAT Apoptosis', 2400, '10 ml'), R('FAT Apoptosis', 4000, '20 ml')] }] },
    ],
  },
  {
    id: 'laser', tab: 'Lasers and devices', photo: 'img/laser-legs.webp', photoPos: '50% 30%', photoAlt: 'Laser hair removal',
    cards: [
      { cat: 'Laser', title: 'Asclepion yellow laser', short: 'Vessels, pigmentation, rejuvenation', svc: 'Yellow laser',
        about: {"text":"The yellow laser targets hemoglobin and melanin: it reduces spider veins and redness and evens out pigmentation. The skin is not damaged by the treatment.","title":"What it helps with","list":["Spider veins","Rosacea and redness","Pigment spots","Rejuvenation"]},
        groups: [{ h: 'Areas and goals', rows: [
          R('Spot treatment', 'from 200 to 2,000'), R('Nose area', 2850), R('Cheeks', 3500),
          R('Laser rejuvenation', 3500, 'no downtime'), R('Décolletage', 3500),
          R('Vessel and pigmentation treatment', 4200), R('Full face', 4500)] }] },
      { cat: 'Laser', title: 'Medicalazer CO2 resurfacing', short: 'Face, neck, décolletage, body, scars', svc: 'CO2 resurfacing',
        about: {"text":"A fractional CO2 laser creates micro-channels in the skin and triggers its renewal. The skin becomes firmer and its texture smoother.","title":"What it helps with","list":["Scars and post-acne","Wrinkles","Stretch marks","Uneven texture"]},
        groups: [{ h: 'Areas', rows: [
          R('Face', 6700), R('Face + neck', 8500), R('Face + neck + décolletage', 9000),
          R('Under-eye area', 4300), R('Body', 6200), R('Scars', 'from 1,000 to 6,000')] },
          { h: 'Add-ons', extra: true, rows: [R('Finishing with plant exosomes', 2800)] }] },
      { cat: 'Devices', title: 'RF microneedling', short: 'Face, neck, abdomen, thighs; course of 4–5 visits', svc: 'RF microneedling',
        about: { text: 'RF microneedling combines microneedling and radiofrequency lifting. Micro-punctures stimulate natural cell renewal, and RF heating triggers the production of collagen, elastin and hyaluronic acid. The skin becomes denser, firmer and lifted.',
          list: ['Smaller pores', 'Lifted facial contour', 'Smoother nasolabial folds and fine lines', 'Better skin tone and texture', 'Less post-acne, scarring and stretch marks'],
          foot: 'Results are visible after 2 treatments. Once a month, a course of 4–5 visits on average.', photo: 'img/ba-rf-face.webp' },
        groups: [{ h: 'Tips and areas', rows: [
          R('1 tip', 5500, 'face'), R('2 tips', 8000, 'face · neck · décolletage'),
          R('1 tip', 5500, 'abdomen'), R('2 tips', 8500, 'abdomen · thighs'),
          R('1 tip', 5000, 'thighs'), R('2 tips', 8000, 'thighs · knees')] }],
        notes: ['Course of 4–5 visits, once a month'] },
      { cat: 'Laser', title: 'Laser hair removal', short: 'Women and men, single areas and packages', svc: 'Laser hair removal', cols3: true,
        about: {"text":"The laser destroys the hair follicle, and hair in the area stops growing. A course of treatments is needed for a lasting result.","title":"Areas","list":["Face","Underarms","Arms","Legs","Bikini","Area packages"],"photo":"img/laser-legs2.webp"},
        groups: [
          { h: 'Women · areas', wide: true, rows: [
            R('Face', '350 · 800', '1 area · full face'), R('Neck', 400, 'front · back'), R('Full arms', 900),
            R('Arms', 600, 'below elbow · above elbow'), R('Areolas', 300), R('Underarms', 500), R('Abdomen', '600 · 350', 'full · belly line'),
            R('Buttocks · lower back', 600), R('Deep bikini', 900), R('Deep bikini + part of thigh', 1100),
            R('Classic bikini', 700, 'along the underwear line'), R('Full legs', 1450), R('Shins · with knee', '800 · 900'), R('Thighs', 800)] },
          { h: 'Women · packages', rows: [
            R('Deep bikini + underarms', 1200), R('Shins + knee + underarms', 1200),
            R('Deep bikini + underarms + shins + knee', 2000), R('Deep bikini + underarms + full legs', 2400)] },
          { h: 'Men · areas', wide: true, rows: [
            R('Underarms', 700), R('Chest', 700), R('Abdomen', 900), R('Hands + fingers', 500), R('Fingers', 250),
            R('Full legs', 2100), R('Shins · thighs', 1100), R('Arms below elbow', 700), R('Full arms', 1100),
            R('Full back', 1400), R('Buttocks', 1000), R('Classic bikini', 1000), R('Deep bikini', 1400), R('Neck', '700–1,000')] },
          { h: 'Men · packages', rows: [
            R('Underarms + deep bikini', 1800), R('Underarms + chest + abdomen', 1900), R('Underarms + deep bikini + full legs', 3800)] }],
        notes: ['Specialists: Lida and Alina'] },
    ],
  },
  {
    id: 'derm', tab: 'Dermatology', photo: 'img/derm-face.jpg', photoPos: '50% 42%', photoAlt: 'Facial skin diagnostics',
    cards: [
      { cat: 'Dermatology', title: 'Removal of skin growths', short: 'Keratomas, papillomas, nevi; radiowave or yellow laser', svc: 'Removal of skin growths',
        about: {"text":"Benign growths — keratomas, papillomas, nevi — are removed with a radiowave device or the yellow laser. A dermatologist examines the growth before removal.","photo":"img/consult.webp"},
        groups: [
          { h: 'By size, per growth', rows: [R('Up to 5 mm', 200), R('Up to 10 mm', 500), R('Up to 20 mm', 700), R('Up to 50 mm', 1000)] },
          { h: 'By quantity', rows: [R('5–10 growths', 1500), R('10–20 growths', 3000)] },
          { h: 'By type, per growth', rows: [R('Milium', 150), R('Wart', 'from 300 to 500'), R('Angioma', 400), R('Keratoma', 600), R('Nevus', 1000), R('Nevus, difficult area', 1500)] },
          { h: 'Add-ons', rows: [R('Local anesthetic injection', 200), R('Dermatoscopy before removal', 800)] }] },
      { cat: 'Consultations', title: 'Doctor consultations', short: 'Dermatology, trichology, aesthetics, pediatric', svc: 'Consultation',
        about: {"text":"Your doctor examines your skin or hair, makes a diagnosis and puts together a treatment or skincare plan. FotoFinder is used for mole diagnostics, trichoscopy for hair."},
        matrix: {
          head: 'Consultation',
          cols: ['Uliana Mazurets', 'Anastasiia Taraban', 'Tetiana Zaients'],
          rows: [
            ['Trichology + trichoscopy, first visit', '40 min', 1500, '1500*', 1800],
            ['Trichology + trichoscopy, follow-up', 'within 3 months · 20 min', 1200, '1200*', 1500],
            ['Dermatology, first visit', '40 min', 1300, 1300, 1500],
            ['Dermatology, follow-up', 'within 3 months · 20 min', 1100, 1100, 1200],
            ['Pediatric, first visit', 'under 14 · 40 min', 1200, 1200, 1500],
            ['Pediatric, follow-up', 'within 3 months · 20 min', 1000, 1000, 1100],
            ['Aesthetics', 'skincare routine, treatment plan', 1200, 1200, 1500],
            ['Combined: trichology + dermatology', '50 min', 2100, 2100, 2500],
            ['Combined: trichology + aesthetics', '50 min', 2100, 2100, 2500],
          ] },
        notes: ['* Anastasiia Taraban offers pediatric trichology consultations with trichoscopy'] },
      { cat: 'Dermatology', title: 'Intralesional injection', short: 'Medication provided by the clinic', svc: 'Intralesional injection',
        about: {"text":"The medication is injected directly into the affected area — for example, in alopecia areata."},
        groups: [{ h: 'Medication provided by the clinic', rows: [R('Betamethasone', 2000), R('Triamcinolone', 2000)] }] },
    ],
  },
  {
    id: 'hair', tab: 'Trichology', photo: 'img/tricho-scope.webp', photoPos: '60% 40%', photoAlt: 'Trichoscopy: the doctor examines the scalp',
    cards: [
      { cat: 'Trichology', title: 'Trichologist consultation with trichoscopy', short: 'Hair and scalp diagnostics', svc: 'Trichology',
        about: {"text":"Trichoscopy is a magnified examination of the scalp and hair. The trichologist finds the root cause and puts together a treatment plan.","title":"When to come","list":["Hair loss","Alopecia","Dandruff and itching","Brittle, thin hair"]},
        groups: [
          { h: 'Uliana Mazurets', rows: [R('First visit', 1500, '40 min'), R('Follow-up visit', 1200, 'within 3 months · 20 min')] },
          { h: 'Tetiana Zaients', rows: [R('First visit', 1800, '40 min'), R('Follow-up visit', 1500, 'within 3 months · 20 min')] },
          { h: 'Anastasiia Taraban — pediatric', rows: [R('First visit', 1500, '40 min'), R('Follow-up visit', 1200, 'within 3 months · 20 min')] }] },
      { cat: 'Trichology', title: 'Hair therapy', short: 'Medavita, Orising, NaGolovy, Dr.Sorbie', svc: 'Trichology',
        about: {"text":"Professional care programs for hair and scalp with Medavita, Orising, NaGolovy and Dr.Sorbie products. The program is chosen for the condition of your hair."},
        groups: [{ h: 'Programs', wide: true, rows: [
          R('“Hydration” program', 'from 2,000 to 2,500', 'dry, porous, dull hair after sun or heat styling'),
          R('“Repair” program', 'from 2,000 to 3,000', 'brittle, weakened hair damaged by coloring'),
          R('“Reconstruction” program', 'from 2,500 to 3,000', 'after bleaching, frequent coloring, chemical treatments'),
          R('“Smoothness” program', 'from 2,000 to 2,500', 'frizzy, porous, unruly hair'),
          R('“Express care” program', 'from 2,300 to 3,000', 'before an important event or as maintenance'),
          R('Scalp peel', 500, 'as part of a repair program')] }],
        notes: ['The program is chosen after an in-person consultation and hair diagnostics', 'The price depends on hair length and density', 'The consultation is included in the treatment price'] },
      { cat: 'Trichology', title: 'Scalp rehabilitation', short: 'Dandruff, seborrhea, itching, psoriasis, hair growth', svc: 'Trichology',
        about: {"text":"Scalp treatments: cleansing, peeling and active products for a specific problem.","title":"What it helps with","list":["Dandruff","Seborrhoea","Itching","Supporting hair growth"]},
        groups: [{ h: 'Programs', wide: true, rows: [
          R('“Balance” program', 'from 3,000 to 4,000', 'oily scalp, dandruff, seborrhea, seborrheic dermatitis'),
          R('“Comfort” program', 'from 3,000 to 4,000', 'sensitive scalp: itching, irritation, redness'),
          R('“Repair” program', 'from 3,000 to 4,000', 'dry scalp, pH restoration after coloring'),
          R('“Rehabilitation” program', 'from 3,200 to 4,200', 'psoriasis, sebopsoriasis, pityriasis amiantacea'),
          R('“Hair growth” program', 'from 3,500 to 4,500', 'stimulating growth, reducing hair loss'),
          R('Scalp peel', 500, 'as part of a repair program')] }],
        notes: ['The program is chosen after an in-person consultation and trichoscopy (Medavita, Orising, 4System)', 'The consultation is included in the treatment price'] },
      { cat: 'Trichology', title: 'TOKIO INKARAMI', short: 'Total hair reconstruction', svc: 'Trichology',
        about: {"text":"A Japanese hair reconstruction treatment: restores the structure along the full length and brings back smoothness and shine.","title":"What it helps with","list":["Damaged hair","After coloring","Brittleness","Dullness"]},
        groups: [
          { h: 'Total reconstruction', sub: 'For dry, damaged, brittle, porous hair', rows: [
            R('Short hair', 'from 2,200 to 2,500', 'to the shoulders'), R('Medium length', 'from 2,500 to 2,800', 'to the shoulder blades'),
            R('Long hair', 'from 3,000 to 3,200', 'shoulder blades to waist'), R('Extra long', 'from 3,200 to 3,600', 'below the waist')] },
          { h: 'Additional trichology services', extra: true, rows: [
            R('Scalp peel', 1600), R('Trimming the ends', 500), R('At-home care consultation', 600)] }] },
      { cat: 'Trichology', title: 'Meso- and plasma therapy', short: 'HairFiller, Dutabiot; PRP, PRF', svc: 'Meso- and plasma therapy',
        about: { text: 'Plasma therapy is a treatment in which the patient’s own platelet-rich plasma is injected into the skin. It stimulates regeneration and collagen production and brings back a healthy glow.',
          title: 'Suits you if', list: ['Your skin has lost firmness', 'You have wrinkles or acne scars', 'Your skin is depleted after sun or a season change', 'You want to prevent aging'], photo: 'img/plasma.webp' },
        groups: [
          { h: 'Mesotherapy', rows: [R('HairFiller', 4500), R('Dutabiot', 3500)] },
          { h: 'MM-Medic plasma therapy', rows: [
            R('PRP', 3000, '1 tube'), R('PRP', 4000, '2 tubes'), R('PRF', 3500, '2 tubes'),
            R('PRP face', 3200, '1 tube'), R('PRP face and neck', 4200, '2 tubes')] }] },
    ],
  },
  {
    id: 'body', tab: 'Body', photo: 'img/presso-spa.webp', photoPos: '50% 45%', photoAlt: 'Pressotherapy', photoNote: 'Trial endosphere session — from UAH 700',
    cards: [
      { cat: 'Body', title: 'Endosphere therapy', short: 'Body and face; trial sessions, courses of 5 and 10 sessions', svc: 'Endosphere',
        about: { text: 'Endosphere therapy is a device massage with compressive micro-vibration: a roller with spheres works on the tissues of the body or face.', title: 'What it helps with', list: ['Swelling', 'Cellulite', 'Skin tone', 'Lymphatic drainage'], foot: 'Works well combined with pressotherapy — this enhances the effect.', photo: 'img/endo-roller.jpg' },
        matrix: { head: 'Session', cols: ['Body · 30 min', 'Body · 45 min', 'Body · 60 min', 'Face · 30 min'], rows: [
          ['Trial session', '', 700, 800, 900, null],
          ['1 session', '', 850, 1200, 1300, 850],
          ['5 sessions', 'course', 4000, 5200, 5600, 3700],
          ['10 sessions', 'course', 7000, 10000, 11000, 7500]] },
        groups: [
          { h: 'Body + face', rows: [R('Body 45 min + face 30 min', 1700), R('Body 60 min + face 30 min', 1850)] }],
        notes: ['Specialists: Alina and Lida'] },
      { cat: 'Body', title: 'Pressotherapy', short: 'Full body; 30, 45, 60 min and courses', svc: 'Pressotherapy',
        about: { text: 'Pressotherapy is a device lymphatic drainage massage with compressed air. A special suit inflates in sequence and gently compresses different areas of the body.',
          title: 'What it helps with', list: ['Stimulates lymph flow', 'Helps reduce swelling', 'Improves venous return', 'Reduces heaviness in the legs', 'Gives a feeling of lightness and comfort'],
          foot: 'Works well combined with endosphere therapy.', photo: 'img/presso-boot.webp' },
        groups: [
          { h: 'Single session', rows: [R('30 min', 400), R('45 min', 600), R('60 min', 760)] },
          { h: '5 sessions', rows: [R('30 min each', 1800), R('45 min each', 2800), R('60 min each', 3600)] },
          { h: '10 sessions', rows: [R('30 min each', 3800), R('45 min each', 5800), R('60 min each', 7300)] }] },
    ],
  },
];
