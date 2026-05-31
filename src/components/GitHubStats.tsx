import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart2,
  Zap,
  GitFork,
  Star,
  Users,
  BookOpen,
  Code2,
  TrendingUp,
  Circle,
} from 'lucide-react';
import { FiGithub } from 'react-icons/fi';

// ── Types ──────────────────────────────────────────────────────────────────────

interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
}

interface GitHubRepo {
  name: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
  description: string | null;
  fork: boolean;
}

interface LangStat {
  name: string;
  bytes: number;
  color: string;
}

// ── Language color map (extend as needed) ─────────────────────────────────────

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Rust: '#dea584',
  Go: '#00ADD8',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Vue: '#41b883',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Shell: '#89e051',
  Dart: '#00B4AB',
  Scala: '#c22d40',
  'C#': '#178600',
  Svelte: '#ff3e00',
  Nix: '#7e7eff',
  Lua: '#000080',
  R: '#198CE7',
  SCSS: '#c6538c',
  Other: '#8b8b8b',
};

function getLangColor(lang: string): string {
  return LANG_COLORS[lang] ?? LANG_COLORS['Other'];
}

// ── Stat Card ─────────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="flex flex-col gap-2 p-5 rounded-xl glass-panel border border-glass-border bg-dark-bg/40"
  >
    <div className="text-secondary">{icon}</div>
    <span className="text-2xl font-bold text-white">{value}</span>
    <span className="text-xs text-text-secondary uppercase tracking-widest">{label}</span>
  </motion.div>
);

// ── Language Bar ──────────────────────────────────────────────────────────────

const LanguageBar: React.FC<{ langs: LangStat[]; total: number }> = ({ langs, total }) => (
  <div className="w-full space-y-2">
    {/* Segment bar */}
    <div className="flex h-2.5 w-full rounded-full overflow-hidden gap-px">
      {langs.map((l) => (
        <motion.div
          key={l.name}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            width: `${((l.bytes / total) * 100).toFixed(2)}%`,
            backgroundColor: l.color,
            transformOrigin: 'left',
          }}
        />
      ))}
    </div>

    {/* Legend */}
    <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1">
      {langs.map((l) => (
        <div key={l.name} className="flex items-center gap-1.5 text-xs text-text-secondary">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: l.color }}
          />
          <span className="text-text-primary font-medium">{l.name}</span>
          <span>{((l.bytes / total) * 100).toFixed(1)}%</span>
        </div>
      ))}
    </div>
  </div>
);

// ── Top Repos List ─────────────────────────────────────────────────────────────

const RepoCard: React.FC<{ repo: GitHubRepo; delay: number }> = ({ repo, delay }) => (
  <motion.a
    href={repo.html_url}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ x: 4 }}
    className="group flex items-start justify-between gap-4 p-4 rounded-xl glass-panel border border-glass-border bg-dark-bg/40 hover:border-primary/40 transition-all duration-300"
  >
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-1">
        <BookOpen size={14} className="text-primary flex-shrink-0" />
        <span className="text-sm font-semibold text-white truncate group-hover:text-primary transition-colors">
          {repo.name}
        </span>
      </div>
      {repo.description && (
        <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
          {repo.description}
        </p>
      )}
      {repo.language && (
        <div className="flex items-center gap-1.5 mt-2">
          <Circle
            size={8}
            fill={getLangColor(repo.language)}
            stroke="none"
          />
          <span className="text-xs text-text-secondary">{repo.language}</span>
        </div>
      )}
    </div>
    <div className="flex flex-col items-end gap-1.5 flex-shrink-0 text-xs text-text-secondary">
      <span className="flex items-center gap-1">
        <Star size={12} className="text-yellow-400" />
        {repo.stargazers_count.toLocaleString()}
      </span>
      <span className="flex items-center gap-1">
        <GitFork size={12} />
        {repo.forks_count.toLocaleString()}
      </span>
    </div>
  </motion.a>
);

// ── Main Component ────────────────────────────────────────────────────────────

