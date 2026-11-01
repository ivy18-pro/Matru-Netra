import { Language } from '../types';

/**
 * Locale mapping for Text-to-Speech and Speech Recognition
 */
const BCP47_LANGUAGE_MAP: Record<Language, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  bn: 'bn-IN',
  or: 'or-IN',
  mr: 'mr-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  gu: 'gu-IN',
  pa: 'pa-IN',
  ml: 'ml-IN',
  as: 'as-IN'
};

export type VoiceNavigationAction = 
  | 'NEXT_VISIT' 
  | 'MY_HEALTH' 
  | 'HELP' 
  | 'CHANGE_LANGUAGE' 
  | 'REMINDERS'
  | 'UNKNOWN';

export interface VoiceServiceStatus {
  isTtsSupported: boolean;
  isSttSupported: boolean;
  isSpeaking: boolean;
  isListening: boolean;
}

class VoiceManager {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private recognition: any = null;
  private isListeningState: boolean = false;
  private isSpeakingState: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // Warm up voices list on mobile browsers
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }

  /**
   * Check if browser supports Text-to-Speech
   */
  public isTtsSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  /**
   * Check if browser supports Speech Recognition
   */
  public isSttSupported(): boolean {
    return typeof window !== 'undefined' && 
      ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
  }

  /**
   * Check if a voice is installed for this specific language
   */
  public hasVoiceForLanguage(lang: Language): boolean {
    if (!this.isTtsSupported()) return false;
    const voices = window.speechSynthesis.getVoices();
    const targetTag = BCP47_LANGUAGE_MAP[lang];
    const prefix = targetTag.split('-')[0];
    return voices.some(v => v.lang === targetTag || v.lang.startsWith(prefix));
  }

  /**
   * Speak text aloud in the requested regional language
   */
  public speak(
    text: string, 
    lang: Language = 'hi', 
    onStart?: () => void, 
    onEnd?: () => void, 
    onError?: (err: any) => void
  ): boolean {
    if (!this.isTtsSupported()) {
      if (onError) onError(new Error('Text-to-speech is not supported on this browser.'));
      return false;
    }

    // Cancel any active speech
    this.stopSpeaking();

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      const targetTag = BCP47_LANGUAGE_MAP[lang] || 'hi-IN';
      utterance.lang = targetTag;
      
      // Cadence & Pitch optimized for rural comprehension (calm, clear, gentle)
      utterance.rate = 0.86;
      utterance.pitch = 1.02;

      // Select matching regional voice if available
      const voices = window.speechSynthesis.getVoices();
      const matchingVoice = voices.find(v => v.lang === targetTag) ||
                            voices.find(v => v.lang.startsWith(targetTag.split('-')[0]));
      
      if (matchingVoice) {
        utterance.voice = matchingVoice;
      }

      utterance.onstart = () => {
        this.isSpeakingState = true;
        if (onStart) onStart();
      };

      utterance.onend = () => {
        this.isSpeakingState = false;
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        this.isSpeakingState = false;
        this.currentUtterance = null;
        if (onError) onError(e);
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
      return true;
    } catch (err) {
      this.isSpeakingState = false;
      if (onError) onError(err);
      return false;
    }
  }

  /**
   * Stop active speech synthesis immediately
   */
  public stopSpeaking(): void {
    if (this.isTtsSupported()) {
      window.speechSynthesis.cancel();
      this.isSpeakingState = false;
      this.currentUtterance = null;
    }
  }

  public getIsSpeaking(): boolean {
    return this.isSpeakingState && (this.isTtsSupported() ? window.speechSynthesis.speaking : false);
  }

  public getIsListening(): boolean {
    return this.isListeningState;
  }

  /**
   * Start microphone listening for voice-assisted navigation commands
   */
  public startListening(
    lang: Language = 'hi',
    onCommandMatched: (action: VoiceNavigationAction, transcript: string) => void,
    onError?: (error: string) => void,
    onListeningChange?: (isListening: boolean) => void
  ): boolean {
    if (!this.isSttSupported()) {
      if (onError) onError('Speech recognition is not supported in this browser.');
      return false;
    }

    try {
      const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.recognition = new SpeechRecognitionClass();

      const locale = BCP47_LANGUAGE_MAP[lang] || 'hi-IN';
      this.recognition.lang = locale;
      this.recognition.continuous = false;
      this.recognition.interimResults = false;

      this.recognition.onstart = () => {
        this.isListeningState = true;
        if (onListeningChange) onListeningChange(true);
      };

      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.trim().toLowerCase();
        const action = this.matchVoiceCommand(transcript, lang);
        onCommandMatched(action, transcript);
      };

      this.recognition.onerror = (event: any) => {
        this.isListeningState = false;
        if (onListeningChange) onListeningChange(false);
        if (onError) {
          if (event.error === 'not-allowed') {
            onError('Microphone permission was not granted. You can continue using screen buttons.');
          } else {
            onError(`Voice error: ${event.error}`);
          }
        }
      };

      this.recognition.onend = () => {
        this.isListeningState = false;
        if (onListeningChange) onListeningChange(false);
      };

      this.recognition.start();
      return true;
    } catch (e: any) {
      this.isListeningState = false;
      if (onError) onError(e?.message || 'Failed to start microphone');
      return false;
    }
  }

  public stopListening(): void {
    if (this.recognition && this.isListeningState) {
      try {
        this.recognition.stop();
      } catch {}
      this.isListeningState = false;
    }
  }

  /**
   * Multilingual natural voice intent matching
   */
  private matchVoiceCommand(transcript: string, _lang: Language): VoiceNavigationAction {
    const t = transcript.toLowerCase();

    // 1. Next Visit intent
    if (
      t.includes('visit') || t.includes('checkup') || t.includes('doctor') ||
      t.includes('जाँच') || t.includes('तारीख') || t.includes('चेकআপ') ||
      t.includes('পৰীক্ষা') || t.includes('தவணை') || t.includes('తనిఖీ') ||
      t.includes('તપાસ') || t.includes('ਜਾਂਚ') || t.includes('പരിശോധന') ||
      t.includes('next') || t.includes('अगली') || t.includes('পরের')
    ) {
      return 'NEXT_VISIT';
    }

    // 2. My Health intent
    if (
      t.includes('health') || t.includes('baby') || t.includes('growth') ||
      t.includes('सेहत') || t.includes('स्वास्थ्य') || t.includes('শিশু') ||
      t.includes('বাচ্চা') || t.includes('உடல்நலம்') || t.includes('ఆరోగ్యం') ||
      t.includes('આરોગ્ય') || t.includes('ਸਿਹਤ') || t.includes('ആരോഗ്യം') ||
      t.includes('बच्चा') || t.includes('छुआ')
    ) {
      return 'MY_HEALTH';
    }

    // 3. Help / ASHA Lifeline intent
    if (
      t.includes('help') || t.includes('asha') || t.includes('didi') ||
      t.includes('मदद') || t.includes('সাহায্য') || t.includes('मदत') ||
      t.includes('உதவி') || t.includes('సహాయం') || t.includes('સહાય') ||
      t.includes('ਸਹਾਇਤਾ') || t.includes('সহায়') || t.includes('आशा') ||
      t.includes('आશા') || t.includes('ambulance') || t.includes('एम्बुलेंस')
    ) {
      return 'HELP';
    }

    // 4. Reminders intent
    if (
      t.includes('reminder') || t.includes('medicine') || t.includes('food') ||
      t.includes('दवा') || t.includes('नियम') || t.includes('औषध') ||
      t.includes('ओषध') || t.includes('மருந்து') || t.includes('మందు')
    ) {
      return 'REMINDERS';
    }

    // 5. Change Language intent
    if (
      t.includes('language') || t.includes('region') || t.includes('state') ||
      t.includes('भाषा') || t.includes('অঞ্চল') || t.includes('রাজ্য') ||
      t.includes('மொழி') || t.includes('భాష') || t.includes('બોલી')
    ) {
      return 'CHANGE_LANGUAGE';
    }

    return 'UNKNOWN';
  }
}

export const voiceService = new VoiceManager();

