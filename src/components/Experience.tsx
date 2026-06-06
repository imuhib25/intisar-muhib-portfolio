import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, CheckCircle } from 'lucide-react';

export const Experience: React.FC = () => {
  const experiences = [
    {
      type: 'work',
      title: 'Freelance Software Developer',
      organization: 'Independent / Self-Employed',
      period: '2020 – Present',
      achievements: [
        'Developed full-stack web and cross-platform mobile applications for diverse clients.',
        'Built and deployed scalable serverless backends and real-time management dashboards.',
        'Enhanced client conversion rates by redesigning outdated layouts into high-performing, modern UIs.',
        'Created custom local automation scripts, scraping tools, and Discord/Telegram bots to optimize workflows.',
      ],
      icon: <Briefcase size={20} className="text-white" />,
    },
    {
      type: 'education',
      title: 'BSc in Computer Science & Engineering',
      organization: 'East West University',
      period: '2026 – Present',
      achievements: [
        'Pursuing specialized coursework in algorithms, data structures, and database management systems.',
        'Actively participating in university coding forums and software engineering initiatives.',
      ],
      icon: <GraduationCap size={20} className="text-white" />,
    },
    {
      type: 'certification',
      title: 'Public Speaking Fundamentals',
      href: 'https://certificate.muktopaath.gov.bd/storage/uploads/certificates/1722fe001659e0889402c2af136222e7.jpg',
      organization: 'Muktopaath',
      period: 'Completed',
      achievements: [
        'Developed professional communication, interactive delivery, and presentation methods.',
      ],
      icon: <Award size={20} className="text-white" />,
    },
    {
      type: 'certification',
      title: 'React (Basic)',
      href: 'https://www.hackerrank.com/certificates/f3d8bb9bbb0b',
      organization: 'HackerRank',
      period: 'Completed',
      achievements: [
        'Validated proficiency in React fundamentals, state management, hooks, and component lifecycle.',
      ],
      icon: <Award size={20} className="text-white" />,
    },
    {
      type: 'certification',
      title: 'Problem Solving (Basic)',
      href: 'https://www.hackerrank.com/certificates/a5183e7d27f9',
      organization: 'HackerRank',
      period: 'Completed',
      achievements: [
        'Demonstrated analytical skills and programming proficiency in solving core algorithmic and data structure problems.',
      ],
      icon: <Award size={20} className="text-white" />,
    },
  ];

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-glass-card/10 border-y border-glass-border">
      {/* Background decoration */}
      <div className="absolute left-0 top-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Journey & Timeline
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"
          />
        </div>

        {/* Timeline Path */}
        <div className="relative border-l border-glass-border ml-4 md:ml-8 space-y-12">
          {experiences.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline Dot Indicator */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-dark-bg border-2 border-primary flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.3)]">
                {item.icon}
              </div>

              {/* Card Container */}
              <div className="p-6 rounded-xl glass-panel border border-glass-border text-left">
                <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary px-2.5 py-1 rounded bg-primary/10 border border-primary/20 mr-2">
                      {item.type}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-2">{item.title}</h3>
                    <p className="text-sm text-text-secondary font-medium">{item.organization}</p>
                  </div>
                  <span className="text-xs font-mono text-text-secondary bg-white/5 border border-glass-border px-3 py-1 rounded-full">
                    {item.period}
                  </span>
                </div>

                {/* Achievements List */}
                <ul className="space-y-2.5">
                  {item.achievements.map((ach, aIndex) => (
                    <li key={aIndex} className="flex gap-2.5 items-start text-sm text-text-primary">
                      <CheckCircle size={16} className="text-primary mt-0.5 shrink-0" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
