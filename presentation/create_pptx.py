#!/usr/bin/env python3
"""Generate the TRAILHEAD brown bag presentation."""

from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

# Brand colors
NAVY = RGBColor(0x1B, 0x2A, 0x4A)
DARK_BLUE = RGBColor(0x2D, 0x3E, 0x6B)
ACCENT_BLUE = RGBColor(0x3B, 0x82, 0xF6)
ACCENT_GREEN = RGBColor(0x10, 0xB9, 0x81)
LIGHT_GRAY = RGBColor(0xF1, 0xF5, 0xF9)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
DARK_TEXT = RGBColor(0x1E, 0x29, 0x3B)
MEDIUM_TEXT = RGBColor(0x47, 0x55, 0x69)
SUBTLE_TEXT = RGBColor(0x94, 0xA3, 0xB8)
ORANGE = RGBColor(0xF5, 0x9E, 0x0B)
RED_ACCENT = RGBColor(0xEF, 0x44, 0x44)

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)
W = prs.slide_width
H = prs.slide_height


def add_bg(slide, color):
    """Set slide background color."""
    bg = slide.background
    fill = bg.fill
    fill.solid()
    fill.fore_color.rgb = color


def add_shape(slide, left, top, width, height, color, alpha=None):
    """Add a colored rectangle."""
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = color
    shape.line.fill.background()
    return shape


def add_text(slide, text, left, top, width, height, font_size=18,
             color=DARK_TEXT, bold=False, alignment=PP_ALIGN.LEFT,
             font_name="Calibri"):
    """Add a text box."""
    txBox = slide.shapes.add_textbox(left, top, width, height)
    tf = txBox.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = text
    p.font.size = Pt(font_size)
    p.font.color.rgb = color
    p.font.bold = bold
    p.font.name = font_name
    p.alignment = alignment
    return txBox


def add_bullet_list(slide, items, left, top, width, height, font_size=18,
                    color=DARK_TEXT, spacing=Pt(8), font_name="Calibri",
                    bullet_color=None):
    """Add a bulleted list."""
    txBox = slide.shapes.add_textbox(left, top, width, height)
    tf = txBox.text_frame
    tf.word_wrap = True
    for i, item in enumerate(items):
        if i == 0:
            p = tf.paragraphs[0]
        else:
            p = tf.add_paragraph()
        p.text = item
        p.font.size = Pt(font_size)
        p.font.color.rgb = color
        p.font.name = font_name
        p.space_after = spacing
        p.level = 0
        # Bullet character
        pPr = p._pPr
        if pPr is None:
            from pptx.oxml.ns import qn
            pPr = p._p.get_or_add_pPr()
        from pptx.oxml.ns import qn
        buNone = pPr.findall(qn('a:buNone'))
        for bn in buNone:
            pPr.remove(bn)
        buChar = pPr.find(qn('a:buChar'))
        if buChar is None:
            from lxml import etree
            buChar = etree.SubElement(pPr, qn('a:buChar'))
        buChar.set('char', '\u2022')
        if bullet_color:
            buClr = pPr.find(qn('a:buClr'))
            if buClr is None:
                buClr = etree.SubElement(pPr, qn('a:buClr'))
            else:
                buClr.clear()
            from lxml import etree as et2
            srgb = et2.SubElement(buClr, qn('a:srgbClr'))
            srgb.set('val', '%02X%02X%02X' % (bullet_color[0], bullet_color[1], bullet_color[2]))
    return txBox


def add_numbered_list(slide, items, left, top, width, height, font_size=18,
                      color=DARK_TEXT, num_color=ACCENT_BLUE):
    """Add a numbered list with colored numbers."""
    txBox = slide.shapes.add_textbox(left, top, width, height)
    tf = txBox.text_frame
    tf.word_wrap = True
    for i, item in enumerate(items):
        if i == 0:
            p = tf.paragraphs[0]
        else:
            p = tf.add_paragraph()
        p.space_after = Pt(6)
        # Number run
        run_num = p.add_run()
        run_num.text = f"{i+1}.  "
        run_num.font.size = Pt(font_size)
        run_num.font.color.rgb = num_color
        run_num.font.bold = True
        run_num.font.name = "Calibri"
        # Text run
        run_txt = p.add_run()
        run_txt.text = item
        run_txt.font.size = Pt(font_size)
        run_txt.font.color.rgb = color
        run_txt.font.name = "Calibri"
    return txBox


