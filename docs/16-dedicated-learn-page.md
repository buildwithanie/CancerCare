# Dedicated Learn page

The detailed cancer education and screening guide now live at `/learn/`. The homepage keeps a short entry card. The header and footer link to the Learn page, while links to mission, pilot, directory, and community return to their current homepage sections. These sections can become separate pages in later milestones when they have enough verified content.

Vite builds both `index.html` and `learn/index.html`, so `/learn/` has a real static HTML entry and works on direct visits without a client-side routing dependency. Both entries use the same React app and English/Kiswahili state; the language preference persists across page navigation.

The Learn page begins with three linked steps: cancer basics, the screening guide, and questions for care. The underlying educational text and source links have not changed. Local clinical review remains pending before a public clinical-information launch.

Verified in the browser at desktop and phone widths: direct `/learn/` load, homepage card and header navigation, return links to homepage sections, English/Kiswahili switching, and no horizontal overflow at 390px.
