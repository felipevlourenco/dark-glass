import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sidebar, type SidebarGroup } from './Sidebar';

const groups: SidebarGroup[] = [
    {
        label: 'Invest',
        items: [
            { id: 'desk', icon: 'grid', label: 'Desk' },
            { id: 'market', icon: 'home', label: 'Market', count: 2 },
        ],
    },
];

const setup = (props = {}) => {
    const onSelect = vi.fn();
    render(
        <Sidebar
            brand={{ name: 'Hearth', tagline: 'Property investing' }}
            groups={groups}
            active="desk"
            onSelect={onSelect}
            {...props}
        >
            <span>Footer</span>
        </Sidebar>,
    );
    return { onSelect };
};

describe('Sidebar', () => {
    it('is a named landmark with the brand, groups and footer', () => {
        setup();
        expect(
            screen.getByRole('complementary', { name: 'Main navigation' }),
        ).toBeInTheDocument();
        expect(screen.getByText('Hearth')).toBeInTheDocument();
        expect(screen.getByText('INVEST')).toBeInTheDocument();
        expect(screen.getByText('Footer')).toBeInTheDocument();
    });

    it('marks the active page and reports a selection', async () => {
        const { onSelect } = setup();
        expect(screen.getByRole('button', { name: /Desk/ })).toHaveAttribute(
            'aria-current',
            'page',
        );
        await userEvent.click(screen.getByRole('button', { name: /Market/ }));
        expect(onSelect).toHaveBeenCalledWith('market');
    });

    it('only has a collapse button when asked', async () => {
        const onCollapse = vi.fn();
        const { unmount } = render(
            <Sidebar brand={{ name: 'B' }} groups={[]} />,
        );
        expect(
            screen.queryByRole('button', { name: 'Collapse sidebar' }),
        ).not.toBeInTheDocument();
        unmount();
        render(
            <Sidebar
                brand={{ name: 'B' }}
                groups={[]}
                onCollapse={onCollapse}
            />,
        );
        await userEvent.click(
            screen.getByRole('button', { name: 'Collapse sidebar' }),
        );
        expect(onCollapse).toHaveBeenCalled();
    });
});
