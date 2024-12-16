import { useMenuAddQuery, useMenuEditQuery, useMenuGetByIdQuery } from '@/api-queries/menu/menu-queries'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ModalLayout from '@/components/ui/modal'
import SingleUpload from '@/components/ui/upload/single-upload'
import { menuSchema } from '@/utils/validations'
import { useFormik } from 'formik'
import { useState } from 'react'

type FormValues = {
    menu: string;
    imageFile: ''
}

export default function AddEditMenu({ id, isModalOpen, setIsModalOpen, setTableParams }: any) {
    const { mutateAsync: add_menu, isPending } = useMenuAddQuery()
    const { mutateAsync: edit_menu, isPending: edit_pending } = useMenuEditQuery()
    const { data: single_menu_view, isLoading, refetch } = useMenuGetByIdQuery({ id: id, enable: true })
    const [err, setErr] = useState(false)

    const initialValues: FormValues = {
        menu: single_menu_view?.data?.name || '',
        imageFile: single_menu_view?.data?.imageUrl || ''
    };

    const formik = useFormik<FormValues>({
        initialValues,
        enableReinitialize: true,
        validationSchema: menuSchema,
        onSubmit: async (values: any) => {
            const details: any = {
                name: values?.menu.trim(),
            }
            if (values?.imageFile) {
                details.imageUrl = values.imageFile;
            }
            try {
                if (id) {
                    await edit_menu({ data: details, id });
                    setTableParams((prevParams: any) => ({
                        ...prevParams
                    }))
                    refetch()
                } else {
                    await add_menu(details);
                }
                handleCloseModal();
            } catch (error: any) {
                if (error?.response?.data?.message == "Product Group exists")
                    setErr(!err)
            }
        }
    });

    const handleCloseModal = () => {
        setIsModalOpen(false);
        formik.resetForm();
        setErr(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik.handleChange(e);
        if (e.target.value.trim()) {
            setErr(false);
        }
    };

    return (
        <ModalLayout isOpen={isModalOpen} onClose={handleCloseModal} title={id ? "Edit Menu" : "Add New Menu"}>
            <form onSubmit={formik.handleSubmit} noValidate>
                <Input
                    label='Menu'
                    placeholder="Enter menu name"
                    handleChange={handleChange}
                    name="menu"
                    value={formik.values.menu}
                    errors={formik.errors.menu}
                    touched={formik.touched.menu}
                />
                {err && <div className="bg-bg_error text-text_error my-8 h-8 items-center flex justify-center text-xs rounded-xs">
                    This menu already exists in our system.
                </div>}
                <div className=" bg-bg_secondary rounded-md w-full py-2 pt-8">
                    <span>Menu Image</span>
                    <div className="py-4">
                        <SingleUpload
                            multiselect={false}
                            type='menu'
                            formik={formik}
                            fileChange={(e: any) => formik.setFieldValue('imageFile', e)}
                            image={single_menu_view?.data?.imageUrl}
                            value={formik?.values?.imageFile}
                            errors={formik.errors.imageFile}
                            touched={formik.touched.imageFile} />
                    </div>
                </div>
                <div className="flex gap-4 mt-8">
                    <Button
                        variant="cancel"
                        label="Cancel"
                        size='modal'
                        type='button'
                        onClick={handleCloseModal} />
                    <Button
                        variant="add_button"
                        size='add'
                        type='submit'
                        label={id ? "Save Changes" : "Add Menu"}
                        disabled={isPending || edit_pending}
                    />
                </div>
            </form>
        </ModalLayout>
    )
}
