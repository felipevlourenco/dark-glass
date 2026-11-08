import { render, screen } from '@testing-library/react';
import { PageHeader } from './PageHeader';

describe('PageHeader', () => {
    it('is the page heading, with description and actions', () => {
        render(
            <PageHeader
                title="Investor desk"
                description="7 homes"
                actions={<button>Add property</button>}
            />,
        );
        expect(
            screen.getByRole('heading', { level: 1, name: 'Investor desk' }),
        ).toBeInTheDocument();
        expect(screen.getByText('7 homes')).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Add property' }),
        ).toBeInTheDocument();
    });
});
