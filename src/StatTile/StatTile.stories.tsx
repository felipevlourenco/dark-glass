import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatTile } from './StatTile';

const meta = {
    title: 'Components/StatTile',
    component: StatTile,
    tags: ['autodocs'],
    args: {
        icon: 'home',
        label: 'Occupancy',
        value: '93%',
        note: '1 empty',
        tone: 'warning',
    },
    decorators: [
        (Story) => (
            <div style={{ width: 200 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof StatTile>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Row: Story = {
    decorators: [
        () => (
            <div style={{ display: 'flex', gap: 12 }}>
                <StatTile
                    icon="download"
                    label="Rent a month"
                    value="€24,950"
                    note="€8,100 left after loans"
                    tone="positive"
                />
                <StatTile
                    icon="chart"
                    label="Equity"
                    value="€2.61M"
                    note="50% owned"
                    tone="info"
                />
                <StatTile
                    icon="tag"
                    label="Net yield"
                    value="3.6%"
                    note="target 5.5%"
                    tone="accent"
                />
            </div>
        ),
    ],
};
