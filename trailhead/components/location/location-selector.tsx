'use client'

import { useState } from 'react'
import { MapPin, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { FEDERAL_LANDS } from '@/lib/constants/locations'
import { useLocationStore } from '@/stores/location-store'
import type { FederalLand } from '@/lib/types'

const agencyOrder = ['NPS', 'BLM', 'FWS', 'BIA', 'USFS', 'USBR'] as const

function groupByAgency(locations: FederalLand[]) {
  const groups: Record<string, FederalLand[]> = {}
  for (const loc of locations) {
    if (!groups[loc.agency]) groups[loc.agency] = []
    groups[loc.agency].push(loc)
  }
  return agencyOrder
    .filter((a) => groups[a])
    .map((agency) => ({ agency, agencyName: groups[agency][0].agencyName, locations: groups[agency] }))
}

const grouped = groupByAgency(FEDERAL_LANDS)

export function LocationSelector() {
  const [open, setOpen] = useState(false)
  const { selectedLocation, setSelectedLocation } = useLocationStore()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          'flex w-full items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent',
          selectedLocation ? 'text-sidebar-foreground' : 'text-muted-foreground'
        )}
      >
        <MapPin className="size-4 shrink-0" />
        <span className="flex-1 truncate text-left">
          {selectedLocation ? selectedLocation.name : 'Select location...'}
        </span>
        <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0" align="start" side="top">
        <Command>
          <CommandInput placeholder="Search locations..." />
          <CommandList>
            <CommandEmpty>No locations found.</CommandEmpty>
            {grouped.map(({ agency, agencyName, locations }) => (
              <CommandGroup key={agency} heading={agencyName}>
                {locations.map((loc) => (
                  <CommandItem
                    key={loc.id}
                    value={`${loc.name} ${loc.state} ${loc.agency}`}
                    data-checked={selectedLocation?.id === loc.id}
                    onSelect={() => {
                      setSelectedLocation(loc)
                      setOpen(false)
                    }}
                  >
                    <span className="flex flex-1 items-center gap-2">
                      <span className="truncate">{loc.name}</span>
                      <Badge variant="secondary" className="ml-auto text-[10px]">
                        {loc.state}
                      </Badge>
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
