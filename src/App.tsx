import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { GitHubStats } from './components/GitHubStats';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ParticleBackground } from './components/ParticleBackground';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden selection:bg-primary/30 selection:text-white">
      {/* Dynamic Background and Interactive Cursor */}
      <ParticleBackground />
      <CustomCursor />

      {/* Navigation */}
      <Navbar />

      {/* Main Content Layout */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <GitHubStats />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
