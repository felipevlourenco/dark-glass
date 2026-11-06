import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from './IconButton';

const meta = {
    title: 'Components/IconButton',
    component: IconButton,
    tags: ['autodocs'],
    args: { icon: 'bell', label: 'Notifications' },
} satisfies Meta<typeof IconButton>;
export default meta;

type Story = StoryObj<typeof meta>;
const row = { display: 'flex', alignItems: 'center', gap: 12 } as const;

export const Default: Story = {};

export const Variants: Story = {
    render: (args) => (
        <div style={row}>
            {(['secondary', 'ghost', 'primary'] as const).map((variant) => (
                <IconButton key={variant} {...args} variant={variant} />
            ))}
        </div>
    ),
};

export const Sizes: Story = {
    render: (args) => (
        <div style={row}>
            <IconButton {...args} size="sm" />
            <IconButton {...args} size="md" />
        </div>
    ),
};

export const WithBadge: Story = { args: { badge: 3 } };
