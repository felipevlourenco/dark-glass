<h1 align="center">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="docs/assets/logo-dark.svg" />
        <img src="docs/assets/logo-light.svg" alt="Dark Glass" height="72" />
    </picture>
</h1>

<p align="center">
    A React component library for dense dashboards: frosted glass panels and pill controls.<br />
    Two themes from one set of tokens, accessible by default, TypeScript included.
</p>

<p align="center">
    <a href="https://www.npmjs.com/package/dark-glass"><img alt="npm version" src="https://img.shields.io/npm/v/dark-glass?color=d63e1e&labelColor=17181a" /></a>
    <a href="https://github.com/felipevlourenco/dark-glass/actions/workflows/ci.yml"><img alt="CI" src="https://img.shields.io/github/actions/workflow/status/felipevlourenco/dark-glass/ci.yml?branch=main&label=CI&labelColor=17181a" /></a>
    <a href="LICENSE"><img alt="MIT license" src="https://img.shields.io/npm/l/dark-glass?color=d63e1e&labelColor=17181a" /></a>
    <a href="https://felipevlourenco.github.io/dark-glass/"><img alt="Storybook" src="https://img.shields.io/badge/Storybook-live-d63e1e?labelColor=17181a" /></a>
</p>

**[Live Storybook →](https://felipevlourenco.github.io/dark-glass/)** · **[Dashboard showcase →](https://felipevlourenco.github.io/dark-glass/?path=/story/showcase-dashboard--overview)**

## Features

- **22 components**: buttons, form controls, display pieces and overlays.
- **Two themes**, Ember (dark glass, orange primary) and Ink (frosted light glass, near-black primary), from one set of design tokens. Switch with a `data-theme` attribute.
- **Accessible by default**: real roles and labels, keyboard support, focus trapping in overlays, a visible focus ring everywhere and reduced motion respected.
- **TypeScript-first**: every component exports its props type.
- **Self-contained styles**: the ESM build imports its own CSS.

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

| Group     | Components                                                                                           |
| --------- | ---------------------------------------------------------------------------------------------------- |
| Display   | `GlassCard`, `Icon`, `Badge`, `Chip`, `Avatar`, `Kbd`, `Progress`                                    |
| Actions   | `Button`, `IconButton`, `NavItem`                                                                    |
| Forms     | `Input`, `Select`, `Slider`, `Switch`, `SegmentedControl`                                            |
| Overlays  | `Modal`, `Drawer`, `CommandPalette`, `DropdownMenu`, `Popover`, `Tooltip`, `Toast` and `ToastRegion` |
| Dashboard | `AreaChart`, `BarChart`, `Gauge`, `StatTile`, `CardMenu`, `PortfolioValueCard`                       |

Every component is documented with live examples and props in Storybook.

### Known limits

- `DropdownMenu`, `Popover` and `Tooltip` flip to the other side when they would run off the screen. They check the viewport when they open, not on scroll or resize, and they ignore scroll containers that clip.
- `Toast` dismisses itself after `duration` ms (5 s by default, paused while hovered or focused), but there is no toast queue: you decide which toasts render.
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
