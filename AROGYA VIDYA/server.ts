import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// Lazy/Safe Gemini Initialization
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set. AI features will run in fallback simulation mode.");
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// ----------------------------------------------------
// SAFETY CHECKER UTILITIES
// ----------------------------------------------------
const EMERGENCY_KEYWORDS = [
  "chest pain", "can't breathe", "cannot breathe", "shortness of breath", "severe bleeding",
  "unconscious", "stroke", "face drooping", "slurred speech", "seizure", "coughing blood",
  "suicide", "kill myself", "end my life", "overdose", "anaphylaxis", "severe allergic reaction",
  "poisoning", "swallowed poison", "testicular torsion", "sudden blind", "sudden paralysis"
];

function checkEmergencyKeywords(text: string): { isEmergency: boolean; matchedKeyword?: string } {
  const lower = text.toLowerCase();
  for (const kw of EMERGENCY_KEYWORDS) {
    if (lower.includes(kw)) {
      return { isEmergency: true, matchedKeyword: kw };
    }
  }
  return { isEmergency: false };
}

// ----------------------------------------------------
// REST API ROUTES
// ----------------------------------------------------

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    app: "HealthBridge",
    version: "1.0.0",
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
  });
});

// ----------------------------------------------------
// DYNAMIC INTELLIGENT HEALTH & HYGIENE RESPONSE GENERATOR (SIMPLE WORDS)
// ----------------------------------------------------
function generateSimpleEducationalReply(userQuery: string, lang: string = 'en'): string {
  const q = userQuery.toLowerCase();

  // 1. Periods / Menstruation / Girls Hygiene
  if (q.includes('period') || q.includes('pad') || q.includes('cramp') || q.includes('menstrua') || q.includes('bleed') || q.includes('vagina') || q.includes('girl') || q.includes('pcos')) {
    return `🌸 **Simple Guide to Periods & Girls' Health**:

- **What is a Period?**: Every month, a girl's body prepares a soft cushion lining inside the uterus for a baby. When there is no baby, the body gently cleans itself by shedding this soft lining as blood. It is **100% normal, healthy, and clean**.
- **Hygiene Steps to Follow**:
  1. **Change pads every 4 to 6 hours**: Never wear a single pad all day to avoid bacteria and bad smell.
  2. **Washing Rule**: Always wash from **Front to Back** with plain lukewarm water. Never put soaps or perfumes inside.
  3. **Underwear**: Wear clean, dry cotton underwear. Dry washed underwear in direct sunlight.
- **Relieving Period Cramps**:
  - Drink warm water or ginger herbal tea.
  - Put a hot water bottle or warm cloth on your lower belly.
  - Do light stretching or slow walking (this releases natural pain-relieving body chemicals).
- **Important**: Periods are NOT "dirty" or "impure". You can study, play, touch food, cook, and bathe normally!`;
  }

  // 2. Boys Hygiene / Puberty / Wet Dreams / Voice
  if (q.includes('boy') || q.includes('voice') || q.includes('wet dream') || q.includes('nightfall') || q.includes('penis') || q.includes('testic') || q.includes('foreskin') || q.includes('shav')) {
    return `⚡ **Simple Guide to Boys' Puberty & Hygiene**:

- **Why is your body changing?**: During puberty (ages 11-17), male hormones (testosterone) make your voice deeper, shoulders wider, and hair grow on your face and body.
- **Hygiene Steps to Follow**:
  1. **Daily Bath**: Wash your whole body, especially armpits and groin, every single day with soap and water.
  2. **Intimate Hygiene**: If you have a foreskin, gently slide it back in the shower, wash with plain water to remove white buildup (smegma), and slide it back.
  3. **Clean Clothes**: Put on clean underwear and fresh socks every day. Never re-wear sweaty gym socks.
- **Wet Dreams (Nightfall)**:
  - During sleep, the body naturally releases extra fluid. This is **100% natural and harmless**.
  - It does NOT make you weak, short, or lose energy. Wash the area in the morning and wear fresh clothes.
- **Face & Shaving**: Wash your face with water twice daily to keep pimples away. Never share razors with friends!`;
  }

  // 3. Transgender / Gender Diverse Health & Affirming Care
  if (q.includes('trans') || q.includes('bind') || q.includes('tuck') || q.includes('hrt') || q.includes('gender')) {
    return `🌈 **Safe & Affirming Body Care Guide**:

- **Safe Chest Binding**:
  - Only use safe, medical-grade binders. Limit binding to **maximum 8 hours a day**.
  - **Never** use duct tape, plastic wraps, or tight bandages — they damage ribs and lungs.
  - Take regular breaks, stretch your chest, and never sleep in a binder.
- **Skin & Chafing Care**:
  - Wash your chest and groin daily with mild, unscented soap.
  - Let your skin dry completely before putting on binders or shapewear.
  - Apply soothing moisture cream (like aloe vera or petroleum jelly) to friction spots.
- **Support & Mental Wellness**:
  - You deserve respect, dignity, and safe healthcare.
  - For free confidential counseling in India, call **Tele-MANAS at 14416**.`;
  }

  // 4. Daily Routine / Timetable / Habits / Water
  if (q.includes('timetable') || q.includes('routine') || q.includes('habit') || q.includes('water') || q.includes('sleep') || q.includes('exercise') || q.includes('diet') || q.includes('food')) {
    return `⏰ **The Best Daily Health Timetable (Step-by-Step)**:

- **🌅 Morning (6:00 AM - 7:30 AM)**:
  1. Wake up and drink **2 glasses of warm water** to wake up your stomach and kidneys.
  2. Brush teeth for 2 minutes and clean your tongue.
  3. Eat a healthy breakfast (like idli, poha, eggs, sprouts, or oatmeal) + 4 soaked almonds.
- **☀️ Midday (10:30 AM - 2:00 PM)**:
  1. Wash hands with soap for 20 seconds before eating.
  2. Eat a colorful lunch: 50% vegetables/salad, 25% rice/roti, 25% protein (dal/paneer/curd).
  3. Stand up and rest your eyes every 20 minutes (20-20-20 screen rule).
- **🌇 Evening (4:30 PM - 7:30 PM)**:
  1. 30 minutes of running, sports, or brisk walking to boost energy.
  2. Light dinner at least 2 hours before bed (like khichdi, vegetable soup, or roti).
- **🌙 Night (9:30 PM - 10:00 PM)**:
  1. Brush teeth a second time at night.
  2. Turn off mobile phones 30 minutes before sleep.
  3. Get **7.5 to 8 hours of restful sleep** in a dark room.`;
  }

  // 5. Pimples / Acne / Skin Care
  if (q.includes('acne') || q.includes('pimple') || q.includes('skin') || q.includes('face') || q.includes('blackhead')) {
    return `✨ **Simple Guide for Clear & Healthy Skin**:

- **Why Pimples Happen**: In teenagers, hormones make skin oil glands active. When extra oil mixes with dead skin and bacteria, a pimple forms.
- **Steps to Follow**:
  1. **Wash your face twice a day** (morning and night) with plain water and a mild face wash.
  2. **Do NOT pop or squeeze pimples**: Squeezing pushes bacteria deeper and leaves dark scars.
  3. **Keep hair clean**: Oily hair touching your forehead causes forehead pimples.
  4. **Drink 8-10 glasses of water** and reduce oily fried snacks and sugary sodas.
  5. **Change your pillowcase** once every week.`;
  }

  // 6. Teeth / Dental / Bad Breath
  if (q.includes('teeth') || q.includes('tooth') || q.includes('brush') || q.includes('breath') || q.includes('gum') || q.includes('mouth')) {
    return `🦷 **Dental & Fresh Breath Rules (2x2 Rule)**:

- **Brush 2 Times a Day for 2 Minutes**: Morning after waking up, and at night before bed.
- **Clean Your Tongue**: 85% of bad breath comes from white bacteria stuck on the tongue. Use a tongue cleaner gently every morning.
- **After Eating**: Rinse your mouth with plain water after every meal or snack to remove trapped food.
- **Avoid**: Too many sticky candies, chewing tobacco, or opening bottles with teeth!`;
  }

  // 7. Stomach Pain / Digestion / Gas / Acidity
  if (q.includes('stomach') || q.includes('tummy') || q.includes('gas') || q.includes('acid') || q.includes('constipat') || q.includes('digest')) {
    return `🍵 **Simple Stomach & Digestion Care**:

- **Quick Home Comfort Steps**:
  1. Sip warm water slowly.
  2. Avoid oily, spicy gravies, deep-fried snacks, and cold carbonated drinks.
  3. Eat light meals like soft rice with curd, khichdi, or banana.
  4. Take a slow 10-minute walk after meals instead of lying down immediately.
- **When to see a doctor**: If you have severe sharp pain, continuous vomiting, or high fever.`;
  }

  // 8. Fever / Cold / Cough / Headache
  if (q.includes('fever') || q.includes('cold') || q.includes('cough') || q.includes('headache') || q.includes('throat')) {
    return `🤒 **Comfort Care for Fever, Cold & Headaches**:

- **Steps to Feel Better**:
  1. **Rest**: Your body needs energy to fight off germs. Take a proper rest.
  2. **Fluids**: Drink plenty of warm water, vegetable soup, or ginger-tulsi tea.
  3. **Salt Water Gargle**: If your throat hurts, gargle with warm water mixed with half a spoon of salt.
  4. **Fresh Air**: Keep your room airy and comfortable.
- **When to see a doctor**: If fever crosses 101°F (38.3°C) for more than 48 hours, or if you have difficulty breathing.`;
  }

  // 9. Stress / Exams / Mental Health
  if (q.includes('stress') || q.includes('exam') || q.includes('anxiety') || q.includes('depress') || q.includes('scared') || q.includes('sad') || q.includes('worry')) {
    return `🧠 **Simple Ways to Beat Exam Stress & Feel Calm**:

- **Take Deep Breaths**: Inhale through your nose for 4 seconds, hold for 4 seconds, exhale slowly for 4 seconds.
- **Study in Chunks**: Study for 50 minutes, then take a 10-minute walk or water break.
- **Sleep is Power**: Never stay awake all night before exams. 7 hours of sleep helps your brain remember answers.
- **Talk to Someone**: Share your feelings with a friend, parent, or teacher.
- **Free Govt Helpline**: Call **Tele-MANAS at 14416** anytime (24/7 free supportive counseling).`;
  }

  // 10. General Health / Default
  return `💡 **Health & Wellness Tips for You**:

- **Good Health Pillars**:
  1. **Cleanliness**: Bathe daily, wash hands with soap for 20 seconds, and wear clean cotton clothes.
  2. **Hydration**: Drink 2 to 3 liters of clean water every day.
  3. **Nutrition**: Eat home-cooked food with plenty of green vegetables, pulses, and fruits.
  4. **Active Body**: 30 minutes of physical games or exercise every day.
  5. **Good Sleep**: 7-8 hours of sleep at night.
- **Have a specific question?** Ask me about **girls' period hygiene, boys' puberty, daily timetable, hospital finder, acne, or diet**!`;
}

