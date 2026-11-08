import type { Meta, StoryObj } from '@storybook/react-vite';
import { ListingCard } from './ListingCard';

const meta = {
    title: 'Components/ListingCard',
    component: ListingCard,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
    args: {
        name: 'Alfama Loft',
        place: 'Alfama, Lisbon',
        price: '€295,000',
        badge: { label: '6.0% yield', tone: 'positive' },
        tags: ['New listing', 'Short-let licence'],
        details: '1 bd · 1 ba · 62 m²',
        rent: '€1,480/mo',
        onSave: () => {},
    },
    decorators: [
        (Story) => (
            <div style={{ width: 260 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof ListingCard>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Saved: Story = { args: { saved: true } };
