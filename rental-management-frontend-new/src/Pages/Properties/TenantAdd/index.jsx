import React, { useState } from 'react'
import TBankDetails from './TBankDetails'
import TBasicDetails from './TBasicDetails'
import TDocuments from './TDocuments'
import TRentDetails from './TRentDetails'
import TSummary from './TSummary'
import { Tabs } from 'antd'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom'
import { useTenantCreateQuery } from '../../../ApiQuery/Tenant/TenantQuery'

const AddTenant = () => {
  const location = useLocation();
  const [activeKey, setActive] = useState('1')
  const { mutateAsync: create, isPending } = useTenantCreateQuery()
  const navigate = useNavigate()

  const initialValues = {
    rent_amount: "",
    tenant_files: '',
    tenant_name: "",
    tenant_email: "",
    bank_account_name: "",
    bank_account_number: "",
    bank_ifsc_code: "",
    bank_branch_name: "",
    occupied_on: "",
    advance_amount: "",
    security_deposit: "",
    increment_percentage: "",
    rent_due_day: "",
    bank_id: "",
    increment_effective_from: "",
    bank_id: "",
  };

  const basicFormValidatSchema = Yup.object().shape({
    tenant_name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, 'Only letters and spaces are allowed')
      .matches(/^[^\s].*$/, 'Field should not start with a blank space')
      .required('This field is required'),
    phone_number: Yup.string()
      .max(10, 'Phone number is not valid')
      .matches(/^[6789]\d{9,}$/, 'Phone number is not valid')
      .required('This field is required'),
    tenant_email: Yup.string()
      .email('Invalid email address')
      .matches(/^(?!.*@[^,]*,)/)
      .required('Email is required'),
  })

  const bankFormValidatSchema = Yup.object().shape({
    bank_account_name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, 'Only letters and spaces are allowed')
      .matches(/^[^\s].*$/, 'Field should not start with a blank space')
      .required('This field is required'),
    bank_account_number: Yup.string()
      .matches(/^\d+$/, 'Account number must be a numeric')
      .min(6, 'Account number must be at least 6 digits long')
      .max(20, 'Account number must be at most 20 digits long')
      .required('This field is required'),
    bank_id: Yup.object()
      .required('This field is required'),
    bank_ifsc_code: Yup.string()
      .matches(/^([A-Z]{4}0[A-Z0-9]{6})$/, 'Invalid IFSC code')
      .required('This field is required'),
    bank_branch_name: Yup.string()
      .required('This field is required'),
  })

  const tenantFormValidatSchema = Yup.object().shape({
    occupied_on: Yup.date()
      .required('This field is required'),
    rent_due_day: Yup.object()
      .required('This field is required'),
    rent_amount: Yup.string()
      .required('This field is required'),
  })


  const docFormValidatSchema = Yup.object().shape({
    tenant_files: Yup.mixed()
      // .matches(/^([0-9]{2})\.([0-9]{2})\.([0-9]{4})$/)
      .required('File is required'),
  });

  const validateFun = () => {
    if (activeKey == '1') {
      return (basicFormValidatSchema)
    }
    else if (activeKey == '2') {
      return (bankFormValidatSchema)
    }
    else if (activeKey == '3') {
      return (docFormValidatSchema)
    }
    else
      return (tenantFormValidatSchema)
  }

  const formik = useFormik({
    initialValues,
    validationSchema: validateFun(),
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      const formData = new FormData();
      Object.keys(values.tenant_files).map((i, value) => {
        formData.append('tenant_files', values.tenant_files[value])
      })
      formData.append('property_id', location?.state?.id)
      formData.append('tenant_name', values.tenant_name)
      formData.append('rent_amount', values.rent_amount)
      formData.append('phone_number', values.phone_number)
      formData.append('tenant_email', values.tenant_email)
      formData.append('bank_account_name', values.bank_account_name)
      formData.append('bank_account_number', values.bank_account_number)
      formData.append('bank_ifsc_code', values.bank_ifsc_code)
      formData.append('bank_branch_name', values.bank_branch_name)
      formData.append('occupied_on', values.occupied_on)
      formData.append('advance_amount', values.advance_amount)
      formData.append('security_deposit', values.security_deposit)
      formData.append('increment_percentage', values.increment_percentage)
      formData.append('rent_due_day', values.rent_due_day?.value)
      formData.append('bank_id', values?.bank_id?.value)
      formData.append('increment_from_month', values?.increment_effective_from?new Date(values?.increment_effective_from).getMonth() + 1:"")
      formData.append('increment_from_year', values?.increment_effective_from?new Date(values?.increment_effective_from).getFullYear():"")
      setSubmitting(true)
      try {
        const data = await create(formData)
        formik.resetForm()
        navigate(`/properties/view/${location?.state?.id}`);
      } catch (error) {
        console.error(error)
        setStatus("Somthing went wrong !")
      }
    },
  })

  const onChange = (date,fieldName) => {
    formik.setFieldValue(fieldName, date);
  };

  const state = [<TBasicDetails label="Basic Details" setActive={setActive} formik={formik} />,
  <TBankDetails label="Bank Details" setActive={setActive} formik={formik} />,
  <TDocuments label="Documents" setActive={setActive} formik={formik} />,
  <TRentDetails label="Rent Details" setActive={setActive} formik={formik} onChange={onChange} />,
  <TSummary label="Summary" setActive={setActive} formik={formik} propDetails={location?.state} isPending={isPending} />]

  return (
    <div className='h-screen bg-color-light-gray flex flex-col  mt-8'>
      <div className="sm:p-5  bg-color-white rounded-2xl overflow-x-auto">
        <div className='max-w-[800px] mx-auto ' >
          <Tabs
            size='large'
            defaultActiveKey="1"
            className='custom-tab-style'
            // onChange={(e) => setActive(e)}
            activeKey={activeKey}
            centered
            items={state?.map((_, i) => {
              const id = String(i + 1);
              return {
                label: _?.props?.label,
                key: id,
                children: _,
                disabled: true
              };
            })}
          />
        </div>
      </div>
    </div>
  )
}

export default AddTenant