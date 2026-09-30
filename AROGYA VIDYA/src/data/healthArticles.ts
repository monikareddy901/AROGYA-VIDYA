import { HealthArticle } from '../types';

export const HEALTH_ARTICLES: HealthArticle[] = [
  // --- MEN'S HEALTH ---
  {
    id: 'art-mens-holistic-wellness-guide',
    title: "Men’s Health & Wellness: Nutrition, Stamina, Sleep & Preventive Screening",
    category: 'mens_health',
    readTimeMinutes: 6,
    shortExplanation: "A comprehensive guide to men's cardiovascular health, visceral fat reduction, strength training, restorative sleep, and emotional wellbeing.",
    detailedExplanation: `Men's health extends far beyond fitness—it encompasses metabolic longevity, cardiovascular elasticity, mental resilience, and routine organ-based preventive screenings.

1. Nutrition for Men's Longevity:
- Lycopene-rich cooked tomatoes and dark leafy greens support prostate cellular health.
- Omega-3 fatty acids (sardines, salmon, mackerel, walnuts, flaxseeds) protect arterial lining and maintain healthy triglyceride levels.
- High-fiber millets (ragi, jowar, bajra) and whole oats regulate blood glucose and reduce stubborn visceral abdominal fat.
- Quality protein (eggs, lean poultry, paneer/tofu, lentils, chickpeas) sustains lean muscle tissue.
- Zinc & Magnesium sources (pumpkin seeds, almonds) aid natural testosterone synthesis and immune vitality.
- Hydration: 3.0 to 3.5 liters of clean water daily for active men.

2. Foods to Limit or Reduce:
- Excessive sugary sodas, packaged beverages, and energy drinks that drive liver and visceral fat accumulation.
- Highly processed, sodium-heavy packaged namkeens and snacks that elevate hypertension risk.
- Re-used deep-fried oils (trans fats) that accelerate arterial plaque.
- Excessive alcohol and tobacco/smoking (major causes of cardiovascular and erectile dysfunction).

3. The Power of Resistance & Aerobic Training:
Skeletal muscle is an active endocrine organ. Engaging in compound resistance training (squats, deadlifts, pushups, lunges) 3 times weekly paired with 150 minutes of aerobic exercise burns visceral fat, boosts insulin sensitivity, and optimizes hormonal vigor.

4. Sleep, Testosterone & Stress:
Over 80% of daily testosterone and growth hormone synthesis occurs during deep non-REM and REM sleep cycles. Sleeping less than 6 hours per night can drop daytime testosterone levels by up to 15%. Chronic workplace stress elevates cortisol, suppressing immune defense and energy.

5. Common Preventive Awareness (Educational & Non-Diagnostic):
- Hypertension: Zero early symptoms; check blood pressure annually (target < 120/80 mmHg).
- Type 2 Diabetes: South Asian men have elevated genetic vulnerability; monitor Fasting Blood Sugar and HbA1c yearly.
- Prostate Health: Notice urinary changes as you age past 45-50 (weak flow, nocturia).
- Testicular Self-Awareness: Perform a monthly self-check in a warm shower to detect painless hard lumps early.
- Sexual & Emotional Health: Erectile vitality mirrors cardiovascular health. Normalize discussing stress, burnout, and emotional health with qualified physicians.`,
    commonQuestions: [
      {
        question: "Why is belly fat (visceral fat) particularly dangerous for men?",
        answer: "Visceral fat surrounds vital organs and produces inflammatory cytokines. It also contains the enzyme aromatase, which converts testosterone into estrogen, lowering energy and muscle tone."
      },
      {
        question: "How often should adult men get a comprehensive health checkup?",
        answer: "Men under 40 should check blood pressure, blood glucose, and lipid profile every 1-2 years. Men over 40-45 should have annual preventive clinical checkups."
      }
    ],
    mythVsFact: [
      {
        myth: "Men don't need to worry about heart health or blood pressure until their 50s.",
        fact: "Atherosclerosis and high blood pressure can begin developing silently in your 20s and 30s.",
        explanation: "Early preventive habits, regular aerobic exercise, and low-sodium eating protect cardiovascular vessels for life."
      }
    ],
    healthyHabits: [
      "Walk 8,000 to 10,000 steps daily and strength train 3 days per week.",
      "Incorporate cooked tomatoes and zinc-rich pumpkin seeds into your weekly diet.",
      "Get 7-8 hours of sound nighttime sleep and prioritize mental rest."
    ],
    warningSigns: [
      "Shortness of breath, chest pressure, or radiating pain during mild exertion.",
      "Sudden new lump or swelling in the testicles or groin.",
      "Difficulty urinating, weak stream, or blood in the urine."
    ],
    whenToSeekHelp: [
      "Any sudden severe chest tightness or difficulty breathing (Emergency 112/108).",
      "Persistent unexplained fatigue, loss of stamina, or mood changes lasting more than 2-3 weeks.",
      "Routine annual preventive checkup with your general physician."
    ],
    trustedSources: [
      { name: "Men's Preventive Health Guidelines", organization: "CDC" },
      { name: "Cardiovascular Health in Men", organization: "American Heart Association" },
      { name: "Men's Health Foundation Evidence Base", organization: "NHS" }
    ],
    lastUpdated: "2026-02-28",
    tags: ["Men's Health", "Nutrition", "Cardiovascular", "Strength", "Preventive Care"]
  },
  {
    id: 'art-mens-testicular-awareness',
    title: "Testicular Health & Self-Awareness",
    category: 'mens_health',
    readTimeMinutes: 4,
    shortExplanation: "Understanding normal testicular anatomy, routine self-checks, and when to seek medical evaluation without embarrassment.",
    detailedExplanation: `Testicular health is an essential aspect of overall male wellbeing, particularly for adolescents and adult men aged 15 to 45. The testes produce testosterone and sperm and are naturally sensitive structures. 

Routine monthly self-awareness allows you to become familiar with what feels normal for your body. It is completely normal for one testicle (frequently the left) to hang slightly lower or be slightly larger than the other. The epididymis—a soft, cord-like coiled tube located at the back of each testicle—is also a normal anatomical structure.

A monthly check is best performed right after a warm shower or bath when the scrotal skin is relaxed. Gently roll each testicle between your thumb and fingers. You are checking for any new painless or painful hard lumps, sudden swelling, or changes in firmness.`,
    commonQuestions: [
      {
        question: "Is it normal for one testicle to be lower than the other?",
        answer: "Yes, in the vast majority of people, one testicle hangs lower than the other. This prevents them from compressing against each other during movement."
      },
      {
        question: "What should I do if I feel a small bump on the back of my testicle?",
        answer: "The epididymis is located on the upper and back part of each testicle and feels like a soft tube or small bump. However, any new, hard, or unfamiliar lump should be evaluated by a healthcare professional."
      }
    ],
    mythVsFact: [
      {
        myth: "All testicular lumps are cancerous.",
        fact: "The majority of testicular lumps turn out to be benign conditions such as cysts (spermatoceles), fluid collections (hydroceles), or enlarged veins (varicoceles).",
        explanation: "While most lumps are harmless, an examination and ultrasound by a doctor is necessary to confirm the diagnosis safely."
      }
    ],
    healthyHabits: [
      "Perform a gentle monthly self-check after a warm shower.",
      "Wear a protective athletic cup during contact sports.",
      "Maintain comfortable, breathable cotton underwear."
    ],
    warningSigns: [
      "A painless hard pea-sized lump on the testicle itself.",
      "A feeling of sudden heaviness in the scrotum.",
      "Dull ache in the lower abdomen or groin."
    ],
    whenToSeekHelp: [
      "Sudden, severe scrotal pain (this is a medical emergency requiring immediate evaluation to rule out testicular torsion).",
      "Any new, unexplained firm lump or enlargement.",
      "Pain or swelling accompanying a fever."
    ],
    trustedSources: [
      { name: "NHS Testicular Health Guidelines", organization: "National Health Service UK" },
      { name: "American Urological Association Patient Education", organization: "AUA" }
    ],
    lastUpdated: "2026-02-15",
    tags: ["Anatomy", "Preventive Care", "Self-Check", "Men's Health"]
  },
  {
    id: 'art-mens-prostate-health',
    title: "Prostate Health & Preventive Awareness",
    category: 'mens_health',
    readTimeMinutes: 5,
    shortExplanation: "An evidence-based guide to understanding the prostate gland, urinary changes as men age, and preventive discussions.",
    detailedExplanation: `The prostate is a small, walnut-shaped gland situated just below the bladder in front of the rectum. Its primary function is producing seminal fluid that nourishes and transports sperm.

As men age past 45-50, the prostate naturally undergoes gradual enlargement, a common non-cancerous condition known as Benign Prostatic Hyperplasia (BPH). Because the urethra passes through the center of the prostate, enlargement can gently compress the urinary passage, leading to changes in urinary stream strength or frequency.

Maintaining cardiovascular health, regular aerobic exercise, and a diet rich in vegetables, whole grains, and healthy fats support prostate and pelvic wellbeing.`,
    commonQuestions: [
      {
        question: "Does frequent urination at night always mean cancer?",
        answer: "No. Frequent nighttime urination (nocturia) is most commonly caused by benign prostate enlargement, caffeine/fluid timing, sleep apnea, or medications."
      }
    ],
    mythVsFact: [
      {
        myth: "BPH automatically leads to prostate cancer.",
        fact: "BPH and prostate cancer are separate conditions. Having BPH does not increase the biological risk of developing prostate cancer.",
        explanation: "Both conditions involve prostate tissue, but BPH is an entirely benign cellular expansion."
      }
    ],
    healthyHabits: [
      "Limit high fluid and caffeine intake 2 hours before bedtime.",
      "Engage in 150 minutes of moderate aerobic activity weekly.",
      "Maintain regular open checkups with your general physician after age 50."
    ],
    warningSigns: [
      "Difficulty starting urination or a weak, interrupted flow.",
      "Feeling that the bladder doesn't empty completely.",
      "Blood in the urine or semen."
    ],
    whenToSeekHelp: [
      "Complete inability to urinate (acute urinary retention is an emergency).",
      "Visible blood in urine (hematuria).",
      "Painful urination accompanied by high fever or back chills."
    ],
    trustedSources: [
      { name: "Prostate Health Guide", organization: "World Health Organization" },
      { name: "CDC Men's Health Screening Advisory", organization: "CDC" }
    ],
    lastUpdated: "2026-01-20",
    tags: ["Prostate", "Urinary Health", "Aging Gracefully", "Men's Health"]
  },

  // --- WOMEN'S HEALTH & HORMONAL AWARENESS ---
  {
    id: 'art-womens-pcos-pcod-awareness',
    title: "PCOS vs PCOD: Understanding Symptoms, Differences & Evidence-Based Nutrition",
    category: 'womens_health',
    readTimeMinutes: 7,
    shortExplanation: "A clear, medical-grounded guide to Polycystic Ovary Syndrome (PCOS) vs Disease (PCOD), hormonal differences, what to eat, foods to limit, and when to see a specialist.",
    detailedExplanation: `Polycystic Ovarian Disease (PCOD) and Polycystic Ovary Syndrome (PCOS) are two distinct conditions that are frequently confused, creating unnecessary panic.

1. What is PCOD?
PCOD is a common condition affecting up to 30-35% of reproductive-age women. In PCOD, the ovaries produce immature or partially mature eggs in large numbers due to lifestyle imbalances, stress, or diet. Over time, these turn into fluid-filled cysts in the ovaries. PCOD rarely causes severe metabolic complications and often resolves with improved diet, daily exercise, and regular sleep.

2. What is PCOS?
PCOS is a more serious endocrine and metabolic syndrome affecting about 8-12% of women. In PCOS, the ovaries produce excess androgens (male hormones) due to profound insulin resistance and altered brain-ovary hormone signaling. This halts regular ovulation and may lead to systemic effects on blood sugar, cholesterol, hair, skin, and cardiovascular health if unmanaged.

3. Common Signs & Symptoms:
- Irregular, infrequent, or missed periods
- Hormonal cystic acne concentrated on the jawline and neck
- Hirsutism (excess coarse hair growth on face, chest, or abdomen)
- Difficulty managing body weight and intense sugar cravings
- Scalp hair thinning at the crown (androgenic alopecia)
- Acanthosis Nigricans (velvety darkening of skin at the neck and armpits)

4. Evidence-Based Nutrition ('What to Eat'):
- High-fiber non-starchy vegetables: Spinach (Palak), Methi, Broccoli, Cabbage, Lauki, Cucumbers.
- Low glycemic index fruits: Berries, Apples, Pears, Guavas, Oranges, Amla, Papaya.
- Traditional whole grains & millets: Ragi, Jowar, Bajra, Foxtail millet, Brown/Red rice, Oats.
- Quality protein sources: Moong dal, Chana, Rajma, Edamame, Paneer, Tofu, Eggs, Lean fish.
- Healthy fats & seeds: Ground Flaxseeds, Chia seeds, Pumpkin seeds (zinc-rich), Walnuts, Almonds.

5. Foods to Limit or Avoid:
- Sugary drinks, carbonated sodas, packaged juices, and sweetened bubble teas.
- Ultra-processed packaged snacks, potato chips, and refined flour bakery products (maida, cakes).
- Excessive added refined sugars and traditional sweets (mithai) in large quantities.
- Re-heated deep-frying commercial oils and trans-fats.

6. Lifestyle Foundation:
Hydration (2.5-3L daily), 7-9 hours of consistent sleep, resistance training combined with brisk walking (150 mins/week), and stress reduction (cortisol control).

Important Medical Notice:
Nutritional and lifestyle modifications provide essential support for hormone regulation, but do NOT replace medical diagnosis, hormonal blood panels, ultrasound scans, or physician-prescribed medications. Consult your gynecologist or endocrinologist for concerning or persistent symptoms.`,
    commonQuestions: [
      {
        question: "Can diet and exercise cure PCOS completely?",
        answer: "PCOS is a chronic endocrine condition that cannot be 'cured' by any single food, but its symptoms can be put into long-term remission through sustained lifestyle habits and medical management."
      },
      {
        question: "Does having PCOD or PCOS mean I can never have children?",
        answer: "No. With proper medical guidance, cycle tracking, nutrition, and ovulation support if needed, the vast majority of women with PCOD or PCOS conceive and have healthy pregnancies."
      }
    ],
    mythVsFact: [
      {
        myth: "PCOS and PCOD are exactly the same thing.",
        fact: "PCOD is a common, primarily ovarian lifestyle condition, whereas PCOS is a complex metabolic and endocrine syndrome with higher insulin resistance.",
        explanation: "PCOS requires systemic metabolic monitoring, while PCOD is often managed with straightforward diet and physical activity changes."
      },
      {
        myth: "Drinking spearmint tea or seed cycling alone will cure PCOS.",
        fact: "While seeds and herbal infusions offer gentle antioxidant support, they cannot substitute for medical diagnosis, ultrasound evaluation, and doctor-prescribed therapies.",
        explanation: "Evidence-based medicine emphasizes holistic multi-pillar management under clinician guidance."
      }
    ],
    healthyHabits: [
      "Fill half your plate with non-starchy vegetables and lean protein before carbohydrates.",
      "Engage in resistance/strength training 3 times a week to improve cellular insulin sensitivity.",
      "Maintain a consistent sleep schedule (7-9 hours) to keep cortisol and hunger hormones balanced."
    ],
    warningSigns: [
      "Periods missing for 3+ consecutive months without pregnancy.",
      "Extremely painful or heavy bleeding soaking a pad every hour for 2+ hours.",
      "Rapid sudden onset of facial hair or severe cystic acne breakouts."
    ],
    whenToSeekHelp: [
      "If you experience irregular cycles shorter than 21 days or longer than 35 days.",
      "Difficulty conceiving after 6 to 12 months of regular unprotected intercourse.",
      "Significant emotional distress, anxiety, or depression linked to hormonal symptoms."
    ],
    trustedSources: [
      { name: "International Evidence-Based Guideline for PCOS Assessment & Management", organization: "Monash University & ASRM" },
      { name: "ACOG Guidelines on Polycystic Ovary Syndrome", organization: "American College of Obstetricians and Gynecologists" },
      { name: "FOGSI Clinical Guidelines on PCOD in India", organization: "Federation of Obstetric & Gynaecological Societies of India" }
    ],
    lastUpdated: "2026-02-28",
    tags: ["PCOS", "PCOD", "Hormones", "Nutrition", "Women's Health", "Insulin Resistance"]
  },
  {
    id: 'art-womens-menstrual-cycle-science',
    title: "Demystifying the Menstrual Cycle & Hormonal Phases",
    category: 'womens_health',
    readTimeMinutes: 6,
    shortExplanation: "A comprehensive, biology-based overview of the four cycle phases, hormonal rhythms, and tracking your natural patterns.",
    detailedExplanation: `The menstrual cycle is a vital sign of biological wellbeing that reflects the coordinated communication between the brain (hypothalamus and pituitary gland) and the ovaries. A typical cycle lasts anywhere from 21 to 35 days, counted from the first day of full menstrual bleeding (Day 1) to the day before the next period.

The cycle consists of four distinct phases:
1. Menstrual Phase (Days 1–5 approx): The uterine lining (endometrium) sheds when estrogen and progesterone drop.
2. Follicular Phase (Days 1–13 approx): Follicle-stimulating hormone (FSH) promotes the maturation of ovarian follicles; rising estrogen builds energy and repairs the endometrium.
3. Ovulatory Phase (Around Day 14): A surge in Luteinizing Hormone (LH) triggers the release of a mature egg.
4. Luteal Phase (Days 15–28): The corpus luteum secretes progesterone to support potential implantation. If unfertilized, progesterone drops, leading to menstruation.

Understanding these natural hormonal rhythms can help you anticipate fluctuations in energy, mood, body temperature, and physical comfort.`,
    commonQuestions: [
      {
        question: "Is it abnormal if my cycle varies by a few days each month?",
        answer: "A variation of 2 to 4 days from cycle to cycle is completely standard for most women due to stress, travel, illness, or sleep changes."
      },
      {
        question: "What is the difference between spotting and a regular period?",
        answer: "Spotting is very light pink or brownish bleeding that does not soak through a pad or tampon, whereas a period involves steady flow requiring regular hygiene product changes."
      }
    ],
    mythVsFact: [
      {
        myth: "Every healthy woman must have an exact 28-day cycle.",
        fact: "Only a minority of people have a textbook 28-day cycle; a healthy regular range is between 21 and 35 days.",
        explanation: "Individual baseline cycle lengths are genetically and physiologically diverse."
      }
    ],
    healthyHabits: [
      "Track cycle start dates, flow intensity, and symptoms in a health log.",
      "Prioritize iron-rich foods (lentils, spinach, beans, fortified grains) during bleeding.",
      "Stay well-hydrated to reduce cramping and bloating."
    ],
    warningSigns: [
      "Bleeding that lasts longer than 7 full days consecutively.",
      "Soaking through one or more pads or tampons every hour for 2+ consecutive hours.",
      "Sudden absence of periods for 3+ months (secondary amenorrhea)."
    ],
    whenToSeekHelp: [
      "Severe, debilitating pelvic pain that does not respond to standard pain relievers or disrupts daily life.",
      "Bleeding between periods or after sexual intercourse.",
      "Sudden post-menopausal bleeding."
    ],
    trustedSources: [
      { name: "ACOG Menstrual Health Guide", organization: "American College of Obstetricians and Gynecologists" },
      { name: "WHO Reproductive Health Information", organization: "World Health Organization" }
    ],
    lastUpdated: "2026-02-10",
    tags: ["Menstruation", "Hormones", "Cycle Tracking", "Women's Health"]
  },
  {
    id: 'art-womens-breast-awareness',
    title: "Breast Health & Evidence-Based Self-Awareness",
    category: 'womens_health',
    readTimeMinutes: 4,
    shortExplanation: "Learn what normal breast tissue feels like throughout your cycle and how to practice consistent monthly self-awareness.",
    detailedExplanation: `Breast tissue naturally varies in density and texture. For many women, breasts feel naturally lumpy or nodular—particularly in the upper-outer quadrants near the armpits. 

Hormonal shifts during the menstrual cycle frequently cause normal cyclical breast tenderness, swelling, and changes in firmness in the week leading up to menstruation. Practicing regular breast self-awareness allows you to become familiar with your normal baseline tissue texture.

The best time to check your breasts is about 3 to 5 days after your period ends, when hormone levels are lower and breast tissue is softest and least tender.`,
    commonQuestions: [
      {
        question: "Does fibrocystic breast tissue increase cancer risk?",
        answer: "Fibrocystic breast changes are common, benign fluctuations in breast tissue and do not increase the risk of breast cancer."
      }
    ],
    mythVsFact: [
      {
        myth: "Underwire bras or antiperspirants cause breast cancer.",
        fact: "Scientific research has repeatedly disproven any link between bras, antiperspirants, and breast cancer risk.",
        explanation: "Extensive peer-reviewed epidemiological studies confirm that clothing and deodorants have no causative link to breast cell abnormalities."
      }
    ],
    healthyHabits: [
      "Familiarize yourself with your normal breast contour and feel.",
      "Wear supportive, well-fitted sports bras during vigorous workouts.",
      "Discuss age-appropriate mammography and clinical screening timelines with your doctor."
    ],
    warningSigns: [
      "A new, firm, painless lump that persists after your period ends.",
      "Dimpling, puckering, or redness of the breast skin (orange-peel texture).",
      "Spontaneous clear or bloody nipple discharge."
    ],
    whenToSeekHelp: [
      "Any new persistent lump in the breast or armpit area.",
      "Recent inversion or flattening of the nipple.",
      "Localized breast redness with warmth and fever (possible mastitis)."
    ],
    trustedSources: [
      { name: "Breast Health Facts", organization: "National Cancer Institute" },
      { name: "CDC Breast Awareness and Screening Guidelines", organization: "CDC" }
    ],
    lastUpdated: "2026-01-28",
    tags: ["Breast Health", "Self-Awareness", "Preventive Care", "Women's Health"]
  },

  // --- TRANS-INCLUSIVE HEALTH ---
  {
    id: 'art-trans-affirming-health-overview',
    title: "Respectful, Inclusive Health Navigation for Trans & Non-Binary Individuals",
    category: 'trans_health',
    readTimeMinutes: 5,
    shortExplanation: "Navigating preventive care, organ-based screening, mental wellbeing, and respectful communication with healthcare providers.",
    detailedExplanation: `Health is universal, and everyone deserves healthcare that is compassionate, affirming, evidence-based, and respectful of their gender identity. Transgender, non-binary, and gender-diverse individuals have unique healthcare experiences, but also share identical core preventive health needs with all human beings.

A key principle in inclusive healthcare is 'Organ-Based Screening'. Rather than basing preventive screenings strictly on legal gender markers, medical guidelines recommend screening every organ present in a person's body:
- If a person has breast/chest tissue, routine breast health guidelines apply regardless of gender identity.
- If a cervix is present, routine cervical Pap smears and HPV screenings remain important.
- If a prostate is present, prostate health awareness and screening discussions apply.

Finding a culturally competent provider and preparing for medical visits with clear personal boundaries helps ensure you receive compassionate, high-quality care.`,
    commonQuestions: [
      {
        question: "Do I still need cervical screening if I am a trans man?",
        answer: "If you have a cervix and are between 21 and 65 years old, routine Pap and HPV screening is recommended according to standard medical guidelines."
      },
      {
        question: "How can I communicate my pronouns and name with clinic staff?",
        answer: "You can write your name, pronouns, and chosen name on intake forms or politely mention them during the initial nurse triage: 'My legal name on insurance is X, but please call me Y and use they/them or he/him pronouns.'"
      }
    ],
    mythVsFact: [
      {
        myth: "Being transgender is classified as a mental illness.",
        fact: "Major international medical bodies, including the WHO (ICD-11) and APA, recognize gender diversity as a natural variation of human identity, not a disorder.",
        explanation: "Medical support focuses on gender affirmation, psychological safety, and general preventive wellbeing."
      }
    ],
    healthyHabits: [
      "Maintain an organ inventory for routine preventive screenings.",
      "If using chest binders, practice safe binding (never bind for more than 8 hours, never sleep in a binder, and use breathable materials).",
      "Engage in supportive peer communities and prioritize emotional wellbeing."
    ],
    warningSigns: [
      "Chest pain or shortness of breath during chest binding.",
      "Skin breakdown, infections, or chafing under binders or prosthetics.",
      "Persistent feelings of isolation or overwhelming gender dysphoria."
    ],
    whenToSeekHelp: [
      "Any skin ulceration, rib pain, or breathing restriction associated with binding.",
      "Unexplained pelvic pain or abnormal discharge.",
      "Severe mental health distress, depression, or thoughts of self-harm (reach out to trusted crisis lines or healthcare providers immediately)."
    ],
    trustedSources: [
      { name: "WPATH Standards of Care (v8)", organization: "World Professional Association for Transgender Health" },
      { name: "Inclusive Preventive Care Guidelines", organization: "Endocrine Society & UCSF Transgender Care" }
    ],
    lastUpdated: "2026-02-18",
    tags: ["Inclusive Care", "Organ-Based Screening", "Safe Binding", "Trans Health"]
  },

  // --- PUBERTY ACADEMY ---
  {
    id: 'art-puberty-changes-guide',
    title: "Puberty Academy: Understanding Body Changes, Odor, Acne & Growth",
    category: 'puberty_academy',
    readTimeMinutes: 5,
    shortExplanation: "An age-appropriate, reassuring guide to the physical and emotional changes that happen during puberty.",
    detailedExplanation: `Puberty is the natural biological journey your body takes to transition from childhood to adulthood. It usually begins anywhere between ages 8 and 14 and happens at its own pace for every individual. 

Key physical milestones include:
- Growth spurts: Sudden increases in height, feet size, and bone structure.
- Skin & Hair: Sebaceous (oil) glands become more active, leading to acne. Body hair starts growing in the underarms, pubic area, legs, and face.
- Sweat & Scent: Apocrine sweat glands mature, producing sweat that naturally reacts with skin bacteria to create body odor. Daily washing with gentle soap and water manages this easily.
- Vocal and reproductive developments: Voice changes/deepening, breast budding, menstrual periods, spontaneous erections, or nocturnal emissions ('wet dreams') are all normal parts of reproductive maturation.
- Emotional shifts: Changing hormone levels, brain remodeling, and growing independence can cause sudden mood shifts and heightened feelings.`,
    commonQuestions: [
      {
        question: "Why do I sweat more and have body odor all of a sudden?",
        answer: "During puberty, newly active apocrine glands in your armpits and groin produce a richer sweat. When harmless bacteria on your skin break this down, it produces body odor. Daily bathing and clean clothes keep you fresh."
      },
      {
        question: "Is it normal to feel moody or overwhelmed during puberty?",
        answer: "Yes. Your brain is developing new emotional processing circuits alongside fluctuating hormone levels. Talking to trusted adults, friends, or counselors is very helpful."
      }
    ],
    mythVsFact: [
      {
        myth: "Popping pimples makes acne heal faster.",
        fact: "Popping pimples pushes bacteria and inflammation deeper into the skin pores, causing scarring and more breakouts.",
        explanation: "Gently wash your face twice daily with a mild cleanser and consult a pharmacist or doctor for persistent acne."
      }
    ],
    healthyHabits: [
      "Wash your face twice daily with warm water and a gentle cleanser.",
      "Shower or bathe daily, especially after sports or intense exercise.",
      "Wear clean cotton underwear and fresh socks each day.",
      "Aim for 8 to 10 hours of sleep each night to support rapid physical growth."
    ],
    warningSigns: [
      "Severe cystic acne that is painful and causing deep scarring.",
      "Excessive anxiety or sadness that prevents you from going to school or seeing friends.",
      "Extreme dietary restriction or sudden unhealthy weight loss."
    ],
    whenToSeekHelp: [
      "If puberty changes have not started by age 14 or 15.",
      "Severe period pain that keeps you home from school.",
      "If you are feeling overwhelmed, bullied, or unsafe."
    ],
    trustedSources: [
      { name: "Adolescent Health Guide", organization: "World Health Organization" },
      { name: "HealthyChildren Puberty Resource", organization: "American Academy of Pediatrics" }
    ],
    lastUpdated: "2026-02-05",
    tags: ["Puberty", "Teen Health", "Growth", "Body Odor", "Acne"]
  },

  // --- HYGIENE CENTER ---
  {
    id: 'art-hygiene-complete-daily-routines',
    title: "The Science of Hygiene: Hand, Dental, Scalp, Foot & Intimate Care",
    category: 'hygiene_center',
    readTimeMinutes: 5,
    shortExplanation: "Evidence-based hygiene practices that protect your skin barrier, prevent infections, and keep you feeling clean and confident.",
    detailedExplanation: `Hygiene is the science of preserving health through cleanliness. The human skin has a protective acid mantle and a microbiome of beneficial microorganisms. Good hygiene removes harmful pathogens, dirt, and dead skin cells without stripping natural protective oils.

Key pillars of complete body hygiene:
- Hand Washing: The single most effective way to prevent gastrointestinal and respiratory infections. Wash with soap and clean water for at least 20 seconds, especially before meals and after using the restroom.
- Dental Hygiene: Brush teeth twice daily with fluoride toothpaste for two minutes and clean between teeth daily with floss to prevent plaque, cavities, and gum disease.
- Hair & Scalp: Wash with mild shampoo according to your hair type (typically 2–3 times a week for oily hair, or weekly for dry/curly hair) to avoid sebum buildup.
- Foot Care: Wash and dry thoroughly between toes to prevent fungal athlete's foot. Wear clean, dry socks.
- External Intimate Hygiene: Clean external areas gently with warm water. Never use harsh chemical perfumes or internal douches, as internal organs are naturally self-cleaning.`,
    commonQuestions: [
      {
        question: "Do I need special scented feminine or intimate washes?",
        answer: "No. The internal reproductive canal is naturally self-cleaning with an acidic pH balance. Scented washes, wipes, and douches disrupt beneficial bacteria and can trigger infections and irritations."
      },
      {
        question: "How long should I brush my teeth?",
        answer: "Dentists worldwide recommend brushing for a full two minutes (30 seconds for each quadrant of the mouth) with a soft-bristled toothbrush."
      }
    ],
    mythVsFact: [
      {
        myth: "Hot water kills germs during hand washing, so scalding water is best.",
        fact: "Water warm enough to kill germs would severely burn your skin. Soap and mechanical friction with comfortable water is what effectively lifts pathogens.",
        explanation: "The soap molecules bind to oils and bacterial cell walls, allowing flowing water to rinse them away safely."
      }
    ],
    healthyHabits: [
      "Wash hands thoroughly for 20 seconds before eating and after using the bathroom.",
      "Brush teeth twice a day and replace your toothbrush every 3 months.",
      "Dry thoroughly between toes and skin folds after bathing.",
      "Wash towels and bed linens weekly in warm water."
    ],
    warningSigns: [
      "Persistent gum bleeding, chronic bad breath (halitosis), or tooth sensitivity.",
      "Itchy, peeling, or cracked skin between the toes.",
      "Unusual rash, redness, or burning in sensitive skin areas."
    ],
    whenToSeekHelp: [
      "Toothache, loose teeth, or swollen gums.",
      "Persistent skin infections or boils that do not resolve with basic hygiene.",
      "Unusual foul-smelling discharge or intense intimate itching."
    ],
    trustedSources: [
      { name: "Hand Hygiene Guidelines", organization: "CDC" },
      { name: "Oral Health Standards", organization: "American Dental Association & WHO" }
    ],
    lastUpdated: "2026-02-12",
    tags: ["Hygiene", "Dental", "Handwashing", "Skin Care", "Cleanliness"]
  },

  // --- SEXUAL & REPRODUCTIVE HEALTH ---
  {
    id: 'art-sexual-health-consent-sti-prevention',
    title: "Sexual Health, Consent, STI Awareness & Healthy Relationships",
    category: 'sexual_health',
    readTimeMinutes: 6,
    shortExplanation: "Clear, factual education on enthusiastic consent, barrier contraception, STI testing, and healthy boundaries.",
    detailedExplanation: `Sexual health is a state of physical, emotional, mental, and social wellbeing in relation to sexuality. It requires a positive and respectful approach to sexuality and relationships, as well as the possibility of having safe sexual experiences, free of coercion, discrimination, and violence.

Core aspects of sexual health include:
- Consent & Boundaries: Consent must be freely given, reversible, informed, enthusiastic, and specific (FRIES model). Communication between partners is essential at every stage.
- STI Awareness & Prevention: Sexually Transmitted Infections (STIs) such as Chlamydia, Gonorrhea, HPV, HSV, and HIV can affect anyone who is sexually active. Many STIs have no initial symptoms, making routine screening vital. Barrier methods like external and internal condoms provide the best dual protection against both STIs and unintended pregnancies.
- Contraception: Understanding various contraception methods (barrier methods, oral contraceptive pills, IUDs, implants) allows individuals and couples to make informed family planning decisions.
- Anatomy & Hygiene: Urinating after sexual activity and gently washing external areas with water helps reduce the risk of urinary tract infections (UTIs).`,
    commonQuestions: [
      {
        question: "Can someone have an STI without showing any symptoms?",
        answer: "Yes. Many STIs (such as Chlamydia, HPV, and early HIV) frequently cause zero noticeable symptoms in their early stages. Regular testing is the only definitive way to know your status."
      },
      {
        question: "What should I do if a condom breaks during intercourse?",
        answer: "Emergency contraception (morning-after pill) is available over-the-counter and is most effective when taken as soon as possible within 72 hours. You can also consult a clinic for STI post-exposure advice."
      }
    ],
    mythVsFact: [
      {
        myth: "The 'pull-out' (withdrawal) method is reliable birth control.",
        fact: "Withdrawal has a high failure rate because pre-ejaculatory fluid can contain active sperm and cannot protect against STIs.",
        explanation: "Using reliable barrier contraception or modern family planning methods offers substantially higher protection."
      }
    ],
    healthyHabits: [
      "Use condoms consistently and correctly for any sexual activity.",
      "Get routine STI screenings when entering a new relationship or annually if sexually active.",
      "Practice open, respectful communication with your partner about boundaries and testing."
    ],
    warningSigns: [
      "Unusual genital discharge (change in color, consistency, or odor).",
      "Burning sensation or sharp pain during urination.",
      "Sores, blisters, warts, or bumps around the genital, anal, or oral areas."
    ],
    whenToSeekHelp: [
      "Any visible sores, painful ulcers, or unusual pelvic discharge.",
      "Sudden pelvic pain or testicular swelling after sexual contact.",
      "If you believe you may have been exposed to HIV (ask a clinic within 72 hours about PEP - Post-Exposure Prophylaxis)."
    ],
    trustedSources: [
      { name: "Sexually Transmitted Infections Fact Sheets", organization: "World Health Organization" },
      { name: "CDC Sexual Health & Contraception Guidelines", organization: "CDC" }
    ],
    lastUpdated: "2026-02-14",
    tags: ["Sexual Health", "STI Prevention", "Consent", "Contraception", "Safe Sex"]
  },

  // --- MENTAL WELLBEING ---
  {
    id: 'art-mental-wellbeing-stress-resilience',
    title: "Mental Wellbeing: Managing Stress, Sleep, Anxiety & Finding Support",
    category: 'mental_wellbeing',
    readTimeMinutes: 5,
    shortExplanation: "Evidence-based tools for emotional regulation, healthy stress coping, cognitive grounding, and knowing when to reach out.",
    detailedExplanation: `Mental wellbeing is not merely the absence of a mental health condition; it is a dynamic state of emotional, cognitive, and social balance that enables people to cope with the stresses of life, realize their abilities, learn well, and contribute to their community.

Stress is a natural physiological reaction to demanding situations. Short-term stress can sharpen focus, but chronic stress floods the body with cortisol and adrenaline, which can disrupt sleep, weaken immune function, and cause digestive issues.

Practical evidence-backed techniques for emotional grounding:
- The 4-7-8 Breathing Loop: Inhale quietly through the nose for 4 seconds, hold your breath for 7 seconds, and exhale completely through the mouth for 8 seconds to activate the parasympathetic nervous system.
- Box Breathing: 4 seconds in, 4 seconds hold, 4 seconds out, 4 seconds hold.
- Sleep Hygiene: A dark, cool bedroom, consistent sleep schedule, and avoiding blue-light screens 60 minutes before bed enhances restorative deep sleep.
- Social Connection: Sharing thoughts with trusted loved ones or mentors significantly lowers perceived psychological distress.`,
    commonQuestions: [
      {
        question: "How do I know if I have normal stress or an anxiety disorder?",
        answer: "Normal stress is tied to a specific temporary challenge (exams, deadlines). When anxiety becomes persistent, overwhelming, occurs without a clear trigger, and interferes with your work, sleep, or relationships for weeks, consulting a mental health professional is recommended."
      }
    ],
    mythVsFact: [
      {
        myth: "Asking for mental health help is a sign of personal weakness.",
        fact: "Seeking professional support or counseling is a proactive, courageous step for health, just like visiting a doctor for a physical injury.",
        explanation: "Therapy and counseling provide structured cognitive tools that strengthen long-term resilience."
      }
    ],
    healthyHabits: [
      "Practice 5–10 minutes of daily mindfulness or deep diaphragmatic breathing.",
      "Limit continuous social media scrolling and set dedicated screen-free time.",
      "Engage in daily physical movement (walking, stretching, swimming) to release endorphins."
    ],
    warningSigns: [
      "Persistent feelings of sadness, emptiness, or irritability lasting more than two weeks.",
      "Loss of interest in activities you normally enjoy (anhedonia).",
      "Noticeable changes in appetite, severe insomnia, or sleeping excessively."
    ],
    whenToSeekHelp: [
      "Feelings of hopelessness, severe panic attacks, or inability to perform daily tasks.",
      "Thoughts of self-harm or suicide (please reach out immediately to emergency services, Tele-MANAS 14416 in India, 988 in the US/Canada, or local crisis helplines).",
      "Experiencing overwhelming grief or traumatic flash memories."
    ],
    trustedSources: [
      { name: "Mental Health Action Guide", organization: "World Health Organization" },
      { name: "National Institute of Mental Health (NIMH)", organization: "NIH" }
    ],
    lastUpdated: "2026-02-16",
    tags: ["Mental Health", "Stress", "Sleep", "Mindfulness", "Emotional Wellbeing"]
  },

  // --- NUTRITION ---
  {
    id: 'art-nutrition-balanced-eating-hydration',
    title: "Nutrition Essentials: Balanced Plates, Fiber, Hydration & Mindful Eating",
    category: 'nutrition',
    readTimeMinutes: 5,
    shortExplanation: "A sensible, non-restrictive guide to nourishing your body with balanced meals, dietary fiber, and adequate hydration.",
    detailedExplanation: `Good nutrition provides your body with the macro- and micronutrients required for sustained energy, cell repair, brain cognition, and immune resilience. Healthy eating is not about extreme deprivation, rigid fads, or guilt; it is about building sustainable, enjoyable nourishment habits.

The 'Healthy Balanced Plate' Framework:
- 1/2 of your plate: Colorful Vegetables & Fruits (supplying antioxidants, vitamins, and prebiotics).
- 1/4 of your plate: High-Quality Proteins (lentils, chickpeas, tofu, paneer, eggs, lean fish, or poultry to maintain muscle and satiety).
- 1/4 of your plate: Whole Complex Carbohydrates (brown rice, whole wheat, oats, millets, quinoa for steady glucose release).
- Healthy Fats: Moderate olive oil, mustard oil, nuts, seeds, and avocados for cell membrane and hormone health.

Hydration:
Water makes up roughly 60% of the human body. Adequate hydration (typically 2 to 2.5 liters daily for adults, varying by climate and activity) supports digestion, kidney filtration, joint lubrication, and brain concentration.`,
    commonQuestions: [
      {
        question: "Do I need to eliminate all sugar and carbs to be healthy?",
        answer: "No. Carbohydrates are your body's primary energy source. The focus should be on prioritizing complex whole grains and fiber while enjoying sweets and treats in mindful moderation."
      },
      {
        question: "How do I know if I am drinking enough water?",
        answer: "A simple indicator is urine color: pale straw or light clear yellow indicates good hydration, whereas dark amber or brown suggests you need more fluids."
      }
    ],
    mythVsFact: [
      {
        myth: "Crash diets and liquid cleanses remove toxins from the body.",
        fact: "Your liver, kidneys, and intestines are already sophisticated 24/7 detoxification systems; extreme diets only cause muscle loss and electrolyte imbalances.",
        explanation: "Eating adequate dietary fiber and drinking sufficient clean water naturally optimizes liver and kidney function."
      }
    ],
    healthyHabits: [
      "Include a portion of colorful vegetables or salad with your main meals.",
      "Keep a reusable water bottle near your workspace to sip throughout the day.",
      "Eat mindfully without distraction, chewing thoroughly and stopping when comfortably satisfied."
    ],
    warningSigns: [
      "Chronic low energy, persistent constipation, or dizziness upon standing.",
      "Extreme anxiety or obsessive guilt around food choices.",
      "Frequent muscle cramps or dark, concentrated urine."
    ],
    whenToSeekHelp: [
      "Unexplained, unintentional rapid weight loss or gain.",
      "Persistent digestive issues like chronic acid reflux, bloating, or severe food intolerances.",
      "Suspected nutritional deficiencies (anemia, vitamin D/B12 deficiency confirmed by lab tests)."
    ],
    trustedSources: [
      { name: "Dietary Guidelines & Nutrition Guidance", organization: "World Health Organization" },
      { name: "Eatwell Guide & Dietary Standards", organization: "NHS & Harvard T.H. Chan School of Public Health" }
    ],
    lastUpdated: "2026-02-15",
    tags: ["Nutrition", "Hydration", "Balanced Diet", "Healthy Habits", "Fiber"]
  }
];
