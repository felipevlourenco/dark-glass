import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { DropdownMenu } from './DropdownMenu';

const meta = {
    title: 'Components/DropdownMenu',
    component: DropdownMenu,
    tags: ['autodocs'],
    args: {
        trigger: (
            <Button variant="secondary" iconRight="chevron-down">
                Actions
            </Button>
        ),
        items: [
            { type: 'label', label: 'Property' },
            { label: 'Edit', icon: 'edit', shortcut: '⌘E' },
            { label: 'Share', icon: 'share' },
            { label: 'Download report', icon: 'download', disabled: true },
            { type: 'separator' },
            { label: 'Remove', icon: 'trash', tone: 'danger' },
        ],
    },
    decorators: [
        (Story) => (
            <div style={{ minHeight: 320 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof DropdownMenu>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AlignedToEnd: Story = {
    args: { align: 'end' },
    decorators: [
        (Story) => (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: 360,
                }}
            >
                <Story />
            </div>
        ),
    ],
};
export const OpenByDefault: Story = { args: { defaultOpen: true } };
