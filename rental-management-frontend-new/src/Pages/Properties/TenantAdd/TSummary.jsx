import React from 'react'
import right_arrow from '../../../Static/Images/arrow-right.svg'
import location_icon from '../../../Static/Images/geolocation.svg'
import finance_icon from '../../../Static/Images/finance.svg'
import general_icon from '../../../Static/Images/general.svg'
import category_icon from '../../../Static/Images/category.svg'
import CollapseData from '../../../Components/CustomCollapse/CollapseData'
import ContinueButton from '../../../Components/CustomButtons/ContinueButton'
import left_arrow from '../../../Static/Images/arrow-left.svg'
import BackButton from '../../../Components/CustomButtons/BackButton'

const TSummary = ({ setActive, formik, propDetails, isPending }) => {
  const tenant_filess = formik?.values?.tenant_files
  // console.log('tenant_filess: ', tenant_filess);
  const fileList = Array.from({ length: tenant_filess.length }, (_, index) => tenant_filess[index]);
  // console.log('fileList: ', fileList);
  const mappedFiles = [];

  // console.log('mappedFiles: ', mappedFiles);
  fileList.map(file => {
    const fileReader = new FileReader();
    fileReader.onload = function handleLoad() {
      mappedFiles.push(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  });

  const basicDetails = [
    { label: 'Tenant Name', value: formik?.values?.tenant_name },
    { label: 'Phone Number', value: formik?.values?.phone_number },
    { label: 'Email Address ', value: formik?.values?.tenant_email },
  ];

  const bankDetails = [
    { label: 'Account Name', value: formik?.values?.bank_account_name },
    { label: 'Account Number', value: formik?.values?.bank_account_number },
    { label: 'Bank', value: formik?.values?.bank_id?.label },
    { label: 'IFS Code', value: formik?.values?.bank_ifsc_code },
    { label: 'Branch Name', value: formik?.values?.bank_branch_name },
  ];

  const documentsDetails = [
    { label: 'Property Occupied On', value: formik?.values?.occupied_on },
    { label: 'Documents', value: formik?.values?.tenant_files },
  ];

  // console.log('formik?.values?.tenant_files: ', formik?.values?.increment_effective_from);
  // console.log('852858',JSON.stringify(formik?.values?.tenant_files));

  const rentDetails = [
    { label: 'Tenant Occupied On', value: formik?.values?.occupied_on },
    { label: 'Advance paid', value: formik?.values?.advance_amount },
    { label: 'Rent Amount', value: formik?.values?.rent_amount },
    { label: 'Increment in rent (%)', value: formik?.values?.increment_percentage },
    { label: 'Increment Effective from', value: formik?.values?.increment_effective_from.slice(0, 7) },
    { label: 'Rent Due Day', value: formik?.values?.rent_due_day?.value },
  ];

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <div className='max-w-full flex-col mobile:max-w-[800px] mx-auto rounded-lg outline-slate-200 mt-11 gap-4 '>
        <div className='flex gap-4 flex-col sm:flex-row mobile:w-full outline outline-1 h-auto rounded-lg outline-slate-200 p-4 mb-5'>
          <img className='flex w-32' src={propDetails?.property_image} />
          <div className='flex  flex-col w-full'>
            <label className='font-medium text-lg'></label>
            <div className='flex gap-2 mt-4'>
              <img src={general_icon} alt='' /><label className='text-text-color-secondary'>{propDetails?.flat_number||propDetails?.house_number}</label>
              <img src={finance_icon} alt='' /><label className='text-text-color-secondary'>{propDetails?.property_type_id?.name}</label>
            </div>
            <div className='flex mt-4 gap-2'>
              <img src={location_icon} alt='' /><label className='text-text-color-secondary'>{propDetails?.address||propDetails?.parent_id?.address},{propDetails?.town||propDetails?.parent_id?.town} ,{propDetails?.state_id?.state_name||propDetails?.parent_id?.state_id?.state_name},{propDetails?.pincode||propDetails?.parent_id?.pincode}</label>
            </div>
            <div className='flex mt-4 gap-2'>
              <img src={category_icon} alt='' /><label className='text-text-color-secondary'>{propDetails?.description}</label>
            </div>
          </div>
        </div>

        <CollapseData head="Basic Details" contentVal={basicDetails} />
        <CollapseData head="Bank Details" contentVal={bankDetails} />
        <CollapseData head="Documents" contentVal={documentsDetails} />
        <CollapseData head="Rent Details" contentVal={rentDetails} />

      </div>
      <div className='flex justify-between p-4'>
        <BackButton label="Back" img={left_arrow} onClick={() => setActive('4')} />
        <ContinueButton
          loading={isPending}
          type='submit'
          label="Add Tenant To The Property"
          img={right_arrow}
          className="w-64 bg-primary rounded-md h-10 flex items-center justify-center text-color-white" />
      </div>
    </form>
  )
}

export default TSummary