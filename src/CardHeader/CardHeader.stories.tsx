import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardHeader } from './CardHeader';
import { CardMenu } from '../CardMenu/CardMenu';
import { menu } from '../showcase/investor.data';

const meta = {
    title: 'Components/CardHeader',
    component: CardHeader,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
    args: {
        title: 'Loan repayments',
        description: 'Last seven months',
        actions: <CardMenu items={menu} />,
    },
    decorators: [
        (Story) => (
            <div style={{ width: 400 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof CardHeader>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
