import type { Language } from '@/content';

export type CareSection = { id: string; title: string; intro: string; points: string[] };

const en = {
  eyebrow: 'Caregiver corner',
  title: 'Caring for someone with cancer.',
  description: 'Practical help for family members and friends who support a person through cancer, and for looking after yourself along the way.',
  backHome: 'Back to home',
  jump: 'Jump to',
  urgentTitle: 'Get help straight away',
  urgentText: 'During cancer treatment, contact the care team at once for a fever, chills, bleeding, new breathlessness, or if the person cannot eat, drink or pass urine. In an emergency call 999 or 112.',
  printAction: 'Print this page',
  review: 'General information, not medical advice · local clinical review pending',
  askTitle: 'Have a question?',
  askText: 'The CancerCare assistant can explain treatments, side effects and what to ask the care team.',
  askAction: 'Ask the assistant',
  askQuestion: 'How can I support someone during cancer treatment?',
  sections: [
    {
      id: 'practical',
      title: 'Practical support',
      intro: 'Small, steady help often matters most.',
      points: [
        'Go with them to appointments if they want, and write down what the health worker says.',
        'Keep one folder or notebook for results, prescriptions, appointment cards and the SHA number.',
        'Help them take medicines as prescribed and keep track of side effects to report.',
        'Offer simple, soft foods and plenty of fluids if eating is hard; ask the care team about nutrition.',
        'Plan transport and costs early, and ask the facility\'s SHA desk what is covered.',
      ],
    },
    {
      id: 'emotional',
      title: 'Emotional support',
      intro: 'You do not need perfect words. Being there is enough.',
      points: [
        'Listen more than you talk. Let them share fears, anger or sadness without rushing to fix it.',
        'Ask what they want: some people want to talk about cancer, others want normal conversation.',
        'Respect their choices about who to tell and how much to share.',
        'Keep including them in family and community life as much as they would like.',
        'Prayer, faith communities and support groups can help many people; follow their lead.',
      ],
    },
    {
      id: 'self-care',
      title: 'Looking after yourself',
      intro: 'You can only keep caring if you care for yourself too.',
      points: [
        'Rest, eat regular meals and take short breaks, even ten minutes outside.',
        'Share tasks with family, neighbours or your church or chama. Make a simple rota.',
        'Talk to someone you trust about how you feel.',
        'Notice signs of burnout: constant exhaustion, poor sleep, feeling hopeless or irritable. If they last, speak to a health worker or counsellor.',
        'It is normal to feel tired, sad or even frustrated. It does not mean you care less.',
      ],
    },
    {
      id: 'children',
      title: 'Talking to children',
      intro: 'Children notice when something is wrong. Honest, simple words help them feel safe.',
      points: [
        'Use simple, true words for their age, and the word "cancer" for older children.',
        'Tell them it is not their fault and that cancer is not caught like a cold.',
        'Explain what will change at home and who will look after them.',
        'Let them ask questions and share feelings; it is fine to say "I don\'t know".',
        'Keep school and routines as normal as possible, and tell a trusted teacher.',
      ],
    },
    {
      id: 'care-team',
      title: 'Questions for the care team',
      intro: 'Ask, with the person\'s permission, so you can help well.',
      points: [
        'What is the treatment plan, and how long will it take?',
        'Which side effects should we expect, and which ones need urgent help?',
        'Who do we call if there is a problem, including at night?',
        'Are there foods, medicines or herbal remedies to avoid?',
        'Is palliative care or counselling available for the patient and family?',
      ],
    },
  ] as CareSection[],
};

type CaregiverCopy = typeof en;

