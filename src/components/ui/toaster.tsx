
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
            className="group touch-manipulation max-w-[calc(100%-32px)] sm:max-w-[420px]"
          >
            <div className="grid gap-1">
              {title && <ToastTitle className="text-base sm:text-sm">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="text-sm opacity-90">{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="h-7 w-7 rounded-md p-1" />
          </Toast>
        )
      })}
      <ToastViewport className="p-4 md:p-6 safe-area-padding" />
    </ToastProvider>
  )
}
