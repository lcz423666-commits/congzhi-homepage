import { ToolCard } from '@/components/ToolCard';
import { Bot } from 'lucide-react';

const aiTools = [
  {
    title: 'ChatGPT',
    description: '通用 AI 对话与写作助手，最强大的语言模型之一。',
    url: 'https://chatgpt.com',
    tags: ['AI对话', '写作'],
  },
  {
    title: 'Gemini',
    description: 'Google 的多模态 AI 助手，支持文本、图像、视频理解。',
    url: 'https://gemini.google.com',
    tags: ['多模态', 'AI助手'],
  },
  {
    title: 'VS Code',
    description: '代码编辑器与扩展生态，开发者必备工具。',
    url: 'https://code.visualstudio.com',
    tags: ['编辑器', '开发'],
  },
  {
    title: 'Waytoagi',
    description: 'AI 工具与知识导航站，汇聚优质 AI 资源。',
    url: 'https://waytoagi.com',
    tags: ['导航', '资源'],
  },
  {
    title: '闪电说',
    description: '语音输入与表达优化工具，提升沟通效率。',
    url: 'https://shandianshuo.cn',
    tags: ['语音', '效率'],
  },
  {
    title: '豆包',
    description: '字节的 AI 助手与写作工具，中文场景优化。',
    url: 'https://doubao.com',
    tags: ['AI助手', '写作'],
  },
  {
    title: 'GitHub',
    description: '代码托管与开源社区，程序员的宝库。',
    url: 'https://github.com',
    tags: ['开源', '代码'],
  },
  {
    title: 'Supabase',
    description: '后端即服务与数据库平台，开源 Firebase 替代。',
    url: 'https://supabase.com',
    tags: ['BaaS', '数据库'],
  },
  {
    title: 'Vercel',
    description: '前端部署与托管平台，极速发布你的网站。',
    url: 'https://vercel.com',
    tags: ['部署', '托管'],
  },
  {
    title: '扣子',
    description: 'AI Bot 搭建与应用平台，低代码创建智能体。',
    url: 'https://coze.cn',
    tags: ['Bot', '低代码'],
  },
];

export function ToolsSection() {
  return (
    <section id="tools" className="py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center border border-cyan-500/20">
          <Bot className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white section-title">AI 工具收藏</h2>
          <p className="text-sm text-slate-400">我常用的工具集合</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {aiTools.map((tool, index) => (
          <ToolCard
            key={index}
            title={tool.title}
            description={tool.description}
            url={tool.url}
            tags={tool.tags}
          />
        ))}
      </div>
    </section>
  );
}
