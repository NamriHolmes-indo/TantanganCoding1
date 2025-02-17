"use client";
import { useState, useEffect } from "react";
import TambahInvoice from "@/components/invoices/InvoiceForm";
import SideNav from "@/components/SideNav";
import NotifInsert from "@/components/invoices/Notifikasi";

export default function AddInvoicePage() {
    const [status, setStatus] = useState<string | null>(null);
    const [missingFields, setMissingFields] = useState<string[]>([]);

    const handleActionComplete = (status: string, missingFields?: string[]) => {
        setStatus(status);
        if (missingFields) {
            setMissingFields(missingFields);
        }

        if (status === 'success' || status === 'error') {
            setTimeout(() => setStatus(null), 2000);
        }
    };

    return (
        <div className="flex h-[100vh]">
            <SideNav />

            <main className="w-4/5 bg-[#F1F5F9] flex flex-col items-center p-6">
                <h1 className="text-black w-full font-bold max-w-[1000px] text-4xl mb-6">Add Invoice</h1>

                <section className="flex bg-white w-full max-w-[1000px] mb-20 drop-shadow-md rounded-lg flex-col py-6">
                    <h2 className="w-full text-black border-b-2 pb-2 mb-4 text-xl px-6">Add Invoice</h2>
                    <TambahInvoice onActionComplete={handleActionComplete} />
                </section>

                {status && (
                    <div className="absolute bottom-16 w-full max-w-[1000px] mx-auto">
                        <NotifInsert
                            status={status}
                            missingFields={missingFields}
                            className="transition-opacity duration-500 ease-in-out opacity-100"
                        />
                    </div>
                )}
            </main>
        </div>
    );
}
