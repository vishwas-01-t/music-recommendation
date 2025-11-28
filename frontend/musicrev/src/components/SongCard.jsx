import { motion } from 'framer-motion';

export default function SongCard({ title, index }) {
  return (
    <motion.div
      className="group glass relative overflow-hidden rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-xl transition-shadow duration-300 backdrop-blur-md border border-white/10 animate-fade-up"
      style={{ animationDelay: `${index * 40}ms` }}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
    >
      <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 via-fuchsia-500 to-cyan-500 text-xs font-semibold text-white shadow-lg shadow-indigo-900/40 group-hover:scale-105 transition-transform duration-300">
        {index + 1}
      </div>
      <div className="flex-1">
        <p className="font-medium tracking-wide text-slate-100 group-hover:text-white transition-colors duration-300">
          {title}
        </p>
      </div>
      <div className="absolute inset-0 bg-linear-to-r from-indigo-500/0 via-fuchsia-500/0 to-cyan-500/0 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
    </motion.div>
  );
}
