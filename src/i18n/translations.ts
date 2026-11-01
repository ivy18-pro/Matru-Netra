import { Language } from '../types';

export interface TranslationDictionary {
  // Brand & Header
  appTitle: string;
  appSubtitle: string;
  storyJourney: string;
  myDashboard: string;
  doctorStation: string;
  ashaWorkspace: string;
  motherPortal: string;
  signIn: string;
  signOut: string;
  online: string;
  offline: string;
  changeLanguage: string;
  chooseRegion: string;

  // Region Onboarding
  regionHeading: string;
  regionSubheading: string;
  interactiveMapTab: string;
  searchListTab: string;
  searchPlaceholder: string;
  selectDistrictPrompt: string;
  allDistricts: string;
  suggestedLanguageTitle: string;
  suggestedLanguageNote: string;
  confirmLanguage: string;
  chooseAnotherLanguage: string;
  backToMap: string;
  allIndiaRegions: string;

  // Voice-First Welcome Screen
  voiceWelcomeHeading: string;
  voiceWelcomeSubtitle: string;
  speakAloud: string;
  stopSpeaking: string;
  voiceInstruction: string;
  myHealthAction: string;
  myNextVisitAction: string;
  helpAction: string;
  myHealthDesc: string;
  myNextVisitDesc: string;
  helpDesc: string;

  // Simplified Mother Dashboard
  welcomeMother: string;
  weeksPregnant: string;
  estimatedDeliveryDate: string;
  daysRemaining: string;
  babyGrowthAnalogy: string;
  nextCheckupTitle: string;
  readNextVisitAloud: string;
  visitScheduled: string;
  doctorCleared: string;
  careJourneyTitle: string;
  careJourneySub: string;
  remindersTitle: string;
  remindersSub: string;
  listenReminder: string;
  nutritionTip: string;
  medicineTip: string;
  restTip: string;
  ashaLifelineTitle: string;
  ashaLifelineDesc: string;
  callAshaDidi: string;
  ambulance102: string;
  dangerSignsTitle: string;
  dangerSignsAlert: string;

  // Voice Assistant Controls
  voiceAssistant: string;
  voiceListening: string;
  voiceTapToSpeak: string;
  voiceMicPermissionReason: string;
  voiceSupportedNotice: string;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  // 1. ENGLISH
  en: {
    appTitle: 'MATRU-NETRA',
    appSubtitle: 'Maternal Care Net-Grid',
    storyJourney: 'Story Journey',
    myDashboard: 'My Dashboard',
    doctorStation: 'Doctor Station',
    ashaWorkspace: 'ASHA Field Workspace',
    motherPortal: 'Mother Portal',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    online: 'ONLINE',
    offline: 'OFFLINE',
    changeLanguage: 'Change Language & Region',
    chooseRegion: 'Choose Your Region',

    regionHeading: 'Choose Your Region',
    regionSubheading: 'We will help you use MATRU-NETRA in a language you understand.',
    interactiveMapTab: 'Interactive India Map',
    searchListTab: 'Searchable States & Districts',
    searchPlaceholder: 'Search state, district, or language...',
    selectDistrictPrompt: 'Select your district (optional):',
    allDistricts: 'All Districts / Main Sub-Centre',
    suggestedLanguageTitle: 'Suggested Language for Your Region',
    suggestedLanguageNote: 'Based on your selected region. You can always choose any other language.',
    confirmLanguage: 'Confirm & Continue',
    chooseAnotherLanguage: 'Choose Another Language',
    backToMap: '← Back to Region Selection',
    allIndiaRegions: 'All Indian States & Territories',

    voiceWelcomeHeading: 'Welcome, Expectant Mother',
    voiceWelcomeSubtitle: 'Your trusted healthcare companion from pregnancy through newborn care.',
    speakAloud: 'Listen Aloud',
    stopSpeaking: 'Stop Audio',
    voiceInstruction: 'Press the speaker button to hear this screen read aloud in your language.',
    myHealthAction: 'My Health',
    myNextVisitAction: 'My Next Visit',
    helpAction: 'Help & ASHA Didi',
    myHealthDesc: 'View pregnancy progress, baby size, and nutrition tips.',
    myNextVisitDesc: 'View your upcoming checkup date and doctor instructions.',
    helpDesc: 'Contact your village ASHA Didi or call the 102 ambulance.',

    welcomeMother: 'Welcome',
    weeksPregnant: 'Weeks Pregnant',
    estimatedDeliveryDate: 'Estimated Delivery Date',
    daysRemaining: 'Days to Welcome Baby',
    babyGrowthAnalogy: 'Baby is healthy and growing strong (~1000g)',
    nextCheckupTitle: 'Your Next Scheduled Check-up',
    readNextVisitAloud: 'Read Next Checkup Aloud',
    visitScheduled: 'Scheduled with ASHA & PHC',
    doctorCleared: 'Doctor Verified',
    careJourneyTitle: 'My Care Journey',
    careJourneySub: 'Essential milestones from early pregnancy to newborn care',
    remindersTitle: 'Daily Health Reminders',
    remindersSub: 'Simple daily care habits recommended by your PHC doctor',
    listenReminder: 'Listen to this tip',
    nutritionTip: 'Eat green leafy vegetables, lentils, and seasonal fruits every day.',
    medicineTip: 'Take Iron-Folic tablet after lunch, Calcium tablet after dinner with water.',
    restTip: 'Drink 8 to 10 glasses of water daily and rest on your left side in the afternoon.',
    ashaLifelineTitle: 'Your Village ASHA Didi',
    ashaLifelineDesc: 'Anita Devi is your doorstep health worker. Tap below to call for advice.',
    callAshaDidi: 'Call ASHA Didi Now',
    ambulance102: 'Call 102 Free Ambulance',
    dangerSignsTitle: 'Important Warning Signs',
    dangerSignsAlert: 'Severe headache, bleeding, high fever, or reduced baby kicks: contact ASHA Didi immediately.',

    voiceAssistant: 'Voice Assistant',
    voiceListening: 'Listening... Say "Next Visit" or "Help"',
    voiceTapToSpeak: 'Tap to Speak',
    voiceMicPermissionReason: 'Microphone access is used solely to recognize your spoken navigation requests.',
    voiceSupportedNotice: 'Voice recognition operates locally in your browser.'
  },

  // 2. HINDI (हिन्दी)
  hi: {
    appTitle: 'मातृ-नेत्रा',
    appSubtitle: 'मातृ एवं शिशु देखभाल ग्रिड',
    storyJourney: 'कहानी यात्रा',
    myDashboard: 'मेरा डैशबोर्ड',
    doctorStation: 'डॉक्टर स्टेशन',
    ashaWorkspace: 'आशा कार्यक्षेत्र',
    motherPortal: 'माता पोर्टल',
    signIn: 'लॉग इन करें',
    signOut: 'लॉग आउट',
    online: 'ऑनलाइन',
    offline: 'ऑफ़लाइन',
    changeLanguage: 'भाषा व क्षेत्र बदलें',
    chooseRegion: 'अपना राज्य व क्षेत्र चुनें',

    regionHeading: 'अपना राज्य व क्षेत्र चुनें',
    regionSubheading: 'हम आपकी अपनी भाषा में मातृ-नेत्रा चलाने में मदद करेंगे।',
    interactiveMapTab: 'भारत का नक्शा',
    searchListTab: 'राज्य और जिले खोजें',
    searchPlaceholder: 'राज्य, जिला या भाषा लिखें...',
    selectDistrictPrompt: 'अपना जिला चुनें (वैकल्पिक):',
    allDistricts: 'सभी जिले / उप-स्वास्थ्य केंद्र',
    suggestedLanguageTitle: 'आपके क्षेत्र की सुझाई गई भाषा',
    suggestedLanguageNote: 'यह आपके चुने गए राज्य के अनुसार है। आप कभी भी दूसरी भाषा चुन सकती हैं।',
    confirmLanguage: 'पुष्टि करें और आगे बढ़ें',
    chooseAnotherLanguage: 'दूसरी भाषा चुनें',
    backToMap: '← वापस नक्शे पर जाएं',
    allIndiaRegions: 'भारत के सभी राज्य व केंद्र शासित प्रदेश',

    voiceWelcomeHeading: 'नमस्ते, गर्भवती माता जी',
    voiceWelcomeSubtitle: 'गर्भावस्था से लेकर शिशु देखभाल तक आपकी सच्ची साथी।',
    speakAloud: 'आवाज़ में सुनें',
    stopSpeaking: 'आवाज़ रोकें',
    voiceInstruction: 'यह स्क्रीन अपनी भाषा में सुनने के लिए स्पीकर बटन दबाएं।',
    myHealthAction: 'मेरी सेहत',
    myNextVisitAction: 'मेरी अगली जाँच',
    helpAction: 'मदद व आशा दीदी',
    myHealthDesc: 'गर्भ के सप्ताह, बच्चे का विकास और पोषण की जानकारी देखें।',
    myNextVisitDesc: 'अपनी अगली जाँच की तारीख और डॉक्टर की सलाह देखें।',
    helpDesc: 'अपनी आशा दीदी से बात करें या 102 एम्बुलेंस को कॉल करें।',

    welcomeMother: 'नमस्ते',
    weeksPregnant: 'सप्ताह की गर्भावस्था',
    estimatedDeliveryDate: 'प्रसव की संभावित तारीख',
    daysRemaining: 'शिशु के आगमन में शेष दिन',
    babyGrowthAnalogy: 'शिशु का विकास सामान्य और स्वस्थ है (~1000 ग्राम)',
    nextCheckupTitle: 'आपकी अगली तय जाँच',
    readNextVisitAloud: 'अगली जाँच की जानकारी सुनें',
    visitScheduled: 'तय तारीख - आशा व पीएचसी',
    doctorCleared: 'डॉक्टर द्वारा जाँचा गया',
    careJourneyTitle: 'मेरी देखभाल यात्रा',
    careJourneySub: 'गर्भावस्था से शिशु के जन्म तक के मुख्य पड़ाव',
    remindersTitle: 'दैनिक सेहत सलाह',
    remindersSub: 'डॉक्टर और आशा दीदी द्वारा बताए गए ज़रूरी नियम',
    listenReminder: 'यह सलाह सुनें',
    nutritionTip: 'हरी पत्तेदार सब्ज़ियाँ, दालें और मौसमी फल रोज़ खाएं।',
    medicineTip: 'दोपहर के खाने के बाद आयरन की गोली और रात को कैल्शियम की गोली पानी से लें।',
    restTip: 'दिन में 8-10 गिलास पानी पिएं और दोपहर में बाईं करवट लेकर आराम करें।',
    ashaLifelineTitle: 'आपकी आशा दीदी',
    ashaLifelineDesc: 'अनीता दीदी आपके गांव की स्वास्थ्य कार्यकर्ता हैं। सलाह के लिए फोन करें।',
    callAshaDidi: 'आशा दीदी को फोन करें',
    ambulance102: '102 मुफ़्त एम्बुलेंस',
    dangerSignsTitle: 'खतरे के ज़रूरी लक्षण',
    dangerSignsAlert: 'तेज़ सिरदर्द, रक्तस्राव, तेज़ बुखार या बच्चे की हलचल कम होना: तुरंत आशा दीदी को बताएं।',

    voiceAssistant: 'आवाज़ सहायक',
    voiceListening: 'सुन रहे हैं... "अगली जाँच" या "मदद" बोलें',
    voiceTapToSpeak: 'बोलने के लिए दबाएं',
    voiceMicPermissionReason: 'माइक का उपयोग केवल आपकी आवाज़ से स्क्रीन खोलने के लिए किया जाता है।',
    voiceSupportedNotice: 'आवाज़ पहचान आपके फोन पर सुरक्षित रूप से चलती है।'
  },

