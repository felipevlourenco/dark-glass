import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Modal } from './Modal';

const meta = {
    title: 'Components/Modal',
    component: Modal,
    tags: ['autodocs'],
    args: {
        open: false,
        title: 'Remove property',
        description: 'Soho, Málaga will leave your portfolio.',
    },
    parameters: { layout: 'padded' },
} satisfies Meta<typeof Modal>;
export default meta;

type Story = StoryObj<typeof meta>;

function Demo(args: React.ComponentProps<typeof Modal>) {
    const [open, setOpen] = useState(false);
    const close = () => setOpen(false);
    return (
        <>
            <Button onClick={() => setOpen(true)}>Open modal</Button>
            <Modal
                {...args}
                open={open}
                onClose={close}
                footer={
                    <>
                        <Button variant="ghost" onClick={close}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={close}>
                            Remove
                        </Button>
                    </>
                }
            >
                Its rent history stays in your reports.
            </Modal>
        </>
    );
}

export const Default: Story = { render: (args) => <Demo {...args} /> };
export const Large: Story = {
    args: { size: 'large' },
    render: (args) => <Demo {...args} />,
};
