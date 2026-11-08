import type { Meta, StoryObj } from '@storybook/react-vite';
import { Gauge } from './Gauge';

const meta = {
    title: 'Charts/Gauge',
    component: Gauge,
    tags: ['autodocs'],
    args: {
        value: 3.6,
        max: 8,
        label: 'Net yield',
        formatValue: (v: number) => `${v.toFixed(1)}%`,
    },
} satisfies Meta<typeof Gauge>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = { args: { value: 0 } };

export const Full: Story = { args: { value: 8 } };
