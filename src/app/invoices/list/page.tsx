"use client";
import { useState, useEffect } from "react";
import { useInvoiceStorage, Invoice } from "@/hooks/useInvoiceStorage";
import InvoiceTable from "@/components/invoices/InvoiceTable";
import TambahInvoice from "@/components/invoices/InvoiceForm";
import SideNav from "@/components/SideNav";
import { useRouter, useSearchParams } from "next/navigation";

export default function InvoiceListPage() {
    const { invoices, updateInvoice, deleteInvoice } = useInvoiceStorage();
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<"All" | "Paid" | "Pending" | "Unpaid">("All");

    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleEdit = (invoice: Invoice) => {
        if (isMounted) {
            router.push(`/invoices/edit;id=${invoice.invnum}`);
        }
    };

    const handleDelete = (invoice: Invoice) => {
        if (isMounted) {
            deleteInvoice(invoice.invnum);
        }
    };

    const handleActionComplete = () => {
        setSelectedInvoice(null);
    };

    const filteredInvoices = invoices.filter((invoice) => {
        const matchSearch = invoice.nama.toLowerCase().includes(searchQuery.toLowerCase());
        const matchStatus =
            filterStatus === "All" || invoice.status.toLowerCase() === filterStatus.toLowerCase();
        return matchSearch && matchStatus;
    });

    useEffect(() => {
        const query = new URLSearchParams();
        if (searchQuery) query.set("search", searchQuery);
        if (filterStatus !== "All") query.set("filter", filterStatus);

        if (isMounted) {
            router.push(`/invoices/list?${query.toString()}`);
        }
    }, [searchQuery, filterStatus, isMounted, router]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const searchParam = params.get("search");
        const filterParam = params.get("filter");

        if (searchParam) setSearchQuery(searchParam);
        if (filterParam) setFilterStatus(filterParam as "Paid" | "Pending" | "Unpaid");
    }, []);

    return (
        <div className="flex h-[100vh]">
            <SideNav />
            <main className="w-4/5 bg-[#F1F5F9] flex flex-col items-center p-6">
                <div className="flex justify-between w-full max-w-[1000px] mb-4">
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
                            onChange={(e) => setFilterStatus(e.target.value as any)}
                        >
                            <option value="All">All</option>
                            <option value="Paid">Paid</option>
                            <option value="Pending">Pending</option>
                            <option value="Unpaid">Unpaid</option>
                        </select>
                    </div>
                </div>

                {selectedInvoice && (
                    <section className="flex bg-white w-full max-w-[1000px] mb-6 drop-shadow-md rounded-lg flex-col py-6">
                        <h2 className="w-full text-black border-b-2 pb-2 mb-4 text-xl px-6">Edit Invoice</h2>
                        <TambahInvoice onActionComplete={handleActionComplete} initialInvoice={selectedInvoice} />
                    </section>
                )}

                <InvoiceTable invoices={filteredInvoices} onEdit={handleEdit} onDelete={handleDelete} />
            </main>
        </div>
    );
}
