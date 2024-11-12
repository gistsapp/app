import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../shadcn/dialog"

interface ModalProps {
  trigger: React.ReactNode
  content: React.ReactNode
  footer: React.ReactNode
  title: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Modal({ trigger, title, content, footer, open, onOpenChange }: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="gap-0 max-w-5xl" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-sm p-3">{title}</DialogTitle>
        </DialogHeader>
        <div className="h-[1px] bg-border"></div>
        <div className="grid gap-4 p-3">{content}</div>
        <div className="h-[1px] bg-border"></div>
        <div className="p-3 flex gap-3 justify-end">{footer}</div>
      </DialogContent>
    </Dialog>
  )
}
