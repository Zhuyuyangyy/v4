# Evaluation Tree Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the evaluation page's tree background match the assessment workflow by adding scan and evidence-writeback layers around the existing 3D tree.

**Architecture:** Keep the 3D tree component intact and make the page-level shell responsible for the visual metaphor. Add a diagnostic stage variant so the component's three stage models still render on `/evaluation`, but as low-opacity assessment structures. Add decorative layers in `Evaluation.vue` behind the canvas.

**Tech Stack:** Vue 3 single-file component, scoped CSS, existing Three.js tree component, existing canvas particle background.

---

### Task 1: Add The Diagnostic Background Layers

**Files:**
- Modify: `src/components/knowledge-tree/ThreeKnowledgeTree.vue`
- Modify: `src/views/Evaluation.vue`

- [x] **Step 1: Insert decorative layers**

Add `tree-diagnostic-bg` and `tree-root-writeback` containers after the stage particle layer. Mark them `aria-hidden="true"` and keep them before `ThreeKnowledgeTree`.

- [x] **Step 2: Add a diagnostic stage variant**

Add `backgroundStageVariant: 'default' | 'diagnostic'` to `ThreeKnowledgeTree`. In diagnostic mode, keep the three stage models but make them lower opacity, blue-tinted, additive, and farther behind the main tree.

- [x] **Step 3: Center the rotation pivot**

Move `worldRotationGroup` to `sceneOffsetX` and `sceneDepthOffset`, remove the duplicate root offset, and subtract that pivot from the background-stage model placement. This keeps the visual composition stable while making horizontal drag rotate around the tree center.

- [x] **Step 4: Use the diagnostic stage on the evaluation page**

Pass `background-stage-variant="diagnostic"` to `ThreeKnowledgeTree` on this page.

- [x] **Step 5: Add scoped CSS**

Style diagnostic rings, the scan sweep, evidence dots, writeback lines, and root glow. Set all new layers to `pointer-events: none`.

- [ ] **Step 6: Verify**

Run `npm run build`, open `/evaluation`, and confirm the tree still renders and marker clicks still show the detail panel.
