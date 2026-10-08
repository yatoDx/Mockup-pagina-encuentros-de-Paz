<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application structure
- Keep distinct portal sections in TanStack file routes, with shared branding and layout in reusable components, so each section is directly accessible.
- Keep mockup records separate from institutional facts and mark illustrative records explicitly, so incomplete source material is never presented as verified history.
- Store portal visual roles in the global semantic design system, so every section shares the same identity.
- The mockup reader uses browser-local page navigation and the contact form is a non-persistent demonstration; add real documents and persistence only when requested.
