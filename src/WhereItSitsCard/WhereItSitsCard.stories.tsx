import type { Meta, StoryObj } from '@storybook/react-vite';
import { WhereItSitsCard } from './WhereItSitsCard';
import { cities, menu } from '../showcase/investor.data';

const meta = {
    title: 'Components/WhereItSitsCard',
    component: WhereItSitsCard,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
    args: { description: 'Value by city', segments: cities, menu },
    decorators: [
        (Story) => (
            <div style={{ width: 400 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof WhereItSitsCard>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
