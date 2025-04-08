
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast 
            key={id} 
            {...props} 
            className="group touch-manipulation max-w-[calc(100%-32px)] sm:max-w-[420px] z-[1000] shadow-lg"
          >
            <div className="grid gap-1">
              {title && <ToastTitle className="text-base sm:text-sm font-medium">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="text-sm text-foreground/80">{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="h-7 w-7 rounded-md bg-background/10 p-1 opacity-70 hover:opacity-100 focus:ring-2 focus:ring-offset-2" />
          </Toast>
        )
      })}
      <ToastViewport className="p-4 md:p-6 safe-area-padding fixed bottom-0 right-0 z-[1000]" />
    </ToastProvider>
  )
}
