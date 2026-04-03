#!/usr/bin/env python3
"""Generate the brown bag presentation from markdown slides using STS template."""

import re
import os
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from io import BytesIO
from copy import deepcopy
from lxml import etree

# ── Paths ──────────────────────────────────────────────────────
TEMPLATE = "presentation/STS Deck Template 01.16.24.pptx"
OUTPUT = "presentation/claude-code-brown-bag.pptx"
BANNER = "presentation/claude-code-brown-bag-banner.png"
SLIDES_DIR = "presentation/slides"

# ── Colors ─────────────────────────────────────────────────────
MAROON = RGBColor(0x70, 0x11, 0x0C)        # accent bar from template
DARK_MAROON = RGBColor(0x5A, 0x0E, 0x0A)   # darker shade for act dividers
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
OFF_WHITE = RGBColor(0xF8, 0xF8, 0xF8)
DARK = RGBColor(0x2D, 0x2D, 0x2D)
TITLE_COLOR = RGBColor(0x1A, 0x1A, 0x2E)   # dark navy for titles
BODY_COLOR = RGBColor(0x33, 0x33, 0x33)     # dark gray for body
SUBTITLE_COLOR = RGBColor(0x66, 0x66, 0x66) # medium gray for subtitles
LIGHT_BG = RGBColor(0xF0, 0xF0, 0xF0)      # light bg for act dividers
ACT_NUM_COLOR = RGBColor(0x99, 0x99, 0x99)  # muted for act numbers

FOOTER_TEXT = "\u00a9 Simple Technology Solutions, Inc. "

# ── Slide file order ───────────────────────────────────────────
SLIDE_ORDER = [
    # Title
    ("title", f"{SLIDES_DIR}/title-slide.md"),
    # Act 1
    ("act-divider", "ACT 1", "Agentic Concepts",
     "What is this stuff and why should I care?"),
    ("slide", f"{SLIDES_DIR}/act-1-agentic-concepts/01-what-is-a-model.md"),
    ("slide", f"{SLIDES_DIR}/act-1-agentic-concepts/02-how-does-a-model-know-things.md"),
    ("slide", f"{SLIDES_DIR}/act-1-agentic-concepts/03-what-are-the-differences-between-the-claude-models.md"),
    ("slide", f"{SLIDES_DIR}/act-1-agentic-concepts/04-what-is-a-token.md"),
    ("slide", f"{SLIDES_DIR}/act-1-agentic-concepts/05-why-do-we-have-to-be-token-efficient.md"),
    ("slide", f"{SLIDES_DIR}/act-1-agentic-concepts/06-what-is-an-agent.md"),
    ("slide", f"{SLIDES_DIR}/act-1-agentic-concepts/07-what-is-the-context-window.md"),
    ("slide", f"{SLIDES_DIR}/act-1-agentic-concepts/08-why-do-we-use-markdown.md"),
    ("slide", f"{SLIDES_DIR}/act-1-agentic-concepts/09-what-is-a-markdown-refinement-chain.md"),
    # Act 2
    ("act-divider", "ACT 2", "How I Built a Demo App",
     "Watch the concepts in action \u2014 here\u2019s what it actually looks like."),
    ("slide", f"{SLIDES_DIR}/act-2-how-i-built-a-demo-app/01-md-refinement-sts-audience.md"),
    ("slide", f"{SLIDES_DIR}/act-2-how-i-built-a-demo-app/02-md-refinement-open-datasets.md"),
    ("slide", f"{SLIDES_DIR}/act-2-how-i-built-a-demo-app/03-md-refinement-app-spec.md"),
    ("slide", f"{SLIDES_DIR}/act-2-how-i-built-a-demo-app/04-md-refinement-tech-stack.md"),
    ("slide", f"{SLIDES_DIR}/act-2-how-i-built-a-demo-app/05-repo-setup.md"),
    ("slide", f"{SLIDES_DIR}/act-2-how-i-built-a-demo-app/06-md-refinement-building-autonomously.md"),
    ("slide", f"{SLIDES_DIR}/act-2-how-i-built-a-demo-app/07-build.md"),
    ("slide", f"{SLIDES_DIR}/act-2-how-i-built-a-demo-app/08-debug.md"),
    ("slide", f"{SLIDES_DIR}/act-2-how-i-built-a-demo-app/09-deploy.md"),
    # Act 3
    ("act-divider", "ACT 3", "How to Improve Your Agentic Techniques",
     "Now go do it \u2014 here\u2019s how to get better starting Monday."),
    ("slide", f"{SLIDES_DIR}/act-3-how-to-improve-your-agentic-techniques/01-stop-coding.md"),
    ("slide", f"{SLIDES_DIR}/act-3-how-to-improve-your-agentic-techniques/02-adopt-your-agents-perspective.md"),
    ("slide", f"{SLIDES_DIR}/act-3-how-to-improve-your-agentic-techniques/03-documentation-progressive-disclosure.md"),
    ("slide", f"{SLIDES_DIR}/act-3-how-to-improve-your-agentic-techniques/04-spec-plan-driven-development.md"),
    ("slide", f"{SLIDES_DIR}/act-3-how-to-improve-your-agentic-techniques/05-structure-your-code.md"),
    ("slide", f"{SLIDES_DIR}/act-3-how-to-improve-your-agentic-techniques/06-research-best-practices-for-your-codebase.md"),
    ("slide", f"{SLIDES_DIR}/act-3-how-to-improve-your-agentic-techniques/07-capture-tech-debt-refactor-often.md"),
    ("slide", f"{SLIDES_DIR}/act-3-how-to-improve-your-agentic-techniques/08-get-out-of-the-loop.md"),
    ("slide", f"{SLIDES_DIR}/act-3-how-to-improve-your-agentic-techniques/09-use-standard-out.md"),
    ("slide", f"{SLIDES_DIR}/act-3-how-to-improve-your-agentic-techniques/10-feedback-loops.md"),
    ("slide", f"{SLIDES_DIR}/act-3-how-to-improve-your-agentic-techniques/11-sdlc-workflows.md"),
    # Conclusion
    ("slide", f"{SLIDES_DIR}/conclusion.md"),
]


