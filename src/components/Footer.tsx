import React from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-glass-border bg-[#02000a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 relative">
        {/* Left Side */}
        <div className="text-left text-sm text-text-secondary">
          <p>© {currentYear} Intisar Muhib. All rights reserved.</p>
          <p className="text-xs mt-1">Built with React, TypeScript, and Tailwind CSS.</p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/imuhib25"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-white transition-colors duration-200"
          >
            <FiGithub size={20} />
          </a>
          <a
            href="https://linkedin.com/in/intisarmuhib"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-white transition-colors duration-200"
          >
            <FiLinkedin size={20} />
          </a>
          <a
            href="mailto:intisarmuhib303@gmail.com"
            className="text-text-secondary hover:text-white transition-colors duration-200"
          >
            <FiMail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};
