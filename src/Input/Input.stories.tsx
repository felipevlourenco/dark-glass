import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta = {
    title: 'Components/Input',
    component: Input,
    tags: ['autodocs'],
    args: { label: 'Search', placeholder: 'Search homes' },
    decorators: [
        (Story) => (
            <div style={{ width: 320 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Input>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithIconAndKbd: Story = { args: { icon: 'search', kbd: '⌘K' } };
export const WithHint: Story = { args: { hint: 'Name, city or postcode' } };
export const WithError: Story = {
    args: { error: 'Enter at least 2 characters' },
};
export const Disabled: Story = { args: { disabled: true } };
