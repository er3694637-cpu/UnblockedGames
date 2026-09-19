/**
 * Unblocked Games Hub - Core Application Logic
 * Pure vanilla JavaScript with zero external dependencies.
 * Compatible with GitHub Pages, local file execution, and static hosting.
 */

// Embedded fallback games list in case fetch('./games.json') is restricted (e.g. file:// protocol)
const DEFAULT_GAMES = [
  {
    id: "snake",
    title: "Snake Classic",
    category: "Arcade",
    description: "The timeless retro arcade classic. Navigate your snake to gobble up apples, grow in length, and avoid crashing into boundaries or your own tail.",
    thumbnail: "🐍",
    badge: "Classic",
    rating: 4.9,
    plays: 14200,
    controls: "W A S D or Arrow Keys to change direction. Space to pause or restart.",
    iframeSrc: "./games/snake/index.html",
    iframeCode: '<iframe src="./games/snake/index.html" title="Snake Classic" width="100%" height="100%" frameborder="0" allowfullscreen allow="autoplay; fullscreen; keyboard"></iframe>',
    tags: ["Arcade", "Retro", "Snake", "Classic"]
  },
  {
    id: "2048",
    title: "2048 Master",
    category: "Puzzle",
    description: "Slide matching numbered tiles across the 4x4 grid to merge them into larger numbers. Can you strategize your way up to the legendary 2048 tile?",
    thumbnail: "🔢",
    badge: "Popular",
    rating: 4.8,
    plays: 19850,
    controls: "Arrow keys (Up, Down, Left, Right) or WASD to slide all tiles.",
    iframeSrc: "./games/2048/index.html",
    iframeCode: '<iframe src="./games/2048/index.html" title="2048 Master" width="100%" height="100%" frameborder="0" allowfullscreen allow="autoplay; fullscreen; keyboard"></iframe>',
    tags: ["Puzzle", "Math", "2048", "Strategy"]
  },
  {
    id: "tetris",
    title: "Tetris Block",
    category: "Retro",
    description: "Drop and rotate tetromino blocks to fill complete horizontal lines and clear the board before the stack reaches the ceiling.",
    thumbnail: "🧱",
    badge: "Arcade",
    rating: 4.9,
    plays: 25100,
    controls: "Left / Right to move, Up to rotate, Down to soft drop, Space for instant hard drop.",
    iframeSrc: "./games/tetris/index.html",
    iframeCode: '<iframe src="./games/tetris/index.html" title="Tetris Block" width="100%" height="100%" frameborder="0" allowfullscreen allow="autoplay; fullscreen; keyboard"></iframe>',
    tags: ["Retro", "Tetris", "Arcade", "Classic"]
  },
  {
    id: "flappy",
    title: "Flappy Bird",
    category: "Arcade",
    description: "Tap to flap your wings and navigate through a relentless obstacle course of green pipes. High-stakes reflex test with instant retry.",
    thumbnail: "🐤",
    badge: "Reflex",
    rating: 4.7,
    plays: 31200,
    controls: "Space bar, Click, or Tap to flap upward.",
    iframeSrc: "./games/flappy/index.html",
    iframeCode: '<iframe src="./games/flappy/index.html" title="Flappy Bird" width="100%" height="100%" frameborder="0" allowfullscreen allow="autoplay; fullscreen; keyboard"></iframe>',
    tags: ["Arcade", "Flappy", "Skill", "Hard"]
  },
  {
    id: "space-invaders",
    title: "Space Invaders",
    category: "Action",
    description: "Defend Earth against descending waves of alien invaders! Take cover behind defensive bunkers and eliminate the mother ship.",
    thumbnail: "👾",
    badge: "Retro",
    rating: 4.9,
    plays: 16500,
    controls: "A / D or Left / Right Arrows to steer cannon. Space to fire laser blast.",
    iframeSrc: "./games/space-invaders/index.html",
    iframeCode: '<iframe src="./games/space-invaders/index.html" title="Space Invaders" width="100%" height="100%" frameborder="0" allowfullscreen allow="autoplay; fullscreen; keyboard"></iframe>',
    tags: ["Action", "Shooter", "Retro", "Space"]
  },
  {
    id: "breakout",
    title: "Breakout Smash",
    category: "Arcade",
    description: "Bounce the high-velocity energy sphere off your paddle to shatter colorful brick walls. Clear each formation to advance.",
    thumbnail: "🧱",
    badge: "Classic",
    rating: 4.8,
    plays: 11400,
    controls: "Mouse movement or Left / Right arrow keys to steer paddle. Space to launch ball.",
    iframeSrc: "./games/breakout/index.html",
    iframeCode: '<iframe src="./games/breakout/index.html" title="Breakout Smash" width="100%" height="100%" frameborder="0" allowfullscreen allow="autoplay; fullscreen; keyboard"></iframe>',
    tags: ["Arcade", "Breakout", "Physics", "Bricks"]
  },
  {
    id: "pong",
    title: "Retro Pong",
    category: "Retro",
    description: "The forefather of video games! Challenge an adaptive AI paddle in a rapid, high-speed tennis duel. First to 7 points takes the crown.",
    thumbnail: "🏓",
    badge: "1v1 AI",
    rating: 4.6,
    plays: 9800,
    controls: "W / S or Up / Down arrows to steer paddle. First to 7 points wins.",
    iframeSrc: "./games/pong/index.html",
    iframeCode: '<iframe src="./games/pong/index.html" title="Retro Pong" width="100%" height="100%" frameborder="0" allowfullscreen allow="autoplay; fullscreen; keyboard"></iframe>',
    tags: ["Retro", "Pong", "Sports", "TableTennis"]
  },
  {
    id: "minesweeper",
    title: "Minesweeper",
    category: "Puzzle",
    description: "Clear a hazardous minefield using logic and numerical deduction. Place warning flags on suspected explosives and uncover safe tiles.",
    thumbnail: "💣",
    badge: "Strategy",
    rating: 4.8,
    plays: 13900,
    controls: "Left click to uncover cell, Right click to toggle safety flag.",
    iframeSrc: "./games/minesweeper/index.html",
    iframeCode: '<iframe src="./games/minesweeper/index.html" title="Minesweeper" width="100%" height="100%" frameborder="0" allowfullscreen allow="autoplay; fullscreen; keyboard"></iframe>',
    tags: ["Puzzle", "Logic", "Strategy", "Mines"]
  },
  {
    id: "wordle",
    title: "Word Guess",
    category: "Puzzle",
    description: "Decipher the secret 5-letter word in six attempts or fewer! Color-coded hints reveal which letters are correct and in the right spot.",
    thumbnail: "🟩",
    badge: "Daily",
    rating: 4.9,
    plays: 28400,
    controls: "Keyboard or on-screen letters to type guess. Enter to submit, Backspace to delete.",
    iframeSrc: "./games/wordle/index.html",
    iframeCode: '<iframe src="./games/wordle/index.html" title="Word Guess" width="100%" height="100%" frameborder="0" allowfullscreen allow="autoplay; fullscreen; keyboard"></iframe>',
    tags: ["Puzzle", "Words", "Brain", "Vocabulary"]
  },
  {
    id: "tictactoe",
    title: "Tic Tac Toe",
    category: "Strategy",
    description: "Classic grid tactical duel. Match three Xs or Os in a row horizontally, vertically, or diagonally against a smart AI opponent.",
    thumbnail: "❌",
    badge: "Quick",
    rating: 4.5,
    plays: 8700,
    controls: "Click any empty square to place your symbol.",
    iframeSrc: "./games/tictactoe/index.html",
    iframeCode: '<iframe src="./games/tictactoe/index.html" title="Tic Tac Toe" width="100%" height="100%" frameborder="0" allowfullscreen allow="autoplay; fullscreen; keyboard"></iframe>',
    tags: ["Strategy", "Casual", "TurnBased"]
  }
];

