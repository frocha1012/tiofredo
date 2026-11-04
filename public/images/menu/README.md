These graphics are extracted from the client-supplied “Ementa Tio Fredo Julho 2026” PDF, available at `/ementa-tio-fredo-julho-2026.pdf`.

- `allergens-original.png` is the original 480 × 184 transparent legend image embedded on page 1. `AllergenIcon` selects the individual symbols with SVG view boxes, preserving their original artwork and colours.
- `chef-original.svg` preserves the 78 drawing paths of the chef's recommendation symbol on page 3. The SVG has a transparent background.

The per-dish associations in `data/menu-allergens.ts` reproduce only the printed symbols on pages 3–6: 52, 49, 58 and 79 marks, respectively. No allergens are inferred from dish names or ingredient lists. Missing symbols are not a declaration that a dish is allergen-free.
