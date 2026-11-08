import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';
import {
    AttentionRow,
    Avatar,
    Badge,
    Button,
    CommandPalette,
    GlassCard,
    IconButton,
    LoanRepaymentsCard,
    NeedsYouTodayCard,
    PageHeader,
    Popover,
    PortfolioValueCard,
    PropertiesCard,
    Sidebar,
    Toast,
    ToastRegion,
    TopBar,
    WhereItSitsCard,
    type AttentionItem,
} from '../index';
import { groups } from '../Sidebar/Sidebar.stories';
import {
    attention,
    cities,
    eur,
    eurM,
    loanRows,
    menu,
    portfolioRanges,
    portfolioStats,
    properties,
} from './investor.data';

const meta = {
    title: 'Showcase/InvestorDesk',
    parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

type ToastItem = {
    id: number;
    tone: 'positive' | 'info';
    title: string;
    description?: string;
};

function InvestorDesk() {
    const [view, setView] = useState('desk');
    const [paletteOpen, setPaletteOpen] = useState(false);
    const [toasts, setToasts] = useState<ToastItem[]>([]);
    const nextId = useRef(0);
    const toast = (t: Omit<ToastItem, 'id'>) =>
        setToasts((list) => [...list, { id: nextId.current++, ...t }]);

    const onSelect = (id: string) => {
        if (id === 'desk') return setView(id);
        toast({
            tone: 'info',
            title: 'Not in this demo',
            description: 'Only the Desk is wired up.',
        });
    };
    const onAction = (item: AttentionItem) =>
        toast(
            item.action?.label === 'Remind'
                ? {
                      tone: 'positive',
                      title: 'Reminder sent',
                      description: item.description,
                  }
                : {
                      tone: 'info',
                      title: `${item.action?.label}: ${item.title}`,
                      description: item.description,
                  },
        );

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: '264px minmax(0, 1fr)',
                gap: 24,
                minHeight: '100vh',
                padding: 24,
                boxSizing: 'border-box',
                background:
                    'radial-gradient(70% 90% at 18% 0%, var(--bg-wash), transparent 70%), var(--bg)',
            }}
        >
            <Sidebar
                brand={{ name: 'Hearth', tagline: 'Property investing' }}
                groups={groups}
                active={view}
                onSelect={onSelect}
                onCollapse={() =>
                    toast({
                        tone: 'info',
                        title: 'Sidebar collapse is not in this demo',
                    })
                }
            >
                <GlassCard tone="inset">
                    <div
                        className="caption"
                        style={{ color: 'var(--text-muted)' }}
                    >
                        Net worth in property
                    </div>
                    <div className="heading">€2,678,298</div>
                </GlassCard>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '8px 4px 0',
                    }}
                >
                    <Avatar name="Felipe Lourenço" status="online" />
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="label">Felipe Lourenço</div>
                        <div
                            className="caption"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            Owner · 15 homes
                        </div>
                    </div>
                    <IconButton
                        icon="swap"
                        label="Switch account"
                        variant="ghost"
                        size="small"
                    />
                </div>
            </Sidebar>

            <main
                style={{
                    minWidth: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20,
                }}
            >
                <TopBar
                    breadcrumb={
                        <>
                            Good morning, Felipe · <b>Desk</b>
                        </>
                    }
                    searchPlaceholder="Search homes, cities, tenants…"
                    onSearch={() => setPaletteOpen(true)}
                >
                    <Popover
                        title="Notifications"
                        placement="bottom-end"
                        width={340}
                        action={
                            <Badge tone="primary" count>
                                3
                            </Badge>
                        }
                        trigger={
                            <IconButton
                                icon="bell"
                                label="Notifications"
                                badge={3}
                            />
                        }
                    >
                        {attention.slice(1, 4).map((item) => (
                            <AttentionRow
                                key={item.id}
                                item={{ ...item, action: undefined }}
                            />
                        ))}
                    </Popover>
                    <Button leadingIcon="plus">New</Button>
                    <Avatar name="Felipe Lourenço" />
                </TopBar>

                <PageHeader
                    title="Investor desk"
                    description="7 homes in 6 cities · 14 of 15 units let · 50% borrowed against them"
                    actions={
                        <>
                            <Button
                                variant="secondary"
                                leadingIcon="download"
                                onClick={() =>
                                    toast({
                                        tone: 'positive',
                                        title: 'Statement ready',
                                        description: 'November statement · PDF',
                                    })
                                }
                            >
                                Statement
                            </Button>
                            <Button leadingIcon="plus">Add property</Button>
                        </>
                    }
                />

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'minmax(0, 2fr) minmax(300px, 1fr)',
                        gap: 16,
                        alignItems: 'start',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 16,
                            minWidth: 0,
                        }}
                    >
                        <PortfolioValueCard
                            description="Every home at today’s valuation"
                            value={eur(5_165_380)}
                            ranges={portfolioRanges}
                            defaultRange="1Y"
                            formatTick={eurM}
                            formatValue={eur}
                            stats={portfolioStats}
                            menu={menu}
                        />
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns:
                                    'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: 16,
                            }}
                        >
                            <LoanRepaymentsCard
                                description="Bar: principal · wash: the whole payment"
                                rows={loanRows}
                                chartLabel="Monthly loan repayments, April to October"
                                formatTick={(t) => `€${t / 1000}k`}
                                formatValue={eur}
                                menu={menu}
                            />
                            <WhereItSitsCard
                                description="Value by city"
                                segments={cities}
                                menu={menu}
                            />
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 16,
                            minWidth: 0,
                        }}
                    >
                        <NeedsYouTodayCard
                            description={`${attention.length} things`}
                            summary={{
                                label: 'November rent in',
                                value: '€19,310',
                                of: 'of €24,950',
                                progress: 77,
                                progressLabel: 'November rent collected',
                            }}
                            items={attention}
                            onAction={onAction}
                        />
                        <PropertiesCard
                            properties={properties}
                            action={
                                <Button
                                    size="small"
                                    variant="ghost"
                                    trailingIcon="chevron-right"
                                >
                                    Add
                                </Button>
                            }
                        />
                    </div>
                </div>
            </main>

            <CommandPalette
                open={paletteOpen}
                onClose={() => setPaletteOpen(false)}
                groups={[
                    {
                        label: 'Go to',
                        items: [
                            {
                                label: 'Desk',
                                icon: 'grid',
                                onSelect: () => setView('desk'),
                            },
                        ],
                    },
                    {
                        label: 'Actions',
                        items: [
                            {
                                label: 'Download statement',
                                icon: 'download',
                                onSelect: () =>
                                    toast({
                                        tone: 'positive',
                                        title: 'Statement ready',
                                    }),
                            },
                        ],
                    },
                ]}
            />
            <ToastRegion>
                {toasts.map(({ id, ...t }) => (
                    <Toast
                        key={id}
                        {...t}
                        onDismiss={() =>
                            setToasts((list) => list.filter((x) => x.id !== id))
                        }
                    />
                ))}
            </ToastRegion>
        </div>
    );
}

export const Desk: Story = {
    render: () => <InvestorDesk />,
    parameters: {
        docs: {
            description: {
                story: 'The Investor desk from the design system, assembled from library components. Hover or arrow through the charts, press "Remind" for a toast and click the search box for the palette. Switch themes from the toolbar.',
            },
        },
    },
};
