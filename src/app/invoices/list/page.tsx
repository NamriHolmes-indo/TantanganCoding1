import { Suspense } from "react";
import InvoiceListPage from "@/components/invoices/InvoiceListPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InvoiceListPage />
    </Suspense>
  );
}
