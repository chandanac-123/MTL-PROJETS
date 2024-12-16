// import AddEditProduct from "@/screens/products/add-edit-form";
import dynamic from "next/dynamic";
import React from "react";

const AddEditProduct = dynamic(
  () => import("@/screens/products/add-edit-form"),
  { ssr: false }
);

export default function AddProduct() {
  return (
    // <div>
    <AddEditProduct />
    // </div>
  );
}