export const GitHubStats: React.FC = () => {
  const username = 'imuhib25';

  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [langs, setLangs] = useState<LangStat[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [totalForks, setTotalForks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const headers: HeadersInit = { Accept: 'application/vnd.github+json' };

        // ── Fetch user profile ──────────────────────────────────────────────
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, {
            headers,
            signal: controller.signal,
          }),
          fetch(
            `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
            { headers, signal: controller.signal }
          ),
        ]);

        if (!userRes.ok) throw new Error(`GitHub API error: ${userRes.status}`);
        if (!reposRes.ok) throw new Error(`GitHub API error: ${reposRes.status}`);

        const userData: GitHubUser = await userRes.json();
        const reposData: GitHubRepo[] = await reposRes.json();

        // ── Derived stats ───────────────────────────────────────────────────
        const ownedRepos = reposData.filter((r) => !r.fork);

        const stars = ownedRepos.reduce((s, r) => s + r.stargazers_count, 0);
        const forks = ownedRepos.reduce((s, r) => s + r.forks_count, 0);

        // Top 5 repos by stars
        const topRepos = [...ownedRepos]
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 5);

        // Language aggregation (bytes across all own repos that expose languages)
        const langMap: Record<string, number> = {};
        await Promise.all(
          ownedRepos.slice(0, 30).map(async (repo) => {
            try {
              const res = await fetch(
                `https://api.github.com/repos/${username}/${repo.name}/languages`,
                { headers, signal: controller.signal }
              );
              if (!res.ok) return;
              const data: Record<string, number> = await res.json();
              Object.entries(data).forEach(([lang, bytes]) => {
                langMap[lang] = (langMap[lang] ?? 0) + bytes;
              });
            } catch {
              // ignore individual repo failures
            }
          })
        );

        const sortedLangs: LangStat[] = Object.entries(langMap)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 7)
          .map(([name, bytes]) => ({ name, bytes, color: getLangColor(name) }));

        setUser(userData);
        setRepos(topRepos);
        setLangs(sortedLangs);
        setTotalStars(stars);
        setTotalForks(forks);
      } catch (err: unknown) {
        if ((err as Error).name === 'AbortError') return;
        setError('Failed to load GitHub data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    return () => controller.abort();
  }, [username]);

  const langTotal = langs.reduce((s, l) => s + l.bytes, 0);

  // ── Loading skeleton ───────────────────────────────────────────────────────
  if (loading) {
    return (
      <section id="github" className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center gap-6">
          <div className="w-32 h-6 rounded-lg bg-white/5 animate-pulse" />
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-28 rounded-xl bg-white/5 animate-pulse" />
            ))}
          </div>
          <div className="w-full h-40 rounded-xl bg-white/5 animate-pulse" />
        </div>
      </section>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (error) {
    return (
      <section id="github" className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center text-text-secondary">
          <p>{error}</p>
        </div>
      </section>
    );
  }

  if (!user) return null;

  return (
    <section id="github" className="py-24 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute left-1/4 bottom-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            GitHub Activity
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"
          />
        </div>

        {/* ── Top layout: Profile card + Stat grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Profile callout */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 p-8 rounded-xl glass-panel border border-glass-border flex flex-col justify-between text-left"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-14 h-14 rounded-full border-2 border-primary/30 object-cover"
                />
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    {user.name || user.login}
                  </h3>
                  <span className="text-xs text-text-secondary">@{user.login}</span>
                </div>
              </div>

              {user.bio && (
                <p className="text-sm text-text-secondary leading-relaxed mb-6">{user.bio}</p>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-text-primary">
                <Zap size={15} className="text-secondary flex-shrink-0" />
                <span>Consistently pushing clean updates</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-text-primary">
                <BarChart2 size={15} className="text-accent flex-shrink-0" />
                <span>Primary focus: Full-Stack &amp; UI Architecture</span>
              </div>
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-primary to-secondary hover:opacity-90 px-4 py-2.5 rounded-lg transition-all duration-300"
              >
                <FiGithub size={14} />
                View Full GitHub Profile
              </a>
            </div>
          </motion.div>

          {/* Stat grid */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4 content-start">
            <StatCard
              icon={<BookOpen size={20} />}
              label="Repositories"
              value={user.public_repos}
              delay={0.1}
            />
            <StatCard
              icon={<Star size={20} />}
              label="Total Stars"
              value={totalStars}
              delay={0.2}
            />
            <StatCard
              icon={<GitFork size={20} />}
              label="Total Forks"
              value={totalForks}
              delay={0.3}
            />
            <StatCard
              icon={<Users size={20} />}
              label="Followers"
              value={user.followers}
              delay={0.4}
            />

            {/* Language breakdown — spans full width inside the grid */}
            {langs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="col-span-2 sm:col-span-4 p-5 rounded-xl glass-panel border border-glass-border bg-dark-bg/40"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Code2 size={16} className="text-primary" />
                  <span className="text-sm font-semibold text-white">Language Breakdown</span>
                </div>
                <LanguageBar langs={langs} total={langTotal} />
              </motion.div>
            )}
          </div>
        </div>

        {/* ── Top Repositories ── */}
        {repos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-6 rounded-xl glass-panel border border-glass-border bg-dark-bg/40"
          >
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp size={16} className="text-secondary" />
              <h4 className="text-sm font-semibold text-white">Top Repositories</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {repos.map((repo, i) => (
                <RepoCard key={repo.name} repo={repo} delay={i * 0.08} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};