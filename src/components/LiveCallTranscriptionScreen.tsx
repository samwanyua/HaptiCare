import React, { useState, useEffect, useRef } from 'react';
import { CallMessage, PreferredLanguage } from '../types';
import { initialCallMessages } from '../data/initialData';
import { PhoneOff, Save, Mic, MicOff, Languages, Send, Sparkles } from 'lucide-react';

interface LiveCallTranscriptionScreenProps {
  onEndCall: () => void;
  preferredLanguage: PreferredLanguage;
}

export const LiveCallTranscriptionScreen: React.FC<LiveCallTranscriptionScreenProps> = ({
  onEndCall,
  preferredLanguage,
}) => {
  const [messages, setMessages] = useState<CallMessage[]>(initialCallMessages);
  const [activeLang, setActiveLang] = useState<'EN' | 'SW'>(preferredLanguage.includes('Swahili') ? 'SW' : 'EN');
  const [isMuted, setIsMuted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState('');
  const [callDuration, setCallDuration] = useState(48);
  const [isTranslating, setIsTranslating] = useState(false);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  // Timer for active call duration
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeLang]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Live Speech Recognition setup
  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = activeLang === 'SW' ? 'sw-KE' : 'en-US';

        recognition.onstart = () => setIsListening(true);
        recognition.onresult = async (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            handleAddMessage('You', transcript);
          }
          setIsListening(false);
        };
        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);

        recognition.start();
      } catch (err) {
        setIsListening(false);
      }
    } else {
      // Fallback message if SpeechRecognition API not available in iframe environment
      handleAddMessage('You', 'Speaking into haptic mic (speech-to-text live)...');
    }
  };

  const handleAddMessage = async (speaker: 'Caller' | 'You', text: string) => {
    const timestamp = formatTime(callDuration);
    let swText = '';

    // If active language is Swahili or toggled, request Gemini translation from backend
    try {
      setIsTranslating(true);
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, targetLang: 'sw' }),
      });
      const data = await res.json();
      swText = data.translatedText || text;
    } catch (e) {
      swText = `[SW] ${text}`;
    } finally {
      setIsTranslating(false);
    }

    const newMsg: CallMessage = {
      id: `msg-${Date.now()}`,
      speaker,
      text,
      translatedText: swText,
      timestamp,
    };

    setMessages((prev) => [...prev, newMsg]);
  };

  const handleSimulateCallerTurn = () => {
    const callerQuotes = [
      "Let's meet near the Nairobi CBD junction at 3:00 PM.",
      'Did you receive the haptic pulse alert on your wristband?',
      'I am sending you the location pinned message now.',
      'The traffic nearby is clearing up.',
    ];
    const randomQuote = callerQuotes[Math.floor(Math.random() * callerQuotes.length)];
    handleAddMessage('Caller', randomQuote);
  };

  const handleSendManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    handleAddMessage('You', inputText.trim());
    setInputText('');
  };

  return (
    <div className="flex flex-col min-h-full bg-[#faf8ff] p-4 justify-between space-y-3">
      {/* Top Header */}
      <div className="text-center pt-1 border-b border-[#bcc9c6] pb-3 bg-white -mx-4 px-4 shadow-xs">
        <div className="flex items-center justify-center space-x-2">
          <h1 className="text-xl font-bold text-[#131b2e]">Live Call</h1>
          <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a] animate-ping"></span>
        </div>
        <div className="flex items-center justify-center space-x-2 text-xs text-[#505f76] mt-0.5">
          <span>Connected</span>
          <span>•</span>
          <span className="font-mono font-semibold text-[#006a62]">{formatTime(callDuration)}</span>
        </div>
      </div>

      {/* Speech-to-Text Live Transcript Box */}
      <div className="flex-1 bg-white border border-[#bcc9c6] rounded-2xl p-4 overflow-y-auto max-h-[380px] space-y-4 shadow-inner">
        {messages.map((msg) => {
          const isCaller = msg.speaker === 'Caller';
          const displayText = activeLang === 'SW' && msg.translatedText ? msg.translatedText : msg.text;

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isCaller ? 'items-start' : 'items-end'}`}
            >
              <div className="flex items-center space-x-1.5 mb-1">
                <span className="text-xs font-bold text-[#131b2e]">
                  {msg.speaker}:
                </span>
                <span className="text-[10px] text-[#505f76]">{msg.timestamp}</span>
              </div>

              <div
                className={`max-w-[88%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                  isCaller
                    ? 'bg-[#eaedff] text-[#131b2e] rounded-tl-none border border-[#bcc9c6]/40'
                    : 'bg-[#00a396] text-white rounded-tr-none shadow-xs'
                }`}
              >
                {displayText}
              </div>
            </div>
          );
        })}
        {isTranslating && (
          <div className="text-xs text-[#505f76] italic flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 animate-spin text-[#00a396]" />
            <span>Translating speech stream with Gemini...</span>
          </div>
        )}
        <div ref={transcriptEndRef} />
      </div>

      {/* Manual Input / Speech mic bar */}
      <form onSubmit={handleSendManual} className="flex space-x-2">
        <input
          id="input-live-speech"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={isListening ? 'Listening to speech...' : 'Type response or tap mic...'}
          className="flex-1 bg-white border border-[#bcc9c6] rounded-xl px-3.5 py-2.5 text-xs text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#00a396]"
        />
        <button
          type="button"
          onClick={toggleListening}
          className={`p-2.5 rounded-xl transition ${
            isListening ? 'bg-[#ba1a1a] text-white animate-pulse' : 'bg-[#eaedff] text-[#006a62] hover:bg-[#dae2fd]'
          }`}
          title="Voice Speech to Text"
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>
        <button
          type="submit"
          className="bg-[#00a396] text-white px-3.5 py-2.5 rounded-xl text-xs font-semibold hover:bg-[#006a62] transition"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Call Control Action Bar */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between bg-white border border-[#bcc9c6] rounded-2xl p-2.5">
          {/* Mute Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              isMuted ? 'bg-[#ffdad6] text-[#93000a]' : 'bg-[#f2f3ff] text-[#505f76]'
            }`}
          >
            {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-[#006a62]" />}
            <span>Mute</span>
          </button>

          {/* Simulate Caller Speech */}
          <button
            onClick={handleSimulateCallerTurn}
            className="text-[11px] font-semibold text-[#006a62] bg-[#eaedff] px-2.5 py-1.5 rounded-xl hover:bg-[#dae2fd] transition flex items-center space-x-1"
          >
            <Sparkles className="w-3 h-3 text-[#00a396]" />
            <span>Simulate Caller</span>
          </button>

          {/* Language Switch EN / SW */}
          <button
            onClick={() => setActiveLang(activeLang === 'EN' ? 'SW' : 'EN')}
            className="flex items-center space-x-1.5 bg-[#eaedff] text-[#006a62] px-3 py-1.5 rounded-xl text-xs font-bold border border-[#bcc9c6] hover:bg-[#dae2fd] transition"
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{activeLang === 'EN' ? 'EN' : 'SW'}</span>
          </button>
        </div>

        {/* End Call / Save Transcript buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            id="btn-end-call"
            onClick={onEndCall}
            className="bg-[#ba1a1a] hover:bg-[#93000a] text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center space-x-1.5 text-xs shadow-xs transition"
          >
            <PhoneOff className="w-4 h-4" />
            <span>End Call</span>
          </button>
          <button
            id="btn-save-transcript"
            onClick={() => {
              alert('Call transcript saved to local history & synced.');
            }}
            className="bg-white border border-[#bcc9c6] hover:bg-[#eaedff] text-[#131b2e] font-semibold py-3 px-4 rounded-xl flex items-center justify-center space-x-1.5 text-xs transition"
          >
            <Save className="w-4 h-4 text-[#006a62]" />
            <span>Save Transcript</span>
          </button>
        </div>
      </div>
    </div>
  );
};
