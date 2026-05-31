import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';


export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'py-4 bg-dark-bg/85 backdrop-blur-md border-b border-glass-border shadow-[0_10px_30px_-10px_rgba(3,0,20,0.8)]'
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('#home');
          }}
          className="text-xl font-bold tracking-tight text-white flex items-center gap-2 group"
        >
          <span className="text-primary group-hover:text-secondary transition-colors duration-300">&lt;</span>
          <span className="relative overflow-hidden inline-block">
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">Intisar Muhib</span>
            <span className="absolute top-0 left-0 inline-block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-primary">imuhib25</span>
          </span>
          <span className="text-primary group-hover:text-secondary transition-colors duration-300">/&gt;</span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              className="text-sm font-medium text-text-secondary hover:text-white transition-colors duration-200 relative py-1 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Social Icons (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-text-secondary hover:text-white transition-colors focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-bg/95 border-b border-glass-border overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="text-lg font-medium text-text-secondary hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex gap-6 mt-4 pt-4 border-t border-glass-border">
                <a
                  href="https://github.com/imuhib25"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-white"
                >
                  <FiGithub size={22} />
                </a>
                <a
                  href="https://linkedin.com/in/intisarmuhib"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-white"
                >
                  <FiLinkedin size={22} />
                </a>
                <a
                  href="mailto:intisarmuhib303@gmail.com"
                  className="text-text-secondary hover:text-white"
                >
                  <FiMail size={22} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