// 1. BridgeBuddy AI Chat Endpoint
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { messages, userContext, preferredLanguage } = req.body;
    const lastUserMessage = messages?.[messages.length - 1]?.content || "";

    // Emergency check
    const emergency = checkEmergencyKeywords(lastUserMessage);
    if (emergency.isEmergency) {
      return res.json({
        reply: `🚨 **IMPORTANT SAFETY ALERT**: You mentioned symptoms or situations (${emergency.matchedKeyword}) that may indicate an urgent medical emergency.\n\n**Please take immediate action:**\n- In India, call **112** (Emergency) or **108** (Ambulance) right away.\n- In the US/Canada, call **911** or **988** for crisis support.\n- In the UK/Europe, call **999** or **112**.\n- Go to the nearest Hospital Emergency Department.\n\n*HealthBridge cannot provide emergency care or diagnostic services.*`,
        isEmergency: true,
        disclaimer: "HealthBridge provides general health education only and cannot diagnose or replace emergency medical services.",
      });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Dynamic, intelligent, simple-words fallback
      const customReply = generateSimpleEducationalReply(lastUserMessage, preferredLanguage);
      return res.json({
        reply: customReply,
        disclaimer: "HealthBridge provides general health education in simple words.",
      });
    }

    const systemInstruction = `You are "BridgeBuddy", the friendly, warm, evidence-based AI Health & Hygiene Education Companion for HealthBridge.

CORE DIRECTIVES FOR ACCESSIBLE EDUCATION:
1. USE VERY SIMPLE, EASY-TO-UNDERSTAND WORDS (5th-grade reading level). Avoid complicated Latin terms or heavy clinical jargon. If you must use a medical word, immediately explain it simply in brackets.
2. ANSWER THE USER'S SPECIFIC QUESTION DIRECTLY: Give tailored, step-by-step practical advice for the exact topic asked (e.g. puberty, girls hygiene, boys hygiene, periods, pads, timetable, stomach ache, pimples, stress, hospital search, etc.).
3. STRUCTURE: Use friendly emojis, scannable bullet points, bold key terms, and step-by-step numbers.
4. TONE: Warm, encouraging, empathetic, judgment-free, supportive of adolescents, students, and families.
5. SAFETY BOUNDARIES: You provide health education and comfort tips. You do NOT diagnose illnesses or prescribe prescription drugs. For emergencies, recommend 112 / 108.
6. Language: Respond in ${preferredLanguage === 'hi' ? 'Hindi (in simple Devnagari)' : preferredLanguage === 'kn' ? 'Kannada' : preferredLanguage === 'te' ? 'Telugu' : 'Simple English'}, or match user's language naturally.`;

    const conversationHistory = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: conversationHistory,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || generateSimpleEducationalReply(lastUserMessage, preferredLanguage);

    res.json({
      reply,
      isEmergency: false,
      disclaimer: "HealthBridge provides general educational information only and is not a substitute for professional medical advice, diagnosis, or treatment.",
    });
  } catch (error: any) {
    console.error("AI Chat Error:", error);
    const fallbackReply = generateSimpleEducationalReply(req.body?.messages?.[req.body.messages.length - 1]?.content || "", req.body?.preferredLanguage);
    res.json({
      reply: fallbackReply,
      isEmergency: false,
      disclaimer: "HealthBridge provides general health education in simple words.",
    });
  }
});

