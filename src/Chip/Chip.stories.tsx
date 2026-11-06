import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Chip } from './Chip';

const meta = {
    title: 'Components/Chip',
    component: Chip,
    tags: ['autodocs'],
    args: { children: 'Málaga' },
} satisfies Meta<typeof Chip>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithIcon: Story = { args: { icon: 'tag' } };
export const Selected: Story = { args: { selected: true, onClick: () => {} } };

function FilterChips() {
    const [on, setOn] = useState('All');
    return (
        <div style={{ display: 'flex', gap: 8 }}>
            {['All', 'Let', 'Empty', 'Late'].map((label) => (
                <Chip
                    key={label}
                    selected={on === label}
                    onClick={() => setOn(label)}
                >
                    {label}
                </Chip>
            ))}
        </div>
    );
}

export const Filters: Story = { render: () => <FilterChips /> };
