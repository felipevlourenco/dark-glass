import type { Meta, StoryObj } from '@storybook/react-vite';
import { PropertiesCard } from './PropertiesCard';
import { properties } from '../showcase/investor.data';
import { Button } from '../Button/Button';

const meta = {
    title: 'Components/PropertiesCard',
    component: PropertiesCard,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
    args: {
        properties,
        action: (
            <Button size="small" variant="ghost" trailingIcon="chevron-right">
                Add
            </Button>
        ),
    },
    decorators: [
        (Story) => (
            <div style={{ width: 400 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof PropertiesCard>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
