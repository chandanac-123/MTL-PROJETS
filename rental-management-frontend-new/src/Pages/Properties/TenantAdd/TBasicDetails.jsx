import React from 'react'
import InputField from '../../../Components/CustomInput/InputField';
import ContinueButton from '../../../Components/CustomButtons/ContinueButton';
import right_arrow from '../../../Static/Images/arrow-right.svg'

const TBasicDetails = ({ setActive, formik }) => {
  return (
    <form >
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
        <div className='flex  w-full sm:w-auto justify-end p-4'>
          <ContinueButton
            onClick={() => {
                formik?.validateForm().then(res => {
                    formik.setTouched(res)
                    if (formik.isValid) {
                        setActive('2')
                    }
                })
            }} 
            type='button' label="Continue" img={right_arrow} />
        </div>
      </div>
    </form>
  )
}

export default TBasicDetails