  // 3. BENGALI (বাংলা)
  bn: {
    appTitle: 'মাতৃ-নেত্রা',
    appSubtitle: 'মাতৃ ও নবজাতক সেবা নেট-গ্রিড',
    storyJourney: 'গল্প পরিক্রমা',
    myDashboard: 'আমার ড্যাশবোর্ড',
    doctorStation: 'ডাক্তার কেন্দ্র',
    ashaWorkspace: 'আশা দিদি কর্মক্ষেত্র',
    motherPortal: 'মা ও পরিবার পোর্টাল',
    signIn: 'লগ ইন করুন',
    signOut: 'লগ আউট',
    online: 'অনলাইন',
    offline: 'অফলাইন',
    changeLanguage: 'ভাষা ও অঞ্চল পরিবর্তন',
    chooseRegion: 'আপনার অঞ্চল নির্বাচন করুন',

    regionHeading: 'আপনার অঞ্চল নির্বাচন করুন',
    regionSubheading: 'আমরা আপনার মাতৃভাষায় মাতৃ-নেত্রা ব্যবহারে সাহায্য করব।',
    interactiveMapTab: 'ভারতের মানচিত্র',
    searchListTab: 'রাজ্য ও জেলা খুঁজুন',
    searchPlaceholder: 'রাজ্য, জেলা বা ভাষার নাম লিখুন...',
    selectDistrictPrompt: 'আপনার জেলা বেছে নিন (ঐচ্ছিক):',
    allDistricts: 'সমস্ত জেলা / স্বাস্থ্য উপকেন্দ্র',
    suggestedLanguageTitle: 'আপনার অঞ্চলের প্রস্তাবিত ভাষা',
    suggestedLanguageNote: 'এটি আপনার রাজ্যের ভিত্তিতে প্রস্তাবিত। আপনি যেকোনো সময় অন্য ভাষা বেছে নিতে পারেন।',
    confirmLanguage: 'নিশ্চিত করুন ও এগিয়ে যান',
    chooseAnotherLanguage: 'অন্য ভাষা বেছে নিন',
    backToMap: '← মানচিত্রে ফিরে যান',
    allIndiaRegions: 'ভারতের সমস্ত রাজ্য ও কেন্দ্রশাসিত অঞ্চল',

    voiceWelcomeHeading: 'নমস্কার, গর্ভবতী মা',
    voiceWelcomeSubtitle: 'গর্ভাবস্থা থেকে নবজাতকের যত্ন পর্যন্ত আপনার বিশ্বস্ত সঙ্গী।',
    speakAloud: 'মুখে শুনুন',
    stopSpeaking: 'শব্দ থামান',
    voiceInstruction: 'এই পাতার তথ্য বাংলায় শুনতে স্পিকার বোতামে চাপ দিন।',
    myHealthAction: 'আমার স্বাস্থ্য',
    myNextVisitAction: 'পরের চেকআপ',
    helpAction: 'সাহায্য ও আশা দিদি',
    myHealthDesc: 'গর্ভাবস্থার সপ্তাহ, শিশুর বৃদ্ধি এবং পুষ্টির পরামর্শ দেখুন।',
    myNextVisitDesc: 'আপনার পরবর্তী স্বাস্থ্য পরীক্ষার তারিখ ও ডাক্তারের নির্দেশ দেখুন।',
    helpDesc: 'আপনার গ্রামের আশা দিদির সাথে কথা বলুন বা ১০২ অ্যাম্বুলেন্স ডাকুন।',

    welcomeMother: 'স্বাগতম',
    weeksPregnant: 'সপ্তাহের গর্ভাবস্থা',
    estimatedDeliveryDate: 'প্রসবের সম্ভাব্য তারিখ',
    daysRemaining: 'সন্তান আগমনের বাকি দিন',
    babyGrowthAnalogy: 'গর্ভস্থ শিশু সুস্থ ও স্বাভাবিকভাবে বেড়ে উঠছে (~১০০০ গ্রাম)',
    nextCheckupTitle: 'আপনার পরবর্তী স্বাস্থ্য পরীক্ষা',
    readNextVisitAloud: 'পরের চেকআপের তথ্য শুনুন',
    visitScheduled: 'দিন নির্ধারিত - আশা ও পিএইচসি',
    doctorCleared: 'ডাক্তারবাবু দ্বারা অনুমোদিত',
    careJourneyTitle: 'আমার মাতৃত্বের পথচলা',
    careJourneySub: 'গর্ভাবস্থা থেকে শিশুর জন্ম পর্যন্ত গুরুত্বপূর্ণ মাইলফলক',
    remindersTitle: 'দৈনিক স্বাস্থ্যের নিয়মাবলী',
    remindersSub: 'সুস্থ থাকার জন্য পিএইচসি ডাক্তার ও আশা দিদির পরমর্শ',
    listenReminder: 'পরামর্শটি শুনুন',
    nutritionTip: 'প্রতিদিন সবুজ শাকসবজি, ডাল ও মরসুমি টাটকা ফল খান।',
    medicineTip: 'দুপুরের খাবারের পর আয়রন বড়ি এবং রাতের খাবারের পর ক্যালসিয়াম বড়ি জল দিয়ে খান।',
    restTip: 'দিনে ৮-১০ গ্লাস জল খান এবং দুপুরে বাঁ দিকে পাশ ফিরে বিশ্রাম নিন।',
    ashaLifelineTitle: 'আপনার আশা দিদি',
    ashaLifelineDesc: 'অনিতা দিদি আপনার গ্রামের স্বাস্থ্যকর্মী। যেকোনো প্রয়োজনে ফোন করুন।',
    callAshaDidi: 'আশা দিদিকে ফোন করুন',
    ambulance102: '১০২ ফ্রি অ্যাম্বুলেন্স',
    dangerSignsTitle: 'বিপদ চিহ্ন ও সতর্কতা',
    dangerSignsAlert: 'প্রচণ্ড মাথাব্যথা, রক্তস্রাব, বা শিশুর নড়াচড়া কমে গেলে অবিলম্বে আশা দিদিকে জানান।',

    voiceAssistant: 'ভয়েস সহকারী',
    voiceListening: 'শুনছি... "পরের চেকআপ" বা "সাহায্য" বলুন',
    voiceTapToSpeak: 'বলতে স্পর্শ করুন',
    voiceMicPermissionReason: 'মাইক্রোফোন শুধু আপনার মুখের কথা অনুযায়ী পাতা খোলার জন্য ব্যবহৃত হয়।',
    voiceSupportedNotice: 'ভয়েস নির্দেশিকা আপনার ফোনেই নিরাপদে কাজ করে।'
  },

