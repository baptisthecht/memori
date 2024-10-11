"use client";

import Link from 'next/link';
import CustomLink from './ui/link';

export const Header = () => {
    return (
        <header className="h-20 w-full flex items-center justify-between px-4 sm:px-6 lg:px-60 mb-28 bg-surface-primary">
            <Link href="/">
                <img src="https://cdn.ribeiro-ody.com/images/memori/logo_memori.svg" alt="Logo Memori" className="h-6 w-auto" />
            </Link>
            <nav className="flex-1 flex justify-center">
                <ul className="flex space-x-0">
                    <li>
                        <CustomLink href="/">
                            Quiz
                        </CustomLink>
                    </li>
                    <li>
                        <CustomLink href="/mes-mots">
                            Mes mots
                        </CustomLink>
                    </li>
                </ul>
            </nav>
            <div style={{ width: '132.51px', height: '24px' }}></div>
        </header>
    );
};
