'use client'
import { useStockUpdateQuery } from "@/api-queries/stock-managemant/queries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ModalLayout from "@/components/ui/modal";
import RadioButton from "@/components/ui/radio_button";
import { StockUpdate } from "@/constants/stock-update";
import { stockUpdateSchema } from "@/utils/validations";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

type FormValues = {
    quantity: string;
}

export default function UpdateStock({ update, singleData, handelCloseModal, setTableParams }: any) {
    const [currentStock, setCurrentStock] = useState<number | null>(null); // Store current stock in state
    const [selectedValue, setSelectedValue] = useState("add-stock");
    const { mutateAsync: update_stock, isPending } = useStockUpdateQuery()

    useEffect(() => {
        // Ensure singleData?.stock is available before setting currentStock
        if (singleData?.stock !== undefined) {
            setCurrentStock(singleData.stock);
        }
    }, [singleData?.stock]);

    const initialValues: FormValues = {
        quantity: '',
    };

    const handleRadioChange = (value: string) => {
        setSelectedValue(value);
        setCurrentStock(singleData?.stock)
        formik.resetForm()
    };

    const formik = useFormik<FormValues>({
        initialValues,
        enableReinitialize: true,
        validationSchema: stockUpdateSchema,
        onSubmit: async (values: any) => {
            const details = {
                "quantity": values?.quantity,
                'action': selectedValue
            }
            try {
                await update_stock({ data: details, id: update });
                setTableParams((preParams: any) => ({
                    ...preParams
                }))
                handelCloseModal()
                formik.resetForm()

            } catch (error: any) {

            }
        }
    });

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const quantity = Number(e.target.value);
        // Update the current stock dynamically based on selected action
        if (selectedValue === "add-stock") {
            setCurrentStock(Number(singleData?.stock) + quantity);
        } else {
            setCurrentStock(Number(singleData?.stock) - quantity);
        }
        formik.handleChange(e); // Update formik's state
    };


    return (
        <ModalLayout isOpen={update} onClose={handelCloseModal} title='Update Stock'>
            <form onSubmit={formik.handleSubmit} noValidate>
                <div className="flex justify-between gap-2">
                    <p className="text-primary font-semibold text-md break-words whitespace-normal">{singleData?.product?.name}</p>
                    <p className={`whitespace-nowrap ${currentStock && currentStock < 0 ? 'text-text_error' : ''}`}>
                        Current Stock: {currentStock}
                    </p>
                </div>
                <div className="flex py-6">
                    <RadioButton
                        options={StockUpdate}
                        onChange={handleRadioChange}
                        defaultValue={selectedValue}
                    />
                </div>
                <Input
                    placeholder="Enter quantity"
                    label="Quantity"
                    name="quantity"
                    type='number'
                    handleChange={handleQuantityChange}
                    value={formik.values.quantity}
                    errors={formik?.errors?.quantity}
                    touched={formik.touched.quantity}
                />
                <div className="flex gap-4 mt-8">
                    <Button
                        variant="cancel"
                        label="Cancel"
                        size="modal"
                        onClick={handelCloseModal}
                    />
                    <Button
                        variant="add_button"
                        label="Save Changes"
                        size="add"
                        type="submit"
                        disabled={isPending}
                    />
                </div>
            </form>
        </ModalLayout>
    )
}