def add_stat_card(slide, number, label, left, top, width=Inches(2.5),
                  height=Inches(1.6), num_color=ACCENT_BLUE):
    """Add a stat card with big number and label."""
    card = add_shape(slide, left, top, width, height, WHITE)
    # Number
    add_text(slide, number, left + Inches(0.2), top + Inches(0.15),
             width - Inches(0.4), Inches(0.8), font_size=44,
             color=num_color, bold=True, alignment=PP_ALIGN.CENTER)
    # Label
    add_text(slide, label, left + Inches(0.2), top + Inches(0.9),
             width - Inches(0.4), Inches(0.5), font_size=14,
             color=MEDIUM_TEXT, alignment=PP_ALIGN.CENTER)
    return card


# ============================================================
# SLIDE 1: Title
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])  # Blank
add_bg(slide, NAVY)

# Accent bar at top
add_shape(slide, Inches(0), Inches(0), W, Inches(0.06), ACCENT_BLUE)

# Title
add_text(slide, "Building with Claude Code", Inches(1.5), Inches(1.8),
         Inches(10), Inches(1.2), font_size=52, color=WHITE, bold=True)

# Subtitle
add_text(slide, "From Idea to Deployed App in One Afternoon",
         Inches(1.5), Inches(3.0), Inches(10), Inches(0.6),
         font_size=24, color=SUBTLE_TEXT)

# Divider line
add_shape(slide, Inches(1.5), Inches(3.9), Inches(2), Inches(0.04), ACCENT_BLUE)

# Presenter info
add_text(slide, "Rudy Zauel  |  Simple Technology Solutions",
         Inches(1.5), Inches(4.3), Inches(8), Inches(0.5),
         font_size=18, color=SUBTLE_TEXT)
add_text(slide, "Brown Bag  |  April 3, 2026",
         Inches(1.5), Inches(4.8), Inches(8), Inches(0.5),
         font_size=16, color=SUBTLE_TEXT)


# ============================================================
# SLIDE 2: The Problem
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, WHITE)
add_shape(slide, Inches(0), Inches(0), W, Inches(0.06), ACCENT_BLUE)

add_text(slide, "The Problem", Inches(1), Inches(0.6), Inches(11), Inches(0.7),
         font_size=36, color=NAVY, bold=True)

# Big quote
add_text(slide, (
    '"Your officers cover 20% of U.S. landmass across 855+ locations.\n'
    'Before every shift, someone needs to know: weather, fires, earthquakes,\n'
    'crime trends, sunrise/sunset. That information exists across six\n'
    'different government websites. Nobody checks all six."'
), Inches(1.2), Inches(1.8), Inches(10.5), Inches(2.5),
    font_size=22, color=DARK_BLUE, font_name="Calibri")

# The six sources as a grid
sources = [
    ("Open-Meteo", "Weather & Forecasts"),
    ("USGS", "Earthquake Activity"),
    ("NASA FIRMS", "Wildfire Detection"),
    ("FBI Crime Data", "Crime Statistics"),
    ("Nominatim / OSM", "Geocoding"),
    ("Open-Meteo", "Astronomy & Visibility"),
]

for i, (name, desc) in enumerate(sources):
    col = i % 3
    row = i // 3
    left = Inches(1.2) + Inches(3.6) * col
    top = Inches(4.6) + Inches(1.1) * row
    card = add_shape(slide, left, top, Inches(3.2), Inches(0.9), LIGHT_GRAY)
    add_text(slide, name, left + Inches(0.2), top + Inches(0.08),
             Inches(2.8), Inches(0.35), font_size=15, color=NAVY, bold=True)
    add_text(slide, desc, left + Inches(0.2), top + Inches(0.45),
             Inches(2.8), Inches(0.35), font_size=13, color=MEDIUM_TEXT)


# ============================================================
# SLIDE 3: Meet TRAILHEAD
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, WHITE)
add_shape(slide, Inches(0), Inches(0), W, Inches(0.06), ACCENT_BLUE)

add_text(slide, "Meet TRAILHEAD", Inches(1), Inches(0.6), Inches(11), Inches(0.7),
         font_size=36, color=NAVY, bold=True)

add_text(slide, "Federal Lands Daily Briefing Tool", Inches(1), Inches(1.25),
         Inches(11), Inches(0.5), font_size=20, color=ACCENT_BLUE)

