import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NavItem } from './NavItem';

describe('NavItem', () => {
    it('renders a button by default', async () => {
        const onClick = vi.fn();
        render(<NavItem label="Portfolio" onClick={onClick} />);
        const button = screen.getByRole('button', { name: 'Portfolio' });
        expect(button).toHaveAttribute('type', 'button');
        await userEvent.click(button);
        expect(onClick).toHaveBeenCalledOnce();
    });

    it('renders a link when href is given', () => {
        render(<NavItem label="Portfolio" href="/portfolio" />);
        expect(screen.getByRole('link', { name: 'Portfolio' })).toHaveAttribute(
            'href',
            '/portfolio',
        );
    });

    it('marks the active item as the current page', () => {
        render(<NavItem label="Home" active />);
        const item = screen.getByRole('button', { name: 'Home' });
        expect(item).toHaveAttribute('aria-current', 'page');
        expect(item).toHaveClass('is-active');
    });

    it('shows a count, including zero', () => {
        render(<NavItem label="Inbox" count={0} />);
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('renders an icon', () => {
        const { container } = render(<NavItem label="Home" icon="home" />);
        expect(container.querySelector('svg')).toBeInTheDocument();
    });
});
