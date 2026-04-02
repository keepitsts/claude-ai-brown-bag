'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  Map,
  Clock,
  Eye,
  Mountain,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { LocationSelector } from '@/components/location/location-selector'

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/briefing', label: 'Briefing', icon: FileText },
  { href: '/map', label: 'Map', icon: Map },
  { href: '/history', label: 'History', icon: Clock },
  { href: '/watchlist', label: 'Watch List', icon: Eye },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-64 flex-col border-r bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-2 px-4 py-5">
        <Mountain className="size-6 text-primary" />
        <span className="text-lg font-semibold tracking-tight">TRAILHEAD</span>
      </div>
      <Separator />
      <nav className="flex flex-1 flex-col gap-1 p-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
              )}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          )
        })}
      </nav>
      <Separator />
      <div className="p-3">
        <LocationSelector />
      </div>
    </aside>
  )
}
