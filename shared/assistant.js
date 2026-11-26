// Shared knowledge and safety rules for the CancerCare assistant.
// Used by the browser (offline answers, urgent-help detection) and by
// functions/api/chat.js (AI system prompt). Keep both languages in step.

import { cancerTopics } from './cancer-topics.js';

export const emergencyNumbers = '999 / 112';

/** @typedef {'en' | 'sw'} Language */
/** @typedef {{ en: string; sw: string }} Localized */
/** @typedef {{ id: string; keywords: string[]; answer: Localized; link?: { href: string; label: Localized }; smallTalk?: boolean; specific?: boolean }} Topic */

/** @type {Topic[]} */
const baseTopics = [
  {
    id: 'greeting',
    smallTalk: true,
    keywords: ['hello', 'hi', 'hey', 'hallo', 'good morning', 'good afternoon', 'good evening', 'greetings', 'habari', 'hujambo', 'jambo', 'mambo', 'niaje', 'salaam', 'salam', 'shikamoo', 'habari yako', 'habari za asubuhi', 'habari za mchana', 'habari za jioni'],
    answer: {
      en: 'Hello, and welcome to CancerCare! I am happy to help. You can ask me about cancer basics, warning signs, screening, the HPV vaccine, paying for care with SHA, or finding care in Embu.',
      sw: 'Habari, karibu CancerCare! Nafurahi kukusaidia. Unaweza kuniuliza kuhusu misingi ya saratani, dalili za tahadhari, uchunguzi, chanjo ya HPV, kulipia huduma kupitia SHA, au kupata huduma Embu.',
    },
  },
  {
    id: 'how-are-you',
    smallTalk: true,
    keywords: ['how are you', 'how is it going', 'how are things', 'u good', 'uko aje', 'uko poa', 'u hali gani', 'habari gani', 'uko salama'],
    answer: {
      en: 'I am doing well, thank you for asking! I hope you are well too. How can I help you today?',
      sw: 'Niko salama, asante kwa kuuliza! Natumaini nawe uko salama. Nikusaidie vipi leo?',
    },
  },
  {
    id: 'thanks',
    smallTalk: true,
    keywords: ['thank', 'thanks', 'thx', 'appreciate', 'asante', 'shukran', 'nashukuru'],
    answer: {
      en: 'You are very welcome! If you have another question, I am here. Take care of yourself.',
      sw: 'Karibu sana! Ukiwa na swali jingine, niko hapa. Jitunze.',
    },
  },
  {
    id: 'goodbye',
    smallTalk: true,
    keywords: ['bye', 'goodbye', 'good night', 'see you', 'later', 'kwaheri', 'usiku mwema', 'tutaonana', 'baadaye'],
    answer: {
      en: 'Goodbye, and take care! You can come back to CancerCare any time.',
      sw: 'Kwaheri, jitunze! Unaweza kurudi CancerCare wakati wowote.',
    },
  },
  {
    id: 'capabilities',
    smallTalk: true,
    keywords: ['what can you do', 'who are you', 'are you a robot', 'are you human', 'are you a doctor', 'help me', 'unaweza kufanya nini', 'wewe ni nani', 'wewe ni daktari', 'nisaidie'],
    answer: {
      en: 'I am the CancerCare assistant, a computer program, not a doctor. I can explain cancer basics, warning signs, screening, the HPV vaccine, treatment types, palliative care and SHA cover, and point you to the right page. I cannot diagnose or replace a health professional.',
      sw: 'Mimi ni msaidizi wa CancerCare, programu ya kompyuta, si daktari. Ninaweza kueleza misingi ya saratani, dalili za tahadhari, uchunguzi, chanjo ya HPV, aina za matibabu, huduma shufaa na bima ya SHA, na kukuelekeza kwenye ukurasa unaofaa. Siwezi kutambua ugonjwa wala kuchukua nafasi ya mhudumu wa afya.',
    },
  },
  {
    id: 'about',
    keywords: ['cancercare', 'what is this', 'about you', 'project', 'organisation', 'organization', 'ngo', 'mission', 'nyinyi ni nani', 'mradi', 'shirika', 'dhamira', 'kuhusu nyinyi'],
    answer: {
      en: 'CancerCare is an early, community-focused project making cancer information clearer and care easier to find, starting in Embu County, Kenya. Right now the site offers a short learning guide in English and Kiswahili. Verified facility listings are still being prepared.',
      sw: 'CancerCare ni mradi wa jamii ulio katika hatua za mwanzo, unaolenga kurahisisha taarifa za saratani na kupata huduma, kuanzia Kaunti ya Embu, Kenya. Kwa sasa tovuti ina mwongozo mfupi wa elimu kwa Kiingereza na Kiswahili. Orodha ya vituo vilivyothibitishwa bado inaandaliwa.',
    },
    link: { href: '/how-it-works/', label: { en: 'How it works', sw: 'Inavyofanya kazi' } },
  },
  {
    id: 'what-is-cancer',
    keywords: ['what is cancer', 'cancer mean', 'define cancer', 'cancer is', 'saratani ni nini', 'maana ya saratani', 'kansa ni nini'],
    answer: {
      en: 'Cancer is a group of diseases in which abnormal cells grow and may spread to nearby tissue or other parts of the body. This is general education from the World Health Organization, not personal medical advice.',
      sw: 'Saratani ni kundi la magonjwa ambapo seli zisizo za kawaida hukua na zinaweza kuenea kwenye tishu zilizo karibu au sehemu nyingine za mwili. Hii ni elimu ya jumla kutoka Shirika la Afya Duniani, si ushauri wa kibinafsi wa afya.',
    },
    link: { href: '/learn/', label: { en: 'Cancer basics', sw: 'Misingi ya saratani' } },
  },
  {
    id: 'screening',
    keywords: ['screening', 'screen', 'test', 'check up', 'checkup', 'pap', 'mammogram', 'uchunguzi', 'kupima', 'kipimo', 'vipimo', 'kupimwa'],
    answer: {
      en: 'Screening looks for signs of certain cancers before symptoms appear. It is for people without symptoms, and the right test depends on age, risk and clinical guidance. A health professional can tell you whether screening is recommended for you.',
      sw: 'Uchunguzi wa mapema hutafuta viashiria vya aina fulani za saratani kabla ya dalili kujitokeza. Ni kwa watu wasio na dalili, na kipimo kinachofaa hutegemea umri, hatari na mwongozo wa afya. Mhudumu wa afya anaweza kukueleza kama uchunguzi unapendekezwa kwako.',
    },
    link: { href: '/learn/#screening', label: { en: 'Screening guide', sw: 'Mwongozo wa uchunguzi' } },
  },
  {
    id: 'symptoms',
    keywords: ['symptom', 'sign', 'lump', 'pain', 'bleeding', 'weight loss', 'noticed', 'change in my', 'worried', 'dalili', 'uvimbe', 'maumivu', 'kutokwa damu', 'nimeona', 'mabadiliko', 'wasiwasi'],
    answer: {
      en: 'I cannot assess symptoms, but an unusual or lasting change in your health is worth checking. Please speak with a health professional and ask for an assessment rather than waiting for routine screening. Writing down what you noticed and when it started can help.',
      sw: 'Siwezi kutathmini dalili, lakini mabadiliko yasiyo ya kawaida au yanayoendelea katika afya yako yanastahili kukaguliwa. Tafadhali zungumza na mhudumu wa afya na uombe tathmini badala ya kusubiri uchunguzi wa kawaida. Kuandika ulichoona na kilipoanza kunaweza kusaidia.',
    },
    link: { href: '/learn/#visit-questions', label: { en: 'Prepare questions for your visit', sw: 'Andaa maswali ya ziara yako' } },
  },
  {
    id: 'results',
    keywords: ['result', 'positive', 'abnormal', 'diagnosed', 'matokeo', 'nimegunduliwa', 'hali isiyo ya kawaida'],
    answer: {
      en: 'A screening result suggesting a problem does not by itself confirm cancer. Further tests may be needed. Ask the service that tested you to explain your result and the follow-up they recommend.',
      sw: 'Matokeo ya uchunguzi yanayodokeza tatizo hayathibitishi saratani yenyewe. Vipimo zaidi vinaweza kuhitajika. Uliza kituo kilichokupima kikueleze matokeo yako na ufuatiliaji unaopendekezwa.',
    },
    link: { href: '/learn/#screening', label: { en: 'Understand follow-up', sw: 'Elewa ufuatiliaji' } },
  },
  {
    id: 'prevention',
    keywords: ['prevent', 'prevention', 'risk', 'avoid', 'smoking', 'tobacco', 'alcohol', 'kuzuia', 'hatari', 'sigara', 'tumbaku', 'pombe'],
    answer: {
      en: 'According to the World Health Organization, between 30 and 50% of cancers can be prevented by reducing risk factors such as tobacco use and alcohol, and through measures like HPV and hepatitis B vaccination. A health professional can explain which steps apply to you.',
      sw: 'Kulingana na Shirika la Afya Duniani, kati ya asilimia 30 na 50 ya saratani zinaweza kuzuiwa kwa kupunguza vihatarishi kama matumizi ya tumbaku na pombe, na kupitia hatua kama chanjo ya HPV na homa ya ini B. Mhudumu wa afya anaweza kukueleza hatua zinazokuhusu.',
    },
    link: { href: '/learn/#myths', label: { en: 'Myths and facts', sw: 'Dhana na ukweli' } },
  },
  {
    id: 'common-cancers',
    keywords: ['common cancer', 'most common', 'types of cancer', 'kinds of cancer', 'breast cancer', 'cervical cancer', 'prostate', 'oesophag', 'esophag', 'colorectal', 'colon', 'kenya cancer', 'aina za saratani', 'saratani ya matiti', 'saratani ya shingo ya kizazi', 'saratani ya tezi dume', 'saratani ya umio', 'saratani ya utumbo'],
    answer: {
      en: 'In Kenya, the most common cancers are breast, cervical, prostate, oesophageal (food pipe) and colorectal (bowel) cancer. Breast and cervical cancer mostly affect women, prostate cancer affects men, and oesophageal and colorectal cancer affect both. Many of these can be found early or prevented.',
      sw: 'Nchini Kenya, saratani zinazotokea zaidi ni za matiti, shingo ya kizazi, tezi dume, umio (njia ya chakula) na utumbo mpana. Saratani za matiti na shingo ya kizazi huwapata zaidi wanawake, ya tezi dume huwapata wanaume, na za umio na utumbo huwapata wote. Nyingi kati ya hizi zinaweza kugunduliwa mapema au kuzuiwa.',
    },
    link: { href: '/learn/', label: { en: 'Cancer basics', sw: 'Misingi ya saratani' } },
  },
  {
    id: 'warning-signs',
    keywords: ['warning sign', 'early sign', 'signs of cancer', 'how do i know', 'dalili za saratani', 'dalili za mapema', 'ishara'],
    answer: {
      en: 'Changes worth getting checked include: a new lump or swelling; unusual bleeding (for example between periods, after sex, or blood in urine, stool or cough); a cough, hoarse voice or difficulty swallowing that does not go away; weight loss without trying; a sore that does not heal; and changes in bowel or urine habits. Most of these are caused by something less serious, but early checks matter. Please see a health professional.',
      sw: 'Mabadiliko yanayostahili kukaguliwa ni pamoja na: uvimbe mpya; kutokwa damu isivyo kawaida (kwa mfano kati ya hedhi, baada ya tendo la ndoa, au damu kwenye mkojo, choo au makohozi); kikohozi, sauti kukwaruza au shida ya kumeza isiyoisha; kupungua uzito bila kujaribu; kidonda kisichopona; na mabadiliko ya choo au mkojo. Mara nyingi husababishwa na jambo dogo, lakini kukaguliwa mapema ni muhimu. Tafadhali muone mhudumu wa afya.',
    },
    link: { href: '/learn/#visit-questions', label: { en: 'Prepare questions for your visit', sw: 'Andaa maswali ya ziara yako' } },
  },
  {
    id: 'hpv-vaccine',
    keywords: ['hpv', 'vaccine', 'vaccination', 'jab', 'chanjo', 'kuchanjwa'],
    answer: {
      en: 'The HPV vaccine protects against the virus that causes most cervical cancer. In Kenya it is free for girls aged 10 to 14, and since late 2025 one dose is enough for this age group. Ask your nearest health facility or school health programme. Older girls and women can ask a health professional about vaccination and cervical screening.',
      sw: 'Chanjo ya HPV hukinga dhidi ya virusi vinavyosababisha saratani nyingi za shingo ya kizazi. Nchini Kenya ni bure kwa wasichana wa miaka 10 hadi 14, na tangu mwishoni mwa 2025 dozi moja inatosha kwa umri huu. Uliza kituo cha afya kilicho karibu au mpango wa afya shuleni. Wasichana wakubwa na wanawake wanaweza kumuuliza mhudumu wa afya kuhusu chanjo na uchunguzi wa shingo ya kizazi.',
    },
    link: { href: '/learn/#myths', label: { en: 'Myths and facts', sw: 'Dhana na ukweli' } },
  },
  {
    id: 'cost-sha',
    keywords: ['sha', 'nhif', 'shif', 'insurance', 'cost', 'pay', 'money', 'afford', 'expensive', 'bima', 'gharama', 'kulipa', 'pesa', 'ghali'],
    answer: {
      en: 'Cancer care in Kenya is partly covered by the Social Health Authority (SHA), which replaced NHIF and has a cancer (oncology) benefit package. What is covered and the limits can change, so ask the SHA desk at the facility or contact SHA directly before treatment starts. Registering with SHA early helps.',
      sw: 'Huduma za saratani nchini Kenya zinagharamiwa kwa sehemu na Mamlaka ya Afya ya Jamii (SHA), iliyochukua nafasi ya NHIF na ina kifurushi cha huduma za saratani. Huduma zinazogharamiwa na viwango vinaweza kubadilika, kwa hivyo uliza dawati la SHA kituoni au wasiliana na SHA moja kwa moja kabla ya matibabu kuanza. Kujisajili na SHA mapema husaidia.',
    },
    link: { href: 'https://sha.go.ke', label: { en: 'Social Health Authority', sw: 'Mamlaka ya Afya ya Jamii (SHA)' } },
  },
  {
    id: 'treatment',
    keywords: ['treatment', 'treat', 'cure', 'chemo', 'chemotherapy', 'radiotherapy', 'radiation', 'surgery', 'operation', 'herbal', 'matibabu', 'kutibu', 'tiba', 'upasuaji', 'mionzi', 'dawa za kienyeji', 'mitishamba'],
    answer: {
      en: 'Common cancer treatments include surgery, chemotherapy (medicines), radiotherapy (radiation) and other targeted or hormone treatments. The right plan depends on the type and stage of cancer and is decided with a specialist team. Please talk to your care team before using herbal or other remedies, as some can interfere with treatment.',
      sw: 'Matibabu ya kawaida ya saratani ni pamoja na upasuaji, tibakemikali (dawa), tiba ya mionzi na matibabu mengine kama ya homoni. Mpango unaofaa hutegemea aina na hatua ya saratani na huamuliwa pamoja na timu ya wataalamu. Tafadhali zungumza na timu yako ya huduma kabla ya kutumia dawa za mitishamba au nyinginezo, kwani baadhi zinaweza kuathiri matibabu.',
    },
    link: { href: '/learn/#visit-questions', label: { en: 'Questions for your care team', sw: 'Maswali kwa timu yako ya huduma' } },
  },
  {
    id: 'palliative',
    keywords: ['palliative', 'pain relief', 'hospice', 'end of life', 'comfort care', 'huduma shufaa', 'kupunguza maumivu', 'mwisho wa maisha'],
    answer: {
      en: 'Palliative care focuses on comfort and quality of life: easing pain and other symptoms, and supporting patients and families emotionally and practically. It can be given alongside treatment at any stage, not only at the end of life. Ask the care team about palliative services.',
      sw: 'Huduma shufaa hulenga faraja na ubora wa maisha: kupunguza maumivu na dalili nyingine, na kuwasaidia wagonjwa na familia kihisia na kivitendo. Inaweza kutolewa pamoja na matibabu katika hatua yoyote, si mwishoni mwa maisha pekee. Uliza timu ya huduma kuhusu huduma shufaa.',
    },
  },
  {
    id: 'find-care',
    keywords: ['hospital', 'facility', 'clinic', 'where', 'near me', 'oncology', 'embu', 'hospitali', 'kituo', 'zahanati', 'wapi', 'karibu nami', 'find care'],
    answer: {
      en: 'The CancerCare directory has no listings yet. We only publish a facility after the provider confirms its services, access and contact details. In the meantime, the public Kenya Health Facility Registry lists registered facilities, and your nearest health facility can advise on referral.',
      sw: 'Orodha ya CancerCare bado haina vituo. Tunaonyesha kituo tu baada ya mtoa huduma kuthibitisha huduma, jinsi ya kuzipata na mawasiliano. Kwa sasa, Sajili ya Umma ya Vituo vya Afya Kenya inaorodhesha vituo vilivyosajiliwa, na kituo cha afya kilicho karibu nawe kinaweza kukushauri kuhusu rufaa.',
    },
    link: { href: '/find-care/', label: { en: 'Directory progress', sw: 'Maendeleo ya orodha' } },
  },
  {
    id: 'support',
    keywords: ['support', 'caregiver', 'family', 'cope', 'scared', 'afraid', 'alone', 'sad', 'msaada', 'mlezi', 'familia', 'naogopa', 'peke yangu', 'huzuni'],
    answer: {
      en: 'Facing cancer, or caring for someone who is, can feel overwhelming. Talking to people you trust and to your care team helps. CancerCare is planning practical support resources with the Embu community. For now, you can explore the learning guide or tell us what support would help.',
      sw: 'Kukabiliana na saratani, au kumhudumia mtu aliye nayo, kunaweza kuwa kugumu. Kuzungumza na watu unaowaamini na timu yako ya huduma husaidia. CancerCare inapanga rasilimali za msaada pamoja na jamii ya Embu. Kwa sasa, unaweza kusoma mwongozo wa elimu au kutueleza msaada unaoweza kusaidia.',
    },
    link: { href: '/get-involved/', label: { en: 'Tell us what would help', sw: 'Tueleze kinachoweza kusaidia' } },
  },
  {
    id: 'involve',
    keywords: ['volunteer', 'how can i help', 'donate', 'partner', 'contact', 'email', 'feedback', 'join', 'work with', 'kujitolea', 'ninawezaje kusaidia', 'mchango', 'kushirikiana', 'wasiliana', 'barua pepe', 'maoni'],
    answer: {
      en: 'Thank you for wanting to help. You can send website feedback, a public facility detail to check, or an offer to review or test the Embu pilot through the Get involved page. Please leave out names and private health details.',
      sw: 'Asante kwa kutaka kusaidia. Unaweza kutuma maoni ya tovuti, taarifa ya umma ya kituo ya kukagua, au ombi la kukagua au kujaribu mradi wa Embu kupitia ukurasa wa Shiriki. Tafadhali usiweke majina au taarifa binafsi za afya.',
    },
    link: { href: '/get-involved/', label: { en: 'Get involved', sw: 'Shiriki' } },
  },
];

