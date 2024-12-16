import React from 'react'
import ModalLayout from '../../../../Common/ModalLayout'
import TextareaInput from '../../../../Components/CustomInput/TextareaInput'
import AuthButton from '../../../../Components/CustomButtons/AuthButton'
import { useFormik } from 'formik'
import { useExpenseEditQuery } from '../../../../ApiQuery/Expenses/ExpenseQuery'
import * as Yup from 'yup';

const RemarkAddEdit = ({ remark, setRemark, id, data }) => {
    const { mutateAsync: remarks, isPending } = useExpenseEditQuery();

    const initialValues = {
        remark: data?.remarks || '',
    };


    const validationSchema = Yup.object().shape({
        remark: Yup.string()
            .matches(/^[^\s].*/, {
                message: 'Field should not start with a blank space',
                excludeEmptyString: true,
            })
            .required('This field is required'),
    });


    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            const formData = new FormData();
            formData.append('remarks', values.remark)
            setSubmitting(true)
            try {
                const data = await remarks({ formData, id })
                setRemark(false)
                formik.resetForm()
            } catch (err) {
                console.error(err)
                setStatus("Somthing went wrong !")
            }
        },
    })

    return (
        <ModalLayout isModalOpen={remark} setIsModalOpen={setRemark} title={data?.remarks ? 'Edit Remarks' : 'Add Remarks'}>
            <form onSubmit={formik.handleSubmit} noValidate>
                <div className='outline-dotted outline-2 rounded-lg outline-slate-200 px-8 py-8 mt-11'>
                    <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
                        <label className='w-48 text-secondary'> Remarks</label>
                        <TextareaInput
                            placeholder="Description"
                            name="remark"
                            value={formik.values.remark}
                            handleChange={formik.handleChange}
                            errors={formik.errors.remark}
                            touched={formik.touched.remark}
                            className="bg-search-bg-color border-none"
                        />
                    </div>
                </div>
                <div className='flex justify-end pt-6'>
                    <AuthButton
                        loading={isPending}
                        type='submit'
                        label={data?.remarks ? "Save Changes" : "Add Remarks"}
                        className="w-56 bg-primary rounded-md h-10 flex items-center justify-center text-color-white" />
                </div>
            </form>
        </ModalLayout>
    )
}

export default RemarkAddEdit