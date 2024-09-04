// top level imports
import { ReactElement } from "react";
import { DarkThemeToggle } from "flowbite-react";

export function Header(): ReactElement {
    return (
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <span className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Secure File Sharing</span>
                </span>

                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    <DarkThemeToggle />
                </div>
            </div>
        </nav>
    )
}