# Description
add_text(slide, (
    "An AI-powered situational awareness tool that pulls real-time data from "
    "six public APIs and uses Claude to synthesize everything into a single, "
    "actionable briefing — like a morning roll call briefing that writes itself."
), Inches(1), Inches(2.0), Inches(11), Inches(1.0),
    font_size=18, color=MEDIUM_TEXT)

# 7 features in two columns
features_left = [
    "F1  Location Selector — 25 federal land sites across 6 agencies",
    "F2  Real-Time Dashboard — weather, seismic, fire, crime, astronomy",
    "F3  AI Daily Briefing — Claude synthesizes all data into a roll call briefing",
    "F4  Interactive Map — Leaflet map with fire and earthquake overlays",
]
features_right = [
    "F5  Briefing History — browse and compare past briefings",
    "F6  Multi-Location Watch List — monitor multiple sites at once",
    "F7  Shareable Export — copy or print-friendly briefing output",
]

for i, feat in enumerate(features_left):
    top = Inches(3.2) + Inches(0.55) * i
    add_shape(slide, Inches(1), top, Inches(0.08), Inches(0.35), ACCENT_GREEN)
    add_text(slide, feat, Inches(1.3), top, Inches(5.2), Inches(0.45),
             font_size=15, color=DARK_TEXT)

for i, feat in enumerate(features_right):
    top = Inches(3.2) + Inches(0.55) * i
    add_shape(slide, Inches(7), top, Inches(0.08), Inches(0.35), ACCENT_GREEN)
    add_text(slide, feat, Inches(7.3), top, Inches(5.2), Inches(0.45),
             font_size=15, color=DARK_TEXT)

# Live URL
add_shape(slide, Inches(1), Inches(5.8), Inches(11.3), Inches(0.8), NAVY)
add_text(slide, "LIVE NOW    trailhead-pearl.vercel.app",
         Inches(1), Inches(5.85), Inches(11.3), Inches(0.7),
         font_size=22, color=WHITE, bold=True, alignment=PP_ALIGN.CENTER)


# ============================================================
# SLIDE 4: Live Demo (placeholder)
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, NAVY)
add_shape(slide, Inches(0), Inches(0), W, Inches(0.06), ACCENT_BLUE)

add_text(slide, "Live Demo", Inches(1), Inches(2.5), Inches(11.3), Inches(1),
         font_size=52, color=WHITE, bold=True, alignment=PP_ALIGN.CENTER)

add_text(slide, "trailhead-pearl.vercel.app", Inches(1), Inches(3.7),
         Inches(11.3), Inches(0.6), font_size=24, color=ACCENT_BLUE,
         alignment=PP_ALIGN.CENTER)

steps = [
    "Select a location  (Yellowstone National Park)",
    "View the real-time conditions dashboard",
    "Generate an AI briefing  —  watch Claude synthesize live data",
    "Explore the interactive map  (fire + earthquake markers)",
    "Browse briefing history and watchlist",
]

for i, step in enumerate(steps):
    top = Inches(4.6) + Inches(0.42) * i
    txBox = slide.shapes.add_textbox(Inches(3), top, Inches(7.3), Inches(0.4))
    tf = txBox.text_frame
    p = tf.paragraphs[0]
    run1 = p.add_run()
    run1.text = f"{i+1}  "
    run1.font.size = Pt(16)
    run1.font.color.rgb = ACCENT_BLUE
    run1.font.bold = True
    run1.font.name = "Calibri"
    run2 = p.add_run()
    run2.text = step
    run2.font.size = Pt(16)
    run2.font.color.rgb = SUBTLE_TEXT
    run2.font.name = "Calibri"


# ============================================================
# SLIDE 5: The Reveal — How It Was Built
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, WHITE)
add_shape(slide, Inches(0), Inches(0), W, Inches(0.06), ACCENT_BLUE)

add_text(slide, "How It Was Built", Inches(1), Inches(0.6), Inches(11), Inches(0.7),
         font_size=36, color=NAVY, bold=True)

# Big reveal stat
add_shape(slide, Inches(1), Inches(1.6), Inches(11.3), Inches(1.8), NAVY)

add_text(slide, "One afternoon.  One developer.  One AI.",
         Inches(1), Inches(1.75), Inches(11.3), Inches(0.7),
         font_size=32, color=WHITE, bold=True, alignment=PP_ALIGN.CENTER)

add_text(slide, "Not a mockup — a working application pulling live data from 6 APIs, deployed to the internet.",
         Inches(2), Inches(2.55), Inches(9.3), Inches(0.7),
         font_size=16, color=SUBTLE_TEXT, alignment=PP_ALIGN.CENTER)