/** @type {Topic[]} */
export const topics = [...baseTopics, ...cancerTopics.map(topic => ({ ...topic, specific: true }))];

const medicalEmergency = /can'?t breathe|cannot breathe|not breathing|chest pain|unconscious|passed out|fainted|seizure|heavy bleeding|bleeding (a lot|heavily)|emergency|overdose|dharura|hapumui|siwezi kupumua|maumivu (makali )?ya kifua|amezimia|kuzimia|degedege|anavuja damu|kutokwa damu nyingi/i;
const selfHarm = /suicid|kill myself|end my life|want to die|hurt myself|kujiua|kujiumiza|nataka kufa/i;

/** @param {string} text */
export function isUrgent(text) {
  return medicalEmergency.test(text) || selfHarm.test(text);
}

/** @param {Language} language @param {string} [text] */
export function urgentReply(language, text = '') {
  if (selfHarm.test(text)) {
    return language === 'sw'
      ? `Samahani unapitia hali ngumu hivi. Usalama wako ni muhimu. Tafadhali piga ${emergencyNumbers} sasa au nenda kituo cha afya kilicho karibu nawe, na umwombe mtu unayemwamini akae nawe sasa hivi. Mimi ni msaidizi wa taarifa tu, lakini hustahili kubeba hili peke yako.`
      : `I am sorry you are going through this. Your safety matters. Please call ${emergencyNumbers} now or go to your nearest health facility, and ask someone you trust to stay with you right now. I am only an information assistant, but you do not have to carry this alone.`;
  }
  return language === 'sw'
    ? `Hili linaonekana kuwa la dharura. Tafadhali piga ${emergencyNumbers} sasa au nenda kituo cha afya kilicho karibu nawe mara moja. Mimi ni msaidizi wa taarifa tu na siwezi kutoa huduma ya dharura.`
    : `This sounds urgent. Please call ${emergencyNumbers} now or go to your nearest health facility straight away. I am an information assistant and cannot provide emergency care.`;
}

