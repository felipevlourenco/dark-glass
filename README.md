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

- **Over 40 components**: buttons, form controls, display pieces, overlays, charts and dashboard blocks.
- **Two themes**, Ember (dark glass, orange primary) and Ink (frosted light glass, near-black primary), from one set of design tokens. Switch with a `data-theme` attribute.
- **Accessible by default**: real roles and labels, keyboard support, focus trapping in overlays, a visible focus ring everywhere and reduced motion respected. Every story is checked with axe (WCAG A and AA) in the test suite.
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

| Group     | Components                                                                                                                                                                                                  |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Display   | `GlassCard`, `Icon`, `Badge`, `Chip`, `Avatar`, `Kbd`, `Progress`                                                                                                                                           |
| Actions   | `Button`, `IconButton`, `NavItem`                                                                                                                                                                           |
| Forms     | `Input`, `Select`, `Slider`, `Switch`, `SegmentedControl`                                                                                                                                                   |
| Overlays  | `Modal`, `Drawer`, `CommandPalette`, `DropdownMenu`, `Popover`, `Tooltip`, `Toast`, `ToastRegion` and `ToastProvider`                                                                                       |
| Dashboard | `AreaChart`, `BarChart`, `Gauge`, `StatTile`, `CardMenu`, `CardHeader`, `PortfolioValueCard`, `NeedsYouTodayCard`, `AttentionRow`, `LoanRepaymentsCard`, `WhereItSitsCard`, `PropertiesCard`, `ListingCard` |
| Layout    | `Sidebar`, `TopBar`, `PageHeader`                                                                                                                                                                           |

Every component is documented with live examples and props in Storybook.

### Toasts

Wrap your app in `ToastProvider` and call `useToasts()` anywhere below it. Toasts past `limit` (3 by default) wait in a queue, and each one's auto-dismiss clock starts when it appears.

```tsx
import { Button, ToastProvider, useToasts } from 'dark-glass';

function SaveButton() {
    const { toast } = useToasts();
    return (
        <Button onClick={() => toast({ tone: 'positive', title: 'Saved' })}>
            Save
        </Button>
    );
}

export const App = () => (
    <ToastProvider>
        <SaveButton />
    </ToastProvider>
);
```

If you would rather own the list, render `Toast` inside a `ToastRegion` yourself.

### Refs

`Button`, `IconButton`, `Input`, `Select`, `Slider` and `Switch` forward `ref` to their native element, so you can call `focus()`.

### Known limits

- `DropdownMenu`, `Popover` and `Tooltip` pick the side with more room, counting the viewport and any ancestor that clips (`overflow` other than visible), and measure again on resize and scroll. When a panel fits on neither side they cap its height to the roomier one and let it scroll. They never shift a panel sideways; reach for floating-ui if you need that.
- `AreaChart` and `BarChart` show a tooltip on hover, touch and arrow keys. Touch keeps the tooltip until focus moves away.
- Axe in the test suite runs in jsdom, which cannot compute colour contrast. Contrast is checked for the status colours by a token test, and was checked in a real browser across every story and both themes.

## Stability

From 1.0 the public API follows [semantic versioning](https://semver.org): component names, props, exported types and token names change only in a major release. Releases are cut from commit messages (`fix` is a patch, `feat` a minor, a breaking change a major), and each one is listed on the [releases page](https://github.com/felipevlourenco/dark-glass/releases).

The first stable release on npm is **1.0.1**. The 1.0.0 number was published and withdrawn while the package was being set up, and npm never lets a version number be reused, so `v1.0.0` exists only as a git tag.

## Tokens

`src/styles/tokens.json` is the source of the design tokens and `src/styles/tokens.css` is generated from it (colours per theme, spacing, radii, shadows, blur, z-index and type styles). Read each token's usage note in the design system before choosing one.

## Develop

```bash
pnpm storybook      # component workbench on :6006
pnpm test           # unit tests
pnpm lint           # oxlint
pnpm typecheck
pnpm build          # library into dist/
pnpm visual         # screenshot check of the showcase stories (needs Chrome and build-storybook first)
pnpm visual:update  # accept new screenshots
```

Commits and PR titles follow [Conventional Commits](https://www.conventionalcommits.org/). Merging to `main` runs the checks, then releases to npm and GitHub (`feat` is a minor, `fix` a patch) and deploys Storybook to GitHub Pages.

## License

MIT
