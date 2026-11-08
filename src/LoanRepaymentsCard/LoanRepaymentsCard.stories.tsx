import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoanRepaymentsCard } from './LoanRepaymentsCard';
import { eur, loanRows, menu } from '../showcase/investor.data';

const meta = {
    title: 'Components/LoanRepaymentsCard',
    component: LoanRepaymentsCard,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
    args: {
        description: 'Bar: principal · wash: the whole payment',
        rows: loanRows,
        menu,
        formatTick: (t: number) => `€${t / 1000}k`,
        formatValue: eur,
        chartLabel: 'Monthly loan repayments, April to October',
    },
    decorators: [
        (Story) => (
            <div style={{ width: 440 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof LoanRepaymentsCard>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
