"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useInvoiceStorage, Invoice } from "@/hooks/useInvoiceStorage";
import TambahInvoice from "@/components/invoices/InvoiceForm";
import SideNav from "@/components/SideNav";
import NotifInsert from "@/components/invoices/Notifikasi";

export default function EditInvoicePage() {
    const [invoiceData, setInvoiceData] = useState<Invoice | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { invoices, updateInvoice } = useInvoiceStorage();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (invoices.length === 0) {
            console.log("Invoices are still loading...");
            return;
        }

        const queryParams = new URLSearchParams(window.location.search);
        const invoiceId = decodeURIComponent(queryParams.get("id") || "");

        console.log("Invoice ID from URL:", invoiceId);

        if (invoiceId) {
            console.log("Invoices in storage:", invoices.map(inv => inv.invnum));
            const invoice = invoices.find((inv) => inv.invnum === invoiceId);
            if (invoice != null) {
                console.log("Matching Invoice Found:", invoice.invnum);
                setInvoiceData(invoice);
                setIsLoading(false);
            } else {
                console.log("No matching invoice found.");
                setIsLoading(false);
                router.push("/invoices/add");
            }
        }
    }, [invoices, router]);

    if (!isMounted || isLoading || !invoiceData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex h-[100vh]">
            <SideNav />
            <main className="w-4/5 bg-[#F1F5F9] flex flex-col items-center p-6">
                <h1 className="text-black w-full font-bold max-w-[1000px] text-4xl mb-6">Edit Invoice</h1>
                <section className="flex bg-white w-full max-w-[1000px] mb-20 drop-shadow-md rounded-lg flex-col py-6">
                    <h2 className="w-full text-black border-b-2 pb-2 mb-4 text-xl px-6">Edit Invoice</h2>
                    <TambahInvoice onActionComplete={() => router.push("/invoices/list")} initialInvoice={invoiceData} />
                </section>
                <NotifInsert
                    status="success"
                    missingFields={[]}
                    className="transition-opacity duration-500 ease-in-out opacity-100"
                />
            </main>
        </div>
    );
}
