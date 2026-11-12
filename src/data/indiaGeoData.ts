import { Language } from '../types';

/**
 * Geographic Boundary & Region-to-Language Mapping Dataset for India
 * Source Reference: 
 * - Open Government Data Platform India (data.gov.in)
 * - Survey of India administrative boundary references
 * - Census of India Language Division distributions
 * Appropriately licensed under Open Database License (ODbL) / Open Government Data License (OGDL).
 */

export interface RegionState {
  id: string; // e.g. 'WB'
  name: string; // e.g. 'West Bengal'
  nativeName: string; // e.g. 'পশ্চিমবঙ্গ'
  center: [number, number]; // [lat, lng]
  zoom: number;
  defaultLanguage: Language;
  suggestedLanguages: { code: Language; label: string; nativeLabel: string }[];
  districts: string[];
  // Simplified vector polygon for Leaflet interactive rendering
  polygon: [number, number][]; 
}

export const INDIA_STATES_DATA: RegionState[] = [
  {
    id: 'WB',
    name: 'West Bengal',
    nativeName: 'পশ্চিমবঙ্গ',
    center: [23.5, 87.8],
    zoom: 7,
    defaultLanguage: 'bn',
    suggestedLanguages: [
      { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা' },
      { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
      { code: 'en', label: 'English', nativeLabel: 'English' }
    ],
    districts: [
      'Nadia',
      'Murshidabad',
      'Birbhum',
      'Bankura',
      'Purulia',
      'Bardhaman',
      'Malda',
      'South 24 Parganas',
      'North 24 Parganas',
      'Hooghly',
      'Howrah',
      'Darjeeling'
    ],
    polygon: [
      [27.2, 88.3], [26.8, 89.8], [26.3, 89.8], [25.3, 88.8],
      [24.8, 88.0], [24.0, 88.5], [22.5, 89.0], [21.5, 88.2],
      [21.8, 87.2], [22.4, 86.8], [23.5, 86.8], [24.3, 87.1],
      [25.0, 87.8], [26.5, 88.0], [27.2, 88.3]
    ]
  },
  {
    id: 'OD',
    name: 'Odisha',
    nativeName: 'ଓଡ଼ିଶା',
    center: [20.5, 84.5],
    zoom: 7,
    defaultLanguage: 'or',
    suggestedLanguages: [
      { code: 'or', label: 'Odia', nativeLabel: 'ଓଡ଼ିଆ' },
      { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
      { code: 'en', label: 'English', nativeLabel: 'English' }
    ],
    districts: [
      'Cuttack',
      'Puri',
      'Mayurbhanj',
      'Balasore',
      'Ganjam',
      'Khordha',
      'Sambalpur',
      'Koraput',
      'Sundargarh',
      'Kalahandi',
      'Bhadrak'
    ],
    polygon: [
      [22.5, 86.5], [21.8, 87.3], [20.8, 86.9], [19.8, 86.0],
      [19.0, 85.0], [18.3, 84.0], [18.0, 82.5], [18.8, 82.2],
      [20.0, 82.8], [21.2, 83.5], [22.2, 84.2], [22.5, 86.5]
    ]
  },
  {
    id: 'MH',
    name: 'Maharashtra',
    nativeName: 'महाराष्ट्र',
    center: [19.5, 75.7],
    zoom: 6,
    defaultLanguage: 'mr',
    suggestedLanguages: [
      { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी' },
      { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
      { code: 'en', label: 'English', nativeLabel: 'English' }
    ],
    districts: [
      'Pune',
      'Nashik',
      'Thane',
      'Nagpur',
      'Aurangabad',
      'Solapur',
      'Kolhapur',
      'Amravati',
      'Nanded',
      'Jalgaon',
      'Satara',
      'Ahmednagar'
    ],
    polygon: [
      [22.0, 74.0], [21.5, 76.5], [21.7, 79.5], [21.3, 80.8],
      [19.0, 80.3], [18.5, 78.0], [17.5, 76.0], [15.8, 74.2],
      [15.8, 73.5], [18.0, 72.8], [20.0, 72.7], [20.8, 73.2],
      [22.0, 74.0]
    ]
  },
  {
    id: 'TN',
    name: 'Tamil Nadu',
    nativeName: 'தமிழ்நாடு',
    center: [11.1, 78.6],
    zoom: 7,
    defaultLanguage: 'ta',
    suggestedLanguages: [
      { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்' },
      { code: 'en', label: 'English', nativeLabel: 'English' }
    ],
    districts: [
      'Madurai',
      'Coimbatore',
      'Tiruchirappalli',
      'Salem',
      'Tirunelveli',
      'Thanjavur',
      'Vellore',
      'Kanchipuram',
      'Dindigul',
      'Erode',
      'Cuddalore'
    ],
    polygon: [
      [13.5, 80.3], [12.0, 79.8], [10.5, 79.8], [9.3, 79.2],
      [8.1, 77.5], [8.8, 77.2], [10.2, 76.8], [11.5, 76.5],
      [12.3, 77.8], [13.2, 79.5], [13.5, 80.3]
    ]
  },
  {
    id: 'UP',
    name: 'Uttar Pradesh',
    nativeName: 'उत्तर प्रदेश',
    center: [27.0, 80.5],
    zoom: 6,
    defaultLanguage: 'hi',
    suggestedLanguages: [
      { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
      { code: 'en', label: 'English', nativeLabel: 'English' }
    ],
    districts: [
      'Varanasi',
      'Gorakhpur',
      'Rampur',
      'Bareilly',
      'Prayagraj',
      'Lucknow',
      'Kanpur',
      'Agra',
      'Aligarh',
      'Meerut',
      'Ayodhya',
      'Jhansi'
    ],
    polygon: [
      [30.2, 77.6], [29.0, 80.0], [28.5, 81.5], [27.5, 83.5],
      [26.5, 84.5], [25.0, 83.2], [24.0, 82.8], [24.5, 81.0],
      [25.5, 78.5], [26.8, 77.5], [28.5, 77.3], [30.2, 77.6]
    ]
  },
  {
    id: 'BR',
    name: 'Bihar',
    nativeName: 'बिहार',
    center: [25.6, 85.5],
    zoom: 7,
    defaultLanguage: 'hi',
    suggestedLanguages: [
      { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
      { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা' },
      { code: 'en', label: 'English', nativeLabel: 'English' }
    ],
    districts: [
      'Patna',
      'Gaya',
      'Muzaffarpur',
      'Bhagalpur',
      'Darbhanga',
      'Purnia',
      'Samastipur',
      'Begusarai',
      'Madhubani',
      'Rohtas'
    ],
    polygon: [
      [27.5, 84.0], [27.0, 86.5], [26.5, 88.0], [25.2, 87.8],
      [24.5, 86.8], [24.5, 84.0], [25.0, 83.3], [26.0, 84.0],
      [27.5, 84.0]
    ]
  },
  {
    id: 'AS',
    name: 'Assam',
    nativeName: 'অসম',
    center: [26.2, 92.8],
    zoom: 7,
    defaultLanguage: 'as',
    suggestedLanguages: [
      { code: 'as', label: 'Assamese', nativeLabel: 'অসমীয়া' },
      { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা' },
      { code: 'en', label: 'English', nativeLabel: 'English' }
    ],
    districts: [
      'Kamrup',
      'Dibrugarh',
      'Silchar (Cachar)',
      'Jorhat',
      'Nagaon',
      'Sonitpur',
      'Barpeta',
      'Tinsukia',
      'Golaghat'
    ],
    polygon: [
      [27.8, 94.5], [27.0, 95.5], [26.0, 94.0], [24.5, 93.0],
      [24.8, 92.5], [26.0, 90.0], [26.8, 90.0], [27.0, 92.0],
      [27.8, 94.5]
    ]
  },
  {
    id: 'GJ',
    name: 'Gujarat',
    nativeName: 'ગુજરાત',
    center: [22.3, 71.8],
    zoom: 7,
    defaultLanguage: 'gu',
    suggestedLanguages: [
      { code: 'gu', label: 'Gujarati', nativeLabel: 'ગુજરાતી' },
      { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
      { code: 'en', label: 'English', nativeLabel: 'English' }
    ],
    districts: [
      'Ahmedabad',
      'Surat',
      'Vadodara',
      'Rajkot',
      'Bhavnagar',
      'Jamnagar',
      'Junagadh',
      'Kutch',
      'Anand',
      'Mehsana'
    ],
    polygon: [
      [24.5, 71.0], [24.0, 73.5], [22.5, 74.0], [21.0, 73.0],
      [20.5, 72.8], [21.2, 72.2], [21.0, 70.0], [22.2, 69.0],
      [23.5, 68.5], [24.0, 70.0], [24.5, 71.0]
    ]
  },
  {
    id: 'PB',
    name: 'Punjab',
    nativeName: 'ਪੰਜਾਬ',
    center: [31.1, 75.3],
    zoom: 7,
    defaultLanguage: 'pa',
    suggestedLanguages: [
      { code: 'pa', label: 'Punjabi', nativeLabel: 'ਪੰਜਾਬੀ' },
      { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
      { code: 'en', label: 'English', nativeLabel: 'English' }
    ],
    districts: [
      'Amritsar',
      'Ludhiana',
      'Jalandhar',
      'Patiala',
      'Bathinda',
      'Hoshiarpur',
      'Gurdaspur',
      'Firozpur',
      'Sangrur'
    ],
    polygon: [
      [32.3, 75.5], [31.8, 76.5], [30.5, 76.8], [29.8, 75.5],
      [30.2, 74.2], [31.2, 74.5], [32.3, 75.5]
    ]
  },
  {
    id: 'KL',
    name: 'Kerala',
    nativeName: 'കേരളം',
    center: [10.5, 76.2],
    zoom: 7,
    defaultLanguage: 'ml',
    suggestedLanguages: [
      { code: 'ml', label: 'Malayalam', nativeLabel: 'മലയാളം' },
      { code: 'en', label: 'English', nativeLabel: 'English' }
    ],
    districts: [
      'Thiruvananthapuram',
      'Kochi (Ernakulam)',
      'Kozhikode',
      'Thrissur',
      'Malappuram',
      'Palakkad',
      'Kollam',
      'Kannur',
      'Alappuzha'
    ],
    polygon: [
      [12.5, 75.0], [12.0, 76.0], [11.0, 76.5], [9.5, 77.2],
      [8.5, 77.0], [8.3, 76.8], [9.8, 76.2], [11.2, 75.8],
      [12.5, 75.0]
    ]
  },
  {
    id: 'AP_TS',
    name: 'Andhra Pradesh & Telangana',
    nativeName: 'ఆంధ్రప్రదేశ్ & తెలంగాణ',
    center: [16.5, 79.5],
    zoom: 6,
    defaultLanguage: 'te',
    suggestedLanguages: [
      { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు' },
      { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
      { code: 'en', label: 'English', nativeLabel: 'English' }
    ],
    districts: [
      'Visakhapatnam',
      'Vijayawada (Krishna)',
      'Guntur',
      'Tirupati',
      'Kurnool',
      'Hyderabad',
      'Warangal',
      'Khammam',
      'Nizamabad'
    ],
    polygon: [
      [19.5, 78.5], [19.0, 80.5], [18.2, 83.5], [17.5, 83.0],
      [15.8, 80.5], [13.8, 80.2], [13.5, 79.0], [14.5, 77.5],
      [16.0, 77.8], [17.5, 78.0], [19.5, 78.5]
    ]
  },
  {
    id: 'RJ',
    name: 'Rajasthan',
    nativeName: 'राजस्थान',
    center: [26.5, 73.8],
    zoom: 6,
    defaultLanguage: 'hi',
    suggestedLanguages: [
      { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
      { code: 'en', label: 'English', nativeLabel: 'English' }
    ],
    districts: [
      'Jaipur',
      'Jodhpur',
      'Udaipur',
      'Kota',
      'Bikaner',
      'Ajmer',
      'Alwar',
      'Bhilwara',
      'Sikar'
    ],
    polygon: [
      [30.2, 74.0], [29.5, 76.5], [27.5, 77.5], [26.0, 77.0],
      [24.5, 75.5], [24.0, 73.5], [24.5, 71.0], [27.0, 70.0],
      [28.5, 71.5], [30.2, 74.0]
    ]
  },
  {
    id: 'MP',
    name: 'Madhya Pradesh',
    nativeName: 'मध्य प्रदेश',
    center: [23.5, 77.5],
    zoom: 6,
    defaultLanguage: 'hi',
    suggestedLanguages: [
      { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
      { code: 'en', label: 'English', nativeLabel: 'English' }
    ],
    districts: [
      'Bhopal',
      'Indore',
      'Jabalpur',
      'Gwalior',
      'Ujjain',
      'Sagar',
      'Rewa',
      'Satna',
      'Ratlam'
    ],
    polygon: [
      [26.5, 78.0], [25.0, 81.5], [24.0, 82.5], [22.0, 81.0],
      [21.5, 77.0], [22.0, 74.5], [24.5, 75.0], [25.5, 76.5],
      [26.5, 78.0]
    ]
  },
  {
    id: 'JH_CG',
    name: 'Jharkhand & Chhattisgarh',
    nativeName: 'झारखण्ड व छत्तीसगढ़',
    center: [22.5, 83.5],
    zoom: 6,
    defaultLanguage: 'hi',
    suggestedLanguages: [
      { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
      { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা' },
      { code: 'or', label: 'Odia', nativeLabel: 'ଓଡ଼ିଆ' },
      { code: 'en', label: 'English', nativeLabel: 'English' }
    ],
    districts: [
      'Ranchi',
      'Jamshedpur',
      'Dhanbad',
      'Bokaro',
      'Raipur',
      'Bilaspur',
      'Durg',
      'Bastar'
    ],
    polygon: [
      [24.5, 84.0], [24.5, 87.0], [22.5, 86.5], [21.5, 83.5],
      [18.5, 81.5], [20.0, 80.5], [22.5, 81.5], [24.5, 84.0]
    ]
  },
  {
    id: 'KA',
    name: 'Karnataka',
    nativeName: 'ಕರ್ನಾಟಕ',
    center: [14.5, 75.7],
    zoom: 6,
    defaultLanguage: 'en', // Kannadiga fallback or English/Hindi/Marathi
    suggestedLanguages: [
      { code: 'en', label: 'English', nativeLabel: 'English' },
      { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी' },
      { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
      { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்' }
    ],
    districts: [
      'Bengaluru',
      'Mysuru',
      'Hubballi-Dharwad',
      'Belagavi',
      'Mangaluru',
      'Kalaburagi',
      'Ballari',
      'Shivamogga'
    ],
    polygon: [
      [18.2, 77.0], [17.5, 77.5], [15.0, 78.0], [12.5, 77.5],
      [11.8, 76.5], [13.0, 74.8], [15.0, 74.0], [16.5, 74.2],
      [18.2, 77.0]
    ]
  },
  {
    id: 'NORTH_UT',
    name: 'Delhi, Haryana & Himachal',
    nativeName: 'दिल्ली, हरियाणा व हिमाचल',
    center: [29.5, 77.0],
    zoom: 7,
    defaultLanguage: 'hi',
    suggestedLanguages: [
      { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
      { code: 'pa', label: 'Punjabi', nativeLabel: 'ਪੰਜਾਬੀ' },
      { code: 'en', label: 'English', nativeLabel: 'English' }
    ],
    districts: [
      'New Delhi',
      'Gurugram',
      'Faridabad',
      'Shimla',
      'Karnal',
      'Ambala',
      'Panipat',
      'Dharamshala'
    ],
    polygon: [
      [33.0, 76.5], [32.0, 78.5], [30.5, 77.8], [28.0, 77.5],
      [28.0, 76.5], [30.0, 75.8], [32.0, 75.8], [33.0, 76.5]
    ]
  }
];

/**
 * Return all states list
 */
export function getAllStates(): RegionState[] {
  return INDIA_STATES_DATA;
}

/**
 * Look up state by ID or Name
 */
export function getStateById(id: string): RegionState | undefined {
  return INDIA_STATES_DATA.find(s => s.id.toLowerCase() === id.toLowerCase());
}

export function getStateByName(name: string): RegionState | undefined {
  return INDIA_STATES_DATA.find(s => s.name.toLowerCase() === name.toLowerCase());
}

/**
 * Look up suggested languages based on state and district
 */
export function getSuggestedLanguagesForRegion(stateName: string, districtName?: string): { code: Language; label: string; nativeLabel: string }[] {
  const state = getStateByName(stateName) || getStateById(stateName);
  if (!state) {
    // Default safe nationwide pilot suggestions
    return [
      { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
      { code: 'en', label: 'English', nativeLabel: 'English' },
      { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা' }
    ];
  }

  // Border districts or multilingual districts logic
  if (districtName) {
    const dLower = districtName.toLowerCase();
    // West Bengal borders
    if (state.id === 'WB' && (dLower.includes('purulia') || dLower.includes('bankura'))) {
      return [
        { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা' },
        { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
        { code: 'or', label: 'Odia', nativeLabel: 'ଓଡ଼ିଆ' },
        { code: 'en', label: 'English', nativeLabel: 'English' }
      ];
    }
    // Odisha borders
    if (state.id === 'OD' && (dLower.includes('balasore') || dLower.includes('mayurbhanj'))) {
      return [
        { code: 'or', label: 'Odia', nativeLabel: 'ଓଡ଼ିଆ' },
        { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা' },
        { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
        { code: 'en', label: 'English', nativeLabel: 'English' }
      ];
    }
    // Assam borders
    if (state.id === 'AS' && (dLower.includes('silchar') || dLower.includes('cachar') || dLower.includes('karimganj'))) {
      return [
        { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা' },
        { code: 'as', label: 'Assamese', nativeLabel: 'অসমীয়া' },
        { code: 'en', label: 'English', nativeLabel: 'English' }
      ];
    }
  }

  return state.suggestedLanguages;
}

/**
 * Filter states and districts by search query for accessible keyboard navigation
 */
export function searchStatesAndDistricts(query: string): { state: RegionState; matchingDistricts: string[] }[] {
  const q = query.trim().toLowerCase();
  if (!q) {
    return INDIA_STATES_DATA.map(s => ({ state: s, matchingDistricts: s.districts.slice(0, 4) }));
  }

  const results: { state: RegionState; matchingDistricts: string[] }[] = [];

  for (const state of INDIA_STATES_DATA) {
    const stateMatches = state.name.toLowerCase().includes(q) || state.nativeName.toLowerCase().includes(q);
    const matchingDistricts = state.districts.filter(d => d.toLowerCase().includes(q));

    if (stateMatches || matchingDistricts.length > 0) {
      results.push({
        state,
        matchingDistricts: matchingDistricts.length > 0 ? matchingDistricts : state.districts.slice(0, 4)
      });
    }
  }

  return results;
}


/**
 * Approximate district headquarters coordinates [lat, lng] used so that
 * picking a district in the dropdown can fly the map to that place.
 */
export const DISTRICT_COORDS: Record<string, [number, number]> = {
  // West Bengal
  'Nadia': [23.405, 88.49], 'Murshidabad': [24.1, 88.25], 'Birbhum': [23.905, 87.525],
  'Bankura': [23.232, 87.065], 'Purulia': [23.332, 86.365], 'Bardhaman': [23.232, 87.861],
  'Malda': [25.0, 88.14], 'South 24 Parganas': [22.19, 88.19], 'North 24 Parganas': [22.72, 88.48],
  'Hooghly': [22.9, 88.39], 'Howrah': [22.59, 88.31], 'Darjeeling': [27.04, 88.26],
  // Odisha
  'Cuttack': [20.46, 85.88], 'Puri': [19.81, 85.83], 'Mayurbhanj': [21.93, 86.72],
  'Balasore': [21.49, 86.93], 'Ganjam': [19.31, 84.79], 'Khordha': [20.3, 85.82],
  'Sambalpur': [21.47, 83.97], 'Koraput': [18.81, 82.71], 'Sundargarh': [22.12, 84.04],
  'Kalahandi': [19.91, 83.17], 'Bhadrak': [21.06, 86.52],
  // Maharashtra
  'Pune': [18.52, 73.86], 'Nashik': [20.0, 73.79], 'Thane': [19.22, 72.98], 'Nagpur': [21.15, 79.09],
  'Aurangabad': [19.88, 75.34], 'Solapur': [17.66, 75.91], 'Kolhapur': [16.7, 74.24],
  'Amravati': [20.93, 77.75], 'Nanded': [19.15, 77.32], 'Jalgaon': [21.01, 75.56],
  'Satara': [17.69, 74.0], 'Ahmednagar': [19.1, 74.75],
  // Tamil Nadu
  'Madurai': [9.92, 78.12], 'Coimbatore': [11.02, 76.96], 'Tiruchirappalli': [10.79, 78.69],
  'Salem': [11.66, 78.15], 'Tirunelveli': [8.73, 77.7], 'Thanjavur': [10.79, 79.14],
  'Vellore': [12.92, 79.13], 'Kanchipuram': [12.83, 79.7], 'Dindigul': [10.37, 77.98],
  'Erode': [11.34, 77.72], 'Cuddalore': [11.75, 79.77],
  // Uttar Pradesh
  'Varanasi': [25.32, 82.97], 'Gorakhpur': [26.76, 83.37], 'Rampur': [28.8, 79.03],
  'Bareilly': [28.37, 79.43], 'Prayagraj': [25.44, 81.85], 'Lucknow': [26.85, 80.95],
  'Kanpur': [26.45, 80.35], 'Agra': [27.18, 78.01], 'Aligarh': [27.88, 78.08],
  'Meerut': [28.98, 77.71], 'Ayodhya': [26.8, 82.2], 'Jhansi': [25.45, 78.57],
  // Bihar
  'Patna': [25.59, 85.14], 'Gaya': [24.8, 85.0], 'Muzaffarpur': [26.12, 85.39],
  'Bhagalpur': [25.24, 86.98], 'Darbhanga': [26.15, 85.9], 'Purnia': [25.78, 87.47],
  'Samastipur': [25.86, 85.78], 'Begusarai': [25.42, 86.13], 'Madhubani': [26.35, 86.07],
  'Rohtas': [24.95, 84.03],
  // Assam
  'Kamrup': [26.14, 91.74], 'Dibrugarh': [27.48, 94.91], 'Silchar (Cachar)': [24.83, 92.78],
  'Jorhat': [26.75, 94.2], 'Nagaon': [26.35, 92.69], 'Sonitpur': [26.63, 92.8],
  'Barpeta': [26.32, 91.0], 'Tinsukia': [27.49, 95.36], 'Golaghat': [26.52, 93.96],
  // Gujarat
  'Ahmedabad': [23.02, 72.57], 'Surat': [21.17, 72.83], 'Vadodara': [22.31, 73.18],
  'Rajkot': [22.3, 70.8], 'Bhavnagar': [21.76, 72.15], 'Jamnagar': [22.47, 70.07],
  'Junagadh': [21.52, 70.46], 'Kutch': [23.25, 69.67], 'Anand': [22.56, 72.95], 'Mehsana': [23.59, 72.37],
  // Punjab
  'Amritsar': [31.63, 74.87], 'Ludhiana': [30.9, 75.86], 'Jalandhar': [31.33, 75.58],
  'Patiala': [30.34, 76.39], 'Bathinda': [30.21, 74.95], 'Hoshiarpur': [31.53, 75.91],
  'Gurdaspur': [32.04, 75.41], 'Firozpur': [30.93, 74.61], 'Sangrur': [30.25, 75.84],
  // Kerala
  'Thiruvananthapuram': [8.52, 76.94], 'Kochi (Ernakulam)': [9.93, 76.27], 'Kozhikode': [11.26, 75.78],
  'Thrissur': [10.53, 76.21], 'Malappuram': [11.07, 76.07], 'Palakkad': [10.78, 76.65],
  'Kollam': [8.89, 76.61], 'Kannur': [11.87, 75.37], 'Alappuzha': [9.49, 76.33],
  // Andhra Pradesh & Telangana
  'Visakhapatnam': [17.69, 83.22], 'Vijayawada (Krishna)': [16.51, 80.65], 'Guntur': [16.31, 80.44],
  'Tirupati': [13.63, 79.42], 'Kurnool': [15.83, 78.04], 'Hyderabad': [17.39, 78.49],
  'Warangal': [17.97, 79.59], 'Khammam': [17.25, 80.15], 'Nizamabad': [18.67, 78.09],
  // Rajasthan
  'Jaipur': [26.91, 75.79], 'Jodhpur': [26.24, 73.02], 'Udaipur': [24.59, 73.71], 'Kota': [25.18, 75.84],
  'Bikaner': [28.02, 73.31], 'Ajmer': [26.45, 74.64], 'Alwar': [27.56, 76.61],
  'Bhilwara': [25.35, 74.64], 'Sikar': [27.61, 75.14],
  // Madhya Pradesh
  'Bhopal': [23.26, 77.41], 'Indore': [22.72, 75.86], 'Jabalpur': [23.18, 79.99], 'Gwalior': [26.22, 78.18],
  'Ujjain': [23.18, 75.78], 'Sagar': [23.84, 78.74], 'Rewa': [24.53, 81.3], 'Satna': [24.6, 80.83],
  'Ratlam': [23.33, 75.04],
  // Jharkhand & Chhattisgarh
  'Ranchi': [23.34, 85.31], 'Jamshedpur': [22.8, 86.2], 'Dhanbad': [23.8, 86.43], 'Bokaro': [23.67, 86.15],
  'Raipur': [21.25, 81.63], 'Bilaspur': [22.08, 82.15], 'Durg': [21.19, 81.28], 'Bastar': [19.07, 82.03],
  // Karnataka
  'Bengaluru': [12.97, 77.59], 'Mysuru': [12.3, 76.64], 'Hubballi-Dharwad': [15.36, 75.12],
  'Belagavi': [15.85, 74.5], 'Mangaluru': [12.91, 74.86], 'Kalaburagi': [17.33, 76.83],
  'Ballari': [15.14, 76.92], 'Shivamogga': [13.93, 75.57],
  // Delhi, Haryana & Himachal
  'New Delhi': [28.61, 77.21], 'Gurugram': [28.46, 77.03], 'Faridabad': [28.41, 77.31],
  'Shimla': [31.1, 77.17], 'Karnal': [29.69, 76.99], 'Ambala': [30.38, 76.78],
  'Panipat': [29.39, 76.97], 'Dharamshala': [32.22, 76.32]
};

export function getDistrictCoords(district: string): [number, number] | undefined {
  return DISTRICT_COORDS[district];
}
