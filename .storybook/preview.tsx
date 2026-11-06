import type { Preview } from '@storybook/react-vite';
import '../src/styles/tokens.css';

const preview: Preview = {
    globalTypes: {
        theme: {
            description: 'Dark Glass theme',
            toolbar: {
                icon: 'paintbrush',
                items: [
                    { value: 'ember', title: 'Ember' },
                    { value: 'ink', title: 'Ink' },
                ],
                dynamicTitle: true,
            },
        },
    },
    initialGlobals: { theme: 'ember' },
    decorators: [
        (Story, { globals }) => {
            document.documentElement.dataset.theme = globals.theme;
            return <Story />;
        },
    ],
    parameters: {
        layout: 'centered',
        backgrounds: { disabled: true },
        controls: {
            matchers: { color: /(background|color)$/i, date: /Date$/i },
        },
    },
};

export default preview;
