import dynamic from "next/dynamic";
import React from "react";

const Orderdetails = dynamic(
    () => import("@/screens/orders/order-details"),
    { ssr: false }
);

export default function AddProduct() {
    return (
        <Orderdetails />
    );
}