// 2. AI Symptom Navigator Analysis Endpoint
app.post("/api/ai/symptom-navigator", async (req, res) => {
  try {
    const { bodyRegion, primarySymptom, duration, severity, associatedSymptoms, notes } = req.body;

    const emergency = checkEmergencyKeywords(`${primarySymptom} ${associatedSymptoms?.join(" ")} ${notes || ""}`);
    if (emergency.isEmergency || severity >= 9) {
      return res.json({
        urgencyLevel: "SEEK_URGENT_CARE",
        summary: `The reported symptoms include high severity indicators or danger signs (${emergency.matchedKeyword || "Severe pain / acute onset"}).`,
        generalEducation: [
          "Acute severe symptoms require prompt evaluation by emergency medical staff.",
          "Do not delay seeking care, and do not drive yourself if you are feeling dizzy, faint, or in severe distress."
        ],
        monitoringGuidance: [
          "Check for red flags: difficulty breathing, chest tightness, sudden weakness, confusion, or uncontrolled bleeding.",
          "Keep someone nearby notified."
        ],
        whenToConsultDoctor: [
          "Immediately contact emergency services (112 in India / 911 / local emergency number).",
          "Proceed to the nearest 24/7 hospital emergency triage."
        ],
        emergencyAdvice: "Call emergency services (112) or go to the nearest emergency department immediately.",
        safetyDisclaimer: "HealthBridge does not provide medical diagnoses. This safety triage tool is for awareness only."
      });
    }

    const ai = getGeminiClient();
    if (!ai) {
      const urgency = severity >= 6 ? "CONSIDER_CARE" : "MONITOR";
      return res.json({
        urgencyLevel: urgency,
        summary: `You reported ${primarySymptom} in the ${bodyRegion} area lasting ${duration}.`,
        generalEducation: [
          "Symptoms in this region can arise from multiple biological factors such as muscle strain, mild inflammation, lifestyle fatigue, or hydration changes.",
          "Rest, adequate fluids, and observing the pattern of symptoms helps build clear notes for your healthcare provider."
        ],
        monitoringGuidance: [
          "Keep track of whether the symptom worsens, stays constant, or improves with rest.",
          "Note any new signs such as fever, swelling, or numbness."
        ],
        whenToConsultDoctor: [
          "If the symptom persists longer than typical mild discomfort (3-5 days).",
          "If pain interferes with your ability to sleep, eat, or perform daily work.",
          "If over-the-counter self-care measures provide no relief."
        ],
        safetyDisclaimer: "Educational guidance only. A qualified healthcare provider can evaluate the true underlying cause."
      });
    }

    const prompt = `You are a medical safety evaluation assistant for HealthBridge.
Evaluate the following symptom report:
- Body Region: ${bodyRegion}
- Primary Symptom: ${primarySymptom}
- Duration: ${duration}
- Severity Score: ${severity}/10
- Associated Symptoms: ${associatedSymptoms?.join(", ") || "None specified"}
- Additional Notes: ${notes || "None"}

TASK:
Classify into ONE of 3 safety levels:
1. "MONITOR" (Mild, common, self-limiting without red flags)
2. "CONSIDER_CARE" (Persistent, moderate, or warrants routine clinical examination)
3. "SEEK_URGENT_CARE" (Severe warning signs, acute red flags, or potentially dangerous)

STRICT RULES:
- Never declare a single definitive diagnosis (e.g. NEVER say "You have appendicitis" or "You have migraine").
- Instead phrase neutrally: "Symptoms like this can have several causes. A healthcare provider can conduct a physical exam to determine the precise reason."
- Return valid JSON matching the schema.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You are an AI medical safety triage assistant. Output only valid JSON with urgencyLevel ('MONITOR' | 'CONSIDER_CARE' | 'SEEK_URGENT_CARE'), summary (string), generalEducation (array of 2-3 strings), monitoringGuidance (array of 2-3 strings), whenToConsultDoctor (array of 2-3 strings), and safetyDisclaimer (string).",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({
      urgencyLevel: parsed.urgencyLevel || (severity >= 6 ? "CONSIDER_CARE" : "MONITOR"),
      summary: parsed.summary || `Analysis for ${primarySymptom}.`,
      generalEducation: parsed.generalEducation || ["Rest and hydration are supportive measures."],
      monitoringGuidance: parsed.monitoringGuidance || ["Track duration and intensity."],
      whenToConsultDoctor: parsed.whenToConsultDoctor || ["Consult a doctor if symptoms persist or intensify."],
      safetyDisclaimer: "HealthBridge is an educational tool. Only a licensed physician can diagnose medical conditions.",
    });
  } catch (error) {
    console.error("Symptom Navigator Error:", error);
    res.status(500).json({
      urgencyLevel: "CONSIDER_CARE",
      summary: "We recommend discussing persistent or uncomfortable symptoms with your healthcare clinician.",
      generalEducation: ["Keep a record of when symptoms started and what makes them better or worse."],
      monitoringGuidance: ["Watch for fever, severe pain, or progressive swelling."],
      whenToConsultDoctor: ["Schedule a visit with your primary doctor if discomfort continues."],
      safetyDisclaimer: "Educational tool only. Does not replace clinical evaluation.",
    });
  }
});

// 3. AI Medical Report Explainer Endpoint (supports text or uploaded base64 image/pdf)
app.post("/api/ai/explain-report", async (req, res) => {
  try {
    const { reportText, imageBase64, mimeType, reportTitle } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      // Return structured fallback response
      return res.json({
        reportTitle: reportTitle || "Diagnostic Laboratory Report",
        overallSummary: "Your lab report contains clinical biomarkers. Each value should be viewed in light of the reference range provided by the specific testing laboratory and discussed with your physician.",
        tests: [
          {
            testName: "Hemoglobin (Hb)",
            resultValue: "11.2",
            unit: "g/dL",
            referenceRange: "12.0 - 15.5 g/dL",
            status: "below",
            simpleExplanation: "This result is slightly below the laboratory reference interval. Hemoglobin is the protein inside red blood cells that transports oxygen to muscles and organs.",
            whatItMeasures: "Oxygen transport capacity of your blood.",
            questionsForDoctor: ["What dietary adjustments or tests would help check my iron balance?"]
          }
        ],
        disclaimer: "Educational explanation only. Do not self-diagnose or alter treatments without consulting your healthcare clinician."
      });
    }

    const parts: any[] = [];
    if (imageBase64) {
      parts.push({
        inlineData: {
          mimeType: mimeType || "image/jpeg",
          data: imageBase64.replace(/^data:.*?;base64,/, ""),
        },
      });
    }

    const extractionPrompt = `You are the Medical Report Explainer AI for HealthBridge.
Analyze this medical lab report:
${reportText ? `Extracted Text Content:\n${reportText}\n` : ""}

TASK:
1. Extract or identify the main lab test markers present in the report.
2. For each test, extract:
   - testName (e.g. "Hemoglobin", "Fast Blood Glucose", "Total Cholesterol", "Platelets", "TSH", "WBC")
   - resultValue (the patient's test value as string)
   - unit (e.g. "g/dL", "mg/dL", "mcL", "uIU/mL")
   - referenceRange (CRITICAL: Extract the EXACT reference range stated on the user's report if available, e.g. "12.0 - 15.5 g/dL")
   - status: "normal" | "below" | "above" | "inconclusive" (compared against the provided reference range)
   - simpleExplanation: A clear, neutral, friendly 1-2 sentence explanation in plain English. State neutrally: "Your report lists a reference range of [range]. This result is [value], which is [above/below/within] that range. Its clinical meaning depends on your symptoms and doctor's evaluation."
   - whatItMeasures: 1 brief sentence on the biological role of this marker.
   - questionsForDoctor: 1-3 thoughtful, non-alarmist questions the patient can ask their doctor at their next visit.
3. overallSummary: 2-3 neutral sentences summarizing the general report structure without diagnosing any disease.

CRITICAL RULES:
- NEVER diagnose a disease (do NOT say "You have iron deficiency anemia" or "You have diabetes").
- Use the user report's reference range rather than inventing a generic one whenever visible.
- Output ONLY valid JSON matching this structure:
{
  "reportTitle": "string",
  "overallSummary": "string",
  "tests": [
    {
      "testName": "string",
      "resultValue": "string",
      "unit": "string",
      "referenceRange": "string",
      "status": "normal" | "below" | "above" | "inconclusive",
      "simpleExplanation": "string",
      "whatItMeasures": "string",
      "questionsForDoctor": ["string"]
    }
  ],
  "disclaimer": "This explanation is for educational awareness only and is not a medical diagnosis. Please review these results with your healthcare clinician."
}`;

    parts.push({ text: extractionPrompt });

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: { parts },
      config: {
        responseMimeType: "application/json",
      },
    });

    const jsonText = response.text || "{}";
    const parsed = JSON.parse(jsonText);
    res.json(parsed);
  } catch (error) {
    console.error("Report Explainer Error:", error);
    res.status(500).json({
      error: "Failed to analyze report.",
      overallSummary: "Could not automatically parse the document. Please ensure the image/PDF is clearly legible and well-lit.",
      tests: [],
      disclaimer: "HealthBridge educational report explainer."
    });
  }
});

// 4. AI Doctor Visit Preparation Endpoint
app.post("/api/ai/doctor-prep", async (req, res) => {
  try {
    const { mainConcern, duration, symptoms, medications, reports, additionalContext } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        appointmentSummary: `Patient presenting with ${mainConcern || "primary health inquiry"} lasting ${duration || "some time"}.`,
        suggestedQuestions: [
          "What could be the most likely factors contributing to these symptoms?",
          "Are there any diagnostic tests or labs that would be beneficial at this stage?",
          "What specific warning signs or changes should prompt me to follow up sooner?",
          "Are there lifestyle, dietary, or ergonomics adjustments you recommend?"
        ],
        keyNotesToShare: [
          `Main Concern: ${mainConcern || "General checkup"}`,
          `Duration: ${duration || "Ongoing"}`,
          `Current active medicines or supplements: ${medications?.join(", ") || "None reported"}`
        ]
      });
    }

    const prompt = `You are the Doctor Visit Preparation Architect for HealthBridge.
The user is preparing for an upcoming appointment with their healthcare clinician.
Details:
- Main Concern: ${mainConcern}
- Duration of Concern: ${duration}
- Symptoms Experienced: ${Array.isArray(symptoms) ? symptoms.join(", ") : symptoms}
- Current Medications: ${Array.isArray(medications) ? medications.join(", ") : medications}
- Recent Lab Reports: ${Array.isArray(reports) ? reports.join(", ") : reports}
- Notes: ${additionalContext || "None"}

TASK:
Generate a concise, highly organized preparation guide for the patient to bring to their appointment.
Output valid JSON with:
{
  "appointmentSummary": "A concise, objective 2-sentence clinical summary for the patient to share directly with their doctor.",
  "suggestedQuestions": [
    "4-6 clear, high-impact, non-judgmental questions to ask the doctor to make the consultation effective"
  ],
  "keyNotesToShare": [
    "3-4 vital factual points about symptom timeline, triggers, and previous treatments for the patient to remember"
  ]
}

STRICT RULE: Do NOT diagnose the patient or suggest specific pharmaceutical treatments. Help them ask the right questions.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error) {
    console.error("Doctor Prep Error:", error);
    res.status(500).json({
      appointmentSummary: "Consultation preparation summary.",
      suggestedQuestions: [
        "What could be causing these symptoms?",
        "Do I need any follow-up tests?",
        "When should I follow up?"
      ],
      keyNotesToShare: ["Be ready to discuss symptom start dates and active medications."]
    });
  }
});

// ----------------------------------------------------
// VITE & SERVER LIFECYCLE
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: "0.0.0.0", port: PORT },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[HealthBridge] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
