import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { PageHeader } from './PageHeader';

const meta = {
    title: 'Components/PageHeader',
    component: PageHeader,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
    args: {
        title: 'Investor desk',
        description: '7 homes in 6 cities · 14 of 15 units let',
        actions: [
            <Button key="s" variant="secondary" leadingIcon="download">
                Statement
            </Button>,
            <Button key="a" leadingIcon="plus">
                Add property
            </Button>,
        ],
    },
} satisfies Meta<typeof PageHeader>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
