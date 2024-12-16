import React from 'react'
import ModalLayout from '../../Common/ModalLayout'
import location_icon from '../../Static/Images/geolocation.svg'
import general_icon from '../../Static/Images/general.svg'
import bank_icon from '../../Static/Images/bank.svg'
import bule_icon from '../../Static/Images/blue_bank.svg'
import rupees_icon from '../../Static/Images/rupees.svg'
import InputField from '../../Components/CustomInput/InputField'
import AuthButton from '../../Components/CustomButtons/AuthButton'
import prop_icon from '../../Static/Images/property.jpg'
import { useFormik } from 'formik'
import { useTargetUpdateQuery } from '../../ApiQuery/ListBuilding/BuildingQuery'

const Edit = ({ isModalOpen, setIsModalOpen }) => {

  const { mutateAsync: update, isPending } = useTargetUpdateQuery()
  const initialValues = {
    targetAmt: isModalOpen?.property_target_amount?.[0]?.target_amount || isModalOpen?.target || '',
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      const details = {
        "property_id": isModalOpen?.id,
        "target_amount": values?.targetAmt,
      }
      setSubmitting(true)
      try {
        const data = await update(details)
        setIsModalOpen(false)
        formik.resetForm()
      } catch (err) {
        console.error(err)
        setStatus("Somthing went wrong !")
      }
    },
  })
  return (
    <ModalLayout isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title="Edit Target Amount">
      <form onSubmit={formik?.handleSubmit} noValidate>
        <div className='max-w-full flex-col mobile:max-w-[800px] mx-auto rounded-lg outline-slate-200 mt-11 gap-4'>

          <div className='flex w-full justify-between'>
            <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
              <label className='w-36 text-secondary'>Building Name</label>
              <label className='w-36 text-color-black font-semibold'>{isModalOpen?.property_name}</label>
            </div>
            <div className='mobile:flex gap-4'>
              <div className='outline-dotted rounded-lg outline-slate-200 w-40  h-14 p-2'>
                <div className='flex gap-2'>
                  <img src={bule_icon} />
                  <label>{isModalOpen?.property_associated}</label>
                </div>
                <labe className='text-text-extra-light font-medium whitespace-nowrap'>Properties Associated</labe>
              </div>
              <div className='outline-dotted rounded-lg outline-slate-200 w-40 h-14 p-2'>
                <div className='flex gap-2'>
                  <img src={bank_icon} />
                  <labe>{isModalOpen?.rent_recieved}</labe>
                </div>
                <label className='text-text-extra-light font-medium'>Income</label>
              </div>
            </div>
          </div>

          <label className='flex mt-4text-color-black font-semibold '>Target Value</label>
          <div className='flex flex-col justify-center mobile:items-center items-start mobile:ml-0 ml-5 gap-2 mt-4'>
            <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
              <label className='w-40 text-secondary'>Rent Amount</label>
              <label className='w-48 text-color-green font-semibold'>₹ {isModalOpen?.rent_income}</label>
            </div>
            <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
              <label className='w-40 text-secondary'>Net Balance</label>
              <label className='w-48 text-color-orange font-semibold'>₹ {isModalOpen?.rent_income-isModalOpen?.rent_recieved}</label>
            </div>
            <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
              <label className='w-40 text-secondary'>Expected Target Value</label>
              <label className='w-48 text-color-orange font-semibold'>₹ {isModalOpen?.target}</label>
            </div>
            <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
              <label className='w-52 text-secondary'>Set Target Amount</label>
              <InputField
                icons={rupees_icon}
                type='number'
                placeholder=""
                className="rounded-lg p-2 pl-12 w-auto bg-search-bg-color border-none"
                name='targetAmt'
                errors={formik?.errors.targetAmt}
                value={formik?.values.targetAmt}
                touched={formik?.touched.targetAmt}
                handleChange={(e) => {
                  const numericValue = e.target.value.replace(/\D/g, '').slice(0, 8);
                  formik.setFieldValue('targetAmt', numericValue);
                }}
              />
            </div>
          </div>
        </div>
        <div className='flex w-full justify-end'>
          <AuthButton label="Save Target Amount" type='submit' className='w-full mobile:w-1/3 mb-8 bg-primary rounded-md h-10 flex items-center justify-center text-color-white' />
        </div>
      </form>

    </ModalLayout>
  )
}

export default Edit