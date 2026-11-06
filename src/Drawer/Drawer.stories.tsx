import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Drawer } from './Drawer';

const meta = {
    title: 'Components/Drawer',
    component: Drawer,
    tags: ['autodocs'],
    args: {
        open: false,
        title: 'Filters',
        description: 'Narrow the homes shown.',
    },
    parameters: { layout: 'padded' },
} satisfies Meta<typeof Drawer>;
export default meta;

type Story = StoryObj<typeof meta>;

function Demo(args: React.ComponentProps<typeof Drawer>) {
    const [open, setOpen] = useState(false);
    const close = () => setOpen(false);
    return (
        <>
            <Button onClick={() => setOpen(true)}>Open drawer</Button>
            <Drawer
                {...args}
                open={open}
                onClose={close}
                footer={
                    <>
                        <Button variant="ghost" onClick={close}>
                            Reset
                        </Button>
                        <Button onClick={close}>Apply</Button>
                    </>
                }
            >
                {Array.from({ length: 30 }, (_, i) => (
                    <p key={i}>Filter option {i + 1}</p>
                ))}
            </Drawer>
        </>
    );
}

export const Right: Story = { render: (args) => <Demo {...args} /> };
export const Left: Story = {
    args: { side: 'left' },
    render: (args) => <Demo {...args} />,
};
