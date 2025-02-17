import { useEffect, useState } from "react";
import Image from "next/image";

const NotifInsert = ({ status, missingFields }: { status: string, missingFields?: string[] }) => {
    const [showNotif, setShowNotif] = useState<boolean>(false);

    useEffect(() => {
        if (status) {
            setShowNotif(true);
            const timeout = setTimeout(() => {
                setShowNotif(false);
            }, status === 'success' ? 2000 : 2000); // 10s for success, 20s for error
            return () => clearTimeout(timeout);
        }
    }, [status]);

    return (
        <div
            className={`flex w-full border-l-8 gap-10 rounded-md items-center flex-row p-5 transition-opacity duration-500 ${status === 'success' ? 'border-green-500 bg-[#E1F9F0]' : 'border-red-500 bg-[#FEE2E2]'} ${showNotif ? 'opacity-100' : 'opacity-0'}`}
        >
            <Image
                src={status === 'success' ? "/sukses.png" : "/gagal.png"}
                alt={status === 'success' ? "Add Invoice" : "Failed to Add Invoice"}
                width={70}
                height={70}
            />
            <div className="flex flex-col">
                <p className={`font-bold ${status === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                    {status === 'success' ? "Invoice added successfully!" : "Failed to add invoice"}
                </p>
                <p className={`text-${status === 'success' ? 'green' : 'red'}-400`}>
                    {status === 'success' ? "You can view and manage your invoice in the 'My Invoices' section." :
                        missingFields?.length ? `Please fill in the following fields: ${missingFields.join(", ")}` : "Please try again."}
                </p>
            </div>
        </div>
    );
};

export default NotifInsert;
