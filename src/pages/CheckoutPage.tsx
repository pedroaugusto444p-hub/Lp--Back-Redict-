import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { CheckCircle, Copy, Clock, ShieldCheck, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "../hooks/use-toast";

export default function CheckoutPage() {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "confirming" | "success">("pending");

  const pixKey = "00020101021126580014br.gov.bcb.pix0136megapackstl-payment-key-pix-99052040000530398654049.905802BR5913Mega Pack STL6009SAO PAULO62070503***6304A1B2";

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate payment confirmation after 8 seconds
  useEffect(() => {
    const confirmTimer = setTimeout(() => {
      setPaymentStatus("confirming");
      const successTimer = setTimeout(() => {
        setPaymentStatus("success");
        toast({
          title: "Pagamento Confirmado!",
          description: "Seu acesso ao Mega Pack STL foi liberado com sucesso.",
          className: "bg-green-600 text-white border-none",
        });
      }, 3000);
      return () => clearTimeout(successTimer);
    }, 8000);

    return () => clearTimeout(confirmTimer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    toast({
      title: "Copiado!",
      description: "Código Copia e Cola copiado para a área de transferência.",
    });
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col font-sans">
      <header className="bg-white border-b border-neutral-200 py-4 px-6 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors text-sm font-bold uppercase">
            <ArrowLeft className="w-4 h-4" /> Voltar
          </a>
          <span className="font-black text-red-600 text-lg tracking-tight uppercase">Mega Pack STL</span>
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-semibold bg-neutral-100 px-3 py-1.5 rounded-full">
            <ShieldCheck className="w-4 h-4 text-green-600" /> Seguro
          </div>
        </div>
      </header>

      <main className="flex-grow container max-w-xl mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-white rounded-2xl shadow-xl border border-neutral-100 p-6 md:p-8 space-y-6"
        >
          {paymentStatus !== "success" ? (
            <>
              {/* Header */}
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-black text-neutral-900 uppercase tracking-tight">
                  Finalize seu Pagamento
                </h1>
                <p className="text-sm text-neutral-500">
                  Escaneie o QR Code ou copie o código Pix abaixo para liberar seu acesso.
                </p>
              </div>

              {/* Price Banner */}
              <div className="bg-green-50 rounded-xl p-4 flex justify-between items-center border border-green-200/50">
                <div>
                  <p className="text-xs font-bold text-green-800 uppercase tracking-wider">Valor do Pedido</p>
                  <p className="text-xs text-green-700">Mega Pack STL - Acesso Premium</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-green-600">R$ 9,90</p>
                </div>
              </div>

              {/* QR Code Placeholder */}
              <div className="flex flex-col items-center justify-center py-4 bg-neutral-50 rounded-xl border border-dashed border-neutral-200 relative overflow-hidden group">
                <div className="bg-white p-4 rounded-lg shadow-md border border-neutral-100">
                  {/* Dynamic simulated QR code */}
                  <svg className="w-44 h-44 text-neutral-900" viewBox="0 0 100 100">
                    <rect width="100" height="100" fill="white" />
                    {/* QR Code corners */}
                    <rect x="5" y="5" width="25" height="25" fill="currentColor" />
                    <rect x="8" y="8" width="19" height="19" fill="white" />
                    <rect x="11" y="11" width="13" height="13" fill="currentColor" />

                    <rect x="70" y="5" width="25" height="25" fill="currentColor" />
                    <rect x="73" y="8" width="19" height="19" fill="white" />
                    <rect x="76" y="11" width="13" height="13" fill="currentColor" />

                    <rect x="5" y="70" width="25" height="25" fill="currentColor" />
                    <rect x="8" y="73" width="19" height="19" fill="white" />
                    <rect x="11" y="76" width="13" height="13" fill="currentColor" />

                    {/* Random QR patterns */}
                    <rect x="35" y="5" width="5" height="10" fill="currentColor" />
                    <rect x="45" y="15" width="15" height="5" fill="currentColor" />
                    <rect x="35" y="25" width="10" height="5" fill="currentColor" />
                    <rect x="5" y="35" width="10" height="5" fill="currentColor" />
                    <rect x="20" y="45" width="5" height="15" fill="currentColor" />
                    <rect x="35" y="40" width="20" height="10" fill="currentColor" />
                    <rect x="65" y="35" width="5" height="5" fill="currentColor" />
                    <rect x="80" y="35" width="10" height="15" fill="currentColor" />
                    <rect x="75" y="55" width="5" height="10" fill="currentColor" />
                    <rect x="5" y="60" width="15" height="5" fill="currentColor" />
                    <rect x="45" y="65" width="5" height="15" fill="currentColor" />
                    <rect x="35" y="75" width="15" height="5" fill="currentColor" />
                    <rect x="55" y="80" width="10" height="10" fill="currentColor" />
                    <rect x="75" y="75" width="20" height="5" fill="currentColor" />
                    <rect x="85" y="85" width="10" height="10" fill="currentColor" />
                  </svg>
                </div>

                {/* Status Overlay */}
                <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  {paymentStatus === "pending" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-red-600" />
                      Aguardando pagamento...
                    </>
                  ) : (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-green-600" />
                      Confirmando transação...
                    </>
                  )}
                </div>
              </div>

              {/* Copia e Cola Section */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider block">
                  Pix Copia e Cola
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={pixKey}
                    className="flex-grow h-11 px-3 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-mono text-neutral-600 focus:outline-none select-all"
                  />
                  <button
                    onClick={handleCopy}
                    className="h-11 px-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg flex items-center justify-center gap-2 font-bold text-sm transition-colors shrink-0"
                  >
                    {copied ? "Copiado!" : <><Copy className="w-4 h-4" /> Copiar</>}
                  </button>
                </div>
              </div>

              {/* Timer & Security */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-100 text-xs font-semibold text-neutral-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-red-500" />
                  Expira em: <span className="text-red-500 font-bold">{formatTime(timeLeft)}</span>
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  Ambiente 100% Criptografado
                </span>
              </div>
            </>
          ) : (
            // Success Screen
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 space-y-6"
            >
              <div className="mx-auto bg-green-100 p-4 rounded-full w-fit text-green-600">
                <CheckCircle className="w-16 h-16 animate-bounce" />
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-black text-neutral-900 uppercase tracking-tight">
                  Acesso Liberado!
                </h2>
                <p className="text-green-700 font-bold text-sm bg-green-50 py-1.5 px-4 rounded-full inline-block">
                  Pagamento via Pix confirmado instantaneamente
                </p>
              </div>

              <p className="text-neutral-600 text-sm md:text-base leading-relaxed max-w-sm mx-auto">
                Parabéns! Seu acesso vitalício aos <span className="font-bold text-neutral-900">+90 mil arquivos STL</span> e todos os bônus está pronto.
              </p>

              <div className="bg-neutral-50 border border-neutral-100 rounded-xl p-5 text-left space-y-3">
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Seus dados de acesso:</p>
                <div className="space-y-1 text-sm text-neutral-700 font-medium">
                  <p>🔑 <span className="text-neutral-500">Usuário:</span> {navigator.userAgent.includes("Chrome") ? "seu-email@exemplo.com" : "cadastrado@pix.com"}</p>
                  <p>📦 <span className="text-neutral-500">Conteúdo:</span> Mega Pack STL Vitalício</p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://drive.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-black text-lg rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98] cursor-pointer"
                >
                  🚀 ACESSAR MEUS ARQUIVOS AGORA
                </a>
                <p className="text-xs text-neutral-400 mt-3">
                  * Você também receberá uma cópia do link de download em seu e-mail e WhatsApp.
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>

      <footer className="bg-neutral-100 border-t border-neutral-200 py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-xs text-neutral-400 space-y-2">
          <p>&copy; {new Date().getFullYear()} Mega Pack STL. Todos os direitos reservados.</p>
          <p>Dúvidas? Entre em contato com nosso suporte via WhatsApp.</p>
        </div>
      </footer>
    </div>
  );
}
