import { useState, useEffect } from 'react';
import { Gamepad2, Search, Plus, FileCode, Shield, Heart, X } from 'lucide-react';

const CATEGORIES = ['All', 'Arcade', 'Puzzle', 'Retro', 'Action', 'Strategy', 'Favorites'];

export default function Navbar({
  currentCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  favoriteCount,
  onOpenAddModal,
  onOpenJsonModal,
  onOpenCloakModal,
  onBackToHome,
  isGameActive,
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
        scrolled
          ? 'bg-slate-950/95 backdrop-blur-md border-slate-800/80 shadow-lg shadow-black/20'
          : 'bg-slate-950/70 backdrop-blur-sm border-slate-800/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Portal Branding */}
          <button
            id="brand-logo-btn"
            onClick={onBackToHome}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-200">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  UNBLOCKED
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  GAMES
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">JSON iFrame Hub</p>
            </div>
          </button>

          {/* Search bar */}
          <div className="flex-1 max-w-md mx-2">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="search-games-input"
                type="text"
                placeholder="Search games by title, tag, or category..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-900/90 border border-slate-700/60 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  id="clear-search-btn"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="add-game-btn"
              onClick={onOpenAddModal}
              title="Add Custom Game with iFrame"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white transition-colors shadow-sm shadow-cyan-600/30 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden md:inline">Add Game</span>
            </button>

            <button
              id="view-json-btn"
              onClick={onOpenJsonModal}
              title="Inspect JSON iFrame Database"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            >
              <FileCode className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">JSON</span>
            </button>

            <button
              id="cloak-disguise-btn"
              onClick={onOpenCloakModal}
              title="Tab Cloak & Panic Button"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            >
              <Shield className="w-4 h-4 text-amber-400" />
              <span className="hidden lg:inline">Cloak</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        {!isGameActive && (
          <div className="flex items-center gap-1.5 py-2.5 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isActive = currentCategory === cat;
              return (
                <button
                  key={cat}
                  id={`cat-pill-${cat.toLowerCase()}`}
                  onClick={() => onSelectCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-500/30'
                      : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-slate-800/80'
                  }`}
                >
                  {cat === 'Favorites' && (
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isActive ? 'fill-slate-950 text-slate-950' : 'text-rose-400 fill-rose-400/20'
                      }`}
                    />
                  )}
                  {cat}
                  {cat === 'Favorites' && favoriteCount > 0 && (
                    <span
                      className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive ? 'bg-slate-950 text-cyan-400' : 'bg-rose-500/20 text-rose-400'
                      }`}
                    >
                      {favoriteCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
