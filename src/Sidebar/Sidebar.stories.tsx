import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Avatar } from '../Avatar/Avatar';
import { GlassCard } from '../GlassCard/GlassCard';
import { IconButton } from '../IconButton/IconButton';
import { Sidebar, type SidebarProps } from './Sidebar';

export const groups: SidebarProps['groups'] = [
    {
        label: 'Invest',
        items: [
            { id: 'desk', icon: 'grid', label: 'Desk' },
            {
                id: 'portfolio',
                icon: 'portfolio',
                label: 'Portfolio',
                count: 3,
            },
            { id: 'market', icon: 'home', label: 'Market', count: 2 },
            { id: 'analytics', icon: 'chart', label: 'Analytics' },
        ],
    },
    {
        label: 'Plan',
        items: [
            { id: 'calc', icon: 'calc', label: 'Calculators' },
            { id: 'advisor', icon: 'chat', label: 'Advisor' },
        ],
    },
    {
        label: 'Account',
        items: [
            { id: 'settings', icon: 'settings', label: 'Settings' },
            { id: 'help', icon: 'help', label: 'Help centre' },
        ],
    },
];

const meta = {
    title: 'Components/Sidebar',
    component: Sidebar,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    args: {
        brand: { name: 'Hearth', tagline: 'Property investing' },
        groups,
        active: 'desk',
    },
    decorators: [
        (Story) => (
            <div style={{ width: 264, padding: 24 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Sidebar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => <Demo {...args} />,
};

function Demo(args: SidebarProps) {
    const [active, setActive] = useState(args.active);
    return (
        <Sidebar
            {...args}
            active={active}
            onSelect={setActive}
            onCollapse={() => {}}
        >
            <GlassCard tone="inset">
                <div className="caption" style={{ color: 'var(--text-muted)' }}>
                    Net worth in property
                </div>
                <div className="heading">€2,678,298</div>
            </GlassCard>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '8px 4px 0',
                }}
            >
                <Avatar name="Felipe Lourenço" status="online" />
                <div style={{ flex: 1 }}>
                    <div className="label">Felipe Lourenço</div>
                    <div
                        className="caption"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        Owner · 15 homes
                    </div>
                </div>
                <IconButton
                    icon="swap"
                    label="Switch account"
                    variant="ghost"
                    size="small"
                />
            </div>
        </Sidebar>
    );
}
