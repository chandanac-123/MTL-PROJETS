import dynamic from "next/dynamic";
import React from "react";

const Customerdetails = dynamic(
    () => import("@/screens/customer-management/customer-details"),
    { ssr: false }
);

export default function AddProduct() {
    return (
        <Customerdetails />
    );
}