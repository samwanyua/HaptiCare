import React, { useState } from 'react';
import { SoundTrigger } from '../types';
import { WaveformVisualizer } from './WaveformVisualizer';
import { triggerHapticFeedback } from '../utils/haptics';
import { ArrowLeft, Mic, Library, Sparkles, Radio, Check, Play } from 'lucide-react';

interface CustomTriggerCreatorScreenProps {
  onSaveCustomTrigger: (newTrigger: SoundTrigger) => void;
  onBack: () => void;
}

export const CustomTriggerCreatorScreen: React.FC<CustomTriggerCreatorScreenProps> = ({
  onSaveCustomTrigger,
  onBack,
}) => {
  const [name, setName] = useState('');
  const [soundSource, setSoundSource] = useState<'record' | 'library' | 'describe'>('record');
  const [description, setDescription] = useState('');
  const [selectedPatternIndex, setSelectedPatternIndex] = useState(0);
  const [intensity, setIntensity] = useState<'low' | 'medium' | 'high'>('medium');
  const [isRecording, setIsRecording] = useState(false);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [testActive, setTestActive] = useState(false);

  const patternOptions = [
    { id: 'hazard-pulse', name: 'Rapid Pulse', waveform: 'hazard-pulse' },
    { id: 'traffic-double', name: 'Double Burst', waveform: 'traffic-double' },
    { id: 'baby-wave', name: 'Gentle Sine Wave', waveform: 'baby-wave' },
    { id: 'name-staccato', name: 'Staccato Rhythm', waveform: 'name-staccato' },
    { id: 'phone-buzz', name: 'Continuous Buzz', waveform: 'phone-buzz' },
    { id: 'custom-pattern', name: 'Triple Harmonic', waveform: 'hazard-pulse' },
  ];

  const handleSoundRecordToggle = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        if (!name) setName('Recorded Sound Sample');
      }, 3000);
    }
  };

  const handleAiAnalyze = async () => {
    if (!description) return;
    setIsAiAnalyzing(true);
    try {
      const res = await fetch('/api/analyze-sound', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promptText: description }),
      });
      const data = await res.json();
      if (data.detectedSound && !name) {
        setName(data.detectedSound);
      }
      // auto select recommended pattern
      if (data.category === 'Hazard') setSelectedPatternIndex(0);
      else if (data.category === 'Traffic') setSelectedPatternIndex(1);
      else setSelectedPatternIndex(2);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiAnalyzing(false);
    }
  };

  const handleTestOnBand = () => {
    setTestActive(true);
    triggerHapticFeedback('custom', intensity);
    setTimeout(() => {
      setTestActive(false);
    }, 1500);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || 'Custom Acoustic Trigger';
    const chosenPattern = patternOptions[selectedPatternIndex];

    const newTrigger: SoundTrigger = {
      id: `custom-${Date.now()}`,
      title: finalName,
      subtitle: soundSource === 'record' ? 'Recorded Audio' : soundSource === 'describe' ? 'AI Classified' : 'Library Preset',
      category: 'Custom',
      waveformPattern: chosenPattern.waveform as any,
      enabled: true,
      icon: 'bell',
      urgency: 'medium',
      isCustom: true,
      intensity: intensity,
      vibrationPatternIndex: selectedPatternIndex,
    };

    onSaveCustomTrigger(newTrigger);
  };

  return (
    <div className="flex flex-col min-h-full bg-[#faf8ff] p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 pt-1">
        <button
          id="btn-back-triggers"
          onClick={onBack}
          className="p-2 rounded-xl bg-white border border-[#bcc9c6] text-[#131b2e] hover:bg-[#eaedff] transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-[#131b2e]">Create Trigger</h1>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Name your trigger */}
        <div className="space-y-2">
          <label id="label-name-trigger" className="block text-sm font-bold text-[#131b2e]">
            1. Name your trigger
          </label>
          <input
            id="input-trigger-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Microwave Beep, Doorbell"
            className="w-full bg-white border border-[#bcc9c6] rounded-2xl px-4 py-3 text-sm text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#00a396] transition"
          />
        </div>

        {/* 2. Sound source selector */}
        <div className="space-y-2">
          <label id="label-[#sound-source]" className="block text-sm font-bold text-[#131b2e]">
            2. Sound source selector
          </label>

          <div className="space-y-2 bg-white border border-[#bcc9c6] rounded-2xl p-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="soundSource"
                checked={soundSource === 'record'}
                onChange={() => setSoundSource('record')}
                className="w-4 h-4 text-[#006a62] focus:ring-[#00a396]"
              />
              <div className="flex items-center space-x-2">
                <Mic className="w-4 h-4 text-[#006a62]" />
                <span className="text-sm font-medium text-[#131b2e]">Record sample</span>
              </div>
            </label>

            {soundSource === 'record' && (
              <div className="ml-7 pt-2">
                <button
                  type="button"
                  onClick={handleSoundRecordToggle}
                  className={`py-2 px-4 rounded-xl text-xs font-semibold flex items-center space-x-2 transition ${
                    isRecording
                      ? 'bg-[#ba1a1a] text-white animate-pulse'
                      : 'bg-[#eaedff] text-[#006a62] hover:bg-[#dae2fd]'
                  }`}
                >
                  <Radio className="w-4 h-4" />
                  <span>{isRecording ? 'Listening for audio sample...' : 'Tap to Record 3s Sample'}</span>
                </button>
              </div>
            )}

            <label className="flex items-center space-x-3 cursor-pointer pt-1">
              <input
                type="radio"
                name="soundSource"
                checked={soundSource === 'library'}
                onChange={() => setSoundSource('library')}
                className="w-4 h-4 text-[#006a62] focus:ring-[#00a396]"
              />
              <div className="flex items-center space-x-2">
                <Library className="w-4 h-4 text-[#006a62]" />
                <span className="text-sm font-medium text-[#131b2e]">Choose from library</span>
              </div>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer pt-1">
              <input
                type="radio"
                name="soundSource"
                checked={soundSource === 'describe'}
                onChange={() => setSoundSource('describe')}
                className="w-4 h-4 text-[#006a62] focus:ring-[#00a396]"
              />
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#006a62]" />
                <span className="text-sm font-medium text-[#131b2e]">Describe sound (AI Engine)</span>
              </div>
            </label>

            {soundSource === 'describe' && (
              <div className="ml-7 pt-2 space-y-2">
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Sharp double siren from ambulance"
                  className="w-full text-xs bg-[#faf8ff] border border-[#bcc9c6] rounded-xl px-3 py-2"
                />
                <button
                  type="button"
                  onClick={handleAiAnalyze}
                  disabled={isAiAnalyzing || !description}
                  className="py-1.5 px-3 rounded-lg text-xs font-semibold bg-[#00a396] text-white hover:bg-[#006a62] disabled:opacity-50"
                >
                  {isAiAnalyzing ? 'Analyzing AI model...' : 'Classify Sound with Gemini'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 3. Vibration pattern picker */}
        <div className="space-y-2">
          <label id="label-pattern-picker" className="block text-sm font-bold text-[#131b2e]">
            3. Vibration pattern picker
          </label>

          <div className="grid grid-cols-2 gap-3">
            {patternOptions.map((pattern, idx) => {
              const isSelected = selectedPatternIndex === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedPatternIndex(idx)}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between space-y-2 transition relative ${
                    isSelected
                      ? 'bg-white border-2 border-[#006a62] shadow-sm'
                      : 'bg-[#faf8ff] border-[#bcc9c6] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#131b2e]">{pattern.name}</span>
                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-[#006a62] text-white flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <WaveformVisualizer
                    type={pattern.waveform}
                    color={isSelected ? '#006a62' : '#505f76'}
                    className="h-8"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Intensity slider */}
        <div className="space-y-3 bg-white border border-[#bcc9c6] rounded-2xl p-4">
          <div className="flex justify-between items-center">
            <label id="label-intensity" className="block text-sm font-bold text-[#131b2e]">
              4. Intensity slider
            </label>
            <span className="text-xs font-semibold uppercase text-[#006a62] bg-[#eaedff] px-2 py-0.5 rounded-full">
              {intensity}
            </span>
          </div>

          <div className="space-y-1">
            <input
              id="slider-vibration-intensity"
              type="range"
              min="0"
              max="2"
              step="1"
              value={intensity === 'low' ? 0 : intensity === 'medium' ? 1 : 2}
              onChange={(e) => {
                const val = Number(e.target.value);
                setIntensity(val === 0 ? 'low' : val === 1 ? 'medium' : 'high');
              }}
              className="w-full accent-[#006a62] cursor-pointer"
            />
            <div className="flex justify-between text-xs font-medium text-[#505f76]">
              <span>low</span>
              <span>medium</span>
              <span>high</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            id="btn-test-on-band"
            type="button"
            onClick={handleTestOnBand}
            className={`w-full border-2 border-[#bcc9c6] font-semibold py-3 px-4 rounded-2xl flex items-center justify-center space-x-2 transition ${
              testActive ? 'bg-[#eaedff] border-[#006a62] text-[#006a62]' : 'bg-white text-[#131b2e] hover:bg-[#f2f3ff]'
            }`}
          >
            <Play className={`w-4 h-4 ${testActive ? 'animate-bounce text-[#006a62]' : ''}`} />
            <span>{testActive ? 'Vibrating HaptiQ Band...' : 'Test on Band'}</span>
          </button>

          <button
            id="btn-save-trigger"
            type="submit"
            className="w-full bg-[#00a396] hover:bg-[#006a62] text-white font-semibold py-3.5 px-4 rounded-2xl shadow-md transition active:scale-[0.98] text-center"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
