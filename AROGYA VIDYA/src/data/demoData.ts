import { MedicalReport, Medication, PreventiveCareItem, TimelineEvent, UserProfile, EmergencyHealthCard } from '../types';

export const DEMO_USER: UserProfile = {
  id: 'usr-monika-001',
  name: 'Monika Reddy',
  email: 'reddymonika358@gmail.com',
  age: 26,
  gender: 'Female',
  profession: 'software_engineer',
  professionTitle: 'Software Engineer',
  bloodGroup: 'B Positive (B+)',
  city: 'Bengaluru',
  locality: 'Indiranagar / Whitefield',
  dateOfBirth: '1999-07-14',
  chronicConditions: ['None'],
  allergies: ['Penicillin (Mild rash)'],
  emergencyContact: {
    name: 'Suresh Reddy',
    relation: 'Father',
    phone: '+91 98450 12345'
  },
  preferredLanguage: 'en',
  selectedTopics: ['hygiene_center', 'nutrition', 'mental_wellbeing', 'womens_health', 'puberty_academy'],
  isAdmin: false,
  isGuest: false,
  avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
  createdAt: '2026-01-10'
};

export const DEMO_PROFILES: UserProfile[] = [
  DEMO_USER,
  {
    id: 'usr-suresh-002',
    name: 'Suresh Reddy',
    email: 'suresh.reddy@example.com',
    age: 58,
    gender: 'Male',
    profession: 'desk_corporate',
    professionTitle: 'Senior Manager (Banking)',
    bloodGroup: 'O Positive (O+)',
    city: 'Bengaluru',
    locality: 'Jayanagar 4th Block',
    dateOfBirth: '1968-03-22',
    chronicConditions: ['Type 2 Diabetes (Controlled)', 'Mild Hypertension'],
    allergies: ['Dust / Pollen'],
    emergencyContact: {
      name: 'Monika Reddy',
      relation: 'Daughter',
      phone: '+91 98765 43210'
    },
    preferredLanguage: 'kn',
    selectedTopics: ['nutrition', 'mental_wellbeing', 'hygiene_center'],
    isAdmin: false,
    isGuest: false,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    createdAt: '2026-01-15'
  },
  {
    id: 'usr-geetha-003',
    name: 'Geetha Reddy',
    email: 'geetha.reddy@example.com',
    age: 54,
    gender: 'Female',
    profession: 'teacher',
    professionTitle: 'High School Teacher',
    bloodGroup: 'B Positive (B+)',
    city: 'Bengaluru',
    locality: 'Jayanagar 4th Block',
    dateOfBirth: '1972-11-05',
    chronicConditions: ['Mild Thyroid (Hypothyroidism)'],
    allergies: ['None'],
    emergencyContact: {
      name: 'Monika Reddy',
      relation: 'Daughter',
      phone: '+91 98765 43210'
    },
    preferredLanguage: 'kn',
    selectedTopics: ['womens_health', 'nutrition', 'hygiene_center'],
    isAdmin: false,
    isGuest: false,
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    createdAt: '2026-01-20'
  },
  {
    id: 'usr-ananya-004',
    name: 'Ananya Reddy',
    email: 'ananya.reddy@example.com',
    age: 17,
    gender: 'Female',
    profession: 'student',
    professionTitle: 'Pre-University / 12th Student',
    bloodGroup: 'B Positive (B+)',
    city: 'Bengaluru',
    locality: 'Indiranagar',
    dateOfBirth: '2009-08-19',
    chronicConditions: ['None'],
    allergies: ['Peanuts (Mild)'],
    emergencyContact: {
      name: 'Monika Reddy',
      relation: 'Elder Sister',
      phone: '+91 98765 43210'
    },
    preferredLanguage: 'en',
    selectedTopics: ['puberty_academy', 'hygiene_center', 'mental_wellbeing'],
    isAdmin: false,
    isGuest: false,
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    createdAt: '2026-02-01'
  }
];

