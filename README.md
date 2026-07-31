# N. Krishan Tantia — Personal Portfolio

A premium, fully responsive personal portfolio site built with **only HTML5, CSS3, and vanilla JavaScript** — no frameworks, no build step, no backend. Open `index.html` in a browser and it works.

## Structure

```
Portfolio/
├── index.html         Home — hero, typing effect, stats
├── about.html         Biography, objective, education timeline, interests, languages, soft skills
├── skills.html        Categorized skills with animated progress bars
├── experience.html     Internship, projects, leadership, achievements
├── protosem.html       Weekly learning journal (vertical timeline) + reusable week template
├── contact.html        Contact details + front-end-only message form
├── css/style.css       Shared design system and styles
├── js/script.js        Shared interactivity (nav, menus, animations, form)
├── images/             Drop your photos here (profile picture, project shots, week photos)
└── README.md
```

## Design language

"Control Panel" — a dark schematic surface with cyan → blue → purple signal-gradient
accents, glassmorphism panels framed with corner brackets (like an instrument readout),
and an animated PCB-trace background with traveling signal pulses, echoing the
robotics/automation/embedded-systems theme.

## Customizing

- **Colors / fonts**: edit the CSS variables at the top of `css/style.css` (`:root`).
- **Profile photo**: replace the placeholder box in `about.html` with an `<img>` tag pointing to a file in `images/`.
- **Resume**: the "Download Resume" button on the home page is a placeholder — add your PDF to the project and point the link (`href`) at it.
- **GitHub link**: placeholder links marked `#` in the footer and contact page — update with your GitHub profile URL.
- **Skill levels**: in `skills.html`, adjust the `data-level` attribute (0–100) on each `.skill-bar-fill` element to match your own self-assessment.

## Adding a new ProtoSem week

Open `protosem.html` and scroll to the bottom of the file — you'll find a commented
**WEEK TEMPLATE** block. Copy everything between `WEEK TEMPLATE START` and
`WEEK TEMPLATE END` (excluding the HTML comment markers `<!--` / `-->`), paste it as a
new `.week-card` inside the `.weeks-timeline` container (above or below existing weeks),
fill in the content, and save. No CSS or JavaScript changes are ever required — the
timeline rail, dots, and glass-card styling apply automatically to any `.week-card`.

## Notes

- All pages share the same navigation bar and footer, defined per-page (no server-side includes, since this is a static, dependency-free site).
- The contact form is front-end only; wire it up to a form service (e.g. Formspree) or your own backend endpoint to actually receive messages.
- Respects `prefers-reduced-motion` for users who have that OS setting enabled.
