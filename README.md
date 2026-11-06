# Dark Glass

A React component library for dense, money-and-property dashboards: frosted glass panels over a dark ground, pill-shaped controls and one hot colour for the action that matters.

Two themes ship from the same tokens: **Ember** (orange primary, dark glass) and **Ink** (near-black primary, frosted light glass).

**Storybook:** https://felipevlourenco.github.io/dark-glass/

## Install

```bash
pnpm add dark-glass
```

React 18 or newer is a peer dependency.

## Use

```tsx
import { Button, GlassCard } from 'dark-glass';

export function Example() {
    return (
        <GlassCard>
            <span className="title">Portfolio value</span>
            <Button>Add property</Button>
        </GlassCard>
    );
}
```

The ESM build imports its own stylesheet. With the CommonJS build, import it yourself:

```ts
import 'dark-glass/style.css';
```

### Theme

Set `data-theme` on `<html>`. Components never branch on the theme; they only read tokens.

```html
<html data-theme="ember">
    <!-- or "ink" -->
</html>
```

### Font

The type scale uses [Outfit](https://fonts.google.com/specimen/Outfit) (weights 300 to 600). It is not bundled, so load it once:

```html
<link
    href="https://fonts.googleapis.com/css2?family=Outfit:wght@300..600&display=swap"
    rel="stylesheet"
/>
```

Without it the stack falls back to Avenir Next and then system fonts.

### Glass needs a background

Glass blurs what is behind it. Over flat black it looks dead, so put a soft wash or a blurred photo behind panels, for example:

```css
body {
    background:
        radial-gradient(90% 120% at 12% 0%, var(--bg-wash), transparent 70%),
        var(--bg);
}
```

## Components

| Group    | Components                                                                                           |
| -------- | ---------------------------------------------------------------------------------------------------- |
| Display  | `GlassCard`, `Icon`, `Badge`, `Chip`, `Avatar`, `Kbd`, `Progress`                                    |
| Actions  | `Button`, `IconButton`, `NavItem`                                                                    |
| Forms    | `Input`, `Select`, `Slider`, `Switch`, `SegmentedControl`                                            |
| Overlays | `Modal`, `Drawer`, `CommandPalette`, `DropdownMenu`, `Popover`, `Tooltip`, `Toast` and `ToastRegion` |

Every component is documented with live examples and props in Storybook.

### Known limits

- `DropdownMenu` and `Popover` open on the side you choose and do not flip near the viewport edge.
- `Toast` is presentational: you decide which toasts render and when they go. There is no queue or auto-dismiss.
- Inputs do not forward `ref` yet (the library supports React 18).

## Tokens

`src/styles/tokens.json` is the source of the design tokens and `src/styles/tokens.css` is generated from it (colours per theme, spacing, radii, shadows, blur, z-index and type styles). Read each token's usage note in the design system before choosing one.

## Develop

```bash
pnpm storybook      # component workbench on :6006
pnpm test           # unit tests
pnpm lint           # oxlint
pnpm typecheck
pnpm build          # library into dist/
```

Commits and PR titles follow [Conventional Commits](https://www.conventionalcommits.org/). Merging to `main` runs the checks, then releases to npm and GitHub (`feat` is a minor, `fix` a patch) and deploys Storybook to GitHub Pages.

## License

MIT
