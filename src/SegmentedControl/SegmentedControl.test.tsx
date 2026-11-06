import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SegmentedControl } from './SegmentedControl';

const options = ['Month', 'Quarter', 'Year'];

describe('SegmentedControl', () => {
    it('is a named radio group with the first option selected', () => {
        render(<SegmentedControl label="Period" options={options} />);
        expect(
            screen.getByRole('radiogroup', { name: 'Period' }),
        ).toBeInTheDocument();
        expect(screen.getByRole('radio', { name: 'Month' })).toBeChecked();
    });

    it('selects on click and reports the value', async () => {
        const onChange = vi.fn();
        render(<SegmentedControl options={options} onChange={onChange} />);
        await userEvent.click(screen.getByRole('radio', { name: 'Year' }));
        expect(onChange).toHaveBeenCalledWith('Year');
        expect(screen.getByRole('radio', { name: 'Year' })).toBeChecked();
    });

    it('moves with the arrow keys, wrapping around', async () => {
        render(<SegmentedControl options={options} />);
        screen.getByRole('radio', { name: 'Month' }).focus();
        await userEvent.keyboard('{ArrowLeft}');
        expect(screen.getByRole('radio', { name: 'Year' })).toBeChecked();
        expect(screen.getByRole('radio', { name: 'Year' })).toHaveFocus();
        await userEvent.keyboard('{ArrowRight}');
        expect(screen.getByRole('radio', { name: 'Month' })).toBeChecked();
    });

    it('keeps only the selected option in the tab order', () => {
        render(<SegmentedControl options={options} defaultValue="Quarter" />);
        expect(screen.getByRole('radio', { name: 'Quarter' })).toHaveAttribute(
            'tabindex',
            '0',
        );
        expect(screen.getByRole('radio', { name: 'Month' })).toHaveAttribute(
            'tabindex',
            '-1',
        );
    });

    it('shows counts', () => {
        render(
            <SegmentedControl
                options={[{ value: 'late', label: 'Late', count: 2 }]}
            />,
        );
        expect(screen.getByText('2')).toBeInTheDocument();
    });
});
