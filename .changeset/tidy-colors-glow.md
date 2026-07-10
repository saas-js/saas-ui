---
'@saas-ui/chakra-preset': minor
'@saas-ui/react': patch
---

Add a lightweight OKLCH appearance generator for neutral, accent, tonal sidebar,
and solid high-contrast sidebar colors in light and dark mode. Appearance seeds
distinguish tonal contrast from solid-color foreground tone and prevent mixing
tonal and solid sidebar options. Subtle badges now include a semantic palette
border for clearer separation from surrounding surfaces. Page headers now use
flexible content and footer rows so optional navigation and actions do not
reserve empty grid cells. Sidebar and Page recipes now apply their semantic
foreground, border, and background defaults without consumer overrides. Line
tables inherit their parent surface and use the shared interaction hover color.
The new inset table variant aligns cell content inside padded containers while
letting row backgrounds and dividers bleed into the surrounding padding. Heading
and title recipes now use the medium font weight consistently.
