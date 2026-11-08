// Sample data for the Investor desk stories. All of it is fictional.
import type {
    AttentionItem,
    MenuItem,
    PropertyRow,
    StatTileProps,
    WhereItSitsSegment,
} from '../index';

export const eur = (n: number) => `€${Math.round(n).toLocaleString('en-GB')}`;
export const eurM = (n: number) => `€${(n / 1e6).toFixed(2)}M`;

const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];
const END = 5_165_380;

/** Portfolio value over the last `n` months, ending in November. */
const range = (id: string, n: number, start: number, since: string) => ({
    id,
    since,
    data: Array.from({ length: n }, (_, i) =>
        i === n - 1
            ? END
            : start +
              ((END - start) * i) / (n - 1) +
              Math.sin(i * 1.7) * 14_000,
    ),
    labels: Array.from(
        { length: n },
        (_, i) => MONTHS[(((10 - (n - 1 - i)) % 12) + 12) % 12],
    ),
});

export const portfolioRanges = [
    range('6M', 6, 5.081e6, 'May'),
    range('1Y', 12, 5.064e6, 'Nov'),
    range('2Y', 24, 4.78e6, 'Nov 2024'),
];

export const portfolioStats: StatTileProps[] = [
    {
        icon: 'download',
        label: 'Rent a month',
        value: '€24,950',
        note: '€8,100 left after loans',
        tone: 'positive',
    },
    {
        icon: 'chart',
        label: 'Equity',
        value: '€2.61M',
        note: '50% owned',
        tone: 'info',
    },
    {
        icon: 'home',
        label: 'Occupancy',
        value: '93%',
        note: '1 empty',
        tone: 'warning',
    },
    {
        icon: 'tag',
        label: 'Net yield',
        value: '3.6%',
        note: 'target 5.5%',
        tone: 'accent',
    },
];

export const attention: AttentionItem[] = [
    {
        id: 1,
        icon: 'alert',
        tone: 'warning',
        title: 'Part paid · €790',
        description: 'Rui Santos · Alfama Lofts',
        action: { label: 'Remind' },
    },
    {
        id: 2,
        icon: 'alert',
        tone: 'danger',
        title: 'Late · €1,880',
        description: 'Mei Chen · Alfama Lofts',
        action: { label: 'Remind' },
    },
    {
        id: 3,
        icon: 'alert',
        tone: 'danger',
        title: 'Late · €1,190',
        description: 'Pedro Lameiras · Ribeira Flats',
        action: { label: 'Remind' },
    },
    {
        id: 4,
        icon: 'swap',
        tone: 'warning',
        title: 'Counter at €289,000',
        description: 'Chiado Loft · you offered €278k',
        action: { label: 'Reply', variant: 'primary' },
    },
    {
        id: 5,
        icon: 'user',
        tone: 'info',
        title: 'Nadia Okafor is leaving',
        description: 'Flat 3, Ribeira Flats · 15 Dec',
        action: { label: 'Plan' },
    },
    {
        id: 6,
        icon: 'clock',
        title: 'Quarterly portfolio review',
        description: 'Thu 12 Nov · 15:00 · 45 min',
    },
];

export const loanRows = [4180, 4190, 4200, 4210, 4220, 4230, 4240].map(
    (total, i, all) => ({
        label: MONTHS[3 + i],
        total,
        part: 1710 + i * 12.7,
        current: i === all.length - 1,
    }),
);

const CITY_VALUE = 5_165_380;
export const cities: WhereItSitsSegment[] = [
    { label: 'Lisbon', value: 37.1, tone: 'primary' as const },
    { label: 'Porto', value: 21.4, tone: 'positive' as const },
    { label: 'Cascais', value: 17.1, tone: 'neutral' as const },
    { label: 'Málaga', value: 14.9, tone: 'accent' as const },
    { label: 'Valencia', value: 9.5, tone: 'info' as const },
].map((c) => ({ ...c, amount: eurM((CITY_VALUE * c.value) / 100) }));

export const properties: PropertyRow[] = [
    {
        name: 'Alfama Lofts',
        description: 'Lisbon · 4.1% net',
        status: 'All let',
        tone: 'positive',
    },
    {
        name: 'Ribeira Flats',
        description: 'Porto · 3.8% net',
        status: '1 leaving',
        tone: 'info',
    },
    {
        name: 'Cascais Terrace',
        description: 'Cascais · 3.2% net',
        status: 'All let',
        tone: 'positive',
    },
    {
        name: 'Malagueta Studios',
        description: 'Málaga · 3.9% net',
        status: '1 empty',
        tone: 'warning',
    },
];

