import type { Meta, StoryObj } from '@storybook/react-vite';
import { Kbd } from './Kbd';

const meta = {
    title: 'Components/Kbd',
    component: Kbd,
    tags: ['autodocs'],
    args: { children: '⌘K' },
} satisfies Meta<typeof Kbd>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
