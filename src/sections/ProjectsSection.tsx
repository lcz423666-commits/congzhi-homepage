import { ToolCard } from '@/components/ToolCard';
import { Github } from 'lucide-react';

const githubProjects = [
  {
    title: 'Crawl4AI',
    description: '面向 LLM 的开源 Web 爬虫与数据抓取/清洗工具，专为 AI 应用设计。',
    url: 'https://github.com/unclecode/crawl4ai',
    tags: ['爬虫', 'LLM', '数据'],
  },
  {
    title: 'Upscayl',
    description: '免费的开源 AI 图像放大工具，支持 Linux / macOS / Windows 全平台。',
    url: 'https://github.com/upscayl/upscayl',
    tags: ['AI图像', '放大', '开源'],
  },
  {
    title: 'Yunshu Skills Hub',
    description: '云舒精选的 Claude Code Skills 集合，提升开发和产品管理效率。',
    url: 'https://github.com/yunshu0909/yunshu_skillshub',
    tags: ['Claude', 'Skills', '效率'],
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center border border-purple-500/20">
          <Github className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white section-title">GitHub 开源项目</h2>
          <p className="text-sm text-slate-400">我使用的优秀开源项目</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {githubProjects.map((project, index) => (
          <ToolCard
            key={index}
            title={project.title}
            description={project.description}
            url={project.url}
            tags={project.tags}
          />
        ))}
      </div>
    </section>
  );
}
