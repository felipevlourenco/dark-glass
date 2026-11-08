import type { Meta, StoryObj } from '@storybook/react-vite';
import { NeedsYouTodayCard } from './NeedsYouTodayCard';
import { attention, menu } from '../showcase/investor.data';

const meta = {
    title: 'Components/NeedsYouTodayCard',
    component: NeedsYouTodayCard,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
    args: {
        description: '6 things',
        items: attention,
        menu,
        summary: {
            label: 'November rent in',
            value: '€19,310',
            of: 'of €24,950',
            progress: 77,
            progressLabel: 'November rent collected',
        },
    },
    decorators: [
        (Story) => (
            <div style={{ width: 400 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof NeedsYouTodayCard>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