# Stats row
stats = [
    ("4,455", "Lines of Code"),
    ("58", "TypeScript Files"),
    ("20", "Git Commits"),
    ("7", "Features"),
    ("0", "Build Failures"),
]
for i, (num, label) in enumerate(stats):
    left = Inches(0.8) + Inches(2.5) * i
    nc = ACCENT_GREEN if num == "0" else ACCENT_BLUE
    add_stat_card(slide, num, label, left, Inches(4.0), num_color=nc)

# Tool
add_text(slide, "Built entirely with Claude Code (Opus 4.6, 1M context)",
         Inches(1), Inches(6.2), Inches(11.3), Inches(0.5),
         font_size=16, color=MEDIUM_TEXT, alignment=PP_ALIGN.CENTER)


# ============================================================
# SLIDE 6: The Process
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, WHITE)
add_shape(slide, Inches(0), Inches(0), W, Inches(0.06), ACCENT_BLUE)

add_text(slide, "The Process", Inches(1), Inches(0.6), Inches(11), Inches(0.7),
         font_size=36, color=NAVY, bold=True)

add_text(slide, "Prompt-Driven Development — every action recorded as a sequential prompt",
         Inches(1), Inches(1.3), Inches(11), Inches(0.5),
         font_size=18, color=MEDIUM_TEXT)

# Three-phase timeline
phases = [
    ("Research", "3 prompts", [
        "Company briefing on STS",
        "100 Free APIs research",
        "Demo spec + tech stack",
    ], ACCENT_BLUE),
    ("Build", "8 prompts", [
        "Headless pipeline: 11 steps",
        "Fresh context per feature",
        "TypeScript verification gates",
        "Auto-commit on success",
    ], ACCENT_GREEN),
    ("Debug & Deploy", "6 prompts", [
        "Fixed 3 API integrations",
        "Console log debugging",
        "Added Anthropic credits",
        "Deployed to Vercel",
    ], ORANGE),
]

for i, (title, subtitle, items, color) in enumerate(phases):
    left = Inches(0.8) + Inches(4.1) * i
    # Phase card
    add_shape(slide, left, Inches(2.2), Inches(3.7), Inches(0.08), color)
    add_text(slide, title, left, Inches(2.5), Inches(3.7), Inches(0.5),
             font_size=24, color=NAVY, bold=True)
    add_text(slide, subtitle, left, Inches(3.0), Inches(3.7), Inches(0.4),
             font_size=14, color=color, bold=True)
    for j, item in enumerate(items):
        top = Inches(3.6) + Inches(0.4) * j
        add_text(slide, f"\u2022  {item}", left + Inches(0.2), top,
                 Inches(3.3), Inches(0.35), font_size=14, color=MEDIUM_TEXT)

# Pipeline diagram label
add_shape(slide, Inches(0.8), Inches(5.6), Inches(11.5), Inches(1.2), LIGHT_GRAY)
add_text(slide, "Build Pipeline Pattern", Inches(1.1), Inches(5.7),
         Inches(4), Inches(0.4), font_size=16, color=NAVY, bold=True)
add_text(slide, (
    "claude -p \"feature prompt\"  \u2192  TypeScript verification  \u2192  "
    "git commit  \u2192  next feature\n"
    "Each feature gets a fresh context window. No context degradation. Clean git history."
), Inches(1.1), Inches(6.1), Inches(10.8), Inches(0.6),
    font_size=14, color=MEDIUM_TEXT)


# ============================================================
# SLIDE 7: The 17-Prompt Journey
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, WHITE)
add_shape(slide, Inches(0), Inches(0), W, Inches(0.06), ACCENT_BLUE)

add_text(slide, "The 17-Prompt Journey", Inches(1), Inches(0.6), Inches(11), Inches(0.7),
         font_size=36, color=NAVY, bold=True)

add_text(slide, "Every interaction recorded — the entire repo is transparent",
         Inches(1), Inches(1.2), Inches(11), Inches(0.4),
         font_size=16, color=MEDIUM_TEXT)

