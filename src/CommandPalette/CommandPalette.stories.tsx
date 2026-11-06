import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import { Kbd } from '../Kbd/Kbd';
import { CommandPalette } from './CommandPalette';

const meta = {
    title: 'Components/CommandPalette',
    component: CommandPalette,
    tags: ['autodocs'],
    args: {
        open: false,
        groups: [
            {
                label: 'Go to',
                items: [
                    { label: 'Overview', icon: 'home', hint: 'Page' },
                    { label: 'Portfolio', icon: 'portfolio', hint: 'Page' },
                    { label: 'Reports', icon: 'chart', hint: 'Page' },
                ],
            },
            {
                label: 'Actions',
                items: [
                    { label: 'Add property', icon: 'plus', shortcut: 'N' },
                    { label: 'Toggle theme', icon: 'moon' },
                ],
            },
        ],
    },
    parameters: { layout: 'padded' },
} satisfies Meta<typeof CommandPalette>;
export default meta;

type Story = StoryObj<typeof meta>;

function Demo(args: React.ComponentProps<typeof CommandPalette>) {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
                event.preventDefault();
                setOpen(true);
            }
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, []);
    return (
        <>
            <Button variant="secondary" onClick={() => setOpen(true)}>
                Open palette <Kbd>⌘K</Kbd>
            </Button>
            <CommandPalette
                {...args}
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
}

export const Default: Story = { render: (args) => <Demo {...args} /> };