// App State
let allGames = [...DEFAULT_GAMES];
let currentCategory = 'All';
let currentSearch = '';
let currentSort = 'popular';
let activeGame = null;
let favorites = [];

// DOM Element References
let gamesGridEl;
let emptyStateEl;
let catalogViewEl;
let playerViewEl;
let searchInputEl;
let clearSearchBtn;
let sortSelectEl;
let catalogTitleEl;
let countBadgeEl;
let favCountBadgeEl;
let activeIframeEl;
let playerSpinnerEl;
let playerStageEl;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Grab Elements
  gamesGridEl = document.getElementById('games-grid');
  emptyStateEl = document.getElementById('empty-state');
  catalogViewEl = document.getElementById('catalog-view');
  playerViewEl = document.getElementById('player-view');
  searchInputEl = document.getElementById('search-input');
  clearSearchBtn = document.getElementById('search-clear-btn');
  sortSelectEl = document.getElementById('sort-select');
  catalogTitleEl = document.getElementById('catalog-title-text');
  countBadgeEl = document.getElementById('count-badge');
  favCountBadgeEl = document.getElementById('fav-count-badge');
  activeIframeEl = document.getElementById('active-iframe');
  playerSpinnerEl = document.getElementById('player-spinner');
  playerStageEl = document.getElementById('player-stage');

  // Load Saved Favorites
  try {
    const savedFavs = localStorage.getItem('unblocked_favs');
    if (savedFavs) favorites = JSON.parse(savedFavs);
  } catch (e) {
    console.warn('Could not parse saved favorites:', e);
  }

  // Load Custom Games from localStorage
  loadCustomGames();

  // Fetch games.json with fallback
  fetchGamesData();

  // Setup Event Listeners
  setupEventListeners();

  // Initial Render
  updateFavBadge();
  renderGames();
});

