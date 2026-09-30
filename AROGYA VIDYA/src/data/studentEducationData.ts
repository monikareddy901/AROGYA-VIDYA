export interface StudentTopic {
  id: string;
  title: string;
  subtitle: string;
  iconType: string;
  readTime: string;
  coverImage: string;
  whyIndianFamiliesDontTalk: string;
  plainLanguageExplanation: string;
  bulletPoints: string[];
  commonMythsDebunked: Array<{ myth: string; fact: string }>;
  practicalSteps: string[];
  helplineOrResource?: {
    name: string;
    contact: string;
    description: string;
  };
}

export const STUDENT_EDUCATION_TOPICS: StudentTopic[] = [
  {
    id: 'topic-puberty-changes',
    title: 'Why Is My Body Changing? (Puberty Explained Simply)',
    subtitle: 'From voice cracks and body hair to growth spurts and sweat: everything you need to know.',
    iconType: 'Sparkles',
    readTime: '4 min read',
    coverImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80',
    whyIndianFamiliesDontTalk: 'In many traditional households, growing up and reproductive biology are treated with secrecy or silence, leaving teenagers confused, scared, or relying on false internet rumors.',
    plainLanguageExplanation: 'Between ages 10 and 18, your brain produces special chemical messengers called hormones (like Estrogen, Progesterone, and Testosterone). These hormones tell your body it is time to transition from childhood to adulthood. Every single human on earth goes through these changes!',
    bulletPoints: [
      'Growth Spurts: Rapid increase in height, bone density, and foot size.',
      'Body Hair: New hair appears in underarms, groin (pubic area), legs, and for boys, on the face and chest.',
      'Voice Changes: In boys, the vocal cords thicken causing temporary squeaks or voice cracks before settling into a deeper voice.',
      'Skin & Oil: Sebaceous oil glands become more active, which is why pimples/acne are very common.',
      'Body Shape: Girls develop breasts and wider hips; boys develop broader shoulders and muscular strength.'
    ],
    commonMythsDebunked: [
      {
        myth: 'If my voice cracks or I get pimples, something is wrong with my blood.',
        fact: 'Pimples and voice changes are 100% normal responses to natural surge in hormones, not "dirty blood".'
      },
      {
        myth: 'My friends are taller than me, so I will always stay short.',
        fact: 'Everyone has a unique biological timeline. Some people grow early (ages 11-13), while others experience major growth spurts later (ages 15-18).'
      }
    ],
    practicalSteps: [
      'Wash your face with gentle water twice a day — do not squeeze pimples.',
      'Wear clean cotton clothes and bathe daily to stay fresh.',
      'Eat wholesome home-cooked meals with pulses (dal), eggs, milk, nuts, and greens for bone growth.',
      'Remember: You are completely normal. Never compare your body speed with classmates.'
    ],
    helplineOrResource: {
      name: 'Rashtriya Kishor Swasthya Karyakram (RKSK Govt Adolescent Health)',
      contact: 'Toll-Free 1075 or Visit Local Primary Health Centre (PHC)',
      description: 'Free confidential adolescent counseling across India.'
    }
  },
  {
    id: 'topic-menstruation-facts',
    title: 'Everything About Periods (For Girls & Boys)',
    subtitle: 'Why bleeding happens, why it is clean and healthy, and how to stop feeling ashamed.',
    iconType: 'Heart',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=80',
    whyIndianFamiliesDontTalk: 'Ancient cultural taboos treated menstruation as impure ("Ashuddh"), leading to girls being kept in separate rooms or banned from kitchens and places of worship.',
    plainLanguageExplanation: 'A period is a monthly biological process where the lining of the uterus sheds through the vagina. It happens roughly every 28-35 days and lasts for 3 to 7 days. Without menstruation, human reproduction and the existence of the human race would not be possible! Boys should understand this too so they can support their sisters, classmates, and mothers with respect.',
    bulletPoints: [
      'Menarche (First Period): Usually occurs between ages 10 and 15.',
      'Blood Amount: An entire period is only about 2 to 4 tablespoons (30-60 ml) of blood, even though it looks like a lot on a pad.',
      'Cramps (Dysmenorrhea): Caused by natural muscle contractions of the uterus. A warm water bag or gentle yoga helps relax the muscles.',
      'Hygiene Choice: You can use sanitary pads, cloth pads (if washed and sun-dried thoroughly), menstrual cups, or tampons.'
    ],
    commonMythsDebunked: [
      {
        myth: 'Touching pickles during your period will cause them to rot.',
        fact: 'Pickles spoil only if dirty or wet spoons introduce mold. Menstruating hands have zero bacterial effect on food.'
      },
      {
        myth: 'You cannot bathe or wash hair during your period.',
        fact: 'Bathing with warm water cleanses the body, prevents infection, and soothes painful uterine cramps.'
      }
    ],
    practicalSteps: [
      'Change your pad every 4-6 hours to prevent moisture and odor.',
      'Keep an emergency pad and small plastic disposal bag in your school bag.',
      'Drink plenty of warm water and rest with a hot water bottle if cramps occur.',
      'Never hesitate to ask a teacher or school nurse if your period starts unexpectedly in school.'
    ]
  },
  {
    id: 'topic-wet-dreams-boys',
    title: 'Wet Dreams & Nightfall: 100% Normal & Harmless',
    subtitle: 'The truth about nocturnal emissions and why you should never feel guilty.',
    iconType: 'Shield',
    readTime: '3 min read',
    coverImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80',
    whyIndianFamiliesDontTalk: 'Street quacks and advertisements often spread fear ("Dhat syndrome") claiming semen loss weakens the brain or body, aiming to sell fake tonics to frightened young men.',
    plainLanguageExplanation: 'During puberty, boys testicles start producing sperm and seminal fluid continuously. When sleeping, especially during vivid dreams, the body naturally releases excess semen. This is called a nocturnal emission or wet dream. It is as natural as sweating or blinking!',
    bulletPoints: [
      'Automatic Overflow: It is the body natural biological pressure release mechanism.',
      'Zero Physical Harm: It does not reduce muscle strength, height, intelligence, or future fertility.',
      'Happens to Almost Everyone: Most boys experience this regularly during teenage years and early twenties.'
    ],
    commonMythsDebunked: [
      {
        myth: 'Loss of semen leads to memory loss, weak eyes, or kidney damage.',
        fact: 'Semen consists of water, proteins, and minerals that the body constantly regenerates. The myth is 100% scientifically false.'
      },
      {
        myth: 'You must buy expensive powders or visit roadside clinics to stop nightfall.',
        fact: 'Never take uncertified roadside herbs or injections. Nightfall is healthy and requires no treatment.'
      }
    ],
    practicalSteps: [
      'Simply wash the genital area with plain water in the morning bath.',
      'Put the soiled clothes or bedsheets in the laundry wash.',
      'Do not feel guilt, shame, or anxiety.'
    ]
  },
  {
    id: 'topic-safe-touch-consent',
    title: 'Your Body, Your Boundaries (Safe Touch & Consent)',
    subtitle: 'Understanding personal space, good touch vs bad touch, and how to speak up.',
    iconType: 'Lock',
    readTime: '4 min read',
    coverImage: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80',
    whyIndianFamiliesDontTalk: 'Respect for elders is often misunderstood as never questioning uncomfortable behavior by relatives, neighbors, or authority figures.',
    plainLanguageExplanation: 'Your body belongs exclusively to YOU. No one — regardless of whether they are a relative, neighbor, teacher, or stranger — has the right to touch your private body parts (parts covered by a swimsuit: chest, between legs, buttocks, and lips) or make you feel uncomfortable or unsafe.',
    bulletPoints: [
      'Good Touch: A warm hug from parents, a friendly high-five, or a doctor examining you with a parent present in the room.',
      'Bad / Uncomfortable Touch: Any touch that makes you feel uneasy, scared, confused, or asks you to keep a "secret".',
      'The 3-Step Safety Rule: 1) SAY A CLEAR NO, 2) RUN AWAY TO A SAFE PLACE, 3) TELL A TRUSTED ADULT IMMEDIATELY.'
    ],
    commonMythsDebunked: [
      {
        myth: 'If someone in the family or a teacher touches me uncomfortably, it is my fault.',
        fact: 'It is NEVER your fault. The person violating your boundary is 100% responsible.'
      }
    ],
    practicalSteps: [
      'Trust your instincts: If an interaction feels wrong or weird, step away.',
      'Identify 2 "Safety Adults" in your life (e.g. mother, elder sister, favorite school teacher, counselor).',
      'If you need immediate confidential help anywhere in India, call Childline at 1098 (Free 24/7).'
    ],
    helplineOrResource: {
      name: 'National Childline Helpline',
      contact: '1098 (Toll-Free, 24/7)',
      description: 'Emergency assistance, counseling & protection for children and teenagers.'
    }
  },
  {
    id: 'topic-exam-stress-mental',
    title: 'Exam Stress, Mood Swings & Mental Health',
    subtitle: 'How to handle parent expectations, peer comparison, and anxiety without breaking down.',
    iconType: 'Brain',
    readTime: '4 min read',
    coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80',
    whyIndianFamiliesDontTalk: 'Academic performance is heavily tied to family honor, and mental health struggles are often dismissed as "just drama", "laziness", or "lack of willpower".',
    plainLanguageExplanation: 'It is completely normal to feel nervous before exams or experience emotional ups and downs during teenage years. Hormonal changes in the brain affect moods. However, chronic overwhelming anxiety, inability to sleep, or feeling hopeless is your mind asking for rest and support.',
    bulletPoints: [
      'Marks Do Not Define Your Life Worth: Exams test memory for a few hours, not your lifelong potential, creativity, or human kindness.',
      'The 50/10 Pomodoro Method: Study with 100% focus for 50 minutes, then take a mandatory 10-minute water and stretch break.',
      'Sleep is Non-Negotiable: All-nighters destroy memory consolidation. 7 hours of sleep improves exam recall by 40%.'
    ],
    commonMythsDebunked: [
      {
        myth: 'Taking mental health counseling or calling a helpline means you are "crazy".',
        fact: 'Counseling is just like physiotherapy for the mind. Strong, smart people seek guidance when carrying heavy loads.'
      }
    ],
    practicalSteps: [
      'Talk honestly to a friend or sibling when you feel overwhelmed.',
      'Go outside for 20 minutes of daylight and brisk walking every day.',
      'If feeling hopeless or having thoughts of self-harm, immediately reach out to Tele-MANAS at 14416 (24/7 Free Govt Counseling in 20 languages).'
    ],
    helplineOrResource: {
      name: 'Tele-MANAS (Ministry of Health Govt of India)',
      contact: '14416 or 1800-891-4416',
      description: '24/7 Free, completely confidential mental health counseling in your mother tongue.'
    }
  }
];
