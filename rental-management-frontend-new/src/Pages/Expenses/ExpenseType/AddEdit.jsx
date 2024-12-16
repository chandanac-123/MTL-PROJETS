import React from 'react'
import ModalLayout from '../../../Common/ModalLayout'
import { useExpenseTypeCreateQuery, useExpenseTypeIdQuery, useExpenseTypeUpdateQuery } from '../../../ApiQuery/ExpenseType/ExpenseTypeQuery'
import InputField from '../../../Components/CustomInput/InputField'
import * as Yup from 'yup';
import { useFormik } from 'formik'
import AuthButton from '../../../Components/CustomButtons/AuthButton';

const AddEdit = ({ id, isModalOpen, setIsModalOpen }) => {
    const { mutateAsync: create, isPending } = useExpenseTypeCreateQuery()
    const { mutateAsync: update, isPending: updatePending } = useExpenseTypeUpdateQuery()
    const { data, isPending: getPending } = useExpenseTypeIdQuery(id)

    const initialValues = {
        type: data?.name || "",
    }

    const validationSchema = Yup.object().shape({
        type: Yup.string().required('This field is required')
    })

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            console.log('values: ', values);
            const details = {
                'name': values.type,
            }
            setSubmitting(true)
            try {
                if (id) {
                    const data = await update({ details, id: id })
                    setIsModalOpen(false)
                } else {
                    const data = await create(details)
                    setIsModalOpen(false)
                    formik.resetForm()
                }

            } catch (error) {
                console.error(error)
                setStatus("Somthing went wrong !")
            }
        }
    })


    return (
        <ModalLayout isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title={id ? "Edit Expense Type" : "Add Expense Type"}>
            <form onSubmit={formik.handleSubmit} noValidate>
                <div className='outline-dotted outline-2 rounded-lg outline-slate-200 px-8 py-8 mt-11 '>
                    <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
                        <label className='w-48 text-secondary'>New Type</label>
                        <InputField
                            placeholder="Full name"
                            className="bg-search-bg-color border-none"
                            name='type'
                            errors={formik.errors.type}
                            value={formik.values.type}
                            touched={formik.touched.type}
                            handleChange={formik.handleChange} />
                    </div>
                    <div className='flex justify-end pt-6'>
                        <AuthButton
                            loading={isPending || updatePending}
                            type='submit'
                            label={id ? "Save Changes" : "Add Expense Type"}
                            className="w-56 bg-primary rounded-md h-10 flex items-center justify-center text-color-white" />
                    </div>
                </div>
            </form>
        </ModalLayout>
    )
}

export default AddEdit