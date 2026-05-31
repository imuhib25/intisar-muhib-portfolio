import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ShieldCheck, Calendar, CheckSquare, MessageSquare, User } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';
import credotrackImg from '../assets/credotrack.png';

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  image?: string;
  fallbackGradient: string;
  icon: React.ReactNode;
}

export const Projects: React.FC = () => {
  const projectsList: Project[] = [
    {
      title: 'CredoTrack',
      description: 'A comprehensive debt tracking and financial management system designed to log liabilities, monitor repayment schedules, and visualize monthly credit status.',
      tech: ['React', 'Firebase', 'TypeScript', 'Tailwind CSS'],
      github: 'https://github.com/imuhib25/CredoTrack',
      demo: '#',
      image: credotrackImg,
      fallbackGradient: 'from-indigo-600 to-violet-600',
      icon: <ShieldCheck size={32} className="text-white" />,
    },
    {
      title: 'TeachSync',
      description: 'A dedicated tuition management platform enabling private tutors to track student attendance, organize recurring sessions, and automate tuition payment history.',
      tech: ['React', 'Firebase', 'Tailwind CSS'],
      github: 'https://github.com/imuhib25',
      demo: '#',
      fallbackGradient: 'from-violet-600 to-purple-600',
      icon: <Calendar size={32} className="text-white" />,
    },
    {
      title: 'MyRamadan',
      description: 'A specialized productivity and habit-tracking app designed for the holy month of Ramadan. Tracks Quran reading progress, daily fasting logs, and prayers.',
      tech: ['React', 'Firebase', 'CSS3'],
      github: 'https://github.com/imuhib25',
      demo: '#',
      fallbackGradient: 'from-purple-600 to-pink-600',
      icon: <CheckSquare size={32} className="text-white" />,
    },
    {
      title: 'Muhib\'s Den',
      description: 'A responsive real-time chat application featuring direct messaging, public channel creations, and instant status updates powered by Firebase Realtime Database.',
      tech: ['React', 'Firebase RTDB', 'CSS Modules'],
      github: 'https://github.com/imuhib25',
      demo: '#',
      fallbackGradient: 'from-blue-600 to-indigo-600',
      icon: <MessageSquare size={32} className="text-white" />,
    },
    {
      title: 'Portfolio Website',
      description: 'This interactive personal portfolio showcasing past experience, core technical skills, and integrations with external tools like EmailJS and GitHub statistics.',
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      github: 'https://github.com/imuhib25/portfolio-website',
      demo: 'https://intisarmuhib.netlify.app',
      fallbackGradient: 'from-indigo-600 to-cyan-600',
      icon: <User size={32} className="text-white" />,
    },
  ];

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Featured Projects
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"
          />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsList.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-xl overflow-hidden glass-panel border border-glass-border glass-card-hover flex flex-col h-full group"
            >
              {/* Project Image/Visual Header */}
              <div className="relative h-48 overflow-hidden bg-dark-bg">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${project.fallbackGradient} flex items-center justify-center relative`}>
                    {/* Grid Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 transition-transform duration-300 group-hover:scale-110">
                      {project.icon}
                    </div>
                  </div>
                )}
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-dark-bg/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/10 hover:bg-white/25 border border-white/20 rounded-full text-white transition-all hover:scale-110"
                    title="View Source Code"
                  >
                    <FiGithub size={20} />
                  </a>
                  {project.demo !== '#' && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-primary hover:bg-primary-dark rounded-full text-white transition-all hover:scale-110"
                      title="Live Demo"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6 flex flex-col justify-between flex-grow text-left">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 rounded bg-white/5 border border-glass-border text-text-primary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Actions (for mobile or quick link access) */}
                  <div className="flex items-center justify-between pt-4 border-t border-glass-border">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-text-secondary hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <FiGithub size={14} /> Repository
                    </a>
                    {project.demo !== '#' ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-primary hover:text-secondary flex items-center gap-1 transition-colors"
                      >
                        Live Demo <ExternalLink size={14} />
                      </a>
                    ) : (
                      <span className="text-xs text-text-secondary italic">Local platform</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
