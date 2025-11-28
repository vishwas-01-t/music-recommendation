import { useState } from 'react';

import { motion } from 'framer-motion';

export default function SongInput({ onRecommend, loading, elevated = false }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onRecommend(value.trim());
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`w-full flex flex-col sm:flex-row gap-3 fade-in ${elevated ? 'sm:mb-2' : 'sm:mb-0'}`}
      layout
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="relative flex-1 group">
  <input
          type="text"
          placeholder="Enter a song name..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full rounded-xl bg-linear-to-r from-[#1e293b]/70 to-[#0f172a]/70 px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500/60 border border-slate-700/60 shadow-inner placeholder:text-slate-400 backdrop-blur-md transition-colors duration-300 group-hover:border-indigo-400/50"
          disabled={loading}
          aria-label="Song name"
        />
        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10 group-hover:ring-indigo-400/30 transition" />
      </div>
      <motion.button
        type="submit"
        disabled={loading}
        className="relative inline-flex items-center justify-center rounded-xl px-6 py-4 font-medium bg-indigo-600/90 hover:bg-indigo-500/90 disabled:opacity-60 disabled:cursor-not-allowed text-white shadow-lg shadow-indigo-900/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Spinner /> Fetching
          </span>
        ) : (
          'Get Recommendations'
        )}
      </motion.button>
    </motion.form>
  );
}

function Spinner() {
  return (
    <svg className="h-5 w-5 animate-spin text-white" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}
