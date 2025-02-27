"use client"
import Link from 'next/link';
import React, { useState } from 'react';

interface NavigationItem {
    name: string;
    href: string;
    current: boolean;
}
const navigation: NavigationItem[] = [
    { name: 'Home', href: '/', current: false },
    { name: 'Courses', href: 'Courses', current: false },
    { name: 'Instructor & Mentor', href: 'mentor', current: false },
    { name: 'Shop', href: 'Shop', current: false },
    { name: 'Careers', href: 'Jobs', current: false },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const CustomLink = ({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) => {
    return (
        <Link href={href} passHref>
            <span
                onClick={onClick}
                className="px-3 py-4 text-lg font-normal"
            >
                {children}
            </span>
        </Link>
    );
};
const Navigation = () => {
     const [currentLink, setCurrentLink] = useState('/');
    
        const handleLinkClick = (href: string) => {
            setCurrentLink(href);
        };
    return(
        <>
         <div className="hidden lg:block m-auto">
                                <div className="flex space-x-4">
                                    {navigation.map((item) => (
                                        <CustomLink
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => handleLinkClick(item.href)}
                                        >
                                            <span
                                                className={classNames(
                                                    item.href === currentLink ? 'underline-links' : 'text-slategray',
                                                    'px-3 py-4 text-lg font-normal opacity-75 hover:opacity-100'
                                                )}
                                                aria-current={item.href ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </span>
                                        </CustomLink>
                                    ))}
                                </div>
                            </div></>
    )
}
export default Navigation;
