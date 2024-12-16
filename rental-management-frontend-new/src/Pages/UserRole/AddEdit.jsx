import React from 'react'
import { useFormik } from 'formik';
import ModalLayout from '../../Common/ModalLayout'
import InputField from '../../Components/CustomInput/InputField'
import AuthButton from '../../Components/CustomButtons/AuthButton';
import SelectField from '../../Components/CustomSelect/SelectField';
import TextareaInput from '../../Components/CustomInput/TextareaInput';
import * as Yup from 'yup';
import { user_permission } from '../../Utils/Constants';
import { useUserRoleCreateQuery, useUserRoleIdQuery, useUserRoleUpdateQuery } from '../../ApiQuery/UserRole/UserRoleQuery';

const AddEdit = ({ isModalOpen, setIsModalOpen, id }) => {
  const { mutateAsync: create, isPending } = useUserRoleCreateQuery()
  const { data, isPending: getPending } = useUserRoleIdQuery(id)
  const { mutateAsync: update, isPending: updatePending } = useUserRoleUpdateQuery()

  const initialValues = {
    name: data?.name || '',
    access_granted: data?.access_granted?.map(e => {
      return {
        label: e,
        value: e
      }
    }) || [],
    description: data?.description || ""
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[^\s].*$/, 'Field should not start with a blank space')
      .matches(/^[A-Za-z\s]*$/, 'Special characters and numbers are not allowed')
      .min(3, 'Minimum 3 characters')
      .required('This field is required'),
    access_granted: Yup.array()
      .min(1, 'This field is required'),
    description: Yup.string()
      .min(3, 'Minimum 3 characters')
      .max(100, 'Maximum 100 characters')
      .required('This field is required'),
  })


  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      const details = {
        'role_name': values.name,
        'access_granted': values.access_granted?.map(({ value }) => value) || [],
        'description': values.description,
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
    <ModalLayout isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title={id ? "Edit Role" : "Add New Role"}>
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className='outline-dotted outline-2 rounded-lg outline-slate-200 px-8 py-8 mt-11'>

          <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
            <label className='w-48 text-secondary'> Enter Role Name</label>
            <InputField
              placeholder="Role name"
              className="bg-search-bg-color border-none"
              name='name'
              errors={formik.errors.name}
              value={formik.values.name}
              touched={formik.touched.name}
              handleChange={formik.handleChange}
            />
          </div>

          <div className='flex gap-4 flex-col sm:flex-row mobile:w-full mb-4'>
            <label className='w-48 text-secondary'>User Permissions</label>
            <SelectField
              placeholder="Select"
              options={user_permission}
              name="access_granted"
              isMulti={true}
              constant={true}
              errors={formik.errors.access_granted}
              value={formik.values.access_granted}
              touched={formik.touched.access_granted}
              onChange={(selectedOptions) => {
                formik.setFieldValue('access_granted', selectedOptions);
              }}
            />
          </div>

          <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
            <label className='w-48 text-secondary'>Enter Description</label>
            <TextareaInput
              placeholder="Description"
              name="description"
              value={formik.values.description}
              handleChange={formik.handleChange}
              errors={formik.errors.description}
              touched={formik.touched.description}
              className="bg-search-bg-color border-none"
            />
          </div>
        </div>

        <div className='flex justify-end pt-6'>
          <AuthButton
            loading={isPending || updatePending}
            type='submit'
            label={id ? "Save Changes" : "Add New Role"}
            className="w-56 bg-primary rounded-md h-10 flex items-center justify-center text-color-white" />
        </div>
      </form>
    </ModalLayout>
  )
}

export default AddEdit