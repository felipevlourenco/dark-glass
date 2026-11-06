import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavItem } from './NavItem';

const meta = {
    title: 'Components/NavItem',
    component: NavItem,
    tags: ['autodocs'],
    args: { label: 'Portfolio', icon: 'portfolio' },
    decorators: [
        (Story) => (
            <div style={{ width: 240 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof NavItem>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Active: Story = { args: { active: true } };
export const WithCount: Story = { args: { count: 3 } };
export const AsLink: Story = { args: { href: '#portfolio' } };

export const Sidebar: Story = {
    render: () => (
        <nav style={{ display: 'grid', gap: 4, width: 240 }}>
            <span
                className="eyebrow"
                style={{ color: 'var(--text-subtle)', padding: '0 12px' }}
            >
                INVEST
            </span>
            <NavItem label="Overview" icon="home" active />
            <NavItem label="Portfolio" icon="portfolio" count={7} />
            <NavItem label="Reports" icon="chart" />
            <span
                className="eyebrow"
                style={{ color: 'var(--text-subtle)', padding: '12px 12px 0' }}
            >
                ACCOUNT
            </span>
            <NavItem label="Settings" icon="settings" />
        </nav>
    ),
};
