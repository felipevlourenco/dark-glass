import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
    title: 'Components/Badge',
    component: Badge,
    tags: ['autodocs'],
    args: { children: 'Let' },
} satisfies Meta<typeof Badge>;
export default meta;

type Story = StoryObj<typeof meta>;
const tones = [
    'neutral',
    'positive',
    'warning',
    'accent',
    'danger',
    'info',
    'primary',
] as const;

export const Default: Story = {};

export const Tones: Story = {
    render: (args) => (
        <div style={{ display: 'flex', gap: 8 }}>
            {tones.map((tone) => (
                <Badge key={tone} {...args} tone={tone}>
                    {tone}
                </Badge>
            ))}
        </div>
    ),
};

export const WithIcon: Story = {
    args: { tone: 'danger', icon: 'alert', children: 'Late' },
};

export const Count: Story = { args: { count: true, children: 3 } };
