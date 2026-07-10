---
target: packages/storybook/stories/appearances.stories.tsx
total_score: 19
p0_count: 0
p1_count: 2
timestamp: 2026-07-10T09-25-52Z
slug: packages-storybook-stories-appearances-stories-tsx
---
Method: dual-agent (A: critique_design · B: critique_evidence)

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of system status | 3 | Active navigation and health state are clear, but action feedback is not represented. |
| 2 | Match system / real world | 3 | Release language is familiar; raw token names break the product fiction. |
| 3 | User control and freedom | 2 | Scheduling has no cancel, reset, or review step. |
| 4 | Consistency and standards | 3 | Components are cohesive, but product UI and theme specimen are mixed. |
| 5 | Error prevention | 1 | Scheduling has no validation or impact summary. |
| 6 | Recognition rather than recall | 2 | The table has no headers, requiring users to infer columns. |
| 7 | Flexibility and efficiency | 1 | No filters, row actions, or batch operations are represented. |
| 8 | Aesthetic and minimalist design | 2 | Duplicate framing and a 256px dead zone weaken the hierarchy. |
| 9 | Error recovery | 1 | No failed scheduling or recovery state is represented. |
| 10 | Help and documentation | 1 | No contextual help appears around the risky scheduling action. |
| **Total** | | **19/40** | **Poor composition built from credible components** |

## Anti-Patterns Verdict

The component system itself does not look generic or untrustworthy. The composition
does: it combines a release-management product, an appearance label, and a token
specimen in one product canvas. The deterministic detector returned zero findings,
so the problem is structural rather than a collection of lintable styling mistakes.

Parent-session browser validation confirmed the visual diagnosis in Graphite light,
Graphite dark, and Solid Sidebar. At a 1280×720 viewport, the operational cards end
at y=393 while the token cards begin at y=649, leaving approximately 256px of
manufactured empty space. The saturated solid sidebar also becomes the page's
strongest visual object.

## Overall Impression

The pieces are individually clean, but the page cannot decide whether its purpose is
to manage releases or demonstrate appearance tokens. The single biggest opportunity
is to establish one product hierarchy and move theme-demo metadata into a clearly
separate layer.

## What's Working

- Buttons, cards, badges, inputs, icons, radii, and spacing feel like one system.
- Status is communicated with text as well as color, and icon-only controls have
  accessible names.
- The queue and scheduling form are internally grouped and easy to scan.

## Priority Issues

1. **[P1] Content, void, specimen footer.** The flexible spacer pins token cards to
   the viewport bottom and makes the page look unfinished, particularly in dark mode.
   Remove the spacer and place a titled token section directly after the operational
   grid, or move token samples outside the simulated product shell.
2. **[P1] Competing hierarchy.** “Release control,” “Production pipeline,” “Release
   queue,” “New release,” and “Schedule release” all compete for primacy. Keep one page
   title and one primary action. Move the appearance name out of the product title and
   co-locate health status with the release queue.
3. **[P2] Product and specimen layers are mixed.** Raw values such as `bg.surface`
   make a believable product suddenly read as documentation. Keep the token cards,
   but introduce them as an explicit “Theme tokens” specimen below the preview or in
   Storybook chrome.
4. **[P2] Horizontal weight lacks intent.** The sidebar receives 280px for four items,
   the queue uses a large card for three headerless rows, and the narrow scheduling
   card carries most of the interaction density. A 240–248px sidebar and visible table
   headers would use the space more convincingly; keep the schedule panel around
   340px only when there is sufficient main width.
5. **[P2] Solid sidebar dominates the task.** A full-height purple.500 slab is louder
   than the release content. For the high-contrast example, slightly reduce the seed's
   chroma/lightness or reserve the strongest purple for active navigation and actions.

## Persona Red Flags

**Alex, power user:** no queue filters, direct row actions, shortcuts, or clear
relationship between a selected release and the schedule form. “New release” and
“Schedule release” imply two competing primary flows.

**Sam, accessibility-dependent user:** the table has no header row; small icon buttons
may be below a comfortable target size; low-opacity sidebar metadata risks contrast;
and the crowded header is likely to compress badly at 200% zoom. Hidden mobile table
columns are not replaced with row labels.

## Minor Observations

- The body h3 is visually larger than the Page h2, reinforcing the split hierarchy.
- “Schedule release” uses a forward chevron, which reads more like navigation than
  form submission.
- Health status disappears below `md` rather than relocating.
- Interactive rows do not expose a clear row action or selection relationship.
- Repeating “14 changes” makes the sample feel staged.

## Questions to Consider

- Should the story primarily feel like a believable release product or a token
  specimen?
- Is the primary task creating, reviewing, or scheduling a release?
- Should scheduling always be visible, or appear after choosing a candidate?
