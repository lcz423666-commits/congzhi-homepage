import { ExternalLink } from 'lucide-react';

interface ToolCardProps {
  title: string;
  description: string;
  url: string;
  icon?: string;
  iconText?: string;
  tags?: string[];
}

export function ToolCard({ title, description, url, icon, iconText, tags }: ToolCardProps) {
  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch {
      return null;
    }
  };

  const favicon = icon || getFaviconUrl(url);

  return (
    <div className="group relative">
      {/* Hover glow effect */}
      <div className="absolute -inset-[1px] bg-gradient-to-br from-cyan-500/0 via-purple-500/0 to-cyan-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
      
      <div className="relative glass rounded-xl p-5 h-full card-hover">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex-shrink-0">
            {favicon ? (
              <div className="w-12 h-12 rounded-xl bg-slate-800/80 flex items-center justify-center border border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors overflow-hidden">
                <img
                  src={favicon}
                  alt={`${title} logo`}
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent) {
                      parent.innerHTML = `<span class="text-lg font-bold text-cyan-400">${title.slice(0, 2)}</span>`;
                    }
                  }}
                />
              </div>
            ) : iconText ? (
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-500/20">
                <span className="text-lg font-bold gradient-text">{iconText}</span>
              </div>
            ) : (
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-500/20">
                <span className="text-lg font-bold text-cyan-400">{title.slice(0, 2)}</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors mb-1">
              {title}
            </h3>
            <p className="text-sm text-slate-400 mb-3 line-clamp-2">
              {description}
            </p>
            
            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="tech-tag"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Link */}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-cyan-400/70 hover:text-cyan-400 transition-colors"
            >
              <span className="truncate max-w-[200px]">{url.replace(/^https?:\/\//, '')}</span>
              <ExternalLink className="w-3 h-3 flex-shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
