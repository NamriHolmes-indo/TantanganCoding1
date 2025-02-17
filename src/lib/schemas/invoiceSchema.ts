import * as z from "zod";
import { INVOICE_STATUSES } from "@/constants/invoiceStatus";

export const invoiceSchema = z.object({
  nama: z.string().min(1, "Nama invoice wajib diisi"),
  jaTemp: z.string().min(1, "Tanggal jatuh tempo wajib diisi"),
  jumlah: z.number().min(1, "Jumlah harus lebih dari 0"),
  status: z.enum(INVOICE_STATUSES),
});
