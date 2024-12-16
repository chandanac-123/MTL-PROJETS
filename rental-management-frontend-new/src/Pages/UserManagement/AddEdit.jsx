import React, { useEffect } from 'react'
import ModalLayout from '../../Common/ModalLayout'
import InputField from '../../Components/CustomInput/InputField'
import SelectField from '../../Components/CustomSelect/SelectField'
import AuthButton from '../../Components/CustomButtons/AuthButton'
import { useUserCreateQuery, useUserIdQuery, useUserUpdateQuery } from '../../ApiQuery/UserManagement/UserQuery'
import * as Yup from 'yup';
import { useFormik } from 'formik'
import { useUserRole } from '../../ApiQuery/Dropdown/ListQuery'

const AddEdit = ({ id, isModalOpen, setIsModalOpen }) => {
    const { mutateAsync: create, isPending } = useUserCreateQuery()
    const { data, isPending: getPending } = useUserIdQuery(id)
    const { mutateAsync: update, isPending: updatePending } = useUserUpdateQuery()
    const { data: all_user, isPending: rolePending, refetch } = useUserRole()

    useEffect(() => {
        refetch()
    }, [])

    const initialValues = {
        full_name: data?.full_name || "",
        email: data?.email || '',
        phone: data?.phone_number || '',
        name: data?.groups?.[0] ? {
            value: data?.groups?.[0]?.id,
            label: data?.groups?.[0]?.name
        } : ""
    }

    const validationSchema = Yup.object().shape({
        full_name: Yup.string()
            .matches(/^[^\s].*$/, 'Name should not start with a blank space')
            .matches(/^[A-Za-z\s]*$/, 'Special characters and numbers are not allowed')
            .min(3, 'Minimum 3 characters')
            .max(50, 'Maximum 50 characters')
            .required('This field is required'),
        email: Yup.string()
            .email('Invalid email address')
            .matches(/^(?!.*@[^,]*,)/)
            .required('Email is required'),
        phone: Yup.string()
            .max(10, 'Phone number is not valid')
            .matches(/^[789]\d{9,}$/, 'Phone number is not valid')
            .required('This field is required'),
        name: Yup.object()
            .required('This field is required'),
    })

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            console.log('values: ', values);
            const details = {
                'full_name': values.full_name,
                'email': values.email,
                'user_group_id': values?.name?.value,
                'phone_number': values.phone,
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
        <ModalLayout isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title={id ? "Edit User" : "Add New User"}>
            <form onSubmit={formik.handleSubmit} noValidate>
                <div className='outline-dotted outline-2 rounded-lg outline-slate-200 px-8 py-8 mt-11 '>
                    <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
                        <label className='w-48 text-secondary'>Enter Name</label>
                        <InputField
                            placeholder="Full name"
                            className="bg-search-bg-color border-none"
                            name='full_name'
                            errors={formik.errors.full_name}
                            value={formik.values.full_name}
                            touched={formik.touched.full_name}
                            handleChange={formik.handleChange} />
                    </div>
                    <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
                        <label className='w-48 text-secondary'>User Role</label>
                        <SelectField
                            placeholder="Role Name"
                            className="bg-search-bg-color border-none"
                            name="name"
                            constant={false}
                            isMulti={false}
                            options={all_user}
                            value={formik.values.name}
                            errors={formik.errors.name}
                            touched={formik.touched.name}
                            onChange={(selectedOptions) => {
                                formik.setFieldValue('name', selectedOptions);
                            }}
                        />
                    </div>
                    <div className='flex gap-4 flex-col sm:flex-row mobile:w-full mt-8'>
                        <label className='w-48 text-secondary'>Email Address</label>
                        <InputField
                            placeholder="Email"
                            className="bg-search-bg-color border-none"
                            name='email'
                            errors={formik.errors.email}
                            value={formik.values.email}
                            touched={formik.touched.email}
                            handleChange={formik.handleChange} />
                    </div>
                    <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
                        <label className='w-48 text-secondary'>Phone Number</label>
                        <InputField
                            placeholder="+91"
                            className="bg-search-bg-color border-none"
                            name='phone'
                            errors={formik.errors.phone}
                            value={formik.values.phone}
                            touched={formik.touched.phone}
                            handleChange={formik.handleChange} />
                    </div>
                    <div className='flex justify-end pt-6'>
                        <AuthButton
                            loading={isPending || updatePending}
                            type='submit'
                            label={id ? "Save Changes" : "Add User"}
                            className="w-56 bg-primary rounded-md h-10 flex items-center justify-center text-color-white" />
                    </div>
                </div>
            </form>
        </ModalLayout>
    )
}

export default AddEdit