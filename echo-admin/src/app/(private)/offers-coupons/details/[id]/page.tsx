import dynamic from "next/dynamic";
import React from "react";

const Offercouponsdetails = dynamic(
    () => import("@/screens/offers-coupons/offer-coupon-details"),
    { ssr: false }
);

export default function AddProduct() {
    return (
     <Offercouponsdetails/>
    );
}