import { render, screen } from '@testing-library/react';
import { GlassCard } from './GlassCard';

describe('GlassCard', () => {
    it('renders a div with the default tone', () => {
        render(<GlassCard>Hello</GlassCard>);
        const card = screen.getByText('Hello');
        expect(card.tagName).toBe('DIV');
        expect(card).toHaveClass('dg-card', 'dg-card--default');
    });

    it('applies tone and renders as another element', () => {
        render(
            <GlassCard as="section" tone="inset">
                Tile
            </GlassCard>,
        );
        const card = screen.getByText('Tile');
        expect(card.tagName).toBe('SECTION');
        expect(card).toHaveClass('dg-card--inset');
    });

    it('overrides padding without dropping other styles', () => {
        render(
            <GlassCard padding={8} style={{ width: 10 }}>
                P
            </GlassCard>,
        );
        expect(screen.getByText('P')).toHaveStyle({
            padding: '8px',
            width: '10px',
        });
    });
});
