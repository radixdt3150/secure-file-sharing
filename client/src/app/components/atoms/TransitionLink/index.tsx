"use client"

import { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// props type definition
interface IProps extends ComponentPropsWithoutRef<"a"> {
    readonly children: ReactNode;
    readonly href: string
}

export function TransitionLink({
    children,
    href,
    ...rest
}: IProps): ReactElement {
    const router = useRouter();

    async function sleep(ms: number = 500) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    // main renderer
    return (
        <Link
            onClick={async (e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                const body = document.querySelector("#app-container");
                body?.classList?.add("page-transition");
                await sleep();

                router.push(href);
                await sleep();
                body?.classList?.remove("page-transition");


            }}
            href={href}
            {...rest}
        >
            {children}
        </Link>
    )
}