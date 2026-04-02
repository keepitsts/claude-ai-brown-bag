'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  Map,
  Clock,
  Eye,
  Mountain,
  Menu,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { LocationSelector } from '@/components/location/location-selector'
import { useWatchlistStore } from '@/stores/watchlistStore'

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/briefing', label: 'Briefing', icon: FileText },
  { href: '/map', label: 'Map', icon: Map },
  { href: '/history', label: 'History', icon: Clock },
  { href: '/watchlist', label: 'Watch List', icon: Eye },
]

export function Sidebar() {
  const pathname = usePathname()
  const watchlistCount = useWatchlistStore((s) => s.locations.length)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile top bar */}
      <header className="flex items-center justify-between border-b bg-sidebar px-4 py-3 md:hidden">
        <div className="flex items-center gap-2">
          <Mountain className="size-5 text-primary" />
          <span className="text-base font-semibold tracking-tight">TRAILHEAD</span>
        </div>
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="rounded-md p-1.5 hover:bg-sidebar-accent"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </header>

      {/* Mobile dropdown nav */}
      {mobileOpen && (
        <div className="border-b bg-sidebar p-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                  )}
                >
                  <Icon className="size-4" />
                  {label}
                  {href === '/watchlist' && watchlistCount > 0 && (
                    <Badge variant="secondary" className="ml-auto text-[10px]">
                      {watchlistCount}
                    </Badge>
                  )}
                </Link>
              )
            })}
          </nav>
          <Separator className="my-2" />
          <LocationSelector />
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden h-full w-64 flex-col border-r bg-sidebar text-sidebar-foreground md:flex">
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
                {href === '/watchlist' && watchlistCount > 0 && (
                  <Badge variant="secondary" className="ml-auto text-[10px]">
                    {watchlistCount}
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>
        <Separator />
        <div className="p-3">
          <LocationSelector />
        </div>
      </aside>
    </>
  )
}
