import { useState, useEffect } from "react";
import { formatRupiah } from "@/utils/formatCurrency";
import { useInvoiceStorage } from "@/hooks/useInvoiceStorage";
import { InvoiceStatus } from "@/constants/invoiceStatus";

const TambahInvoice = ({
  onActionComplete,
}: {
  onActionComplete: (status: string, missingFields?: string[]) => void;
}) => {
  const { saveInvoice, invoices } = useInvoiceStorage();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [status, setStatus] = useState<InvoiceStatus | "">("");
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const invoiceId = urlParams.get("id");

    if (invoiceId) {
      const invoice = invoices.find((invoice) => invoice.number === invoiceId);
      if (invoice) {
        setName(invoice.name);
        setNumber(invoice.number);
        setDueDate(invoice.dueDate);
        setAmount(invoice.amount);
        setStatus(invoice.status);
        setEditMode(true);
      }
    } else {
      setNumber(generateInvoiceNumber());
    }
  }, [invoices]);

  const generateInvoiceNumber = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    const lastInvoiceIndex = invoices.length;
    const newInvoiceNumber = String(lastInvoiceIndex + 1).padStart(3, "0");

    return `INV${day}${month}/${year}${newInvoiceNumber}${hours}${minutes}`;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    const numericValue = rawValue ? parseInt(rawValue, 10) : 0;

    if (!isNaN(numericValue)) {
      setAmount(numericValue);
    }
  };

  const validateForm = () => {
    const missing: string[] = [];
    if (!name) missing.push("Name");
    if (!number) missing.push("Number");
    if (!dueDate) missing.push("Due date");
    if (!amount) missing.push("Amount");
    if (!status) missing.push("Status");
    return missing;
  };

  const getValidStatus = (value: string): InvoiceStatus | "" => {
    if (Object.values(InvoiceStatus).includes(value as InvoiceStatus)) {
      return value as InvoiceStatus;
    }
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const missing = validateForm();
    if (missing.length > 0) {
      onActionComplete("error", missing);
      return;
    }

    const validStatus = status ? status : InvoiceStatus.Pending;

    const newInvoice = {
      id: editMode ? number : generateInvoiceNumber(),
      name,
      number,
      dueDate,
      amount,
      status: validStatus,
    };

    try {
      saveInvoice(newInvoice);
      onActionComplete("success");
    } catch (error) {
      onActionComplete("error");
    }

    setName("");
    setNumber("");
    setDueDate("");
    setAmount(0);
    setStatus("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col text-black p-6 gap-5"
    >
      <section className="barisInput flex w-full gap-10 self-center justify-between">
        <div className="flex w-full max-w-[48%] flex-col gap-2 self-center justify-start">
          <p className="judulInput flex items-center">
            Name <span className="text-red-500 ml-1">*</span>
          </p>
          <input
            type="text"
            name="name"
            placeholder="Enter your invoice name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#E2E8F0] p-2 border border-solid border-gray-300 rounded-md outline-none"
          />
        </div>
        <div className="flex w-full max-w-[48%] flex-col gap-2 self-center justify-start">
          <p className="judulInput flex items-center">
            Number <span className="text-red-500 ml-1">*</span>
          </p>
          <input
            type="text"
            name="number"
            id="number"
            placeholder="Enter your invoice number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full bg-[#E2E8F0] p-2 border border-solid border-gray-300 rounded-md outline-none"
          />
        </div>
      </section>

      <section className="barisInput flex w-full gap-10 self-center justify-between">
        <div className="flex w-full max-w-[48%] flex-col gap-2 self-center justify-start">
          <p className="judulInput flex items-center">
            Due date <span className="text-red-500 ml-1">*</span>
          </p>
          <input
            type="date"
            name="dueDate"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full bg-[#E2E8F0] p-2 border border-solid border-gray-300 rounded-md outline-none"
          />
        </div>
        <div className="flex w-full max-w-[48%] flex-col gap-2 self-center justify-start">
          <p className="judulInput flex items-center">
            Amount <span className="text-red-500 ml-1">*</span>
          </p>
          <div className="flex items-center bg-[#E2E8F0] border border-solid border-gray-300 rounded-md">
            <span className="bg-[#D9D9D9] px-3 py-2 text-gray-700 mr-2 rounded-md">
              RP
            </span>
            <input
              type="text"
              name="amount"
              id="amount"
              value={formatRupiah(amount.toString())}
              onChange={handleAmountChange}
              className="w-full bg-[#E2E8F0] p-2 outline-none"
              placeholder="0"
            />
          </div>
        </div>
      </section>

      <section className="barisInput flex w-full gap-10 self-center justify-between">
        <div className="flex w-full max-w-[48%] flex-col gap-2 self-center justify-start">
          <p className="judulInput flex items-center">
            Status <span className="text-red-500 ml-1">*</span>
          </p>

          <select
            name="status"
            id="status"
            value={status}
            onChange={(e) => setStatus(getValidStatus(e.target.value))} // Konversi nilai ke InvoiceStatus
            className="w-full bg-[#E2E8F0] p-2 border border-solid border-gray-300 rounded-md outline-none"
          >
            <option value="" disabled>
              Choose the status
            </option>
            <option value={InvoiceStatus.Pending}>Pending</option>
            <option value={InvoiceStatus.Paid}>Paid</option>
            <option value={InvoiceStatus.Unpaid}>Unpaid</option>
          </select>
        </div>
      </section>

      <section className="barisInput flex w-full gap-10 self-end justify-end">
        <button
          type="submit"
          className="bg-[#3C50E0] text-white px-10 py-2 rounded-md hover:bg-blue-600"
        >
          {editMode ? "+ Update Invoice" : "+ Add Invoice"}
        </button>
      </section>
    </form>
  );
};

export default TambahInvoice;
