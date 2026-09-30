import { TimeTableItem, ProfessionType } from '../types';

export interface ProfessionGuideline {
  professionId: ProfessionType;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  whatToDo: Array<{
    title: string;
    description: string;
    icon: string;
    category: 'posture' | 'hydration' | 'nutrition' | 'mental' | 'hygiene' | 'sleep' | 'movement' | 'exercise' | 'eye_care' | 'ergonomics';
  }>;
  whatNOTToDo: Array<{
    title: string;
    warning: string;
    risk: string;
    category: 'danger' | 'strain' | 'metabolic' | 'mental' | 'sleep';
  }>;
  schedule: TimeTableItem[];
}

export const PROFESSION_ROUTINES: Record<ProfessionType, ProfessionGuideline> = {
  software_engineer: {
    professionId: 'software_engineer',
    title: 'Software & IT Tech Professional',
    subtitle: 'Counteract prolonged screen time, sedentary posture & mental fatigue',
    icon: '💻',
    description: 'Designed for developers, designers, data analysts, and IT staff dealing with high screen exposure, coding sprints, and long seated desk hours.',
    whatToDo: [
      {
        title: 'Strict 20-20-20 Eye Protection Rule',
        description: 'Every 20 minutes of coding, look at an object 20 feet away for 20 seconds. Blink intentionally 10 times to replenish tear film.',
        icon: '👁️',
        category: 'posture'
      },
      {
        title: 'Ergonomic 90-90-90 Seating & Lumbar Support',
        description: 'Keep knees at 90°, hips at 90°, and elbows at 90°. The top third of your monitor must align directly with eye level.',
        icon: '🪑',
        category: 'posture'
      },
      {
        title: 'Hydration Anchor (2.5L - 3L Daily)',
        description: 'Keep a 1-liter steel water bottle at your desk. Drink a glass whenever you push a git commit or finish a sprint call.',
        icon: '💧',
        category: 'hydration'
      },
      {
        title: 'Wrist & Carpal Tunnel Stretches',
        description: 'Do wrist extensions and flexor stretches for 60 seconds every 2 hours to prevent repetitive strain injury (RSI).',
        icon: '🤲',
        category: 'posture'
      },
      {
        title: 'Digital Sunset (No Screens 45m Before Bed)',
        description: 'Shut down work laptops and enable Night Light / Blue Light filters after 8:00 PM to protect natural melatonin release.',
        icon: '🌙',
        category: 'sleep'
      }
    ],
    whatNOTToDo: [
      {
        title: 'NEVER Sit Continuously for > 60 Minutes',
        warning: 'Prolonged static sitting shuts off lipoprotein lipase enzymes and increases deep vein thrombosis (DVT) and spinal disc compression.',
        risk: 'Lower back herniation & metabolic slowdown',
        category: 'danger'
      },
      {
        title: 'DO NOT Eat Lunch While Typing on Keyboard',
        warning: 'Keyboards harbor up to 400x more bacteria than a clean surface. Eating while coding leads to mindless overeating and digestive acid reflux.',
        risk: 'Gastroenteritis & digestive indigestion',
        category: 'hygiene' as any
      },
      {
        title: 'DO NOT Consume High-Caffeine / Energy Drinks Past 4 PM',
        warning: 'Caffeine has an 8-hour half-life. Afternoon coffees delay deep slow-wave REM sleep, leaving you chronically brain-fogged next morning.',
        risk: 'Insomnia & adrenal burnout',
        category: 'sleep'
      },
      {
        title: 'DO NOT Rub Eyes with Unwashed Hands During Sprints',
        warning: 'Touching eyes transfers keyboard microbes, causing dry-eye corneal abrasions and blepharitis.',
        risk: 'Eye infections & severe strain',
        category: 'strain'
      },
      {
        title: 'DO NOT Slouch into "Tech Neck" / Forward Head Tilt',
        warning: 'For every 1 inch your head tilts forward, your cervical spine bears an extra 10 lbs of pressure, leading to chronic tension headaches.',
        risk: 'Cervical spondylosis & migraines',
        category: 'strain'
      }
    ],
    schedule: [
      {
        id: 'se-1',
        timeSlot: '06:30 AM - 07:30 AM',
        period: 'Morning',
        title: 'Morning Sunlight, Hydration & Spine Decompression',
        description: 'Drink 500ml water, do 15 min cat-cow, thoracic rotations and 20 min brisk walking in natural morning light.',
        category: 'movement',
        steps: ['500ml lukewarm water', '15 min spine & hip opener stretches', '20 min walk without phone'],
        scientificWhy: 'Morning sunlight halts melatonin and sets the master circadian clock (SCN) for peak daytime focus.',
        imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'se-2',
        timeSlot: '08:30 AM - 09:00 AM',
        period: 'Morning',
        title: 'High-Protein Low-Glycemic Brain Breakfast',
        description: 'Fuel with complex carbs and protein (eggs/sprouts/paneer) to prevent insulin spikes and mid-morning coding crashes.',
        category: 'nutrition',
        steps: ['Eggs/Paneer/Sprouts with whole wheat or oats', 'Handful of soaked walnuts & almonds', 'Clean keyboard wipe-down before starting'],
        scientificWhy: 'Stable blood glucose prevents dopamine drops and mental fatigue during deep architecture problem solving.',
        imageUrl: 'https://images.unsplash.com/photo-1494390248081-4e521a5940db?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'se-3',
        timeSlot: '11:00 AM - 11:15 AM',
        period: 'Midday',
        title: 'Mid-Morning Micro-Break (20-20-20 & Neck Relief)',
        description: 'Stand up from chair, drink water, do doorway chest openers and 20-20-20 eye gaze out the window.',
        category: 'study_focus',
        steps: ['Drink 300ml water', 'Doorway pectoralis stretch', '10 conscious deep blinks'],
        scientificWhy: 'Reduces intraocular pressure and prevents trapezius muscle spasm from continuous mouse holding.',
        imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'se-4',
        timeSlot: '01:00 PM - 02:00 PM',
        period: 'Afternoon',
        title: 'Step Away Lunch & 10-Minute Post-Meal Stroll',
        description: 'Eat away from screens. Wash hands thoroughly with soap. Walk 500-1000 steps indoors or in garden.',
        category: 'nutrition',
        steps: ['20-second hand hygiene', 'Balanced fiber + protein plate', '10-minute light walk for glycemic control'],
        scientificWhy: 'A 10-minute post-meal stroll blunts postprandial glucose spikes by up to 25%.',
        imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'se-5',
        timeSlot: '06:00 PM - 07:00 PM',
        period: 'Evening',
        title: 'Workout & Cardiovascular Reset',
        description: 'Engage in moderate-to-high intensity exercise (running, badminton, swimming, gym, or yoga).',
        category: 'movement',
        steps: ['40 minutes active cardiovascular workout', 'Proper hydration during sweat', 'Post-workout cooldown'],
        scientificWhy: 'Elevates BDNF (Brain-Derived Neurotrophic Factor) to repair cognitive fatigue.',
        imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'se-6',
        timeSlot: '10:00 PM - 10:30 PM',
        period: 'Night',
        title: 'Night Hygiene & Digital Cutoff (7.5h Sleep)',
        description: 'Brush teeth for 2 min, wash face, turn off all screens, and sleep in dark cool room.',
        category: 'sleep',
        steps: ['2-minute fluoride brushing & flossing', 'Phone placed away from bed', 'Pitch-dark quiet room'],
        scientificWhy: 'Optimizes deep lymphatic drainage in the brain to prevent burnout and brain aging.',
        imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80'
      }
    ]
  },

  doctor_nurse: {
    professionId: 'doctor_nurse',
    title: 'Healthcare Worker, Doctor & Nurse',
    subtitle: 'Protect against pathogen exposure, clinical burnout & 12h shift fatigue',
    icon: '🩺',
    description: 'Specialized for clinicians, nurses, surgeons, and ward staff managing high physical standing hours, infection control, and acute stress.',
    whatToDo: [
      {
        title: 'Rigorous 6-Step Hand Hygiene & Barrier Care',
        description: 'Wash hands before and after patient contact. Apply moisturizing barrier cream to prevent dermatitis from frequent alcohol rubs.',
        icon: '🧼',
        category: 'hygiene'
      },
      {
        title: 'Graduated Compression Socks for Long Shifts',
        description: 'Wear medical-grade 15-20 mmHg compression stockings during OPD and round hours to prevent varicose veins and calf pooling.',
        icon: '🧦',
        category: 'posture'
      },
      {
        title: 'Strategic Hydration & Electrolyte Timing',
        description: 'Keep a designated clean hydration flask in the staff room. Drink electrolytes between patient batches to prevent dehydration headache.',
        icon: '💧',
        category: 'hydration'
      },
      {
        title: 'Micro-Mindfulness & Decompression Breaths',
        description: 'Perform 4-7-8 breathing for 2 minutes after high-stress consultations or emergency cases to reset sympathetic nerve arousal.',
        icon: '🫁',
        category: 'mental'
      }
    ],
    whatNOTToDo: [
      {
        title: 'DO NOT Wear Clinical Scrubs/Shoes Outside Hospital',
        warning: 'Hospital attire carries resistant hospital-acquired microbes (MRSA, C. difficile) that can colonize your home and family.',
        risk: 'Cross-contamination & household infections',
        category: 'danger'
      },
      {
        title: 'DO NOT Skip Scheduled Meals During Long Shifts',
        warning: 'Prolonged fasting under clinical stress triggers hypoglycemia, cognitive tremor, and emotional irritability.',
        risk: 'Clinical error & metabolic exhaustion',
        category: 'metabolic'
      },
      {
        title: 'DO NOT Touch Face or Adjust Masks with Unwashed Gloves',
        warning: 'Adjusting PPE with contaminated hands breaches safety protocol and infects facial mucous membranes.',
        risk: 'Viral & bacterial transmission',
        category: 'danger'
      },
      {
        title: 'DO NOT Suppress Urge to Urinate During Rounds',
        warning: 'Delaying bladder voiding during back-to-back patients increases risk of urinary tract infections (UTIs) and kidney stones.',
        risk: 'UTIs & renal stress',
        category: 'danger'
      }
    ],
    schedule: [
      {
        id: 'med-1',
        timeSlot: '06:00 AM - 07:00 AM',
        period: 'Morning',
        title: 'Pre-Shift Hydration, Core Stability & Clean Gear',
        description: 'Drink electrolyte water, put on fresh socks and supportive footwear, do core planks and gentle calf stretches.',
        category: 'movement',
        steps: ['500ml water + pinch of salt/lemon', '5 min calf & back stretches', 'Clean clinical attire setup'],
        scientificWhy: 'Pre-shift hydration ensures blood volume stays robust throughout hours of hospital standing.',
        imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'med-2',
        timeSlot: '08:00 AM - 01:00 PM',
        period: 'Morning',
        title: 'Clinical Shift: Active Infection Barrier & Hydration Anchor',
        description: 'Conduct rounds, sanitize hands between every patient touch, sip water every 90 minutes.',
        category: 'hygiene',
        steps: ['WHO 6-step hand wash', 'Post-OPD water refill', 'Calf raise resets between beds'],
        scientificWhy: 'Regular sanitization combined with skin moisturizing preserves epidermal barrier integrity.',
        imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'med-3',
        timeSlot: '01:30 PM - 02:15 PM',
        period: 'Afternoon',
        title: 'Nutrient-Dense Lunch in Clean Non-Clinical Zone',
        description: 'Remove gloves/mask safely, wash hands with soap, and eat away from patient areas.',
        category: 'nutrition',
        steps: ['Full hand wash with soap', 'High protein & complex carb lunch', '5 min quiet breathing'],
        scientificWhy: 'A relaxed meal break lowers cortisol and replenishes liver glycogen for afternoon emergencies.',
        imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'med-4',
        timeSlot: '07:30 PM - 08:30 PM',
        period: 'Evening',
        title: 'Shift Decontamination & Hot Shower',
        description: 'Change out of hospital shoes and clothes, take a warm disinfectant shower before interacting with family.',
        category: 'hygiene',
        steps: ['Immediate clothing laundry', 'Full body shower & hair wash', 'Moisturize dry hands and feet'],
        scientificWhy: 'Completely eliminates hospital environmental bacteria and protects household members.',
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80'
      }
    ]
  },

  student: {
    professionId: 'student',
    title: 'Student (School, College & Competitive Exams)',
    subtitle: 'Optimize memory retention, study posture, exam calmness & eye health',
    icon: '🎓',
    description: 'Formulated for high-school, college, and exam aspirants handling heavy syllabus loads, late-night study temptation, and exam stress.',
    whatToDo: [
      {
        title: 'Pomodoro Study Rhythm (50 min study / 10 min break)',
        description: 'Study with total focus for 50 minutes, then stand up, stretch, and drink water for 10 minutes to consolidate neural connections.',
        icon: '⏱️',
        category: 'mental'
      },
      {
        title: 'Natural Morning Light & Daily Physical Sports',
        description: 'Spend at least 30-45 minutes playing sports (badminton, football, jogging) outdoors every evening to boost memory power.',
        icon: '⚽',
        category: 'movement'
      },
      {
        title: 'Brain-Fuel Nutrition (Nuts, Sprouts & Fresh Fruit)',
        description: 'Snack on roasted chana, walnuts, almonds, and seasonal fruit instead of chips or instant noodles during revision.',
        icon: '🍎',
        category: 'nutrition'
      },
      {
        title: 'Strict 7.5h Sleep for Memory Consolidation',
        description: 'Sleep at consistent times. During sleep, your brain converts short-term study memories into permanent long-term recall.',
        icon: '🧠',
        category: 'sleep'
      }
    ],
    whatNOTToDo: [
      {
        title: 'DO NOT Pull All-Nighters Before Exams',
        warning: 'Staying awake overnight reduces working memory recall by 40% and drastically increases test anxiety and panic attacks.',
        risk: 'Severe cognitive drop & memory blackout',
        category: 'mental'
      },
      {
        title: 'DO NOT Study Lying Down in Bed',
        warning: 'Studying in bed strains the neck, triggers sleepiness, and ruins psychological association between bed and restful sleep.',
        risk: 'Poor retention & insomnia',
        category: 'strain'
      },
      {
        title: 'DO NOT Rely on Sugar, Candy & Cola for Late Study',
        warning: 'High sugar causes rapid insulin spikes followed by severe mental crashes, drowsiness, and brain fog within 45 minutes.',
        risk: 'Sugar crash & lack of concentration',
        category: 'metabolic'
      },
      {
        title: 'DO NOT Study with Social Media Notifications On',
        warning: 'Every notification causes cognitive switching penalty, taking up to 15 minutes for the brain to re-enter deep focus.',
        risk: 'Fragmented attention & superficial learning',
        category: 'mental'
      }
    ],
    schedule: [
      {
        id: 'std-1',
        timeSlot: '06:00 AM - 07:00 AM',
        period: 'Morning',
        title: 'Morning Awakening & High-Alert Revision Slot',
        description: 'Drink 2 glasses of water, do light yoga, and review difficult concepts during peak morning cognitive alertness.',
        category: 'study_focus',
        steps: ['Drink 400ml water', '15 min surya namaskar or jogging', '30 min key formula revision'],
        scientificWhy: 'Cortisol peaks naturally in the morning, making analytical memory retention highest.',
        imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'std-2',
        timeSlot: '07:30 AM - 08:15 AM',
        period: 'Morning',
        title: 'Nutritious Breakfast & School/College Prep',
        description: 'Eat a protein-rich breakfast (idli-sambar, eggs, poha, nuts). Pack a clean water bottle.',
        category: 'nutrition',
        steps: ['Fresh breakfast', 'Pack 1L water bottle', 'Proper backpack posture with both straps'],
        scientificWhy: 'Single-strap heavy backpacks cause scoliosis and spinal curvature in growing teens.',
        imageUrl: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'std-3',
        timeSlot: '04:30 PM - 05:45 PM',
        period: 'Evening',
        title: 'Outdoor Sports & Brain Oxygenation',
        description: 'Play football, badminton, run, or cycle with friends. Let eyes adjust to distant open horizon.',
        category: 'movement',
        steps: ['45 min outdoor sport', 'Hydrate with fresh water', 'Face wash with cold water after sweat'],
        scientificWhy: 'Outdoor distance vision is clinically proven to prevent progressive myopia (nearsightedness) in youth.',
        imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'std-4',
        timeSlot: '10:00 PM - 06:00 AM',
        period: 'Night',
        title: 'Deep Memory-Locking Sleep (8 Hours)',
        description: 'Review one summary page, turn off all screens, and sleep in dark room.',
        category: 'sleep',
        steps: ['2 min teeth brushing', 'All devices out of reach', '8h restful sleep'],
        scientificWhy: 'Hippocampus transfers study memories to neocortex exclusively during deep NREM sleep.',
        imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80'
      }
    ]
  },

  teacher: {
    professionId: 'teacher',
    title: 'Teacher, Lecturer & Professor',
    subtitle: 'Protect vocal cords, manage standing fatigue, and relieve chalk/marker irritation',
    icon: '🧑‍🏫',
    description: 'Crafted for educators who talk continuously, stand for long classroom lectures, and review papers under intense schedules.',
    whatToDo: [
      {
        title: 'Vocal Cord Hydration (Warm Water Sips)',
        description: 'Keep a thermos of lukewarm water in classroom. Take small sips every 15-20 minutes to lubricate vocal folds.',
        icon: '🫗',
        category: 'hydration'
      },
      {
        title: 'Diaphragmatic Speech Projection',
        description: 'Speak from your diaphragm (belly) rather than straining throat muscles to prevent chronic vocal cord nodules.',
        icon: '🗣️',
        category: 'mental'
      },
      {
        title: 'Cushioned Footwear & Alternating Weight',
        description: 'Wear supportive shoes with arch support. Shift weight between feet and walk around the classroom rather than standing static.',
        icon: '👟',
        category: 'posture'
      },
      {
        title: 'Chalk Dust & Marker Hand Hygiene',
        description: 'Wash hands thoroughly after writing on board. Use dustless chalk or wipe board with damp duster to prevent respiratory allergies.',
        icon: '🧼',
        category: 'hygiene'
      }
    ],
    whatNOTToDo: [
      {
        title: 'DO NOT Shout or Scream to Regulate Classroom',
        warning: 'Laryngeal strain from shouting causes vocal cord hemorrhages and chronic laryngitis.',
        risk: 'Vocal cord polyps & voice loss',
        category: 'strain'
      },
      {
        title: 'DO NOT Drink Ice Cold Water When Throat is Heated',
        warning: 'Thermal shock to vasodilated vocal cords induces sudden muscle spasm and throat irritation.',
        risk: 'Laryngitis & throat inflammation',
        category: 'danger'
      },
      {
        title: 'DO NOT Stand Stiffly in High Heels or Flat Soles',
        warning: 'Unsupportive shoes during 4+ hours of lecture causes plantar fasciitis and lumbar spine misalignment.',
        risk: 'Plantar fasciitis & lower back agony',
        category: 'strain'
      }
    ],
    schedule: [
      {
        id: 'tch-1',
        timeSlot: '06:30 AM - 07:15 AM',
        period: 'Morning',
        title: 'Vocal Warmups, Gentle Yoga & Hydration',
        description: 'Do gentle humming vocal warmups, neck stretches, and drink warm water with a dash of honey or ginger.',
        category: 'hygiene',
        steps: ['Warm water with honey/lemon', '5 min gentle humming & jaw relaxers', 'Light breakfast'],
        scientificWhy: 'Warms up laryngeal muscles safely before morning lecture load.',
        imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'tch-2',
        timeSlot: '11:00 AM - 11:30 AM',
        period: 'Midday',
        title: 'Staff Room Vocal Rest & Leg Elevation',
        description: 'Sit in a supportive chair, elevate feet on a stool, drink warm tea, and maintain vocal silence for 15 minutes.',
        category: 'posture',
        steps: ['Elevate feet for venous return', 'Sip warm herbal water', '15 min vocal rest'],
        scientificWhy: 'Relieves venous pressure in lower extremities and reduces laryngeal edema.',
        imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'tch-3',
        timeSlot: '06:00 PM - 07:00 PM',
        period: 'Evening',
        title: 'Evening Decompression Walk & Steam Inhalation',
        description: 'Enjoy a peaceful walk to unwind. Do gentle steam inhalation if throat feels scratchy from board dust.',
        category: 'movement',
        steps: ['30 min refreshing walk', 'Gentle warm water gargle / steam', 'Nutritious dinner'],
        scientificWhy: 'Steam clears fine particulate matter from bronchial airways.',
        imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&auto=format&fit=crop&q=80'
      }
    ]
  },

  desk_corporate: {
    professionId: 'desk_corporate',
    title: 'Corporate, Banking & Desk Professional',
    subtitle: 'Prevent metabolic stagnation, postural spine collapse & meeting fatigue',
    icon: '💼',
    description: 'Designed for finance, administrative, banking, legal, and desk personnel working long fixed hours.',
    whatToDo: [
      {
        title: 'Hourly "Walk and Talk" or Stand Up Resets',
        description: 'Stand up during phone calls and meetings. Walk 100 steps every hour to keep insulin sensitivity high.',
        icon: '🚶',
        category: 'posture'
      },
      {
        title: 'Dedicated Staircase Climbs',
        description: 'Skip the elevator for 2-3 floors twice a day to maintain cardiovascular stamina and glute activation.',
        icon: '🪜',
        category: 'movement'
      },
      {
        title: 'Smart Office Snacking (Avoid Bakery & Samosas)',
        description: 'Carry roasted nuts, fruits, or green tea to avoid high-trans-fat office pantry treats.',
        icon: '🥗',
        category: 'nutrition'
      }
    ],
    whatNOTToDo: [
      {
        title: 'DO NOT Cross Legs for Extended Hours',
        warning: 'Crossing legs at the knee elevates blood pressure temporarily and compresses the peroneal nerve.',
        risk: 'Varicose veins & pelvic tilt',
        category: 'strain'
      },
      {
        title: 'DO NOT Drink 5-6 Cups of Sugar-Loaded Chai/Coffee Daily',
        warning: 'Consuming multiple sugary teas adds 300+ empty calories daily and accelerates visceral belly fat.',
        risk: 'Fatty liver & insulin resistance',
        category: 'metabolic'
      }
    ],
    schedule: [
      {
        id: 'corp-1',
        timeSlot: '07:00 AM - 08:00 AM',
        period: 'Morning',
        title: 'Morning Cardio & Core Awakening',
        description: '30 minutes of brisk jogging, cycling, or home functional training.',
        category: 'movement',
        steps: ['Hydrate with 500ml water', '30 min cardio', 'Balanced breakfast'],
        scientificWhy: 'Pre-work exercise primes mitochondrial energy output throughout the workday.',
        imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'corp-2',
        timeSlot: '01:00 PM - 02:00 PM',
        period: 'Afternoon',
        title: 'Portion-Controlled Healthy Lunch',
        description: 'Eat 50% greens/salad, 25% protein (dal/paneer/egg), 25% complex carbs. Stroll for 10 minutes.',
        category: 'nutrition',
        steps: ['Mindful eating away from desk', '10 min walking conversation', 'Water 20 min later'],
        scientificWhy: 'Prevents the infamous 2:30 PM post-lunch drowsiness.',
        imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80'
      }
    ]
  },

  field_worker: {
    professionId: 'field_worker',
    title: 'Field Worker, Construction & Delivery Staff',
    subtitle: 'Prevent heat exhaustion, heavy lifting injuries, dehydration & foot ulcers',
    icon: '🏗️',
    description: 'Engineered for logistics, delivery executives, site engineers, field sales, and factory personnel working in sun, heat, and physical labor.',
    whatToDo: [
      {
        title: 'Electrolyte Hydration (ORS / Buttermilk / Coconut Water)',
        description: 'Drink 3.5L to 4.5L fluid daily with electrolytes to replenish sodium and potassium lost through heavy sweat.',
        icon: '🥥',
        category: 'hydration'
      },
      {
        title: 'Safe Lifting Mechanics (Lift with Legs, NOT Back)',
        description: 'Always bend your knees, keep objects close to chest, and lift with leg quadriceps rather than curving lower spine.',
        icon: '🏋️',
        category: 'posture'
      },
      {
        title: 'Sun & Heat Protection (Hat, UV Full Sleeves & Sunscreen)',
        description: 'Cover head with cap or helmet, wear breathable full-sleeved cotton shirts, and rest in shade during peak 12 PM - 3 PM sun.',
        icon: '🧢',
        category: 'hygiene'
      },
      {
        title: 'Foot Care & Dry Socks Protocol',
        description: 'Wash and dry feet thoroughly every evening. Wear clean cotton socks to prevent fungal athlete’s foot and blister infections.',
        icon: '🦶',
        category: 'hygiene'
      }
    ],
    whatNOTToDo: [
      {
        title: 'DO NOT Work in Direct Scorching Sun Without Water',
        warning: 'Heat stroke occurs rapidly when core temperature exceeds 40°C, causing sudden dizziness, collapse, and organ failure.',
        risk: 'Life-threatening heat stroke & syncope',
        category: 'danger'
      },
      {
        title: 'DO NOT Twist Spine While Lifting Heavy Packages',
        warning: 'Twisting under load generates shear forces that tear spinal discs instantly.',
        risk: 'Acute lumbar disc rupture',
        category: 'danger'
      },
      {
        title: 'DO NOT Drink Contaminated Street Water',
        warning: 'Untested roadside ice and tap water carry typhoid, cholera, and hepatitis A microbes.',
        risk: 'Severe waterborne infections',
        category: 'danger'
      }
    ],
    schedule: [
      {
        id: 'fld-1',
        timeSlot: '06:00 AM - 07:00 AM',
        period: 'Morning',
        title: 'Heavy Hydration, High-Calorie Breakfast & Sun Gear',
        description: 'Drink 500ml water, eat wholesome calorie-rich breakfast (millets/eggs/bananas), apply sunscreen & wear sun gear.',
        category: 'nutrition',
        steps: ['Electrolyte water drink', 'Solid breakfast with carbs & protein', 'Check boots and safety gear'],
        scientificWhy: 'Pre-loading electrolytes protects against midday heat cramps.',
        imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'fld-2',
        timeSlot: '01:00 PM - 02:00 PM',
        period: 'Afternoon',
        title: 'Shaded Lunch Break & Rapid Cooling',
        description: 'Rest in shade, wash hands, drink buttermilk or coconut water, eat nutritious meal, and rest eyes.',
        category: 'hydration',
        steps: ['Sit in shade/cool area', 'Drink 400ml buttermilk/ORS', 'Clean hand wash before food'],
        scientificWhy: 'Rapid shade cooling allows core body temperature to normalize.',
        imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80'
      }
    ]
  },

  night_shift: {
    professionId: 'night_shift',
    title: 'Night Shift & BPO Operations Specialist',
    subtitle: 'Synchronize circadian rhythm, master daytime dark sleep & prevent metabolic shifts',
    icon: '🌙',
    description: 'Tailored for BPO, night IT support, emergency responders, and factory shift workers operating during nocturnal hours.',
    whatToDo: [
      {
        title: 'Pitch-Dark Daytime Sleep Chamber (Blackout Curtains & Eye Mask)',
        description: 'Sleep in 100% dark room with earplugs or white noise. Even minor light leaks through eyelids suppress daytime melatonin.',
        icon: '🕶️',
        category: 'sleep'
      },
      {
        title: 'Wear Sunglasses on Morning Commute Home',
        description: 'Put on dark sunglasses when leaving night shift at 6:00 AM to prevent bright morning sunlight from waking up brain cortisol.',
        icon: '🕶️',
        category: 'sleep'
      },
      {
        title: 'High-Protein Light Snacks During Night Shift',
        description: 'Eat light salads, boiled eggs, nuts, and yogurt at 2:00 AM instead of heavy oily delivery food or instant noodles.',
        icon: '🥗',
        category: 'nutrition'
      },
      {
        title: 'Caffeine Cutoff 4 Hours Before Daytime Sleep',
        description: 'Do not drink tea, coffee, or energy drinks in the second half of your night shift (after 3:30 AM).',
        icon: '☕',
        category: 'sleep'
      }
    ],
    whatNOTToDo: [
      {
        title: 'DO NOT Constantly Flip Sleep Schedules on Weekends',
        warning: 'Changing your sleep by 8 hours every Saturday causes severe chronic social jetlag, brain fog, and cardiac arrhythmia.',
        risk: 'Severe circadian dysregulation & depression',
        category: 'sleep'
      },
      {
        title: 'DO NOT Binge on Heavy Fried Carbs at 3 AM',
        warning: 'Insulin sensitivity is 50% lower at night. Midnight heavy food stays in stomach and converts directly into visceral fat.',
        risk: 'Type 2 Diabetes & GERD acid reflux',
        category: 'metabolic'
      }
    ],
    schedule: [
      {
        id: 'nst-1',
        timeSlot: '07:30 AM - 03:30 PM',
        period: 'Morning',
        title: 'Protected Daytime Restorative Sleep (7-8 Hours)',
        description: 'Blackout curtains drawn, phone on "Do Not Disturb", eye mask on, cool room temperature.',
        category: 'sleep',
        steps: ['Dark sunglasses on commute home', 'Light warm shower', 'Blackout sleep room'],
        scientificWhy: 'Mimics biological nocturnal sleep cycles for organ recovery.',
        imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'nst-2',
        timeSlot: '04:00 PM - 05:00 PM',
        period: 'Evening',
        title: 'Awakening, Sunlight Exposure & Workout',
        description: 'Wake up, step outside for natural late afternoon sun, hydrate with 500ml water, and do 30 min exercise.',
        category: 'movement',
        steps: ['500ml water', '15 min outdoor sunlight for mood', 'Active exercise'],
        scientificWhy: 'Sunlight triggers serotonin and resets mood for the upcoming night cycle.',
        imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80'
      }
    ]
  },

  homemaker: {
    professionId: 'homemaker',
    title: 'Homemaker & Full-Time Caregiver',
    subtitle: 'Relieve repetitive chore strain, prioritize personal nutrition & self-care time',
    icon: '🏡',
    description: 'Designed for homemakers and caregivers managing continuous cooking, cleaning, child/elder care, and household management.',
    whatToDo: [
      {
        title: 'Dedicated "Me-Time" for Self-Care & Movement',
        description: 'Reserve 30 uninterrupted minutes every morning or evening for yoga, walking, or hobby relaxation without household chores.',
        icon: '🧘',
        category: 'mental'
      },
      {
        title: 'Proper Counter Heights & Standing Mats',
        description: 'Avoid bending at the waist while washing dishes or chopping vegetables. Use a supportive foot mat in the kitchen.',
        icon: '🦶',
        category: 'posture'
      },
      {
        title: 'Prioritize Your Own Nutrition First',
        description: 'Eat full balanced meals on time with protein (dal, sprouts, eggs, milk/curd) rather than eating leftovers at odd hours.',
        icon: '🥣',
        category: 'nutrition'
      },
      {
        title: 'Joint Mobility & Knee Preservation',
        description: 'Do knee bends, ankle rotations, and gentle hip openers daily to maintain flexibility and protect against early arthritis.',
        icon: '🦵',
        category: 'posture'
      }
    ],
    whatNOTToDo: [
      {
        title: 'DO NOT Skip Meals and Eat Family Leftovers Late',
        warning: 'Skipping balanced meals leads to chronic iron-deficiency anemia, calcium loss, and osteoporosis in women.',
        risk: 'Anemia, osteopenia & chronic fatigue',
        category: 'metabolic'
      },
      {
        title: 'DO NOT Lift Heavy Gas Cylinders or Buckets with Bent Back',
        warning: 'Lifting heavy domestic loads with rounded spine causes sudden lumbar disc herniation and sciatic nerve pain.',
        risk: 'Severe disc slip & sciatica',
        category: 'danger'
      }
    ],
    schedule: [
      {
        id: 'hm-1',
        timeSlot: '06:00 AM - 07:00 AM',
        period: 'Morning',
        title: 'Morning Serenity, Hydration & Joint Warmup',
        description: 'Drink 2 glasses of warm water, spend 20 minutes in gentle yoga or pranayama before household kitchen tasks begin.',
        category: 'movement',
        steps: ['Warm water + soaked almonds', '20 min quiet yoga & breathing', 'Gentle joint rotations'],
        scientificWhy: 'Prepares spinal ligaments for physical domestic chores without injury.',
        imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'hm-2',
        timeSlot: '01:30 PM - 02:30 PM',
        period: 'Afternoon',
        title: 'Punctual Healthy Lunch & 20-Minute Rest (Vamkukshi)',
        description: 'Eat a complete meal with fresh salad, curd, and dal. Lie down on left side for 20 minutes to relax.',
        category: 'nutrition',
        steps: ['Fresh hot nutritious plate', '20 min peaceful rest', 'Adequate water hydration'],
        scientificWhy: 'Resting on left side promotes gastric digestion and reduces daytime exhaustion.',
        imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80'
      }
    ]
  },

  other: {
    professionId: 'other',
    title: 'General Health & Universal Wellness Routine',
    subtitle: 'Balanced daily rhythm for all work lifestyles and routines',
    icon: '⚡',
    description: 'A universal evidence-based timetable ensuring balanced hydration, clean hygiene, mindful nutrition, active movement, and deep 8-hour sleep.',
    whatToDo: [
      {
        title: 'Daily 2.5L Hydration',
        description: 'Drink clean drinking water regularly throughout the day.',
        icon: '💧',
        category: 'hydration'
      },
      {
        title: 'Twice-Daily Oral Hygiene',
        description: 'Brush teeth morning and night to protect against cardiovascular-linked oral bacteria.',
        icon: '🪥',
        category: 'hygiene'
      },
      {
        title: '30 Minutes Daily Movement',
        description: 'Walk, cycle, dance, or exercise daily to keep heart and metabolic markers strong.',
        icon: '🏃',
        category: 'movement'
      }
    ],
    whatNOTToDo: [
      {
        title: 'DO NOT Skip Sleep Below 7 Hours',
        warning: 'Sleep deprivation weakens immune defense against seasonal viral infections.',
        risk: 'Low immunity & metabolic strain',
        category: 'sleep'
      },
      {
        title: 'DO NOT Eat Late Night Heavy Dinners',
        warning: 'Eating heavy meals right before sleeping causes acid reflux and poor sleep quality.',
        risk: 'GERD & insomnia',
        category: 'metabolic'
      }
    ],
    schedule: [
      {
        id: 'gen-1',
        timeSlot: '06:30 AM - 07:30 AM',
        period: 'Morning',
        title: 'Morning Awakening, Hydration & Fresh Bath',
        description: 'Drink water, complete morning hygiene and bath, take a breath of fresh air.',
        category: 'hygiene',
        steps: ['Drink 500ml water', '2 min tooth brushing', 'Fresh bath & clean clothes'],
        scientificWhy: 'Stimulates lymphatic drainage and morning alertness.',
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80'
      }
    ]
  }
};

export const HEALTHY_DAILY_TIMETABLE: TimeTableItem[] = PROFESSION_ROUTINES.software_engineer.schedule;
