import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Subject component
import Page from './page'

jest.mock('next/navigation', () => {
    return {
        useRouter: () => ({
            push: jest.fn(),
            prefetch: jest.fn()
        })
    }
})

// Test Suites
describe('Login Page', (): void => {
    
    test('Renders heading', (): void => {
        render(<Page />)

        const heading = screen.getByRole('heading')

        expect(heading).toBeInTheDocument();
    })

    test('Renders the form and its elements', () => {
        // Arrange
        render(<Page />);
        const form = screen.getByTestId('login-form');
        const email = screen.getByTestId('email');
        const password = screen.getByTestId('password');
        const submitBtn = screen.getByTestId('submit-btn');

        // Assert
        expect(form).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(submitBtn).toBeInTheDocument();
    });

    test('Controls accepts input', async (): Promise<void> => {
        // Data
        const dummyEmail = 'john@doe.com', dummyPassword = "Password123";

        // Arrange
        render(<Page />);
        const user = userEvent.setup(); // Initialize user-event
        // Query elements
        const email: HTMLInputElement = screen.getByTestId('email');
        const password: HTMLInputElement = screen.getByTestId('password');

        // Act
        await user.type(email, dummyEmail);
        await user.type(password, dummyPassword);

        // Assert
        expect(email.value).not.toBe('');
        expect(email.value).toBe(dummyEmail);
        expect(email.value).not.toBe('');
        expect(password.value).toBe(dummyPassword);
    })

    test('Displays error on submitting incomplete form', async () => {
        // Arrange
        render(<Page />);
        const user = userEvent.setup()
        // Query elements
        const email: HTMLInputElement = screen.getByTestId('email');
        const password: HTMLInputElement = screen.getByTestId('password');
        const submitBtn = screen.getByTestId('submit-btn');

        // Act
        user.click(submitBtn)

        // Assert
        expect(email.value).toBe('')
        expect(password.value).toBe('')
        await waitFor(() => { 
            const emailErr = screen.getByTestId('email-error');
            const passwordErr = screen.getByTestId('password-error');
            expect(emailErr).toBeInTheDocument();
            expect(passwordErr).toBeInTheDocument();
        })
    });

    test('Has no errors on submitting a validated form', async (): Promise<void> => {
        // Data
        const validEmail = 'john@doe.com', validPassword = "Password123";

        // Arrange
        render(<Page />);
        const user = userEvent.setup(); // Initialize user-event
        // Query elements
        const email: HTMLInputElement = screen.getByTestId('email');
        const password: HTMLInputElement = screen.getByTestId('password');
        const submitBtn = screen.getByTestId('submit-btn');

        // Act
        await user.type(email, validEmail);
        await user.type(password, validPassword);
        await user.click(submitBtn);

        // Assert
        await waitFor(() => {
            const emailErr = screen.queryByTestId('email-error');
            const passwordErr = screen.queryByTestId('password-error');
            expect(emailErr).not.toBeInTheDocument();
            expect(passwordErr).not.toBeInTheDocument();
        })
    })

    test('API returns with expected response', async (): Promise<void> => {
        // Data
        const validEmail = 'john@doe.com', validPassword = "Password123";

        // Arrange
        render(<Page />);
        const user = userEvent.setup(); // Initialize user-event

        // Query elements
        const email: HTMLInputElement = screen.getByTestId('email');
        const password: HTMLInputElement = screen.getByTestId('password');
        const submitBtn = screen.getByTestId('submit-btn');

        // Act
        await user.type(email, validEmail);
        await user.type(password, validPassword);
        await user.click(submitBtn);

        // Assert
    })
})
