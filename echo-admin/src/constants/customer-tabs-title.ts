export interface Tabstitle {
    id: string;
    label: string;
    count?: number;
}

export const Customertabs: Tabstitle[] = [
    { id: "order_history", label: "Order History" },
    { id: "addresses", label: "Addresses" },
    { id: "tickets", label: "Tickets" }
];
