import React from 'react'
import { Button, buttonVariants } from '../shadcn/button'
import { cn } from '@/lib/utils'
import { VariantProps } from 'class-variance-authority'

interface HeaderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  icon?: React.ReactElement
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function HeaderButton({ icon, children, className, onClick, variant, size, ...props }: HeaderButtonProps) {
  return (
    <Button variant={variant} onClick={onClick} size={size} className={cn('flex flex-row justify-between items-center group', className)} {...props}>
      <div className="flex flex-row gap-2 items-center">
        {icon &&
          React.cloneElement(icon, {
            className: 'h-4 w-4 text-slate-500 group-hover:text-primary-foreground',
          })}
        <span className="font-normal text-foreground">{children}</span>
      </div>
    </Button>
  )
}
