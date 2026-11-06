import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from '../IconButton/IconButton';
import { Tooltip } from './Tooltip';

const meta = {
    title: 'Components/Tooltip',
    component: Tooltip,
    tags: ['autodocs'],
    args: {
        label: 'Share this home',
        children: <IconButton icon="share" label="Share" />,
    },
    decorators: [
        (Story) => (
            <div style={{ padding: 48 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Tooltip>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Below: Story = { args: { placement: 'bottom' } };
export const AlwaysOpen: Story = { args: { open: true } };
