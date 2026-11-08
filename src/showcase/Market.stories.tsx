import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
    Button,
    Chip,
    GlassCard,
    Input,
    ListingCard,
    PageHeader,
    SegmentedControl,
    Select,
    Slider,
} from '../index';
import {
    ANY_PRICE,
    eur,
    facts,
    filterListings,
    listings,
    type ListingFilter,
} from './investor.data';

const meta = {
    title: 'Showcase/Market',
    parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

const cities = ['Lisbon', 'Porto', 'Cascais', 'Málaga', 'Valencia'];
const yields = [
    { min: 0, label: 'Any' },
    { min: 5, label: '5%+' },
    { min: 6, label: '6%+' },
];

const Empty = ({ children }: { children: string }) => (
    <GlassCard>
        <div
            className="body"
            style={{
                padding: '48px 16px',
                textAlign: 'center',
                color: 'var(--text-muted)',
            }}
        >
            {children}
        </div>
    </GlassCard>
);

function Market() {
    const [tab, setTab] = useState('browse');
    const [saved, setSaved] = useState(['a']);
    const [filter, setFilter] = useState<ListingFilter>({
        query: '',
        city: 'all',
        maxPrice: ANY_PRICE,
        minYield: 0,
        sort: 'newest',
    });
    const set = <K extends keyof ListingFilter>(
        key: K,
        value: ListingFilter[K],
    ) => setFilter((f) => ({ ...f, [key]: value }));
    const toggle = (id: string) =>
        setSaved((list) =>
            list.includes(id) ? list.filter((x) => x !== id) : [...list, id],
        );

    const shown =
        tab === 'shortlist'
            ? listings.filter((l) => saved.includes(l.id))
            : filterListings(listings, filter);

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
                title="On the market"
                description={`${listings.length} homes in Portugal and Spain that fit your search`}
                actions={<Button leadingIcon="tag">Make an offer</Button>}
            />
            <SegmentedControl
                label="Market view"
                value={tab}
                onValueChange={setTab}
                options={[
                    { value: 'browse', label: 'Browse' },
                    {
                        value: 'shortlist',
                        label: 'Shortlist',
                        count: saved.length,
                    },
                    { value: 'offers', label: 'Offers', count: 2 },
                ]}
                style={{ alignSelf: 'flex-start' }}
            />

            {tab === 'browse' ? (
                <GlassCard tone="raised">
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns:
                                'repeat(auto-fit, minmax(180px, 1fr))',
                            gap: 16,
                            alignItems: 'end',
                        }}
                    >
                        <Input
                            label="Search"
                            placeholder="Neighbourhood, city…"
                            icon="search"
                            value={filter.query}
                            onChange={(e) => set('query', e.target.value)}
                        />
                        <Select
                            label="City"
                            value={filter.city}
                            onChange={(e) => set('city', e.target.value)}
                            options={[
                                { value: 'all', label: 'All cities' },
                                ...cities,
                            ]}
                        />
                        <Slider
                            label="Up to"
                            min={200000}
                            max={ANY_PRICE}
                            step={10000}
                            value={filter.maxPrice}
                            onValueChange={(v) => set('maxPrice', v)}
                            format={(v) =>
                                v >= ANY_PRICE ? 'any price' : eur(v)
                            }
                        />
                        <div style={{ display: 'flex', gap: 8 }}>
                            {yields.map(({ min, label }) => (
                                <Chip
                                    key={label}
                                    selected={filter.minYield === min}
                                    onClick={() => set('minYield', min)}
                                >
                                    {label}
                                </Chip>
                            ))}
                        </div>
                        <SegmentedControl
                            label="Sort"
                            tone="neutral"
                            size="small"
                            value={filter.sort}
                            onValueChange={(v) =>
                                set('sort', v as ListingFilter['sort'])
                            }
                            options={[
                                { value: 'newest', label: 'Newest' },
                                { value: 'price', label: 'Price' },
                                { value: 'yield', label: 'Yield' },
                            ]}
                        />
                    </div>
                </GlassCard>
            ) : null}

            {tab === 'offers' ? (
                <Empty>
                    2 offers are out. Counter-offers appear on the Desk under
                    “Needs you today”.
                </Empty>
            ) : shown.length ? (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fill, minmax(230px, 1fr))',
                        gap: 16,
                    }}
                >
                    {shown.map((l) => (
                        <ListingCard
                            key={l.id}
                            name={l.name}
                            place={l.place}
                            price={eur(l.price)}
                            badge={{
                                label: `${l.yield.toFixed(1)}% yield`,
                                tone: l.yield >= 5.5 ? 'positive' : 'neutral',
                            }}
                            tags={l.tags}
                            details={facts(l)}
                            rent={`${eur(l.rent)}/mo`}
                            saved={saved.includes(l.id)}
                            onSave={() => toggle(l.id)}
                        />
                    ))}
                </div>
            ) : (
                <Empty>
                    {tab === 'shortlist'
                        ? 'Nothing saved yet. Tap the heart on a listing.'
                        : 'No homes match. Loosen a filter.'}
                </Empty>
            )}
        </div>
    );
}

export const Browse: Story = {
    render: () => <Market />,
    parameters: {
        docs: {
            description: {
                story: 'The Market page: filters, sort, a shortlist and listing cards. Filtering is plain code in the story, not part of the library.',
            },
        },
    },
};
