// The maths behind the Calculators story. Plain functions, no UI.

export type Mortgage = {
    /** Amount borrowed. */
    borrowed: number;
    /** Monthly payment. */
    payment: number;
    /** Everything repaid over the term. */
    total: number;
    /** Interest part of `total`. */
    interest: number;
    /** Principal and interest paid in each block of five years. */
    blocks: { label: string; principal: number; interest: number }[];
};

/**
 * A repayment mortgage: equal monthly payments, interest on the balance.
 * `rate` is the yearly rate in percent; zero is allowed.
 */
export function mortgage({
    price,
    depositPercent,
    rate,
    years,
}: {
    price: number;
    depositPercent: number;
    rate: number;
    years: number;
}): Mortgage {
    const borrowed = price * (1 - depositPercent / 100);
    const months = years * 12;
    const monthly = rate / 1200;
    const payment =
        monthly === 0
            ? borrowed / months
            : (borrowed * monthly) / (1 - (1 + monthly) ** -months);

    const blocks: Mortgage['blocks'] = [];
    let balance = borrowed;
    let interest = 0;
    let principal = 0;
    for (let m = 1; m <= months; m++) {
        const due = balance * monthly;
        const paid = payment - due;
        balance -= paid;
        interest += due;
        principal += paid;
        if (m % 60 === 0 || m === months) {
            const first = Math.floor((m - 1) / 60) * 5 + 1;
            blocks.push({
                label: `${first}–${Math.ceil(m / 12)}`,
                principal,
                interest,
            });
            interest = 0;
            principal = 0;
        }
    }
    const total = payment * months;
    return { borrowed, payment, total, interest: total - borrowed, blocks };
}

export type Yield = {
    /** Rent for a full year. */
    gross: number;
    /** Rent lost to empty weeks. */
    lost: number;
    /** The letting agent's cut of the rent actually collected. */
    agent: number;
    running: number;
    /** What is left. Negative when the home costs money. */
    keep: number;
    /** Percent of the price. */
    grossYield: number;
    netYield: number;
};

export function rentalYield({
    price,
    rentPerMonth,
    runningPerMonth,
    emptyWeeks,
    agentPercent,
}: {
    price: number;
    rentPerMonth: number;
    runningPerMonth: number;
    emptyWeeks: number;
    agentPercent: number;
}): Yield {
    const gross = rentPerMonth * 12;
    const lost = (gross * emptyWeeks) / 52;
    const agent = ((gross - lost) * agentPercent) / 100;
    const running = runningPerMonth * 12;
    const keep = gross - lost - agent - running;
    return {
        gross,
        lost,
        agent,
        running,
        keep,
        grossYield: (gross / price) * 100,
        netYield: (keep / price) * 100,
    };
}
