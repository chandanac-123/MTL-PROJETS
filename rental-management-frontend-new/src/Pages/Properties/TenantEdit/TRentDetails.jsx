import React from 'react'
import ContinueButton from '../../../Components/CustomButtons/ContinueButton'
import InputField from '../../../Components/CustomInput/InputField'
import SelectField from '../../../Components/CustomSelect/SelectField'
import double_check from '../../../Static/Images/double-check.svg'
import ModalLayout from '../../../Common/ModalLayout'
import Datepicker from '../../../Components/CustomDate/Datepicker'
import { rent_due_days } from '../../../Utils/Constants'
import { useFormik } from 'formik'
import { convertDateFormat } from '../../../Utils/Helper'
import * as Yup from 'yup';
import { useTenantUpdateQuery } from '../../../ApiQuery/Tenant/TenantQuery'
import rupees_icon from '../../../Static/Images/rupees.svg'
import percent_icon from '../../../Static/Images/percent.svg'
import { Tooltip } from 'antd'
import info_icon from '../../../Static/Images/information-line.svg'

const EditTRentDetails = ({ isRentModalOpen, setIsRentModalOpen, data }) => {

  const { mutateAsync: update, isPending } = useTenantUpdateQuery()

  const incrementMonth = data?.property_history?.[0]?.tenant_id?.increment_from_month;
  const incrementYear = data?.property_history?.[0]?.tenant_id?.increment_from_year;

  const dateFun = () => {
    if (incrementMonth && incrementYear) {
      const dateObject = new Date(`${incrementYear}-${incrementMonth}-01`);
      const updatedYear = dateObject.getFullYear();
      const updatedMonth = dateObject.getMonth() + 1;
      const updatedDay = dateObject.getDate();
      const formattedDate = `${updatedYear}-${String(updatedMonth).padStart(2, '0')}-${String(updatedDay).padStart(2, '0')}`;
      return formattedDate
    } else { }
  }

  const initialValues = {
    tenantID: data?.property_history?.[0]?.tenant_id?.id,
    occupied_on: convertDateFormat(data?.property_history?.[0]?.tenant_id?.occupied_on),
    rent_amount: data?.property_history?.[0]?.tenant_id?.tenant_rent?.[0]?.rent_amount || '',
    advance_amount: data?.property_history?.[0]?.tenant_id?.advance_amount || "",
    security_deposit: data?.property_history?.[0]?.tenant_id?.security_deposit || "",
    increment_percentage: data?.property_history?.[0]?.tenant_id?.increment_percentage || "",
    rent_due_day: data?.property_history?.[0]?.tenant_id?.rent_due_day ? {
      value: data?.property_history?.[0]?.tenant_id?.rent_due_day,
      label: data?.property_history?.[0]?.tenant_id?.rent_due_day
    } : "",
    increment_effective_from: dateFun() || ""
  };

  const tenantFormValidatSchema = Yup.object().shape({
    occupied_on: Yup.date()
      .required('This field is required'),
  })


  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validateOnMount: true,
    validationSchema: tenantFormValidatSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      const formData = new FormData();
      formData.append('occupied_on', values?.occupied_on)
      formData.append('rent_amount', values.rent_amount)
      formData.append('advance_amount', values.advance_amount)
      formData.append('security_deposit', values.security_deposit)
      formData.append('increment_percentage', values.increment_percentage)
      formData.append('rent_due_day', values.rent_due_day?.value || values.rent_due_day)
      formData.append('increment_from_month', new Date(values?.increment_effective_from).getMonth() + 1 || '')
      formData.append('increment_from_year', new Date(values?.increment_effective_from).getFullYear() || '')
      setSubmitting(true)
      try {
        const data = await update({ formData, id: initialValues?.tenantID })
        setIsRentModalOpen(false)
      } catch (error) {
        console.error(error)
        setStatus("Somthing went wrong !")
      }
    },
  })

  const onChange = (date,dateString) => {
    formik.setFieldValue(dateString, date)
  }

  return (
    <ModalLayout isModalOpen={isRentModalOpen} setIsModalOpen={setIsRentModalOpen} title="Edit Rent Details">
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className=' max-w-full mobile:max-w-[800px] mx-auto rounded-lg outline-slate-200  mt-11'>
          <div className='flex gap-4 flex-col sm:flex-row mobile:w-full mb-5'>
            <label className='w-60 text-secondary'>Tenant Occupied On</label>
            <Datepicker onChange={onChange} name='occupied_on' value={formik?.values.occupied_on} errors={formik?.errors?.occupied_on} futureDisable={false} />
          </div>

          <div className='flex gap-4 flex-col sm:flex-row  mobile:w-full'>
            <label className='w-60 text-secondary'>Advance Amount</label>
            <InputField
              icons={rupees_icon}
              placeholder=""
              className="rounded-lg p-2 pl-12 w-full bg-search-bg-color border-none"
              name='advance_amount'
              errors={formik?.errors.advance_amount}
              value={formik?.values.advance_amount}
              touched={formik?.touched.advance_amount}
              handleChange={formik?.handleChange}
            />
          </div>
          <div className='flex gap-4 flex-col sm:flex-row  mobile:w-full'>
            <label className='w-60 text-secondary'>Rent Amount</label>
            <InputField
              icons={rupees_icon}
              placeholder=""
              className="rounded-lg p-2 pl-12 w-full bg-search-bg-color border-none"
              name='rent_amount'
              errors={formik?.errors.rent_amount}
              value={formik?.values.rent_amount}
              touched={formik?.touched.rent_amount}
              handleChange={formik?.handleChange}
              disabled={formik?.values.rent_amount}
            />
          </div>
          <div className='flex gap-4 flex-col sm:flex-row  mobile:w-full'>
            <label className='w-60 text-secondary flex'>Maintenance Cost <Tooltip title="This expense is paid by the owner and will be retrieved from the advance paid by the customer.">
              <img src={info_icon} alt='' className='w-5 ml-2 mobile:mb-10 mb-0' />
            </Tooltip></label>
            <InputField
              icons={rupees_icon}
              placeholder=""
              className="rounded-lg p-2 pl-12 w-full bg-search-bg-color border-none"
              name='security_deposit'
              errors={formik?.errors.security_deposit}
              value={formik?.values.security_deposit}
              touched={formik?.touched.security_deposit}
              handleChange={formik?.handleChange}
            />
          </div>
          <div className='flex gap-4 flex-col sm:flex-row  mobile:w-full'>
            <label className='w-60 text-secondary'>Increment in rent</label>
            <InputField
              icons={percent_icon}
              placeholder=""
              className="rounded-lg p-2 pl-12 w-full bg-search-bg-color border-none"
              name='increment_percentage'
              errors={formik?.errors.increment_percentage}
              value={formik?.values.increment_percentage}
              touched={formik?.touched.increment_percentage}
              handleChange={formik?.handleChange}
            />
          </div>

          <div className='flex gap-4 flex-col sm:flex-row  mobile:w-full'>
            <label className='w-60 text-secondary'>Increment effective from</label>
            <Datepicker name='increment_effective_from' onChange={onChange} picker='month'  format='MMMM' value={dateFun()} pastDisable={true} />
          </div>

          <div className='flex gap-4 flex-col sm:flex-row  mobile:w-full mt-5'>
            <label className='w-60 text-secondary'>Rent due On</label>
            <SelectField
              placeholder="Day"
              name="rent_due_day"
              constant={true}
              isMulti={false}
              options={rent_due_days}
              errors={formik?.errors.rent_due_day}
              value={formik?.values.rent_due_day}
              touched={formik?.touched.rent_due_day}
              onChange={(selectedOptions) => {
                formik.setFieldValue('rent_due_day', selectedOptions);
              }}
            />
          </div>
          <div className='flex  pt-6 justify-end'>
            <ContinueButton type='submit' loading={isPending} label="Save Changes" img={double_check} />
          </div>
        </div>
      </form>
    </ModalLayout>
  )
}

export default EditTRentDetails