export interface HygieneGuideSection {
  id: string;
  category: 'girls' | 'boys' | 'transgender' | 'universal';
  title: string;
  subtitle: string;
  targetAudience: string;
  headerImage: string;
  summary: string;
  steps: Array<{
    stepNumber: number;
    title: string;
    description: string;
    image?: string;
    proTip?: string;
    commonMistakeToAvoid?: string;
  }>;
  dosAndDonts: {
    dos: string[];
    donts: string[];
  };
  tabooBusters: Array<{
    myth: string;
    truth: string;
    explanation: string;
  }>;
  whenToSeeDoctor: string[];
}

export const HYGIENE_BODY_CARE_DATA: HygieneGuideSection[] = [
  // 1. GIRLS & WOMEN'S HYGIENE & BODY CARE
  {
    id: 'hygiene-girls',
    category: 'girls',
    title: "Girls & Women's Personal Hygiene & Body Care",
    subtitle: "Complete, step-by-step guide to period care, intimate wellness, skin health, and breast awareness.",
    targetAudience: "Teen girls, young women, students & mothers",
    headerImage: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?w=800&auto=format&fit=crop&q=80",
    summary: "Your body is natural, strong, and beautiful. Having your period or body changes during puberty is completely normal. Proper hygiene keeps you fresh, confident, and free from infections.",
    steps: [
      {
        stepNumber: 1,
        title: "Intimate Washing: Front-to-Back Only (Water is Best)",
        description: "Always wash the outer intimate area (vulva) with clean, plain lukewarm water. Always wipe and wash from FRONT to BACK (from vaginal opening towards anus, never backward).",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80",
        proTip: "The inner vagina is self-cleaning with natural healthy lactobacilli bacteria. Never use harsh scented soaps, Dettol, or internal douching sprays inside.",
        commonMistakeToAvoid: "Wiping from back to front transfers intestinal bacteria into the urinary tract, causing painful UTIs (Urinary Tract Infections)."
      },
      {
        stepNumber: 2,
        title: "Safe Period Pad / Menstrual Cup Routine",
        description: "Change sanitary pads every 4 to 6 hours, even on light flow days. If using a menstrual cup, wash hands thoroughly before insertion and boil the cup in water between monthly cycles.",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80",
        proTip: "Wrap used pads in newspaper or disposal bags and place them in dustbins. Never flush pads in the toilet as they block plumbing and harm sanitation workers.",
        commonMistakeToAvoid: "Wearing a single pad for 10-12 hours creates a warm, moist environment where bacteria multiply, causing rashes and pelvic infections."
      },
      {
        stepNumber: 3,
        title: "Breathable Cotton Underwear & Daily Drying",
        description: "Wear 100% breathable cotton panties. Change underwear immediately after heavy workouts, sports, or sweating. Wash underwear in hot water and dry them in direct sunlight.",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80",
        proTip: "Sunlight is a natural disinfectant that destroys fungal spores and moisture.",
        commonMistakeToAvoid: "Hiding wet washed underwear under other clothes in dark corners due to shame causes yeast and fungal infections."
      },
      {
        stepNumber: 4,
        title: "Underarm, Sweat & Breast Crease Care",
        description: "Wash underarms and the area under the breasts during your daily bath. Gently pat completely dry before wearing a well-fitting cotton bra.",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80",
        proTip: "Do a monthly 2-minute breast self-check in front of a mirror after your period to know your normal breast tissue and notice any unusual lumps early.",
        commonMistakeToAvoid: "Sleeping in tight underwired bras restricts blood flow and traps sweat."
      }
    ],
    dosAndDonts: {
      dos: [
        "Change sanitary pads every 4-6 hours without delay.",
        "Drink 8-10 glasses of water daily to flush out urinary bacteria.",
        "Pee immediately after physical intimacy to prevent UTIs.",
        "Wash your hands with soap before and after changing pads or cups.",
        "Eat iron-rich foods (spinach, jaggery, beetroot, dal, dates) to replace blood loss during periods."
      ],
      donts: [
        "Don't use perfumed washes, chemical douches, or talcum powder near intimate areas.",
        "Don't wear synthetic, tight nylon underwear for long periods.",
        "Don't skip bathing or washing your hair during periods — warm baths relieve cramps!",
        "Don't feel shy or isolated during menstruation; it is a healthy sign of life."
      ]
    },
    tabooBusters: [
      {
        myth: "Period blood is dirty, poisonous, or toxic blood.",
        truth: "Period blood is completely clean blood and natural uterine lining tissue.",
        explanation: "During every monthly cycle, the uterus prepares a soft nourishing lining for pregnancy. When pregnancy doesn't happen, the uterus naturally sheds this lining. It is normal biological tissue, not toxin."
      },
      {
        myth: "Girls should not enter kitchens, touch pickles, or exercise during periods.",
        truth: "You can cook, touch any food, exercise, dance, and live normally.",
        explanation: "Menstruation has zero effect on food spoiling or pickle bacteria. Light exercise and yoga actually release feel-good endorphins that reduce cramps and mood swings."
      },
      {
        myth: "Washing your hair during periods causes heavy flow or infertility.",
        truth: "Warm showers and hair washing are 100% safe and keep you clean and relaxed.",
        explanation: "Hair washing does not connect to the uterus. Keeping clean prevents body odor and relaxes tense muscles."
      }
    ],
    whenToSeeDoctor: [
      "Severe period pain that stops you from going to school/college even after taking basic doctor-approved pain relief.",
      "Bleeding that lasts longer than 7-8 days, or needing to change heavy pads every 1-2 hours.",
      "Green, yellow, or foul-smelling vaginal discharge accompanied by intense itching or burning.",
      "Irregular periods missing for 3+ consecutive months (can be a sign of PCOS or thyroid imbalance)."
    ]
  },

  // 2. BOYS & MEN'S HYGIENE & BODY CARE
  {
    id: 'hygiene-boys',
    category: 'boys',
    title: "Boys & Men's Personal Hygiene & Body Care",
    subtitle: "Step-by-step guide to puberty changes, intimate grooming, body odor control, and skin health.",
    targetAudience: "Teen boys, young men, college students & fathers",
    headerImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80",
    summary: "During puberty, male hormones (testosterone) trigger voice deepening, growth spurts, facial hair, and more active sweat glands. Taking charge of personal hygiene builds self-confidence, athletic health, and dignity.",
    steps: [
      {
        stepNumber: 1,
        title: "Intimate Hygiene & Foreskin Cleansing",
        description: "Wash the intimate genital area daily during your bath. If uncircumcised, gently pull back (retract) the foreskin, wash the head with warm plain water to remove white buildup (smegma), and slide the foreskin forward.",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80",
        proTip: "Never force the foreskin back if you feel pain. Wash with gentle water and always return it to its normal position.",
        commonMistakeToAvoid: "Leaving accumulated smegma under the foreskin leads to painful bacterial swelling (balanitis) and foul odor."
      },
      {
        stepNumber: 2,
        title: "Sweat, Underarms & Groin Odor Management",
        description: "Puberty activates apocrine sweat glands in underarms and groin. Wash thoroughly with soap every single day and apply an antiperspirant or alum block to clean, dry skin.",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80",
        proTip: "Sweat itself is odorless water. Body odor happens only when skin bacteria break down the sweat. Washing removes the bacteria.",
        commonMistakeToAvoid: "Spraying heavy perfume or deodorant over sweaty unwashed armpits makes the odor worse and irritates the skin."
      },
      {
        stepNumber: 3,
        title: "Acne, Oily Skin & Shaving Hygiene",
        description: "Wash your face twice daily with a gentle foaming cleanser. If shaving facial hair, always soften hair with warm water, use a clean sharp razor, and shave in the direction of hair growth.",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80",
        proTip: "Never share razors with friends or brothers to prevent blood-borne viral infections like Hepatitis B and C.",
        commonMistakeToAvoid: "Popping or squeezing facial pimples pushes bacteria deeper into the skin, causing permanent dark scars and infections."
      },
      {
        stepNumber: 4,
        title: "Testicular Self-Check & Athletic Support",
        description: "Once a month during a warm shower, roll each testicle between your thumb and fingers. It should feel smooth and oval like a peeled boiled egg.",
        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80",
        proTip: "One testicle normally hangs slightly lower than the other — this is completely normal human anatomy to regulate temperature.",
        commonMistakeToAvoid: "Ignoring sudden sharp pain or hard painless lumps in the scrotum."
      }
    ],
    dosAndDonts: {
      dos: [
        "Take a complete bath daily, especially after playing sports or working out.",
        "Change your underwear and socks every single day — never re-wear yesterday's sweaty socks.",
        "Trim or groom groin and armpit hair if it traps excess sweat and odor.",
        "Wear clean, supportive cotton underwear for sports.",
        "Understand that wet dreams (nightfall) are 100% natural and harmless."
      ],
      donts: [
        "Don't re-wear unwashed gym clothes; it causes fungal infections like jock itch (ringworm).",
        "Don't dry-shave without lubrication or splash burning alcohol aftershave on irritated skin.",
        "Don't feel guilty about nocturnal emissions or masturbation — they are natural biological processes.",
        "Don't ignore burning pain while urinating."
      ]
    },
    tabooBusters: [
      {
        myth: "Wet dreams (nightfall) or masturbation make a person weak or lose stamina.",
        truth: "Wet dreams and sexual development are 100% normal, harmless, and cause zero weakness.",
        explanation: "During sleep, the body naturally releases excess seminal fluid. It has zero impact on muscle strength, height, or brain power. Old myths claiming 'one drop of semen takes 100 drops of blood' are completely false folklore with zero scientific basis."
      },
      {
        myth: "Real men shouldn't talk about emotional stress, crying, or sadness.",
        truth: "Expressing emotions and seeking help is a sign of emotional strength and mental maturity.",
        explanation: "Suppressing feelings leads to chronic anxiety, anger, and physical health problems. Speaking with friends, family, or counselors is healthy."
      }
    ],
    whenToSeeDoctor: [
      "Sudden, severe pain in the scrotum or testicle (Urgent emergency: Rule out Testicular Torsion).",
      "Any new hard, painless lump or noticeable swelling in the testicles.",
      "Burning sensation or yellow/white discharge while passing urine.",
      "Persistent red, itchy ring-shaped rash in the groin (Jock itch/Tinea Cruris requiring antifungal cream)."
    ]
  },

  // 3. TRANSGENDER & GENDER-DIVERSE HEALTH & BODY CARE
  {
    id: 'hygiene-trans',
    category: 'transgender',
    title: "Transgender & Gender-Affirming Personal Body Care",
    subtitle: "Evidence-based, affirming health guide for safe binding, tucking hygiene, skin care, and hormone awareness.",
    targetAudience: "Transgender men, trans women, non-binary & gender-diverse individuals",
    headerImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
    summary: "Every human body deserves dignity, respect, and evidence-based self-care. Here are medically safe guidelines for chest binding, tucking, skin protection, and overall well-being in a supportive, judgment-free space.",
    steps: [
      {
        stepNumber: 1,
        title: "Safe Chest Binding Hygiene (Max 8 Hours)",
        description: "Use dedicated medical-grade binders. Limit binding to maximum 8 hours a day. Never bind with duct tape, ace bandages, or plastic wrap which crush ribs and restrict lungs.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80",
        proTip: "Take 'binder breaks' during the day. Do deep diaphragmatic breathing and gentle shoulder stretches. Never sleep or exercise heavily in a tight binder.",
        commonMistakeToAvoid: "Binding while sleeping or wearing a binder that is too small leads to rib bruising, fluid buildup, and fungal skin chafing."
      },
      {
        stepNumber: 2,
        title: "Tucking Safety & Genital Skin Care",
        description: "If practicing tucking, use breathable cotton garments or purpose-designed tucking underwear. Wash and dry the genital area thoroughly before and after.",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80",
        proTip: "Always take regular breaks to urinate and never hold back urine for long periods.",
        commonMistakeToAvoid: "Using harsh adhesives or duct tape on delicate skin causes painful tears, blistering, and dermatitis."
      },
      {
        stepNumber: 3,
        title: "Skin Chafing & Post-Hair Removal Care",
        description: "Use barrier creams (like zinc oxide or petroleum jelly) in friction-prone areas. If doing laser, waxing, or shaving, moisturize with fragrance-free lotion and avoid sun exposure.",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80",
        proTip: "Wash binders and shapewear frequently with gentle, scent-free laundry detergent to prevent folliculitis (inflamed hair pores).",
        commonMistakeToAvoid: "Wearing damp shapewear causes fungal heat rash (intertrigo)."
      },
      {
        stepNumber: 4,
        title: "Hormone Therapy (HRT) Routine Awareness",
        description: "If prescribed Gender Affirming Hormone Therapy (estrogen, testosterone, or blockers by an endocrinologist), take doses strictly as prescribed with regular liver, kidney, and blood count monitoring.",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80",
        proTip: "Never self-medicate or purchase unregulated hormones online without medical supervision.",
        commonMistakeToAvoid: "Skipping routine blood tests while on HRT."
      }
    ],
    dosAndDonts: {
      dos: [
        "Listen to your body: If you feel chest pain, shortness of breath, or dizziness while binding, take off the binder immediately.",
        "Hand-wash binders with mild soap and air dry to maintain elastic structure.",
        "Stay hydrated and keep skin moisturized with gentle hypoallergenic lotions.",
        "Reach out to affirmative healthcare providers, peer support groups, or Tele-MANAS (14416) for mental well-being."
      ],
      donts: [
        "Don't double bind (wearing two binders at once).",
        "Don't ignore skin breakdown, sores, or numbness.",
        "Don't skip gender-affirming preventive screenings (e.g. chest/breast exams, cervical/prostate health)."
      ]
    },
    tabooBusters: [
      {
        myth: "Gender diversity or gender dysphoria is a mental defect or modern trend.",
        truth: "Gender diversity is a recognized, natural aspect of human diversity documented across history and global medicine (WHO ICD-11).",
        explanation: "Major global medical associations including WHO and the Indian Psychiatric Society recognize that affirming care and respectful hygiene support improve quality of life and mental health."
      }
    ],
    whenToSeeDoctor: [
      "Sharp rib pain, shortness of breath, or difficulty taking a deep breath after binding.",
      "Severe skin tears, blistering, or spreading infection in the groin or chest region.",
      "Unexplained swelling, calf pain, or sudden chest pain (urgent check for blood clot risk on HRT)."
    ]
  },

  // 4. UNIVERSAL STUDENT DAILY HYGIENE STEPS
  {
    id: 'hygiene-universal',
    category: 'universal',
    title: "Universal Student Daily Hygiene & Health Habits",
    subtitle: "The essential 5 hygiene pillars every school and college student should practice daily.",
    targetAudience: "All school & college students, teenagers, and families",
    headerImage: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80",
    summary: "Good personal hygiene is your first line of defense against viral infections, dental cavities, skin breakouts, and fatigue. Master these 5 simple daily steps!",
    steps: [
      {
        stepNumber: 1,
        title: "The 6-Step Handwashing Technique (20 Seconds)",
        description: "Wet hands, apply soap, and rub: 1) Palms, 2) Back of hands, 3) Between fingers, 4) Back of fingers, 5) Thumbs in rotation, 6) Fingertips against palms.",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80",
        proTip: "Sing 'Happy Birthday' twice in your head — that equals the exact 20 seconds needed to break virus lipid membranes.",
        commonMistakeToAvoid: "Rinsing hands for only 3 seconds with water without soap leaves 90% of bacteria behind."
      },
      {
        stepNumber: 2,
        title: "2x2 Dental Routine (Brush 2 Minutes, 2 Times a Day)",
        description: "Brush teeth once in the morning after waking up and once at night right before sleeping. Use a soft-bristled brush with fluoride toothpaste.",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&auto=format&fit=crop&q=80",
        proTip: "Clean your tongue gently with a tongue scraper to remove the white biofilm that causes 85% of bad breath (halitosis).",
        commonMistakeToAvoid: "Brushing horizontally with extreme pressure wears down protective tooth enamel and causes sensitive gums."
      },
      {
        stepNumber: 3,
        title: "Daily Bath & Complete Towel Drying",
        description: "Bathe once daily using mild soap on high-sweat areas. Use a clean, dry personal towel. Always dry toe webs and skin folds completely.",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80",
        proTip: "Never share personal bath towels to avoid spreading fungal ringworm and eye conjunctivitis.",
        commonMistakeToAvoid: "Wearing socks or shoes on damp feet causes smelly athlete's foot fungus."
      },
      {
        stepNumber: 4,
        title: "Nail Trimming & Scalp Care",
        description: "Clip fingernails and toenails straight across once every week. Wash hair with mild shampoo 2-3 times weekly to remove dandruff and sweat oil.",
        image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&auto=format&fit=crop&q=80",
        proTip: "Dirt trapped under long fingernails enters your mouth when eating food or biting nails.",
        commonMistakeToAvoid: "Biting nails transfers infectious eggs of pinworms and bacteria directly into your stomach."
      },
      {
        stepNumber: 5,
        title: "Hydration & Screen Eye Hygiene",
        description: "Drink 2.5 to 3 liters of water daily. Practice the 20-20-20 rule for screens and avoid scrolling in pitch-dark bedrooms.",
        image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=600&auto=format&fit=crop&q=80",
        proTip: "Carry your own refillable water bottle to school or college.",
        commonMistakeToAvoid: "Drinking sugary energy drinks or cold sodas instead of plain water."
      }
    ],
    dosAndDonts: {
      dos: [
        "Keep your own personal hygiene kit (toothbrush, tongue cleaner, towel, soap, comb).",
        "Wash hands before eating, after using the toilet, and after sneezing or coughing.",
        "Change into fresh clean clothes after coming home from school/sports.",
        "Get 8 hours of sleep every night for memory consolidation."
      ],
      donts: [
        "Don't share toothbrushes, razors, or ear buds.",
        "Don't pick at skin blemishes or insert sharp objects into ears to clean earwax.",
        "Don't skip breakfast before morning exams."
      ]
    },
    tabooBusters: [
      {
        myth: "Inserting cotton buds (Q-tips) deep inside ears is the best way to clean them.",
        truth: "Ears are self-cleaning; sticking cotton buds pushes earwax deeper against the eardrum.",
        explanation: "Doctors advise: 'Never put anything smaller than your elbow in your ear.' The outer ear can be wiped with a damp cloth, but the inner canal cleans itself naturally."
      }
    ],
    whenToSeeDoctor: [
      "Toothache, bleeding gums, or sensitivity to hot/cold drinks that lasts more than 2 days.",
      "Persistent circular itchy red patches on skin (Ringworm / Tinea infection).",
      "Severe dandruff with itchy yellowish scalp crusts (Seborrheic dermatitis).",
      "Persistent stomach cramps or watery diarrhea lasting more than 24-48 hours."
    ]
  }
];