export const DEMO_REPORTS: MedicalReport[] = [
  {
    id: 'rep-cbc-2026',
    userId: 'usr-alex-001',
    reportTitle: 'Complete Blood Count (CBC) Panel',
    reportDate: '2026-02-10',
    laboratoryName: 'Apex Diagnostic PathLabs',
    category: 'Hematology',
    fileName: 'CBC_Panel_AlexMorgan_Feb2026.pdf',
    tests: [
      {
        testName: 'Hemoglobin (Hb)',
        resultValue: '10.8',
        numericValue: 10.8,
        unit: 'g/dL',
        referenceRange: '12.0 - 15.5 g/dL',
        status: 'below',
        simpleExplanation: 'Your report lists a reference range of 12.0 - 15.5 g/dL. This result is 10.8 g/dL, which appears below that range. Hemoglobin is the protein in red blood cells that carries oxygen throughout your body.',
        whatItMeasures: 'Measures the oxygen-carrying capacity of red blood cells.',
        questionsForDoctor: [
          'What factors could be contributing to this hemoglobin level?',
          'Would dietary adjustments or iron studies be appropriate to check?',
          'When should we repeat this test to monitor the trend?'
        ]
      },
      {
        testName: 'RBC Count',
        resultValue: '4.1',
        numericValue: 4.1,
        unit: 'million/mcL',
        referenceRange: '4.0 - 5.2 million/mcL',
        status: 'normal',
        simpleExplanation: 'Your result of 4.1 million/mcL sits within the standard laboratory reference range of 4.0 - 5.2 million/mcL.',
        whatItMeasures: 'The total count of red blood cells in your bloodstream.',
        questionsForDoctor: [
          'Are my red cell indices consistent with my overall hydration and health?'
        ]
      },
      {
        testName: 'White Blood Cell (WBC) Count',
        resultValue: '6,400',
        numericValue: 6400,
        unit: 'cells/mcL',
        referenceRange: '4,500 - 11,000 cells/mcL',
        status: 'normal',
        simpleExplanation: 'Your WBC count is 6,400 cells/mcL, which falls well within the healthy reference range of 4,500 - 11,000 cells/mcL.',
        whatItMeasures: 'Key white immune defense cells that help fight off microbial infections.',
        questionsForDoctor: [
          'Does my WBC differential show a balanced immune response?'
        ]
      },
      {
        testName: 'Platelet Count',
        resultValue: '240,000',
        numericValue: 240000,
        unit: '/mcL',
        referenceRange: '150,000 - 450,000 /mcL',
        status: 'normal',
        simpleExplanation: 'Your platelet count is 240,000 /mcL, nicely centered within the 150,000 - 450,000 /mcL reference range.',
        whatItMeasures: 'Cell fragments crucial for normal blood clotting and vessel repair.',
        questionsForDoctor: [
          'Is my clotting profile normal for routine activity?'
        ]
      },
      {
        testName: 'Ferritin (Serum Iron Stores)',
        resultValue: '18',
        numericValue: 18,
        unit: 'ng/mL',
        referenceRange: '20 - 200 ng/mL',
        status: 'below',
        simpleExplanation: 'Your serum ferritin is 18 ng/mL, which sits just below the laboratory reference range of 20 - 200 ng/mL. Ferritin reflects stored iron in the body.',
        whatItMeasures: 'Estimates total iron stores in your liver and tissues.',
        questionsForDoctor: [
          'Would you recommend increasing dietary iron or an oral supplement?',
          'Could heavy menstrual cycles or endurance exercise explain this level?'
        ]
      }
    ],
    overallSummary: 'This Complete Blood Count report indicates standard white blood cell and platelet counts, with hemoglobin and ferritin values slightly below the laboratory reference range. The clinical meaning depends on your individual symptoms, diet, and clinical history.',
    disclaimer: 'This explanation is for educational awareness only and is not a medical diagnosis. Please review these results with your healthcare clinician.',
    uploadedAt: '2026-02-10T09:30:00Z'
  },
  {
    id: 'rep-cbc-2025',
    userId: 'usr-alex-001',
    reportTitle: 'Previous Complete Blood Count (CBC) Panel',
    reportDate: '2025-08-15',
    laboratoryName: 'Apex Diagnostic PathLabs',
    category: 'Hematology',
    fileName: 'CBC_Panel_AlexMorgan_Aug2025.pdf',
    tests: [
      {
        testName: 'Hemoglobin (Hb)',
        resultValue: '10.2',
        numericValue: 10.2,
        unit: 'g/dL',
        referenceRange: '12.0 - 15.5 g/dL',
        status: 'below',
        simpleExplanation: 'Your previous report showed 10.2 g/dL against a reference range of 12.0 - 15.5 g/dL.',
        whatItMeasures: 'Oxygen carrying protein in red cells.',
        questionsForDoctor: ['How is this tracking compared to previous checkups?']
      },
      {
        testName: 'RBC Count',
        resultValue: '3.9',
        numericValue: 3.9,
        unit: 'million/mcL',
        referenceRange: '4.0 - 5.2 million/mcL',
        status: 'below',
        simpleExplanation: 'RBC was slightly below reference range at 3.9 million/mcL.',
        whatItMeasures: 'Total red blood cells.',
        questionsForDoctor: ['Is my red blood cell production improving?']
      },
      {
        testName: 'White Blood Cell (WBC) Count',
        resultValue: '6,100',
        numericValue: 6100,
        unit: 'cells/mcL',
        referenceRange: '4,500 - 11,000 cells/mcL',
        status: 'normal',
        simpleExplanation: 'WBC count was within standard range.',
        whatItMeasures: 'Immune cells count.',
        questionsForDoctor: []
      },
      {
        testName: 'Platelet Count',
        resultValue: '225,000',
        numericValue: 225000,
        unit: '/mcL',
        referenceRange: '150,000 - 450,000 /mcL',
        status: 'normal',
        simpleExplanation: 'Platelets within normal reference limits.',
        whatItMeasures: 'Clotting cell fragments.',
        questionsForDoctor: []
      },
      {
        testName: 'Ferritin (Serum Iron Stores)',
        resultValue: '14',
        numericValue: 14,
        unit: 'ng/mL',
        referenceRange: '20 - 200 ng/mL',
        status: 'below',
        simpleExplanation: 'Ferritin was at 14 ng/mL in August 2025.',
        whatItMeasures: 'Iron stores.',
        questionsForDoctor: []
      }
    ],
    overallSummary: 'Previous baseline CBC from 6 months ago for comparison.',
    disclaimer: 'For educational comparison and doctor visit preparation.',
    uploadedAt: '2025-08-15T11:00:00Z'
  },
  {
    id: 'rep-lipid-2026',
    userId: 'usr-alex-001',
    reportTitle: 'Routine Fasting Lipid & Cholesterol Profile',
    reportDate: '2026-01-22',
    laboratoryName: 'Metropolis Health Lab',
    category: 'Biochemistry',
    fileName: 'Lipid_Profile_Alex_Jan2026.pdf',
    tests: [
      {
        testName: 'Total Cholesterol',
        resultValue: '178',
        numericValue: 178,
        unit: 'mg/dL',
        referenceRange: '< 200 mg/dL',
        status: 'normal',
        simpleExplanation: 'Your total cholesterol is 178 mg/dL, which is within the desirable range (< 200 mg/dL).',
        whatItMeasures: 'Total amount of cholesterol circulating in your blood.',
        questionsForDoctor: ['Is my lipid balance supportive of cardiovascular wellness?']
      },
      {
        testName: 'HDL (Good Cholesterol)',
        resultValue: '58',
        numericValue: 58,
        unit: 'mg/dL',
        referenceRange: '> 50 mg/dL (Desirable)',
        status: 'normal',
        simpleExplanation: 'Your HDL is 58 mg/dL, which meets the desirable target of above 50 mg/dL.',
        whatItMeasures: 'High-density lipoprotein that helps carry cholesterol away from arteries.',
        questionsForDoctor: ['How can I continue supporting healthy HDL levels through exercise?']
      },
      {
        testName: 'LDL (Calculated)',
        resultValue: '96',
        numericValue: 96,
        unit: 'mg/dL',
        referenceRange: '< 100 mg/dL (Optimal)',
        status: 'normal',
        simpleExplanation: 'Your LDL is 96 mg/dL, fitting into the optimal reference band (< 100 mg/dL).',
        whatItMeasures: 'Low-density lipoprotein often reviewed in relation to cardiovascular health.',
        questionsForDoctor: []
      },
      {
        testName: 'Triglycerides',
        resultValue: '120',
        numericValue: 120,
        unit: 'mg/dL',
        referenceRange: '< 150 mg/dL',
        status: 'normal',
        simpleExplanation: 'Your triglycerides level is 120 mg/dL, within the normal range (< 150 mg/dL).',
        whatItMeasures: 'A common type of fat stored in the body from dietary calories.',
        questionsForDoctor: []
      }
    ],
    overallSummary: 'Fasting lipid panel demonstrates standard values across total cholesterol, HDL, LDL, and triglycerides.',
    disclaimer: 'Educational reference values only. Clinical significance should be reviewed with your primary physician.',
    uploadedAt: '2026-01-22T14:15:00Z'
  }
];

