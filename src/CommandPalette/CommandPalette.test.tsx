import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CommandPalette } from './CommandPalette';

const setup = (
    props: Partial<React.ComponentProps<typeof CommandPalette>> = {},
) => {
    const onPortfolio = vi.fn();
    const onClose = vi.fn();
    render(
        <CommandPalette
            open
            onClose={onClose}
            groups={[
                {
                    label: 'Go to',
                    items: [
                        { label: 'Overview', icon: 'home' },
                        { label: 'Portfolio', onSelect: onPortfolio },
                    ],
                },
                {
                    label: 'Actions',
                    items: [{ label: 'Add property', shortcut: 'N' }],
                },
            ]}
            {...props}
        />,
    );
    return { onPortfolio, onClose };
};

describe('CommandPalette', () => {
    it('focuses the search box and lists every command', () => {
        setup();
        expect(screen.getByRole('combobox')).toHaveFocus();
        expect(screen.getAllByRole('option')).toHaveLength(3);
        expect(
            screen.getByRole('group', { name: 'Go to' }),
        ).toBeInTheDocument();
    });

    it('filters as you type and hides empty groups', async () => {
        setup();
        await userEvent.type(screen.getByRole('combobox'), 'add');
        expect(screen.getAllByRole('option')).toHaveLength(1);
        expect(
            screen.queryByRole('group', { name: 'Go to' }),
        ).not.toBeInTheDocument();
    });

    it('says when nothing matches', async () => {
        setup();
        await userEvent.type(screen.getByRole('combobox'), 'zzz');
        expect(screen.getByText('No results for “zzz”')).toBeInTheDocument();
    });

    it('moves the active option with the arrow keys and wraps', async () => {
        setup();
        const input = screen.getByRole('combobox');
        const options = screen.getAllByRole('option');
        expect(options[0]).toHaveAttribute('aria-selected', 'true');
        await userEvent.keyboard('{ArrowDown}');
        expect(options[1]).toHaveAttribute('aria-selected', 'true');
        expect(input).toHaveAttribute('aria-activedescendant', options[1].id);
        await userEvent.keyboard('{ArrowUp}{ArrowUp}');
        expect(options[2]).toHaveAttribute('aria-selected', 'true');
    });

    it('chooses with Enter: runs the item, onSelect, then closes', async () => {
        const onSelect = vi.fn();
        const { onPortfolio, onClose } = setup({ onSelect });
        await userEvent.keyboard('{ArrowDown}{Enter}');
        expect(onPortfolio).toHaveBeenCalledOnce();
        expect(onSelect).toHaveBeenCalledWith(
            expect.objectContaining({ label: 'Portfolio' }),
        );
        expect(onClose).toHaveBeenCalledOnce();
    });

    it('chooses with a click', async () => {
        const { onPortfolio } = setup();
        await userEvent.click(
            screen.getByRole('option', { name: 'Portfolio' }),
        );
        expect(onPortfolio).toHaveBeenCalledOnce();
    });

    it('starts with an empty search each time it opens', async () => {
        const props = { groups: [{ label: 'G', items: [{ label: 'One' }] }] };
        const { rerender } = render(<CommandPalette open {...props} />);
        await userEvent.type(screen.getByRole('combobox'), 'on');
        rerender(<CommandPalette open={false} {...props} />);
        rerender(<CommandPalette open {...props} />);
        expect(screen.getByRole('combobox')).toHaveValue('');
    });
});
