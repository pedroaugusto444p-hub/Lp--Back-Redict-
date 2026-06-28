import { useToast } from "../../hooks/use-toast"
import { AnimatePresence, motion } from "motion/react"
import { X } from "lucide-react"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
            className={`pointer-events-auto p-4 rounded-xl shadow-lg border flex justify-between items-start gap-3 backdrop-blur-md ${
              t.variant === "destructive"
                ? "bg-red-900/90 text-white border-red-500/30"
                : t.className || "bg-white/95 text-neutral-900 border-neutral-200/50"
            }`}
          >
            <div className="flex-1">
              {t.title && <h4 className="font-bold text-sm">{t.title}</h4>}
              {t.description && <p className="text-xs mt-1 opacity-90">{t.description}</p>}
            </div>
            <button
              onClick={() => dismiss(t.id)}
              className="p-0.5 rounded-lg hover:bg-neutral-500/10 transition-colors"
            >
              <X className="w-4 h-4 opacity-70" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
export default Toaster;
