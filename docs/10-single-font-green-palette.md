# One font and one color family

CancerCare uses Geist throughout the interface, including headings, body copy, navigation, and labels. Italic styling is removed. The unused Newsreader package is removed from the project.

The site uses forest green as its principal color, with lighter sage tones for accents. Backgrounds use warm off-white, white, and a pale green. The Embu map highlight and the collaboration diagram follow the same color family. Theme colors are defined in `src/index.css`; section components use those Tailwind theme utilities.

The full, uncropped illustrative hero photograph remains in place. Its colors are part of the image, not interface accents.

## Verification

`pnpm build` passed. Desktop previews of the home, focus, and collaboration sections were reviewed. At 390px and 1440px widths, the page scroll width matched the viewport width.

## References

- [Tailwind CSS theme variables](https://tailwindcss.com/docs/theme) for centralized font and color tokens.
- [Fontsource Geist](https://fontsource.org/fonts/geist/use) for the self-hosted variable font.