# ── Markdown parser ────────────────────────────────────────────

def parse_slide_md(filepath):
    """Parse a slide markdown file into title, bullets, and notes."""
    with open(filepath, "r") as f:
        content = f.read()

    # Split on the horizontal rule between Slide and Notes
    parts = re.split(r"\n---\n", content, maxsplit=1)
    slide_section = parts[0]
    notes_section = parts[1] if len(parts) > 1 else ""

    # Extract title from **Title:** line
    title_match = re.search(r"\*\*Title:\*\*\s*(.+)", slide_section)
    if title_match:
        title = title_match.group(1).strip()
    else:
        # Fallback: use the H1
        h1_match = re.search(r"^#\s+(.+)", slide_section, re.MULTILINE)
        title = h1_match.group(1).strip() if h1_match else "Untitled"

    # Extract bullets (lines starting with - after the **Title:** line)
    bullets = []
    in_bullets = False
    for line in slide_section.split("\n"):
        if "**Title:**" in line:
            in_bullets = True
            continue
        if not in_bullets:
            continue
        # Match bullet lines
        bullet_match = re.match(r"^(\s*)[-\u2022]\s+(.+)", line)
        if bullet_match:
            indent = len(bullet_match.group(1))
            text = bullet_match.group(2).strip()
            level = 1 if indent >= 2 else 0
            bullets.append((level, text))

    # Extract notes (everything in the Notes section)
    notes_text = ""
    if notes_section:
        # Remove the ## Notes header
        notes_clean = re.sub(r"^##\s+Notes\s*\n?", "", notes_section.strip())
        notes_text = notes_clean.strip()

    return title, bullets, notes_text


def strip_markdown(text):
    """Strip markdown bold/italic markers for plain text."""
    text = re.sub(r"\*\*(.+?)\*\*", r"\1", text)
    text = re.sub(r"\*(.+?)\*", r"\1", text)
    text = re.sub(r"`(.+?)`", r"\1", text)
    return text


def add_formatted_run(paragraph, text, font_size, color, bold=False, font_name="Calibri"):
    """Add a run with formatting to a paragraph."""
    run = paragraph.add_run()
    run.text = text
    run.font.size = Pt(font_size)
    run.font.color.rgb = color
    run.font.bold = bold
    run.font.name = font_name
    return run


def add_rich_text_paragraph(tf, text, font_size, default_color, level=0,
                            is_first=False, font_name="Calibri"):
    """Add a paragraph with bold/code formatting from markdown."""
    if is_first:
        p = tf.paragraphs[0]
    else:
        p = tf.add_paragraph()

    p.level = level
    p.space_after = Pt(4)
    p.space_before = Pt(2)

    # Parse **bold** and `code` segments
    segments = re.split(r"(\*\*.*?\*\*|`.*?`)", text)
    for seg in segments:
        if not seg:
            continue
        run = p.add_run()
        run.font.size = Pt(font_size)
        run.font.color.rgb = default_color
        run.font.name = font_name

        if seg.startswith("**") and seg.endswith("**"):
            run.text = seg[2:-2]
            run.font.bold = True
        elif seg.startswith("`") and seg.endswith("`"):
            run.text = seg[1:-1]
            run.font.name = "Consolas"
            run.font.size = Pt(font_size - 1)
        else:
            run.text = seg

    return p


# ── Slide builders ─────────────────────────────────────────────

