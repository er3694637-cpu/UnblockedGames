import { Play, Heart, Star, Code2 } from 'lucide-react';

export default function GameCard({
  game,
  isFavorite,
  onToggleFavorite,
  onPlay,
  onInspectCode,
}) {
  return (
    <div
      id={`game-card-${game.id}`}
      className="group relative flex flex-col bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/50 rounded-2xl p-4 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/30 hover:-translate-y-1"
    >
      {/* Top Bar with Badges & Favorite */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-cyan-400 border border-slate-700/50">
            {game.category}
          </span>
          {game.badge && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {game.badge}
            </span>
          )}
          {game.isCustom && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Custom
            </span>
          )}
        </div>

        <button
          id={`fav-btn-${game.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(game.id);
          }}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite ? 'text-rose-500 fill-rose-500' : 'text-slate-400'
            }`}
          />
        </button>
      </div>

      {/* Visual Thumbnail Stage */}
      <div
        onClick={() => onPlay(game)}
        className="relative aspect-[16/10] rounded-xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 flex items-center justify-center cursor-pointer overflow-hidden group-hover:border-cyan-500/40 transition-colors"
      >
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:16px_16px] opacity-30" />

        {/* Game Icon / Emoji */}
        <div className="relative text-5xl transform group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
          {game.thumbnail}
        </div>

        {/* Overlay Play Button on Hover */}
        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-200 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/40 transform scale-75 group-hover:scale-100 transition-transform duration-200">
            <Play className="w-6 h-6 fill-current translate-x-0.5" />
          </div>
        </div>
      </div>

      {/* Title & Description */}
      <div className="mt-3 flex-1 flex flex-col">
        <div className="flex items-baseline justify-between gap-2">
          <h3
            onClick={() => onPlay(game)}
            className="font-bold text-base text-slate-100 group-hover:text-cyan-400 transition-colors cursor-pointer line-clamp-1"
          >
            {game.title}
          </h3>
          <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold shrink-0">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{Number(game.rating).toFixed(1)}</span>
          </div>
        </div>

        <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {game.description}
        </p>
      </div>

      {/* Footer Details: Plays & Actions */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <span className="text-slate-400">
          {(game.plays || 1200).toLocaleString()} plays
        </span>

        <div className="flex items-center gap-2">
          <button
            id={`inspect-code-${game.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onInspectCode(game);
            }}
            title="Inspect stored iFrame code"
            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Code2 className="w-3.5 h-3.5" />
          </button>

          <button
            id={`play-now-btn-${game.id}`}
            onClick={() => onPlay(game)}
            className="px-3 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 font-semibold border border-cyan-500/30 hover:border-transparent transition-all cursor-pointer flex items-center gap-1"
          >
            <Play className="w-3 h-3 fill-current" />
            Play
          </button>
        </div>
      </div>
    </div>
  );
}
