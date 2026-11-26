// Extra general cancer education for the CancerCare assistant's quick-answers mode.
// General information only, aligned with WHO guidance. Local clinical review pending.

/** @type {import('./assistant.js').Topic[]} */
export const cancerTopics = [
  {
    id: 'breast-cancer',
    keywords: ['breast', 'breast cancer', 'breast lump', 'nipple', 'mammogram', 'self exam', 'self-exam', 'matiti', 'saratani ya matiti', 'titi', 'chuchu', 'kujichunguza'],
    answer: {
      en: 'Breast cancer is the most common cancer in Kenya. Signs to get checked include a new lump in the breast or armpit, a change in size or shape, dimpled or red skin, a nipple that turns inward, or discharge or bleeding from the nipple. Most lumps are not cancer, but every new lump should be checked. Get to know how your breasts normally look and feel, and ask a health worker about a clinical breast exam. Men can also get breast cancer, though rarely.',
      sw: 'Saratani ya matiti ndiyo saratani inayotokea zaidi Kenya. Dalili za kukaguliwa ni pamoja na uvimbe mpya kwenye titi au kwapani, mabadiliko ya ukubwa au umbo, ngozi yenye vishimo au wekundu, chuchu kuingia ndani, au chuchu kutoa majimaji au damu. Uvimbe mwingi si saratani, lakini kila uvimbe mpya ukaguliwe. Fahamu jinsi matiti yako yanavyoonekana na kuhisika kwa kawaida, na umuulize mhudumu wa afya kuhusu kuchunguzwa matiti. Wanaume pia wanaweza kupata saratani ya matiti, ingawa ni nadra.',
    },
    link: { href: '/learn/#visit-questions', label: { en: 'Prepare questions for your visit', sw: 'Andaa maswali ya ziara yako' } },
  },
  {
    id: 'cervical-cancer',
    keywords: ['cervical', 'cervix', 'cervical cancer', 'pap', 'pap smear', 'via test', 'womb', 'shingo ya kizazi', 'saratani ya shingo ya kizazi', 'kizazi', 'mfuko wa uzazi'],
    answer: {
      en: 'Cervical cancer is mostly caused by long-lasting infection with HPV, a common virus. It is one of the most preventable cancers: the HPV vaccine protects girls before exposure, and screening (such as VIA, Pap or HPV tests) can find changes early, when they are easy to treat. Signs to get checked include bleeding after sex, between periods or after menopause, unusual discharge and pelvic pain. Women living with HIV have a higher risk and are advised to screen more often.',
      sw: 'Saratani ya shingo ya kizazi husababishwa zaidi na maambukizi ya muda mrefu ya HPV, virusi vya kawaida. Ni miongoni mwa saratani zinazozuilika zaidi: chanjo ya HPV huwakinga wasichana mapema, na uchunguzi (kama VIA, Pap au kipimo cha HPV) unaweza kugundua mabadiliko mapema, yanapotibika kwa urahisi. Dalili za kukaguliwa ni pamoja na kutokwa damu baada ya tendo la ndoa, kati ya hedhi au baada ya kukoma hedhi, majimaji yasiyo ya kawaida na maumivu ya nyonga. Wanawake wanaoishi na VVU wako katika hatari zaidi na wanashauriwa kuchunguzwa mara nyingi zaidi.',
    },
    link: { href: '/learn/#screening', label: { en: 'Screening guide', sw: 'Mwongozo wa uchunguzi' } },
  },
  {
    id: 'prostate-cancer',
    keywords: ['prostate', 'prostate cancer', 'psa', 'urinating', 'urine flow', 'tezi dume', 'saratani ya tezi dume', 'kukojoa', 'mkojo'],
    answer: {
      en: 'Prostate cancer is the most common cancer in Kenyan men, and the risk rises with age and with a family history. Early prostate cancer often has no symptoms. Later signs can include difficulty starting to urinate, a weak flow, waking often at night to urinate, or blood in urine; these are also common with a non-cancerous enlarged prostate. Men can ask a health worker whether a PSA blood test is right for them and what the result would mean.',
      sw: 'Saratani ya tezi dume ndiyo saratani inayowapata zaidi wanaume Kenya, na hatari huongezeka kadri umri unavyoongezeka na ikiwa iko katika familia. Mara nyingi haina dalili mwanzoni. Baadaye dalili zinaweza kuwa shida kuanza kukojoa, mkojo dhaifu, kuamka mara nyingi usiku kukojoa, au damu kwenye mkojo; dalili hizi pia hutokea tezi dume inapokua bila saratani. Wanaume wanaweza kumuuliza mhudumu wa afya kama kipimo cha damu cha PSA kinawafaa na matokeo yangemaanisha nini.',
    },
    link: { href: '/learn/#visit-questions', label: { en: 'Prepare questions for your visit', sw: 'Andaa maswali ya ziara yako' } },
  },
  {
    id: 'oesophageal-cancer',
    keywords: ['oesophag', 'esophag', 'food pipe', 'swallow', 'swallowing', 'hot tea', 'umio', 'saratani ya umio', 'kumeza', 'chai moto'],
    answer: {
      en: 'Oesophageal cancer affects the food pipe and is common in Kenya, including in younger adults. The most common sign is difficulty or pain when swallowing, often with weight loss; food may feel stuck, and some people have pain behind the breastbone. Risk factors include tobacco, alcohol and regularly drinking very hot drinks, so letting tea cool a little helps. Anyone with swallowing problems that do not go away should see a health worker soon.',
      sw: 'Saratani ya umio huathiri njia ya chakula na hutokea sana Kenya, hata kwa vijana wazima. Dalili kuu ni shida au maumivu wakati wa kumeza, mara nyingi pamoja na kupungua uzito; chakula kinaweza kuhisi kimekwama, na wengine huwa na maumivu nyuma ya mfupa wa kifua. Vihatarishi ni pamoja na tumbaku, pombe na kunywa vinywaji vya moto sana mara kwa mara, kwa hivyo kuacha chai ipoe kidogo husaidia. Yeyote mwenye shida ya kumeza isiyoisha amwone mhudumu wa afya mapema.',
    },
  },
  {
    id: 'colorectal-cancer',
    keywords: ['colorectal', 'colon', 'bowel', 'rectal', 'rectum', 'blood in stool', 'stool', 'constipation', 'diarrhoea', 'utumbo', 'saratani ya utumbo', 'choo', 'damu kwenye choo', 'kuvimbiwa', 'kuhara'],
    answer: {
      en: 'Colorectal (bowel) cancer affects the large intestine or rectum. Signs to get checked include a change in bowel habits lasting more than a few weeks, blood in the stool, ongoing belly pain or bloating, weight loss and tiredness from low blood (anaemia). Risk rises with age and is linked to diets low in fibre and high in red or processed meat, alcohol, smoking, inactivity and family history. Eating plenty of vegetables, fruit, beans and whole grains and staying active help lower the risk.',
      sw: 'Saratani ya utumbo mpana huathiri utumbo mpana au puru. Dalili za kukaguliwa ni pamoja na mabadiliko ya choo yanayodumu zaidi ya wiki chache, damu kwenye choo, maumivu au kuvimba tumbo kusikoisha, kupungua uzito na uchovu kutokana na upungufu wa damu. Hatari huongezeka na umri na inahusishwa na lishe yenye nyuzinyuzi kidogo na nyama nyekundu au iliyosindikwa kwa wingi, pombe, uvutaji sigara, kutofanya mazoezi na historia ya familia. Kula mboga, matunda, maharagwe na nafaka zisizokobolewa kwa wingi na kufanya mazoezi husaidia kupunguza hatari.',
    },
  },
  {
    id: 'childhood-cancer',
    keywords: ['child', 'children', 'kid', 'baby', 'childhood cancer', 'leukaemia', 'leukemia', 'mtoto', 'watoto', 'saratani ya watoto', 'mtoto wangu'],
    answer: {
      en: 'Children can get cancer too, most often leukaemia (blood cancer), brain tumours, lymphoma, kidney tumours and eye tumours. Many childhood cancers can be cured with timely treatment. Signs to get checked include a fever or tiredness that will not go away, unusual paleness, bruising or bleeding, a lump or swelling, ongoing bone pain, or a white glow in a child\'s eye in photos. Take the child to a health facility; early referral matters.',
      sw: 'Watoto pia wanaweza kupata saratani, mara nyingi saratani ya damu (lukemia), uvimbe wa ubongo, limfoma, uvimbe wa figo na uvimbe wa jicho. Saratani nyingi za watoto zinaweza kutibika zikitibiwa mapema. Dalili za kukaguliwa ni pamoja na homa au uchovu usioisha, weupe usio wa kawaida, michubuko au kutokwa damu, uvimbe, maumivu ya mifupa yasiyoisha, au mng\'ao mweupe kwenye jicho la mtoto katika picha. Mpeleke mtoto kituo cha afya; rufaa ya mapema ni muhimu.',
    },
  },
  {
    id: 'causes',
    keywords: ['hiv', 'vvu', 'ukimwi', 'cause', 'causes', 'why do people get', 'risk factor', 'what causes', 'chanzo', 'husababishwa', 'kisababishi', 'vihatarishi'],
    answer: {
      en: 'Cancer starts when changes in cells make them grow out of control. Things that raise the risk include tobacco, alcohol, an unhealthy diet, being inactive or overweight, air pollution, certain infections (HPV, hepatitis B and C, H. pylori, and HIV, which weakens the body\'s defences), aflatoxin in mouldy grains, older age and family history. Having a risk factor does not mean you will get cancer, and some people get cancer with no known risk factor.',
      sw: 'Saratani huanza mabadiliko katika seli yanapozifanya zikue bila udhibiti. Mambo yanayoongeza hatari ni pamoja na tumbaku, pombe, lishe isiyofaa, kutofanya mazoezi au uzito kupita kiasi, uchafuzi wa hewa, baadhi ya maambukizi (HPV, homa ya ini B na C, H. pylori, na VVU unaodhoofisha kinga ya mwili), sumu ya aflatoksini kwenye nafaka zenye ukungu, umri mkubwa na historia ya familia. Kuwa na kihatarishi hakumaanishi utapata saratani, na wengine hupata saratani bila kihatarishi kinachojulikana.',
    },
    link: { href: '/learn/#myths', label: { en: 'Myths and facts', sw: 'Dhana na ukweli' } },
  },
  {
    id: 'hereditary',
    keywords: ['hereditary', 'inherited', 'genetic', 'runs in my family', 'family history', 'my mother had', 'my father had', 'urithi', 'kurithi', 'familia yangu', 'mama yangu alikuwa', 'baba yangu alikuwa'],
    answer: {
      en: 'Most cancers are not directly inherited. But some families have a higher risk, especially when several close relatives had the same cancer or had it at a young age. Tell your health worker about your family history; they may suggest checks earlier or more often.',
      sw: 'Saratani nyingi hazirithiwi moja kwa moja. Lakini baadhi ya familia ziko katika hatari zaidi, hasa ndugu wa karibu kadhaa walipokuwa na saratani ileile au wakaipata wakiwa na umri mdogo. Mweleze mhudumu wa afya historia ya familia yako; anaweza kupendekeza ukaguzi mapema au mara nyingi zaidi.',
    },
  },
  {
    id: 'lifestyle',
    keywords: ['diet', 'food', 'eat', 'nutrition', 'exercise', 'healthy', 'lifestyle', 'weight', 'lishe', 'chakula', 'kula', 'mazoezi', 'afya bora', 'mtindo wa maisha', 'uzito'],
    answer: {
      en: 'Healthy habits lower the risk of many cancers: avoid tobacco in all forms, limit alcohol, eat plenty of vegetables, fruit, beans and whole grains, limit processed and red meat, keep active (for example a brisk 30-minute walk most days), keep a healthy weight, and store grains dry to avoid mould. During cancer treatment, eating needs can change, so ask the care team or a nutritionist for advice.',
      sw: 'Tabia za afya hupunguza hatari ya saratani nyingi: epuka tumbaku kwa aina zote, punguza pombe, kula mboga, matunda, maharagwe na nafaka zisizokobolewa kwa wingi, punguza nyama iliyosindikwa na nyekundu, fanya mazoezi (kwa mfano kutembea haraka dakika 30 siku nyingi), dumisha uzito unaofaa, na hifadhi nafaka mahali pakavu kuepuka ukungu. Wakati wa matibabu ya saratani mahitaji ya lishe yanaweza kubadilika, kwa hivyo uliza timu ya huduma au mtaalamu wa lishe.',
    },
  },
  {
    id: 'side-effects',
    keywords: ['side effect', 'hair loss', 'nausea', 'vomit', 'tired', 'fatigue', 'after chemo', 'during treatment', 'madhara', 'kupoteza nywele', 'kichefuchefu', 'kutapika', 'uchovu', 'baada ya tibakemikali'],
    answer: {
      en: 'Treatment side effects depend on the treatment and the person. Common ones include tiredness, nausea, hair loss, mouth sores, changes in appetite and a higher chance of infection. Many can be eased with medicines and support, and most improve after treatment ends. Tell your care team about side effects, and get help quickly for fever, bleeding or being unable to eat or drink. Do not stop treatment without talking to them.',
      sw: 'Madhara ya matibabu hutegemea matibabu na mtu. Ya kawaida ni uchovu, kichefuchefu, kupoteza nywele, vidonda mdomoni, mabadiliko ya hamu ya kula na hatari zaidi ya maambukizi. Mengi yanaweza kupunguzwa kwa dawa na msaada, na mengi huisha matibabu yakimalizika. Ieleze timu yako ya huduma kuhusu madhara, na upate msaada haraka kwa homa, kutokwa damu au kushindwa kula au kunywa. Usisimamishe matibabu bila kuzungumza nao.',
    },
  },
  {
    id: 'diagnosis-tests',
    keywords: ['diagnose', 'how is cancer found', 'biopsy', 'scan', 'x-ray', 'ultrasound', 'ct', 'mri', 'blood test', 'kugundua', 'kipimo cha damu', 'kipande cha nyama', 'picha ya ndani'],
    answer: {
      en: 'To find out whether a change is cancer, a health worker may examine you and order tests such as blood tests, ultrasound, X-ray, CT or MRI scans, or a mammogram. A biopsy, where a small sample of tissue is checked in a laboratory, is usually what confirms cancer and its type. A biopsy does not make cancer spread. Ask how and when you will get each result.',
      sw: 'Ili kujua kama mabadiliko ni saratani, mhudumu wa afya anaweza kukuchunguza na kuagiza vipimo kama vya damu, ultrasound, X-ray, CT au MRI, au mamografia. Bayopsi, ambapo kipande kidogo cha tishu hukaguliwa maabara, kwa kawaida ndiyo huthibitisha saratani na aina yake. Bayopsi haisababishi saratani kuenea. Uliza utapata kila matokeo vipi na lini.',
    },
    link: { href: '/learn/#visit-questions', label: { en: 'Prepare questions for your visit', sw: 'Andaa maswali ya ziara yako' } },
  },
  {
    id: 'stages',
    keywords: ['stage', 'stages', 'staging', 'stage 4', 'stage four', 'spread', 'metastasis', 'metastatic', 'hatua ya saratani', 'hatua ya nne', 'kuenea'],
    answer: {
      en: 'The stage describes how large a cancer is and whether it has spread, usually from stage 1 (small and in one place) to stage 4 (spread to other parts of the body). Earlier stages are usually easier to treat, which is why early checks matter. Even at later stages, treatment and palliative care can control symptoms and improve quality of life. Your care team can explain what the stage means for you.',
      sw: 'Hatua ya saratani hueleza ukubwa wake na kama imeenea, kwa kawaida kuanzia hatua ya 1 (ndogo na mahali pamoja) hadi hatua ya 4 (imeenea sehemu nyingine za mwili). Hatua za mwanzo kwa kawaida hutibika kwa urahisi zaidi, ndiyo maana ukaguzi wa mapema ni muhimu. Hata katika hatua za mbele, matibabu na huduma shufaa vinaweza kudhibiti dalili na kuboresha maisha. Timu yako ya huduma inaweza kukueleza hatua yako inamaanisha nini.',
    },
  },
  {
    id: 'contagious',
    keywords: ['contagious', 'catch cancer', 'spread to me', 'infectious', 'can i get it from', 'inaambukiza', 'kuambukizwa', 'ambukiza'],
    answer: {
      en: 'No, cancer is not contagious. You cannot catch cancer by touching, hugging, sharing food or caring for someone who has it. Some infections that can lead to certain cancers, such as HPV and hepatitis B, can pass between people, and vaccines help prevent them. People with cancer need closeness and support.',
      sw: 'Hapana, saratani haiambukizi. Huwezi kupata saratani kwa kumgusa, kumkumbatia, kula pamoja au kumhudumia mtu aliye nayo. Baadhi ya maambukizi yanayoweza kusababisha saratani fulani, kama HPV na homa ya ini B, yanaweza kuambukizana, na chanjo husaidia kuyazuia. Watu wenye saratani wanahitaji ukaribu na msaada.',
    },
    link: { href: '/learn/#myths', label: { en: 'Myths and facts', sw: 'Dhana na ukweli' } },
  },
  {
    id: 'pain',
    keywords: ['painful', 'cancer pain', 'does cancer hurt', 'manage pain', 'maumivu ya saratani', 'inauma'],
    answer: {
      en: 'Early cancer is often painless, so do not wait for pain before getting a change checked. When cancer does cause pain, it can usually be well controlled with the right medicines and care. Tell the care team how strong the pain is and what makes it better or worse, and ask about palliative care services.',
      sw: 'Saratani ya mwanzo mara nyingi haina maumivu, kwa hivyo usisubiri maumivu kabla ya kukaguliwa. Saratani inaposababisha maumivu, kwa kawaida yanaweza kudhibitiwa vizuri kwa dawa na huduma zinazofaa. Ieleze timu ya huduma ukali wa maumivu na kinachoyaongeza au kuyapunguza, na uliza kuhusu huduma shufaa.',
    },
  },
  {
    id: 'survivorship',
    keywords: ['after treatment', 'remission', 'survivor', 'come back', 'recurrence', 'follow up', 'follow-up', 'cured', 'baada ya matibabu', 'kupona', 'kurudi tena', 'ufuatiliaji'],
    answer: {
      en: 'After treatment, regular follow-up visits help check recovery and catch any return early. Report new or lasting symptoms between visits. Many people return to work, family and community life, sometimes with adjustments. Healthy habits, emotional support and support groups can help. Ask your care team for a follow-up plan.',
      sw: 'Baada ya matibabu, ziara za ufuatiliaji za mara kwa mara husaidia kukagua kupona na kugundua mapema ikiwa saratani inarudi. Ripoti dalili mpya au zinazoendelea kati ya ziara. Watu wengi hurudi kazini, kwa familia na maisha ya jamii, wakati mwingine kwa marekebisho. Tabia za afya, msaada wa kihisia na vikundi vya msaada vinaweza kusaidia. Omba timu yako ya huduma mpango wa ufuatiliaji.',
    },
  },
  {
    id: 'liver-cancer',
    keywords: ['liver', 'liver cancer', 'hepatitis', 'aflatoxin', 'ini', 'saratani ya ini', 'homa ya ini'],
    answer: {
      en: 'Liver cancer is linked to long-term hepatitis B or C infection, heavy alcohol use and aflatoxin, a poison from mould on poorly stored maize and groundnuts. The hepatitis B vaccine, testing and treatment for hepatitis, limiting alcohol and keeping grains dry lower the risk. Signs can include pain or swelling in the upper right belly, yellow eyes or skin, and weight loss.',
      sw: 'Saratani ya ini inahusishwa na maambukizi ya muda mrefu ya homa ya ini B au C, unywaji mwingi wa pombe na aflatoksini, sumu ya ukungu kwenye mahindi na njugu zilizohifadhiwa vibaya. Chanjo ya homa ya ini B, kupima na kutibu homa ya ini, kupunguza pombe na kuhifadhi nafaka mahali pakavu hupunguza hatari. Dalili zinaweza kuwa maumivu au uvimbe upande wa juu kulia wa tumbo, macho au ngozi kuwa njano, na kupungua uzito.',
    },
  },
];
