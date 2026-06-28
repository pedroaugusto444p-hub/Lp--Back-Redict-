import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-neutral-100 p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-red-50 p-2 rounded-lg">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-black text-neutral-900 tracking-tight">404 - Página Não Encontrada</h1>
        </div>

        <p className="text-sm text-neutral-500 leading-relaxed">
          A página que você está procurando não existe ou foi movida. Se você estava procurando o desconto especial, por favor retorne à página inicial.
        </p>

        <div className="pt-2">
          <a
            href="/"
            className="inline-block w-full text-center py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm transition-all"
          >
            Ir para a Página Inicial
          </a>
        </div>
      </div>
    </div>
  );
}
