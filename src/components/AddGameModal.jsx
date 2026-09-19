import { useState } from 'react';
import { X, Plus } from 'lucide-react';

const CATEGORIES = ['Arcade', 'Puzzle', 'Retro', 'Action', 'Strategy'];
const EMOJI_PRESETS = ['🎮', '🕹️', '🎯', '🚀', '⚡', '🔥', '🎲', '🏎️', '💎', '🏆', '👾', '🧩'];

export default function AddGameModal({ isOpen, onClose, onAddGame }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Arcade');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('🎮');
  const [controls, setControls] = useState('Arrow keys or Mouse');
  const [iframeInput, setIframeInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Please provide a game title.');
      return;
    }
    if (!iframeInput.trim()) {
      setError('Please provide an iFrame snippet or URL.');
      return;
    }

    let src = '';
    let code = '';

    const trimmedInput = iframeInput.trim();
    if (trimmedInput.toLowerCase().startsWith('<iframe')) {
      const srcMatch = trimmedInput.match(/src=["']([^"']+)["']/i);
      if (srcMatch && srcMatch[1]) {
        src = srcMatch[1];
        code = trimmedInput;
      } else {
        setError('Could not parse src attribute from <iframe> tag.');
        return;
      }
    } else if (trimmedInput.startsWith('http://') || trimmedInput.startsWith('https://') || trimmedInput.startsWith('/')) {
      src = trimmedInput;
      code = `<iframe src="${src}" title="${title.trim()}" width="100%" height="100%" frameborder="0" allowfullscreen allow="autoplay; fullscreen; keyboard; gamepad"></iframe>`;
    } else {
      setError('Please enter a valid URL (starting with https:// or /) or an <iframe> tag.');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (tags.length === 0) {
      tags.push(category, 'WebGame');
    }

    const newGame = {
      id: 'custom-' + Date.now(),
      title: title.trim(),
      category,
      description: description.trim() || 'Custom community-added unblocked game.',
      thumbnail,
      badge: 'New',
      rating: 5.0,
      plays: 1,
      controls: controls.trim() || 'Standard keyboard and mouse controls.',
      iframeSrc: src,
      iframeCode: code,
      tags,
      isCustom: true,
    };

    onAddGame(newGame);
    onClose();

    // Reset fields
    setTitle('');
    setDescription('');
    setIframeInput('');
    setTagsInput('');
    setThumbnail('🎮');
    setControls('Arrow keys or Mouse');
  };

  return (
    <div
      id="add-game-modal-overlay"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="add-game-modal-content"
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl my-8 animate-in fade-in duration-200"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-100 text-base">Add Game to JSON</h2>
              <p className="text-xs text-slate-400">Stores as an iFrame in the local games database</p>
            </div>
          </div>
          <button
            id="close-add-modal-btn"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Game Title *</label>
            <input
              id="new-game-title"
              type="text"
              required
              placeholder="e.g., Retro Runner"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Category</label>
              <select
                id="new-game-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Icon / Emoji</label>
              <div className="flex items-center gap-2">
                <input
                  id="new-game-icon"
                  type="text"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  className="w-14 px-2 py-2 rounded-xl bg-slate-950 border border-slate-800 text-center text-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <div className="flex gap-1 overflow-x-auto py-1">
                  {EMOJI_PRESETS.slice(0, 5).map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setThumbnail(emoji)}
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-sm cursor-pointer"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              iFrame Code or URL *
            </label>
            <textarea
              id="new-game-iframe"
              required
              rows={3}
              placeholder='<iframe src="https://example.com/game" width="100%" height="100%"></iframe> or https://...'
              value={iframeInput}
              onChange={(e) => setIframeInput(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Paste an HTML <code className="text-cyan-400">&lt;iframe&gt;</code> tag or a direct web game URL.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Description</label>
            <textarea
              id="new-game-desc"
              rows={2}
              placeholder="Brief summary of game objective and gameplay..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Controls Instructions</label>
            <input
              id="new-game-controls"
              type="text"
              placeholder="e.g., Arrow keys to steer, Space to jump"
              value={controls}
              onChange={(e) => setControls(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Modal Actions */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              id="submit-add-game-btn"
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white transition-colors cursor-pointer flex items-center gap-1.5 shadow-md shadow-cyan-600/30"
            >
              <Plus className="w-4 h-4" />
              Save to JSON
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
