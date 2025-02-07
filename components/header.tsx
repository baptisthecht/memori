"use client";

import Link from "next/link";
import CustomLink from "./ui/link";
import Image from "next/image";

export const Header = () => {
    return (
        <header className="h-20 w-full flex items-center justify-between px-4 sm:px-6 lg:px-60 bg-surface-primary">
            <Link href="/">
                <Image
                    src="/favicon.ico"
                    alt="Logo Memori"
                    className="h-6 w-auto"
                    width={40}
                    height={40}
                />
            </Link>
            <nav className="flex-1 flex justify-center">
                <ul className="flex space-x-0">
                    <li>
                        <CustomLink href="/">Quiz</CustomLink>
                    </li>
                    <li>
                        <CustomLink href="/mes-mots">Mes mots</CustomLink>
                    </li>
                </ul>
            </nav>
            <div></div>
        </header>
    );
};
