import React from 'react'
import BackButton from '../../../Components/CustomButtons/BackButton'
import right_arrow from '../../../Static/Images/arrow-right.svg'
import left_arrow from '../../../Static/Images/arrow-left.svg'
import AuthButton from '../../../Components/CustomButtons/AuthButton'
import location_icon from '../../../Static/Images/geolocation.svg'
import finance_icon from '../../../Static/Images/finance.svg'
import general_icon from '../../../Static/Images/general.svg'
import category_icon from '../../../Static/Images/category.svg'
import { Image } from 'antd'
import pdf_icon from '../../../Static/Images/pdf.png'
import ContinueButton from '../../../Components/CustomButtons/ContinueButton'

const Summary = ({ setActive, formik, isPending }) => {

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <div className='max-w-full flex-col mobile:max-w-[800px] mx-auto rounded-lg outline-slate-200 mt-11 gap-4'>
        <div className='flex gap-4 flex-col sm:flex-row mobile:w-full outline outline-1 h-auto rounded-lg outline-slate-200 p-4'>
          <img src={formik?.values?.propImg ? URL.createObjectURL(formik?.values?.propImg) : ''} alt='' className='flex w-32' />
          <div className='flex  flex-col w-full'>
            <label className='font-medium text-lg'>{formik?.values?.name}</label>
            <div className='flex gap-2 mt-4'>
              <img src={general_icon} alt='' /><label className='text-text-color-secondary'>{formik?.values?.flat_no || formik?.values?.house_no}</label>
              <img src={finance_icon} alt='' /><label className='text-text-color-secondary'>{formik?.values?.property_type?.label}</label>
            </div>
            <div className='flex mt-4 gap-2'>
              <img src={location_icon} alt='' /><label className='text-text-color-secondary'>{formik?.values?.address}, {formik?.values?.town}, {formik?.values?.state?.label}, {formik?.values?.pincode || formik?.values?.pin_code}</label>
            </div>
            <div className='flex mt-4 gap-2'>
              <img src={category_icon} alt='' /><label className='text-text-color-secondary'>{formik?.values?.description}</label>
            </div>
          </div>
        </div>

        <div className='flex mt-8 flex-col sm:flex-row mobile:w-full outline outline-1 h-auto rounded-lg outline-slate-200 p-4'>
          <label className='w-48 text-secondary'>Documents</label>
          <div className='grid grid-cols-2 md:grid-cols-5 sm:grid-cols-5 flex-wrap gap-2'>
            {formik?.values?.property_files && Object?.values(formik?.values?.property_files)?.map((i) => {
              const objectURL = URL?.createObjectURL(i);
              const isImage = i?.type?.startsWith('image/');
              return (
                !isImage ?
                  <img onClick={() => window.open(objectURL)} src={pdf_icon} alt='' className='flex w-36 h-36 p-2' /> :
                  <Image src={objectURL} className='flex h-36 w-36 p-2' />
              )
            })}
          </div>
        </div>

        <div className='flex w-full sm:w-auto justify-between p-4'>
          <BackButton label="Back" img={left_arrow} onClick={() => setActive('3')} />
          <ContinueButton
            type='submit'
            label="Add Property" img={right_arrow} loading={isPending} />
        </div>
      </div>
    </form>
  )
}

export default Summary