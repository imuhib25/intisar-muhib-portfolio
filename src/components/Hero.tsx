import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { ArrowRight, FileText, Send } from 'lucide-react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-24 pb-12 relative overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs text-primary font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Available for freelance & full-time roles
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4"
          >
            Hi, I'm <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Intisar Muhib</span>
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl font-bold text-white mb-6"
          >
            Full-Stack & Cross-Platform Developer
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="h-12 text-lg sm:text-xl text-text-secondary font-medium mb-8"
          >
            <span className="text-white">&gt; </span>
            <span className="text-secondary font-semibold">
              <Typewriter
                words={[
                  'Building Modern Web Applications',
                  'Flutter Mobile App Developer',
                  'React & TypeScript Enthusiast',
                  'Turning Ideas Into Real Products',
                ]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={60}
                deleteSpeed={40}
                delaySpeed={2000}
              />
            </span>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 w-full sm:w-auto mb-10"
          >
            <a
              href="#projects"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto text-center"
            >
              View Projects <ArrowRight size={18} />
            </a>
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 glass-panel hover:bg-white/5 text-white font-semibold px-6 py-3 rounded-lg hover:border-primary/45 transition-all duration-300 w-full sm:w-auto text-center"
            >
              Contact Me <Send size={18} />
            </a>
            <a
              href="/Resume_IntisarMuhib.pdf"
              className="flex items-center justify-center gap-2 glass-panel hover:bg-white/5 text-white font-semibold px-6 py-3 rounded-lg hover:border-primary/45 transition-all duration-300 w-full sm:w-auto text-center"
              download="Resume_IntisarMuhib.pdf"
            >
              Download Resume <FileText size={18} />
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex items-center gap-6">
            <a
              href="https://github.com/imuhib25"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-white transition-colors duration-200"
            >
              <FiGithub size={24} />
            </a>
            <a
              href="https://linkedin.com/in/intisarmuhib"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-white transition-colors duration-200"
            >
              <FiLinkedin size={24} />
            </a>
            <a
              href="mailto:intisarmuhib303@gmail.com"
              className="text-text-secondary hover:text-white transition-colors duration-200"
            >
              <FiMail size={24} />
            </a>
          </motion.div>
        </motion.div>

        {/* Code Illustration Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-5 flex justify-center w-full"
        >
          <div className="w-full max-w-md rounded-xl overflow-hidden glass-panel border border-glass-border shadow-[0_20px_50px_-20px_rgba(79,70,229,0.3)]">
            {/* Window header */}
            <div className="flex justify-between items-center px-4 py-3 bg-glass-card border-b border-glass-border">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="text-xs font-mono text-text-secondary">developer.ts</div>
              <div className="w-12" /> {/* Spacer */}
            </div>
            {/* Window editor content */}
            <pre className="p-6 text-left text-xs sm:text-sm font-mono overflow-x-auto text-[#e2e8f0] bg-dark-bg/60">
              <code>
                <span className="text-secondary">const</span> developer = &#123;{'\n'}
                {'  '}name: <span className="text-accent">"Intisar Muhib"</span>,{'\n'}
                {'  '}role: <span className="text-accent">"Full-Stack Developer"</span>,{'\n'}
                {'  '}skills: [{'\n'}
                {'    '}<span className="text-primary">"React"</span>, <span className="text-primary">"TypeScript"</span>,{'\n'}
                {'    '}<span className="text-primary">"Flutter"</span>, <span className="text-primary">"Firebase"</span>{'\n'}
                {'  '}],{'\n'}
                {'  '}passionate: <span className="text-yellow-500">true</span>,{'\n'}
                {'  '}code: () =&gt; &#123;{'\n'}
                {'    '}<span className="text-secondary">return</span> <span className="text-accent">"Turning Ideas Into Real Products"</span>;{'\n'}
                {'  '}&#125;{'\n'}
                &#125;;
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
