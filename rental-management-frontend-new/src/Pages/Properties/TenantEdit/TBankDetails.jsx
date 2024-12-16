import React from 'react'
import InputField from '../../../Components/CustomInput/InputField';
import ContinueButton from '../../../Components/CustomButtons/ContinueButton';
import double_check from '../../../Static/Images/double-check.svg'
import SelectField from '../../../Components/CustomSelect/SelectField';
import ModalLayout from '../../../Common/ModalLayout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useBankDropdown } from '../../../ApiQuery/Dropdown/ListQuery';
import { useTenantUpdateQuery } from '../../../ApiQuery/Tenant/TenantQuery';

const EditTBankDetails = ({ isBankModalOpen, setIsBankModalOpen, data }) => {
  const { data: bankList, isFetching } = useBankDropdown()

  const { mutateAsync: update, isPending } = useTenantUpdateQuery()

  const initialValues = {
    bank_account_name: data?.property_history?.[0]?.tenant_id?.bank_account_name || '',
    bank_account_number: data?.property_history?.[0]?.tenant_id?.bank_account_number || "",
    bank_ifsc_code: data?.property_history?.[0]?.tenant_id?.bank_ifsc_code || "",
    bank_branch_name: data?.property_history?.[0]?.tenant_id?.bank_branch_name || "",
    bank_id: data?.property_history?.[0]?.tenant_id?.bank_id?.id ? {
      value: data?.property_history?.[0]?.tenant_id?.bank_id?.id,
      label: data?.property_history?.[0]?.tenant_id?.bank_id?.bank_name
    } : ""
  };

  const bankFormValidatSchema = Yup.object().shape({
    bank_account_name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, 'Only letters and spaces are allowed')
      .required('This field is required'),
    bank_account_number: Yup.string()
      .matches(/^\d+$/, 'Account number must be a numeric')
      .min(8, 'Account number must be at least 6 digits long')
      .max(20, 'Account number must be at most 20 digits long')
      .required('This field is required'),
    bank_id: Yup.object()
      .required('This field is required'),
    bank_ifsc_code: Yup.string()
      .required('This field is required'),
    bank_branch_name: Yup.string()
      .required('This field is required'),
  })

  const formik = useFormik({
    initialValues,
    validationSchema: bankFormValidatSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      const formData = new FormData();
      formData.append('bank_account_name', values.bank_account_name)
      formData.append('bank_account_number', values.bank_account_number)
      formData.append('bank_ifsc_code', values.bank_ifsc_code)
      formData.append('bank_branch_name', values.bank_branch_name)
      formData.append('bank_id', values?.bank_id?.value)
      setSubmitting(true)
      try {
        const datas = await update({ formData, id: data?.property_history?.[0]?.tenant_id?.id })
        setIsBankModalOpen(false)
      } catch (error) {
        console.error(error)
        setStatus("Somthing went wrong !")
      }
    },
  })

  return (
    <ModalLayout isModalOpen={isBankModalOpen} setIsModalOpen={setIsBankModalOpen} title="Edit Bank Details">
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className=' max-w-full mobile:max-w-[800px] mx-auto rounded-lg outline-slate-200  mt-11'>
          <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
            <label className='w-48 text-secondary'>Account Name</label>
            <InputField
              placeholder="Account Name"
              className="bg-search-bg-color border-none"
              name='bank_account_name'
              errors={formik?.errors.bank_account_name}
              value={formik?.values.bank_account_name}
              touched={formik?.touched.bank_account_name}
              handleChange={formik?.handleChange}
            />
          </div>

          <div className='flex gap-4 flex-col sm:flex-row  mobile:w-full'>
            <label className='w-48 text-secondary'>Account Number</label>
            <InputField
              placeholder="Account Number"
              className="bg-search-bg-color border-none"
              name='bank_account_number'
              errors={formik?.errors.bank_account_number}
              value={formik?.values.bank_account_number}
              touched={formik?.touched.bank_account_number}
              handleChange={formik?.handleChange}
            />
          </div>
          <div className='flex gap-4 flex-col sm:flex-row  mobile:w-full mb-5'>
            <label className='w-48 text-secondary'>Bank</label>
            <SelectField
              placeholder="Select"
              name="bank_id"
              constant={false}
              isMulti={false}
              options={bankList}
              errors={formik?.errors.bank_id}
              value={formik?.values.bank_id}
              touched={formik?.touched.bank_id}
              onChange={(selectedOptions) => {
                formik.setFieldValue('bank_id', selectedOptions);
              }}
            />
          </div>
          <div className='flex gap-4 flex-col sm:flex-row  mobile:w-full'>
            <label className='w-48 text-secondary'>IFS Code</label>
            <InputField
              placeholder="IFS Code"
              className="bg-search-bg-color border-none"
              name='bank_ifsc_code'
              errors={formik?.errors.bank_ifsc_code}
              value={formik?.values.bank_ifsc_code}
              touched={formik?.touched.bank_ifsc_code}
              handleChange={formik?.handleChange}
            />
          </div>
          <div className='flex gap-4 flex-col sm:flex-row  mobile:w-full'>
            <label className='w-48 text-secondary'>Branch Name</label>
            <InputField
              placeholder="Branch Name"
              className="bg-search-bg-color border-none"
              name='bank_branch_name'
              errors={formik?.errors.bank_branch_name}
              value={formik?.values.bank_branch_name}
              touched={formik?.touched.bank_branch_name}
              handleChange={formik?.handleChange}
            />
          </div>
          <div className='flex  pt-6 justify-end'>
            <ContinueButton
              type='submit' loading={isPending} label="Save Changes" img={double_check} />
          </div>
        </div>
      </form>
    </ModalLayout>
  )
}

export default EditTBankDetails