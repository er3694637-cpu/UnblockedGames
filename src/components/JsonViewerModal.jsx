import { useState } from 'react';
import { X, Copy, Check, Download, RotateCcw, FileCode, Search } from 'lucide-react';

export default function JsonViewerModal({
  isOpen,
  onClose,
  games,
  onResetToDefault,
  focusedGameId,
}) {
  const [copied, setCopied] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  if (!isOpen) return null;

  let displayGames = games;
  if (focusedGameId) {
    const found = games.filter((g) => g.id === focusedGameId);
    if (found.length > 0) displayGames = found;
  } else if (searchFilter) {
    displayGames = games.filter(
      (g) =>
        g.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
        g.category.toLowerCase().includes(searchFilter.toLowerCase()) ||
        g.iframeSrc.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }

  const jsonString = JSON.stringify(displayGames, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(games, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(games, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'games.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      id="json-viewer-modal-overlay"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="json-viewer-modal-content"
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl my-6 flex flex-col max-h-[85vh] animate-in fade-in duration-200"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-slate-100 text-base">games.json Database</h2>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                  {games.length} games stored
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Each game is stored with its embeddable iFrame code and metadata
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="copy-json-btn"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy JSON</span>
                </>
              )}
            </button>

            <button
              id="download-json-btn"
              onClick={handleDownload}
              title="Download games.json file"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>

            <button
              id="close-json-modal-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="px-6 py-2.5 bg-slate-950/60 border-b border-slate-800/80 flex items-center justify-between gap-4 shrink-0">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Filter JSON by title or URL..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-8 pr-3 py-1 text-xs rounded-lg bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <button
            onClick={onResetToDefault}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-amber-400 cursor-pointer"
            title="Reset to default games database"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset to default</span>
          </button>
        </div>

        {/* Code Content View */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-950 font-mono text-xs text-slate-300">
          <pre className="text-emerald-300/90 whitespace-pre-wrap leading-relaxed select-all">
            {jsonString}
          </pre>
        </div>
      </div>
    </div>
  );
}
