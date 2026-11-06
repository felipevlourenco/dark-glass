import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { Popover } from './Popover';

const meta = {
    title: 'Components/Popover',
    component: Popover,
    tags: ['autodocs'],
    args: {
        trigger: <Button variant="secondary">Rent details</Button>,
        title: 'Rent due',
        children: '€1,450 a month, due on the 1st. Paid through the agent.',
    },
    decorators: [
        (Story) => (
            <div style={{ minHeight: 240 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Popover>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithAction: Story = {
    args: {
        action: (
            <Button size="small" variant="outline">
                Remind
            </Button>
        ),
    },
};
export const OpenByDefault: Story = { args: { defaultOpen: true } };
