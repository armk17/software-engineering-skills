---
name: software-engineering-skills
description: "Multi-agent engineering pipeline: REFINE, PLAN, BUILD, TEST, REVIEW. Orchestrates end-to-end feature development with TDD, incremental builds, and code health analysis. Language-agnostic."
---

# Software Engineering Skills

Multi-agent pipeline for end-to-end feature development.

## Install

```
npx @anthropic-ai/claude-code skill add software-engineering-skills
```

## Usage

Run the full pipeline:

```
/swe:pipeline <feature description or ticket reference>
```

## Pipeline

```
REFINE → PLAN → BUILD → TEST → REVIEW
```

| Stage | Agent | Purpose |
|-------|-------|---------|
| REFINE | `refiner` | Clarify the idea, resolve ambiguities, produce feature definition |
| PLAN | `planner` | Break into atomic tasks, produce reviewable markdown plan |
| BUILD | `builder` | TDD implementation — one task at a time (red-green-refactor) |
| TEST | `tester` | Evolving test plan with iterative execution and status tracking |
| REVIEW | `reviewer` | Code review + silent failure hunting + code health analysis |

Each agent can also be invoked independently outside the full pipeline.

## Design Principles

- **Language-agnostic**: Adapts to any language, framework, and build tool
- **Context-aware**: Reads CLAUDE.md and `.claude/` config for project conventions
- **Human gates**: Every stage requires explicit approval before proceeding
- **Test-driven**: BUILD stage follows red-green-refactor cycle
- **Read-only review**: REVIEW agent never modifies code — produces findings only
