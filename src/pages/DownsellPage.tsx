import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Check, ShieldCheck, Clock, ArrowRight, Sparkles } from "lucide-react";

export default function DownsellPage() {
  const [timeLeft, setTimeLeft] = useState(179); // 2 minutes 59 seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const benefits = [
    "Acesso Vitalício Imediato ao acervo base de +90 mil arquivos STL.",
    "Todos os 11 Módulos Bônus e atualizações futuras.",
    "Garantia Incondicional de 14 Dias."
  ];

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col font-sans">
      {/* Dynamic urgency banner */}
      <div className="bg-yellow-400 text-black py-2 px-4 text-center font-black text-xs md:text-sm uppercase tracking-wider flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 animate-spin" />
        Última oportunidade de liberação imediata
        <Sparkles className="w-4 h-4 animate-spin" />
      </div>

      <main className="flex-grow container max-w-2xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center justify-center text-center space-y-8">
        
        {/* Persuasive Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-4"
        >
          <div className="bg-red-600 text-white font-black text-xs md:text-sm px-4 py-1.5 rounded-full inline-block uppercase tracking-widest shadow-lg animate-pulse">
            ⚠️ Oferta de Recuperação de Saída
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight uppercase">
            CALMA! NÃO VÁ EMBORA DE <span className="text-yellow-400">MÃOS VAZIAS</span>
          </h1>
          <p className="text-neutral-400 text-sm md:text-base max-w-lg mx-auto">
            Se o problema era o preço, nós resolvemos agora. Reduzimos o valor ao limite absoluto para que você não perca essa oportunidade única de faturar com sua impressora 3D.
          </p>
        </motion.div>

        {/* Pricing & Comparison Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-md bg-neutral-800 rounded-2xl border-2 border-yellow-400/30 p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden"
        >
          {/* Discount Badge */}
          <div className="absolute top-0 right-0 bg-red-600 text-white font-black px-4 py-1 text-xs transform translate-x-4 translate-y-2 rotate-45 shadow-sm">
            -73% OFF
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Preço Especial de Saída</span>
            <p className="text-neutral-500 text-base line-through decoration-red-500/85 decoration-2">
              De R$ 29,90
            </p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-neutral-300 text-lg font-bold">Por apenas</span>
              <span className="text-5xl md:text-6xl font-black text-yellow-400 tracking-tighter">R$ 7,90</span>
            </div>
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-1">
              👉 Pagamento Único no Pix (Sem taxas adicionais)
            </p>
          </div>

          {/* Checkout Button */}
          <div className="space-y-3 pt-2">
            <a
              href="https://pay.wiapy.com/xotmBiFz41i"
              target="_blank"
              rel="noreferrer"
              className="w-full h-14 bg-green-600 hover:bg-green-500 text-white font-black text-base md:text-lg rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all active:scale-[0.98] uppercase cursor-pointer"
            >
              QUERO LIBERAR MEU ACESSO <ArrowRight className="w-5 h-5" />
            </a>
            
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-yellow-400 bg-yellow-400/10 py-2 rounded border border-yellow-400/10">
              <Clock className="w-4 h-4" />
              Esta proposta especial expira em: {formatTime(timeLeft)}
            </div>
          </div>
        </motion.div>

        {/* Benefits recap */}
        <div className="w-full max-w-md text-left space-y-4">
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest text-center border-b border-neutral-800 pb-2">
            Você ainda receberá absolutamente tudo:
          </p>
          <ul className="space-y-3">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-neutral-300">
                <div className="bg-yellow-400/20 p-0.5 rounded-full shrink-0 text-yellow-400 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Rejection Link */}
        <div className="pt-2">
          <a
            href="/"
            className="text-xs text-neutral-500 hover:text-neutral-400 transition-colors underline font-medium"
          >
            Não obrigado, prefiro perder essa oportunidade e pagar R$ 29,90 depois.
          </a>
        </div>
      </main>

      <footer className="bg-neutral-950 border-t border-neutral-900 py-6 text-center text-[10px] text-neutral-600 space-y-1">
        <p>&copy; {new Date().getFullYear()} Mega Pack STL. Todos os direitos reservados.</p>
        <div className="flex justify-center gap-4 text-neutral-500">
          <a href="#" className="hover:underline">Termos de Uso</a>
          <a href="#" className="hover:underline">Política de Privacidade</a>
        </div>
      </footer>
    </div>
  );
}
