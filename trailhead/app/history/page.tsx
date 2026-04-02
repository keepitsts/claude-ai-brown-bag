'use client'

import { useState } from 'react'
import { Clock, ChevronDown, ChevronUp, FileText } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useBriefingStore } from '@/stores/briefingStore'
import type { ReactNode } from 'react'

function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground">
      {parseMarkdown(content)}
    </div>
  )
}

function parseMarkdown(md: string): ReactNode[] {
  const lines = md.split('\n')
  const elements: ReactNode[] = []
  let listItems: ReactNode[] = []
  let key = 0

  function flushList() {
    if (listItems.length > 0) {
      elements.push(<ul key={key++}>{listItems}</ul>)
      listItems = []
    }
  }

  for (const line of lines) {
    if (line.startsWith('## ')) {
      flushList()
      elements.push(<h2 key={key++}>{inlineFormat(line.slice(3))}</h2>)
    } else if (line.startsWith('### ')) {
      flushList()
      elements.push(<h3 key={key++}>{inlineFormat(line.slice(4))}</h3>)
    } else if (line.startsWith('- ')) {
      listItems.push(<li key={key++}>{inlineFormat(line.slice(2))}</li>)
    } else if (line.trim() === '') {
      flushList()
    } else {
      flushList()
      elements.push(<p key={key++}>{inlineFormat(line)}</p>)
    }
  }
  flushList()
  return elements
}

function inlineFormat(text: string): ReactNode[] {
  const parts: ReactNode[] = []
  const boldItalicPattern = /\*\*(.+?)\*\*|\*(.+?)\*/g
  let lastIndex = 0
  let result: RegExpMatchArray | null
  let key = 0

  // Use matchAll to avoid exec
  for (const m of text.matchAll(boldItalicPattern)) {
    result = m
    if (result.index !== undefined && result.index > lastIndex) {
      parts.push(text.slice(lastIndex, result.index))
    }
    if (result[1]) {
      parts.push(<strong key={key++}>{result[1]}</strong>)
    } else if (result[2]) {
      parts.push(<em key={key++}>{result[2]}</em>)
    }
    lastIndex = (result.index ?? 0) + result[0].length
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }
  return parts
}

export default function HistoryPage() {
  const history = useBriefingStore((s) => s.history)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Briefing History</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Previously generated operational briefings.
        </p>
      </div>

      {history.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-12">
            <Clock className="size-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No briefings yet.</p>
            <p className="text-xs text-muted-foreground">
              Generate a briefing from the Briefing page to see it here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {history.map((briefing) => {
            const isExpanded = expandedId === briefing.id
            const preview = briefing.content.slice(0, 100).replace(/\n/g, ' ')
            const date = new Date(briefing.generatedAt)

            return (
              <Card key={briefing.id}>
                <CardHeader className="cursor-pointer pb-3" onClick={() => toggle(briefing.id)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="size-4 text-muted-foreground" />
                      <div>
                        <CardTitle className="text-sm font-medium">
                          {briefing.locationName}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">
                          {date.toLocaleDateString()} at {date.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon-sm">
                      {isExpanded ? (
                        <ChevronUp className="size-4" />
                      ) : (
                        <ChevronDown className="size-4" />
                      )}
                    </Button>
                  </div>
                  {!isExpanded && (
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                      {preview}...
                    </p>
                  )}
                </CardHeader>
                {isExpanded && (
                  <CardContent>
                    <MarkdownRenderer content={briefing.content} />
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