  // 4. ODIA (ଓଡ଼ିଆ)
  or: {
    appTitle: 'ମାତୃ-ନେତ୍ରା',
    appSubtitle: 'ମାତୃ ଓ ନବଜାତ ଯତ୍ନ ଗ୍ରିଡ୍',
    storyJourney: 'କାହାଣୀ ଯାତ୍ରା',
    myDashboard: 'ମୋ ଡ୍ୟାସବୋର୍ଡ',
    doctorStation: 'ଡାକ୍ତର ଷ୍ଟେସନ',
    ashaWorkspace: 'ଆଶା କର୍ମକ୍ଷେତ୍ର',
    motherPortal: 'ମାଆ ପୋର୍ଟାଲ',
    signIn: 'ଲଗ୍ ଇନ୍ କରନ୍ତୁ',
    signOut: 'ଲଗ୍ ଆଉଟ୍',
    online: 'ଅନଲାଇନ୍',
    offline: 'ଅଫଲାଇନ୍',
    changeLanguage: 'ଭାଷା ଓ ଅଞ୍ଚଳ ବଦଳାନ୍ତୁ',
    chooseRegion: 'ଆପଣଙ୍କ ରାଜ୍ୟ ବାଛନ୍ତୁ',

    regionHeading: 'ଆପଣଙ୍କ ଅଞ୍ଚଳ ବାଛନ୍ତୁ',
    regionSubheading: 'ଆମେ ଆପଣଙ୍କୁ ଆପଣଙ୍କ ନିଜ ଭାଷାରେ ମାତୃ-ନେତ୍ରା ବ୍ୟବହାର କରିବାରେ ସାହାଯ୍ୟ କରିବୁ।',
    interactiveMapTab: 'ଭାରତ ମାନଚିତ୍ର',
    searchListTab: 'ରାଜ୍ୟ ଓ ଜିଲ୍ଲା ଖୋଜନ୍ତୁ',
    searchPlaceholder: 'ରାଜ୍ୟ ବା ଜିଲ୍ଲା ଲେଖନ୍ତୁ...',
    selectDistrictPrompt: 'ଆପଣଙ୍କ ଜିଲ୍ଲା ଚୟନ କରନ୍ତୁ:',
    allDistricts: 'ସମସ୍ତ ଜିଲ୍ଲା / ଉପକେନ୍ଦ୍ର',
    suggestedLanguageTitle: 'ଆପଣଙ୍କ ଅଞ୍ଚଳ ପାଇଁ ପ୍ରସ୍ତାବିତ ଭାଷା',
    suggestedLanguageNote: 'ଆପଣ ଚାହିଁଲେ ଯେକୌଣସି ସମୟରେ ଅନ୍ୟ ଭାଷା ମଧ୍ୟ ବାଛିପାରିବେ।',
    confirmLanguage: 'ନିଶ୍ଚିତ କରନ୍ତୁ ଓ ଆଗକୁ ବଢ଼ନ୍ତୁ',
    chooseAnotherLanguage: 'ଅନ୍ୟ ଭାଷା ବାଛନ୍ତୁ',
    backToMap: '← ମାନଚିତ୍ରକୁ ଫେରନ୍ତୁ',
    allIndiaRegions: 'ଭାରତର ସମସ୍ତ ରାଜ୍ୟ',

    voiceWelcomeHeading: 'ନମସ୍କାର, ଗର୍ଭବତୀ ମାଆ',
    voiceWelcomeSubtitle: 'ଗର୍ଭାବସ୍ଥାରୁ ଶିଶୁର ଯତ୍ନ ପର୍ଯ୍ୟନ୍ତ ଆପଣଙ୍କ ବିଶ୍ୱସ୍ତ ସାଥୀ।',
    speakAloud: 'ସ୍ୱରରେ ଶୁଣନ୍ତୁ',
    stopSpeaking: 'ଶବ୍ଦ ବନ୍ଦ କରନ୍ତୁ',
    voiceInstruction: 'ଏହି ପୃଷ୍ଠାର ସୂଚନା ଶୁଣିବା ପାଇଁ ସ୍ପିକର୍ ବଟନ୍ ଦବାନ୍ତୁ।',
    myHealthAction: 'ମୋ ସ୍ୱାସ୍ଥ୍ୟ',
    myNextVisitAction: 'ମୋର ପରବର୍ତ୍ତୀ ଯାଞ୍ଚ',
    helpAction: 'ସାହାଯ୍ୟ ଓ ଆଶା ଦିଦି',
    myHealthDesc: 'ଗର୍ଭର ସପ୍ତାହ, ଶିଶୁର ବିକାଶ ଓ ଖାଦ୍ୟପେୟର ସୂଚନା ଦେଖନ୍ତୁ।',
    myNextVisitDesc: 'ଆପଣଙ୍କ ଆଗାମୀ ପରୀକ୍ଷା ତାରିଖ ଓ ଡାକ୍ତରୀ ପରାମର୍ଶ ଦେଖନ୍ତୁ।',
    helpDesc: 'ଆଶା ଦିଦିଙ୍କ ସହ କଥା ହୁଅନ୍ତୁ କିମ୍ବା ୧୦୨ ଆମ୍ବୁଲାନ୍ସ ଡାକନ୍ତୁ।',

    welcomeMother: 'ସ୍ୱାଗତ',
    weeksPregnant: 'ସପ୍ତାହର ଗର୍ଭାବସ୍ଥା',
    estimatedDeliveryDate: 'ସମ୍ଭାବ୍ୟ ପ୍ରସବ ତାରିଖ',
    daysRemaining: 'ଶିଶୁ ଆଗମନକୁ ବାକି ଥିବା ଦିନ',
    babyGrowthAnalogy: 'ଶିଶୁର ବିକାଶ ସୁସ୍ଥ ଓ ସ୍ୱାଭାବିକ ଅଛି (~୧୦୦୦ ଗ୍ରାମ)',
    nextCheckupTitle: 'ପରବର୍ତ୍ତୀ ସ୍ୱାସ୍ଥ୍ୟ ପରୀକ୍ଷା',
    readNextVisitAloud: 'ପରୀକ୍ଷା ତଥ୍ୟ ଶୁଣନ୍ତୁ',
    visitScheduled: 'ତାରିଖ ନିର୍ଦ୍ଧାରିତ',
    doctorCleared: 'ଡାକ୍ତରଙ୍କ ଦ୍ୱାରା ଯାଞ୍ଚ ହୋଇଛି',
    careJourneyTitle: 'ମୋ ଯତ୍ନ ଯାତ୍ରା',
    careJourneySub: 'ଗର୍ଭଧାରଣରୁ ନବଜାତ ଶିଶୁ ଯତ୍ନର ମୁଖ୍ୟ ପଦକ୍ଷେପ',
    remindersTitle: 'ଦୈନିକ ସ୍ୱାସ୍ଥ୍ୟ ନିୟମ',
    remindersSub: 'ସୁସ୍ଥ ରହିବା ପାଇଁ ଡାକ୍ତର ଓ ଆଶା ଦିଦିଙ୍କ ପରାମର୍ଶ',
    listenReminder: 'ଏହି ନିୟମ ଶୁଣନ୍ତୁ',
    nutritionTip: 'ପ୍ରତିଦିନ ଶାଗ, ଡାଲି ଏବଂ ତାଜା ଫଳ ଖାଆନ୍ତୁ।',
    medicineTip: 'ଦ୍ୱିପ୍ରହର ଖାଇବା ପରେ ଆଇରନ୍ ବଟିକା ଏବଂ ରାତିରେ କ୍ୟାଲସିୟମ୍ ବଟିକା ପାଣି ସହ ଖାଆନ୍ତୁ।',
    restTip: 'ଦିନରେ ୮-୧୦ ଗ୍ଲାସ୍ ପାଣି ପିଅନ୍ତୁ ଓ ବାମ ପାଖକୁ ଶୋଇ ବିଶ୍ରାମ ନିଅନ୍ତୁ।',
    ashaLifelineTitle: 'ଆପଣଙ୍କ ଆଶା ଦିଦି',
    ashaLifelineDesc: 'ଅନୀତା ଦିଦି ଆପଣଙ୍କ ଗାଁର ସ୍ୱାସ୍ଥ୍ୟକର୍ମୀ। ପରାମର୍ଶ ପାଇଁ ଫୋନ୍ କରନ୍ତୁ।',
    callAshaDidi: 'ଆଶା ଦିଦିଙ୍କୁ ଫୋନ୍ କରନ୍ତୁ',
    ambulance102: '୧୦୨ ମାଗଣା ଆମ୍ବୁଲାନ୍ସ',
    dangerSignsTitle: 'ବିପଦର ମୁଖ୍ୟ ଲକ୍ଷଣ',
    dangerSignsAlert: 'ପ୍ରବଳ ମୁଣ୍ଡବିନ୍ଧା, ରକ୍ତସ୍ରାବ ବା ଛୁଆର ଚଳପ୍ରଚଳ କମିଲେ ତୁରନ୍ତ ଆଶା ଦିଦିଙ୍କୁ ଜଣାନ୍ତୁ।',

    voiceAssistant: 'ଭଏସ୍ ସହାୟକ',
    voiceListening: 'ଶୁଣୁଛୁ... "ପରବର୍ତ୍ତୀ ଯାଞ୍ଚ" ବୋଲି କୁହନ୍ତୁ',
    voiceTapToSpeak: 'କହିବା ପାଇଁ ସ୍ପର୍ଶ କରନ୍ତୁ',
    voiceMicPermissionReason: 'ମାଇକ୍ରୋଫୋନ୍ କେବଳ ଆପଣଙ୍କ ନିର୍ଦ୍ଦେଶ ଅନୁସାରେ ପୃଷ୍ଠା ଖୋଲିବାକୁ ବ୍ୟବହୃତ ହୁଏ।',
    voiceSupportedNotice: 'ଭଏସ୍ ସେବା ଆପଣଙ୍କ ଫୋନରେ ସୁରକ୍ଷିତ ଭାବେ ଚାଲେ।'
  },

