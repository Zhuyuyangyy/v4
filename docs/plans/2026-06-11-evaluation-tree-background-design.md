# Evaluation Tree Background Design

## Goal

Make the evaluation page's tree and background read as one system: an assessment engine scans the knowledge tree, then writes evidence back into its roots.

## Direction

Use a hybrid of two metaphors:

- Evaluation scan: subtle rings, grid marks, and a slow sweep behind the canopy.
- Evidence writeback: root-level light bands and data streams entering the tree from the bottom.

The 3D tree remains interactive. The page should not replace the tree with a static illustration or change the right-side evaluation workflow.

## Implementation Notes

- Modify `src/views/Evaluation.vue` only.
- Keep the tree component's three background-stage models on this page, but render them in a diagnostic variant so they become low-opacity assessment structures instead of a competing natural scene.
- Add decorative, `aria-hidden` layers inside the left tree card.
- Keep overlays behind the canvas and pointer-events disabled so marker selection still works.
- Add responsive rules so the visual remains calm on narrow screens.

## Verification

- Run `npm run build`.
- Open `/evaluation` in the browser.
- Check that the tree renders, the background frames it, and tree marker clicks still open the detail panel.
