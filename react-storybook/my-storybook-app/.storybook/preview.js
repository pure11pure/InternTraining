/** @type { import('@storybook/react').Preview } */
import "../tailwind.css";
import { worker } from '../src/mocks/browser';
import { initialize, mswLoader } from "msw-storybook-addon";

// Initialize MSW
initialize();
worker.start();


const preview = {
  parameters: {
    // actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader],
};

export default preview;