  // 5. MARATHI (मराठी)
  mr: {
    appTitle: 'मातृ-नेत्रा',
    appSubtitle: 'माता व नवजात काळजी ग्रीड',
    storyJourney: 'प्रवास कथा',
    myDashboard: 'माझे डॅशबोर्ड',
    doctorStation: 'डॉक्टर स्टेशन',
    ashaWorkspace: 'आशा कार्यक्षेत्र',
    motherPortal: 'माता पोर्टल',
    signIn: 'लॉग इन करा',
    signOut: 'लॉग आउट',
    online: 'ऑनलाइन',
    offline: 'ऑफलाइन',
    changeLanguage: 'भाषा व प्रदेश बदला',
    chooseRegion: 'आपला प्रदेश निवडा',

    regionHeading: 'आपला प्रदेश निवडा',
    regionSubheading: 'आपल्या मातृभाषेत मातृ-नेत्रा वापरण्यास आम्ही मदत करू.',
    interactiveMapTab: 'भारताचा नकाशा',
    searchListTab: 'राज्य व जिल्हे शोधा',
    searchPlaceholder: 'राज्य, जिल्हा किंवा भाषा शोधा...',
    selectDistrictPrompt: 'आपला जिल्हा निवडा (पर्यायी):',
    allDistricts: 'सर्व जिल्हे / उपकेंद्र',
    suggestedLanguageTitle: 'आपल्या प्रदेशासाठी सुचवलेली भाषा',
    suggestedLanguageNote: 'आपण हवी तेव्हा दुसरी भाषा देखील निवडू शकता.',
    confirmLanguage: 'निश्चित करा व पुढे जा',
    chooseAnotherLanguage: 'दुसरी भाषा निवडा',
    backToMap: '← नकाशावर परत जा',
    allIndiaRegions: 'भारतातील सर्व राज्ये व केंद्रशासित प्रदेश',

    voiceWelcomeHeading: 'नमस्कार, गरोदर माता',
    voiceWelcomeSubtitle: 'गर्भधारणेपासून ते नवजात बाळाच्या काळजीपर्यंत आपली विश्वासाची साथीदार.',
    speakAloud: 'आवाजात ऐका',
    stopSpeaking: 'आवाज थांबवा',
    voiceInstruction: 'ही माहिती आपल्या भाषेत ऐकण्यासाठी स्पीकर बटण दाबा.',
    myHealthAction: 'माझे आरोग्य',
    myNextVisitAction: 'माझी पुढची तपासणी',
    helpAction: 'मदत व आशा ताई',
    myHealthDesc: 'गर्भधारणेचे आठवडे, बाळाची वाढ आणि आहाराची माहिती पहा.',
    myNextVisitDesc: 'पुढील तपासणीची तारीख आणि डॉक्टरांचा सल्ला पहा.',
    helpDesc: 'गावातील आशा ताईंशी बोला किंवा १०२ रुग्णवाहिकेला कॉल करा.',

    welcomeMother: 'स्वागत आहे',
    weeksPregnant: 'आठवड्यांची गर्भधारणा',
    estimatedDeliveryDate: 'प्रसूतीची अंदाजित तारीख',
    daysRemaining: 'बाळाच्या आगमनाचे उरलेले दिवस',
    babyGrowthAnalogy: 'बाळाची वाढ निरोगी व उत्तम होत आहे (~१००० ग्रॅम)',
    nextCheckupTitle: 'आपली पुढची तपासणी',
    readNextVisitAloud: 'तपासणीची माहिती ऐका',
    visitScheduled: 'तारीख निश्चित - आशा व प्राथमिक आरोग्य केंद्र',
    doctorCleared: 'डॉक्टरांनी तपासणी पूर्ण केली',
    careJourneyTitle: 'माझा आरोग्य प्रवास',
    careJourneySub: 'गर्भधारणेपासून ते बाळंतपणापर्यंतचे महत्त्वाचे टप्पे',
    remindersTitle: 'दैनंदिन आरोग्याचे नियम',
    remindersSub: 'निरोगी राहण्यासाठी डॉक्टरांनी दिलेला सल्ला',
    listenReminder: 'हा सल्ला ऐका',
    nutritionTip: 'दररोज हिरव्या पालेभाज्या, डाळी आणि ताजी फळे खा.',
    medicineTip: 'दुपारच्या जेवणानंतर लोहाची गोळी आणि रात्री जेवणानंतर कॅल्शियमची गोळी पाण्यासोबत घ्या.',
    restTip: 'दिवसात ८-१० ग्लास पाणी प्या आणि दुपारी डाव्या कुशीवर झोपून विश्रांती घ्या.',
    ashaLifelineTitle: 'आपल्या आशा ताई',
    ashaLifelineDesc: 'अनिता ताई आपल्या गावातील आरोग्य कार्यकर्त्या आहेत. सल्ल्यासाठी कॉल करा.',
    callAshaDidi: 'आशा ताईंना फोन करा',
    ambulance102: '१०२ मोफत रुग्णवाहिका',
    dangerSignsTitle: 'धोक्याची महत्त्वाची लक्षणे',
    dangerSignsAlert: 'तीव्र डोकेदुखी, रक्तस्त्राव किंवा बाळाची हालचाल कमी झाल्यास त्वरित आशा ताईंना सांगा.',

    voiceAssistant: 'व्हॉइस सहाय्यक',
    voiceListening: 'ऐकत आहे... "पुढची तपासणी" किंवा "मदत" बोला',
    voiceTapToSpeak: 'बोलण्यासाठी स्पर्श करा',
    voiceMicPermissionReason: 'माइकचा वापर फक्त आपल्या बोलण्यानुसार स्क्रीन उघडण्यासाठी होतो.',
    voiceSupportedNotice: 'व्हॉइस सेवा आपल्या फोनवर सुरक्षितपणे चालते.'
  },

  // 6. TAMIL (தமிழ்)
  ta: {
    appTitle: 'மாத்ரு-நேத்ரா',
    appSubtitle: 'தாய் சேய் நல நெட்-கிரிட்',
    storyJourney: 'பயணக் கதை',
    myDashboard: 'எனது பக்கம்',
    doctorStation: 'மருத்துவர் நிலையம்',
    ashaWorkspace: 'ஆஷா களப்பணி',
    motherPortal: 'தாய்மார் தளம்',
    signIn: 'உள்நுழைக',
    signOut: 'வெளியேறு',
    online: 'ஆன்லைன்',
    offline: 'ஆஃப்லைன்',
    changeLanguage: 'மொழி & பிராந்தியம் மாற்றுக',
    chooseRegion: 'உங்கள் பிராந்தியத்தைத் தேர்ந்தெடுக்கவும்',

    regionHeading: 'உங்கள் பிராந்தியத்தைத் தேர்ந்தெடுக்கவும்',
    regionSubheading: 'உங்கள் சொந்த மொழியில் மாத்ரு-நேத்ராவைப் பயன்படுத்த உதவுவோம்.',
    interactiveMapTab: 'இந்திய வரைபடம்',
    searchListTab: 'மாநிலம் மற்றும் மாவட்டங்கள்',
    searchPlaceholder: 'மாநிலம் அல்லது மாவட்டம் தேடுக...',
    selectDistrictPrompt: 'உங்கள் மாவட்டத்தைத் தேர்வுசெய்க:',
    allDistricts: 'அனைத்து மாவட்டங்கள் / சுகாதார துணைநிலையம்',
    suggestedLanguageTitle: 'பரிந்துரைக்கப்பட்ட மொழி',
    suggestedLanguageNote: 'நீங்கள் எப்போது வேண்டுமானாலும் வேறு மொழியையும் தேர்ந்தெடுக்கலாம்.',
    confirmLanguage: 'உறுதிசெய்து தொடர்க',
    chooseAnotherLanguage: 'வேறு மொழி தேர்வுசெய்க',
    backToMap: '← வரைபடத்திற்குத் திரும்பு',
    allIndiaRegions: 'இந்தியாவின் அனைத்து மாநிலங்கள்',

    voiceWelcomeHeading: 'வணக்கம், கர்ப்பிணித் தாயே',
    voiceWelcomeSubtitle: 'கர்ப்ப காலம் முதல் குழந்தை பிறப்பு வரை உங்கள் நலம் காக்கும் துணை.',
    speakAloud: 'குரலில் கேட்க',
    stopSpeaking: 'நிறுத்து',
    voiceInstruction: 'இந்தத் திரையைத் தமிழில் கேட்க ஸ்பீக்கர் பொத்தானை அழுத்தவும்.',
    myHealthAction: 'என் உடல்நலம்',
    myNextVisitAction: 'அடுத்த பரிசோதனை',
    helpAction: 'உதவி & ஆஷா அக்கா',
    myHealthDesc: 'கர்ப்ப வாரங்கள், குழந்தையின் வளர்ச்சி மற்றும் சத்துணவு விவரங்கள்.',
    myNextVisitDesc: 'அடுத்த மருத்துவ பரிசோதனை தேதி மற்றும் ஆலோசனைகள்.',
    helpDesc: 'கிராம ஆஷா அக்காவை அழைக்கவும் அல்லது 102 ஆம்புலன்ஸை அழைக்கவும்.',

    welcomeMother: 'நல்வரவு',
    weeksPregnant: 'வாரங்கள் கர்ப்பம்',
    estimatedDeliveryDate: 'பிரசவ உத்தேச தேதி',
    daysRemaining: 'குழந்தை பிறக்க மீதமுள்ள நாட்கள்',
    babyGrowthAnalogy: 'குழந்தை நலமாக வளர்கிறது (~1000 கிராம்)',
    nextCheckupTitle: 'அடுத்த மருத்துவப் பரிசோதனை',
    readNextVisitAloud: 'பரிசோதனை விபரங்களை வாசி',
    visitScheduled: 'தேதி குறிக்கப்பட்டுள்ளது',
    doctorCleared: 'மருத்துவர் சரிபார்த்தார்',
    careJourneyTitle: 'என் தாய்மைப் பயணம்',
    careJourneySub: 'முக்கியமான கர்ப்ப கால நலப் படிகள்',
    remindersTitle: 'தினசரி நலக் குறிப்புகள்',
    remindersSub: 'ஆரோக்கியமாக இருக்க மருத்துவரின் அறிவுரைகள்',
    listenReminder: 'குறிப்பைக் கேட்க',
    nutritionTip: 'தினமும் கீரை, பருப்பு மற்றும் சத்தான பழங்களைச் சாப்பிடுங்கள்.',
    medicineTip: 'மதிய உணவுக்குப் பின் இரும்புச்சத்து மாத்திரையும், இரவு கால்சியம் மாத்திரையும் சாப்பிடவும்.',
    restTip: 'தினமும் 8-10 டம்ளர் தண்ணீர் குடிக்கவும், இடதுபுறமாகப் படுத்து ஓய்வெடுக்கவும்.',
    ashaLifelineTitle: 'உங்கள் ஆஷா அக்கா',
    ashaLifelineDesc: 'அனிதா உங்கள் கிராம சுகாதாரப் பணியாளர். ஆலோசனைக்கு அழைக்கவும்.',
    callAshaDidi: 'ஆஷா அக்காவை அழைக்க',
    ambulance102: '102 இலவச ஆம்புலன்ஸ்',
    dangerSignsTitle: 'ஆபத்து அறிகுறிகள்',
    dangerSignsAlert: 'கடும் தலைவலி, இரத்தப்போக்கு அல்லது குழந்தையின் அசைவு குறைந்தால் உடனே ஆஷா அக்காவை அணுகவும்.',

    voiceAssistant: 'குரல் உதவியாளர்',
    voiceListening: 'கேட்கிறது... "அடுத்த பரிசோதனை" அல்லது "உதவி" என்று பேசுங்கள்',
    voiceTapToSpeak: 'பேச அழுத்தவும்',
    voiceMicPermissionReason: 'உங்கள் குரல் கட்டளைகளைப் புரிந்துகொள்ள மட்டுமே மைக் பயன்படுத்தப்படுகிறது.',
    voiceSupportedNotice: 'குரல் சேவை உங்கள் போனிலேயே பாதுகாப்பாக இயங்குகிறது.'
  },