prompts_data = [
    ("001-002", "Project setup", "human"),
    ("003-006", "Research: STS, APIs, spec, tech stack", "research"),
    ("007", "Master setup prompt", "claude"),
    ("008", "Fixed response approach", "claude"),
    ("009", "Research: agentic development patterns", "claude"),
    ("010", "Built entire app (11 steps, 0 failures)", "claude"),
    ("011-013", "API keys, nested .git fix, results update", "claude"),
    ("014", "Started dev server", "claude"),
    ("015", "Fixed fire, crime, and weather APIs", "claude"),
    ("016", "Debugged briefing error (API credits)", "claude"),
    ("017", "Deployed to Vercel", "claude"),
]

color_map = {
    "human": MEDIUM_TEXT,
    "research": ACCENT_BLUE,
    "claude": ACCENT_GREEN,
}

for i, (num, desc, ptype) in enumerate(prompts_data):
    top = Inches(1.85) + Inches(0.46) * i
    color = color_map[ptype]
    # Number pill
    pill = add_shape(slide, Inches(1.2), top + Inches(0.03), Inches(1.2), Inches(0.35), color)
    add_text(slide, num, Inches(1.2), top + Inches(0.03), Inches(1.2), Inches(0.35),
             font_size=13, color=WHITE, bold=True, alignment=PP_ALIGN.CENTER)
    # Description
    add_text(slide, desc, Inches(2.7), top, Inches(8), Inches(0.4),
             font_size=15, color=DARK_TEXT)

# Legend
legend_items = [
    ("Human Action", MEDIUM_TEXT),
    ("Research", ACCENT_BLUE),
    ("Claude Code", ACCENT_GREEN),
]
for i, (label, color) in enumerate(legend_items):
    left = Inches(8.5) + Inches(1.7) * i
    add_shape(slide, left, Inches(7.0), Inches(0.3), Inches(0.25), color)
    add_text(slide, label, left + Inches(0.4), Inches(6.95), Inches(1.2), Inches(0.3),
             font_size=11, color=MEDIUM_TEXT)


# ============================================================
# SLIDE 8: Real Debugging
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, WHITE)
add_shape(slide, Inches(0), Inches(0), W, Inches(0.06), ACCENT_BLUE)

add_text(slide, "Real Bugs, Real Fixes", Inches(1), Inches(0.6), Inches(11), Inches(0.7),
         font_size=36, color=NAVY, bold=True)

add_text(slide, "Claude Code doesn't just generate code — it debugs from console logs",
         Inches(1), Inches(1.3), Inches(11), Inches(0.4),
         font_size=18, color=MEDIUM_TEXT)

bugs = [
    ("NASA FIRMS API", "400 Error",
     "URL used lat,lng,radius format",
     "Changed to bounding box: west,south,east,north"),
    ("FBI Crime API", "503 Error",
     "Wrong env var name (FBI_API_KEY vs FBI_CRIME_API_KEY)\n"
     "Wrong endpoint and date format",
     "Fixed env var + rewrote to use\n/summarized/state/{state}/{offense}?from=MM-YYYY"),
    ("Open-Meteo Weather", "Wrong units",
     "API defaults to Celsius and km/h",
     "Added temperature_unit=fahrenheit\nand wind_speed_unit=mph"),
    ("Claude Briefing API", "Empty response",
     "Anthropic API key had no credits",
     "No code fix needed — added credits to account"),
]

for i, (api, error, cause, fix) in enumerate(bugs):
    top = Inches(2.1) + Inches(1.25) * i
    # API name
    add_shape(slide, Inches(1), top, Inches(0.06), Inches(1.0), RED_ACCENT)
    add_text(slide, api, Inches(1.3), top, Inches(2.5), Inches(0.35),
             font_size=16, color=NAVY, bold=True)
    add_text(slide, error, Inches(1.3), top + Inches(0.32), Inches(2.5), Inches(0.3),
             font_size=12, color=RED_ACCENT, bold=True)
    # Cause → Fix
    add_text(slide, cause, Inches(4.2), top, Inches(4), Inches(1.0),
             font_size=13, color=MEDIUM_TEXT)
    add_text(slide, "\u2192", Inches(8.3), top + Inches(0.1), Inches(0.4), Inches(0.4),
             font_size=20, color=ACCENT_GREEN, bold=True, alignment=PP_ALIGN.CENTER)
    add_text(slide, fix, Inches(8.8), top, Inches(4), Inches(1.0),
             font_size=13, color=ACCENT_GREEN)

# Method note
add_shape(slide, Inches(1), Inches(6.4), Inches(11.3), Inches(0.7), LIGHT_GRAY)
add_text(slide, (
    "Method:  Rudy pasted browser console logs into a gitignored debug-logs/ folder. "
    "Claude Code read the logs, diagnosed the root cause, and applied the fix."
), Inches(1.3), Inches(6.5), Inches(10.7), Inches(0.5),
    font_size=14, color=MEDIUM_TEXT)


