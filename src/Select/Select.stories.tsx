import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const meta = {
    title: 'Components/Select',
    component: Select,
    tags: ['autodocs'],
    args: {
        label: 'City',
        placeholder: 'Choose a city',
        options: ['Málaga', 'Lisbon', 'Porto', 'Valencia'],
    },
    decorators: [
        (Story) => (
            <div style={{ width: 320 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Select>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithHint: Story = { args: { hint: 'Where the home is' } };
export const WithError: Story = { args: { error: 'Choose a city' } };
export const Disabled: Story = { args: { disabled: true } };
