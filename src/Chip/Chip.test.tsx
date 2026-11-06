import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Chip } from './Chip';

describe('Chip', () => {
    it('is static text without onClick', () => {
        render(<Chip>Soho</Chip>);
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
        expect(screen.getByText('Soho')).toBeInTheDocument();
    });

    it('is a toggle button with onClick', async () => {
        const onClick = vi.fn();
        render(
            <Chip selected onClick={onClick}>
                Soho
            </Chip>,
        );
        const chip = screen.getByRole('button', { name: 'Soho' });
        expect(chip).toHaveAttribute('aria-pressed', 'true');
        expect(chip).toHaveClass('is-selected');
        await userEvent.click(chip);
        expect(onClick).toHaveBeenCalledOnce();
    });

    it('omits aria-pressed when selected is not given', () => {
        render(<Chip onClick={() => {}}>Soho</Chip>);
        expect(screen.getByRole('button')).not.toHaveAttribute('aria-pressed');
    });
});
