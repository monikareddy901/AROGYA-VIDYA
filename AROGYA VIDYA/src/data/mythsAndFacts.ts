import { MythFactItem } from '../types';

export const MYTHS_AND_FACTS: MythFactItem[] = [
  // Hygiene
  {
    id: 'mf-hygiene-1',
    category: 'hygiene_center',
    myth: "You need special scented soaps or douches to clean internal intimate organs.",
    fact: "The internal reproductive canal is naturally self-cleaning with a balanced acidic microflora. Unnecessary or perfumed cleansers disrupt natural pH and trigger infections.",
    explanation: "Medical bodies worldwide recommend washing only the external intimate skin gently with plain warm water or mild non-fragranced cleanser.",
    evidenceSource: "American College of Obstetricians and Gynecologists (ACOG)"
  },
  {
    id: 'mf-hygiene-2',
    category: 'hygiene_center',
    myth: "Using antibacterial soap for daily home handwashing is much better than regular soap.",
    fact: "Regular soap and flowing water is equally effective at removing viruses and bacteria through mechanical friction, without promoting antibiotic resistance.",
    explanation: "The FDA and WHO state that plain soap and water lifts pathogens just as well as antibacterial formulas for normal household use.",
    evidenceSource: "US Food & Drug Administration (FDA) & WHO"
  },

  // Nutrition
  {
    id: 'mf-nutrition-1',
    category: 'nutrition',
    myth: "Juice cleanses and detox teas are necessary to flush toxins out of your body.",
    fact: "Your body already has an efficient, built-in 24/7 detoxification system: your liver, kidneys, lungs, skin, and gastrointestinal tract.",
    explanation: "Detox diets provide no proven clinical benefit and can lead to electrolyte imbalances, muscle loss, and gastrointestinal irritation. Clean water, dietary fiber, and balanced meals are all your organs need.",
    evidenceSource: "Harvard T.H. Chan School of Public Health"
  },
  {
    id: 'mf-nutrition-2',
    category: 'nutrition',
    myth: "Eating fat makes you gain body fat, so all dietary fats must be avoided.",
    fact: "Healthy unsaturated fats (from nuts, seeds, olive oil, and avocados) are essential for hormone production, brain function, and vitamin absorption.",
    explanation: "Fats supply essential fatty acids and allow your body to absorb fat-soluble vitamins (A, D, E, K). It is the overall quality and caloric balance of the diet that matters.",
    evidenceSource: "World Health Organization Dietary Guidelines"
  },

  // Men's Health
  {
    id: 'mf-mens-1',
    category: 'mens_health',
    myth: "Any lump found in the testicles is a sign of cancer.",
    fact: "The majority of scrotal lumps are benign conditions such as epididymal cysts, hydroceles (fluid), or varicoceles (enlarged veins).",
    explanation: "While all new lumps must be evaluated by a healthcare professional with a painless ultrasound, finding a lump does not automatically mean a malignancy.",
    evidenceSource: "NHS Urological Health Advisory"
  },
  {
    id: 'mf-mens-2',
    category: 'mens_health',
    myth: "Only older men need to care about testicular health checks.",
    fact: "Testicular conditions most commonly occur in young men and adolescents aged 15 to 35, making early self-awareness very important.",
    explanation: "Performing a gentle monthly self-check helps young men become familiar with their baseline anatomy so any change is noticed early.",
    evidenceSource: "American Urological Association"
  },

  // Women's Health
  {
    id: 'mf-womens-1',
    category: 'womens_health',
    myth: "Severe, disabling period pain is just a normal part of being a woman that you have to endure.",
    fact: "Mild to moderate cramping is common, but pain that keeps you from school, work, or daily life is not normal and should be medically assessed.",
    explanation: "Debilitating menstrual pain can be a sign of treatable conditions such as endometriosis, adenomyosis, or fibroids, which benefit from personalized medical management.",
    evidenceSource: "ACOG & Royal College of Obstetricians and Gynaecologists"
  },
  {
    id: 'mf-womens-2',
    category: 'womens_health',
    myth: "You cannot get pregnant during your menstrual period.",
    fact: "While less likely, pregnancy can occur from intercourse during menstruation, especially for individuals with shorter or irregular cycles.",
    explanation: "Sperm can survive in the reproductive tract for up to 5 days, so early ovulation shortly after bleeding begins can lead to fertilization.",
    evidenceSource: "World Health Organization Reproductive Health"
  },

  // Sexual Health
  {
    id: 'mf-sexual-1',
    category: 'sexual_health',
    myth: "If you have an STI, you will always notice obvious symptoms like pain or sores immediately.",
    fact: "Many STIs (such as Chlamydia, Gonorrhea, HPV, and early HIV) frequently cause zero symptoms for months or years in both men and women.",
    explanation: "Because STIs can be asymptomatic, routine screening between sexual partners is the only reliable way to protect yourself and your partner.",
    evidenceSource: "CDC Sexually Transmitted Infections Surveillance"
  },
  {
    id: 'mf-sexual-2',
    category: 'sexual_health',
    myth: "Double-bagging (wearing two condoms at the same time) provides twice the protection.",
    fact: "Wearing two condoms creates friction between the latex layers, making them much more likely to tear and break.",
    explanation: "Use one correctly fitted, properly lubricated condom for safe and reliable barrier protection.",
    evidenceSource: "Planned Parenthood & WHO Safe Sex Standards"
  },

  // Mental Wellbeing
  {
    id: 'mf-mental-1',
    category: 'mental_wellbeing',
    myth: "Therapy or counseling is only for people experiencing severe mental breakdowns.",
    fact: "Mental health support is beneficial for anyone looking to build healthy coping strategies, process life transitions, manage stress, or improve relationships.",
    explanation: "Preventive emotional care and talk therapy equip people with cognitive tools before situational stress escalates into chronic disorders.",
    evidenceSource: "American Psychological Association"
  },
  {
    id: 'mf-mental-2',
    category: 'mental_wellbeing',
    myth: "You can simply 'snap out' of clinical depression if you have enough willpower.",
    fact: "Depression is a genuine medical condition involving neurochemical, genetic, psychological, and environmental factors—not a lack of willpower.",
    explanation: "Evidence-based treatments like psychotherapy, lifestyle adjustments, and prescribed medical care help restore brain neuroplasticity and emotional balance.",
    evidenceSource: "National Institute of Mental Health (NIMH)"
  },

  // Puberty
  {
    id: 'mf-puberty-1',
    category: 'puberty_academy',
    myth: "Frequent washing with harsh scrubbers cures teenage acne.",
    fact: "Aggressive scrubbing irritates the skin barrier and triggers skin glands to produce even more oil, worsening breakouts.",
    explanation: "Gentle cleansing twice a day with mild cleanser and water, combined with dermatologist-approved topical ingredients, is the recommended clinical approach.",
    evidenceSource: "American Academy of Dermatology (AAD)"
  },
  {
    id: 'mf-puberty-2',
    category: 'puberty_academy',
    myth: "Every teenager goes through puberty at the exact same age and timeline.",
    fact: "Puberty begins at varying ages between 8 and 14 and progresses across several stages (Tanner stages) at an individual's unique biological pace.",
    explanation: "Genetics, nutrition, and overall health all influence individual developmental timelines.",
    evidenceSource: "American Academy of Pediatrics"
  },

  // Trans-inclusive Health
  {
    id: 'mf-trans-1',
    category: 'trans_health',
    myth: "Transgender people do not need routine cancer screenings for their birth anatomy.",
    fact: "Medical guidelines recommend organ-based screening: any organ present in the body (e.g. breast tissue, cervix, prostate) should be screened according to standard health guidelines.",
    explanation: "Cancer screenings protect anatomical organs regardless of a patient's gender identity or presentation.",
    evidenceSource: "WPATH Standards of Care & UCSF Transgender Care Guidelines"
  }
];
