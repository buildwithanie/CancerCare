// Shared knowledge and safety rules for the CancerCare assistant.
// Used by the browser (offline answers, urgent-help detection) and by
// functions/api/chat.js (AI system prompt). Keep both languages in step.

export const emergencyNumbers = '999 / 112';

/** @typedef {'en' | 'sw'} Language */
/** @typedef {{ en: string; sw: string }} Localized */
/** @typedef {{ id: string; keywords: string[]; answer: Localized; link?: { href: string; label: Localized } }} Topic */

/** @type {Topic[]} */
export const topics = [
  {
    id: 'about',
    keywords: ['cancercare', 'who are you', 'what is this', 'about you', 'project', 'organisation', 'organization', 'ngo', 'mission', 'nyinyi ni nani', 'mradi', 'shirika', 'dhamira', 'kuhusu nyinyi'],
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
    keywords: ['result', 'positive', 'abnormal', 'diagnosis', 'diagnosed', 'biopsy', 'matokeo', 'nimegunduliwa', 'hali isiyo ya kawaida'],
    answer: {
      en: 'A screening result suggesting a problem does not by itself confirm cancer. Further tests may be needed. Ask the service that tested you to explain your result and the follow-up they recommend.',
      sw: 'Matokeo ya uchunguzi yanayodokeza tatizo hayathibitishi saratani yenyewe. Vipimo zaidi vinaweza kuhitajika. Uliza kituo kilichokupima kikueleze matokeo yako na ufuatiliaji unaopendekezwa.',
    },
    link: { href: '/learn/#screening', label: { en: 'Understand follow-up', sw: 'Elewa ufuatiliaji' } },
  },
  {
    id: 'prevention',
    keywords: ['prevent', 'prevention', 'risk', 'avoid', 'smoking', 'tobacco', 'alcohol', 'hpv', 'vaccine', 'kuzuia', 'hatari', 'sigara', 'tumbaku', 'pombe', 'chanjo'],
    answer: {
      en: 'According to the World Health Organization, between 30 and 50% of cancers can be prevented by reducing risk factors such as tobacco use and alcohol, and through measures like HPV and hepatitis B vaccination. A health professional can explain which steps apply to you.',
      sw: 'Kulingana na Shirika la Afya Duniani, kati ya asilimia 30 na 50 ya saratani zinaweza kuzuiwa kwa kupunguza vihatarishi kama matumizi ya tumbaku na pombe, na kupitia hatua kama chanjo ya HPV na homa ya ini B. Mhudumu wa afya anaweza kukueleza hatua zinazokuhusu.',
    },
    link: { href: '/learn/#myths', label: { en: 'Myths and facts', sw: 'Dhana na ukweli' } },
  },
  {
    id: 'find-care',
    keywords: ['hospital', 'facility', 'clinic', 'where', 'near me', 'doctor', 'treatment', 'chemo', 'oncology', 'embu', 'hospitali', 'kituo', 'zahanati', 'wapi', 'daktari', 'matibabu', 'karibu'],
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
    keywords: ['volunteer', 'help', 'donate', 'partner', 'contact', 'email', 'feedback', 'join', 'work with', 'kujitolea', 'kusaidia', 'mchango', 'kushirikiana', 'wasiliana', 'barua pepe', 'maoni'],
    answer: {
      en: 'Thank you for wanting to help. You can send website feedback, a public facility detail to check, or an offer to review or test the Embu pilot through the Get involved page. Please leave out names and private health details.',
      sw: 'Asante kwa kutaka kusaidia. Unaweza kutuma maoni ya tovuti, taarifa ya umma ya kituo ya kukagua, au ombi la kukagua au kujaribu mradi wa Embu kupitia ukurasa wa Shiriki. Tafadhali usiweke majina au taarifa binafsi za afya.',
    },
    link: { href: '/get-involved/', label: { en: 'Get involved', sw: 'Shiriki' } },
  },
];

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
export function matchTopic(text) {
  const query = normalize(text);
  let best = null;
  let bestScore = 0;
  for (const topic of topics) {
    let score = 0;
    for (const keyword of topic.keywords) {
      // Match at the start of a word, so "screen" also matches "screening".
      if (query.includes(normalize(keyword).trimEnd())) score += keyword.includes(' ') ? 3 : 1;
    }
    if (score > bestScore) { best = topic; bestScore = score; }
  }
  return best;
}

/** @param {Language} language */
export function fallbackReply(language) {
  return language === 'sw'
    ? 'Sina jibu la swali hilo bado. Ninaweza kusaidia kuhusu saratani ni nini, uchunguzi, matokeo, kuzuia, kutafuta huduma Embu au jinsi ya kushiriki. Kwa maswali ya afya yako binafsi, tafadhali zungumza na mhudumu wa afya.'
    : 'I do not have an answer to that yet. I can help with what cancer is, screening, results, prevention, finding care in Embu or how to get involved. For questions about your own health, please speak with a health professional.';
}

/** @param {Language} language */
export function systemPrompt(language) {
  const facts = topics.map(topic => `- ${topic.id}: ${topic.answer.en} (page: ${topic.link?.href ?? '/'})`).join('\n');
  return `You are the CancerCare assistant on the website of CancerCare, an early community project in Embu County, Kenya, that is building clear cancer information and a directory of verified care services.

Reply in ${language === 'sw' ? 'Kiswahili' : 'English'} unless the user writes in the other language; then match them. Use short, warm, plain sentences (at most about 120 words). No markdown headings or tables.

What you know about the site and its current state:
${facts}
- Site pages: / (home), /learn/ (cancer basics, screening guide, questions for a visit, myths and facts), /find-care/ (directory progress), /how-it-works/ (Embu pilot plan), /get-involved/ (contact form).
- The educational wording is awaiting local clinical review. The site does not provide medical advice, patient accounts, appointments, referrals or live facility listings yet.

Rules you must follow:
1. You give general health education only. Never diagnose, interpret a specific person's symptoms or results, recommend specific treatments, medicines or doses, or estimate anyone's risk or prognosis. Encourage speaking with a health professional.
2. If something sounds like an emergency or the person may harm themselves, tell them to call ${emergencyNumbers} or go to the nearest health facility now.
3. Never name, recommend or invent specific facilities, phone numbers, prices or opening hours. The directory has no confirmed listings yet; say so and point to /find-care/.
4. If you are not sure, say so. Do not invent statistics or sources. You may refer to the World Health Organization and Kenya Ministry of Health guidance in general terms.
5. Ask people not to share names or private health details. You do not store conversations.
6. When useful, point to a relevant site page by its path, for example /learn/.
7. Stay on cancer information, care navigation and the CancerCare project. Politely decline unrelated tasks.`;
}
