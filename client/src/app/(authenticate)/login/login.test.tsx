import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Page from './page'

jest.mock('next/navigation', () => {
    return {
        useRouter: () => ({
            push: jest.fn(),
            prefetch: jest.fn()
        })
    }
})

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
    })
})