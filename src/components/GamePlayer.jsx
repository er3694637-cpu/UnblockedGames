import { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  RotateCcw,
  Maximize,
  Minimize,
  Heart,
  ExternalLink,
  Code,
  Check,
  Gamepad2,
  Tag,
  Copy,
  Info,
  Tv,
} from 'lucide-react';

export default function GamePlayer({
  game,
  isFavorite,
  onToggleFavorite,
  onBack,
  onInspectCode,
}) {
  const [iframeKey, setIframeKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTheater, setIsTheater] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const playerContainerRef = useRef(null);

  // Reload iframe handler
  const handleReload = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  // True browser fullscreen handler
  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;

    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch((err) => {
        console.error('Error attempting to enable fullscreen:', err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => {
        console.error('Error attempting to exit fullscreen:', err);
      });
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Open in cloaked about:blank popup
  const handleOpenAboutBlank = () => {
    const win = window.open('about:blank', '_blank');
    if (!win) {
      alert('Pop-up blocked. Please allow pop-ups for about:blank unblocked view.');
      return;
    }
    const doc = win.document;
    doc.title = game.title;
    doc.body.style.margin = '0';
    doc.body.style.height = '100vh';
    doc.body.style.backgroundColor = '#000000';
    doc.body.style.overflow = 'hidden';

    const iframe = doc.createElement('iframe');
    iframe.src = game.iframeSrc.startsWith('/') ? window.location.origin + game.iframeSrc : game.iframeSrc;
    iframe.style.width = '100vw';
    iframe.style.height = '100vh';
    iframe.style.border = 'none';
    iframe.allow = 'autoplay; fullscreen; keyboard; gamepad';
    doc.body.appendChild(iframe);
  };

  const copyIframeCode = () => {
    navigator.clipboard.writeText(game.iframeCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div id="game-player-view" className="w-full pb-16">
      {/* Top Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <button
          id="back-to-catalog-btn"
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Games</span>
        </button>

        {/* Game Title Info */}
        <div className="flex items-center gap-3">
          <span className="text-2xl">{game.thumbnail}</span>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              {game.title}
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-medium">
                {game.category}
              </span>
            </h1>
          </div>
        </div>

        {/* Control Toolbar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            id="fav-game-btn"
            onClick={() => onToggleFavorite(game.id)}
            title={isFavorite ? 'Favorited' : 'Add to Favorites'}
            className={`p-2 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
              isFavorite
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-800'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
          </button>

          <button
            id="reload-game-btn"
            onClick={handleReload}
            title="Reload Game"
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            id="theater-mode-btn"
            onClick={() => setIsTheater(!isTheater)}
            title={isTheater ? 'Exit Theater Mode' : 'Theater Mode'}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isTheater
                ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Tv className="w-4 h-4" />
          </button>

          <button
            id="fullscreen-btn"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          <button
            id="about-blank-btn"
            onClick={handleOpenAboutBlank}
            title="Open in Cloaked about:blank Tab"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-400 text-xs font-semibold transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Unblock Tab</span>
          </button>
        </div>
      </div>

      {/* Main iFrame Stage */}
      <div
        ref={playerContainerRef}
        id="player-container"
        className={`relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl transition-all duration-300 ${
          isTheater ? 'h-[82vh]' : 'aspect-[16/10] min-h-[460px] max-h-[700px]'
        } ${isFullscreen ? '!h-screen !w-screen !rounded-none !border-none' : ''}`}
      >
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin" />
            <p className="text-xs text-slate-400 font-medium tracking-wide">Loading {game.title} iFrame...</p>
          </div>
        )}

        {/* Embedded Game iFrame */}
        <iframe
          key={iframeKey}
          id="active-game-iframe"
          src={game.iframeSrc}
          title={game.title}
          onLoad={() => setIsLoading(false)}
          className="w-full h-full border-0 bg-slate-950"
          allow="autoplay; fullscreen; keyboard; gamepad; clipboard-read; clipboard-write"
          tabIndex={0}
        />
      </div>

      {/* Game Details, Controls & JSON Information */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Description & Instructions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Controls Panel */}
          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Gamepad2 className="w-5 h-5 text-cyan-400" />
              <h2 className="font-bold text-slate-100 text-sm">How to Play & Controls</h2>
            </div>
            <div className="bg-slate-950/60 rounded-xl p-3.5 border border-slate-800/60 text-sm text-slate-300 leading-relaxed font-sans">
              {game.controls}
            </div>
          </div>

          {/* About Game */}
          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-5 h-5 text-blue-400" />
              <h2 className="font-bold text-slate-100 text-sm">About {game.title}</h2>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {game.description}
            </p>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-slate-400" />
              {game.tags && game.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/70 text-slate-300 border border-slate-700/40"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Stored JSON iFrame Record */}
        <div className="space-y-6">
          <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-slate-100 text-sm">JSON iFrame Record</h3>
              </div>
              <button
                id="copy-iframe-snippet-btn"
                onClick={copyIframeCode}
                title="Copy iFrame Code"
                className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer transition-colors"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-2.5">
              This game is stored directly in <code className="text-cyan-400">games.json</code> as an embeddable iFrame:
            </p>

            <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 overflow-x-auto text-[11px] font-mono text-emerald-300/90 leading-relaxed select-all">
              {game.iframeCode}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Source URL:</span>
              <code className="text-cyan-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 truncate max-w-[180px]">
                {game.iframeSrc}
              </code>
            </div>

            <button
              id="view-full-json-entry-btn"
              onClick={() => onInspectCode(game)}
              className="mt-3 w-full py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 cursor-pointer transition-colors text-center"
            >
              View Full JSON Entry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
