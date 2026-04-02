#!/usr/bin/env python3
"""
Fetch Claude Code documentation from code.claude.com and save locally
for AI agent reference.

Docs moved to https://code.claude.com/docs/en/*.md in early 2026.
"""

import argparse
import re
import shutil
import urllib.request
from pathlib import Path


def fetch_url(url: str) -> str:
    """Fetch URL content with proper headers."""
    headers = {
        "User-Agent": "Mozilla/5.0 (compatible; ClaudeCodeDocsFetcher/1.0)"
    }
    request = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(request) as response:
        return response.read().decode("utf-8")


def main():
    parser = argparse.ArgumentParser(
        description="Fetch Claude Code documentation from code.claude.com"
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=None,
        help="Output directory (default: ai-docs/claude-code relative to repo root)",
    )
    args = parser.parse_args()

    base_url = "https://code.claude.com/docs"
    llms_txt_url = f"{base_url}/llms.txt"
    repo_root = Path(__file__).parent.parent.parent
    output_dir = args.output_dir or (repo_root / "ai-docs" / "claude-code")

    # Clear output directory if it exists
    if output_dir.exists():
        print(f"Clearing {output_dir}")
        shutil.rmtree(output_dir)

    # Create output directory
    output_dir.mkdir(parents=True, exist_ok=True)

    # Fetch llms.txt
    print(f"Fetching {llms_txt_url}")
    llms_content = fetch_url(llms_txt_url)

    # Save llms.txt
    llms_path = output_dir / "llms.txt"
    llms_path.write_text(llms_content)
    print(f"Saved {llms_path}")

    # Extract all .md URLs from the content (supports /docs/en/*.md and /docs/*.md)
    md_urls = re.findall(r"https://code\.claude\.com/docs/(?:en/)?[^\s\)]+\.md", llms_content)

    # Remove duplicates while preserving order
    md_urls = list(dict.fromkeys(md_urls))

    print(f"Found {len(md_urls)} markdown files to download")

    # Download each markdown file
    for url in md_urls:
        filename = url.split("/")[-1]
        filepath = output_dir / filename

        print(f"Downloading {filename}...", end=" ")
        try:
            content = fetch_url(url)
            filepath.write_text(content)
            print("done")
        except Exception as e:
            print(f"failed: {e}")

    print(f"\nCompleted. Files saved to {output_dir}")


if __name__ == "__main__":
    main()