// Load Games from JSON
function fetchGamesData() {
  fetch('./games.json')
    .then((res) => {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        // Merge with custom games
        const custom = getStoredCustomGames();
        allGames = [...data, ...custom];
        renderGames();
      }
    })
    .catch((err) => {
      console.log('Using embedded default games list:', err.message);
    });
}

function getStoredCustomGames() {
  try {
    const raw = localStorage.getItem('unblocked_custom_games');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function loadCustomGames() {
  const custom = getStoredCustomGames();
  if (custom.length > 0) {
    allGames = [...allGames, ...custom];
  }
}

function saveCustomGames(customList) {
  try {
    localStorage.setItem('unblocked_custom_games', JSON.stringify(customList));
  } catch (e) {
    console.error('Failed to save custom games:', e);
  }
}

// Render Games Grid
function renderGames() {
  if (!gamesGridEl) return;

  // Filter
  let filtered = allGames.filter((game) => {
    // Category
    if (currentCategory === 'Favorites') {
      if (!favorites.includes(game.id)) return false;
    } else if (currentCategory !== 'All' && game.category !== currentCategory) {
      return false;
    }

    // Search Query
    if (currentSearch.trim()) {
      const q = currentSearch.toLowerCase();
      const matchTitle = game.title && game.title.toLowerCase().includes(q);
      const matchDesc = game.description && game.description.toLowerCase().includes(q);
      const matchCat = game.category && game.category.toLowerCase().includes(q);
      const matchTags = game.tags && game.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchCat && !matchTags) return false;
    }

    return true;
  });

  // Sort
  filtered.sort((a, b) => {
    if (currentSort === 'popular') return (b.plays || 0) - (a.plays || 0);
    if (currentSort === 'rating') return (b.rating || 0) - (a.rating || 0);
    if (currentSort === 'az') return a.title.localeCompare(b.title);
    return 0;
  });

  // Update Header Title and Badges
  if (catalogTitleEl) {
    catalogTitleEl.textContent = currentCategory === 'Favorites' ? 'Favorite Games' : `${currentCategory} Games`;
  }
  if (countBadgeEl) {
    countBadgeEl.textContent = `${filtered.length} available`;
  }

  // Toggle Empty State
  if (filtered.length === 0) {
    gamesGridEl.style.display = 'none';
    if (emptyStateEl) emptyStateEl.style.display = 'block';
    return;
  }

  gamesGridEl.style.display = 'grid';
  if (emptyStateEl) emptyStateEl.style.display = 'none';

  // Build Cards HTML
  gamesGridEl.innerHTML = '';
  filtered.forEach((game) => {
    const isFav = favorites.includes(game.id);

    const card = document.createElement('div');
    card.className = 'game-card';
    card.id = `card-${game.id}`;

    card.innerHTML = `
      <div class="card-top">
        <div class="badge-group">
          <span class="card-badge">${escapeHtml(game.category)}</span>
          ${game.badge ? `<span class="card-badge card-badge-amber">${escapeHtml(game.badge)}</span>` : ''}
          ${game.isCustom ? `<span class="card-badge card-badge-custom">Custom</span>` : ''}
        </div>
        <button class="fav-toggle-btn ${isFav ? 'active' : ''}" title="${isFav ? 'Favorited' : 'Add to favorites'}" data-game-id="${game.id}">
          ${isFav ? '❤️' : '🤍'}
        </button>
      </div>

      <div class="card-thumbnail" data-play-id="${game.id}">
        <span>${game.thumbnail || '🎮'}</span>
        <div class="play-overlay">
          <div class="play-circle">▶</div>
        </div>
      </div>

      <div class="card-info">
        <div class="card-header-row">
          <h3 class="card-title" data-play-id="${game.id}">${escapeHtml(game.title)}</h3>
          <div class="card-rating">★ ${Number(game.rating || 5.0).toFixed(1)}</div>
        </div>
        <p class="card-desc">${escapeHtml(game.description || '')}</p>
      </div>

      <div class="card-footer">
        <span>${(game.plays || 1200).toLocaleString()} plays</span>
        <div class="card-footer-actions">
          <button class="btn-inspect" title="Inspect iFrame Code" data-inspect-id="${game.id}">
            &lt;/&gt;
          </button>
          <button class="btn-play-sm" data-play-id="${game.id}">
            ▶ Play
          </button>
        </div>
      </div>
    `;

    // Attach Listeners
    card.querySelectorAll('[data-play-id]').forEach((el) => {
      el.addEventListener('click', () => openGame(game));
    });

    const favBtn = card.querySelector('.fav-toggle-btn');
    if (favBtn) {
      favBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(game.id);
      });
    }

    const inspectBtn = card.querySelector('[data-inspect-id]');
    if (inspectBtn) {
      inspectBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openJsonModal(game.id);
      });
    }

    gamesGridEl.appendChild(card);
  });
}

