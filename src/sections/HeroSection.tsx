import { ChevronDown, Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="home" className="min-h-[60vh] flex flex-col items-center justify-center relative pt-24 pb-12">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/20 mb-6">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-cyan-400">AI 学习者 · 骑行爱好者</span>
        </div>

        {/* Main title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          <span className="text-white">欢迎来到</span>
          <br />
          <span className="gradient-text">我的数字空间</span>
        </h1>

        {/* Description */}
        <p className="text-lg text-slate-400 mb-8 leading-relaxed">
          这里是我的 AI 学习收藏夹，分享一些我在用的工具
          <br className="hidden sm:block" />
          以及我自己做的小工具。一起探索 AI 的无限可能！
        </p>

        {/* Scroll indicator */}
        <a
          href="#tools"
          className="inline-flex flex-col items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors"
        >
          <span className="text-sm">向下探索</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
