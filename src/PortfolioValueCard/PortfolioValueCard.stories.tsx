import type { Meta, StoryObj } from '@storybook/react-vite';
import { PortfolioValueCard } from './PortfolioValueCard';

const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];
const END = 5_165_380;

const range = (id: string, n: number, start: number, since: string) => ({
    id,
    since,
    data: Array.from({ length: n }, (_, i) =>
        i === n - 1
            ? END
            : start +
              ((END - start) * i) / (n - 1) +
              Math.sin(i * 1.7) * 14_000,
    ),
    // The current month is November (index 10).
    labels: Array.from(
        { length: n },
        (_, i) => MONTHS[(((10 - (n - 1 - i)) % 12) + 12) % 12],
    ),
});

const meta = {
    title: 'Components/PortfolioValueCard',
    component: PortfolioValueCard,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    args: {
        description: 'Every home at today’s valuation',
        value: '€5,165,380',
        formatTick: (t: number) => `€${(t / 1e6).toFixed(2)}M`,
        formatValue: (v: number) => `€${Math.round(v).toLocaleString('en-GB')}`,
        ranges: [
            range('6M', 6, 5.081e6, 'May'),
            range('1Y', 12, 5.064e6, 'Nov'),
            range('2Y', 24, 4.78e6, 'Nov 2024'),
        ],
        menu: [
            { label: 'Download as CSV', icon: 'download' },
            { label: 'Share', icon: 'share' },
        ],
        stats: [
            {
                icon: 'download',
                label: 'Rent a month',
                value: '€24,950',
                note: '€8,100 left after loans',
                tone: 'positive',
            },
            {
                icon: 'chart',
                label: 'Equity',
                value: '€2.61M',
                note: '50% owned',
                tone: 'info',
            },
            {
                icon: 'home',
                label: 'Occupancy',
                value: '93%',
                note: '1 empty',
                tone: 'warning',
            },
            {
                icon: 'tag',
                label: 'Net yield',
                value: '3.6%',
                note: 'target 5.5%',
                tone: 'accent',
            },
        ],
    },
    decorators: [
        (Story) => (
            <div
                style={{
                    minHeight: '100vh',
                    padding: 24,
                    background:
                        'radial-gradient(90% 120% at 12% 0%, var(--bg-wash), transparent 70%), var(--bg)',
                }}
            >
                <div style={{ maxWidth: 720 }}>
                    <Story />
                </div>
            </div>
        ),
    ],
} satisfies Meta<typeof PortfolioValueCard>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
