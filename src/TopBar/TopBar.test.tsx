import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TopBar } from './TopBar';

describe('TopBar', () => {
    it('opens search on click and on Enter, without typing into it', async () => {
        const onSearch = vi.fn();
        render(
            <TopBar
                breadcrumb="Desk"
                searchPlaceholder="Search homes…"
                onSearch={onSearch}
            >
                <button>New</button>
            </TopBar>,
        );
        const search = screen.getByRole('textbox', { name: 'Search homes…' });
        expect(search).toHaveAttribute('readonly');
        await userEvent.click(search);
        expect(onSearch).toHaveBeenCalledTimes(1);
        await userEvent.keyboard('{Enter}');
        expect(onSearch).toHaveBeenCalledTimes(2);
        expect(screen.getByText('⌘K')).toBeInTheDocument();
        expect(screen.getByText('Desk')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'New' })).toBeInTheDocument();
    });
});
