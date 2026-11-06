const circle = (cx: number, cy: number, r: number) =>
    `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;

// 24px grid, 1.6px round-capped outline set. Never mix in filled icons.
export const ICONS = {
    search: [circle(11, 11, 6.5), 'M16 16l4.5 4.5'],
    bell: [
        'M6 16v-5a6 6 0 1 1 12 0v5l1.5 2h-15L6 16z',
        'M10 20.5a2 2 0 0 0 4 0',
    ],
    plus: ['M12 5v14', 'M5 12h14'],
    home: ['M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1v-8z'],
    grid: [
        'M4 4h6.5v6.5H4z',
        'M13.5 4H20v6.5h-6.5z',
        'M4 13.5h6.5V20H4z',
        'M13.5 13.5H20V20h-6.5z',
    ],
    portfolio: ['M4 8h16v11H4z', 'M9 8V5h6v3'],
    chart: ['M5 19v-8', 'M12 19V5', 'M19 19v-5'],
    calc: [
        'M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z',
        'M8 7h8',
        'M8 12h2',
        'M14 12h2',
        'M8 16h2',
        'M14 16h2',
    ],
    chat: ['M5 5h14v10H10l-5 4V5z'],
    settings: [
        'M4 7h9',
        'M17 7h3',
        'M4 17h3',
        'M11 17h9',
        circle(15, 7, 2),
        circle(9, 17, 2),
    ],
    help: [
        circle(12, 12, 9),
        'M9.6 9.5a2.4 2.4 0 1 1 3.4 2.2c-.6.3-1 .9-1 1.6',
        'M12 17h.01',
    ],
    moon: ['M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z'],
    heart: [
        'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z',
    ],
    tag: ['M4 4h8l8 8-8 8-8-8V4z', 'M8.5 8.5h.01'],
    download: ['M12 4v11', 'M7 11l5 5 5-5', 'M5 20h14'],
    alert: ['M12 4l9 16H3L12 4z', 'M12 10v4', 'M12 17h.01'],
    more: [circle(5, 12, 1.2), circle(12, 12, 1.2), circle(19, 12, 1.2)],
    x: ['M6 6l12 12', 'M18 6L6 18'],
    check: ['M5 12.5l4.5 4.5L19 7'],
    'chevron-down': ['M6 9l6 6 6-6'],
    'chevron-right': ['M9 6l6 6-6 6'],
    clock: [circle(12, 12, 9), 'M12 7v5l3 2'],
    swap: ['M7 4L4 7l3 3', 'M4 7h13', 'M17 20l3-3-3-3', 'M20 17H7'],
    info: [circle(12, 12, 9), 'M12 11v5', 'M12 8h.01'],
    edit: ['M4 20h4L19 9l-4-4L4 16v4z'],
    trash: ['M5 7h14', 'M10 7V4h4v3', 'M7 7l1 13h8l1-13'],
    share: ['M12 15V4', 'M8 8l4-4 4 4', 'M5 14v6h14v-6'],
    panel: ['M4 5h16v14H4z', 'M9 5v14'],
    user: [circle(12, 8, 4), 'M4 20c1-4 4-6 8-6s7 2 8 6'],
    'arrow-up': ['M12 19V5', 'M6 11l6-6 6 6'],
    'arrow-right': ['M5 12h14', 'M13 6l6 6-6 6'],
} as const;

export type IconName = keyof typeof ICONS;

/** Every icon name, in definition order. */
export const iconNames = Object.keys(ICONS) as IconName[];
