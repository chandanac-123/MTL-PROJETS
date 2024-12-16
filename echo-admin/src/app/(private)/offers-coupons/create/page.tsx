import dynamic from "next/dynamic";
import React from "react";

const CreateCoupons = dynamic(
    () => import("@/screens/offers-coupons/offer_coupon_user_table/add-edit-form"),
    { ssr: false }
);

export default function AddProduct() {
    return (
     <CreateCoupons/>
    );
}