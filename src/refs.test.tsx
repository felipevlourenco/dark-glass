import { cloneElement, createRef, type ReactElement } from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from './Button/Button';
import { IconButton } from './IconButton/IconButton';
import { Input } from './Input/Input';
import { Select } from './Select/Select';
import { Slider } from './Slider/Slider';
import { Switch } from './Switch/Switch';

describe('refs', () => {
    it.each([
        ['Button', <Button key="b">Go</Button>, 'BUTTON'],
        [
            'IconButton',
            <IconButton key="i" icon="plus" label="Add" />,
            'BUTTON',
        ],
        ['Switch', <Switch key="s" label="On" />, 'BUTTON'],
        ['Input', <Input key="n" label="Name" />, 'INPUT'],
        ['Select', <Select key="l" label="City" options={['A']} />, 'SELECT'],
        ['Slider', <Slider key="r" label="Price" />, 'INPUT'],
    ])('%s forwards its ref to the native element', (_, element, tag) => {
        const ref = createRef<HTMLElement>();
        render(
            cloneElement(element as ReactElement<{ ref?: unknown }>, { ref }),
        );
        expect(ref.current?.tagName).toBe(tag);
    });

    it('lets a parent focus an Input through the ref', () => {
        const ref = createRef<HTMLInputElement>();
        render(<Input ref={ref} label="Name" />);
        ref.current?.focus();
        expect(screen.getByLabelText('Name')).toHaveFocus();
    });
});
