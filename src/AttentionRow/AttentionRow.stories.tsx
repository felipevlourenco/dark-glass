import type { Meta, StoryObj } from '@storybook/react-vite';
import { AttentionRow } from './AttentionRow';
import { attention } from '../showcase/investor.data';

const meta = {
    title: 'Components/AttentionRow',
    component: AttentionRow,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
    args: { item: attention[3] },
    decorators: [
        (Story) => (
            <div style={{ width: 400 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof AttentionRow>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