export const menu: MenuItem[] = [
    { label: 'Download as CSV', icon: 'download' },
    { label: 'Share', icon: 'share' },
    { type: 'separator' },
    { label: 'Hide card', icon: 'x' },
];

export type Listing = {
    id: string;
    price: number;
    name: string;
    place: string;
    tags: string[];
    /** Gross yield in percent. */
    yield: number;
    bedrooms: number;
    bathrooms: number;
    m2: number;
    rent: number;
};

export const listings: Listing[] = [
    {
        id: 'a',
        price: 295000,
        name: 'Alfama Loft',
        place: 'Alfama, Lisbon',
        tags: ['New listing', 'Short-let licence'],
        yield: 6.0,
        bedrooms: 1,
        bathrooms: 1,
        m2: 62,
        rent: 1480,
    },
    {
        id: 'b',
        price: 362000,
        name: 'Chiado Atelier',
        place: 'Chiado, Lisbon',
        tags: ['Quiet street'],
        yield: 5.0,
        bedrooms: 1,
        bathrooms: 1,
        m2: 58,
        rent: 1520,
    },
    {
        id: 'c',
        price: 348000,
        name: 'Ruzafa Garden Flat',
        place: 'Ruzafa, Valencia',
        tags: ['Garden', 'Renovated'],
        yield: 5.6,
        bedrooms: 2,
        bathrooms: 1,
        m2: 86,
        rent: 1620,
    },
    {
        id: 'd',
        price: 535000,
        name: 'Campo de Ourique Flat',
        place: 'Campo de Ourique, Lisbon',
        tags: ['Period building', 'Lift'],
        yield: 4.6,
        bedrooms: 2,
        bathrooms: 1,
        m2: 92,
        rent: 2050,
    },
    {
        id: 'e',
        price: 214000,
        name: 'Ribeira Studio',
        place: 'Ribeira, Porto',
        tags: ['Tenant in place'],
        yield: 6.4,
        bedrooms: 0,
        bathrooms: 1,
        m2: 38,
        rent: 1140,
    },
    {
        id: 'f',
        price: 489000,
        name: 'Malagueta Penthouse',
        place: 'Malagueta, Málaga',
        tags: ['Sea view', 'Terrace'],
        yield: 5.2,
        bedrooms: 2,
        bathrooms: 2,
        m2: 78,
        rent: 2120,
    },
    {
        id: 'g',
        price: 612000,
        name: 'Cascais Terrace House',
        place: 'Cascais',
        tags: ['Parking'],
        yield: 4.3,
        bedrooms: 3,
        bathrooms: 2,
        m2: 110,
        rent: 2190,
    },
    {
        id: 'h',
        price: 426000,
        name: 'Graça Duplex',
        place: 'Graça, Lisbon',
        tags: ['New listing', 'Duplex'],
        yield: 4.9,
        bedrooms: 2,
        bathrooms: 1,
        m2: 74,
        rent: 1740,
    },
];

/** Price at the top of the slider: "any price". */
export const ANY_PRICE = 700000;

export type ListingFilter = {
    /** Matches name or place, ignoring case. */
    query: string;
    /** Part of the place name, or `all`. */
    city: string;
    /** Highest price; `ANY_PRICE` means no limit. */
    maxPrice: number;
    /** Lowest gross yield in percent. */
    minYield: number;
    sort: 'newest' | 'price' | 'yield';
};

export function filterListings(all: Listing[], f: ListingFilter): Listing[] {
    const q = f.query.trim().toLowerCase();
    const shown = all.filter(
        (l) =>
            (f.maxPrice >= ANY_PRICE || l.price <= f.maxPrice) &&
            l.yield >= f.minYield &&
            (f.city === 'all' || l.place.includes(f.city)) &&
            (!q || `${l.name} ${l.place}`.toLowerCase().includes(q)),
    );
    if (f.sort === 'price') return shown.sort((a, b) => a.price - b.price);
    if (f.sort === 'yield') return shown.sort((a, b) => b.yield - a.yield);
    return shown;
}

export const facts = (l: Listing) =>
    `${l.bedrooms ? `${l.bedrooms} bd` : 'Studio'} · ${l.bathrooms} ba · ${l.m2} m²`;
