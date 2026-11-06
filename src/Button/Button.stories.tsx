import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    args: { children: 'Add property', variant: 'primary', size: 'md' },
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

const variants = [
    'primary',
    'secondary',
    'outline',
    'ghost',
    'danger',
] as const;
const sizes = ['sm', 'md', 'lg'] as const;
const row = { display: 'flex', alignItems: 'center', gap: 12 } as const;

export const Default: Story = {};

export const Variants: Story = {
    render: (args) => (
        <div style={row}>
            {variants.map((variant) => (
                <Button key={variant} {...args} variant={variant}>
                    {variant}
                </Button>
            ))}
        </div>
    ),
};

export const Sizes: Story = {
    render: (args) => (
        <div style={row}>
            {sizes.map((size) => (
                <Button key={size} {...args} size={size}>
                    {size}
                </Button>
            ))}
        </div>
    ),
};

export const States: Story = {
    render: (args) => (
        <div style={row}>
            <Button {...args} loading>
                Loading
            </Button>
            <Button {...args} disabled>
                Disabled
            </Button>
        </div>
    ),
};

export const WithIcons: Story = {
    args: { icon: 'plus', iconRight: 'chevron-down' },
};
