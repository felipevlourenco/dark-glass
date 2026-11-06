import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast, ToastRegion } from './Toast';

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
    args: { tone: 'info', action: 'Undo', onClose: () => {} },
};

export const Region: Story = {
    parameters: { layout: 'fullscreen' },
    render: () => (
        <ToastRegion>
            <Toast tone="positive" title="Rent received" onClose={() => {}} />
            <Toast tone="warning" title="1 home is empty" action="View" />
        </ToastRegion>
    ),
};