/** @param {string} text */
function normalize(text) {
  return ` ${text.toLowerCase().replace(/[^\p{L}\p{N}' ]+/gu, ' ').replace(/\s+/g, ' ')} `;
}

/**
 * Best offline topic for a question, or null when nothing matches.
 * @param {string} text
 * @returns {Topic | null}
 */
function closeEnough(word, keyword) {
  // Allows one typo (missing, extra or wrong letter) in longer words: "screning", "prostrate".
  const a = word.slice(0, keyword.length + 1);
  const b = keyword;
  if (Math.abs(a.length - b.length) > 1) return false;
  const previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i += 1) {
    let diagonal = previous[0];
    previous[0] = i;
    let rowMin = previous[0];
    for (let j = 1; j <= b.length; j += 1) {
      const above = previous[j];
      previous[j] = Math.min(previous[j] + 1, previous[j - 1] + 1, diagonal + (a[i - 1] === b[j - 1] ? 0 : 1));
      diagonal = above;
      rowMin = Math.min(rowMin, previous[j]);
    }
    if (rowMin > 1) return false;
  }
  return Math.min(previous[b.length], ...previous.slice(Math.max(0, b.length - 1))) <= 1;
}

function bestTopic(query, words, fuzzy) {
  let best = null;
  let bestScore = 0;
  for (const topic of topics) {
    let score = 0;
    for (const keyword of topic.keywords) {
      const key = normalize(keyword).trimEnd();
      const bare = key.trim();
      // Health topics match at the start of a word ("screen" matches "screening").
      // Small talk must match whole words so "hi" does not match "hiv".
      const found = fuzzy
        ? !topic.smallTalk && !bare.includes(' ') && bare.length >= 6 && words.some(word => word.length >= 5 && closeEnough(word, bare))
        : topic.smallTalk ? query.includes(`${key} `) : query.includes(key);
      // Specific cancer topics outrank broad ones on a tie: "a lump in my breast" is about breast cancer.
      if (found) score += (keyword.includes(' ') ? 3 : 1) * (topic.smallTalk ? 0.4 : topic.specific ? 1.5 : 1);
    }
    if (score > bestScore) { best = topic; bestScore = score; }
  }
  return best;
}

