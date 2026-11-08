import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ReactNode } from 'react';
import {
    BarChart,
    Badge,
    Button,
    CardHeader,
    Gauge,
    GlassCard,
    PageHeader,
    Progress,
    SegmentedControl,
    Select,
    Slider,
    StatTile,
    WhereItSitsCard,
} from '../index';
import { mortgage, rentalYield } from './calculators';
import { eur, listings } from './investor.data';

const meta = {
    title: 'Showcase/Calculators',
    parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

const muted = { color: 'var(--text-muted)' } as const;
const pct = (n: number, digits = 1) => `${n.toFixed(digits)}%`;

const Columns = ({
    form,
    results,
}: {
    form: ReactNode;
    results: ReactNode;
}) => (
    <div
        style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 16,
            alignItems: 'start',
        }}
    >
        <GlassCard>{form}</GlassCard>
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                minWidth: 0,
            }}
        >
            {results}
        </div>
    </div>
);

const Sliders = ({ children }: { children: ReactNode }) => (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 22,
            marginTop: 18,
        }}
    >
        {children}
    </div>
);

const Tiles = ({ children }: { children: ReactNode }) => (
    <div
        style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 12,
            marginTop: 16,
        }}
    >
        {children}
    </div>
);

function LoadHome({ onPick }: { onPick: (id: string) => void }) {
    return (
        <Select
            label="Load a home on the market"
            placeholder="Choose a listing…"
            onChange={(e) => onPick(e.target.value)}
            options={listings.map((l) => ({ value: l.id, label: l.name }))}
        />
    );
}

function MortgageView() {
    const [price, setPrice] = useState(420000);
    const [deposit, setDeposit] = useState(30);
    const [rate, setRate] = useState(3.4);
    const [years, setYears] = useState(30);
    const m = mortgage({ price, depositPercent: deposit, rate, years });
    const share = (n: number) => pct((n / m.total) * 100, 0);

    return (
        <Columns
            form={
                <>
                    <div className="title">Your loan</div>
                    <Sliders>
                        <LoadHome
                            onPick={(id) => {
                                const home = listings.find((l) => l.id === id);
                                if (home) setPrice(home.price);
                            }}
                        />
                        <Slider
                            label="Home price"
                            min={100000}
                            max={900000}
                            step={5000}
                            value={price}
                            onValueChange={setPrice}
                            format={eur}
                        />
                        <Slider
                            label="Deposit"
                            min={5}
                            max={60}
                            step={1}
                            value={deposit}
                            onValueChange={setDeposit}
                            format={(v) => `${v}% · ${eur((price * v) / 100)}`}
                        />
                        <Slider
                            label="Interest rate"
                            min={0.5}
                            max={8}
                            step={0.1}
                            value={rate}
                            onValueChange={setRate}
                            format={(v) => pct(v)}
                        />
                        <Slider
                            label="Term"
                            min={5}
                            max={40}
                            step={1}
                            value={years}
                            onValueChange={setYears}
                            format={(v) => `${v} years`}
                        />
                    </Sliders>
                </>
            }
            results={
                <>
                    <GlassCard>
                        <div className="caption" style={muted}>
                            Each month
                        </div>
                        <div className="metric" style={{ margin: '4px 0' }}>
                            {eur(m.payment)}
                        </div>
                        <div className="caption" style={muted}>
                            for {years} years
                        </div>
                        <Tiles>
                            <StatTile
                                icon="download"
                                label="Borrowed"
                                value={eur(m.borrowed)}
                                note={`${100 - deposit}% of price`}
                                tone="info"
                            />
                            <StatTile
                                icon="chart"
                                label="Interest in total"
                                value={eur(m.interest)}
                                note={`${share(m.interest)} of repaid`}
                                tone="warning"
                            />
                            <StatTile
                                icon="tag"
                                label="Total repaid"
                                value={eur(m.total)}
                                note={`over ${years} years`}
                            />
                        </Tiles>
                        <div style={{ marginTop: 16 }}>
                            <Progress
                                label="Principal and interest"
                                segments={[
                                    {
                                        value: m.borrowed,
                                        tone: 'positive',
                                        label: 'Principal',
                                    },
                                    {
                                        value: m.interest,
                                        tone: 'primary',
                                        label: 'Interest',
                                    },
                                ]}
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    gap: 8,
                                    paddingTop: 12,
                                }}
                            >
                                <Badge tone="positive">
                                    Principal {share(m.borrowed)}
                                </Badge>
                                <Badge tone="danger">
                                    Interest {share(m.interest)}
                                </Badge>
                            </div>
                        </div>
                    </GlassCard>
                    <GlassCard>
                        <CardHeader
                            title="Every five years"
                            description="Years of the loan · bar: what pays it down · wash: the whole payment"
                        />
                        <BarChart
                            label="Principal and interest paid in each five-year block"
                            rows={m.blocks.map((b, i) => ({
                                label: b.label,
                                total: b.principal + b.interest,
                                part: b.principal,
                                current: i === 0,
                            }))}
                            formatTick={(t) => `€${Math.round(t / 1000)}k`}
                            formatValue={eur}
                        />
                    </GlassCard>
                </>
            }
        />
    );
}

