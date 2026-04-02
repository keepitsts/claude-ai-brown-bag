'use client'

import { useState, useCallback, useRef, useMemo } from 'react'
import { FileText, Copy, Printer, Loader2, AlertCircle, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { useLocationStore } from '@/stores/location-store'
import { useBriefingStore } from '@/stores/briefingStore'
import type { ReactNode } from 'react'

function MarkdownRenderer({ content }: { content: string }) {
  const elements = useMemo(() => parseMarkdown(content), [content])
  return <div className="prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground">{elements}</div>
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
  let key = 0

  for (const m of text.matchAll(boldItalicPattern)) {
    if (m.index !== undefined && m.index > lastIndex) {
      parts.push(text.slice(lastIndex, m.index))
    }
    if (m[1]) {
      parts.push(<strong key={key++}>{m[1]}</strong>)
    } else if (m[2]) {
      parts.push(<em key={key++}>{m[2]}</em>)
    }
    lastIndex = (m.index ?? 0) + m[0].length
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }
  return parts
}

export default function BriefingPage() {
  const selectedLocation = useLocationStore((s) => s.selectedLocation)
  const addBriefing = useBriefingStore((s) => s.addBriefing)

  const [content, setContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const contentRef = useRef('')

  const generateBriefing = useCallback(async () => {
    if (!selectedLocation) return

    setIsGenerating(true)
    setError(null)
    setContent('')
    contentRef.current = ''

    try {
      const res = await fetch('/api/briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locationId: selectedLocation.id,
          locationName: selectedLocation.name,
          lat: selectedLocation.lat,
          lng: selectedLocation.lng,
          state: selectedLocation.state,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || `Request failed (${res.status})`)
      }

      const reader = res.body?.getReader()
      if (!reader) throw new Error('No response stream')

      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        contentRef.current += chunk
        setContent(contentRef.current)
      }

      addBriefing({
        id: crypto.randomUUID(),
        locationId: selectedLocation.id,
        locationName: selectedLocation.name,
        generatedAt: new Date().toISOString(),
        content: contentRef.current,
        dataSnapshot: {},
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate briefing')
    } finally {
      setIsGenerating(false)
    }
  }, [selectedLocation, addBriefing])

  const copyBriefing = useCallback(async () => {
    await navigator.clipboard.writeText(contentRef.current)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])

  const printBriefing = useCallback(() => {
    window.print()
  }, [])

  if (!selectedLocation) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold tracking-tight">Daily Briefing</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Select a location from the sidebar to generate a briefing.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-start justify-between print:hidden">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Daily Briefing</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {selectedLocation.name} — {selectedLocation.state}
          </p>
        </div>
        <div className="flex gap-2">
          {content && !isGenerating && (
            <>
              <Button variant="outline" size="sm" onClick={copyBriefing}>
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                {copied ? 'Copied' : 'Copy Briefing'}
              </Button>
              <Button variant="outline" size="sm" onClick={printBriefing}>
                <Printer className="size-4" />
                Print View
              </Button>
            </>
          )}
          <Button
            size="sm"
            onClick={generateBriefing}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <FileText className="size-4" />
            )}
            {isGenerating ? 'Generating...' : 'Generate Briefing'}
          </Button>
        </div>
      </div>

      {/* Print header — only visible in print */}
      <div className="hidden print:block">
        <h1 className="text-xl font-bold">TRAILHEAD — Daily Operational Briefing</h1>
        <p className="text-sm">
          {selectedLocation.name} — {selectedLocation.state} | Generated: {new Date().toLocaleString()}
        </p>
        <hr className="my-2" />
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isGenerating && !content && (
        <Card>
          <CardContent className="flex items-center gap-3 py-12">
            <Loader2 className="size-5 animate-spin text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Gathering data and generating briefing...
            </span>
          </CardContent>
        </Card>
      )}

      {content && (
        <Card id="briefing-content">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="size-4 text-muted-foreground print:hidden" />
              Operational Briefing — {new Date().toLocaleDateString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MarkdownRenderer content={content} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
