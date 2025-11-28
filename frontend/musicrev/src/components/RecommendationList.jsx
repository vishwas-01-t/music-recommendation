import { motion } from 'framer-motion';
import SongCard from './SongCard';

function SkeletonCard({ index = 0 }) {
  return (
    <div className="rounded-2xl p-4 flex items-center gap-4 bg-white/3 animate-pulse">
      <div className="h-12 w-12 rounded-xl bg-white/10" />
      <div className="flex-1">
        <div className="h-4 rounded bg-white/10 w-3/4 mb-2" />
        <div className="h-3 rounded bg-white/8 w-1/2" />
      </div>
    </div>
  );
}

export default function RecommendationList({ recommendations, loading = false }) {
  // Show skeletons while loading so the result area appears immediately
  if (loading) {
    const placeholders = new Array(6).fill(0);
    return (
      <motion.div
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        {placeholders.map((_, i) => (
          <SkeletonCard key={`skeleton-${i}`} index={i} />
        ))}
      </motion.div>
    );
  }

  if (!recommendations) return null;

  if (recommendations.length === 0) {
    return (
      <div className="mt-10 text-center text-slate-400 text-sm">
        No recommendations yet. Try another song.
      </div>
    );
  }

  return (
    <motion.div
      className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      {recommendations.map((song, i) => (
        <SongCard key={song + i} title={song} index={i} />
      ))}
    </motion.div>
  );
}
