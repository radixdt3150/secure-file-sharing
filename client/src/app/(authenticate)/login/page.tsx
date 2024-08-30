import { ReactElement } from "react";
import Link from 'next/link'

import { Button, Checkbox, Label, TextInput } from "flowbite-react";

export default function Page(): ReactElement {
    return (
        <main className="min-h-screen p-24 mx-auto max-w-2xl">
            <form className="flex max-w-md flex-col gap-4">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                </h1>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email1" value="Your email" />
                    </div>
                    <TextInput id="email1" type="email" placeholder="john@doe.com" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password1" value="Your password" />
                    </div>
                    <TextInput id="password1" type="password" required />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">Remember me</Label>
                </div>
                <Button type="submit">Submit</Button>
            </form>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-4 text-center">
                Don’t have an account yet? <Link href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
            </p>
        </main>
    );
}
