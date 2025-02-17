import { useState, useEffect } from "react";
import { Invoice } from "@/lib/types/invoiceTypes";

export const useInvoiceStorage = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);

    useEffect(() => {
        const storedInvoices = localStorage.getItem("invoices");
        if (storedInvoices) {
            setInvoices(JSON.parse(storedInvoices));
        }
    }, []);

    const saveInvoice = (newInvoice: Invoice) => {
        const existingInvoice = invoices.find((invoice) => invoice.number === newInvoice.number);

        if (existingInvoice) {
            updateInvoice(newInvoice);
        } else {
            const updatedInvoices = [...invoices, newInvoice];
            setInvoices(updatedInvoices);
            localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
        }
    };

    const updateInvoice = (updatedInvoice: Invoice) => {
        const updatedInvoices = invoices.map((invoice) =>
            invoice.number === updatedInvoice.number ? updatedInvoice : invoice
        );
        setInvoices(updatedInvoices);
        localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
    };

    const deleteInvoice = (number: string) => {
        const updatedInvoices = invoices.filter((invoice) => invoice.number !== number);
        setInvoices(updatedInvoices);
        localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
    };

    return { invoices, saveInvoice, updateInvoice, deleteInvoice };
};
