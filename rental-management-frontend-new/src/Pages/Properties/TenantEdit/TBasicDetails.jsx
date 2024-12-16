import React from 'react'
import InputField from '../../../Components/CustomInput/InputField';
import ContinueButton from '../../../Components/CustomButtons/ContinueButton';
import double_check from '../../../Static/Images/double-check.svg'
import ModalLayout from '../../../Common/ModalLayout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTenantUpdateQuery } from '../../../ApiQuery/Tenant/TenantQuery';
import { capitalizeNames } from '../../../Utils/Helper';

const EditTBasicDetails = ({ isBasicModalOpen, setIsBasicModalOpen, data }) => {

  const { mutateAsync: update, isPending } = useTenantUpdateQuery()

  const initialValues = {
    tenant_name: capitalizeNames(data?.property_history?.[0]?.tenant_id?.tenant_name) || '',
    phone_number: data?.property_history?.[0]?.tenant_id?.phone_number || "",
    tenant_email: data?.property_history?.[0]?.tenant_id?.tenant_email || ""
  };

  const basicFormValidatSchema = Yup.object().shape({
    tenant_name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, 'Only letters and spaces are allowed')
      .required('This field is required'),
    phone_number: Yup.string()
      .max(10, 'Phone number is not valid')
      .matches(/^[6789]\d{9,}$/, 'Phone number is not valid')
      .required('This field is required'),
    tenant_email: Yup.string()
      .required('This field is required')
  })

  const formik = useFormik({
    initialValues,
    validationSchema: basicFormValidatSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      console.log('values: ', values);
      const formData = new FormData();
      formData.append('property_id', data?.id)
      formData.append('tenant_name', values.tenant_name)
      formData.append('phone_number', values.phone_number)
      formData.append('tenant_email', values.tenant_email)
      setSubmitting(true)
      try {
        const datas = await update({ formData, id: data?.property_history?.[0]?.tenant_id?.id })
        setIsBasicModalOpen(false)
      } catch (error) {
        console.error(error)
        setStatus("Somthing went wrong !")
      }
    },
  })

  return (
    <ModalLayout isModalOpen={isBasicModalOpen} setIsModalOpen={setIsBasicModalOpen} title="Edit Basic Details">
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className=' max-w-full mobile:max-w-[800px] mx-auto rounded-lg outline-slate-200  mt-11'>
          <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
            <label className='w-48 text-secondary'>Tenant Name</label>
            <InputField
              placeholder="Tenant Name"
              className="bg-search-bg-color border-none"
              name='tenant_name'
              errors={formik?.errors.tenant_name}
              value={formik?.values.tenant_name}
              touched={formik?.touched.tenant_name}
              handleChange={formik?.handleChange}
            />
          </div>

          <div className='flex gap-4 flex-col sm:flex-row  mobile:w-full'>
            <label className='w-48 text-secondary'>Phone Number</label>
            <InputField
              placeholder="Phone Number"
              className="bg-search-bg-color border-none"
              name='phone_number'
              errors={formik?.errors.phone_number}
              value={formik?.values.phone_number}
              touched={formik?.touched.phone_number}
              handleChange={formik?.handleChange}
            />
          </div>
          <div className='flex gap-4 flex-col sm:flex-row  mobile:w-full'>
            <label className='w-48 text-secondary'>Email Address</label>
            <InputField
              placeholder="Email Address"
              className="bg-search-bg-color border-none"
              name='tenant_email'
              errors={formik?.errors.tenant_email}
              value={formik?.values.tenant_email}
              touched={formik?.touched.tenant_email}
              handleChange={formik?.handleChange}
            />
          </div>
          <div className='flex  w-full sm:w-auto justify-end pt-6'>
            <ContinueButton
              type='submit' loading={isPending} label="Save Changes" img={double_check} />
          </div>
        </div>
      </form>
    </ModalLayout>
  )
}

export default EditTBasicDetails