# ============================================================
# SLIDE 9: Architecture
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, WHITE)
add_shape(slide, Inches(0), Inches(0), W, Inches(0.06), ACCENT_BLUE)

add_text(slide, "Architecture", Inches(1), Inches(0.6), Inches(11), Inches(0.7),
         font_size=36, color=NAVY, bold=True)

# Tech stack pills
tech = [
    "Next.js 15", "TypeScript", "Tailwind CSS v4", "shadcn/ui",
    "Zustand", "TanStack Query", "React Leaflet", "Anthropic SDK"
]
for i, t in enumerate(tech):
    left = Inches(1) + Inches(1.5) * i
    pill = add_shape(slide, left, Inches(1.5), Inches(1.35), Inches(0.38), NAVY)
    add_text(slide, t, left, Inches(1.5), Inches(1.35), Inches(0.38),
             font_size=11, color=WHITE, bold=True, alignment=PP_ALIGN.CENTER)

# Data flow diagram (text-based)
flow_labels = [
    ("6 Public APIs", ACCENT_BLUE, Inches(1)),
    ("\u2192", MEDIUM_TEXT, Inches(3.8)),
    ("lib/api/ wrappers", DARK_BLUE, Inches(4.3)),
    ("\u2192", MEDIUM_TEXT, Inches(6.6)),
    ("app/api/ routes", DARK_BLUE, Inches(7.1)),
    ("\u2192", MEDIUM_TEXT, Inches(9.2)),
    ("TanStack Query", DARK_BLUE, Inches(9.7)),
    ("\u2192", MEDIUM_TEXT, Inches(11.6)),
]

for label, color, left in flow_labels:
    if label == "\u2192":
        add_text(slide, label, left, Inches(2.35), Inches(0.5), Inches(0.5),
                 font_size=24, color=color, bold=True, alignment=PP_ALIGN.CENTER)
    else:
        add_shape(slide, left, Inches(2.35), Inches(2.4), Inches(0.45), LIGHT_GRAY)
        add_text(slide, label, left, Inches(2.35), Inches(2.4), Inches(0.45),
                 font_size=13, color=color, bold=True, alignment=PP_ALIGN.CENTER)

# UI label at the end
add_shape(slide, Inches(11.2), Inches(2.35), Inches(1.3), Inches(0.45), ACCENT_GREEN)
add_text(slide, "UI", Inches(11.2), Inches(2.35), Inches(1.3), Inches(0.45),
         font_size=13, color=WHITE, bold=True, alignment=PP_ALIGN.CENTER)

# Key patterns
add_text(slide, "Key Design Decisions", Inches(1), Inches(3.3),
         Inches(11), Inches(0.5), font_size=20, color=NAVY, bold=True)

patterns_left = [
    "Server Components by default — 'use client' only when needed",
    "Zustand stores with localStorage for offline persistence",
    "Auto-refresh intervals tuned per data source (5min to 24hr)",
    "React Leaflet with dynamic import + ssr: false",
]
patterns_right = [
    "API routes proxy external calls (no CORS, key protection)",
    "Promise.allSettled for fault-tolerant data gathering",
    "Streaming response for AI briefing generation",
    "25 curated locations across 6 federal agencies",
]

for i, p in enumerate(patterns_left):
    top = Inches(3.9) + Inches(0.45) * i
    add_text(slide, f"\u2022  {p}", Inches(1.2), top, Inches(5.5), Inches(0.4),
             font_size=14, color=MEDIUM_TEXT)

for i, p in enumerate(patterns_right):
    top = Inches(3.9) + Inches(0.45) * i
    add_text(slide, f"\u2022  {p}", Inches(7), top, Inches(5.5), Inches(0.4),
             font_size=14, color=MEDIUM_TEXT)

# Briefing pipeline
add_shape(slide, Inches(1), Inches(5.9), Inches(11.3), Inches(1.2), NAVY)
add_text(slide, "AI Briefing Pipeline", Inches(1.3), Inches(6.0),
         Inches(3), Inches(0.35), font_size=16, color=ACCENT_BLUE, bold=True)