// Favorite Management
function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter((f) => f !== id);
  } else {
    favorites.push(id);
  }
  try {
    localStorage.setItem('unblocked_favs', JSON.stringify(favorites));
  } catch (e) {
    console.error(e);
  }
  updateFavBadge();
  renderGames();
  updatePlayerFavBtn();
}

function updateFavBadge() {
  if (favCountBadgeEl) {
    if (favorites.length > 0) {
      favCountBadgeEl.textContent = favorites.length;
      favCountBadgeEl.style.display = 'inline-block';
    } else {
      favCountBadgeEl.style.display = 'none';
    }
  }
}

// Game Player View
function openGame(game) {
  activeGame = game;
  catalogViewEl.style.display = 'none';
  playerViewEl.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Update Game Info
  document.getElementById('player-title-text').textContent = game.title;
  document.getElementById('player-game-icon').textContent = game.thumbnail || '🎮';
  document.getElementById('player-cat-badge').textContent = game.category;
  document.getElementById('player-controls-text').textContent = game.controls || 'Standard mouse and keyboard controls.';
  document.getElementById('player-about-text').textContent = game.description || '';
  document.getElementById('player-source-url').textContent = game.iframeSrc;
  document.getElementById('player-iframe-snippet').textContent = game.iframeCode;

  // Tags
  const tagsContainer = document.getElementById('player-tags-container');
  if (tagsContainer) {
    tagsContainer.innerHTML = '';
    if (game.tags) {
      game.tags.forEach((tag) => {
        const span = document.createElement('span');
        span.className = 'tag-item';
        span.textContent = `#${tag}`;
        tagsContainer.appendChild(span);
      });
    }
  }

  // Load iFrame
  if (playerSpinnerEl) playerSpinnerEl.style.display = 'flex';
  if (activeIframeEl) {
    activeIframeEl.src = game.iframeSrc;
    activeIframeEl.onload = () => {
      if (playerSpinnerEl) playerSpinnerEl.style.display = 'none';
    };
  }

  updatePlayerFavBtn();
}

