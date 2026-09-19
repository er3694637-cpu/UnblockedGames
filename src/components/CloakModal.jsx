import { useState } from 'react';
import { X, Shield, Check } from 'lucide-react';

const PRESETS = [
  {
    name: 'Google Docs',
    title: 'Untitled document - Google Docs',
    icon: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico',
  },
  {
    name: 'Google Classroom',
    title: 'Classes',
    icon: 'https://ssl.gstatic.com/classroom/favicon.png',
  },
  {
    name: 'Google Drive',
    title: 'My Drive - Google Drive',
    icon: 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png',
  },
  {
    name: 'Canvas LMS',
    title: 'Dashboard',
    icon: 'https://du11hjcvx0uqb.cloudfront.net/br/dist/images/favicon-e10d657a73.ico',
  },
  {
    name: 'Reset to Normal',
    title: 'Unblocked Games',
    icon: '',
  },
];

export default function CloakModal({ isOpen, onClose }) {
  const [activePreset, setActivePreset] = useState('Unblocked Games');
  const [customTitle, setCustomTitle] = useState('');

  const applyCloak = (preset) => {
    document.title = preset.title;

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    if (preset.icon) {
      link.href = preset.icon;
    } else {
      link.href = '/favicon.ico';
    }

    setActivePreset(preset.name);
  };

  const applyCustomTitle = () => {
    if (customTitle.trim()) {
      document.title = customTitle.trim();
      setActivePreset('Custom');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="cloak-modal-overlay"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="cloak-modal-content"
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl my-6 animate-in fade-in duration-200"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-100 text-base">Tab Cloak & Disguise</h2>
              <p className="text-xs text-slate-400">Mask this browser tab to look like school or work apps</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">Quick Disguise Presets</label>
            <div className="grid grid-cols-1 gap-2">
              {PRESETS.map((preset) => {
                const isSelected = activePreset === preset.name;
                return (
                  <button
                    key={preset.name}
                    onClick={() => applyCloak(preset)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs font-medium transition-all text-left cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-slate-100">{preset.name}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[280px]">
                        Tab title: {preset.title}
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Custom Tab Title
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g., Biology Homework"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button
                onClick={applyCustomTitle}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer transition-colors"
              >
                Apply
              </button>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
            Tip: You can also press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono">Esc</kbd> anytime to return to the catalog.
          </div>
        </div>
      </div>
    </div>
  );
}
