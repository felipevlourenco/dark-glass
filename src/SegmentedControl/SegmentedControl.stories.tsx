import type { Meta, StoryObj } from '@storybook/react-vite';
import { SegmentedControl } from './SegmentedControl';

const meta = {
    title: 'Components/SegmentedControl',
    component: SegmentedControl,
    tags: ['autodocs'],
    args: { label: 'Period', options: ['Month', 'Quarter', 'Year'] },
} satisfies Meta<typeof SegmentedControl>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Neutral: Story = { args: { tone: 'neutral' } };
export const Small: Story = { args: { size: 'small' } };
export const WithCounts: Story = {
    args: {
        options: [
            { value: 'all', label: 'All', count: 15 },
            { value: 'late', label: 'Late', count: 2 },
            { value: 'empty', label: 'Empty', count: 1 },
        ],
    },
};
