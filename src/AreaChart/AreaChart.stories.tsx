import type { Meta, StoryObj } from '@storybook/react-vite';
import { AreaChart } from './AreaChart';

const meta = {
    title: 'Charts/AreaChart',
    component: AreaChart,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
    args: {
        label: 'Portfolio value, last six months',
        data: [5.08e6, 5.09e6, 5.11e6, 5.1e6, 5.14e6, 5.165e6],
        labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
        formatTick: (t: number) => `€${(t / 1e6).toFixed(2)}M`,
    },
    decorators: [
        (Story) => (
            <div style={{ width: 560 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof AreaChart>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TwoYears: Story = {
    args: {
        label: 'Portfolio value, two years',
        data: Array.from({ length: 24 }, (_, i) => 4.78e6 + i * 16_800),
        labels: Array.from({ length: 24 }, (_, i) => `M${i + 1}`),
    },
};
