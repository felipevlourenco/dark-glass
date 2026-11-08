import { render, screen } from '@testing-library/react';
import { LoanRepaymentsCard } from './LoanRepaymentsCard';

describe('LoanRepaymentsCard', () => {
    it('names the chart after the title unless told otherwise', () => {
        const rows = [{ label: 'Apr', total: 4180, part: 1710 }];
        const { rerender } = render(<LoanRepaymentsCard rows={rows} />);
        expect(
            screen.getByRole('img', { name: 'Loan repayments' }),
        ).toBeInTheDocument();
        rerender(
            <LoanRepaymentsCard rows={rows} chartLabel="April repayment" />,
        );
        expect(
            screen.getByRole('img', { name: 'April repayment' }),
        ).toBeInTheDocument();
    });
});
