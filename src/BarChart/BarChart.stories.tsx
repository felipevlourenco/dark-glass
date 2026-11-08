import type { Meta, StoryObj } from '@storybook/react-vite';
import { BarChart } from './BarChart';

const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

const meta = {
    title: 'Charts/BarChart',
    component: BarChart,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
    args: {
        label: 'Monthly loan repayments, April to October',
        formatTick: (t: number) => `€${t / 1000}k`,
        rows: months.map((label, i) => ({
            label,
            total: 4180 + i * 10,
            part: 1710 + i * 12,
            current: i === months.length - 1,
        })),
    },
    decorators: [
        (Story) => (
            <div style={{ width: 420 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof BarChart>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