function closeGame() {
  activeGame = null;
  if (activeIframeEl) activeIframeEl.src = 'about:blank';
  playerViewEl.style.display = 'none';
  catalogViewEl.style.display = 'block';
}

function updatePlayerFavBtn() {
  const btn = document.getElementById('player-fav-btn');
  if (!btn || !activeGame) return;
  const isFav = favorites.includes(activeGame.id);
  btn.innerHTML = isFav ? '❤️ Favorited' : '🤍 Favorite';
  btn.className = `tool-btn ${isFav ? 'favorited' : ''}`;
}

// Fullscreen & Theater
function toggleFullscreen() {
  if (!playerStageEl) return;
  if (!document.fullscreenElement) {
    playerStageEl.requestFullscreen().catch((e) => console.error(e));
  } else {
    document.exitFullscreen().catch((e) => console.error(e));
  }
}

function toggleTheaterMode() {
  if (!playerStageEl) return;
  playerStageEl.classList.toggle('theater');
  const btn = document.getElementById('theater-btn');
  if (btn) btn.classList.toggle('active');
}

function reloadGameIframe() {
  if (!activeGame || !activeIframeEl) return;
  if (playerSpinnerEl) playerSpinnerEl.style.display = 'flex';
  const curSrc = activeIframeEl.src;
  activeIframeEl.src = 'about:blank';
  setTimeout(() => {
    activeIframeEl.src = curSrc;
  }, 100);
}

// Cloak in about:blank Window
function openInAboutBlank() {
  if (!activeGame) return;
  const win = window.open('about:blank', '_blank');
  if (!win) {
    alert('Pop-up was blocked. Please allow popups for about:blank unblocked mode.');
    return;
  }
  const doc = win.document;
  doc.title = activeGame.title;
  doc.body.style.margin = '0';
  doc.body.style.height = '100vh';
  doc.body.style.backgroundColor = '#000000';
  doc.body.style.overflow = 'hidden';

  const iframe = doc.createElement('iframe');
  iframe.src = activeGame.iframeSrc.startsWith('./')
    ? window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1) + activeGame.iframeSrc.substring(2)
    : activeGame.iframeSrc;
  iframe.style.width = '100vw';
  iframe.style.height = '100vh';
  iframe.style.border = 'none';
  iframe.allow = 'autoplay; fullscreen; keyboard; gamepad';
  doc.body.appendChild(iframe);
}

// ==========================================================================
// Modals Handling
// ==========================================================================
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = 'flex';
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = 'none';
}

// JSON Viewer Modal
function openJsonModal(focusedId = null) {
  let displayGames = allGames;
  if (focusedId) {
    const f = allGames.filter((g) => g.id === focusedId);
    if (f.length > 0) displayGames = f;
  }
  const pre = document.getElementById('json-content-pre');
  if (pre) pre.textContent = JSON.stringify(displayGames, null, 2);

  const countBadge = document.getElementById('json-count-badge');
  if (countBadge) countBadge.textContent = `${displayGames.length} games stored`;

  openModal('json-modal');
}