add_text(slide, (
    "Weather + Seismic + Fire + Crime + Astronomy  \u2192  Promise.allSettled  "
    "\u2192  Structured prompt  \u2192  Claude claude-sonnet-4-20250514  \u2192  "
    "Streamed 5-section briefing"
), Inches(1.3), Inches(6.4), Inches(10.8), Inches(0.5),
    font_size=14, color=SUBTLE_TEXT)


# ============================================================
# SLIDE 10: Connect to STS
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, WHITE)
add_shape(slide, Inches(0), Inches(0), W, Inches(0.06), ACCENT_BLUE)

add_text(slide, "Same Pattern, Your Mission", Inches(1), Inches(0.6),
         Inches(11), Inches(0.7), font_size=36, color=NAVY, bold=True)

add_text(slide, (
    "TRAILHEAD uses the same agentic AI pattern STS is already building:"
), Inches(1), Inches(1.4), Inches(11), Inches(0.5),
    font_size=18, color=MEDIUM_TEXT)

# Pattern comparison
add_text(slide, "Gather structured data  \u2192  Apply AI reasoning  \u2192  Produce actionable output",
         Inches(1.5), Inches(2.1), Inches(10.3), Inches(0.5),
         font_size=22, color=ACCENT_BLUE, bold=True, alignment=PP_ALIGN.CENTER)

# Comparison cards
products = [
    ("TRAILHEAD", "6 public APIs \u2192 Claude \u2192 operational briefing",
     "Built in one afternoon with Claude Code"),
    ("C-CAT", "CJIS policy documents \u2192 AI review \u2192 compliance report",
     "50+ minute manual reviews \u2192 under 4 minutes"),
    ("LEI", "Incident data \u2192 agentic AI \u2192 compliance notifications",
     "Automated officer compliance reporting"),
]

for i, (name, desc, note) in enumerate(products):
    left = Inches(0.8) + Inches(4.1) * i
    card_color = NAVY if i == 0 else LIGHT_GRAY
    text_color = WHITE if i == 0 else DARK_TEXT
    note_color = ACCENT_BLUE if i == 0 else MEDIUM_TEXT
    add_shape(slide, left, Inches(3.0), Inches(3.7), Inches(2.2), card_color)
    add_text(slide, name, left + Inches(0.3), Inches(3.2),
             Inches(3.1), Inches(0.5), font_size=24, color=text_color if i == 0 else NAVY, bold=True)
    add_text(slide, desc, left + Inches(0.3), Inches(3.8),
             Inches(3.1), Inches(0.8), font_size=14, color=text_color if i == 0 else MEDIUM_TEXT)
    add_text(slide, note, left + Inches(0.3), Inches(4.6),
             Inches(3.1), Inches(0.4), font_size=12, color=note_color, bold=True)

# Key message
add_shape(slide, Inches(1), Inches(5.7), Inches(11.3), Inches(1.2), LIGHT_GRAY)
add_text(slide, (
    "Claude Code doesn't replace your engineers. It lets them build the first "
    "working version in a day instead of a sprint."
), Inches(1.5), Inches(5.85), Inches(10.3), Inches(0.7),
    font_size=20, color=NAVY, bold=True, alignment=PP_ALIGN.CENTER)

add_text(slide, (
    "Your DEAM practice already integrates disparate data sources. "
    "Your engineers already understand agentic patterns.\n"
    "Claude Code accelerates the path from idea to working prototype."
), Inches(1.5), Inches(6.45), Inches(10.3), Inches(0.5),
    font_size=14, color=MEDIUM_TEXT, alignment=PP_ALIGN.CENTER)


# ============================================================
# SLIDE 11: What's Next
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, WHITE)
add_shape(slide, Inches(0), Inches(0), W, Inches(0.06), ACCENT_BLUE)

add_text(slide, "What Could Come Next", Inches(1), Inches(0.6),
         Inches(11), Inches(0.7), font_size=36, color=NAVY, bold=True)

add_text(slide, (
    "Imagine TRAILHEAD connected to real operational data:"
), Inches(1), Inches(1.4), Inches(11), Inches(0.5),
    font_size=18, color=MEDIUM_TEXT)

next_items = [
    ("LERMS incident data", "The briefing includes overnight incidents, arrests, and citations from the officer's jurisdiction"),
    ("CAD dispatch feed", "Real-time call volume and active incidents layered onto the map"),
    ("CJIS-compliant sources", "Secure access to criminal history and warrant data within the briefing"),
    ("Officer shift data", "Personalized briefings based on assignment area, role, and shift timing"),
    ("Multi-agency coordination", "Cross-bureau situational awareness for joint operations"),
]

