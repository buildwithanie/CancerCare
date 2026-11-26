export type Language = 'en' | 'sw';

type Program = {
  title: string;
  description: string;
  label: string;
};

type Step = {
  title: string;
  description: string;
};

export type Copy = {
  navigation: { mission: string; work: string; pilot: string; directory: string; plan: string };
  status: string;
  hero: {
    eyebrow: string;
    title: string;
    emphasis: string;
    description: string;
    primaryAction: string;
    secondaryAction: string;
    imageAlt: string;
  };
  principles: [string, string, string];
  mission: {
    kicker: string;
    title: string;
    description: string;
    quote: string;
    quoteAttribution: string;
    imageAlt: string;
  };
  work: {
    kicker: string;
    title: string;
    programs: Program[];
  };
  learn: {
    kicker: string;
    title: string;
    introduction: string;
    items: { id?: string; question: string; answer: string; source?: { label: string; url: string } }[];
    sourceLabel: string;
    reviewStatus: string;
    guideAction: string;
  };
  learnPage: {
    eyebrow: string;
    title: string;
    description: string;
    backHome: string;
    steps: [string, string, string];
  };
  screening: {
    kicker: string;
    title: string;
    introduction: string;
    privacyNote: string;
    questionsTitle: string;
    directoryAction: string;
    reviewStatus: string;
    sourcesTitle: string;
    kenyaSource: string;
    whoSource: string;
    paths: {
      id: 'considering' | 'symptoms' | 'results';
      label: string;
      heading: string;
      explanation: string;
      questions: [string, string, string];
    }[];
  };
  pilot: {
    kicker: string;
    title: string;
    description: string;
    steps: Step[];
    mapKicker: string;
    mapTitle: string;
    mapAlt: string;
    mapSource: string;
    action: string;
  };
  directory: {
    kicker: string;
    title: string;
    description: string;
    sourceLink: string;
    status: string;
    emptyTitle: string;
    emptyDescription: string;
    fieldsTitle: string;
    fields: [string, string, string, string];
    servicesLabel: string;
    accessLabel: string;
    verifiedLabel: string;
  };
  findCarePage: {
    eyebrow: string;
    title: string;
    description: string;
    backHome: string;
    status: string;
    processTitle: string;
    processIntro: string;
    steps: [Step, Step, Step];
  };
  howPage: {
    eyebrow: string;
    title: string;
    description: string;
    backHome: string;
    stateTitle: string;
    availableLabel: string;
    availableText: string;
    pendingLabel: string;
    pendingText: string;
    processKicker: string;
    processTitle: string;
    processIntro: string;
    stepStates: [string, string, string];
    steps: [Step, Step, Step];
    readinessKicker: string;
    readinessTitle: string;
    readinessIntro: string;
    checks: [Step, Step, Step];
    exploreLearn: string;
    exploreCare: string;
  };
  getInvolvedPage: {
    eyebrow: string;
    title: string;
    description: string;
    backHome: string;
    imageAlt: string;
    formKicker: string;
    formTitle: string;
    formIntro: string;
    topicLegend: string;
    topics: [{ id: 'idea'; title: string; description: string }, { id: 'facility'; title: string; description: string }, { id: 'collaborate'; title: string; description: string }];
    replyEmailLabel: string;
    replyEmailHint: string;
    replyEmailError: string;
    messageLabel: string;
    messagePlaceholder: string;
    messageHint: string;
    messageError: string;
    charactersLabel: string;
    sendAction: string;
    sendingLabel: string;
    sentTitle: string;
    sentText: string;
    anotherAction: string;
    sendError: string;
    checkingLabel: string;
    unavailableTitle: string;
    unavailableText: string;
    directEmailAction: string;
    sideTitle: string;
    safetyTitle: string;
    safetyText: string;
    privacyText: string;
    privacyLink: string;
  };
  participation: {
    kicker: string;
    title: string;
    description: string;
    note: string;
    action: string;
    diagram: { people: string; health: string; community: string; outcome: string };
  };
  assistant: {
    open: string;
    close: string;
    title: string;
    subtitle: string;
    greeting: string;
    notice: string;
    placeholder: string;
    send: string;
    thinking: string;
    offline: string;
    error: string;
    restart: string;
    human: string;
    suggestions: [string, string, string, string];
  };
  visitPlanner: {
    kicker: string;
    title: string;
    introduction: string;
    privacyNote: string;
    groups: { title: string; questions: string[] }[];
    customLabel: string;
    customPlaceholder: string;
    addAction: string;
    selectedTitle: string;
    emptySelection: string;
    remove: string;
    printAction: string;
    copyAction: string;
    copiedLabel: string;
    whatsappAction: string;
    listHeading: string;
  };
  myths: {
    kicker: string;
    title: string;
    introduction: string;
    mythLabel: string;
    factLabel: string;
    reveal: string;
    hide: string;
    reviewStatus: string;
    items: { myth: string; fact: string }[];
  };
  partners: { partnersKicker: string; partnersTitle: string; sourcesKicker: string; sourcesTitle: string; becomePartner: string; pause: string; play: string };
  awareness: {
    kicker: string;
    title: string;
    introduction: string;
    nowLabel: string;
    askAction: string;
    items: { month: number; when: string; title: string; text: string; question: string }[];
  };
  share: { title: string; whatsapp: string; copy: string; copied: string };
  notFound: { title: string; description: string; home: string; learn: string };
  footer: {
    line: string;
    notice: string;
  };
};

