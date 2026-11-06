import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IconButton } from '../IconButton/IconButton';
import { Tooltip } from './Tooltip';

const setup = (props: Partial<React.ComponentProps<typeof Tooltip>> = {}) => {
    render(
        <Tooltip label="Copy link" {...props}>
            <IconButton icon="share" label="Share" />
        </Tooltip>,
    );
    return screen.getByRole('button', { name: 'Share' });
};

describe('Tooltip', () => {
    it('is hidden until hovered, then describes the child', async () => {
        const trigger = setup();
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
        await userEvent.hover(trigger);
        const tip = screen.getByRole('tooltip');
        expect(tip).toHaveTextContent('Copy link');
        expect(trigger).toHaveAttribute('aria-describedby', tip.id);
        await userEvent.unhover(trigger);
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
        expect(trigger).not.toHaveAttribute('aria-describedby');
    });

    it('shows on keyboard focus and hides on blur', async () => {
        setup();
        await userEvent.tab();
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
        await userEvent.tab();
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('hides on Escape', async () => {
        setup();
        await userEvent.tab();
        await userEvent.keyboard('{Escape}');
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('can be forced open and placed below', () => {
        setup({ open: true, placement: 'bottom' });
        expect(screen.getByRole('tooltip')).toHaveClass('dg-tooltip--bottom');
    });
});
