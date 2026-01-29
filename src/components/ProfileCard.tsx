import { useState } from 'react';
import { MessageCircle, Sparkles, Bike, Code } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import avatar from '@/assets/avatar.png';
import wechatQr from '@/assets/wechat-qr.png';

export function ProfileCard() {
  const [isWechatOpen, setIsWechatOpen] = useState(false);

  const stats = [
    { icon: Sparkles, label: 'AI 工具', value: '10+' },
    { icon: Code, label: '开源项目', value: '3+' },
    { icon: Bike, label: '骑行', value: '∞' },
  ];

  return (
    <div className="relative">
      {/* Animated border effect */}
      <div className="absolute -inset-[1px] bg-gradient-to-br from-cyan-500 via-purple-500 to-cyan-500 rounded-2xl opacity-50 blur-sm animate-pulse" />
      
      <div className="relative glass rounded-2xl p-6 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div className="avatar-ring">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border-2 border-cyan-500/30 overflow-hidden">
                <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Name */}
          <h2 className="text-2xl font-bold text-center text-white mb-2">
            李丛至
          </h2>

          {/* Tagline */}
          <p className="text-slate-400 text-center text-sm mb-6 leading-relaxed">
            一名爱骑车的 AI 小白
            <br />
            <span className="text-cyan-400">分享 AI 学习路上的收藏与作品</span>
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-3 rounded-xl bg-slate-800/50 border border-cyan-500/10 hover:border-cyan-500/30 transition-colors"
              >
                <stat.icon className="w-4 h-4 mx-auto mb-1 text-cyan-400" />
                <div className="text-lg font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* WeChat Button */}
          <button
            onClick={() => setIsWechatOpen(true)}
            className="w-full btn-tech flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            加我微信
          </button>
        </div>
      </div>

      {/* WeChat QR Dialog */}
      <Dialog open={isWechatOpen} onOpenChange={setIsWechatOpen}>
        <DialogContent className="modal-tech max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center text-white flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5 text-cyan-400" />
              扫码加微信
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-6">
            <div className="w-48 h-48 rounded-xl bg-slate-800 flex items-center justify-center border border-cyan-500/20 mb-4">
              <img src={wechatQr} alt="WeChat QR" className="w-32 h-32 rounded-lg object-cover" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