for i, (title, desc) in enumerate(next_items):
    top = Inches(2.2) + Inches(0.85) * i
    add_shape(slide, Inches(1.2), top, Inches(0.06), Inches(0.65), ACCENT_BLUE)
    add_text(slide, title, Inches(1.5), top, Inches(3.5), Inches(0.35),
             font_size=17, color=NAVY, bold=True)
    add_text(slide, desc, Inches(1.5), top + Inches(0.32), Inches(10), Inches(0.35),
             font_size=14, color=MEDIUM_TEXT)

# Bottom quote
add_shape(slide, Inches(1), Inches(6.2), Inches(11.3), Inches(0.8), NAVY)
add_text(slide, (
    '"That\'s a product conversation, not a technology barrier."'
), Inches(1), Inches(6.3), Inches(11.3), Inches(0.6),
    font_size=22, color=WHITE, bold=True, alignment=PP_ALIGN.CENTER)


# ============================================================
# SLIDE 12: Key Takeaways
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, WHITE)
add_shape(slide, Inches(0), Inches(0), W, Inches(0.06), ACCENT_BLUE)

add_text(slide, "Key Takeaways", Inches(1), Inches(0.6), Inches(11), Inches(0.7),
         font_size=36, color=NAVY, bold=True)

takeaways = [
    ("Claude Code builds real applications",
     "Not mockups — production-grade code with proper architecture, error handling, and deployment"),
    ("Prompt engineering is the new project management",
     "Clear specs, sequential prompts, and verification gates produce reliable results"),
    ("AI accelerates the 0-to-80% dramatically",
     "Infrastructure, boilerplate, API integrations, and UI come together in hours"),
    ("The last 20% still needs a human",
     "API quirks, debugging, deployment config — real-world integration requires human judgment"),
    ("The pattern scales to your mission",
     "Same approach works for any \"gather data + apply AI reasoning + produce output\" workflow"),
]

for i, (title, desc) in enumerate(takeaways):
    top = Inches(1.6) + Inches(1.05) * i
    # Number circle
    circle = slide.shapes.add_shape(MSO_SHAPE.OVAL, Inches(1.2), top + Inches(0.05),
                                     Inches(0.5), Inches(0.5))
    circle.fill.solid()
    circle.fill.fore_color.rgb = ACCENT_BLUE
    circle.line.fill.background()
    add_text(slide, str(i + 1), Inches(1.2), top + Inches(0.05), Inches(0.5), Inches(0.5),
             font_size=18, color=WHITE, bold=True, alignment=PP_ALIGN.CENTER)
    # Text
    add_text(slide, title, Inches(2.0), top, Inches(9.5), Inches(0.4),
             font_size=18, color=NAVY, bold=True)
    add_text(slide, desc, Inches(2.0), top + Inches(0.4), Inches(9.5), Inches(0.4),
             font_size=14, color=MEDIUM_TEXT)


# ============================================================
# SLIDE 13: Q&A
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, NAVY)
add_shape(slide, Inches(0), Inches(0), W, Inches(0.06), ACCENT_BLUE)

add_text(slide, "Questions?", Inches(1), Inches(2.2), Inches(11.3), Inches(1),
         font_size=52, color=WHITE, bold=True, alignment=PP_ALIGN.CENTER)

add_shape(slide, Inches(5.5), Inches(3.5), Inches(2.3), Inches(0.04), ACCENT_BLUE)

add_text(slide, "App:  trailhead-pearl.vercel.app",
         Inches(1), Inches(4.0), Inches(11.3), Inches(0.5),
         font_size=18, color=SUBTLE_TEXT, alignment=PP_ALIGN.CENTER)
add_text(slide, "Repo:  github.com/keepitsts/claude-ai-brown-bag",
         Inches(1), Inches(4.5), Inches(11.3), Inches(0.5),
         font_size=18, color=SUBTLE_TEXT, alignment=PP_ALIGN.CENTER)
add_text(slide, "Every prompt is in the repo  —  the entire process is transparent",
         Inches(1), Inches(5.3), Inches(11.3), Inches(0.5),
         font_size=16, color=SUBTLE_TEXT, alignment=PP_ALIGN.CENTER)


# ============================================================
# Save
# ============================================================
output_path = "/home/rczauel/claude-ai-brown-bag/presentation/claude-code-brown-bag.pptx"
prs.save(output_path)
print(f"Saved to {output_path}")