export const copy = {
  en: {
    navigation: {
      mission: 'Our mission',
      work: 'Cancer education',
      pilot: 'How it works',
      directory: 'Find care',
      plan: 'Get involved',
    },
    status: 'In development',
    hero: {
      eyebrow: 'Cancer information and care in Embu',
      title: 'Clearer information.',
      emphasis: 'Closer cancer care.',
      description: 'CancerCare is building clear cancer information and a guide to verified services, starting in Embu County.',
      primaryAction: 'Explore our approach',
      secondaryAction: 'How it works',
      imageAlt: 'Illustration of a woman in a green headscarf smiling with a supportive clinician',
    },
    principles: ['Clear information', 'Verified services', 'Community input'],
    mission: {
      kicker: 'Our mission',
      title: 'Make cancer care easier to understand and access.',
      description: 'We are building a place for clear, local information so people in Embu can understand their options and find appropriate care when services are verified.',
      quote: 'Listen first. Build around people seeking care.',
      quoteAttribution: 'Our guiding principle',
      imageAlt: 'AI-generated scene of two adults reading a health information booklet outdoors',
    },
    work: {
      kicker: 'Our focus',
      title: 'What we are building',
      programs: [
        {
          title: 'Understand cancer',
          description: 'Explore short, source-linked guides in English and Kiswahili.',
          label: 'Guide preview',
        },
        {
          title: 'Find care',
          description: 'A directory of verified Embu services is being prepared.',
          label: 'In development',
        },
        {
          title: 'Navigate care',
          description: 'Planned guidance for visits, referrals and follow-up.',
          label: 'Planned',
        },
        {
          title: 'Get support',
          description: 'Community input will help shape practical resources.',
          label: 'Planned',
        },
      ],
    },
    learn: {
      kicker: 'Cancer education',
      title: 'Start with clear answers.',
      introduction: 'Short answers based on World Health Organization, GLOBOCAN and Kenya Ministry of Health information. This is general education, not a diagnosis or personal medical advice.',
      items: [
        { question: 'What is cancer?', answer: 'Cancer is a group of diseases in which abnormal cells grow and may spread to nearby tissue or other parts of the body.' },
        { question: 'What is screening?', answer: 'Screening looks for signs of certain cancers before symptoms appear. If you notice an unusual change in your health, speak with a health professional about an assessment.' },
        { question: 'What if a screening result suggests a problem?', answer: 'A screening result does not confirm cancer. Further tests are needed to establish a diagnosis and guide the next step.' },
        { id: 'common-cancers', question: 'Which cancers are most common in Kenya?', answer: 'Breast, cervical, prostate, oesophageal (food pipe) and colorectal (bowel) cancers are the most common in Kenya. Breast and cervical cancer mostly affect women, prostate cancer affects men, and oesophageal and colorectal cancer affect both.', source: { label: 'GLOBOCAN Kenya fact sheet', url: 'https://gco.iarc.who.int/media/globocan/factsheets/populations/404-kenya-fact-sheet.pdf' } },
        { question: 'Which changes should I get checked?', answer: 'A new lump or swelling; unusual bleeding (between periods, after sex, or blood in urine, stool or cough); a cough, hoarse voice or difficulty swallowing that does not go away; weight loss without trying; a sore that does not heal; or changes in bowel or urine habits. Most are caused by something less serious, but early checks matter.' },
        { question: 'How can cervical cancer be prevented?', answer: 'The HPV vaccine protects against the virus behind most cervical cancer. In Kenya it is free for girls aged 10 to 14, and one dose is enough for this age group. Women can also ask a health professional about cervical screening, which can find changes before they become cancer.', source: { label: 'WHO Africa: Kenya single-dose HPV vaccination', url: 'https://afro.who.int/pt/node/22661' } },
        { id: 'paying-for-care', question: 'How can I pay for cancer care?', answer: 'The Social Health Authority (SHA), which replaced NHIF, has a cancer benefit package. Covered services and limits can change, so register early and ask the SHA desk at the facility or SHA itself what is covered before treatment starts.', source: { label: 'Social Health Authority', url: 'https://sha.go.ke' } },
      ],
      sourceLabel: 'Read the WHO cancer fact sheet',
      reviewStatus: 'Local clinical review pending',
      guideAction: 'Explore the screening guide',
    },
    learnPage: {
      eyebrow: 'Learn with CancerCare',
      title: 'Understand cancer at your pace.',
      description: 'Start with simple answers, explore screening, and take useful questions to a health professional. Each guide shows its sources and review status.',
      backHome: 'Back to home',
      steps: ['Cancer basics', 'Screening guide', 'Questions for care'],
    },
    screening: {
      kicker: 'Screening guide',
      title: 'Find the information that fits your question.',
      introduction: 'Choose a topic to see a short explanation and questions you can take to a health professional. This guide does not decide which test you need.',
      privacyNote: 'Your choice stays on this page and is not saved.',
      questionsTitle: 'Questions you could ask',
      directoryAction: 'See directory progress',
      reviewStatus: 'Educational preview · local clinical review pending',
      sourcesTitle: 'Sources for this guide',
      kenyaSource: 'Kenya Ministry of Health screening guidelines (2024)',
      whoSource: 'WHO cancer fact sheet',
      paths: [
        { id: 'considering', label: 'I want to learn about screening', heading: 'Screening is for people without symptoms.', explanation: 'Screening looks for findings that may suggest certain cancers or pre-cancer before symptoms appear. The appropriate test depends on age, risk and clinical guidance. A health professional can help you understand your options.', questions: ['Is screening recommended for me, and why?', 'How will I receive my result?', 'What happens if further tests are needed?'] },
        { id: 'symptoms', label: 'I have noticed a change in my health', heading: 'Ask for a clinical assessment.', explanation: 'Screening and assessment are different. If you notice an unusual change, speak with a health professional about an assessment rather than waiting for routine screening.', questions: ['Where can I be assessed?', 'What information should I bring?', 'How will I know the next step?'] },
        { id: 'results', label: 'I have a screening result', heading: 'Understand the follow-up.', explanation: 'A screening result suggesting an abnormality does not by itself confirm cancer. Further tests may be needed. Ask the service that performed your test to explain the result and recommended follow-up.', questions: ['What does my result mean?', 'Do I need any further tests?', 'Who should I contact about follow-up?'] },
      ],
    },
    pilot: {
      kicker: 'Starting in Embu, Kenya',
      title: 'Building a clearer picture of local cancer care.',
      description: 'We will work with providers and community members to map, verify and explain services people can rely on.',
      mapKicker: 'Pilot area',
      mapTitle: 'Embu County, Kenya',
      mapAlt: 'Map showing the Embu County boundary and its highlighted location within Kenya',
      mapSource: 'Boundary data (2020):',
      action: 'See the pilot plan',
      steps: [
        { title: 'Listen', description: 'Understand local needs and available services.' },
        { title: 'Verify', description: 'Confirm facility details with records and providers.' },
        { title: 'Improve', description: 'Test and refine information before release.' },
      ],
    },
    directory: {
      kicker: 'Verified local care',
      title: 'A trusted care directory for Embu.',
      description: 'We are checking cancer care services before adding them to the directory.',
      sourceLink: 'Browse the public registry (no account needed)',
      status: 'Verification in progress',
      emptyTitle: 'No listings yet',
      emptyDescription: 'We will add a facility after confirming its services, location and contact details with the provider.',
      fieldsTitle: 'Each listing will show',
      fields: ['Facility and location', 'Services and access', 'Contact and source', 'Last verification date'],
      servicesLabel: 'Confirmed services',
      accessLabel: 'Appointments and referrals',
      verifiedLabel: 'Provider confirmed:',
    },
    findCarePage: {
      eyebrow: 'Find care in Embu',
      title: 'A local directory, built on confirmed details.',
      description: 'CancerCare is checking facility services, contact routes and how patients can access care. Listings will appear here only after direct provider confirmation.',
      backHome: 'Back to home',
      status: 'Facility verification in progress',
      processTitle: 'How a facility becomes a listing',
      processIntro: 'A public record helps us identify a facility. We then check the details people need before showing it as a care option.',
      steps: [
        { title: 'Identify', description: 'Check public facility records and record the source.' },
        { title: 'Confirm', description: 'Ask the provider about current services, access and a working contact route.' },
        { title: 'Publish', description: 'Show only confirmed details with the date they were checked.' },
      ],
    },
    howPage: {
      eyebrow: 'The Embu pilot',
      title: 'How CancerCare is taking shape.',
      description: 'This is a website preview, not a running care service. The learning guide can be explored now. Local service listings are still being prepared, and feedback can be sent by email.',
      backHome: 'Back to home',
      stateTitle: 'Where things stand',
      availableLabel: 'Available to explore',
      availableText: 'An English and Kiswahili learning guide, awaiting local clinical review.',
      pendingLabel: 'Still being prepared',
      pendingText: 'Verified facility listings and locally tested care guidance.',
      processKicker: 'Proposed process',
      processTitle: 'Listen. Verify. Improve.',
      processIntro: 'These are the steps planned for the Embu pilot. We will show progress as each one is completed.',
      stepStates: ['Planned', 'Initial research', 'Planned'],
      steps: [
        { title: 'Listen to local needs', description: 'Ask people seeking care, community groups and health professionals which questions and access problems the site should address. No findings are published here yet.' },
        { title: 'Check each claim', description: 'Use public sources to identify facilities, then confirm current services, access and contact details directly with providers. Have health content reviewed locally before release.' },
        { title: 'Test and improve', description: 'Ask Embu users to try the pages in English and Kiswahili. Correct confusing language and outdated details, and show when information was last checked.' },
      ],
      readinessKicker: 'Before wider use',
      readinessTitle: 'What still needs to happen',
      readinessIntro: 'The preview is useful for reviewing the idea. These checks are needed before presenting it as a dependable local care resource.',
      checks: [
        { title: 'Clinical review', description: 'A qualified local reviewer checks the educational wording and translations.' },
        { title: 'Provider confirmation', description: 'The first Embu facility confirms its services, patient access and working contact route.' },
        { title: 'Community testing', description: 'People in Embu try the site and help us fix unclear or missing information.' },
      ],
      exploreLearn: 'Explore the learning guide',
      exploreCare: 'See directory progress',
    },
    getInvolvedPage: {
      eyebrow: 'Get in touch',
      title: 'Your ideas can make care clearer.',
      description: 'Tell us what to improve, share a public facility detail to check, or offer to help with the Embu pilot.',
      backHome: 'Back to home',
      imageAlt: 'Two people looking through a printed guide together',
      formKicker: 'A note to the team',
      formTitle: 'Send a message',
      formIntro: 'Choose a topic and write a short note. Your email is optional.',
      topicLegend: 'What is your message about?',
      topics: [
        { id: 'idea', title: 'Website feedback', description: 'Something to improve' },
        { id: 'facility', title: 'Facility detail', description: 'Public information to check' },
        { id: 'collaborate', title: 'Work together', description: 'Review or test the pilot' },
      ],
      replyEmailLabel: 'Your email address',
      replyEmailHint: 'Optional. Include it if you would like a reply.',
      replyEmailError: 'Enter a valid email address or leave this blank.',
      messageLabel: 'Your message',
      messagePlaceholder: 'Tell us what you noticed or would like us to improve…',
      messageHint: 'At least 10 characters. Do not include names or private health details.',
      messageError: 'Write 10–800 characters before sending.',
      charactersLabel: 'characters',
      sendAction: 'Send to CancerCare',
      sendingLabel: 'Sending…',
      sentTitle: 'Message accepted',
      sentText: 'The mail service accepted your note for the CancerCare inbox. Thank you for helping us improve the project.',
      anotherAction: 'Write another message',
      sendError: 'Your message was not sent. Please try again later or use the email address on this page.',
      checkingLabel: 'Checking the mail connection…',
      unavailableTitle: 'Online sending is being connected',
      unavailableText: 'You can write your note here, but Send will work once the project mailbox is connected.',
      directEmailAction: 'Email the project directly',
      sideTitle: 'Reach the CancerCare team',
      safetyTitle: 'Project messages only',
      safetyText: 'Use this form for website feedback, public service details or collaboration. It is not for medical advice, appointments or emergencies.',
      privacyText: 'The project mailbox receives your message and optional email address. Please leave out private health information.',
      privacyLink: 'Read our privacy notice',
    },
    participation: {
      kicker: 'Working together',
      title: 'Build with the community',
      description: 'Health professionals, community groups and people with lived experience can help shape and check this service.',
      note: 'You can now send project feedback by email.',
      action: 'Share an idea',
      diagram: {
        people: "People's voices",
        health: 'Health expertise',
        community: 'Community',
        outcome: 'Clearer care information, together.',
      },
    },
    assistant: {
      open: 'Ask CancerCare',
      close: 'Close chat',
      title: 'CancerCare assistant',
      subtitle: 'General information · not medical advice',
      greeting: 'Hello, and welcome! I can answer general questions about cancer, warning signs, screening, the HPV vaccine, SHA cover and this project, in English or Kiswahili. What would you like to know?',
      notice: 'Please do not share names or private health details. This chat is kept only in this browser tab. In an emergency call 999 or 112.',
      placeholder: 'Type your question…',
      send: 'Send',
      thinking: 'Thinking…',
      offline: 'Quick answers mode',
      error: 'Something went wrong, so here is a quick answer instead.',
      restart: 'Start over',
      human: 'Message the team',
      suggestions: ['What is cancer?', 'Warning signs to check', 'Is the HPV vaccine free?', 'Where can I find care in Embu?'],
    },
    visitPlanner: {
      kicker: 'Prepare for a visit',
      title: 'Build your list of questions.',
      introduction: 'Choose questions to take to a health professional, or add your own. Print the list, copy it or send it to yourself on WhatsApp.',
      privacyNote: 'Your list stays on this device and disappears when you leave the page.',
      groups: [
        { title: 'About screening', questions: ['Is screening recommended for me, and why?', 'How will I receive my result?', 'What happens if further tests are needed?'] },
        { title: 'About a change I noticed', questions: ['Where can I be assessed?', 'What should I tell the health professional about the change?', 'When should I come back if it does not improve?'] },
        { title: 'About a result', questions: ['What does my result mean?', 'Do I need more tests?', 'Who should I contact about the next step?'] },
      ],
      customLabel: 'Add your own question',
      customPlaceholder: 'For example: Can someone come with me?',
      addAction: 'Add',
      selectedTitle: 'My questions',
      emptySelection: 'Tick a question to add it to your list.',
      remove: 'Remove',
      printAction: 'Print',
      copyAction: 'Copy',
      copiedLabel: 'Copied',
      whatsappAction: 'WhatsApp',
      listHeading: 'Questions for my health visit (CancerCare)',
    },
    myths: {
      kicker: 'Myths and facts',
      title: 'Check what you have heard.',
      introduction: 'Tap a card to see what the evidence says.',
      mythLabel: 'Myth',
      factLabel: 'Fact',
      reveal: 'Show the fact',
      hide: 'Show the myth',
      reviewStatus: 'Based on WHO information · local clinical review pending',
      items: [
        { myth: 'Cancer spreads from person to person like a cold.', fact: 'Cancer itself is not contagious. Some infections that can lead to cancer, such as HPV and hepatitis B, can pass between people, and vaccines help prevent them.' },
        { myth: 'A cancer diagnosis always means death.', fact: 'Many cancers can be cured if they are found early and treated effectively. Early assessment matters.' },
        { myth: 'Nothing can be done to lower cancer risk.', fact: 'WHO estimates that 30–50% of cancers can be prevented, for example by avoiding tobacco, limiting alcohol and getting recommended vaccines.' },
        { myth: 'Screening is only for people who already feel sick.', fact: 'Screening is for people without symptoms. If you have noticed a change, ask for an assessment instead of waiting.' },
      ],
    },
    partners: { partnersKicker: 'Our partners', partnersTitle: 'Working together for clearer cancer care', sourcesKicker: 'Trusted information', sourcesTitle: 'Our guides draw on these public sources', becomePartner: 'Become a partner', pause: 'Pause scrolling', play: 'Resume scrolling' },
    awareness: {
      kicker: 'Awareness through the year',
      title: 'A good month to talk about it.',
      introduction: 'These yearly awareness moments are a reminder to learn, get checked and support each other. Tap one to ask the assistant.',
      nowLabel: 'This month',
      askAction: 'Ask the assistant',
      items: [
        { month: 1, when: 'January', title: 'Cervical Cancer Awareness Month', text: 'HPV vaccination for girls and screening for women.', question: 'How can cervical cancer be prevented?' },
        { month: 2, when: '4 February', title: 'World Cancer Day', text: 'A global day to raise awareness and act on cancer.', question: 'What are the warning signs of cancer?' },
        { month: 9, when: 'September', title: 'Childhood Cancer Awareness Month', text: 'Children can get cancer, and many can be cured.', question: 'Can children get cancer?' },
        { month: 10, when: 'October', title: 'Breast Cancer Awareness Month', text: 'Know what is normal for your breasts and get changes checked.', question: 'What are the signs of breast cancer?' },
        { month: 11, when: 'November', title: "Men's health and prostate cancer", text: 'Movember encourages men to talk about prostate health.', question: 'Tell me about prostate cancer' },
      ],
    },
    share: { title: 'Share this page', whatsapp: 'Share on WhatsApp', copy: 'Copy link', copied: 'Link copied' },
    notFound: { title: 'We could not find that page.', description: 'The link may be old or mistyped. You can return home or explore the learning guide.', home: 'Go to home', learn: 'Learn about cancer' },
    footer: {
      line: 'Clearer information, starting in Embu.',
      notice: 'Project preview. CancerCare does not yet offer medical advice, referrals or facility listings.',
    },
  },
  sw: {
    navigation: {
      mission: 'Dhamira yetu',
      work: 'Elimu ya saratani',
      pilot: 'Inavyofanya kazi',
      directory: 'Tafuta huduma',
      plan: 'Shiriki',
    },
    status: 'Mradi unaendelezwa',
    hero: {
      eyebrow: 'Taarifa za saratani na huduma Embu',
      title: 'Taarifa zilizo wazi.',
      emphasis: 'Huduma karibu zaidi.',
      description: 'CancerCare inaandaa taarifa wazi kuhusu saratani na mwongozo wa huduma zilizothibitishwa, tukianzia Kaunti ya Embu.',
      primaryAction: 'Chunguza njia yetu',
      secondaryAction: 'Inavyofanya kazi',
      imageAlt: 'Taswira ya mwanamke aliyevaa kitambaa cha kijani kichwani akitabasamu na mhudumu wa afya',
    },
    principles: ['Taarifa zilizo wazi', 'Huduma zilizothibitishwa', 'Maoni ya jamii'],
    mission: {
      kicker: 'Dhamira yetu',
      title: 'Kurahisisha kuelewa na kupata huduma za saratani.',
      description: 'Tunajenga mahali pa kupata taarifa wazi za eneo ili watu wa Embu waelewe chaguo zao na wapate huduma zinazofaa baada ya kuthibitishwa.',
      quote: 'Sikiliza kwanza. Jenga kwa ajili ya wanaotafuta huduma.',
      quoteAttribution: 'Kanuni yetu',
      imageAlt: 'Taswira iliyotengenezwa kwa AI ya watu wawili wakisoma kijitabu cha taarifa za afya nje',
    },
    work: {
      kicker: 'Tunacholenga',
      title: 'Tunachojenga',
      programs: [
        {
          title: 'Fahamu saratani',
          description: 'Soma miongozo mifupi yenye vyanzo kwa Kiingereza na Kiswahili.',
          label: 'Mwongozo wa awali',
        },
        {
          title: 'Tafuta huduma',
          description: 'Orodha ya huduma zilizothibitishwa Embu inaandaliwa.',
          label: 'Orodha inaandaliwa',
        },
        {
          title: 'Fuata hatua za huduma',
          description: 'Mwongozo kuhusu miadi, rufaa na ufuatiliaji unapangwa.',
          label: 'Inapangwa',
        },
        {
          title: 'Pata msaada',
          description: 'Maoni ya jamii yatasaidia kuunda nyenzo zinazofaa.',
          label: 'Inapangwa',
        },
      ],
    },
    learn: {
      kicker: 'Elimu ya saratani',
      title: 'Anza na majibu yaliyo wazi.',
      introduction: 'Majibu mafupi yanayotegemea taarifa za Shirika la Afya Duniani, GLOBOCAN na Wizara ya Afya ya Kenya. Hizi ni taarifa za jumla, si utambuzi au ushauri wa afya wa mtu binafsi.',
      items: [
        { question: 'Saratani ni nini?', answer: 'Saratani ni kundi la magonjwa ambapo seli zisizo za kawaida hukua na zinaweza kuenea kwenye tishu zilizo karibu au sehemu nyingine za mwili.' },
        { question: 'Uchunguzi wa mapema ni nini?', answer: 'Uchunguzi wa mapema hutafuta viashiria vya aina fulani za saratani kabla ya dalili kujitokeza. Ukiona mabadiliko yasiyo ya kawaida katika afya yako, zungumza na mhudumu wa afya kuhusu kupimwa.' },
        { question: 'Matokeo ya uchunguzi yakidokeza tatizo?', answer: 'Matokeo ya uchunguzi hayathibitishi saratani. Vipimo zaidi vinahitajika ili kuthibitisha hali na kuamua hatua inayofuata.' },
        { id: 'common-cancers', question: 'Ni saratani zipi zinazotokea zaidi Kenya?', answer: 'Saratani za matiti, shingo ya kizazi, tezi dume, umio (njia ya chakula) na utumbo mpana ndizo zinazotokea zaidi Kenya. Saratani za matiti na shingo ya kizazi huwapata zaidi wanawake, ya tezi dume huwapata wanaume, na za umio na utumbo huwapata wote.', source: { label: 'GLOBOCAN: taarifa ya Kenya', url: 'https://gco.iarc.who.int/media/globocan/factsheets/populations/404-kenya-fact-sheet.pdf' } },
        { question: 'Ni mabadiliko gani ninapaswa kukaguliwa?', answer: 'Uvimbe mpya; kutokwa damu isivyo kawaida (kati ya hedhi, baada ya tendo la ndoa, au damu kwenye mkojo, choo au makohozi); kikohozi, sauti kukwaruza au shida ya kumeza isiyoisha; kupungua uzito bila kujaribu; kidonda kisichopona; au mabadiliko ya choo au mkojo. Mara nyingi husababishwa na jambo dogo, lakini kukaguliwa mapema ni muhimu.' },
        { question: 'Saratani ya shingo ya kizazi inazuiwaje?', answer: 'Chanjo ya HPV hukinga dhidi ya virusi vinavyosababisha saratani nyingi za shingo ya kizazi. Nchini Kenya ni bure kwa wasichana wa miaka 10 hadi 14, na dozi moja inatosha kwa umri huu. Wanawake pia wanaweza kumuuliza mhudumu wa afya kuhusu uchunguzi wa shingo ya kizazi, unaoweza kugundua mabadiliko kabla hayajawa saratani.', source: { label: 'WHO Afrika: chanjo ya HPV ya dozi moja Kenya', url: 'https://afro.who.int/pt/node/22661' } },
        { id: 'paying-for-care', question: 'Ninawezaje kulipia huduma za saratani?', answer: 'Mamlaka ya Afya ya Jamii (SHA), iliyochukua nafasi ya NHIF, ina kifurushi cha huduma za saratani. Huduma zinazogharamiwa na viwango vinaweza kubadilika, kwa hivyo jisajili mapema na uliza dawati la SHA kituoni au SHA yenyewe kabla ya matibabu kuanza.', source: { label: 'Mamlaka ya Afya ya Jamii (SHA)', url: 'https://sha.go.ke' } },
      ],
      sourceLabel: 'Soma taarifa ya WHO kuhusu saratani',
      reviewStatus: 'Ukaguzi wa mtaalamu wa afya wa eneo unasubiriwa',
      guideAction: 'Chunguza mwongozo wa uchunguzi',
    },
    learnPage: {
      eyebrow: 'Jifunze na CancerCare',
      title: 'Elewa saratani kwa mwendo wako.',
      description: 'Anza na majibu rahisi, elewa uchunguzi, na andaa maswali ya kumuuliza mhudumu wa afya. Kila mwongozo unaonyesha vyanzo na hali ya ukaguzi.',
      backHome: 'Rudi mwanzo',
      steps: ['Misingi ya saratani', 'Mwongozo wa uchunguzi', 'Maswali ya huduma'],
    },
    screening: {
      kicker: 'Mwongozo wa uchunguzi',
      title: 'Pata taarifa zinazolingana na swali lako.',
      introduction: 'Chagua mada upate maelezo mafupi na maswali ya kumuuliza mhudumu wa afya. Mwongozo huu hauamui ni kipimo gani unahitaji.',
      privacyNote: 'Chaguo lako linabaki kwenye ukurasa huu na halihifadhiwi.',
      questionsTitle: 'Maswali unayoweza kuuliza',
      directoryAction: 'Tazama maendeleo ya orodha ya vituo',
      reviewStatus: 'Mwongozo wa awali · ukaguzi wa mtaalamu wa afya wa eneo unasubiriwa',
      sourcesTitle: 'Vyanzo vya mwongozo huu',
      kenyaSource: 'Mwongozo wa uchunguzi wa Wizara ya Afya Kenya (2024)',
      whoSource: 'Taarifa ya WHO kuhusu saratani',
      paths: [
        { id: 'considering', label: 'Nataka kujua kuhusu uchunguzi', heading: 'Uchunguzi huu ni kwa watu wasio na dalili.', explanation: 'Uchunguzi hutafuta viashiria vinavyoweza kuonyesha aina fulani za saratani au hali zinazoweza kuwa saratani kabla ya dalili kujitokeza. Kipimo kinachofaa hutegemea umri, hatari na mwongozo wa afya. Mhudumu wa afya anaweza kukusaidia kuelewa chaguo zako.', questions: ['Je, uchunguzi unapendekezwa kwangu, na kwa nini?', 'Nitapata matokeo yangu kwa njia gani?', 'Nini kitafuata ikiwa vipimo zaidi vinahitajika?'] },
        { id: 'symptoms', label: 'Nimeona mabadiliko katika afya yangu', heading: 'Omba tathmini ya mhudumu wa afya.', explanation: 'Uchunguzi wa watu wasio na dalili na tathmini ya dalili ni tofauti. Ukiona mabadiliko yasiyo ya kawaida, zungumza na mhudumu wa afya kuhusu tathmini badala ya kusubiri uchunguzi wa kawaida.', questions: ['Ninaweza kufanyiwa tathmini wapi?', 'Ni taarifa gani ninazopaswa kuleta?', 'Nitajuaje hatua inayofuata?'] },
        { id: 'results', label: 'Nina matokeo ya uchunguzi', heading: 'Elewa hatua za ufuatiliaji.', explanation: 'Matokeo ya uchunguzi yanayodokeza hali isiyo ya kawaida hayathibitishi saratani. Vipimo zaidi vinaweza kuhitajika. Uliza kituo kilichokupima kikueleze matokeo na ufuatiliaji unaopendekezwa.', questions: ['Matokeo yangu yanamaanisha nini?', 'Je, ninahitaji vipimo zaidi?', 'Niwasiliane na nani kuhusu ufuatiliaji?'] },
      ],
    },
    pilot: {
      kicker: 'Tunaanzia Embu, Kenya',
      title: 'Kujenga picha iliyo wazi ya huduma za saratani eneo letu.',
      description: 'Tutashirikiana na watoa huduma na jamii kutambua, kuthibitisha na kueleza huduma ambazo watu wanaweza kutegemea.',
      mapKicker: 'Eneo la majaribio',
      mapTitle: 'Kaunti ya Embu, Kenya',
      mapAlt: 'Ramani inayoonyesha mpaka wa Kaunti ya Embu na mahali pake palipoangaziwa nchini Kenya',
      mapSource: 'Taarifa za mipaka (2020):',
      action: 'Tazama mpango wa majaribio',
      steps: [
        { title: 'Sikiliza', description: 'Fahamu mahitaji ya eneo na huduma zilizopo.' },
        { title: 'Thibitisha', description: 'Kagua taarifa za vituo na watoa huduma.' },
        { title: 'Boresha', description: 'Jaribu na boresha taarifa kabla ya uzinduzi.' },
      ],
    },
    directory: {
      kicker: 'Huduma za eneo zilizothibitishwa',
      title: 'Orodha ya huduma inayoaminika kwa Embu.',
      description: 'Tunakagua huduma za saratani kabla ya kuziongeza kwenye orodha.',
      sourceLink: 'Tazama sajili ya umma (huhitaji akaunti)',
      status: 'Uthibitishaji unaendelea',
      emptyTitle: 'Hakuna vituo kwenye orodha bado',
      emptyDescription: 'Tutaongeza kituo baada ya kuthibitisha huduma, eneo na mawasiliano yake na mtoa huduma.',
      fieldsTitle: 'Kila kituo kitaonyesha',
      fields: ['Jina na eneo la kituo', 'Huduma na jinsi ya kuzipata', 'Mawasiliano na chanzo', 'Tarehe ya ukaguzi wa mwisho'],
      servicesLabel: 'Huduma zilizothibitishwa',
      accessLabel: 'Miadi na rufaa',
      verifiedLabel: 'Mtoa huduma amethibitisha:',
    },
    findCarePage: {
      eyebrow: 'Tafuta huduma Embu',
      title: 'Orodha ya eneo inayojengwa kwa taarifa zilizothibitishwa.',
      description: 'CancerCare inakagua huduma za vituo, njia za mawasiliano na jinsi wagonjwa wanavyoweza kupata huduma. Kituo kitaonyeshwa hapa baada tu ya mtoa huduma kuthibitisha taarifa zake moja kwa moja.',
      backHome: 'Rudi mwanzo',
      status: 'Uthibitishaji wa vituo unaendelea',
      processTitle: 'Jinsi kituo kinavyoongezwa kwenye orodha',
      processIntro: 'Sajili ya umma hutusaidia kutambua kituo. Kisha tunakagua taarifa ambazo watu wanahitaji kabla ya kukionyesha kama chaguo la huduma.',
      steps: [
        { title: 'Tambua', description: 'Kagua sajili za umma za vituo na rekodi chanzo.' },
        { title: 'Thibitisha', description: 'Muulize mtoa huduma kuhusu huduma zilizopo, jinsi ya kuzipata na mawasiliano yanayofanya kazi.' },
        { title: 'Onyesha', description: 'Onyesha taarifa zilizothibitishwa pekee pamoja na tarehe zilipokaguliwa.' },
      ],
    },
    howPage: {
      eyebrow: 'Majaribio ya Embu',
      title: 'Jinsi CancerCare inavyojengwa.',
      description: 'Huu ni muonekano wa awali wa tovuti, si huduma ya afya inayoendelea. Mwongozo wa kujifunza unaweza kutazamwa sasa. Orodha ya vituo bado inaandaliwa, na maoni yanaweza kutumwa kwa barua pepe.',
      backHome: 'Rudi mwanzo',
      stateTitle: 'Tulipofikia',
      availableLabel: 'Unaweza kutazama sasa',
      availableText: 'Mwongozo wa kujifunza kwa Kiingereza na Kiswahili; bado unasubiri ukaguzi wa wataalamu wa afya wa eneo.',
      pendingLabel: 'Bado vinaandaliwa',
      pendingText: 'Orodha ya vituo vilivyothibitishwa na mwongozo wa huduma uliojaribiwa na jamii.',
      processKicker: 'Mpango wa majaribio',
      processTitle: 'Sikiliza. Thibitisha. Boresha.',
      processIntro: 'Hizi ni hatua zilizopangwa kwa majaribio ya Embu. Tutaonyesha maendeleo kila hatua inapokamilika.',
      stepStates: ['Imepangwa', 'Utafiti wa awali', 'Imepangwa'],
      steps: [
        { title: 'Sikiliza mahitaji ya eneo', description: 'Waulize wanaotafuta huduma, vikundi vya jamii na wahudumu wa afya maswali na changamoto ambazo tovuti inapaswa kushughulikia. Hakuna matokeo yaliyochapishwa hapa bado.' },
        { title: 'Kagua kila taarifa', description: 'Tumia vyanzo vya umma kutambua vituo, kisha thibitisha huduma, jinsi ya kuzipata na mawasiliano moja kwa moja na watoa huduma. Taarifa za afya zikaguliwe na wataalamu wa eneo kabla ya kutolewa.' },
        { title: 'Jaribu na uboreshe', description: 'Waombe watu wa Embu wajaribu kurasa kwa Kiingereza na Kiswahili. Sahihisha maneno yasiyo wazi na taarifa zilizopitwa na wakati, na onyesha tarehe ya ukaguzi wa mwisho.' },
      ],
      readinessKicker: 'Kabla ya matumizi mapana',
      readinessTitle: 'Kinachohitajika bado',
      readinessIntro: 'Muonekano huu wa awali unasaidia kukagua wazo. Hatua hizi zinahitajika kabla ya kuutangaza kama nyenzo ya kuaminika ya huduma za eneo.',
      checks: [
        { title: 'Ukaguzi wa kitaalamu', description: 'Mtaalamu wa afya wa eneo akague maandishi ya elimu na tafsiri.' },
        { title: 'Uthibitisho wa mtoa huduma', description: 'Kituo cha kwanza Embu kithibitishe huduma, jinsi wagonjwa wanavyozipata na mawasiliano yanayofanya kazi.' },
        { title: 'Majaribio na jamii', description: 'Watu wa Embu wajaribu tovuti na kusaidia kusahihisha taarifa zisizo wazi au zinazokosekana.' },
      ],
      exploreLearn: 'Tazama mwongozo wa kujifunza',
      exploreCare: 'Tazama maendeleo ya orodha',
    },
    getInvolvedPage: {
      eyebrow: 'Wasiliana nasi',
      title: 'Saidia kuboresha taarifa za huduma.',
      description: 'Tuambie tuboreshe nini, tushirikishe taarifa ya umma ya kituo ya kukagua, au saidia majaribio ya Embu.',
      backHome: 'Rudi mwanzo',
      imageAlt: 'Watu wawili wakisoma mwongozo uliochapishwa pamoja',
      formKicker: 'Ujumbe kwa timu',
      formTitle: 'Tuma ujumbe',
      formIntro: 'Chagua mada na uandike ujumbe mfupi. Barua pepe si lazima.',
      topicLegend: 'Ujumbe wako unahusu nini?',
      topics: [
        { id: 'idea', title: 'Maoni ya tovuti', description: 'Jambo la kuboresha' },
        { id: 'facility', title: 'Taarifa ya kituo', description: 'Taarifa ya umma ya kukagua' },
        { id: 'collaborate', title: 'Tushirikiane', description: 'Kagua au jaribu mradi' },
      ],
      replyEmailLabel: 'Anwani yako ya barua pepe',
      replyEmailHint: 'Si lazima. Iweke ikiwa ungependa jibu.',
      replyEmailError: 'Weka anwani sahihi ya barua pepe au acha nafasi hii wazi.',
      messageLabel: 'Ujumbe wako',
      messagePlaceholder: 'Tuambie ulichoona au unachopenda tuboreshe…',
      messageHint: 'Angalau herufi 10. Usitaje majina au taarifa binafsi za afya.',
      messageError: 'Andika herufi 10–800 kabla ya kutuma.',
      charactersLabel: 'herufi',
      sendAction: 'Tuma kwa CancerCare',
      sendingLabel: 'Inatuma…',
      sentTitle: 'Ujumbe umekubaliwa',
      sentText: 'Huduma ya barua pepe imekubali ujumbe wako kwa kisanduku cha CancerCare. Asante kwa kusaidia kuboresha mradi.',
      anotherAction: 'Andika ujumbe mwingine',
      sendError: 'Ujumbe haukutumwa. Jaribu tena baadaye au tumia anwani ya barua pepe kwenye ukurasa huu.',
      checkingLabel: 'Tunakagua muunganisho wa barua pepe…',
      unavailableTitle: 'Huduma ya kutuma ujumbe inaunganishwa',
      unavailableText: 'Unaweza kuandika ujumbe hapa, lakini kitufe cha kutuma kitafanya kazi kisanduku cha mradi kitakapounganishwa.',
      directEmailAction: 'Tuma barua pepe moja kwa moja',
      sideTitle: 'Wasiliana na timu ya CancerCare',
      safetyTitle: 'Ujumbe kuhusu mradi pekee',
      safetyText: 'Tuma maoni ya tovuti, taarifa za umma za huduma au ombi la kushirikiana. Hii si huduma ya ushauri wa afya, miadi au dharura.',
      privacyText: 'Kisanduku cha mradi hupokea ujumbe wako na anwani yako ya barua pepe ukiitoa. Usiweke taarifa binafsi za afya.',
      privacyLink: 'Soma ilani yetu ya faragha',
    },
    participation: {
      kicker: 'Tukishirikiana',
      title: 'Tujenge pamoja na jamii',
      description: 'Wataalamu wa afya, vikundi vya jamii na watu wenye uzoefu wa kupata huduma wanaweza kusaidia kubuni na kukagua huduma hii.',
      note: 'Sasa unaweza kutuma maoni kuhusu mradi kwa barua pepe.',
      action: 'Toa wazo',
      diagram: {
        people: 'Sauti za watu',
        health: 'Utaalamu wa afya',
        community: 'Jamii',
        outcome: 'Taarifa wazi za huduma, kwa pamoja.',
      },
    },
    assistant: {
      open: 'Uliza CancerCare',
      close: 'Funga mazungumzo',
      title: 'Msaidizi wa CancerCare',
      subtitle: 'Taarifa za jumla · si ushauri wa afya',
      greeting: 'Habari, karibu! Ninaweza kujibu maswali ya jumla kuhusu saratani, dalili za tahadhari, uchunguzi, chanjo ya HPV, bima ya SHA na mradi huu, kwa Kiswahili au Kiingereza. Ungependa kujua nini?',
      notice: 'Tafadhali usiweke majina au taarifa binafsi za afya. Mazungumzo haya yanabaki kwenye kichupo hiki pekee. Wakati wa dharura piga 999 au 112.',
      placeholder: 'Andika swali lako…',
      send: 'Tuma',
      thinking: 'Ninafikiria…',
      offline: 'Hali ya majibu ya haraka',
      error: 'Kuna hitilafu, kwa hivyo hili ni jibu la haraka badala yake.',
      restart: 'Anza upya',
      human: 'Tuma ujumbe kwa timu',
      suggestions: ['Saratani ni nini?', 'Dalili za saratani ni zipi?', 'Je, chanjo ya HPV ni bure?', 'Nitapata huduma wapi Embu?'],
    },
    visitPlanner: {
      kicker: 'Jiandae kwa ziara',
      title: 'Andaa orodha ya maswali yako.',
      introduction: 'Chagua maswali ya kumuuliza mhudumu wa afya, au ongeza yako. Chapisha orodha, inakili au jitumie kwenye WhatsApp.',
      privacyNote: 'Orodha yako inabaki kwenye kifaa hiki na hufutika ukiondoka kwenye ukurasa.',
      groups: [
        { title: 'Kuhusu uchunguzi', questions: ['Je, uchunguzi unapendekezwa kwangu, na kwa nini?', 'Nitapata matokeo yangu kwa njia gani?', 'Nini kitafuata ikiwa vipimo zaidi vinahitajika?'] },
        { title: 'Kuhusu mabadiliko niliyoona', questions: ['Ninaweza kufanyiwa tathmini wapi?', 'Nimweleze mhudumu wa afya nini kuhusu mabadiliko haya?', 'Nirudi lini ikiwa hali haitaimarika?'] },
        { title: 'Kuhusu matokeo', questions: ['Matokeo yangu yanamaanisha nini?', 'Je, ninahitaji vipimo zaidi?', 'Niwasiliane na nani kuhusu hatua inayofuata?'] },
      ],
      customLabel: 'Ongeza swali lako',
      customPlaceholder: 'Kwa mfano: Je, mtu anaweza kuandamana nami?',
      addAction: 'Ongeza',
      selectedTitle: 'Maswali yangu',
      emptySelection: 'Weka alama kwenye swali ili kuliongeza kwenye orodha yako.',
      remove: 'Ondoa',
      printAction: 'Chapisha',
      copyAction: 'Nakili',
      copiedLabel: 'Imenakiliwa',
      whatsappAction: 'WhatsApp',
      listHeading: 'Maswali ya ziara yangu ya afya (CancerCare)',
    },
    myths: {
      kicker: 'Dhana na ukweli',
      title: 'Kagua ulichosikia.',
      introduction: 'Gusa kadi uone ushahidi unasema nini.',
      mythLabel: 'Dhana',
      factLabel: 'Ukweli',
      reveal: 'Onyesha ukweli',
      hide: 'Onyesha dhana',
      reviewStatus: 'Kulingana na taarifa za WHO · ukaguzi wa kitaalamu wa eneo unasubiriwa',
      items: [
        { myth: 'Saratani huambukizwa kutoka mtu mmoja hadi mwingine kama homa.', fact: 'Saratani yenyewe haiambukizi. Baadhi ya maambukizi yanayoweza kusababisha saratani, kama HPV na homa ya ini B, yanaweza kuambukizana, na chanjo husaidia kuyazuia.' },
        { myth: 'Kugunduliwa na saratani kila mara kunamaanisha kifo.', fact: 'Saratani nyingi zinaweza kutibika zikigunduliwa mapema na kutibiwa ipasavyo. Tathmini ya mapema ni muhimu.' },
        { myth: 'Hakuna kinachoweza kufanywa kupunguza hatari ya saratani.', fact: 'WHO inakadiria kwamba asilimia 30–50 ya saratani zinaweza kuzuiwa, kwa mfano kwa kuepuka tumbaku, kupunguza pombe na kupata chanjo zinazopendekezwa.' },
        { myth: 'Uchunguzi ni kwa watu wanaojisikia wagonjwa tu.', fact: 'Uchunguzi ni kwa watu wasio na dalili. Ukiona mabadiliko, omba tathmini badala ya kusubiri.' },
      ],
    },
    partners: { partnersKicker: 'Washirika wetu', partnersTitle: 'Tunashirikiana kwa huduma za saratani zilizo wazi', sourcesKicker: 'Taarifa za kuaminika', sourcesTitle: 'Miongozo yetu inategemea vyanzo hivi vya umma', becomePartner: 'Kuwa mshirika', pause: 'Simamisha', play: 'Endelea' },
    awareness: {
      kicker: 'Uhamasishaji mwaka mzima',
      title: 'Mwezi mzuri wa kulizungumzia.',
      introduction: 'Siku na miezi hii ya uhamasishaji hutukumbusha kujifunza, kukaguliwa na kusaidiana. Gusa mmoja umuulize msaidizi.',
      nowLabel: 'Mwezi huu',
      askAction: 'Muulize msaidizi',
      items: [
        { month: 1, when: 'Januari', title: 'Mwezi wa uhamasishaji wa saratani ya shingo ya kizazi', text: 'Chanjo ya HPV kwa wasichana na uchunguzi kwa wanawake.', question: 'Saratani ya shingo ya kizazi inazuiwaje?' },
        { month: 2, when: '4 Februari', title: 'Siku ya Saratani Duniani', text: 'Siku ya dunia ya kuhamasisha na kuchukua hatua dhidi ya saratani.', question: 'Dalili za saratani ni zipi?' },
        { month: 9, when: 'Septemba', title: 'Mwezi wa saratani ya watoto', text: 'Watoto wanaweza kupata saratani, na wengi wanaweza kutibika.', question: 'Je, watoto wanaweza kupata saratani?' },
        { month: 10, when: 'Oktoba', title: 'Mwezi wa uhamasishaji wa saratani ya matiti', text: 'Fahamu hali ya kawaida ya matiti yako na ukaguliwe ukiona mabadiliko.', question: 'Dalili za saratani ya matiti ni zipi?' },
        { month: 11, when: 'Novemba', title: 'Afya ya wanaume na saratani ya tezi dume', text: 'Movember huwahimiza wanaume kuzungumza kuhusu afya ya tezi dume.', question: 'Nieleze kuhusu saratani ya tezi dume' },
      ],
    },
    share: { title: 'Shiriki ukurasa huu', whatsapp: 'Shiriki kwenye WhatsApp', copy: 'Nakili kiungo', copied: 'Kiungo kimenakiliwa' },
    notFound: { title: 'Hatukupata ukurasa huo.', description: 'Huenda kiungo ni cha zamani au kimekosewa. Rudi mwanzo au soma mwongozo wa elimu.', home: 'Nenda mwanzo', learn: 'Jifunze kuhusu saratani' },
    footer: {
      line: 'Taarifa wazi, tukianzia Embu.',
      notice: 'Muonekano wa awali. CancerCare bado haitoi ushauri wa afya, rufaa au orodha ya vituo.',
    },
  },
} satisfies Record<Language, Copy>;
