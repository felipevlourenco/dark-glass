import type { Meta, StoryObj } from '@storybook/react-vite';
import { GlassCard } from '../GlassCard/GlassCard';
import { CardMenu } from './CardMenu';

const meta = {
    title: 'Components/CardMenu',
    component: CardMenu,
    tags: ['autodocs'],
    args: {
        items: [
            { label: 'Download as CSV', icon: 'download' },
            { label: 'Share', icon: 'share' },
            { type: 'separator' },
            { label: 'Hide card', icon: 'x' },
        ],
    },
    decorators: [
        (Story) => (
            <div style={{ minHeight: 240, width: 320 }}>
                <GlassCard
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <span className="title">Loan repayments</span>
                    <Story />
                </GlassCard>
            </div>
        ),
    ],
} satisfies Meta<typeof CardMenu>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
