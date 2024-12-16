import React from 'react'
import InputField from '../../../Components/CustomInput/InputField';
import TextareaInput from '../../../Components/CustomInput/TextareaInput';
import SelectField from '../../../Components/CustomSelect/SelectField';
import ContinueButton from '../../../Components/CustomButtons/ContinueButton';
import right_arrow from '../../../Static/Images/arrow-right.svg'
import { useStateDropdown } from '../../../ApiQuery/Dropdown/ListQuery';
import ModalLayout from '../../../Common/ModalLayout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { usePropertyUpdateQuery } from '../../../ApiQuery/Property/PropertyQuery';
const pinCodeRegex = /^[1-9][0-9]{5}$/; 

const EditLoctaionDetails = ({ id, data, setIsLocationModalOpen, isLoctaionModalOpen }) => {
  const { mutateAsync: update, isPending: updatePending } = usePropertyUpdateQuery()
  const { data: stateDropdown, isPending } = useStateDropdown()

  const initialValues = {
    address: data?.address || "",
    town: data?.town || "",
    state:data?.state_id?.id  ? {
      value: data?.state_id?.id ,
      label: data?.state_id?.state_name 
  } : "",
    pin_code: data?.pincode || "",
  };

  const loactionFormValidatSchema = Yup.object().shape({
    address: Yup.string()
      .required('This field is required'),
    town: Yup.string()
      .required('This field is required'),
      pin_code: Yup.string()
      .matches(pinCodeRegex, 'Invalid PIN code')
      .required('This field is required'),
    state: Yup.object()
      .required('This field is required'),
  })

  const formik = useFormik({
    initialValues,
    validationSchema: loactionFormValidatSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      const formData = new FormData();
      formData.append('address', values.address)
      formData.append('town', values.town)
      formData.append('pincode', values.pin_code)
      formData.append('state_id', values.state?.value)
      formData.append('location_pin', values.state?.location_pin)
      setSubmitting(true)
      try {
        const data = await update({formData,id})
        setIsLocationModalOpen(false)
      } catch (error) {
        console.error(error)
        setStatus("Somthing went wrong !")
      }
    },
  })

  return (
    <ModalLayout isModalOpen={isLoctaionModalOpen} setIsModalOpen={setIsLocationModalOpen} title="Edit Location Details">
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className='max-w-full mobile:max-w-[800px] mx-auto rounded-lg outline-slate-200 mt-11'>
          <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
            <label className='w-48 text-secondary'>Address</label>
            <TextareaInput
              placeholder="Description"
              name="address"
              className="bg-search-bg-color border-none"
              errors={formik?.errors.address}
              value={formik?.values.address}
              touched={formik?.touched.address}
              handleChange={formik?.handleChange}
            />
          </div>

          <div className='flex gap-8 md:flex-row flex-col mobile:w-full' >
            <div className='flex flex-col sm:flex-row md:gap-14 mb-1 sm:mb-1 w-full mobile:w-3/4'>
              <label className='w-48 text-secondary '>Town</label>
              <InputField
                placeholder="Role name"
                className="bg-search-bg-color border-none"
                name='town'
                errors={formik?.errors.town}
                value={formik?.values.town}
                touched={formik?.touched.town}
                handleChange={formik?.handleChange}
              />
            </div>
            <div className='flex gap-4 flex-col sm:flex-row w-full mobile:w-3/4'>
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
          </div>

          <div className='flex flex-col sm:flex-row md:gap-12 mb-4 sm:mb-1 w-1/2'>
            <label className='w-48 text-secondary'>Pin code</label>
            <InputField
              placeholder="Role name"
              className="bg-search-bg-color border-none"
              name='pin_code'
              errors={formik?.errors.pin_code}
              value={formik?.values.pin_code}
              touched={formik?.touched.pin_code}
              handleChange={formik?.handleChange}
            />
          </div>
          <div className='flex  pt-6 justify-end'>
            <ContinueButton type='submit' loading={updatePending} label="Save Changes" img={right_arrow} />
          </div>
        </div>
      </form>
    </ModalLayout>
  )
}

export default EditLoctaionDetails