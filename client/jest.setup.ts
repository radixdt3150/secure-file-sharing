import '@testing-library/jest-dom'
// mock server for test - used to intercept HTTP calls
import { server } from "@/mocks/tests";

// jest-test lifecycle hooks
beforeAll(() => server.listen());
beforeEach(() => server.resetHandlers());
afterAll(() => server.close());