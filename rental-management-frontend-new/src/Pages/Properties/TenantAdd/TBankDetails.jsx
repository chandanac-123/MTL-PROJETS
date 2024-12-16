import React from 'react'
import InputField from '../../../Components/CustomInput/InputField';
import ContinueButton from '../../../Components/CustomButtons/ContinueButton';
import right_arrow from '../../../Static/Images/arrow-right.svg'
import left_arrow from '../../../Static/Images/arrow-left.svg'
import SelectField from '../../../Components/CustomSelect/SelectField';
import BackButton from '../../../Components/CustomButtons/BackButton';
import { useBankDropdown } from '../../../ApiQuery/Dropdown/ListQuery';

const TBankDetails = ({ setActive, formik }) => {
  const { data: bankList, isFetching } = useBankDropdown()

  return (
    <form >
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
        <div className='flex  p-4 justify-between'>
          <BackButton label="Back" img={left_arrow}
            onClick={() => setActive('1')}
          />
          <ContinueButton type='button' label="Continue" img={right_arrow}
            onClick={() => {
              formik?.validateForm().then(res => {
                formik?.setTouched(res)
                if (Object.keys(res).length === 0 && formik.isValid) {
                  setActive('3')
                }
              })
            }}
          />
        </div>
      </div>
    </form>
  )
}

export default TBankDetails