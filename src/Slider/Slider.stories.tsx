import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from './Slider';

const meta = {
    title: 'Components/Slider',
    component: Slider,
    tags: ['autodocs'],
    args: { label: 'Loan to value', defaultValue: 50, format: (v) => `${v}%` },
    decorators: [
        (Story) => (
            <div style={{ width: 320 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Slider>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Stepped: Story = {
    args: {
        label: 'Term',
        min: 5,
        max: 40,
        step: 5,
        defaultValue: 30,
        format: (v) => `${v} years`,
    },
};
export const Disabled: Story = { args: { disabled: true } };