  // 7. TELUGU (తెలుగు)
  te: {
    appTitle: 'మాత్రు-నేత్ర',
    appSubtitle: 'తల్లి & నవజాత సంరక్షణ నెట్-గ్రిడ్',
    storyJourney: 'కథా ప్రయాణం',
    myDashboard: 'నా డాష్‌బోర్డ్',
    doctorStation: 'డాక్టర్ కేంద్రం',
    ashaWorkspace: 'ఆశా కార్యక్షేత్రం',
    motherPortal: 'తల్లి పోర్టల్',
    signIn: 'లాగిన్ చేయండి',
    signOut: 'లాగ్ అవుట్',
    online: 'ఆన్‌లైన్',
    offline: 'ఆఫ్‌లైన్',
    changeLanguage: 'భాష & ప్రాంతం మార్చండి',
    chooseRegion: 'మీ ప్రాంతాన్ని ఎంచుకోండి',

    regionHeading: 'మీ ప్రాంతాన్ని ఎంచుకోండి',
    regionSubheading: 'మీ మాతృభాషలో మాత్రు-నేత్ర ఉపయోగించడానికి మేము మీకు సహాయం చేస్తాము.',
    interactiveMapTab: 'భారతదేశ పటము',
    searchListTab: 'రాష్ట్రాలు & జిల్లాలు',
    searchPlaceholder: 'రాష్ట్రం లేదా జిల్లా శోధించండి...',
    selectDistrictPrompt: 'మీ జిల్లాను ఎంచుకోండి:',
    allDistricts: 'అన్ని జిల్లాలు',
    suggestedLanguageTitle: 'మీ ప్రాంతానికి సూచించిన భాష',
    suggestedLanguageNote: 'మీరు ఎప్పుడైనా మరొక భాషను ఎంచుకోవచ్చు.',
    confirmLanguage: 'నిర్ధారించి ముందుకు సాగండి',
    chooseAnotherLanguage: 'మరొక భాష ఎంచుకోండి',
    backToMap: '← పటానికి తిరిగి వెళ్లండి',
    allIndiaRegions: 'భారతదేశంలోని అన్ని రాష్ట్రాలు',

    voiceWelcomeHeading: 'నమస్కారం, గర్భిణీ తల్లి',
    voiceWelcomeSubtitle: 'గర్భధారణ నుండి నవజాత శిశువు సంరక్షణ వరకు మీ నమ్మకమైన తోడు.',
    speakAloud: 'వినండి',
    stopSpeaking: 'ఆపండి',
    voiceInstruction: 'ఈ పేజీని తెలుగులో వినడానికి స్పీకర్ బటన్‌ను నొక్కండి.',
    myHealthAction: 'నా ఆరోగ్యం',
    myNextVisitAction: 'నా తదుపరి పరీక్ష',
    helpAction: 'సహాయం & ఆశా అక్క',
    myHealthDesc: 'గర్భ వారాలు, శిశువు ఎదుగుదల మరియు పోషకాహార సమాచారం.',
    myNextVisitDesc: 'తదుపరి వైద్య పరీక్ష తేదీ మరియు వైద్యుల సలహాలు.',
    helpDesc: 'గ్రామ ఆశా కార్యకర్తను సంప్రదించండి లేదా 102 అంబులెన్స్‌కు కాల్ చేయండి.',

    welcomeMother: 'స్వాగతం',
    weeksPregnant: 'వారాల గర్భధారణ',
    estimatedDeliveryDate: 'ప్రసవ అంచనా తేదీ',
    daysRemaining: 'శిశువు రాకకు మిగిలిన రోజులు',
    babyGrowthAnalogy: 'శిశువు ఆరోగ్యంగా పెరుగుతోంది (~1000 గ్రా)',
    nextCheckupTitle: 'తదుపరి వైద్య పరీక్ష',
    readNextVisitAloud: 'పరీక్ష వివరాలు వినండి',
    visitScheduled: 'తేదీ ఖరారైంది',
    doctorCleared: 'వైద్యులు తనిఖీ చేశారు',
    careJourneyTitle: 'నా సంరక్షణ ప్రయాణం',
    careJourneySub: 'గర్భం నుండి డెలివరీ వరకు ముఖ్యమైన దశలు',
    remindersTitle: 'రోజువారీ ఆరోగ్య సూచనలు',
    remindersSub: 'ఆరోగ్యంగా ఉండటానికి వైద్యుల సలహాలు',
    listenReminder: 'ఈ సూచన వినండి',
    nutritionTip: 'రోజూ ఆకుకూరలు, పప్పులు మరియు తాజా పండ్లు తినండి.',
    medicineTip: 'మధ్యాహ్నం భోజనం తర్వాత ఐరన్ మాత్ర, రాత్రి కాల్షియం మాత్ర నీటితో వేసుకోండి.',
    restTip: 'రోజుకు 8-10 గ్లాసుల నీరు తాగండి, ఎడమవైపు తిరిగి విశ్రాంతి తీసుకోండి.',
    ashaLifelineTitle: 'మీ ఆశా అక్క',
    ashaLifelineDesc: 'అనిత మీ గ్రామ ఆరోగ్య కార్యకర్త. సహాయం కోసం కాల్ చేయండి.',
    callAshaDidi: 'ఆశా అక్కకు కాల్ చేయండి',
    ambulance102: '102 ఉచిత అంబులెన్స్',
    dangerSignsTitle: 'ప్రమాదకర సంకేతాలు',
    dangerSignsAlert: 'తీవ్ర తలనొప్పి, రక్తస్రావం లేదా శిశువు కదలికలు తగ్గితే వెంటనే ఆశా అక్కను సంప్రదించండి.',

    voiceAssistant: 'వాయిస్ సహాయకుడు',
    voiceListening: 'వింటున్నాము... "తదుపరి పరీక్ష" లేదా "సహాయం" అని చెప్పండి',
    voiceTapToSpeak: 'మాట్లాడటానికి తాకండి',
    voiceMicPermissionReason: 'మీ వాయిస్ ద్వారా స్క్రీన్ తెరవడానికి మాత్రమే మైక్ ఉపయోగించబడుతుంది.',
    voiceSupportedNotice: 'వాయిస్ సేవ మీ ఫోన్‌లోనే సురక్షితంగా పనిచేస్తుంది.'
  },

  // 8. GUJARATI (ગુજરાતી)
  gu: {
    appTitle: 'માતૃ-નેત્રા',
    appSubtitle: 'માતા અને નવજાત સંભાળ નેટ-ગ્રીડ',
    storyJourney: 'વાર્તા પ્રવાસ',
    myDashboard: 'મારું ડેશબોર્ડ',
    doctorStation: 'ડૉક્ટર સ્ટેશન',
    ashaWorkspace: 'આશા કાર્યક્ષેત્ર',
    motherPortal: 'માતા પોર્ટલ',
    signIn: 'લૉગ ઇન કરો',
    signOut: 'લૉગ આઉટ',
    online: 'ઑનલાઇન',
    offline: 'ઑફલાઇન',
    changeLanguage: 'ભાષા અને પ્રદેશ બદલો',
    chooseRegion: 'તમારો પ્રદેશ પસંદ કરો',

    regionHeading: 'તમારો પ્રદેશ પસંદ કરો',
    regionSubheading: 'અમે તમારી પોતાની ભાષામાં માતૃ-નેત્રા વાપરવામાં મદદ કરીશું.',
    interactiveMapTab: 'ભારતનો નકશો',
    searchListTab: 'રાજ્યો અને જિલ્લાઓ',
    searchPlaceholder: 'રાજ્ય અથવા જિલ્લો શોધો...',
    selectDistrictPrompt: 'તમારો જિલ્લો પસંદ કરો:',
    allDistricts: 'બધા જિલ્લાઓ',
    suggestedLanguageTitle: 'તમારા પ્રદેશ માટે સૂચવેલી ભાષા',
    suggestedLanguageNote: 'તમે ગમે ત્યારે બીજી ભાષા પણ પસંદ કરી શકો છો.',
    confirmLanguage: 'ખાતરી કરો અને આગળ વધો',
    chooseAnotherLanguage: 'બીજી ભાષા પસંદ કરો',
    backToMap: '← નકશા પર પાછા જાઓ',
    allIndiaRegions: 'ભારતના તમામ રાજ્યો',

    voiceWelcomeHeading: 'નમસ્તે, સગર્ભા માતા',
    voiceWelcomeSubtitle: 'ગર્ભાવસ્થાથી લઈને બાળકની સંભાળ સુધી તમારી વિશ્વાસુ સાથી.',
    speakAloud: 'અવાજમાં સાંભળો',
    stopSpeaking: 'અવાજ બંધ કરો',
    voiceInstruction: 'આ માહિતી ગુજરાતીમાં સાંભળવા માટે સ્પીકર બટન દબાવો.',
    myHealthAction: 'મારી તંદુરસ્તી',
    myNextVisitAction: 'મારી આગામી તપાસ',
    helpAction: 'મદદ અને આશા બહેન',
    myHealthDesc: 'ગર્ભાવસ્થાના અઠવાડિયા, બાળકના વિકાસ અને આહારની માહિતી.',
    myNextVisitDesc: 'આગામી તબીબી તપાસ તારીખ અને ડૉક્ટરની સલાહ.',
    helpDesc: 'ગામની આશા બહેનનો સંપર્ક કરો અથવા 102 એમ્બ્યુલન્સ બોલાવો.',

    welcomeMother: 'સ્વાગત છે',
    weeksPregnant: 'અઠવાડિયાનો ગર્ભ',
    estimatedDeliveryDate: 'સંભવિત ડિલિવરી તારીખ',
    daysRemaining: 'બાળકના આગમનના બાકી દિવસો',
    babyGrowthAnalogy: 'બાળકનો વિકાસ તંદુરસ્ત રીતે થઈ રહ્યો છે (~1000 ગ્રામ)',
    nextCheckupTitle: 'તમારી આગામી તપાસ',
    readNextVisitAloud: 'તપાસની માહિતી સાંભળો',
    visitScheduled: 'તારીખ નક્કી થઈ ગઈ છે',
    doctorCleared: 'ડૉક્ટર દ્વારા ચકાસાયેલ',
    careJourneyTitle: 'મારી સંભાળ યાત્રા',
    careJourneySub: 'ગર્ભાવસ્થાથી પ્રસૂતિ સુધીના મહત્વપૂર્ણ તબક્કા',
    remindersTitle: 'દૈનિક સ્વાસ્થ્ય નિયમો',
    remindersSub: 'સ્વસ્થ રહેવા માટે ડૉક્ટરની સલાહ',
    listenReminder: 'આ સલાહ સાંભળો',
    nutritionTip: 'રોજ લીલા પાંદડાવાળા શાકભાજી, દાળ અને તાજા ફળો ખાઓ.',
    medicineTip: 'બપોરે જમ્યા પછી આયર્નની ગોળી અને રાત્રે કેલ્શિયમની ગોળી પાણી સાથે લો.',
    restTip: 'દિવસમાં 8-10 ગ્લાસ પાણી પીવો અને બપોરે ડાબી બાજુ પડખું ફરી આરામ કરો.',
    ashaLifelineTitle: 'તમારા આશા બહેન',
    ashaLifelineDesc: 'અનીતા બહેન તમારા ગામના આરોગ્ય કાર્યકર છે. સલાહ માટે ફોન કરો.',
    callAshaDidi: 'આશા બહેનને ફોન કરો',
    ambulance102: '102 મફત એમ્બ્યુલન્સ',
    dangerSignsTitle: 'જોખમી લક્ષણો',
    dangerSignsAlert: 'તીવ્ર માથાનો દુખાવો, રક્તસ્રાવ અથવા બાળકની હલનચલન ઓછી થાય તો તરત આશા બહેનને જણાવો.',

    voiceAssistant: 'વૉઇસ આસિસ્ટન્ટ',
    voiceListening: 'સાંભળી રહ્યા છીએ... "આગામી તપાસ" અથવા "મદદ" બોલો',
    voiceTapToSpeak: 'બોલવા માટે સ્પર્શ કરો',
    voiceMicPermissionReason: 'માઇકનો ઉપયોગ ફક્ત તમારા બોલવા મુજબ સ્ક્રીન ખોલવા માટે થાય છે.',
    voiceSupportedNotice: 'વૉઇસ સુવિધા તમારા ફોન પર સુરક્ષિત રીતે ચાલે છે.'
  },

