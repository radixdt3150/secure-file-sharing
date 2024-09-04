import { ReactElement } from "react";

// Atoms / molecules / organisms
import { LoginForm } from "@/app/components/organisms/LoginForm";
import { TransitionLink } from "@/app/components/atoms/TransitionLink";

export default function Page(): ReactElement {

    // main renderer
    return (
        <main className="min-h-screen py-24 px-12 mx-auto max-w-2xl">

            <LoginForm />
            <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-4">
                Don’t have an account yet? <TransitionLink data-testid="signup-link" href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</TransitionLink>
            </p>
        </main>
    );
}
