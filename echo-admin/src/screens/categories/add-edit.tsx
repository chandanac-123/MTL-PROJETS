import { useCategoryAddQuery, useCategoryEditQuery, useCategoryGetByIdQuery } from '@/api-queries/category/category-queries'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ModalLayout from '@/components/ui/modal'
import { categorySchema } from '@/utils/validations'
import { useFormik } from 'formik'
import React, { useState } from 'react'

type FormValues = {
    category: string;
}

export default function AddEditCategory({ id, isModalOpen, setIsModalOpen ,setTableParams}: any) {
    const { data, isLoading ,refetch} = useCategoryGetByIdQuery({ id: id, enable: true })
    const { mutateAsync: add_category, isPending } = useCategoryAddQuery()
    const { mutateAsync: edit_category, isPending: edit_loading } = useCategoryEditQuery()
    const [err, setErr] = useState(false)

    const initialValues: FormValues = {
        category: data?.data?.name || '',
    };

    const formik = useFormik<FormValues>({
        initialValues,
        enableReinitialize: true,
        validationSchema: categorySchema,
        onSubmit: async (values: any) => {
            const details = { "name": values?.category }
            try {
                if (id) {
                    await edit_category({ data: details, id });
                    handleCloseModal();
                    refetch()
                    setTableParams((prevParams: any) => ({
                        ...prevParams,
                    }));
                } else {
                    await add_category(details);
                    handleCloseModal();
                    setTableParams((prevParams: any) => ({
                        ...prevParams,
                        page:1
                    }));
                }
                // Clear the error after a successful submission
                setErr(false);
            } catch (error: any) {
                if (error?.response?.data?.message === "Category already exists") {
                    // Always set the error to true when the category already exists
                    setErr(true);
                }
            }
        }
    });

    const handleCloseModal = () => {
        setIsModalOpen(false);
        formik.resetForm();
        // Clear error state when closing the modal
        setErr(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik.handleChange(e);
        if (e.target.value.trim()) {
            // Reset the error if the user modifies the input
            setErr(false);
        }
    };

    return (
        <ModalLayout isOpen={isModalOpen} onClose={handleCloseModal} title={id ? "Edit Category" : "Add New Category"}>
            <form onSubmit={formik.handleSubmit} noValidate>
                <Input
                    label='Category Name'
                    placeholder="Enter category name"
                    handleChange={handleChange}
                    name="category"
                    value={formik.values.category}
                    errors={formik?.errors?.category}
                    touched={formik.touched.category}
                />
                {err && (
                    <div className="bg-bg_error text-text_error my-8 h-8 items-center flex justify-center text-xs rounded-xs">
                        This category already exists in our system.
                    </div>
                )}
                <div className="flex gap-4 mt-8">
                    <Button
                        type='button'
                        variant="cancel"
                        label="Cancel"
                        size='modal'
                        onClick={handleCloseModal} />
                    <Button
                        type='submit'
                        variant="add_button"
                        size='add'
                        label={id ? "Save Changes" : "Add Category"}
                        disabled={isPending || edit_loading}
                    />
                </div>
            </form>
        </ModalLayout>
    );
}
