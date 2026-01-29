import { ParticleBackground } from '@/components/ParticleBackground';
import { Navigation } from '@/components/Navigation';
import { ProfileCard } from '@/components/ProfileCard';
import { HeroSection } from '@/sections/HeroSection';
import { ToolsSection } from '@/sections/ToolsSection';
import { ProjectsSection } from '@/sections/ProjectsSection';
import { ToolsShowcaseSection } from '@/sections/ToolsShowcaseSection';
import { Heart, Github as GithubIcon } from 'lucide-react';
import { ChatWidget } from '@/components/ChatWidget';

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] grid-bg relative">
      {/* Particle background */}
      <ParticleBackground />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection />

        {/* Content Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Sidebar - Profile */}
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="lg:sticky lg:top-24">
                <ProfileCard />
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-8 xl:col-span-9 space-y-8">
              <ToolsSection />
              <ProjectsSection />
              <ToolsShowcaseSection />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-cyan-500/10 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>by 李丛至</span>
            </div>
            
            <div className="flex items-center gap-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors text-sm"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <span className="text-slate-600 text-sm">
                © 2026 李丛至. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}

export default App;
