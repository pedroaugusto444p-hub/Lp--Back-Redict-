import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "motion/react";
import { Check, ShieldCheck, Clock, AlertTriangle, RefreshCw, Sparkles, Navigation } from "lucide-react";

export default function LandingPage() {
  const [, setLocation] = useLocation();
  const [timeLeft, setTimeLeft] = useState(299); // 4 minutes 59 seconds (04:59)
  const [logs, setLogs] = useState<{ time: string; event: string; action: string }[]>([]);

  // Add system event log for the simulation panel
  const addLog = (event: string, action: string) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
    setLogs((prev) => [{ time: timeStr, event, action }, ...prev].slice(0, 5));
  };

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // --- BACK BUTTON INTERCEPTION (BACK REDIRECT) ---
  useEffect(() => {
    // Push an extra history state on mount to intercept the back action
    window.history.pushState(null, "", window.location.href);
    addLog("Página Carregada", "Estado inserido no histórico (pushState)");

    const handlePopState = () => {
      addLog("Usuário clicou em Voltar", "Interceptado! Redirecionando para oferta de Downsell...");
      // Soft-navigate to downsell route immediately
      setLocation("/downsell");
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [setLocation]);

  // --- EXIT INTENT DETECTION (MOUSE LEAVE) ---
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger if mouse exits the viewport towards the top (close/address bar area)
      if (e.clientY < 20) {
        addLog("Intenção de Saída Detectada (Mouse fora da tela)", "Redirecionando para Downsell...");
        setLocation("/downsell");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [setLocation]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const benefits = [
    "Acesso Vitalício Imediato ao acervo base de +90 mil arquivos STL.",
    "Todos os 11 Módulos Bônus (Incluindo heróis Marvel/DC, Articulados, Efeito Bordado e o Módulo Especial da Copa do Mundo 3D).",
    "Suporte Exclusivo via WhatsApp direto com a nossa equipe.",
    "Garantia Incondicional de 14 Dias (Risco Zero para você)."
  ];

  const handleCTAClick = () => {
    addLog("Clique no Botão CTA", "Redirecionando para Checkout Oficial...");
    setLocation("/checkout");
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      {/* --- URGENCY HEADER --- */}
      <div className="bg-red-600 text-white py-3 px-4 text-center sticky top-0 z-50 shadow-md">
        <p className="font-bold text-sm md:text-base flex items-center justify-center gap-2 uppercase tracking-wide">
          <AlertTriangle className="text-white w-5 h-5 animate-pulse shrink-0" />
          <span>🛑 Atenção: Não saia desta página ou você perderá essa oportunidade única!</span>
          <AlertTriangle className="text-white w-5 h-5 animate-pulse shrink-0" />
        </p>
      </div>

      <main className="flex-grow container max-w-4xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
        
        {/* --- HERO SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6 w-full max-w-3xl mx-auto"
        >
          <div className="bg-red-100 border-l-4 border-red-600 text-red-800 p-4 rounded-r shadow-sm inline-block mx-auto mb-4">
            <p className="font-bold uppercase tracking-wider text-xs md:text-sm">🔥 -67% DE DESCONTO DE SAÍDA</p>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-neutral-900 leading-tight uppercase tracking-tight">
            ESPERE! Não vá embora sem o seu <span className="text-red-600">Acesso Premium</span>.
          </h1>

          <p className="text-lg md:text-xl text-neutral-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Sabemos que você quer transformar sua impressora 3D em uma máquina de lucro. Por isso, preparamos uma condição impossível de ignorar: o Pacote Premium Completo por uma fração do preço oficial.
          </p>

          {/* --- PRICE BOX --- */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="bg-white p-8 rounded-2xl shadow-xl border-2 border-neutral-100 my-8 max-w-md mx-auto relative overflow-hidden"
          >
            {/* Discount Badge */}
            <div className="absolute top-0 right-0 bg-yellow-400 text-black font-bold px-4 py-1 text-sm transform translate-x-4 translate-y-2 rotate-45 shadow-sm">
              -67% OFF
            </div>

            <div className="space-y-2">
              <p className="text-neutral-400 text-lg font-medium line-through decoration-red-500 decoration-2">
                De R$ 29,90
              </p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-2xl text-neutral-700 font-bold">Por APENAS</span>
                <span className="text-5xl md:text-6xl font-black text-green-600 tracking-tighter">R$ 9,90</span>
              </div>
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mt-1">
                👉 (Pagamento Único)
              </p>
            </div>

            {/* --- CTA BUTTON --- */}
            <div className="mt-8 space-y-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  boxShadow: ["0 0 0 0 rgba(22, 163, 74, 0.4)", "0 0 0 10px rgba(22, 163, 74, 0)"],
                }}
                transition={{ 
                  boxShadow: {
                    repeat: Infinity, 
                    duration: 1.5 
                  } 
                }}
                onClick={handleCTAClick}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-black text-lg md:text-xl py-5 px-4 rounded-lg shadow-lg uppercase tracking-wide transition-colors cursor-pointer leading-tight"
              >
                🚀 SIM! QUERO O MEU ACESSO PREMIUM POR R$ 9,90
              </motion.button>
              
              <div className="flex items-center justify-center gap-2 text-sm font-semibold text-red-600 bg-red-50 py-2 rounded">
                <Clock className="w-4 h-4 animate-spin" />
                Esta janela de desconto expira em: {formatTime(timeLeft)} minutos.
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* --- CONTENT SECTION --- */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-8 items-center w-full max-w-4xl">
          {/* Product Image */}
          <div className="relative group cursor-pointer" onClick={handleCTAClick}>
             <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-yellow-400 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
             <div className="relative bg-white rounded-lg p-2 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=600" 
                  alt="Produto Premium" 
                  className="rounded bg-neutral-100 object-cover w-full h-64 md:h-80"
                  referrerPolicy="no-referrer"
                />
             </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-neutral-800 uppercase tracking-tight">
              📦 O que você vai receber com essa liberação especial:
            </h3>
            <ul className="space-y-4">
              {benefits.map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 text-base text-neutral-700"
                >
                  <div className="mt-1 bg-green-100 p-1 rounded-full shrink-0">
                    <Check className="w-4 h-4 text-green-700 stroke-[3]" />
                  </div>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
            
            <div className="pt-4 flex items-center gap-2 text-neutral-500 text-sm font-medium">
               <ShieldCheck className="w-5 h-5 text-green-600 shrink-0" />
               <span>🔒 Compra 100% Segura e Garantida | Link enviado instantaneamente por E-mail e WhatsApp.</span>
            </div>
          </div>
        </div>

        {/* --- SIMULATOR & EXPLANATION PANEL --- */}
        <div className="w-full max-w-4xl mt-12 bg-neutral-900 text-neutral-300 rounded-2xl p-6 border border-neutral-800 space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
            <Navigation className="w-5 h-5 text-yellow-400 animate-pulse" />
            <h4 className="font-bold text-white uppercase text-sm tracking-wider">
              Simulador de Interceptação (Back Redirect) ativo
            </h4>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 text-xs leading-relaxed">
            <div className="space-y-2">
              <p className="text-neutral-400 font-semibold uppercase tracking-wider text-[10px]">Como testar a interceptação:</p>
              <ul className="list-disc pl-4 space-y-1 text-neutral-400">
                <li>
                  <span className="text-yellow-400 font-bold">Botão Voltar:</span> Pressione o botão "Voltar" do navegador ou deslize o dedo para o lado (no celular) e você será redirecionado imediatamente para a página de oferta alternativa de R$ 7,90 (/downsell) para salvar a venda!
                </li>
                <li>
                  <span className="text-yellow-400 font-bold">Intenção de Saída:</span> Mova o cursor do mouse para o topo da tela (em direção à barra de endereço do navegador) para simular uma saída rápida do site.
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-neutral-400 font-semibold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-neutral-500" /> Histórico de Eventos Recentes:
              </p>
              <div className="bg-black/40 rounded-lg p-3 font-mono text-[11px] h-28 overflow-y-auto space-y-1.5 border border-neutral-800">
                {logs.length === 0 ? (
                  <p className="text-neutral-600 italic">Nenhum evento registrado ainda. Interaja com a página para ver.</p>
                ) : (
                  logs.map((log, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <span className="text-neutral-600 shrink-0">{log.time}</span>
                      <span className="text-yellow-400 shrink-0">[{log.event}]</span>
                      <span className="text-white">{log.action}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-neutral-100 border-t border-neutral-200 py-8 mt-12">
        <div className="container mx-auto px-4 text-center space-y-4">
          <p className="text-neutral-500 text-sm">
            &copy; {new Date().getFullYear()} Mega Pack STL. Todos os direitos reservados.
          </p>
          <div className="flex justify-center gap-6 text-sm text-neutral-400">
            <a href="#" className="hover:text-neutral-600 transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-neutral-600 transition-colors">Política de Privacidade</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
