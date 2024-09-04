"use client"
import { ReactElement } from "react";

// Form validation
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";

const LoginSchema = z.object({
    email: z.string().email('Should be a valid email'),
    password: z.string().min(1, 'Password is required')
});

type LoginSchemaType = z.infer<typeof LoginSchema>

// component definition
export function LoginForm(): ReactElement {

    const { handleSubmit, register, formState: { errors } } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

    /** Handler / Utility functions - starts */

    const onFormSubmit: SubmitHandler<LoginSchemaType> = (data) => {
        console.log({ data })
    }

    /** Handler / Utility functions - ends */

    // main renderer
    return (
        <form className="flex max-w-md flex-col gap-4" data-testid="login-form" onSubmit={handleSubmit(onFormSubmit)}>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
            </h1>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email" value="Your email" />
                </div>
                <TextInput
                    {...register("email")}
                    id="email"
                    name="email"
                    data-testid="email"
                    type="email"
                    placeholder="john@doe.com"
                />
                {errors.email?.message && <small className="text-red-500" data-testid="email-error">{errors.email?.message}</small>}
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password" value="Your password" />
                </div>
                <TextInput
                    {...register("password")}
                    id="password"
                    name="password"
                    data-testid="password"
                    type="password"
                />
                {errors.password?.message && <small className="text-red-500" data-testid="password-error">{errors.password?.message}</small>}
            </div>
            <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button data-testid="submit-btn" type="submit">Submit</Button>
        </form>
    )
}
