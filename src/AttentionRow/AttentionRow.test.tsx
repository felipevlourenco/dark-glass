import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AttentionRow, type AttentionItem } from './AttentionRow';

const item: AttentionItem = {
    id: 1,
    icon: 'alert',
    tone: 'danger',
    title: 'Late · €1,880',
    description: 'Mei Chen · Alfama Lofts',
    action: { label: 'Remind' },
};

describe('AttentionRow', () => {
    it('shows the text and an outline action, and reports the item on click', async () => {
        const onAction = vi.fn();
        render(<AttentionRow item={item} onAction={onAction} />);
        expect(screen.getByText('Late · €1,880')).toBeInTheDocument();
        expect(screen.getByText('Mei Chen · Alfama Lofts')).toBeInTheDocument();
        const button = screen.getByRole('button', { name: 'Remind' });
        expect(button).toHaveClass('dg-btn--outline');
        await userEvent.click(button);
        expect(onAction).toHaveBeenCalledWith(item);
    });

    it('can be a plain row without an action', () => {
        render(<AttentionRow item={{ ...item, action: undefined }} />);
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('uses the primary variant when asked', () => {
        render(
            <AttentionRow
                item={{
                    ...item,
                    action: { label: 'Reply', variant: 'primary' },
                }}
            />,
        );
        expect(screen.getByRole('button', { name: 'Reply' })).toHaveClass(
            'dg-btn--primary',
        );
    });
});
