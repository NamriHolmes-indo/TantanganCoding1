export enum InvoiceStatus {
    Pending = "Pending",
    Paid = "Paid",
    Unpaid = "Unpaid",
  }
  
  export interface Invoice {
    id: string;
    name: string;
    number: string;
    dueDate: string;
    amount: number;
    status: InvoiceStatus | "";
  }
  