import { ReactElement } from "react";

import { TransitionLink } from "@/app/components/atoms/TransitionLink";

import { Button, Label, TextInput } from "flowbite-react";

export default async function Page(): Promise<ReactElement> {
    return (
        <main className="min-h-screen p-24 mx-auto max-w-2xl">
            <form className="flex max-w-md flex-col gap-4">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create an account
                </h1>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="name" value="Full name" />
                    </div>
                    <TextInput name="name" type="email" placeholder="John Doe" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Email" />
                    </div>
                    <TextInput name="email" type="email" placeholder="john@doe.com" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="Password" />
                    </div>
                    <TextInput id="password" type="password" required />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="confirm-password" value="Confirm password" />
                    </div>
                    <TextInput id="confirm-password" type="password" required />
                </div>

                <Button type="submit">Submit</Button>
            </form>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-4">
                Already have an account?&nbsp;
                <TransitionLink href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</TransitionLink>
            </p>
        </main>
    )
}