  // 9. PUNJABI (ਪੰਜਾਬੀ)
  pa: {
    appTitle: 'ਮਾਤਰੂ-ਨੇਤਰਾ',
    appSubtitle: 'ਮਾਵਾਂ ਤੇ ਨਵਜੰਮੇ ਬੱਚਿਆਂ ਦੀ ਦੇਖਭਾਲ ਗਰਿੱਡ',
    storyJourney: 'ਸਫ਼ਰ ਦੀ ਕਹਾਣੀ',
    myDashboard: 'ਮੇਰਾ ਡੈਸ਼ਬੋਰਡ',
    doctorStation: 'ਡਾਕਟਰ ਸਟੇਸ਼ਨ',
    ashaWorkspace: 'ਆਸ਼ਾ ਕਾਰਜ ਖੇਤਰ',
    motherPortal: 'ਮਾਤਾ ਪੋਰਟਲ',
    signIn: 'ਲਾਗ ਇਨ ਕਰੋ',
    signOut: 'ਲਾਗ ਆਊਟ',
    online: 'ਆਨਲਾਈਨ',
    offline: 'ਆਫਲਾਈਨ',
    changeLanguage: 'ਭਾਸ਼ਾ ਅਤੇ ਖੇਤਰ ਬਦਲੋ',
    chooseRegion: 'ਆਪਣਾ ਇਲਾਕਾ ਚੁਣੋ',

    regionHeading: 'ਆਪਣਾ ਇਲਾਕਾ ਚੁਣੋ',
    regionSubheading: 'ਅਸੀਂ ਤੁਹਾਡੀ ਆਪਣੀ ਬੋਲੀ ਵਿੱਚ ਮਾਤਰੂ-ਨੇਤਰਾ ਚਲਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰਾਂਗੇ।',
    interactiveMapTab: 'ਭਾਰਤ ਦਾ ਨਕਸ਼ਾ',
    searchListTab: 'ਸੂਬੇ ਅਤੇ ਜ਼ਿਲ੍ਹੇ',
    searchPlaceholder: 'ਸੂਬਾ ਜਾਂ ਜ਼ਿਲ੍ਹਾ ਲੱਭੋ...',
    selectDistrictPrompt: 'ਆਪਣਾ ਜ਼ਿਲ੍ਹਾ ਚੁਣੋ:',
    allDistricts: 'ਸਾਰੇ ਜ਼ਿਲ੍ਹੇ',
    suggestedLanguageTitle: 'ਤੁਹਾਡੇ ਇਲਾਕੇ ਲਈ ਸੁਝਾਈ ਗਈ ਬੋਲੀ',
    suggestedLanguageNote: 'ਤੁਸੀਂ ਕਿਸੇ ਵੀ ਵੇਲੇ ਕੋਈ ਹੋਰ ਬੋਲੀ ਵੀ ਚੁਣ ਸਕਦੇ ਹੋ।',
    confirmLanguage: 'ਪੁਸ਼ਟੀ ਕਰੋ ਅਤੇ ਅੱਗੇ ਵਧੋ',
    chooseAnotherLanguage: 'ਹੋਰ ਬੋਲੀ ਚੁਣੋ',
    backToMap: '← ਨਕਸ਼ੇ ਤੇ ਵਾਪਸ ਜਾਓ',
    allIndiaRegions: 'ਭਾਰਤ ਦੇ ਸਾਰੇ ਸੂਬੇ',

    voiceWelcomeHeading: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ, ਗਰਭਵਤੀ ਮਾਤਾ ਜੀ',
    voiceWelcomeSubtitle: 'ਗਰਭ ਅਵਸਥਾ ਤੋਂ ਲੈ ਕੇ ਬੱਚੇ ਦੀ ਦੇਖਭਾਲ ਤੱਕ ਤੁਹਾਡੀ ਸੱਚੀ ਸਾਥੀ।',
    speakAloud: 'ਆਵਾਜ਼ ਵਿੱਚ ਸੁਣੋ',
    stopSpeaking: 'ਆਵਾਜ਼ ਬੰਦ ਕਰੋ',
    voiceInstruction: 'ਇਹ ਜਾਣਕਾਰੀ ਪੰਜਾਬੀ ਵਿੱਚ ਸੁਣਨ ਲਈ ਸਪੀਕਰ ਬਟਨ ਦਬਾਓ।',
    myHealthAction: 'ਮੇਰੀ ਸਿਹਤ',
    myNextVisitAction: 'ਮੇਰੀ ਅਗਲੀ ਜਾਂਚ',
    helpAction: 'ਮਦਦ ਤੇ ਆਸ਼ਾ ਦੀਦੀ',
    myHealthDesc: 'ਗਰਭ ਦੇ ਹਫ਼ਤੇ, ਬੱਚੇ ਦਾ ਵਿਕਾਸ ਅਤੇ ਖ਼ੁਰਾਕ ਦੀ ਜਾਣਕਾਰੀ।',
    myNextVisitDesc: 'ਅਗਲੀ ਜਾਂਚ ਦੀ ਮਿਤੀ ਅਤੇ ਡਾਕਟਰ ਦੀ ਸਲਾਹ ਵੇਖੋ।',
    helpDesc: 'ਆਸ਼ਾ ਦੀਦੀ ਨਾਲ ਗੱਲ ਕਰੋ ਜਾਂ 102 ਐਂਬੂਲੈਂਸ ਨੂੰ ਫ਼ੋਨ ਕਰੋ।',

    welcomeMother: 'ਜੀ ਆਇਆਂ ਨੂੰ',
    weeksPregnant: 'ਹਫ਼ਤਿਆਂ ਦਾ ਗਰਭ',
    estimatedDeliveryDate: 'ਜਣੇਪੇ ਦੀ ਸੰਭਾਵਿਤ ਮਿਤੀ',
    daysRemaining: 'ਬੱਚੇ ਦੇ ਆਉਣ ਵਿੱਚ ਬਾਕੀ ਦਿਨ',
    babyGrowthAnalogy: 'ਬੱਚੇ ਦਾ ਵਾਧਾ ਤੰਦਰੁਸਤ ਤੇ ਠੀਕ ਹੋ ਰਿਹਾ ਹੈ (~1000 ਗ੍ਰਾਮ)',
    nextCheckupTitle: 'ਤੁਹਾਡੀ ਅਗਲੀ ਜਾਂਚ',
    readNextVisitAloud: 'ਜਾਂਚ ਦੀ ਜਾਣਕਾਰੀ ਸੁਣੋ',
    visitScheduled: 'ਮਿਤੀ ਤੈਅ ਹੈ',
    doctorCleared: 'ਡਾਕਟਰ ਵੱਲੋਂ ਜਾਂਚ ਕੀਤੀ ਗਈ',
    careJourneyTitle: 'ਮੇਰੀ ਸਿਹਤ ਯਾਤਰਾ',
    careJourneySub: 'ਗਰਭ ਧਾਰਨ ਤੋਂ ਜਣੇਪੇ ਤੱਕ ਦੇ ਮੁੱਖ ਪੜਾਅ',
    remindersTitle: 'ਰੋਜ਼ਾਨਾ ਸਿਹਤ ਸੁਝਾਅ',
    remindersSub: 'ਸਿਹਤਮੰਦ ਰਹਿਣ ਲਈ ਡਾਕਟਰ ਦੇ ਨਿਯਮ',
    listenReminder: 'ਇਹ ਸੁਝਾਅ ਸੁਣੋ',
    nutritionTip: 'ਰੋਜ਼ ਹਰੀਆਂ ਪੱਤੇਦਾਰ ਸਬਜ਼ੀਆਂ, ਦਾਲਾਂ ਅਤੇ ਤਾਜ਼ੇ ਫਲ ਖਾਓ।',
    medicineTip: 'ਦੁਪਹਿਰ ਦੀ ਰੋਟੀ ਤੋਂ ਬਾਅਦ ਆਇਰਨ ਦੀ ਗੋਲੀ ਅਤੇ ਰਾਤ ਨੂੰ ਕੈਲਸ਼ੀਅਮ ਦੀ ਗੋਲੀ ਪਾਣੀ ਨਾਲ ਲਵੋ।',
    restTip: 'ਦਿਨ ਵਿੱਚ 8-10 ਗਲਾਸ ਪਾਣੀ ਪੀਓ ਅਤੇ ਦੁਪਹਿਰੇ ਖੱਬੇ ਪਾਸੇ ਪਾਸਾ ਲੈ ਕੇ ਅਰਾਮ ਕਰੋ।',
    ashaLifelineTitle: 'ਤੁਹਾਡੀ ਆਸ਼ਾ ਦੀਦੀ',
    ashaLifelineDesc: 'ਅਨੀਤਾ ਦੀਦੀ ਤੁਹਾਡੇ ਪਿੰਡ ਦੀ ਸਿਹਤ ਵਰਕਰ ਹੈ। ਸਲਾਹ ਲਈ ਫ਼ੋਨ ਕਰੋ।',
    callAshaDidi: 'ਆਸ਼ਾ ਦੀਦੀ ਨੂੰ ਫ਼ੋਨ ਕਰੋ',
    ambulance102: '102 ਮੁਫ਼ਤ ਐਂਬੂਲੈਂਸ',
    dangerSignsTitle: 'ਖ਼ਤਰੇ ਦੇ ਲੱਛਣ',
    dangerSignsAlert: 'ਸਿਰ ਵਿੱਚ ਤੇਜ਼ ਦਰਦ, ਖੂਨ ਪੈਣਾ ਜਾਂ ਬੱਚੇ ਦੀ ਹਰਕਤ ਘਟਣ ਤੇ ਤੁਰੰਤ ਆਸ਼ਾ ਦੀਦੀ ਨੂੰ ਦੱਸੋ।',

    voiceAssistant: 'ਵੌਇਸ ਸਹਾਇਕ',
    voiceListening: 'ਸੁਣ ਰਹੇ ਹਾਂ... "ਅਗਲੀ ਜਾਂਚ" ਜਾਂ "ਮਦਦ" ਬੋਲੋ',
    voiceTapToSpeak: 'ਬੋਲਣ ਲਈ ਛੋਹਵੋ',
    voiceMicPermissionReason: 'ਮਾਈਕ ਦੀ ਵਰਤੋਂ ਸਿਰਫ਼ ਤੁਹਾਡੀ ਬੋਲੀ ਮੁਤਾਬਕ ਪੰਨਾ ਖੋਲ੍ਹਣ ਲਈ ਹੁੰਦੀ ਹੈ।',
    voiceSupportedNotice: 'ਵੌਇਸ ਸੇਵਾ ਤੁਹਾਡੇ ਫ਼ੋਨ ਤੇ ਸੁਰੱਖਿਅਤ ਢੰਗ ਨਾਲ ਚੱਲਦੀ ਹੈ।'
  },

