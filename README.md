# Engineering Skills Plugin

Multi-agent engineering pipeline for end-to-end feature development.

## Pipeline

```
REFINE → PLAN → BUILD → TEST → REVIEW
```

Each stage is a dedicated agent. A single orchestrator command chains them sequentially with human approval gates between each stage.

## Install

```
npx @anthropic-ai/claude-code skill add software-engineering-skills
```

## Usage

Run the full pipeline:
```
/swe:pipeline <feature description>
```

## Stages

| Stage | Agent | Purpose |
|-------|-------|---------|
| REFINE | `refiner` | Clarify the idea, resolve ambiguities, produce feature definition |
| PLAN | `planner` | Break into atomic tasks, produce reviewable markdown plan |
| BUILD | `builder` | TDD implementation — one task at a time (red-green-refactor) |
| TEST | `tester` | Evolving test plan with iterative execution and status tracking |
| REVIEW | `reviewer` | Code review + silent failure hunting + code health analysis |

## Design Principles

- **Language-agnostic**: Adapts to whatever language, framework, and build tool the project uses
- **Context-aware**: Reads CLAUDE.md and `.claude/` config to discover project conventions
- **Human gates**: Every stage requires explicit approval before proceeding
- **Test-driven**: BUILD stage follows red-green-refactor cycle
- **Living documents**: PLAN produces a task plan doc, TEST produces an evolving test plan doc
- **Read-only review**: REVIEW agent never modifies code — produces findings only

## Agents

Each agent can also be invoked independently outside the full pipeline.

### refiner (opus, blue)
Explores the codebase, asks clarifying questions, produces a structured feature definition.

### planner (opus, green)
Decomposes into atomic tasks with dependencies, writes a markdown plan document for review.

### builder (opus, yellow)
Implements tasks one at a time using TDD. Reads project conventions and adapts to any build tool.

### tester (sonnet, cyan)
Creates and maintains a living test plan document. Runs iterative test rounds and tracks pass/fail status.

### reviewer (opus, red)
Combines three review dimensions: code review (confidence-scored), silent failure hunting, and code health analysis. Never modifies code.
