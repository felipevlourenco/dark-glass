import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from '../Avatar/Avatar';
import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';
import { TopBar } from './TopBar';

const meta = {
    title: 'Components/TopBar',
    component: TopBar,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
    args: {
        breadcrumb: (
            <>
                Good morning, Felipe · <b>Desk</b>
            </>
        ),
        searchPlaceholder: 'Search homes, cities, tenants…',
        children: (
            <>
                <IconButton icon="bell" label="Notifications" badge={3} />
                <Button leadingIcon="plus">New</Button>
                <Avatar name="Felipe Lourenço" />
            </>
        ),
    },
} satisfies Meta<typeof TopBar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