  // 10. MALAYALAM (മലയാളം)
  ml: {
    appTitle: 'മാതൃ-നേത്ര',
    appSubtitle: 'മാതൃ-ശിശു സംരക്ഷണ നെറ്റ്-ഗ്രിഡ്',
    storyJourney: 'യാത്രാ വിവരണം',
    myDashboard: 'എന്റെ ഡാഷ്‌ബോർഡ്',
    doctorStation: 'ഡോക്ടർ കേന്ദ്രം',
    ashaWorkspace: 'ആശാ പ്രവർത്തക തளம்',
    motherPortal: 'അമ്മമാർക്കുള്ള പോർട്ടൽ',
    signIn: 'പ്രവേശിക്കുക',
    signOut: 'പുറത്തുകടക്കുക',
    online: 'ഓൺലൈൻ',
    offline: 'ഓഫ്‌ലൈൻ',
    changeLanguage: 'ഭാഷയും പ്രദേശവും മാറ്റുക',
    chooseRegion: 'നിങ്ങളുടെ പ്രദേശം തിരഞ്ഞെടുക്കുക',

    regionHeading: 'നിങ്ങളുടെ പ്രദേശം തിരഞ്ഞെടുക്കുക',
    regionSubheading: 'നിങ്ങളുടെ സ്വന്തം ഭാഷയിൽ മാതൃ-നേത്ര ഉപയോഗിക്കാൻ ഞങ്ങൾ സഹായിക്കും.',
    interactiveMapTab: 'ഇന്ത്യാ മാപ്പ്',
    searchListTab: 'സംസ്ഥാനങ്ങളും ജില്ലകളും',
    searchPlaceholder: 'സംസ്ഥാനം അല്ലെങ്കിൽ ജില്ല തിരയുക...',
    selectDistrictPrompt: 'നിങ്ങളുടെ ജില്ല തിരഞ്ഞെടുക്കുക:',
    allDistricts: 'എല്ലാ ജില്ലകളും',
    suggestedLanguageTitle: 'നിങ്ങളുടെ പ്രദേശത്തിന് അനുയോജ്യമായ ഭാഷ',
    suggestedLanguageNote: 'നിങ്ങൾക്ക് എപ്പോൾ വേണമെങ്കിലും മറ്റൊരു ഭാഷയും തിരഞ്ഞെടുക്കാം.',
    confirmLanguage: 'സ്ഥിരീകരിച്ച് മുന്നോട്ട് പോകുക',
    chooseAnotherLanguage: 'മറ്റൊരു ഭാഷ തിരഞ്ഞെടുക്കുക',
    backToMap: '← മാപ്പിലേക്ക് മടങ്ങുക',
    allIndiaRegions: 'ഇന്ത്യയിലെ എല്ലാ സംസ്ഥാനങ്ങളും',

    voiceWelcomeHeading: 'നമസ്കാരം, ഗർഭിണിയായ അമ്മേ',
    voiceWelcomeSubtitle: 'ഗർഭകാലം മുതൽ കുഞ്ഞിന്റെ സംരക്ഷണം വരെ നിങ്ങളുടെ വിശ്വസ്ത കൂട്ടുകാരി.',
    speakAloud: 'ശബ്ദത്തിൽ കേൾക്കുക',
    stopSpeaking: 'നിർത്തുക',
    voiceInstruction: 'ഈ പേജ് മലയാളത്തിൽ കേൾക്കാൻ സ്പീക്കർ ബട്ടൺ അമർത്തുക.',
    myHealthAction: 'എന്റെ ആരോഗ്യം',
    myNextVisitAction: 'അടുത്ത സന്ദർശനം',
    helpAction: 'സഹായവും ആശാ ചേച്ചിയും',
    myHealthDesc: 'ഗർഭ ആഴ്ചകൾ, കുഞ്ഞിന്റെ വളർച്ച, പോഷകാഹാര വിവരങ്ങൾ.',
    myNextVisitDesc: 'അടുത്ത പരിശോധനാ തീയതിയും ഡോക്ടറുടെ നിർദ്ദേശങ്ങളും.',
    helpDesc: 'ആശാ ചേച്ചിയെ വിളിക്കുക അല്ലെങ്കിൽ 102 ആംബുലൻസ് വിളിക്കുക.',

    welcomeMother: 'സ്വാഗതം',
    weeksPregnant: 'ആഴ്ച ഗർഭിണിയാണ്',
    estimatedDeliveryDate: 'പ്രസവ സാധ്യതാ തീയതി',
    daysRemaining: 'കുഞ്ഞിനെ കാണാൻ ശേഷിക്കുന്ന ദിവസങ്ങൾ',
    babyGrowthAnalogy: 'കുഞ്ഞിന്റെ വളർച്ച ആരോഗ്യകരമായി തുടരുന്നു (~1000 ഗ്രാം)',
    nextCheckupTitle: 'അടുത്ത ആരോഗ്യ പരിശോധന',
    readNextVisitAloud: 'പരിശോധനാ വിവരങ്ങൾ കേൾക്കുക',
    visitScheduled: 'തീയതി നിശ്ചയിച്ചു',
    doctorCleared: 'ഡോക്ടർ പരിശോധിച്ചു',
    careJourneyTitle: 'എന്റെ മാതൃത്വ യാത്ര',
    careJourneySub: 'ഗർഭകാലം മുതൽ പ്രസവം വരെയുള്ള പ്രധാന ഘട്ടങ്ങൾ',
    remindersTitle: 'പ്രതിദിന ആരോഗ്യ നിർദ്ദേശങ്ങൾ',
    remindersSub: 'ആരോഗ്യത്തോടെയിരിക്കാൻ ഡോക്ടറുടെ നിർദ്ദേശങ്ങൾ',
    listenReminder: 'ഈ നിർദ്ദേശം കേൾക്കുക',
    nutritionTip: 'ദിവസവും ഇലക്കറികളും പരിപ്പും പഴങ്ങളും കഴിക്കുക.',
    medicineTip: 'ഉച്ചഭക്ഷണത്തിന് ശേഷം അയൺ ഗുളികയും രാത്രി കാൽസ്യം ഗുളികയും വെള്ളത്തോടൊപ്പം കഴിക്കുക.',
    restTip: 'ദിവസവും 8-10 ഗ്ലാസ് വെള്ളം കുടിക്കുക, ഉച്ചയ്ക്ക് ഇടതുവശം ചരിഞ്ഞ് കിടന്ന് വിശ്രമിക്കുക.',
    ashaLifelineTitle: 'നിങ്ങളുടെ ആശാ ചേച്ചി',
    ashaLifelineDesc: 'അനിത നിങ്ങളുടെ ഗ്രാമത്തിലെ ആരോഗ്യ പ്രവർത്തകയാണ്. സഹായത്തിന് വിളിക്കുക.',
    callAshaDidi: 'ആശാ ചേച്ചിയെ വിളിക്കുക',
    ambulance102: '102 സൗജന്യ ആംബുലൻസ്',
    dangerSignsTitle: 'അപകട ലക്ഷണങ്ങൾ',
    dangerSignsAlert: 'കഠിനമായ തലവേദന, രക്തസ്രാവം അല്ലെങ്കിൽ കുഞ്ഞിന്റെ അനക്കം കുറഞ്ഞാൽ ഉടൻ ആശാ ചേച്ചിയെ അറിയിക്കുക.',

    voiceAssistant: 'വോയ്സ് അസിസ്റ്റന്റ്',
    voiceListening: 'കേൾക്കുന്നു... "അടുത്ത സന്ദർശനം" അല്ലെങ്കിൽ "സഹായം" എന്ന് പറയൂ',
    voiceTapToSpeak: 'സംസാരിക്കാൻ തൊടുക',
    voiceMicPermissionReason: 'നിങ്ങളുടെ ശബ്ദം തിരിച്ചറിഞ്ഞ് പേജ് തുറക്കാൻ മാത്രമാണ് മൈക്ക് ഉപയോഗിക്കുന്നത്.',
    voiceSupportedNotice: 'വോയ്സ് സേവനം നിങ്ങളുടെ ഫോണിൽ സുരക്ഷിതമായി പ്രവർത്തിക്കുന്നു.'
  },

