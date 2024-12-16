"use client";
import { Button } from "@/components/ui/button";
import ModalLayout from "@/components/ui/modal";
import RadioButton from "@/components/ui/radio_button";
import {  ProductCategory } from "@/constants/add-product-category";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddEditModal({
  isModalOpen,
  handleCloseModal,
  title,
}: any) {
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState("general");

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  const handleNextClick = () => {
    // localStorage.setItem('productCategory', selectedValue);
    // router.push("/product-management/products/add-product");
    router.push(`/product-management/products/add-product?id=${selectedValue}`);
  };

  return (
    <ModalLayout
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      title="Add New product"
    >
      <RadioButton
        options={ProductCategory}
        onChange={handleRadioChange}
        defaultValue={selectedValue}
      />
      <div className="flex gap-4 mt-8">
        <Button
          variant="cancel"
          label="Cancel"
          size="modal"
          onClick={handleCloseModal}
        />
        <Button
          variant="add_button"
          label="Next"
          size="add"
          onClick={handleNextClick}
        />
      </div>
    </ModalLayout>
  );
}
