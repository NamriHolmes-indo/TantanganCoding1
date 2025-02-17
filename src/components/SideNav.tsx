"use client";
import { FC } from "react";
import Link from "next/link";
import Image from "next/image"; // Mengimpor komponen Image dari Next.js

const SideNav: FC = () => {
    return (
        <nav className="w-1/5 bg-[#1C2434] flex flex-col items-center text-white gap-10 p-6">
            <Image
                src="/icon.png"
                alt="Add Invoice"
                width={100}
                height={20}
                className="w-[80%] h-auto"
            />

            <ul className="space-y-4 w-full">
                <li>
                    <p className="text-lg">Menu</p>
                </li>

                <li>
                    <Link href="/invoices/add" className="flex hover:text-gray-400 items-center space-x-3">
                        <Image
                            src="/add.png"
                            alt="Add Invoice"
                            width={20}
                            height={20}
                            className="rounded"
                        />
                        <span className="text-md">Add Invoice</span>
                    </Link>
                </li>

                <li>
                    <Link href="/invoices/list" className="flex hover:text-gray-400 items-center space-x-3">
                        <Image
                            src="/list.png"
                            alt="My Invoices"
                            width={20}
                            height={20}
                            className="rounded"
                        />
                        <span className="text-md">My Invoices</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default SideNav;
