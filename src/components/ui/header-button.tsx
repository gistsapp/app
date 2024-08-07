import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '../shadcn/button'
import Shortcut from './shortcut'
import Link from 'next/link'

interface HeaderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactElement
  children: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'icon' | 'menu' | 'header'
  size?: 'default' | 'no-padding' | 'sm' | 'lg' | 'menu' | 'icon'
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
