import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export function Breadcrumb({ title }: { title: string }) {
  return (
    <nav className="flex items-center space-x-2 text-sm font-bold mb-8">
      <Link href="/" className="hover:underline hover:text-primary uppercase tracking-wider">
        Homilies
      </Link>
      <ChevronRight className="h-4 w-4" strokeWidth={3} />
      <span className="text-primary truncate uppercase tracking-wider">{title}</span>
    </nav>
  )
}
