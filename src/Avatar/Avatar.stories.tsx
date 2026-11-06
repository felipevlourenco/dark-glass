import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta = {
    title: 'Components/Avatar',
    component: Avatar,
    tags: ['autodocs'],
    args: { initials: 'MS', name: 'Marta Silva' },
} satisfies Meta<typeof Avatar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
    render: (args) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {(['small', 'medium', 'large'] as const).map((size) => (
                <Avatar key={size} {...args} size={size} />
            ))}
        </div>
    ),
};

export const WithStatus: Story = {
    render: (args) => (
        <div style={{ display: 'flex', gap: 12 }}>
            <Avatar {...args} status="online" />
            <Avatar {...args} status="busy" />
        </div>
    ),
};
