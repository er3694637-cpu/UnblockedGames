/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import defaultGamesData from './data/games.json';
import Navbar from './components/Navbar.jsx';
import GameCard from './components/GameCard.jsx';
import GamePlayer from './components/GamePlayer.jsx';
import AddGameModal from './components/AddGameModal.jsx';
import JsonViewerModal from './components/JsonViewerModal.jsx';
import CloakModal from './components/CloakModal.jsx';
import {
  Gamepad2,
  SlidersHorizontal,
  Code2,
} from 'lucide-react';

export default function App() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [category, setCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem('unblocked_favs');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [isCloakModalOpen, setIsCloakModalOpen] = useState(false);
  const [focusedGameId, setFocusedGameId] = useState(null);

  // Load games from JSON and combine with stored custom games
  useEffect(() => {
    try {
      const customGamesRaw = localStorage.getItem('unblocked_custom_games');
      const customGames = customGamesRaw ? JSON.parse(customGamesRaw) : [];
      setGames([...defaultGamesData, ...customGames]);
    } catch (err) {
      console.error('Failed to load games data:', err);
      setGames(defaultGamesData);
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('unblocked_favs', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isAddModalOpen || isJsonModalOpen || isCloakModalOpen) {
          setIsAddModalOpen(false);
          setIsJsonModalOpen(false);
          setIsCloakModalOpen(false);
        } else if (selectedGame) {
          setSelectedGame(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAddModalOpen, isJsonModalOpen, isCloakModalOpen, selectedGame]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleAddGame = (newGame) => {
    setGames((prev) => {
      const updated = [newGame, ...prev];
      const customOnes = updated.filter((g) => g.isCustom);
      localStorage.setItem('unblocked_custom_games', JSON.stringify(customOnes));
      return updated;
    });
  };

  const handleResetToDefault = () => {
    localStorage.removeItem('unblocked_custom_games');
    setGames(defaultGamesData);
    setIsJsonModalOpen(false);
  };

  const handleInspectCode = (game) => {
    setFocusedGameId(game.id);
    setIsJsonModalOpen(true);
  };

  const handleOpenJsonModal = () => {
    setFocusedGameId(null);
    setIsJsonModalOpen(true);
  };

  // Filtered & Sorted Games
  const filteredGames = useMemo(() => {
    return games
      .filter((game) => {
        // Category filter
        if (category === 'Favorites') {
          if (!favorites.includes(game.id)) return false;
        } else if (category !== 'All' && game.category !== category) {
          return false;
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = game.title.toLowerCase().includes(q);
          const matchesDesc = game.description.toLowerCase().includes(q);
          const matchesCat = game.category.toLowerCase().includes(q);
          const matchesTags = game.tags && game.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchesTitle && !matchesDesc && !matchesCat && !matchesTags) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return (b.plays || 0) - (a.plays || 0);
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        if (sortBy === 'az') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [games, category, searchQuery, favorites, sortBy]);

  return (
    <div id="unblocked-games-app" className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        currentCategory={category}
        onSelectCategory={setCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        favoriteCount={favorites.length}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenJsonModal={handleOpenJsonModal}
        onOpenCloakModal={() => setIsCloakModalOpen(true)}
        onBackToHome={() => setSelectedGame(null)}
        isGameActive={!!selectedGame}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {selectedGame ? (
          /* Active Game Player View */
          <GamePlayer
            game={selectedGame}
            isFavorite={favorites.includes(selectedGame.id)}
            onToggleFavorite={toggleFavorite}
            onBack={() => setSelectedGame(null)}
            onInspectCode={handleInspectCode}
          />
        ) : (
          /* Games Catalog View */
          <div className="space-y-6">
            {/* Catalog Header with Counts & Sorting */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/60">
              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                  <span>{category === 'Favorites' ? 'Favorite Games' : `${category} Games`}</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono font-normal">
                    {filteredGames.length} available
                  </span>
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Each game runs cleanly in an embedded iFrame loaded from our JSON catalog.
                </p>
              </div>

              {/* Sorting Filter */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-400">Sort by:</span>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="az">Title (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Game Cards Grid */}
            {filteredGames.length > 0 ? (
              <div
                id="games-grid"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
              >
                {filteredGames.map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    isFavorite={favorites.includes(game.id)}
                    onToggleFavorite={toggleFavorite}
                    onPlay={(g) => setSelectedGame(g)}
                    onInspectCode={handleInspectCode}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div
                id="empty-games-state"
                className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-800/80 flex items-center justify-center mb-4 text-slate-400">
                  <Gamepad2 className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-200 mb-1">No games found</h3>
                <p className="text-xs text-slate-400 max-w-sm mb-4">
                  {searchQuery
                    ? `No titles matched "${searchQuery}". Try searching for another keyword or clear your search.`
                    : category === 'Favorites'
                    ? "You haven't added any favorite games yet! Click the heart icon on any game card to add it here."
                    : 'No games match this category.'}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-6 mt-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-4 h-4 text-cyan-500" />
            <span className="font-semibold text-slate-300">Unblocked Games Portal</span>
            <span className="text-slate-400">•</span>
            <span>All games stored as iFrames in JSON</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleOpenJsonModal}
              className="hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>View JSON Source</span>
            </button>
            <button
              onClick={() => setIsCloakModalOpen(true)}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Disguise Tab
            </button>
            <span>No Ads • No Tracking • No AI</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AddGameModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddGame={handleAddGame}
      />

      <JsonViewerModal
        isOpen={isJsonModalOpen}
        onClose={() => {
          setIsJsonModalOpen(false);
          setFocusedGameId(null);
        }}
        games={games}
        onResetToDefault={handleResetToDefault}
        focusedGameId={focusedGameId}
      />

      <CloakModal
        isOpen={isCloakModalOpen}
        onClose={() => setIsCloakModalOpen(false)}
      />
    </div>
  );
}
