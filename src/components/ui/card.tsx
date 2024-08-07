import Link from 'next/link'
import { Badge } from '../shadcn/badge'

interface CardProps {
  title: string
  href: string
}

export default function Card({ title, href }: CardProps) {
  return (
    <Link href={href} passHref className="relative hover:border-primary border-foreground border group">
      <Badge className="absolute bottom-8 left-8" variant={'title'}>
        {title}
      </Badge>
    </Link>
  )
}
