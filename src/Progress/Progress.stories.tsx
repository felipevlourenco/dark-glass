import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress } from './Progress';

const meta = {
    title: 'Components/Progress',
    component: Progress,
    tags: ['autodocs'],
    args: { value: 60, label: 'Units let' },
    decorators: [
        (Story) => (
            <div style={{ width: 320 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Progress>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tones: Story = {
    render: (args) => (
        <div style={{ display: 'grid', gap: 12 }}>
            {(
                [
                    'positive',
                    'primary',
                    'accent',
                    'warning',
                    'danger',
                    'info',
                ] as const
            ).map((tone) => (
                <Progress key={tone} {...args} tone={tone} />
            ))}
        </div>
    ),
};

export const Sizes: Story = {
    render: (args) => (
        <div style={{ display: 'grid', gap: 12 }}>
            {(['small', 'medium', 'large'] as const).map((size) => (
                <Progress key={size} {...args} size={size} />
            ))}
        </div>
    ),
};

export const Segments: Story = {
    args: {
        segments: [
            { value: 50, tone: 'primary', label: 'Mortgage' },
            { value: 30, tone: 'accent', label: 'Repairs' },
            { value: 20, tone: 'info', label: 'Fees' },
        ],
    },
};
