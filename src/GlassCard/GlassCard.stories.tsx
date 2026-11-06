import type { Meta, StoryObj } from '@storybook/react-vite';
import { GlassCard } from './GlassCard';

// Glass needs something behind it to blur.
const Stage = ({ children }: { children: React.ReactNode }) => (
    <div
        style={{
            minHeight: '100vh',
            display: 'grid',
            placeItems: 'center',
            background:
                'radial-gradient(90% 120% at 12% 0%, var(--bg-wash), transparent 70%), var(--bg)',
        }}
    >
        {children}
    </div>
);

const meta = {
    title: 'Components/GlassCard',
    component: GlassCard,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' },
    args: { children: 'Portfolio value' },
    decorators: [
        (Story) => (
            <Stage>
                <Story />
            </Stage>
        ),
    ],
} satisfies Meta<typeof GlassCard>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => (
        <GlassCard {...args} style={{ width: 280 }}>
            <div className="title">Portfolio value</div>
            <div className="caption" style={{ color: 'var(--text-muted)' }}>
                7 homes in 6 cities
            </div>
            <div className="metric" style={{ margin: '12px 0' }}>
                €5,165,380
            </div>
            <GlassCard tone="inset">
                <span className="caption">+2.0% since Dec</span>
            </GlassCard>
        </GlassCard>
    ),
};

export const Tones: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: 16 }}>
            {(['default', 'raised', 'inset', 'overlay'] as const).map(
                (tone) => (
                    <GlassCard key={tone} tone={tone} style={{ width: 140 }}>
                        {tone}
                    </GlassCard>
                ),
            )}
        </div>
    ),
};
