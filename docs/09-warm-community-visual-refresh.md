# Warm community NGO visual refresh

This step introduced a warmer visual style while keeping the Embu pilot content and existing English/Kiswahili experience. Its two-font treatment was later replaced by the single-font design in step 10. Softer corners and spacing make cards, calls to action, and section headings feel related across the page.

## Design changes

- The hero retains its complete, uncropped illustrative care photograph. The heading and buttons now use the updated type and softer shapes.
- The three priorities use simple icons for information, local care navigation, and community support.
- The mission quote has a calm warm panel. The focus cards use related sand, sage, and peach surfaces with clear icons.
- The map, directory, and collaboration callout share the same rounded visual language.
- The design uses Tailwind utilities, the existing shadcn components, and the theme tokens in `src/index.css`.

The photograph is AI-generated and is labelled as an illustrative scene, not a real CancerCare patient or staff member.

## Verification

`pnpm build` passed. At a true 390px phone viewport, the page width and scroll width were both 390px; the hero, navigation, and photograph fit without horizontal scrolling. A desktop preview at 1440px was also reviewed.

## Current references

- [Fontsource installation](https://fontsource.org/docs/getting-started/install) and [Newsreader font](https://fontsource.org/fonts/newsreader/) for the self-hosted variable display font.
- [shadcn/ui theming](https://ui.shadcn.com/docs/theming) for token-based visual styling.

## Next step

Review the visual style in the browser, then continue the Embu facility verification before adding any live care listings.

