import { render, screen } from '@testing-library/react';
import { Kbd } from './Kbd';

it('renders a kbd element', () => {
    render(<Kbd>⌘K</Kbd>);
    expect(screen.getByText('⌘K').tagName).toBe('KBD');
});
