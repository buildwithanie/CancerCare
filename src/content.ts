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
    imageCaption: string;
  };
  principles: [string, string, string];
  mission: {
    kicker: string;
    title: string;
    description: string;
    quote: string;
    quoteAttribution: string;
    imageAlt: string;
    imageCaption: string;
  };
  work: {
    kicker: string;
    title: string;
    programs: Program[];
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
  participation: {
    kicker: string;
    title: string;
    description: string;
    note: string;
    action: string;
    diagram: { people: string; health: string; community: string; outcome: string };
  };
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
      imageAlt: 'AI-generated scene of a clinician listening to a patient in a clinic',
      imageCaption: 'AI illustration. Not actual patients or staff.',
    },
    principles: ['Clear information', 'Verified services', 'Community input'],
    mission: {
      kicker: 'Our mission',
      title: 'Make cancer care easier to understand and access.',
      description: 'We are building a place for clear, local information so people in Embu can understand their options and find appropriate care when services are verified.',
      quote: 'Listen first. Build around people seeking care.',
      quoteAttribution: 'Our guiding principle',
      imageAlt: 'AI-generated scene of two adults reading a health information booklet outdoors',
      imageCaption: 'AI illustration. Not actual patients.',
    },
    work: {
      kicker: 'Our focus',
      title: 'What we are building',
      programs: [
        {
          title: 'Understand cancer',
          description: 'Planned English and Kiswahili guides to risk, screening and treatment.',
          label: 'Planned',
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
    pilot: {
      kicker: 'Starting in Embu, Kenya',
      title: 'Building a clearer picture of local cancer care.',
      description: 'We will work with providers and community members to map, verify and explain services people can rely on.',
      mapKicker: 'Pilot area',
      mapTitle: 'Embu County, Kenya',
      mapAlt: 'Map showing the Embu County boundary and its highlighted location within Kenya',
      mapSource: 'Boundary data (2020):',
      action: 'See verification progress',
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
    participation: {
      kicker: 'Working together',
      title: 'Build with the community',
      description: 'Health professionals, community groups and people with lived experience can help shape and check this service.',
      note: 'Ways to share feedback will be added during the pilot.',
      action: 'See the Embu pilot',
      diagram: {
        people: "People's voices",
        health: 'Health expertise',
        community: 'Community',
        outcome: 'Clearer care information, together.',
      },
    },
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
      imageAlt: 'Taswira iliyotengenezwa kwa AI ya mhudumu wa afya akimsikiliza mgonjwa kliniki',
      imageCaption: 'Taswira ya AI. Si wagonjwa au wahudumu halisi.',
    },
    principles: ['Taarifa zilizo wazi', 'Huduma zilizothibitishwa', 'Maoni ya jamii'],
    mission: {
      kicker: 'Dhamira yetu',
      title: 'Kurahisisha kuelewa na kupata huduma za saratani.',
      description: 'Tunajenga mahali pa kupata taarifa wazi za eneo ili watu wa Embu waelewe chaguo zao na wapate huduma zinazofaa baada ya kuthibitishwa.',
      quote: 'Sikiliza kwanza. Jenga kwa ajili ya wanaotafuta huduma.',
      quoteAttribution: 'Kanuni yetu',
      imageAlt: 'Taswira iliyotengenezwa kwa AI ya watu wawili wakisoma kijitabu cha taarifa za afya nje',
      imageCaption: 'Taswira ya AI. Si wagonjwa halisi.',
    },
    work: {
      kicker: 'Tunacholenga',
      title: 'Tunachojenga',
      programs: [
        {
          title: 'Fahamu saratani',
          description: 'Miongozo ya Kiingereza na Kiswahili kuhusu hatari, uchunguzi na matibabu inapangwa.',
          label: 'Inapangwa',
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
    pilot: {
      kicker: 'Tunaanzia Embu, Kenya',
      title: 'Kujenga picha iliyo wazi ya huduma za saratani eneo letu.',
      description: 'Tutashirikiana na watoa huduma na jamii kutambua, kuthibitisha na kueleza huduma ambazo watu wanaweza kutegemea.',
      mapKicker: 'Eneo la majaribio',
      mapTitle: 'Kaunti ya Embu, Kenya',
      mapAlt: 'Ramani inayoonyesha mpaka wa Kaunti ya Embu na mahali pake palipoangaziwa nchini Kenya',
      mapSource: 'Taarifa za mipaka (2020):',
      action: 'Tazama hatua za uthibitishaji',
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
    participation: {
      kicker: 'Tukishirikiana',
      title: 'Tujenge pamoja na jamii',
      description: 'Wataalamu wa afya, vikundi vya jamii na watu wenye uzoefu wa kupata huduma wanaweza kusaidia kubuni na kukagua huduma hii.',
      note: 'Njia za kutoa maoni zitaongezwa wakati wa majaribio.',
      action: 'Tazama majaribio ya Embu',
      diagram: {
        people: 'Sauti za watu',
        health: 'Utaalamu wa afya',
        community: 'Jamii',
        outcome: 'Taarifa wazi za huduma, kwa pamoja.',
      },
    },
    footer: {
      line: 'Taarifa wazi, tukianzia Embu.',
      notice: 'Muonekano wa awali. CancerCare bado haitoi ushauri wa afya, rufaa au orodha ya vituo.',
    },
  },
} satisfies Record<Language, Copy>;
