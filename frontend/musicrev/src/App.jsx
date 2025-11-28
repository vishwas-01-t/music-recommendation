import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SongInput from './components/SongInput.jsx';
import RecommendationList from './components/RecommendationList.jsx';

export default function App() {
  const [recommendations, setRecommendations] = useState(null); // null = untouched, [] = empty response
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastQuery, setLastQuery] = useState('');

  const fetchRecommendations = async (song) => {
    setError(null);
    setLoading(true);
    setLastQuery(song);
    try {
      const res = await fetch('/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ song }),
      });
      if (!res.ok) {
        throw new Error(`Server responded ${res.status}`);
      }
      const data = await res.json();
      setRecommendations(Array.isArray(data.recommendations) ? data.recommendations : []);
    } catch (err) {
      setError(err.message || 'Something went wrong');
      setRecommendations(null);
    } finally {
      setLoading(false);
    }
  };

  const hasResultsArea = loading || (!!recommendations && recommendations.length >= 0) || !!error;

  return (
    <div className="min-h-screen bg-linear-to-br from-[#050b17] via-[#0b1220] to-[#111827] text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-10 fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-linear-to-r from-indigo-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            Music Recommendations
          </h1>
          <p className="mt-4 text-slate-300 max-w-xl mx-auto">
            Discover similar tracks. Enter a song and we will fetch sonically aligned recommendations.
          </p>
        </header>
        <motion.div
          className="glass rounded-3xl p-8 sm:p-10 shadow-xl shadow-black/40"
          layout
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <motion.div layout>
            <SongInput onRecommend={fetchRecommendations} loading={loading} elevated={hasResultsArea} />
          </motion.div>
          {error && (
            <div className="mt-6 rounded-xl border border-red-500/30 bg-red-950/40 px-4 py-4 text-sm text-red-300 flex items-start gap-3">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-600/40 text-red-100 text-xs font-bold">!</span>
              <div>
                <p className="font-medium">Error</p>
                <p className="opacity-90">{error}</p>
              </div>
            </div>
          )}
          {lastQuery && !loading && !error && (
            <p className="mt-6 text-xs uppercase tracking-wider text-slate-400">
              Results for: <span className="text-slate-200 font-semibold">{lastQuery}</span>
            </p>
          )}
          <AnimatePresence initial={false}>
            <motion.div
              key={loading ? 'loading' : 'results'}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <RecommendationList recommendations={recommendations} loading={loading} />
            </motion.div>
          </AnimatePresence>
          {loading && (
            <div className="mt-8 flex justify-center opacity-80">
              <motion.div
                className="h-14 w-14 rounded-full border-4 border-indigo-500/30 border-t-indigo-400"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
              />
            </div>
          )}
          {!loading && recommendations && recommendations.length === 0 && !error && (
            <div className="mt-10 text-center text-slate-400 text-sm">
              No recommendations returned. Try a different song.
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