export const DEMO_MEDICATIONS: Medication[] = [
  {
    id: 'med-001',
    userId: 'usr-alex-001',
    name: 'Ferrous Ascorbate (Iron Supplement)',
    prescribedBy: 'Dr. Priya Sharma (Internal Medicine)',
    purpose: 'Support healthy red blood cell iron levels',
    instructions: 'Take 1 tablet daily with a glass of water, ideally with Vitamin C (e.g. orange juice). Avoid taking with tea or dairy.',
    frequency: 'Once daily (Morning with breakfast)',
    reminderTimes: ['08:30'],
    startDate: '2026-02-12',
    endDate: '2026-05-12',
    isActive: true,
    history: [
      { date: '2026-02-28', time: '08:32', status: 'taken' },
      { date: '2026-02-27', time: '08:30', status: 'taken' },
      { date: '2026-02-26', time: '08:35', status: 'taken' },
      { date: '2026-02-25', time: '09:00', status: 'taken' },
      { date: '2026-02-24', time: '08:30', status: 'taken' },
      { date: '2026-02-23', time: '08:30', status: 'taken' },
      { date: '2026-02-22', time: '08:30', status: 'missed' }
    ]
  },
  {
    id: 'med-002',
    userId: 'usr-alex-001',
    name: 'Vitamin D3 (Cholecalciferol 60,000 IU)',
    prescribedBy: 'Dr. Priya Sharma',
    purpose: 'Support bone density and immune balance',
    instructions: 'Take 1 capsule once weekly on Sunday with a meal containing healthy fats.',
    frequency: 'Once weekly (Sundays at Lunch)',
    reminderTimes: ['13:00'],
    startDate: '2026-01-15',
    endDate: '2026-03-15',
    isActive: true,
    history: [
      { date: '2026-02-22', time: '13:05', status: 'taken' },
      { date: '2026-02-15', time: '13:10', status: 'taken' },
      { date: '2026-02-08', time: '13:00', status: 'taken' }
    ]
  }
];