  // 11. ASSAMESE (অসমীয়া)
  as: {
    appTitle: 'মাতৃ-নেত্ৰা',
    appSubtitle: 'মাতৃ আৰু নৱজাতক যত্ন নেট-গ্ৰিড',
    storyJourney: 'যাত্ৰাৰ কাহিনী',
    myDashboard: 'মোৰ ডেশ্ববৰ্ড',
    doctorStation: 'ডাক্তৰ কেন্দ্ৰ',
    ashaWorkspace: 'আশা কৰ্মক্ষেত্ৰ',
    motherPortal: 'মাতৃ পৰ্টেল',
    signIn: 'লগ ইন কৰক',
    signOut: 'লগ আউট',
    online: 'অনলাইন',
    offline: 'অফলাইন',
    changeLanguage: 'ভাষা আৰু অঞ্চল সলনি কৰক',
    chooseRegion: 'আপোনাৰ অঞ্চল বাছক',

    regionHeading: 'আপোনাৰ অঞ্চল বাছক',
    regionSubheading: 'আমি আপোনাৰ নিজৰ ভাষাত মাতৃ-নেত্ৰা ব্যৱহাৰ কৰাত সহায় কৰিম।',
    interactiveMapTab: 'ভাৰতৰ মানচিত্ৰ',
    searchListTab: 'ৰাজ্য আৰু জিলাসমূহ',
    searchPlaceholder: 'ৰাজ্য বা জিলা বিচাৰক...',
    selectDistrictPrompt: 'আপোনাৰ জিলা নিৰ্বাচন কৰক:',
    allDistricts: 'সকলো জিলা',
    suggestedLanguageTitle: 'আপোনাৰ অঞ্চলৰ বাবে প্ৰস্তাৱিত ভাষা',
    suggestedLanguageNote: 'আপুনি যিকোনো সময়ত আন ভাষাও বাছনি কৰিব পাৰে।',
    confirmLanguage: 'নিশ্চিত কৰি আগবাঢ়ক',
    chooseAnotherLanguage: 'আন এটা ভাষা বাছক',
    backToMap: '← মানচিত্ৰলৈ উভতি যাওক',
    allIndiaRegions: 'ভাৰতৰ সকলো ৰাজ্য',

    voiceWelcomeHeading: 'নমস্কাৰ, গৰ্ভৱতী মাতৃ',
    voiceWelcomeSubtitle: 'গৰ্ভাৱস্থাৰ পৰা নৱজাতকৰ যত্নলৈকে আপোনাৰ বিশ্বাসী সংগী।',
    speakAloud: 'শব্দত শুনক',
    stopSpeaking: 'বন্ধ কৰক',
    voiceInstruction: 'এই পৃষ্ঠাৰ তথ্য অসমীয়াত শুনিবলৈ স্পীকাৰ বুটামত টিপক।',
    myHealthAction: 'মোৰ স্বাস্থ্য',
    myNextVisitAction: 'মোৰ পৰৱৰ্তী পৰীক্ষা',
    helpAction: 'সহায় আৰু আশা বাইদেউ',
    myHealthDesc: 'গৰ্ভৰ সপ্তাহ, শিশুৰ বিকাশ আৰু পুষ্টিৰ তথ্য চাওক।',
    myNextVisitDesc: 'পৰৱৰ্তী স্বাস্থ্য পৰীক্ষাৰ তাৰিখ আৰু ডাক্তৰৰ পৰামৰ্শ চাওক।',
    helpDesc: 'আশা বাইদেউক ফোন কৰক বা ১০২ এম্বুলেন্স মাতক।',

    welcomeMother: 'স্বাগতম',
    weeksPregnant: 'সপ্তাহৰ গৰ্ভৱতী',
    estimatedDeliveryDate: 'প্ৰসৱৰ সম্ভাৱ্য তাৰিখ',
    daysRemaining: 'শিশুৰ আগমনলৈ বাকী থকা দিন',
    babyGrowthAnalogy: 'শিশুৰ বিকাশ সুস্থ আৰু স্বাভাবিক হৈছে (~১০০০ গ্ৰাম)',
    nextCheckupTitle: 'পৰৱৰ্তী স্বাস্থ্য পৰীক্ষা',
    readNextVisitAloud: 'পৰীক্ষাৰ তথ্য শুনক',
    visitScheduled: 'তাৰিখ নিৰ্ধাৰিত',
    doctorCleared: 'ডাক্তৰৰ দ্বাৰা পৰীক্ষিত',
    careJourneyTitle: 'মোৰ যত্ন যাত্ৰা',
    careJourneySub: 'গৰ্ভাৱস্থাৰ পৰা প্ৰসৱলৈকে গুৰুত্বপূৰ্ণ পদক্ষেপ',
    remindersTitle: 'দৈনন্দিন স্বাস্থ্য বিধি',
    remindersSub: 'সুস্থ হৈ থাকিবলৈ ডাক্তৰৰ পৰামৰ্শ',
    listenReminder: 'পৰামৰ্শ শুনক',
    nutritionTip: 'প্ৰতিদিনে সেউজীয়া শাক-পাচলি, দাইল আৰু সতেজ ফল খাওক।',
    medicineTip: 'দুপৰীয়া আহাৰৰ পিছত আইৰণ টেবলেট আৰু ৰাতি কেলচিয়াম টেবলেট পানীৰে খাব।',
    restTip: 'দিনত ৮-১০ গিলাচ পানী খাওক আৰু দুপৰীয়া বাওঁফালে কাটি হৈ জিৰণি লওক।',
    ashaLifelineTitle: 'আপোনাৰ আশা বাইদেউ',
    ashaLifelineDesc: 'অনিতা বাইদেউ আপোনাৰ গাঁৱৰ স্বাস্থ্যকৰ্মী। সহায়ৰ বাবে ফোন কৰক।',
    callAshaDidi: 'আশা বাইদেউক ফোন কৰক',
    ambulance102: '১০২ বিনামূলীয়া এম্বুলেন্স',
    dangerSignsTitle: 'বিপদৰ লক্ষণসমূহ',
    dangerSignsAlert: 'তীব্ৰ মূৰৰ বিষ, ৰক্তস্ৰাৱ বা শিশুৰ লৰচৰ কমিলে তৎক্ষণাৎ আশা বাইদেউক জনাওক।',

    voiceAssistant: 'ভয়েচ সহায়ক',
    voiceListening: 'শুনি আছোঁ... "পৰৱৰ্তী পৰীক্ষা" বা "সহায়" কওক',
    voiceTapToSpeak: 'কবলৈ স্পৰ্শ কৰক',
    voiceMicPermissionReason: 'মাইক্ৰফোন কেৱল আপোনাৰ মাত বুজি পৃষ্ঠা খুলিবলৈ ব্যৱহাৰ কৰা হয়।',
    voiceSupportedNotice: 'ভয়েচ সেৱা আপোনাৰ ফোনতে সুৰক্ষিতভাৱে চলে।'
  }
};

/**
 * Universal safe translation getter with multi-tier fallback.
 * Guaranteed to NEVER output a raw missing key.
 */
export function t(key: keyof TranslationDictionary, lang: Language = 'en'): string {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  if (dict && dict[key]) {
    return dict[key];
  }
  // Tier 2: Hindi fallback (widely understood national language in rural areas)
  if (TRANSLATIONS.hi && TRANSLATIONS.hi[key]) {
    return TRANSLATIONS.hi[key];
  }
  // Tier 3: English base fallback
  if (TRANSLATIONS.en && TRANSLATIONS.en[key]) {
    return TRANSLATIONS.en[key];
  }
  // Safe human-readable string fallback if key format is camelCase
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
}

/**
 * All supported language descriptors for UI language switchers
 */
export const SUPPORTED_LANGUAGES: { code: Language; name: string; nativeName: string; region: string }[] = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', region: 'North / Central India' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', region: 'West Bengal & Tripura' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', region: 'Odisha' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', region: 'Maharashtra' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', region: 'Tamil Nadu' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', region: 'Andhra Pradesh & Telangana' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', region: 'Gujarat' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', region: 'Punjab' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', region: 'Kerala' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', region: 'Assam' },
  { code: 'en', name: 'English', nativeName: 'English', region: 'Pan-India' },
];

