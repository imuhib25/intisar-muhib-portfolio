import React from 'react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  level: number; // percentage
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const Skills: React.FC = () => {
  const categories: SkillCategory[] = [
    {
      title: 'Frontend & UI',
      skills: [
        { name: 'React', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'Flutter', level: 80 },
        { name: 'React Native', level: 75 },
        { name: 'HTML5 / CSS3', level: 95 },
        { name: 'JavaScript', level: 90 },
      ],
    },
    {
      title: 'Programming Languages',
      skills: [
        { name: 'TypeScript / JS', level: 88 },
        { name: 'Python', level: 80 },
        { name: 'C#', level: 75 },
        { name: 'Java', level: 70 },
        { name: 'C++', level: 65 },
        { name: 'Kotlin', level: 60 },
      ],
    },
    {
      title: 'Backend & Systems',
      skills: [
        { name: 'Firebase', level: 85 },
        { name: 'REST APIs', level: 88 },
        { name: 'Authentication Systems', level: 80 },
        { name: 'Database Management', level: 75 },
      ],
    },
    {
      title: 'Tools & Environments',
      skills: [
        { name: 'Git & GitHub', level: 90 },
        { name: 'VS Code', level: 92 },
        { name: 'Android Studio', level: 80 },
        { name: 'Visual Studio', level: 78 },
        { name: 'Unity', level: 60 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-glass-card/10 border-y border-glass-border">
      {/* Background radial glow */}
      <div className="absolute left-1/4 bottom-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

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
            Technical Expertise
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"
          />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              className="p-8 rounded-xl glass-panel border border-glass-border"
            >
              <h3 className="text-xl font-bold text-white mb-6 text-left border-b border-glass-border pb-3">
                {category.title}
              </h3>

              <div className="space-y-6">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold text-text-primary">{skill.name}</span>
                      <span className="text-text-secondary font-mono">{skill.level}%</span>
                    </div>
                    {/* Progress Bar Track */}
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-glass-border/30">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
