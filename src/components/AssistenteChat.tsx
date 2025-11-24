import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';
import { enviarMensagem } from '../services/chatService';

const AssistenteChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mensagens, setMensagens] = useState<{ autor: "user" | "bot"; texto: string }[]>([
    { autor: "bot", texto: "Olá! Bem-vindo à Silva Rent-a-Car. Como posso ajudar?" }
  ]);
  const [input, setInput] = useState("");
  const [aCarregar, setACarregar] = useState(false);

  const fimDasMensagens = useRef<HTMLDivElement>(null);

  const scrollParaFim = () => {
    fimDasMensagens.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollParaFim();
  }, [mensagens, isOpen]);

  const enviar = async () => {
    if (!input.trim()) return;

    const pergunta = input;
    setInput("");
    setMensagens(prev => [...prev, { autor: "user", texto: pergunta }]);
    setACarregar(true);

    try {
      const resposta = await enviarMensagem(pergunta);
      setMensagens(prev => [...prev, { autor: "bot", texto: resposta }]);
    } catch {
      setMensagens(prev => [...prev, { autor: "bot", texto: "Ocorreu um erro. Tente novamente." }]);
    } finally {
      setACarregar(false);
    }
  };

  const pressionarEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") enviar();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">

      {/* BOTÃO ABRIR */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105"
        >
          <MessageCircle size={24} />
          <span className="font-medium hidden md:block">Assistente</span>
        </button>
      )}

      {/* JANELA DO CHAT */}
      {isOpen && (
        <div className="bg-white rounded-xl shadow-2xl w-[90vw] md:w-96 h-[500px] flex flex-col border border-gray-200 overflow-hidden">

          {/* HEADER */}
          <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
            <h3 className="font-semibold">Assistente Silva Rent-a-Car</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* MENSAGENS */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {mensagens.map((m, i) => (
              <div key={i} className={`flex ${m.autor === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  m.autor === "user"
                    ? "bg-gray-900 text-white rounded-tr-none"
                    : "bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm"
                }`}>
                  {m.texto}
                </div>
              </div>
            ))}

            {aCarregar && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 p-3 rounded-lg rounded-tl-none shadow-sm">
                  <Loader2 size={16} className="animate-spin text-gray-800" />
                </div>
              </div>
            )}

            <div ref={fimDasMensagens} />
          </div>

          {/* INPUT */}
          <div className="p-3 bg-white border-t border-gray-200 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={pressionarEnter}
              placeholder="Escreva aqui a sua pergunta..."
              className="flex-1 p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <button
              onClick={enviar}
              disabled={aCarregar}
              className="p-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default AssistenteChat;