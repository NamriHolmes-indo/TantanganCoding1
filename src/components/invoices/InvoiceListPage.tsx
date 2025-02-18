"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useInvoiceStorage } from "@/hooks/useInvoiceStorage";
import InvoiceTable from "@/components/invoices/InvoiceTable";
import TambahInvoice from "@/components/invoices/InvoiceForm";
import SideNav from "@/components/SideNav";
import Header from "@/components/Header";
import { Invoice } from "@/lib/types/invoiceTypes";

export default function InvoiceListPage() {
    const { invoices, deleteInvoice } = useInvoiceStorage();
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<"All" | "Paid" | "Pending" | "Unpaid">("All");

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const searchParam = searchParams.get("search");
        const filterParam = searchParams.get("filter");

        if (searchParam) setSearchQuery(searchParam);
        if (filterParam) setFilterStatus(filterParam as "Paid" | "Pending" | "Unpaid");
    }, [searchParams]);

    const handleEdit = (invoice: Invoice) => {
        router.push(`/invoices/edit?id=${invoice.number}`);
    };

    const handleDelete = (invoice: Invoice) => {
        deleteInvoice(invoice.number);
    };

    const handleActionComplete = () => {
        setSelectedInvoice(null);
    };

    const filteredInvoices = invoices.filter((invoice) => {
        const matchSearch = invoice.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false;
        const matchStatus = filterStatus === "All" || invoice.status?.toLowerCase() === filterStatus.toLowerCase();
        return matchSearch && matchStatus;
    });

    return (
        <div className="flex h-full min-h-[100vh]">
            <SideNav />
            <main className="w-4/5 bg-[#F1F5F9] flex gap-5 flex-col  justify-center items-center">
                <Header />
                <div className="flex justify-between items-center w-full max-w-[1000px] mb-4 p-6 text-center">
                    <h1 className="text-black font-bold text-4xl">My Invoices</h1>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Search by name"
                            className="p-2 border rounded text-black"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <select
                            className="p-2 border rounded text-black"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value as "All" | "Paid" | "Pending" | "Unpaid")}
                        >
                            <option value="All">All</option>
                            <option value="Paid">Paid</option>
                            <option value="Pending">Pending</option>
                            <option value="Unpaid">Unpaid</option>
                        </select>
                    </div>
                </div>

                {selectedInvoice && (
                    <section className="flex bg-white w-full justify-center items-center max-w-[1000px] mb-6 drop-shadow-md rounded-lg flex-col py-6">
                        <h2 className="w-full text-black border-b-2 pb-2 mb-4 text-xl px-6">Edit Invoice</h2>
                        <TambahInvoice onActionComplete={handleActionComplete} />
                    </section>
                )}

                <InvoiceTable invoices={filteredInvoices} onEdit={handleEdit} onDelete={handleDelete} />
            </main>
        </div>
    );
}
