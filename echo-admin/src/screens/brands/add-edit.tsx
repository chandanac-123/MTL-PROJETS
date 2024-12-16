import { useBrandAddQuery, useBrandEditQuery, useBrandGetByIdQuery } from "@/api-queries/brands/querirs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ModalLayout from "@/components/ui/modal";
import { brandSchema } from "@/utils/validations";
import { useFormik } from "formik";
import { useState } from "react";

interface valueType { brandName: string }
interface AddEditBrandsProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  id?: string | boolean;
  setTableParams: any;
}

export default function AddEditBrands({ isModalOpen, handleCloseModal, id, setTableParams }: AddEditBrandsProps) {
  const { mutateAsync: brandAdd, isPending } = useBrandAddQuery()
  const { mutateAsync: editBrand, isPending: editPending } = useBrandEditQuery()
  const { data, isFetching, refetch } = useBrandGetByIdQuery({ id: id, enable: true })
  const [err, setErr] = useState(false)

  const initialValues: valueType = {
    brandName: data?.data?.name || ''
  }

  const formik = useFormik<valueType>({
    initialValues,
    enableReinitialize: true,
    validationSchema: brandSchema,
    onSubmit: async (values: any) => {
      const details = { "name": values?.brandName.trim() }
      try {
        if (id) {
          await editBrand({ data: details, id })
          setTableParams((prevParams: AddEditBrandsProps) => ({
            ...prevParams
          }))
          handleCloseModal()
          formik.resetForm()
          refetch()
        } else {
          await brandAdd(details)
          handleCloseModal()
          formik.resetForm()
        }
      } catch (error: any) {
        setErr(!err)
      }
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    if (e.target.value.trim()) {
      setErr(false);
    }
  };

  return (
    <ModalLayout isOpen={isModalOpen} onClose={handleCloseModal} title={id ? "Edit Brand" : "Add New Brand"}>
      <form onSubmit={formik.handleSubmit} noValidate>
        <Input
          label='Brand Name'
          placeholder="Enter brand name"
          name="brandName"
          handleChange={handleChange}
          value={formik.values.brandName}
          errors={formik?.errors?.brandName}
          touched={formik.touched.brandName} />
        {err && <div className="bg-bg_error text-text_error my-8 h-8 items-center flex justify-center text-xs rounded-xs">This brand already exists in our system.</div>}
        <div className="flex gap-4 mt-8">
          <Button variant="cancel" label="Cancel" size='modal' type="button" onClick={handleCloseModal} />
          <Button variant="add_button" label={id ? "Save Changes" : "Add Brand"} size='add' type="submit" disabled={isPending || editPending} />
        </div>
      </form>
    </ModalLayout>
  )
}