export function matchTopic(text) {
  const query = normalize(text);
  const words = query.trim().split(' ');
  // Exact words first; only if nothing matches, allow one typo in longer words.
  return bestTopic(query, words, false) ?? bestTopic(query, words, true);
}

/** @param {Language} language */
export function fallbackReply(language) {
  return language === 'sw'
    ? 'Sina jibu la swali hilo bado. Ninaweza kusaidia kuhusu saratani ni nini, saratani zinazotokea zaidi Kenya, dalili za tahadhari, uchunguzi, matokeo, chanjo ya HPV, matibabu, huduma shufaa, bima ya SHA, kupata huduma Embu au jinsi ya kushiriki. Kwa maswali ya afya yako binafsi, tafadhali zungumza na mhudumu wa afya.'
    : 'I do not have an answer to that yet. I can help with what cancer is, common cancers in Kenya, warning signs, screening, results, the HPV vaccine, treatment, palliative care, SHA cover, finding care in Embu or how to get involved. For questions about your own health, please speak with a health professional.';
}

/** @param {Language} language */
export function systemPrompt(language) {
  const facts = topics.filter(topic => !topic.smallTalk).map(topic => `- ${topic.id}: ${topic.answer.en} (page: ${topic.link?.href ?? '/'})`).join('\n');
  return `You are the CancerCare assistant on the website of CancerCare, an early community project in Embu County, Kenya, that is building clear cancer information and a directory of verified care services.

Reply in ${language === 'sw' ? 'Kiswahili' : 'English'} unless the user writes in the other language; then match them. Use warm, plain language that a secondary-school reader understands. Keep most answers under about 180 words; use a short list with "- " when listing signs or steps, and **bold** sparingly. No headings or tables.

Be friendly and human. Reply naturally to greetings (hello, habari, mambo, niaje, shikamoo, good morning), thanks, goodbyes and small talk such as "how are you", in one or two sentences, then offer help. If asked, say you are the CancerCare assistant, a computer program and not a doctor.

What you know about the site and its current state:
${facts}
- Kenya facts (sources: GLOBOCAN 2022 Kenya fact sheet; Ministry of Health): the most common cancers are breast, cervical, prostate, oesophageal and colorectal. The HPV vaccine is free for girls aged 10-14 and a single dose has been used since late 2025. The Social Health Authority (SHA) replaced NHIF and has an oncology benefit package; limits change, so tell people to confirm with SHA or the facility's SHA desk and do not quote amounts.
- Site pages: / (home), /learn/ (cancer basics, screening guide, questions for a visit, myths and facts), /find-care/ (directory progress), /how-it-works/ (Embu pilot plan), /get-involved/ (contact form).
- The educational wording is awaiting local clinical review. The site does not provide medical advice, patient accounts, appointments, referrals or live facility listings yet.

You can and should answer any cancer-related question well, drawing on accurate, mainstream medical knowledge consistent with WHO and the Kenya Ministry of Health: cancer types (for example breast, cervical, prostate, oesophageal, colorectal, liver, lung, skin, blood cancers, childhood cancers), causes and risk factors, prevention and vaccines, signs to get checked, screening and diagnostic tests, staging, treatment options in general terms and their side effects, nutrition, pain, palliative care, caregiving, emotional wellbeing, survivorship, myths, and how to prepare for a health visit. Give real, specific information, not only "see a doctor". Correct myths kindly. If a question is about the person's own situation, give the general information and suggest what to ask a health professional.

Rules you must follow:
1. Never diagnose, tell someone whether their own symptom or result is or is not cancer, choose a treatment, medicine or dose for them, or estimate their personal risk, survival or prognosis. Encourage speaking with a health professional for personal decisions.
2. If something sounds like an emergency or the person may harm themselves, tell them to call ${emergencyNumbers} or go to the nearest health facility now.
3. Never name, recommend or invent specific facilities, phone numbers, prices or opening hours. The directory has no confirmed listings yet; say so and point to /find-care/.
4. If you are not sure, say so. Do not invent statistics or sources. You may refer to the World Health Organization and Kenya Ministry of Health guidance in general terms.
5. Ask people not to share names or private health details. You do not store conversations.
6. When useful, point to a relevant site page by its path, for example /learn/.
7. Stay on cancer, general health linked to cancer, care navigation and the CancerCare project. Politely decline unrelated tasks.
8. Never claim that herbal remedies, special diets or other unproven methods cure cancer.`;
}
