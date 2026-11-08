import {
    ANY_PRICE,
    facts,
    filterListings,
    listings,
    type ListingFilter,
} from './investor.data';

const none: ListingFilter = {
    query: '',
    city: 'all',
    maxPrice: ANY_PRICE,
    minYield: 0,
    sort: 'newest',
};
const names = (f: Partial<ListingFilter>) =>
    filterListings(listings, { ...none, ...f }).map((l) => l.id);

describe('filterListings', () => {
    it('keeps everything, in order, when nothing is set', () => {
        expect(names({})).toEqual(listings.map((l) => l.id));
    });

    it('limits by price, with the top of the slider meaning any price', () => {
        expect(names({ maxPrice: 300000 })).toEqual(['a', 'e']);
        expect(names({ maxPrice: ANY_PRICE })).toHaveLength(listings.length);
    });

    it('limits by minimum yield and by city', () => {
        expect(names({ minYield: 6 })).toEqual(['a', 'e']);
        expect(names({ city: 'Porto' })).toEqual(['e']);
    });

    it('searches name and place ignoring case', () => {
        expect(names({ query: 'GARDEN' })).toEqual(['c']);
        expect(names({ query: 'ourique' })).toEqual(['d']);
        expect(names({ query: 'nowhere' })).toEqual([]);
    });

    it('sorts by price or yield without changing the source list', () => {
        const before = listings.map((l) => l.id);
        expect(names({ sort: 'price' })[0]).toBe('e');
        expect(names({ sort: 'yield' })[0]).toBe('e');
        expect(listings.map((l) => l.id)).toEqual(before);
    });
});

describe('facts', () => {
    it('says Studio for no bedrooms', () => {
        expect(facts(listings[4])).toBe('Studio · 1 ba · 38 m²');
        expect(facts(listings[0])).toBe('1 bd · 1 ba · 62 m²');
    });
});
