"use client";
import AddEditHeader from "@/common/add-edit-header";
import { Input } from "@/components/ui/input";
import TextEditor from "@/components/ui/text-editor";
import SingleUpload from "@/components/ui/upload/single-upload";
import MultipleSingleUpload from "@/components/ui/upload/single-multi-upload";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import doller from '@public/icons/doller.svg'
import { useProductActivateQuery, useProductDeactivateQuery, useProductDeleteQuery, useProductGetByIdQuery } from "@/api-queries/products/queries";
import ConfirmationModal from "@/components/modals/confirmation-modal";
import {  useListMenuQuery } from "@/api-queries/dropdown/queries";
import { formatId } from "@/utils/helper";
import MuiltiInputView from "@/components/ui/multi-input-view";

export default function DetailViewProduct() {
    const router = useRouter();
    const params = useParams()
    const [modalState, setModalState] = useState<{ type: string, id: any } | null>(null);
    const { data: productData, isFetching } = useProductGetByIdQuery({ id: params?.id })
    const { mutateAsync: deativate_product } = useProductDeactivateQuery()
    const { mutate: delete_product } = useProductDeleteQuery()
    const { mutateAsync: activate_product } = useProductActivateQuery();
    const menuItems = productData?.data?.productGroups.map((item: any) => item.id)
    const brandItem = productData?.data?.brand?.name
    const categoryItem = productData?.data?.category?.name
    const { data: menu } = useListMenuQuery()

    const nonPrimaryImageUrls = productData?.data?.ProductImages
        ?.filter((item: any) => !item.isPrimary)
        .map((item: any) => item.imageUrl);


    const handleAction = (type: string, id: any) => {
        setModalState({ type, id });
    };

    const handleConfirm = async () => {
        if (modalState) {
            try {
                switch (modalState.type) {
                    case 'activate':
                        await activate_product({ 'productIds': [modalState.id] });
                        break;
                    case 'deactivate':
                        await deativate_product({ 'productIds': [modalState.id] });
                        break;
                    case 'delete':
                        await delete_product(modalState.id)
                        router.push("/product-management/products");
                        break;
                    default:
                        break;
                }
                setModalState(null);
            } catch (error) {
            }
        }
    };

    function handleOnClick(e: any) {
        e.preventDefault();
        router.push("/product-management/products");
    }

    return (
        <div className="flex flex-col gap-6 h-full w-full">
            <AddEditHeader
                head="Product Details"
                onClick={handleOnClick}
                backwardIcon={true}
            />
            <div className="flex justify-between  w-full gap-4 p-6 bg-bg_secondary rounded-md h-full">
                <div className="flex items-center gap-2">
                    <span>#{formatId(productData?.data?.id, 'PRD')}</span> -
                    <span>{productData?.data?.name}</span>
                </div>
                <div className="flex gap-2 w-auto">
                    <Button
                        onClick={() =>  router.push(`/product-management/products/add-product?id=${params.id}`)}
                        variant="cancel"
                        label='Edit Product'
                        size="modal" />
                    <Button
                        onClick={() => handleAction(productData?.data?.isActive ? 'deactivate' : 'activate', params?.id)}
                        variant="cancel"
                        label={productData?.data?.isActive ? 'Deactivate' : 'Activate'}
                        size="modal" />
                    <Button
                        onClick={() => handleAction('delete', params?.id)}
                        variant="outline"
                        label="Delete"
                        size="modal" />
                </div>

            </div>
            <div className="flex flex-col w-full gap-4 p-6 bg-bg_secondary rounded-md h-full">
                <label className="text-md text-primary font-semibold">
                    {productData?.data?.productType == "general" ? "General Product" : "Medicinal Product"}
                </label>
                <div className="flex w-full gap-4 h-full">
                    <div className="w-1/2">
                        <Input
                            label="Product name"
                            value={productData?.data?.name}
                            disabled={true}
                        />
                    </div>
                    <div className="w-1/2">
                        <Input
                            label="Brand Name"
                            value={brandItem}
                            disabled={true}
                        />
                    </div>
                </div>
                <div className="flex w-full gap-4">
                    <div className="w-1/3">
                        <Input
                            label="Category"
                            value={categoryItem}
                            disabled={true}
                        />

                    </div>
                    <div className="w-full">
                        <MuiltiInputView
                            label="Menu"
                            isMulti={true}
                            value={menuItems}
                            options={menu?.data}
                            disabled={true}
                        />
                    </div>
                </div>
                <div className="flex w-full gap-4">
                    <div className="w-1/2">
                        <Input
                            label="Maximum Order Limit"
                            name="maxOrderLimit"
                            value={productData?.data?.maxOrderLimit}
                            disabled={true}
                        />
                    </div>
                    <div className="w-1/2">
                        <Input
                            label="Product Price"
                            icon={doller}
                            value={parseFloat(productData?.data?.price)?.toFixed(2)}
                            disabled={true}
                        />
                    </div>
                </div>

                {productData?.data?.productType == "medicinal" && (
                    <div className="flex w-full gap-4">
                        <div className="w-1/2">
                            <Input
                                label="Dosage"
                                value={productData?.data?.dosage}
                                disabled={true}
                            />
                        </div>
                        <div className="w-1/2">
                            <Input
                                label="Usage"
                                value={productData?.data?.usage}
                                disabled={true} />
                        </div>
                    </div>
                )}

                <div className="h-60">
                    <TextEditor
                        viewDescription={true}
                        label="Product Description"
                        name="eventDetails" value={productData?.data?.description} />
                </div>
            </div>

            <div className="flex w-full gap-4">
                <div className="p-6 bg-bg_secondary rounded-md w-1/4 ">
                    <label className="text-md text-primary font-semibold">
                        Primary Image
                    </label>
                    <div className="py-4">
                        <SingleUpload
                            multiselect={false}
                            image={productData?.data?.ProductImages?.find((item: any) => item.isPrimary)?.imageUrl}
                            disabled={true}
                        />
                    </div>
                </div>
                <div className="p-6 bg-bg_secondary rounded-md w-full">
                    <label className="text-md text-primary font-semibold">Media</label>
                    <div className="py-4">
                        <MultipleSingleUpload
                            multiselect={true}
                            images={nonPrimaryImageUrls}
                            disabled={true}
                        />
                    </div>
                </div>
            </div>
            <ConfirmationModal
                onClick={handleConfirm}
                isModalOpen={modalState !== null}
                handleCloseModal={() => setModalState(null)}
                title={modalState?.type === 'activate' ? "Activate" : modalState?.type === 'deactivate' ? "Deactivate" : "Delete"}
                buttonText={modalState?.type === 'delete' ? "Delete" : modalState?.type === 'activate' ? "Activate" : 'Deactivate'}
                message={modalState?.type === 'activate' ? "This product will be displayed from the customers list. Are you sure you want to proceed?" :
                    modalState?.type === 'deactivate' ? "This product will be removed from the customers list. Are you sure you want to proceed?" :
                        "This product will be permanently removed from the customers list. Are you sure you want to proceed?"} />
        </div>
    );
}
