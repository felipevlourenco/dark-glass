import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';

const options = ['Soho', { value: 'mal', label: 'Málaga' }];

describe('Select', () => {
    it('ties the label to the select and lists the options', () => {
        render(<Select label="City" options={options} />);
        const select = screen.getByLabelText('City');
        expect(screen.getAllByRole('option').map((o) => o.textContent)).toEqual(
            ['Soho', 'Málaga'],
        );
        expect(select).toBeInTheDocument();
    });

    it('shows the placeholder until a choice is made', () => {
        render(
            <Select label="City" options={options} placeholder="Pick one" />,
        );
        expect(screen.getByLabelText('City')).toHaveDisplayValue('Pick one');
    });

    it('reports the chosen value', async () => {
        const onChange = vi.fn();
        render(<Select label="City" options={options} onChange={onChange} />);
        await userEvent.selectOptions(screen.getByLabelText('City'), 'mal');
        expect(onChange).toHaveBeenCalledOnce();
        expect(screen.getByLabelText('City')).toHaveValue('mal');
    });

    it('marks the select invalid and describes it with the error', () => {
        render(<Select label="City" options={options} error="Required" />);
        const select = screen.getByLabelText('City');
        expect(select).toBeInvalid();
        expect(select).toHaveAccessibleDescription('Required');
    });
});