const sw: CaregiverCopy = {
  eyebrow: 'Kona ya walezi',
  title: 'Kumhudumia mtu mwenye saratani.',
  description: 'Msaada wa vitendo kwa wanafamilia na marafiki wanaomsaidia mtu kupitia saratani, na jinsi ya kujitunza njiani.',
  backHome: 'Rudi mwanzo',
  jump: 'Nenda kwa',
  urgentTitle: 'Pata msaada mara moja',
  urgentText: 'Wakati wa matibabu ya saratani, wasiliana na timu ya huduma mara moja kwa homa, kutetemeka kwa baridi, kutokwa damu, kupumua kwa shida kupya, au ikiwa mgonjwa hawezi kula, kunywa au kukojoa. Wakati wa dharura piga 999 au 112.',
  printAction: 'Chapisha ukurasa huu',
  review: 'Taarifa za jumla, si ushauri wa afya · ukaguzi wa kitaalamu wa eneo unasubiriwa',
  askTitle: 'Una swali?',
  askText: 'Msaidizi wa CancerCare anaweza kueleza matibabu, madhara na maswali ya kuuliza timu ya huduma.',
  askAction: 'Muulize msaidizi',
  askQuestion: 'Ninawezaje kumsaidia mtu wakati wa matibabu ya saratani?',
  sections: [
    {
      id: 'practical',
      title: 'Msaada wa vitendo',
      intro: 'Msaada mdogo wa mara kwa mara mara nyingi ndio muhimu zaidi.',
      points: [
        'Andamana naye kwenye miadi akipenda, na uandike anachosema mhudumu wa afya.',
        'Weka faili au daftari moja la matokeo, maagizo ya dawa, kadi za miadi na nambari ya SHA.',
        'Msaidie kutumia dawa kama alivyoagizwa na kufuatilia madhara ya kuripoti.',
        'Mpe vyakula laini na rahisi na vinywaji vingi ikiwa kula ni kugumu; uliza timu ya huduma kuhusu lishe.',
        'Panga usafiri na gharama mapema, na uliza dawati la SHA kituoni huduma zinazogharamiwa.',
      ],
    },
    {
      id: 'emotional',
      title: 'Msaada wa kihisia',
      intro: 'Huhitaji maneno kamili. Kuwepo kunatosha.',
      points: [
        'Sikiliza zaidi kuliko kuongea. Mwache aeleze hofu, hasira au huzuni bila kuharakisha kuitatua.',
        'Muulize anachotaka: wengine hupenda kuzungumza kuhusu saratani, wengine hupenda mazungumzo ya kawaida.',
        'Heshimu maamuzi yake kuhusu nani wa kumwambia na kiasi gani cha kushiriki.',
        'Endelea kumshirikisha katika maisha ya familia na jamii kadri anavyopenda.',
        'Maombi, jumuiya za imani na vikundi vya msaada vinaweza kusaidia wengi; fuata anavyopenda.',
      ],
    },
    {
      id: 'self-care',
      title: 'Kujitunza',
      intro: 'Unaweza kuendelea kuhudumia tu ukijitunza pia.',
      points: [
        'Pumzika, kula milo ya kawaida na chukua mapumziko mafupi, hata dakika kumi nje.',
        'Gawana kazi na familia, majirani au kanisa au chama chako. Weka ratiba rahisi.',
        'Zungumza na mtu unayemwamini kuhusu unavyojisikia.',
        'Tambua dalili za kuchoka kupita kiasi: uchovu wa kila mara, usingizi mbaya, kukata tamaa au hasira. Zikiendelea, zungumza na mhudumu wa afya au mshauri.',
        'Ni kawaida kuhisi uchovu, huzuni au hata kukasirika. Haimaanishi unajali kidogo.',
      ],
    },
    {
      id: 'children',
      title: 'Kuzungumza na watoto',
      intro: 'Watoto hutambua jambo likiwa si sawa. Maneno ya kweli na rahisi huwasaidia kujisikia salama.',
      points: [
        'Tumia maneno rahisi na ya kweli kulingana na umri, na neno "saratani" kwa watoto wakubwa.',
        'Waeleze si kosa lao na kwamba saratani haiambukizi kama homa.',
        'Eleza kitakachobadilika nyumbani na nani atawatunza.',
        'Waache waulize maswali na waeleze hisia zao; ni sawa kusema "sijui".',
        'Dumisha shule na ratiba za kawaida kadri iwezekanavyo, na umjulishe mwalimu unayemwamini.',
      ],
    },
    {
      id: 'care-team',
      title: 'Maswali kwa timu ya huduma',
      intro: 'Uliza, kwa ruhusa ya mgonjwa, ili uweze kusaidia vizuri.',
      points: [
        'Mpango wa matibabu ni upi, na utachukua muda gani?',
        'Madhara gani tutarajie, na yapi yanahitaji msaada wa haraka?',
        'Tumpigie nani simu kukiwa na tatizo, hata usiku?',
        'Kuna vyakula, dawa au dawa za mitishamba za kuepuka?',
        'Je, huduma shufaa au ushauri nasaha unapatikana kwa mgonjwa na familia?',
      ],
    },
  ],
};

export const caregiverCopy: Record<Language, CaregiverCopy> = { en, sw };
export type { CaregiverCopy };