export const DEMO_PREVENTIVE_CARE: PreventiveCareItem[] = [
  {
    id: 'prev-001',
    title: 'Routine Dental Clean & Checkup',
    category: 'Dental',
    recommendedFrequency: 'Every 6 months',
    lastDoneDate: '2025-09-10',
    nextDueDate: '2026-03-10',
    status: 'due',
    guidelineSource: 'Indian Dental Association & ADA',
    notes: 'Schedule routine plaque removal and enamel check.'
  },
  {
    id: 'prev-002',
    title: 'Annual Comprehensive Eye & Vision Exam',
    category: 'Vision',
    recommendedFrequency: 'Every 12 to 24 months',
    lastDoneDate: '2025-04-18',
    nextDueDate: '2026-04-18',
    status: 'upcoming',
    guidelineSource: 'All India Ophthalmological Society',
    notes: 'Check refractive visual acuity and screen eye pressure.'
  },
  {
    id: 'prev-003',
    title: 'Repeat CBC & Serum Ferritin Follow-up',
    category: 'Routine',
    recommendedFrequency: 'At 3-month interval',
    lastDoneDate: '2026-02-10',
    nextDueDate: '2026-05-15',
    status: 'scheduled',
    guidelineSource: 'Treating Clinician Recommendation',
    notes: 'Evaluate response to iron-rich nutrition and supplement.'
  },
  {
    id: 'prev-004',
    title: 'Annual Influenza (Flu) Vaccination Discussion',
    category: 'Vaccination',
    recommendedFrequency: 'Annually before monsoon/winter season',
    lastDoneDate: '2025-10-05',
    nextDueDate: '2026-10-01',
    status: 'upcoming',
    guidelineSource: 'WHO & National Immunization Guidelines',
    notes: 'Discuss seasonal booster with primary healthcare provider.'
  }
];

