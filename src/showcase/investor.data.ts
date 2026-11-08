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
