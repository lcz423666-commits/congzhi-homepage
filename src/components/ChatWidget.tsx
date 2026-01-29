import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

const API_BASE = import.meta.env.VITE_CHAT_API_BASE || '';

const SYSTEM_PROMPT =
  '你是丛至的个人主页助手，回答简洁友好，能用中文与访客对话。';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: '你好，我是丛至的主页助手。有什么可以帮你？' },
  ]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', content: trimmed },
    ];

    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    try {
      const payloadMessages: ChatMessage[] = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...nextMessages,
      ];

      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payloadMessages }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || '请求失败');
      }

      const data = await res.json();
      const reply = data.reply || '抱歉，我没能生成回复。';
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : '请求失败，请稍后再试。';
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `出错了：${message}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-cyan-500 text-white px-4 py-3 shadow-lg shadow-cyan-500/30 hover:bg-cyan-400 transition-colors"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm font-semibold">对话</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[92vw] max-w-sm rounded-2xl border border-cyan-500/20 bg-slate-950/95 backdrop-blur-md shadow-2xl">
          <div className="flex items-center justify-between px-4 py-3 border-b border-cyan-500/10">
            <div className="flex items-center gap-2 text-white">
              <MessageCircle className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-semibold">丛至的对话助手</span>
            </div>
            <button
              type="button"
              className="text-slate-400 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={`${msg.role}-${idx}`}
                className={
                  msg.role === 'user'
                    ? 'flex justify-end'
                    : 'flex justify-start'
                }
              >
                <div
                  className={
                    msg.role === 'user'
                      ? 'bg-cyan-500 text-white px-3 py-2 rounded-xl rounded-br-sm text-sm max-w-[80%]'
                      : 'bg-slate-800 text-slate-100 px-3 py-2 rounded-xl rounded-bl-sm text-sm max-w-[80%]'
                  }
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-xs text-slate-400">正在思考...</div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="px-4 py-3 border-t border-cyan-500/10">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') sendMessage();
                }}
                placeholder="输入你的问题..."
                className="flex-1 bg-slate-900 text-slate-100 text-sm rounded-xl px-3 py-2 outline-none border border-transparent focus:border-cyan-500/40"
              />
              <button
                type="button"
                onClick={sendMessage}
                className="p-2 rounded-xl bg-cyan-500 text-white hover:bg-cyan-400 transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
