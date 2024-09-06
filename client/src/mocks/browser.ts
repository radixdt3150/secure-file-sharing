import { setupWorker } from "msw/browser";

import { handlers } from "./handler";

// mock server to intercept API calls in browsers
export const worker = setupWorker(...handlers);
