import { ToolCard } from '@/components/ToolCard';
import { Wrench, Rocket } from 'lucide-react';

const myTools = [
  {
    title: 'Coze Agent',
    description: '我的 Coze 小工具，基于扣子平台搭建的 AI 智能体。',
    url: 'https://www.coze.cn/store/agent/7590242188308627496?bot_id=true',
    tags: ['Coze', 'Agent'],
  },
  {
    title: 'congzhi.online',
    description: '我的个人站点，展示我的学习历程和作品。',
    url: 'https://www.congzhi.online',
    iconText: 'CZ',
    tags: ['个人站', '作品'],
  },
];

export function ToolsShowcaseSection() {
  return (
    <section id="showcase" className="py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 flex items-center justify-center border border-emerald-500/20">
          <Wrench className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white section-title">小工具展示</h2>
          <p className="text-sm text-slate-400">我自己做的小作品</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {myTools.map((tool, index) => (
          <ToolCard
            key={index}
            title={tool.title}
            description={tool.description}
            url={tool.url}
            iconText={tool.iconText}
            tags={tool.tags}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="mt-8 p-6 rounded-xl glass border border-cyan-500/20 text-center">
        <Rocket className="w-8 h-8 mx-auto mb-3 text-cyan-400" />
        <h3 className="text-lg font-semibold text-white mb-2">更多作品开发中...</h3>
        <p className="text-sm text-slate-400 mb-4">持续学习，持续创作，敬请期待更多作品</p>
        <div className="flex justify-center gap-2">
          <span className="tech-tag">React</span>
          <span className="tech-tag">TypeScript</span>
          <span className="tech-tag">AI</span>
        </div>
      </div>
    </section>
  );
}