const TARGET_YIELD = 5.5;

function YieldView() {
    const [price, setPrice] = useState(348000);
    const [rent, setRent] = useState(1620);
    const [running, setRunning] = useState(210);
    const [weeks, setWeeks] = useState(3);
    const [agent, setAgent] = useState(8);
    const y = rentalYield({
        price,
        rentPerMonth: rent,
        runningPerMonth: running,
        emptyWeeks: weeks,
        agentPercent: agent,
    });

    return (
        <Columns
            form={
                <>
                    <div className="title">The home</div>
                    <Sliders>
                        <LoadHome
                            onPick={(id) => {
                                const home = listings.find((l) => l.id === id);
                                if (!home) return;
                                setPrice(home.price);
                                setRent(home.rent);
                            }}
                        />
                        <Slider
                            label="Price"
                            min={100000}
                            max={900000}
                            step={5000}
                            value={price}
                            onValueChange={setPrice}
                            format={eur}
                        />
                        <Slider
                            label="Rent a month"
                            min={500}
                            max={4000}
                            step={10}
                            value={rent}
                            onValueChange={setRent}
                            format={eur}
                        />
                        <Slider
                            label="Running costs a month"
                            min={0}
                            max={800}
                            step={10}
                            value={running}
                            onValueChange={setRunning}
                            format={eur}
                        />
                        <Slider
                            label="Empty weeks a year"
                            min={0}
                            max={12}
                            step={1}
                            value={weeks}
                            onValueChange={setWeeks}
                            format={(v) => `${v} weeks`}
                        />
                        <Slider
                            label="Letting agent’s cut"
                            min={0}
                            max={15}
                            step={1}
                            value={agent}
                            onValueChange={setAgent}
                            format={(v) => `${v}%`}
                        />
                    </Sliders>
                </>
            }
            results={
                <>
                    <GlassCard>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'auto minmax(0, 1fr)',
                                gap: 20,
                                alignItems: 'center',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 4,
                                }}
                            >
                                <Gauge
                                    value={Math.max(y.netYield, 0)}
                                    max={8}
                                    label="Net yield"
                                    formatValue={(v) => pct(v)}
                                />
                                <Badge
                                    tone={
                                        y.netYield >= TARGET_YIELD
                                            ? 'positive'
                                            : 'accent'
                                    }
                                >
                                    target {pct(TARGET_YIELD)}
                                </Badge>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 12,
                                }}
                            >
                                <StatTile
                                    icon="chart"
                                    label="Gross yield"
                                    value={pct(y.grossYield)}
                                    note="before costs"
                                />
                                <StatTile
                                    icon="download"
                                    label="Cash a month, after costs"
                                    value={eur(y.keep / 12)}
                                    note={
                                        y.keep > 0
                                            ? 'in your pocket'
                                            : 'you are paying'
                                    }
                                    tone={y.keep > 0 ? 'positive' : 'danger'}
                                />
                                <Button leadingIcon="tag">
                                    Make an offer on it
                                </Button>
                            </div>
                        </div>
                    </GlassCard>
                    <WhereItSitsCard
                        title="Where a year’s rent goes"
                        description={`${eur(y.gross)} of rent before anything comes out`}
                        segments={[
                            {
                                label: 'Yours to keep',
                                value: Math.max(y.keep, 0.01),
                                tone: 'positive',
                                amount: eur(y.keep),
                            },
                            {
                                label: 'Running costs',
                                value: y.running,
                                tone: 'neutral',
                                amount: eur(y.running),
                            },
                            {
                                label: 'Letting agent',
                                value: y.agent,
                                tone: 'accent',
                                amount: eur(y.agent),
                            },
                            {
                                label: 'Lost to empty weeks',
                                value: y.lost,
                                tone: 'primary',
                                amount: eur(y.lost),
                            },
                        ]}
                    />
                </>
            }
        />
    );
}

function Calculators() {
    const [tab, setTab] = useState('mortgage');
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                minHeight: '100vh',
                padding: 24,
                boxSizing: 'border-box',
                background:
                    'radial-gradient(70% 90% at 18% 0%, var(--bg-wash), transparent 70%), var(--bg)',
            }}
        >
            <PageHeader
                title={tab === 'mortgage' ? 'Mortgage' : 'Rental yield'}
                description={
                    tab === 'mortgage'
                        ? 'What a loan costs each month, and in total'
                        : 'What a home really earns once the costs come out'
                }
            />
            <SegmentedControl
                label="Calculator"
                value={tab}
                onValueChange={setTab}
                options={[
                    { value: 'mortgage', label: 'Mortgage' },
                    { value: 'yield', label: 'Rental yield' },
                ]}
                style={{ alignSelf: 'flex-start' }}
            />
            {tab === 'mortgage' ? <MortgageView /> : <YieldView />}
        </div>
    );
}

export const Overview: Story = {
    render: () => <Calculators />,
    parameters: {
        docs: {
            description: {
                story: 'Two slider-driven calculators: a mortgage and a rental yield. The maths lives in the story folder (`calculators.ts`) and is tested there; the library only supplies the display.',
            },
        },
    },
};
