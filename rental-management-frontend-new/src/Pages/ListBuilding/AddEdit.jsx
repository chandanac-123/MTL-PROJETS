import React from 'react'
import ModalLayout from '../../Common/ModalLayout'
import InputField from '../../Components/CustomInput/InputField'
import AuthButton from '../../Components/CustomButtons/AuthButton'
import { useBuildingCreateQuery, useBuildingUpdateQuery } from '../../ApiQuery/ListBuilding/BuildingQuery'
import { useFormik } from 'formik'
import { useStateDropdown } from '../../ApiQuery/Dropdown/ListQuery'
import TextareaInput from '../../Components/CustomInput/TextareaInput'
import SelectField from '../../Components/CustomSelect/SelectField';
import * as Yup from 'yup';
const pinCodeRegex = /^[1-9][0-9]{5}$/;

const AddEdit = ({ isModalOpen, setIsModalOpen, id }) => {
    const { data: stateDropdown, isPending: propDropdown } = useStateDropdown()
    const { mutateAsync: create, isPending } = useBuildingCreateQuery()
    const { mutateAsync: update, isPending: isUpdate } = useBuildingUpdateQuery()

    const initialValues = {
        name: isModalOpen?.property_name || '',
        address: isModalOpen?.address || '',
        town: isModalOpen?.town || '',
        state: isModalOpen?.state_id?.id ? {
            value: isModalOpen?.state_id?.id,
            label: isModalOpen?.state_id?.state_name
        } : "",
        pin_code: isModalOpen?.pincode || '',
    };


    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .matches(/^[^\s].*$/, 'Field should not start with a blank space')
            .required('This field is required'),
        state: Yup.object()
            .required('This field is required'),
        address: Yup.string()
            .required('This field is required'),
        town: Yup.string()
            .required('This field is required'),
        pin_code: Yup.string()
            .matches(pinCodeRegex, 'Invalid PIN code')
            .required('This field is required'),
    })

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            const details = {
                'property_name': values?.name,
                'address': values?.address,
                'town': values?.town,
                'pincode': values?.pin_code,
                'state_id': values.state?.value,
                "is_building": true
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
            } catch (err) {
                console.error(err)
                setStatus("Somthing went wrong !")
            }
        },
    })

    return (
        <ModalLayout isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title={id ? "Edit New Building" : "Add New Building"}>
            <form onSubmit={formik?.handleSubmit} noValidate>
                <div className='outline-dotted outline-2 rounded-lg outline-slate-200 px-8 py-4 mt-11'>

                    <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
                        <label className='w-48 text-secondary'>Building Name</label>
                        <InputField
                            className="bg-search-bg-color border-none"
                            name='name'
                            errors={formik.errors.name}
                            value={formik.values.name}
                            touched={formik.touched.name}
                            handleChange={formik.handleChange}
                        />
                    </div>
                    <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
                        <label className='w-48 text-secondary'>Address</label>
                        <TextareaInput
                            placeholder="Address"
                            name="address"
                            className="bg-search-bg-color border-none"
                            errors={formik?.errors.address}
                            value={formik?.values.address}
                            touched={formik?.touched.address}
                            handleChange={formik?.handleChange}
                        />
                    </div>

                    <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
                        <label className='w-48 text-secondary '>Town</label>
                        <InputField
                            placeholder="Town"
                            className="bg-search-bg-color border-none"
                            name='town'
                            errors={formik?.errors.town}
                            value={formik?.values.town}
                            touched={formik?.touched.town}
                            handleChange={formik?.handleChange}
                        />
                    </div>

                    <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
                        <label className='w-48 text-secondary'>State</label>
                        <SelectField
                            placeholder="Select"
                            name="state"
                            constant={false}
                            isMulti={false}
                            options={stateDropdown}
                            errors={formik?.errors.state}
                            value={formik?.values.state}
                            touched={formik?.touched.state}
                            onChange={(selectedOptions) => {
                                formik.setFieldValue('state', selectedOptions);
                            }}
                        />
                    </div>

                    <div className='flex gap-4 flex-col sm:flex-row mobile:w-full mt-6'>
                        <label className='w-48 text-secondary'>Pin code</label>
                        <InputField
                            type='number'
                            placeholder="Pin code"
                            className="bg-search-bg-color border-none"
                            name='pin_code'
                            errors={formik?.errors.pin_code}
                            value={formik?.values.pin_code}
                            touched={formik?.touched.pin_code}
                            handleChange={formik?.handleChange}
                        />
                    </div>
                </div>
                <div className='flex justify-end pt-6'>
                    <AuthButton
                        loading={isPending}
                        type='submit'
                        label={id ? "Save Changes" : "Add New Building"}
                        className="w-56 bg-primary rounded-md h-10 flex items-center justify-center text-color-white" />
                </div>
            </form>
        </ModalLayout>

    )
}

export default AddEdit