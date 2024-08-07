import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '../shadcn/button'
import Shortcut from './shortcut'
import Link from 'next/link'

interface MenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  icon?: React.ReactElement
  letter?: string
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'icon' | 'menu' | 'header'
  size?: 'default' | 'no-padding' | 'sm' | 'lg' | 'menu' | 'icon'
}

export default function MenuButton({ href, icon, children, letter, className, variant, size, ...props }: MenuButtonProps) {
  const ButtonContent = (
    <Button variant={variant} size={size} className={cn('flex flex-row justify-between items-center group', className)} {...props}>
      <div className="flex flex-row gap-2 items-center">
        {icon &&
          React.cloneElement(icon, {
            className: 'h-4 w-4 text-slate-500 group-hover:text-primary-foreground',
          })}
        <span className="font-normal text-foreground">{children}</span>
      </div>
      {letter && <Shortcut letter={letter} />}
    </Button>
  )

  if (href) {
    return (
      <Link href={href} passHref>
        {ButtonContent}
      </Link>
    )
  }

  return ButtonContent
}
