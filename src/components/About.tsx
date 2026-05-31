import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Award, Code, Smile } from 'lucide-react';

export const About: React.FC = () => {
  const stats = [
    {
      id: 1,
      icon: <Briefcase className="text-primary" size={28} />,
      value: '6+ Years',
      label: 'Freelance Experience',
      desc: 'Since 2020',
    },
    {
      id: 2,
      icon: <Award className="text-secondary" size={28} />,
      value: '15+',
      label: 'Projects Completed',
      desc: 'Web, Mobile, Desktop',
    },
    {
      id: 3,
      icon: <Code className="text-accent" size={28} />,
      value: '12+',
      label: 'Technologies Mastered',
      desc: 'Full-stack ecosystem',
    },
    {
      id: 4,
      icon: <Smile className="text-yellow-500" size={28} />,
      value: '100%',
      label: 'Client Satisfaction',
      desc: 'High quality delivery',
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-80 h-80 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

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
            About Me
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"
          />
        </div>

        {/* Text and Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 text-left"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Engineering sleek & high-performance applications
            </h3>
            <p className="text-text-secondary leading-relaxed mb-6 text-lg">
              I'm a passionate Full-Stack Developer specializing in web, mobile, and desktop applications.
              I build scalable solutions using <span className="text-white font-semibold">React, Flutter, Firebase, TypeScript, Python, and C#</span>.
            </p>
            <p className="text-text-secondary leading-relaxed mb-8 text-lg">
              My core focus is creating fast, user-friendly, and impactful software that solves real-world problems.
              Whether it is modular web dashboards or high-performing mobile apps, I bring robust architecture and pristine UI/UX to every project.
            </p>
            <div className="p-4 rounded-lg bg-glass-card border border-glass-border flex gap-4 items-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl shrink-0">
                CSE
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Computer Science & Engineering Student</h4>
                <p className="text-xs text-text-secondary">East West University (2026 – Present)</p>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl glass-panel border border-glass-border glass-card-hover text-left flex flex-col justify-between"
              >
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 border border-glass-border">
                  {stat.icon}
                </div>
                <div>
                  <h4 className="text-3xl font-extrabold text-white mb-1">{stat.value}</h4>
                  <p className="text-sm font-semibold text-text-primary mb-1">{stat.label}</p>
                  <p className="text-xs text-text-secondary">{stat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