def delete_all_slides(prs):
    """Remove all existing slides from the presentation."""
    while len(prs.slides) > 0:
        rId = prs.slides._sldIdLst[0].get(
            "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id"
        )
        if rId is None:
            # Try the 'id' attribute directly
            xml = prs.slides._sldIdLst[0]
            rId_attr = None
            for attr_name in xml.attrib:
                if attr_name.endswith('}id') or attr_name == 'r:id':
                    rId_attr = xml.attrib[attr_name]
                    break
            if rId_attr:
                rId = rId_attr
        prs.part.drop_rel(rId)
        prs.slides._sldIdLst.remove(prs.slides._sldIdLst[0])


def add_accent_bar(slide, top=Inches(1.05)):
    """Add the STS maroon accent bar across the full width."""
    bar = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE, Inches(0), top,
        Inches(13.333), Inches(0.05)
    )
    bar.fill.solid()
    bar.fill.fore_color.rgb = MAROON
    bar.line.fill.background()
    return bar


def add_logo(slide, prs_obj, logo_blob, position="top"):
    """Add the STS logo to the slide."""
    from io import BytesIO
    logo_stream = BytesIO(logo_blob)
    if position == "top":
        pic = slide.shapes.add_picture(
            logo_stream, Inches(-0.004), Inches(0.004),
            Inches(1.798), Inches(1.791)
        )
    else:  # bottom
        pic = slide.shapes.add_picture(
            logo_stream, Inches(0), Inches(5.709),
            Inches(1.798), Inches(1.791)
        )
    return pic


def add_footer(slide, slide_num):
    """Add footer text and slide number."""
    # Footer
    tb = slide.shapes.add_textbox(
        Inches(0.34), Inches(7.12), Inches(5.0), Inches(0.19)
    )
    tb.text_frame.word_wrap = True
    p = tb.text_frame.paragraphs[0]
    run = p.add_run()
    run.text = FOOTER_TEXT
    run.font.size = Pt(8)
    run.font.color.rgb = SUBTITLE_COLOR
    run.font.name = "Calibri"

    # Slide number
    tb2 = slide.shapes.add_textbox(
        Inches(11.65), Inches(7.12), Inches(1.34), Inches(0.19)
    )
    p2 = tb2.text_frame.paragraphs[0]
    p2.alignment = PP_ALIGN.RIGHT
    run2 = p2.add_run()
    run2.text = str(slide_num)
    run2.font.size = Pt(8)
    run2.font.color.rgb = SUBTITLE_COLOR
    run2.font.name = "Calibri"


def set_notes(slide, notes_text):
    """Set speaker notes on a slide."""
    if not notes_text:
        return
    notes_slide = slide.notes_slide
    tf = notes_slide.notes_text_frame
    # Clear existing
    tf.clear()
    # Add plain text notes (strip markdown for readability)
    plain = strip_markdown(notes_text)
    # Limit to reasonable length, preserving structure
    p = tf.paragraphs[0]
    p.text = plain


def build_title_slide(prs, logo_blob):
    """Create the title slide with the banner image."""
    layout = prs.slide_layouts[7]  # Blank
    slide = prs.slides.add_slide(layout)

    # Add banner image full bleed
    slide.shapes.add_picture(
        BANNER, Inches(0), Inches(0),
        Inches(13.333), Inches(7.5)
    )

    # Add speaker notes
    notes = (
        "STS Brown Bag Series\n"
        "Enterprise Claude Code: AI-Powered Development for the Federal Mission\n"
        "Friday, April 3, 2026 | 12:00 - 1:00 PM ET\n\n"
        "Presenters:\n"
        "- Rudy Zauel, Sr. Software Developer\n"
        "- Eric Chasin, Sr. Principal Architect\n\n"
        "Audience: ~24 STS software engineers"
    )
    set_notes(slide, notes)
    return slide


