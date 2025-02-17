"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Invoice } from "@/lib/types/invoiceTypes";

import { formatRupiah } from "@/utils/formatCurrency";

interface InvoiceTableProps {
  invoices: Invoice[];
  onDelete: (invoice: Invoice) => void;
  onEdit: (invoice: Invoice) => void;
}

const InvoiceTable = ({ invoices, onDelete, onEdit }: InvoiceTableProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleEdit = (invoice: Invoice) => {
    if (isMounted) {
      router.push(`/invoices/edit?id=${invoice.number}`);
    }
  };

  return (
    <section className="flex bg-white box-border h-full w-full max-h-[75vh] max-w-[1000px] mb-6 drop-shadow-md rounded-lg flex-col p-6">
      <div className="overflow-x-auto max-h-[75vh]">
        {" "}
        <table className="w-full table-auto text-black">
          <thead className="bg-[#F7F9FC]">
            <tr>
              <th className="p-4 text-left border-b">Invoice</th>
              <th className="p-4 text-left border-b">Due Date</th>
              <th className="p-4 text-center border-b">Status</th>
              <th className="p-4 text-left border-b">Amount</th>
              <th className="p-4 text-center border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length > 0 ? (
              invoices.map((invoice, index) => (
                <tr key={index} className="border-b">
                  <td className="flex flex-col text-sm p-4">
                    <p className="text-lg font-semibold">{invoice.name}</p>
                    <p className="text-gray-500">{invoice.number}</p>
                  </td>
                  <td className="text-sm p-4">{invoice.dueDate}</td>
                  <td className="text-sm p-4 text-center">
                    <p
                      className={`px-3 py-1 rounded-full text-white font-semibold 
                                          ${
                                            invoice.status === "Paid"
                                              ? "bg-green-500"
                                              : invoice.status === "Pending"
                                              ? "bg-yellow-500"
                                              : "bg-red-500"
                                          }`}
                    >
                      {invoice.status.charAt(0).toUpperCase() +
                        invoice.status.slice(1)}
                    </p>
                  </td>
                  <td className="text-sm p-4">
                    Rp {formatRupiah(invoice.amount.toString())}
                  </td>
                  <td className="text-sm flex justify-center items-center p-4 gap-4">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => onEdit(invoice)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => onDelete(invoice)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No invoices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default InvoiceTable;
