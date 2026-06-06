import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { FiMail, FiLinkedin, FiGithub } from 'react-icons/fi';
import emailjs from 'emailjs-com';

export const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus('sending');
    setErrorMessage('');

    // Environment configurations
    const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // 1. Try Web3Forms if configured
    if (WEB3FORMS_ACCESS_KEY) {
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            from_name: 'Portfolio Contact Form',
          }),
        });

        const result = await response.json();
        if (result.success) {
          setStatus('success');
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          throw new Error(result.message || 'Failed to submit form to Web3Forms.');
        }
      } catch (error) {
        const err = error as Error;
        console.error('Web3Forms Error:', err);
        setStatus('error');
        setErrorMessage(err.message || 'Something went wrong. Please try again later.');
      }
      return;
    }

    // 2. Try EmailJS if configured
    if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
      try {
        await emailjs.sendForm(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          formRef.current,
          EMAILJS_PUBLIC_KEY
        );
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } catch (error) {
        const err = error as { text?: string; message?: string };
        console.error('EmailJS Error:', err);
        setStatus('error');
        setErrorMessage(err.text || err.message || 'Something went wrong with EmailJS. Please try again later.');
      }
      return;
    }

    // 3. Mock fallback for local testing if nothing is configured
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      console.info(
        'Form submitted successfully (Demo Mode).\n' +
        'To send actual emails to intisarmuhib303@gmail.com, configure Web3Forms or EmailJS environment variables in your .env file.\n' +
        'Check the .env.example file for detailed instructions.'
      );
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-glass-card/10 border-t border-glass-border">
      {/* Background decoration */}
      <div className="absolute right-0 top-1/4 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

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
            Get In Touch
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Contact Details Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 p-8 rounded-xl glass-panel border border-glass-border flex flex-col justify-between text-left"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Let's discuss a project</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-8">
                I'm always open to talking about product development, contract opportunities, freelance tasks, or general engineering questions. Reach out!
              </p>

              <div className="space-y-6">
                <a
                  href="mailto:intisarmuhib303@gmail.com"
                  className="flex items-center gap-4 text-text-secondary hover:text-white transition-colors duration-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-glass-border flex items-center justify-center text-primary shrink-0">
                    <FiMail size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Email Address</h4>
                    <p className="text-sm">intisarmuhib303@gmail.com</p>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/intisarmuhib"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-text-secondary hover:text-white transition-colors duration-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-glass-border flex items-center justify-center text-primary shrink-0">
                    <FiLinkedin size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">LinkedIn</h4>
                    <p className="text-sm">linkedin.com/in/intisarmuhib</p>
                  </div>
                </a>

                <a
                  href="https://github.com/imuhib25"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-text-secondary hover:text-white transition-colors duration-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-glass-border flex items-center justify-center text-primary shrink-0">
                    <FiGithub size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">GitHub</h4>
                    <p className="text-sm">github.com/imuhib25</p>
                  </div>
                </a>

                <a
                  href="https://intisarmuhib.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-text-secondary hover:text-white transition-colors duration-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-glass-border flex items-center justify-center text-primary shrink-0">
                    <Globe size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Portfolio</h4>
                    <p className="text-sm">intisarmuhib.netlify.app</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-glass-border text-xs text-text-secondary">
              Developed with React & Tailwind CSS. Secure SSL transmission.
            </div>
          </motion.div>

          {/* Contact Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 p-8 rounded-xl glass-panel border border-glass-border text-left"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-semibold text-text-primary">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="w-full bg-white/5 border border-glass-border rounded-lg px-4 py-3 text-sm text-white placeholder-text-secondary focus:outline-none focus:border-primary transition-colors duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-semibold text-text-primary">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full bg-white/5 border border-glass-border rounded-lg px-4 py-3 text-sm text-white placeholder-text-secondary focus:outline-none focus:border-primary transition-colors duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-semibold text-text-primary">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Enter message subject"
                  className="w-full bg-white/5 border border-glass-border rounded-lg px-4 py-3 text-sm text-white placeholder-text-secondary focus:outline-none focus:border-primary transition-colors duration-200"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-semibold text-text-primary">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Type your message here..."
                  className="w-full bg-white/5 border border-glass-border rounded-lg px-4 py-3 text-sm text-white placeholder-text-secondary focus:outline-none focus:border-primary transition-colors duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-95 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={16} />
                  </>
                )}
              </button>

              {/* Status messages */}
              {status === 'success' && (
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 flex items-center gap-3 text-sm">
                  <CheckCircle2 size={18} />
                  <span>Message sent successfully! Intisar will get back to you soon.</span>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-3 text-sm">
                  <AlertCircle size={18} />
                  <span>{errorMessage}</span>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