export const DEMO_TIMELINE: TimelineEvent[] = [
  {
    id: 'tl-1',
    date: 'February 12, 2026',
    title: 'Started Prescribed Iron Supplementation',
    description: 'Began Ferrous Ascorbate 1 tab daily with breakfast following clinician consultation.',
    type: 'medication',
    badge: 'Medication'
  },
  {
    id: 'tl-2',
    date: 'February 10, 2026',
    title: 'Lab Report: Complete Blood Count (CBC)',
    description: 'Uploaded diagnostic report from Apex PathLabs. Hb noted at 10.8 g/dL.',
    type: 'report',
    badge: 'Medical Report'
  },
  {
    id: 'tl-3',
    date: 'January 22, 2026',
    title: 'Lab Report: Fasting Lipid Profile',
    description: 'Uploaded annual wellness lipid panel. Total cholesterol 178 mg/dL (Normal).',
    type: 'report',
    badge: 'Medical Report'
  },
  {
    id: 'tl-4',
    date: 'January 15, 2026',
    title: 'Preventive Care: Vitamin D3 Course',
    description: 'Started weekly Vitamin D3 60,000 IU capsule prescribed for 8 weeks.',
    type: 'medication',
    badge: 'Medication'
  },
  {
    id: 'tl-5',
    date: 'September 10, 2025',
    title: 'Preventive Checkup: Dental Cleaning',
    description: 'Routine 6-month dental scaling completed. No cavities detected.',
    type: 'appointment',
    badge: 'Preventive Care'
  }
];

export const DEMO_EMERGENCY_CARD: EmergencyHealthCard = {
  userId: 'usr-monika-001',
  fullName: 'Monika Reddy',
  bloodGroup: 'B Positive (B+)',
  allergies: ['Penicillin (Mild skin rash)'],
  chronicConditions: ['None'],
  currentMedications: ['Vitamin D3 (Weekly)'],
  emergencyContacts: [
    {
      name: 'Suresh Reddy',
      relation: 'Father',
      phone: '+91 98450 12345',
      isPrimary: true
    },
    {
      name: 'Geetha Reddy',
      relation: 'Mother',
      phone: '+91 98765 43210',
      isPrimary: false
    }
  ],
  organDonor: true,
  specialMedicalNotes: 'Software Engineer based in Bengaluru. No chronic cardiovascular illnesses.',
  preferredHospital: 'Manipal Hospital (Old Airport Rd) / Apollo (Bannerghatta)',
  isPubliclyVisible: true,
  qrPayloadUrl: 'https://arogyavidya.care/emergency/usr-monika-001',
  lastUpdated: '2026-02-28'
};
