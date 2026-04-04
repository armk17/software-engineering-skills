---
description: "End-to-end engineering pipeline: REFINE -> PLAN -> BUILD -> TEST -> REVIEW. Orchestrates 5 specialized agents for complete feature development lifecycle."
argument-hint: "[feature description or ticket reference]"
allowed-tools: ["Bash", "Glob", "Grep", "Read", "Write", "Edit", "MultiEdit", "Task"]
---

# Software Engineering Skills Pipeline

You are orchestrating a 5-stage engineering pipeline. Follow each stage sequentially. Never skip stages. Always wait for human approval between stages.

Initial request: $ARGUMENTS

---

## Stage 0: DETECT

**Goal**: Identify project type and load specialized plugins only when relevant

1. Check the project root for backend indicators:
   - `pom.xml` / `build.gradle` → Java
   - `go.mod` → Go
   - `Cargo.toml` → Rust
   - `pyproject.toml` / `requirements.txt` with flask/django/fastapi → Python
   - `package.json` with express/nestjs/fastify → Node.js
2. Read `CLAUDE.md` for explicit tech stack declarations

3. **If backend indicators found**:
   - Present your finding to the user: "Detected [indicator]. This looks like a [language] backend project."
   - Ask the user to confirm: "Should I use the `backend-engineering` plugin for specialized guidance? (yes / no / it's actually a [different type])"
   - Only load `backend-engineering` if the user confirms

4. **If no backend indicators found**:
   - Ask the user: "I didn't detect a specific project type. What kind of project is this? (backend / frontend / fullstack / library / other)"
   - If the user says backend → ask which language/framework, then load `backend-engineering`
   - Otherwise → proceed with generic agents only

5. Record the decision (project type + whether specialized plugin is active) and carry it through all subsequent stages

---

## Stage 1: REFINE

**Goal**: Clear, unambiguous feature definition

1. Launch the `refiner` agent with the initial request and any context provided
2. The refiner will explore the codebase and ask clarifying questions — facilitate the conversation
3. Once the refiner produces a feature definition, present it to the user
4. **GATE**: Ask the user — "Is this feature definition approved? (yes / modify / restart)"
5. Do not proceed until explicitly approved

---

## Stage 2: PLAN

**Goal**: Atomic task breakdown as a reviewable markdown document

1. Launch the `planner` agent with the approved feature definition
2. The planner will produce a markdown plan document written to the project directory
3. Present the plan summary to the user: task count, complexity, key decisions, risks
4. **GATE**: Ask the user — "Is this plan approved? (yes / modify / add tasks / restart)"
5. Do not proceed until explicitly approved

---

## Stage 3: BUILD

**Goal**: Incremental TDD implementation, one task at a time

1. Launch the `builder` agent with the approved plan
2. If `backend-engineering` was confirmed in Stage 0: instruct builder to invoke it for coding standards, build commands, and framework patterns
3. The builder works through tasks sequentially: write test → implement → refactor → verify
3. After each task, briefly report progress (task ID, what was done, tests passing)
4. If the builder encounters a blocker, surface it to the user immediately
5. **GATE**: After all tasks complete, ask — "Implementation complete. Ready for testing? (yes / continue building / modify)"

---

## Stage 4: TEST

**Goal**: Comprehensive test execution with evolving test plan document

1. Launch the `tester` agent
2. If `backend-engineering` was confirmed in Stage 0: instruct tester to invoke it for test framework patterns and execution commands
3. The tester generates a test plan document, runs tests, and updates results
3. Present test results after each round (pass/fail counts, key failures)
4. If failures exist, coordinate with the builder to fix them, then re-test
5. **GATE**: After all tests pass, ask — "All tests passing. Ready for review? (yes / add more tests / fix issues)"

---

## Stage 5: REVIEW

**Goal**: Code health and merge readiness

1. Launch the `reviewer` agent
2. If `backend-engineering` was confirmed in Stage 0: instruct reviewer to invoke it for backend-specific review patterns and conventions
3. Present review findings categorized by severity (critical, important, suggestions)
3. If critical issues are found, coordinate with the builder to fix, then re-review
4. After fixes, re-run the reviewer to verify
5. **GATE**: Present final review summary. Ask — "Code is review-clean. Ready to proceed? (yes / address suggestions / re-review)"

---

## Completion

Summarize the entire pipeline:

- **What was built**: Feature summary and key decisions
- **Files created/modified**: List of all changed files
- **Test results**: Final test plan status (all passing)
- **Review findings**: What was addressed, what was deferred
- **Suggested next steps**: PR creation, documentation, deployment considerations