// Cloak Presets
const CLOAK_PRESETS = {
  docs: { title: 'Untitled document - Google Docs', icon: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico' },
  classroom: { title: 'Classes', icon: 'https://ssl.gstatic.com/classroom/favicon.png' },
  drive: { title: 'My Drive - Google Drive', icon: 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png' },
  canvas: { title: 'Dashboard', icon: 'https://du11hjcvx0uqb.cloudfront.net/br/dist/images/favicon-e10d657a73.ico' },
  reset: { title: 'Unblocked Games', icon: './favicon.ico' }
};

function applyTabCloak(presetKey) {
  const preset = CLOAK_PRESETS[presetKey];
  if (!preset) return;
  document.title = preset.title;

  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = preset.icon;

  document.querySelectorAll('.preset-btn').forEach((b) => b.classList.remove('active'));
  const activeBtn = document.querySelector(`[data-preset="${presetKey}"]`);
  if (activeBtn) activeBtn.classList.add('active');
}

// Add Custom Game
function handleAddGameForm(e) {
  e.preventDefault();
  const title = document.getElementById('new-title').value.trim();
  const category = document.getElementById('new-category').value;
  const emoji = document.getElementById('new-emoji').value.trim() || '🎮';
  const iframeRaw = document.getElementById('new-iframe').value.trim();
  const desc = document.getElementById('new-desc').value.trim() || 'Custom community-added game.';
  const controls = document.getElementById('new-controls').value.trim() || 'Mouse and keyboard controls.';

  if (!title || !iframeRaw) return;

  let src = '';
  let code = '';

  if (iframeRaw.toLowerCase().startsWith('<iframe')) {
    const match = iframeRaw.match(/src=["']([^"']+)["']/i);
    if (match && match[1]) {
      src = match[1];
      code = iframeRaw;
    } else {
      alert('Could not parse src attribute from <iframe> tag.');
      return;
    }
  } else if (iframeRaw.startsWith('http://') || iframeRaw.startsWith('https://') || iframeRaw.startsWith('./') || iframeRaw.startsWith('/')) {
    src = iframeRaw;
    code = `<iframe src="${src}" title="${title}" width="100%" height="100%" frameborder="0" allowfullscreen allow="autoplay; fullscreen; keyboard; gamepad"></iframe>`;
  } else {
    alert('Please enter a valid URL (starting with https:// or ./) or an <iframe> tag.');
    return;
  }

  const newGame = {
    id: 'custom-' + Date.now(),
    title,
    category,
    description: desc,
    thumbnail: emoji,
    badge: 'New',
    rating: 5.0,
    plays: 1,
    controls,
    iframeSrc: src,
    iframeCode: code,
    tags: [category, 'Custom'],
    isCustom: true
  };

  allGames.unshift(newGame);

  // Store in localStorage
  const existingCustom = getStoredCustomGames();
  existingCustom.unshift(newGame);
  saveCustomGames(existingCustom);

  closeModal('add-modal');
  e.target.reset();
  renderGames();
}

// Setup Event Listeners
function setupEventListeners() {
  // Brand Home
  const brandBtn = document.getElementById('brand-btn');
  if (brandBtn) brandBtn.addEventListener('click', closeGame);

  // Search Input
  if (searchInputEl) {
    searchInputEl.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      if (clearSearchBtn) {
        clearSearchBtn.style.display = currentSearch ? 'block' : 'none';
      }
      renderGames();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      searchInputEl.value = '';
      currentSearch = '';
      clearSearchBtn.style.display = 'none';
      renderGames();
    });
  }

  // Sort Select
  if (sortSelectEl) {
    sortSelectEl.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderGames();
    });
  }

  // Category Pills
  document.querySelectorAll('.cat-pill').forEach((pill) => {
    pill.addEventListener('click', (e) => {
      document.querySelectorAll('.cat-pill').forEach((p) => p.classList.remove('active'));
      const target = e.currentTarget;
      target.classList.add('active');
      currentCategory = target.getAttribute('data-cat') || 'All';
      renderGames();
    });
  });

  // Player Navigation & Toolbar
  const backBtn = document.getElementById('player-back-btn');
  if (backBtn) backBtn.addEventListener('click', closeGame);

  const favBtn = document.getElementById('player-fav-btn');
  if (favBtn) {
    favBtn.addEventListener('click', () => {
      if (activeGame) toggleFavorite(activeGame.id);
    });
  }

  const reloadBtn = document.getElementById('player-reload-btn');
  if (reloadBtn) reloadBtn.addEventListener('click', reloadGameIframe);

  const theaterBtn = document.getElementById('theater-btn');
  if (theaterBtn) theaterBtn.addEventListener('click', toggleTheaterMode);

  const fullscreenBtn = document.getElementById('fullscreen-btn');
  if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);

  const unblockTabBtn = document.getElementById('unblock-tab-btn');
  if (unblockTabBtn) unblockTabBtn.addEventListener('click', openInAboutBlank);

  // Copy iFrame snippet
  const copySnippetBtn = document.getElementById('copy-snippet-btn');
  if (copySnippetBtn) {
    copySnippetBtn.addEventListener('click', () => {
      if (activeGame) {
        navigator.clipboard.writeText(activeGame.iframeCode);
        copySnippetBtn.textContent = '✓ Copied';
        setTimeout(() => (copySnippetBtn.textContent = '📋 Copy'), 1800);
      }
    });
  }

  // Modals Triggers
  const addModalBtn = document.getElementById('add-game-btn');
  if (addModalBtn) addModalBtn.addEventListener('click', () => openModal('add-modal'));

  const jsonModalBtn = document.getElementById('view-json-btn');
  if (jsonModalBtn) jsonModalBtn.addEventListener('click', () => openJsonModal());

  const jsonFooterBtn = document.getElementById('footer-json-btn');
  if (jsonFooterBtn) jsonFooterBtn.addEventListener('click', () => openJsonModal());

  const cloakModalBtn = document.getElementById('cloak-disguise-btn');
  if (cloakModalBtn) cloakModalBtn.addEventListener('click', () => openModal('cloak-modal'));

  const cloakFooterBtn = document.getElementById('footer-cloak-btn');
  if (cloakFooterBtn) cloakFooterBtn.addEventListener('click', () => openModal('cloak-modal'));

  // Close Modals buttons
  document.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const modalId = e.currentTarget.getAttribute('data-close-modal');
      closeModal(modalId);
    });
  });

  // Overlay click to close
  document.querySelectorAll('.modal-overlay').forEach((overlay) => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.style.display = 'none';
      }
    });
  });

  // Add Game Form
  const addForm = document.getElementById('add-game-form');
  if (addForm) addForm.addEventListener('submit', handleAddGameForm);

  // Copy Full JSON
  const copyJsonBtn = document.getElementById('copy-json-btn');
  if (copyJsonBtn) {
    copyJsonBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(JSON.stringify(allGames, null, 2));
      copyJsonBtn.textContent = '✓ Copied';
      setTimeout(() => (copyJsonBtn.textContent = '📋 Copy JSON'), 1800);
    });
  }

  // Export JSON
  const exportJsonBtn = document.getElementById('export-json-btn');
  if (exportJsonBtn) {
    exportJsonBtn.addEventListener('click', () => {
      const blob = new Blob([JSON.stringify(allGames, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'games.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  // Reset JSON to Default
  const resetJsonBtn = document.getElementById('reset-json-btn');
  if (resetJsonBtn) {
    resetJsonBtn.addEventListener('click', () => {
      localStorage.removeItem('unblocked_custom_games');
      allGames = [...DEFAULT_GAMES];
      closeModal('json-modal');
      renderGames();
    });
  }

  // Cloak Presets Click
  document.querySelectorAll('.preset-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const preset = btn.getAttribute('data-preset');
      applyTabCloak(preset);
    });
  });

  // Custom Cloak Title
  const applyCustomTitleBtn = document.getElementById('apply-custom-title-btn');
  if (applyCustomTitleBtn) {
    applyCustomTitleBtn.addEventListener('click', () => {
      const input = document.getElementById('custom-title-input');
      if (input && input.value.trim()) {
        document.title = input.value.trim();
        document.querySelectorAll('.preset-btn').forEach((b) => b.classList.remove('active'));
      }
    });
  }

  // Emoji Preset buttons
  document.querySelectorAll('.emoji-preset-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const input = document.getElementById('new-emoji');
      if (input) input.value = btn.textContent.trim();
    });
  });

  // Global Keyboard: Escape closes modal or player
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModals = document.querySelectorAll('.modal-overlay[style*="display: flex"]');
      if (openModals.length > 0) {
        openModals.forEach((m) => (m.style.display = 'none'));
      } else if (activeGame) {
        closeGame();
      }
    }
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