def build_act_divider(prs, logo_blob, act_label, act_title, act_subtitle, slide_num):
    """Create an act divider slide."""
    layout = prs.slide_layouts[7]  # Blank
    slide = prs.slides.add_slide(layout)

    # Dark background
    bg = slide.background.fill
    bg.solid()
    bg.fore_color.rgb = RGBColor(0x1A, 0x1A, 0x2E)

    # Accent bar at top
    bar = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE, Inches(0), Inches(0),
        Inches(13.333), Inches(0.06)
    )
    bar.fill.solid()
    bar.fill.fore_color.rgb = MAROON
    bar.line.fill.background()

    # Act label (e.g., "ACT 1")
    tb = slide.shapes.add_textbox(
        Inches(1.5), Inches(2.0), Inches(10), Inches(0.8)
    )
    p = tb.text_frame.paragraphs[0]
    run = p.add_run()
    run.text = act_label
    run.font.size = Pt(24)
    run.font.color.rgb = RGBColor(0x99, 0x99, 0x99)
    run.font.name = "Calibri"
    run.font.bold = True

    # Act title
    tb2 = slide.shapes.add_textbox(
        Inches(1.5), Inches(2.8), Inches(10), Inches(1.5)
    )
    p2 = tb2.text_frame.paragraphs[0]
    run2 = p2.add_run()
    run2.text = act_title
    run2.font.size = Pt(44)
    run2.font.color.rgb = WHITE
    run2.font.name = "Calibri"
    run2.font.bold = True

    # Divider line
    line = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE, Inches(1.5), Inches(4.5),
        Inches(3.0), Inches(0.04)
    )
    line.fill.solid()
    line.fill.fore_color.rgb = MAROON
    line.line.fill.background()

    # Subtitle
    tb3 = slide.shapes.add_textbox(
        Inches(1.5), Inches(4.9), Inches(10), Inches(0.8)
    )
    tb3.text_frame.word_wrap = True
    p3 = tb3.text_frame.paragraphs[0]
    run3 = p3.add_run()
    run3.text = act_subtitle
    run3.font.size = Pt(20)
    run3.font.color.rgb = RGBColor(0xBB, 0xBB, 0xBB)
    run3.font.name = "Calibri"

    # Footer
    tb_f = slide.shapes.add_textbox(
        Inches(0.34), Inches(7.12), Inches(5.0), Inches(0.19)
    )
    p_f = tb_f.text_frame.paragraphs[0]
    run_f = p_f.add_run()
    run_f.text = FOOTER_TEXT
    run_f.font.size = Pt(8)
    run_f.font.color.rgb = RGBColor(0x88, 0x88, 0x88)
    run_f.font.name = "Calibri"

    return slide


def build_content_slide(prs, logo_blob, title, bullets, notes_text, slide_num):
    """Create a content slide with title, bullets, and notes."""
    layout = prs.slide_layouts[7]  # Blank
    slide = prs.slides.add_slide(layout)

    # Logo at top-left
    add_logo(slide, prs, logo_blob, "top")

    # Accent bar
    add_accent_bar(slide, Inches(1.05))

    # Title
    tb_title = slide.shapes.add_textbox(
        Inches(2.0), Inches(0.25), Inches(10.8), Inches(0.75)
    )
    tb_title.text_frame.word_wrap = True
    p_title = tb_title.text_frame.paragraphs[0]
    p_title.alignment = PP_ALIGN.LEFT
    run_title = p_title.add_run()
    run_title.text = strip_markdown(title)
    run_title.font.size = Pt(32)
    run_title.font.color.rgb = TITLE_COLOR
    run_title.font.bold = True
    run_title.font.name = "Calibri"

    # Bullets
    if bullets:
        tb_body = slide.shapes.add_textbox(
            Inches(2.2), Inches(1.4), Inches(10.5), Inches(5.3)
        )
        tf = tb_body.text_frame
        tf.word_wrap = True

        for i, (level, text) in enumerate(bullets):
            add_rich_text_paragraph(
                tf, text,
                font_size=18 if level == 0 else 16,
                default_color=BODY_COLOR if level == 0 else SUBTITLE_COLOR,
                level=level,
                is_first=(i == 0),
            )

    # Footer and slide number
    add_footer(slide, slide_num)

    # Speaker notes
    set_notes(slide, notes_text)

    return slide


# ── Main ───────────────────────────────────────────────────────

def main():
    # Load template (preserves theme, fonts, masters)
    prs = Presentation(TEMPLATE)

    # Extract STS logo from template before deleting slides
    logo_blob = None
    for slide in prs.slides:
        for shape in slide.shapes:
            if shape.name == "Graphic 4" and hasattr(shape, "image"):
                logo_blob = shape.image.blob
                break
        if logo_blob:
            break

    # Delete all template slides
    delete_all_slides(prs)

    slide_num = 1
    for entry in SLIDE_ORDER:
        kind = entry[0]

        if kind == "title":
            filepath = entry[1]
            print(f"  [{slide_num}] Title slide")
            build_title_slide(prs, logo_blob)
            slide_num += 1

        elif kind == "act-divider":
            _, act_label, act_title, act_subtitle = entry
            print(f"  [{slide_num}] {act_label}: {act_title}")
            build_act_divider(prs, logo_blob, act_label, act_title,
                              act_subtitle, slide_num)
            slide_num += 1

        elif kind == "slide":
            filepath = entry[1]
            if not os.path.exists(filepath):
                print(f"  [SKIP] {filepath} not found")
                continue
            title, bullets, notes = parse_slide_md(filepath)
            print(f"  [{slide_num}] {title}")
            build_content_slide(prs, logo_blob, title, bullets, notes,
                                slide_num)
            slide_num += 1

    prs.save(OUTPUT)
    print(f"\nSaved: {OUTPUT} ({slide_num - 1} slides)")


if __name__ == "__main__":
    main()
