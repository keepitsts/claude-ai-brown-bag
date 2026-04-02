# Claude AI Brown Bag

In this repo we will be creating an example application that demonstrates what can be done using claude code.  All actions taken by the human (that's me, Rudy Zauel) will be recorded in the directory structure in markdown files in an organized manner.  All actions on this repo will be performed by claude code.  You need to record these actions and store all my prompts.  It maybe several hundred prompts that I give.

I have a 1 hour brown bag meeting on Friday 4/3/2026 at Noon ET where I will go over all that we have accomplished in front of the entire company.  Right now we have 23 accepted and 1 tentative.  I want to share this git repo with the attendees and go through the commits and verbally (over a teams video meeting) explain what prompts I gave to create this repo.  

When I give you a prompt record that prompt in a markdown file in the organized directory structure that you're using to record our interactions.  

When you're finished and about to respond don't respond in the claude code window, put the response in the response.md.  Create a hook and a memory/claude.md that makes this happen.

## Instructions

1. Initialize Claude Code in this Repo
   - CLAUDE.md, .claude, etc...
2. Create github repo
3. Design and implement a system for capturing the prompts given to claude so we can sequence them in the demo
4. Download the latest claude code docs
5. capture the actions/research taken so far for explanation in the demo.

## Github

create this repo in https://github.com/keepitsts and give everyone in the organization (keepitsts) read access to it.

## Actions Taken

Before this prompt was given this is the actions taken that should be recorded as a human action:

```bash
mkdir claude-ai-brown-bag
cd claude-ai-brown-bag
claude
```

```claude code bash
! code .
execute prompt: ai-brown-bag.md
```

## Research

For researching the web I like to make standalone prompt in markdown and copy-paste them into a claude.ai/chat using Opus 4.6 Extended with Research and Web Search checked then store the result .md file in this project.

### Research: Simple Technology Solutions: a pre-presentation briefing

`write a summary about this company, Simple Technology Solutions Inc., I'm presenting a brown bag to the company and want to have context about the people I'll be presenting to.  https://www.simpletechnology.io/`

result:
research/simple-technology-solutions-a-pre-presentation-briefing-on-federal-it-and-ai-capabilities.md


### Research: 100 Free API's and Datasets Every Developer Should Know

`find or create a list of 100 or so of the best open api's or datasets that can be used to create an example application that I will build using claude code to demonstrate the power of claude code.`

result:
research/100-free-apis-and-datasets-every-developer-should-know.md

### Research: STS Demo Spec -- Federal Lands Daily Briefing Tool

```markdown
I want to create an example web application using claude code that I present in a brown bag to STS.  This application should match the complexity of what claude code can do in 12 hours of human time (the amount of time I have to prepare for the brown bag).  **make an opinionated choice about what this application should do**
- Consider the company being presented to using this briefing:
  - simple-technology-solutions-a-pre-presentation-briefing-on-federal-it-and-ai-capabilities.md
- consider the list of free apis and datasets:
  - 100-free-apis-and-datasets-every-developer-should-know.md
- be technology agnostic 
  - only focus on features 
  - do not include any implementation details
- write the specifications in markdown
```

result:
research/sts-demo-spec.md

### Research: TRAILHEAD — Tech Stack Decision Record

```markdown
I want to use react and spec driven development to build out this demo application **make an opinionated choice about what tech stack should be**
- consider the functionality being requested to build
  - sts-demo-spec.md
```

result:
research/trailhead-tech-stack.md

## Latest Claude Code Docs

I like to have the latest version of claude code docs in this repo to use as a resource for agentic engineering
- From this repo https://github.com/keepitsts/sts-hud-smart2 copy these files:
  - tools/ai-docs/fetch_claude_code_docs.py
  - ai-docs/README.md
- run the script and update the README.md with any changes

