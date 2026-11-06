import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import {
    Avatar,
    Badge,
    Button,
    Chip,
    CommandPalette,
    DropdownMenu,
    GlassCard,
    IconButton,
    Input,
    Modal,
    NavItem,
    Progress,
    SegmentedControl,
    Select,
    Slider,
    Switch,
    Toast,
    ToastRegion,
    Tooltip,
} from '../index';

const meta = {
    title: 'Showcase/Dashboard',
    parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

const muted = { color: 'var(--text-muted)' } as const;
const stack = (gap: number) =>
    ({ display: 'flex', flexDirection: 'column', gap }) as const;
const between = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
} as const;

const arrears = [
    {
        home: 'Flat 3, Soho',
        note: '9 days overdue',
        tone: 'danger',
        word: 'Late',
    },
    {
        home: 'Rua do Sol, Lisbon',
        note: '€600 of €1,200 paid',
        tone: 'warning',
        word: 'Part paid',
    },
    {
        home: 'Calle Larios, Málaga',
        note: 'Empty since 1 Nov',
        tone: 'info',
        word: '1 empty',
    },
] as const;

function Dashboard() {
    const [paletteOpen, setPaletteOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [toasts, setToasts] = useState<string[]>([]);
    const [period, setPeriod] = useState('Year');
    const [filter, setFilter] = useState('All');
    const [reminders, setReminders] = useState(true);

    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
                event.preventDefault();
                setPaletteOpen(true);
            }
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, []);

    const remind = (home: string) =>
        setToasts((list) => [...list, `Reminder sent for ${home}`]);

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'grid',
                gridTemplateColumns: '240px 1fr',
                gap: 24,
                padding: 24,
                boxSizing: 'border-box',
                background:
                    'radial-gradient(90% 120% at 12% 0%, var(--bg-wash), transparent 70%), var(--bg)',
            }}
        >
            <GlassCard
                as="aside"
                tone="raised"
                style={{
                    ...stack(4),
                    alignSelf: 'start',
                    position: 'sticky',
                    top: 24,
                }}
            >
                <div className="title" style={{ padding: '4px 12px 12px' }}>
                    Dark Glass
                </div>
                <span
                    className="eyebrow"
                    style={{ ...muted, padding: '0 12px' }}
                >
                    INVEST
                </span>
                <NavItem label="Overview" icon="home" active />
                <NavItem label="Portfolio" icon="portfolio" count={7} />
                <NavItem label="Reports" icon="chart" />
                <span
                    className="eyebrow"
                    style={{ ...muted, padding: '12px 12px 0' }}
                >
                    PLAN
                </span>
                <NavItem label="Calculators" icon="calc" />
                <NavItem label="Messages" icon="chat" count={2} />
                <span
                    className="eyebrow"
                    style={{ ...muted, padding: '12px 12px 0' }}
                >
                    ACCOUNT
                </span>
                <NavItem label="Settings" icon="settings" />
                <NavItem label="Help" icon="help" />
            </GlassCard>

            <main style={{ ...stack(24), minWidth: 0 }}>
                <header style={between}>
                    <span className="caption" style={muted}>
                        Investor desk / Overview
                    </span>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                        }}
                    >
                        <div style={{ width: 260 }}>
                            <Input
                                icon="search"
                                kbd="⌘K"
                                placeholder="Search homes"
                                aria-label="Search homes"
                                onFocus={(event) => {
                                    event.currentTarget.blur();
                                    setPaletteOpen(true);
                                }}
                            />
                        </div>
                        <Tooltip label="Notifications">
                            <IconButton
                                icon="bell"
                                label="Notifications"
                                badge={3}
                            />
                        </Tooltip>
                        <Button icon="plus" onClick={() => setModalOpen(true)}>
                            New
                        </Button>
                        <Avatar
                            initials="MS"
                            name="Marta Silva"
                            status="online"
                        />
                    </div>
                </header>

                <div style={stack(4)}>
                    <h1 className="display" style={{ margin: 0 }}>
                        Good morning, Marta
                    </h1>
                    <span className="body" style={muted}>
                        7 homes in 6 cities · 14 of 15 units let · 50% borrowed
                        against them
                    </span>
                </div>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: 16,
                    }}
                >
                    <GlassCard style={stack(12)}>
                        <div style={between}>
                            <div>
                                <div className="title">Portfolio value</div>
                                <div className="caption" style={muted}>
                                    Every home at today&apos;s valuation
                                </div>
                            </div>
                            <SegmentedControl
                                label="Period"
                                size="small"
                                tone="neutral"
                                options={['Month', 'Year']}
                                value={period}
                                onChange={setPeriod}
                            />
                        </div>
                        <div
                            className="metric"
                            style={{ fontVariantNumeric: 'tabular-nums' }}
                        >
                            €5,165,380
                        </div>
                        <GlassCard tone="inset" style={between}>
                            <span className="caption">
                                {period === 'Year'
                                    ? '+2.0% since Dec'
                                    : '+0.2% since Oct'}
                            </span>
                            <Badge tone="positive" icon="arrow-up">
                                Up
                            </Badge>
                        </GlassCard>
                    </GlassCard>

                    <GlassCard style={stack(12)}>
                        <div style={between}>
                            <div className="title">Rental yield</div>
                            <Badge tone="accent">target 5.5%</Badge>
                        </div>
                        <div
                            className="metric"
                            style={{ fontVariantNumeric: 'tabular-nums' }}
                        >
                            5.1%
                        </div>
                        <Progress
                            value={5.1}
                            max={5.5}
                            tone="accent"
                            label="Yield against 5.5% target"
                        />
                        <div className="caption" style={muted}>
                            0.4 points to go
                        </div>
                    </GlassCard>

                    <GlassCard style={stack(12)}>
                        <div className="title">Occupancy</div>
                        <div
                            className="metric"
                            style={{ fontVariantNumeric: 'tabular-nums' }}
                        >
                            14 of 15
                        </div>
                        <Progress value={14} max={15} label="Units let" />
                        <div
                            style={{
                                display: 'flex',
                                gap: 8,
                                flexWrap: 'wrap',
                            }}
                        >
                            {['All', 'Let', 'Empty'].map((label) => (
                                <Chip
                                    key={label}
                                    selected={filter === label}
                                    onClick={() => setFilter(label)}
                                >
                                    {label}
                                </Chip>
                            ))}
                        </div>
                    </GlassCard>
                </div>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(340px, 1fr))',
                        gap: 16,
                    }}
                >
                    <GlassCard style={stack(12)}>
                        <div style={between}>
                            <div className="title">Needs you today</div>
                            <DropdownMenu
                                align="end"
                                trigger={
                                    <IconButton
                                        icon="more"
                                        label="More"
                                        variant="ghost"
                                        size="small"
                                    />
                                }
                                items={[
                                    {
                                        label: 'Remind everyone',
                                        icon: 'bell',
                                        onSelect: () => remind('all homes'),
                                    },
                                    {
                                        label: 'Download report',
                                        icon: 'download',
                                    },
                                    { type: 'separator' },
                                    {
                                        label: 'Hide this panel',
                                        icon: 'x',
                                        tone: 'danger',
                                    },
                                ]}
                            />
                        </div>
                        {arrears.map((row) => (
                            <GlassCard
                                key={row.home}
                                tone="inset"
                                style={between}
                            >
                                <div>
                                    <div className="body-sm">{row.home}</div>
                                    <div className="caption" style={muted}>
                                        {row.note}
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                    }}
                                >
                                    <Badge tone={row.tone}>{row.word}</Badge>
                                    {row.tone !== 'info' ? (
                                        <Button
                                            variant="outline"
                                            size="small"
                                            onClick={() => remind(row.home)}
                                        >
                                            Remind
                                        </Button>
                                    ) : null}
                                </div>
                            </GlassCard>
                        ))}
                    </GlassCard>

                    <GlassCard style={stack(16)}>
                        <div className="title">
                            Where a year&apos;s rent goes
                        </div>
                        <Progress
                            size="large"
                            segments={[
                                {
                                    value: 52,
                                    tone: 'primary',
                                    label: 'Mortgage',
                                },
                                { value: 21, tone: 'accent', label: 'Repairs' },
                                {
                                    value: 15,
                                    tone: 'warning',
                                    label: "Letting agent's cut",
                                },
                                { value: 12, tone: 'info', label: 'Insurance' },
                            ]}
                        />
                        <div
                            style={{ ...stack(6), ...muted }}
                            className="caption"
                        >
                            <span>Mortgage · 52%</span>
                            <span>Repairs · 21%</span>
                            <span>Letting agent&apos;s cut · 15%</span>
                            <span>Insurance · 12%</span>
                        </div>
                        <Slider
                            label="Loan to value"
                            defaultValue={50}
                            format={(value) => `${value}%`}
                        />
                        <Switch
                            label="Rent reminders"
                            checked={reminders}
                            onChange={setReminders}
                        />
                    </GlassCard>
                </div>
            </main>

            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Add property"
                description="Add a home to your portfolio."
                footer={
                    <>
                        <Button
                            variant="ghost"
                            onClick={() => setModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                setModalOpen(false);
                                setToasts((list) => [
                                    ...list,
                                    'Property added',
                                ]);
                            }}
                        >
                            Add property
                        </Button>
                    </>
                }
            >
                <div style={stack(16)}>
                    <Input label="Address" placeholder="Street and number" />
                    <Select
                        label="City"
                        placeholder="Choose a city"
                        options={['Málaga', 'Lisbon', 'Porto', 'Valencia']}
                    />
                </div>
            </Modal>

            <CommandPalette
                open={paletteOpen}
                onClose={() => setPaletteOpen(false)}
                groups={[
                    {
                        label: 'Go to',
                        items: [
                            { label: 'Overview', icon: 'home', hint: 'Page' },
                            {
                                label: 'Portfolio',
                                icon: 'portfolio',
                                hint: 'Page',
                            },
                            { label: 'Reports', icon: 'chart', hint: 'Page' },
                        ],
                    },
                    {
                        label: 'Actions',
                        items: [
                            {
                                label: 'Add property',
                                icon: 'plus',
                                shortcut: 'N',
                                onSelect: () => setModalOpen(true),
                            },
                        ],
                    },
                ]}
            />

            <ToastRegion>
                {toasts.map((message, index) => (
                    <Toast
                        key={index}
                        tone="positive"
                        title={message}
                        onClose={() =>
                            setToasts((list) =>
                                list.filter((_, i) => i !== index),
                            )
                        }
                    />
                ))}
            </ToastRegion>
        </div>
    );
}

export const Overview: Story = {
    render: () => <Dashboard />,
    parameters: {
        docs: {
            description: {
                story: 'Most of the library composed into one screen. Press ⌘K for the palette, "New" for the modal and "Remind" for a toast. Switch themes from the toolbar.',
            },
        },
    },
};
