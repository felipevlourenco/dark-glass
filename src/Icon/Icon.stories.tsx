import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from './Icon';
import { iconNames } from './icons';

const meta = {
    title: 'Components/Icon',
    component: Icon,
    tags: ['autodocs'],
    args: { name: 'search', size: 18 },
    argTypes: { name: { control: 'select', options: iconNames } },
} satisfies Meta<typeof Icon>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const All: Story = {
    render: (args) => (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 96px)',
                gap: 16,
            }}
        >
            {iconNames.map((name) => (
                <div
                    key={name}
                    className="caption"
                    style={{ display: 'grid', justifyItems: 'center', gap: 6 }}
                >
                    <Icon {...args} name={name} size={24} />
                    {name}
                </div>
            ))}
        </div>
    ),
};
