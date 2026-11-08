import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';
import { Button } from '../Button/Button';
import { Toast, ToastRegion } from './Toast';
import { ToastProvider } from './ToastProvider';
import { useToasts } from './useToasts';

const meta = {
    title: 'Components/Toast',
    component: Toast,
    tags: ['autodocs'],
    args: { title: 'Rent received', description: 'Soho, Málaga · €1,450' },
    decorators: [
        (Story) => (
            <div style={{ width: 380 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Toast>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Positive: Story = { args: { tone: 'positive' } };
export const Danger: Story = {
    args: {
        tone: 'danger',
        title: 'Payment late',
        description: 'Due 3 days ago',
    },
};
export const WithActionAndDismiss: Story = {
    args: { tone: 'info', action: 'Undo', onDismiss: () => {} },
};

export const Region: Story = {
    parameters: { layout: 'fullscreen' },
    render: () => (
        <ToastRegion>
            <Toast tone="positive" title="Rent received" onDismiss={() => {}} />
            <Toast tone="warning" title="1 home is empty" action="View" />
        </ToastRegion>
    ),
};

function AutoDismissDemo() {
    const [toasts, setToasts] = useState<number[]>([]);
    const next = useRef(0);
    return (
        <>
            <Button
                onClick={() => setToasts((list) => [...list, next.current++])}
            >
                Show toast
            </Button>
            <ToastRegion>
                {toasts.map((id) => (
                    <Toast
                        key={id}
                        tone="positive"
                        title="Rent received"
                        description="Gone in 5 seconds. Hover to keep it."
                        duration={5000}
                        onDismiss={() =>
                            setToasts((list) => list.filter((n) => n !== id))
                        }
                    />
                ))}
            </ToastRegion>
        </>
    );
}

export const AutoDismiss: Story = {
    render: () => <AutoDismissDemo />,
};

function QueueDemo() {
    const { toast } = useToasts();
    const count = useRef(0);
    return (
        <Button
            onClick={() =>
                toast({
                    tone: 'info',
                    title: `Toast ${++count.current}`,
                    description: 'Only three show at once.',
                })
            }
        >
            Add a toast
        </Button>
    );
}

export const Queue: Story = {
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                story: '`ToastProvider` keeps the list for you. Click fast: past three, toasts wait and their timers start when they appear.',
            },
        },
    },
    render: () => (
        <ToastProvider limit={3}>
            <div style={{ padding: 24 }}>
                <QueueDemo />
            </div>
        </ToastProvider>
    ),
};
