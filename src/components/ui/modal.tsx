import { Button } from '../shadcn/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../shadcn/dialog'
import { Input } from '../shadcn/input'
import { Label } from '../shadcn/label'

interface ModalProps {
  trigger: React.ReactNode
  content: React.ReactNode
  footer: React.ReactNode
  title: string
}

export function Modal({ trigger, title, content, footer }: ModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="gap-0" aria-describedby={undefined}>
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
