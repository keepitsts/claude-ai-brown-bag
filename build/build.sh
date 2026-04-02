#!/bin/bash
set -euo pipefail

# TRAILHEAD Build Pipeline
# Sequential headless Claude Code calls with verification gates
# Usage: cd claude-ai-brown-bag && bash build/build.sh

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PROJECT_DIR="$REPO_DIR/trailhead"
PROMPT_DIR="$REPO_DIR/build/prompts"
LOG_DIR="$REPO_DIR/build/logs"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

mkdir -p "$LOG_DIR"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log() { echo -e "${BLUE}[$(date +%H:%M:%S)]${NC} $1"; }
success() { echo -e "${GREEN}✓${NC} $1"; }
warn() { echo -e "${YELLOW}⚠${NC} $1"; }
fail() { echo -e "${RED}✗${NC} $1"; }

verify() {
  log "Running verification..."
  cd "$PROJECT_DIR"

  # TypeScript check
  if ! npx tsc --noEmit 2>&1 | tee "$LOG_DIR/tsc-$1.log"; then
    fail "TypeScript check failed for $1"
    return 1
  fi

  # Build check
  if ! pnpm build 2>&1 | tee "$LOG_DIR/build-$1.log"; then
    fail "Build failed for $1"
    return 1
  fi

  success "Verification passed for $1"
}

build_step() {
  local step_num="$1"
  local step_name="$2"
  local prompt_file="$3"

  echo ""
  echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
  log "Step $step_num: $step_name"
  echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"

  local prompt
  prompt=$(cat "$prompt_file")

  # Run Claude Code headless
  cd "$PROJECT_DIR"
  log "Running claude -p (headless)..."

  if claude -p "$prompt" \
    --allowedTools "Read,Write,Edit,Bash,Glob,Grep" \
    --append-system-prompt "You are working in the trailhead/ directory. After completing all changes, run 'npx tsc --noEmit' to verify TypeScript compiles. Fix any errors before finishing. Implement ONLY what is specified. Do not add extra features." \
    2>&1 | tee "$LOG_DIR/claude-${step_num}-${step_name}.log"; then
    success "Claude completed step: $step_name"
  else
    fail "Claude failed on step: $step_name"
    warn "Check log: $LOG_DIR/claude-${step_num}-${step_name}.log"
    warn "Fix manually and re-run, or press Enter to continue anyway"
    read -r
  fi

  # Verify
  if verify "$step_num-$step_name"; then
    # Commit on success
    cd "$REPO_DIR"
    git add -A
    git commit -m "$(cat <<EOF
feat($step_name): build step $step_num complete

Automated build via headless pipeline.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
    success "Committed: feat($step_name)"
  else
    fail "Verification failed for $step_name"
    warn "Fix the errors, then press Enter to retry verification, or Ctrl+C to abort"
    read -r
    verify "$step_num-$step_name-retry" || {
      fail "Retry failed. Committing as-is for manual fix."
      cd "$REPO_DIR"
      git add -A
      git commit -m "wip($step_name): needs manual fix

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
    }
  fi
}

# ═══════════════════════════════════════════════════════════
# PIPELINE START
# ═══════════════════════════════════════════════════════════

echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║        TRAILHEAD Build Pipeline — Starting           ║${NC}"
echo -e "${GREEN}║        $(date)           ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════════╝${NC}"
echo ""

# Ensure trailhead directory exists
mkdir -p "$PROJECT_DIR"

# Phase 1: Foundation
build_step "00" "scaffold"      "$PROMPT_DIR/00-scaffold.md"
build_step "01" "shared-infra"  "$PROMPT_DIR/01-shared-infra.md"
build_step "02" "base-layout"   "$PROMPT_DIR/02-base-layout.md"

# Phase 2: Features (sequential, each with fresh context)
build_step "03" "weather"       "$PROMPT_DIR/03-weather.md"
build_step "04" "seismic"       "$PROMPT_DIR/04-seismic.md"
build_step "05" "fires"         "$PROMPT_DIR/05-fires.md"
build_step "06" "crime"         "$PROMPT_DIR/06-crime.md"
build_step "07" "astronomy"     "$PROMPT_DIR/07-astronomy.md"
build_step "08" "map"           "$PROMPT_DIR/08-map.md"

# Phase 3: AI + Integration
build_step "09" "briefing"      "$PROMPT_DIR/09-briefing.md"
build_step "10" "integration"   "$PROMPT_DIR/10-integration.md"

echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║        TRAILHEAD Build Pipeline — COMPLETE           ║${NC}"
echo -e "${GREEN}║        $(date)           ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════════╝${NC}"
echo ""

log "Build logs saved to: $LOG_DIR/"
log "Run 'cd trailhead && pnpm dev' to start the app"
log "Run 'git log --oneline' to see the build history"
