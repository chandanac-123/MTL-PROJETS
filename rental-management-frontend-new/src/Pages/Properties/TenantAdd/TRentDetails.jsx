import React from 'react'
import ContinueButton from '../../../Components/CustomButtons/ContinueButton'
import BackButton from '../../../Components/CustomButtons/BackButton'
import InputField from '../../../Components/CustomInput/InputField'
import SelectField from '../../../Components/CustomSelect/SelectField'
import right_arrow from '../../../Static/Images/arrow-right.svg'
import left_arrow from '../../../Static/Images/arrow-left.svg'
import { rent_due_days } from '../../../Utils/Constants'
import Datepicker from '../../../Components/CustomDate/Datepicker'
import rupees_icon from '../../../Static/Images/rupees.svg'
import percent_icon from '../../../Static/Images/percent.svg'
import info_icon from '../../../Static/Images/information-line.svg'
import { Tooltip } from 'antd'

const TRentDetails = ({ setActive, formik, onChange }) => {


  return (
    <form >
      <div className=' max-w-full mobile:max-w-[800px] mx-auto rounded-lg outline-slate-200  mt-11'>

        <div className='flex gap-4 flex-col sm:flex-row mobile:w-full mb-5'>
          <label className='w-56 text-secondary'>Tenant Occupied On</label>
          <Datepicker onChange={onChange} name='occupied_on' errors={formik?.errors?.occupied_on} futureDisable={false} />
        </div>

        <div className='flex gap-4 flex-col sm:flex-row  mobile:w-full'>
          <label className='w-56 text-secondary'>Advance Amount</label>
          <InputField
            placeholder=""
            type='number'
            icons={rupees_icon}
            className="rounded-lg p-2 pl-12 w-full bg-search-bg-color border-none"
            name='advance_amount'
            errors={formik?.errors.advance_amount}
            value={formik?.values.advance_amount}
            touched={formik?.touched.advance_amount}
            handleChange={formik?.handleChange}
          />
        </div>

        <div className='flex gap-4 flex-col sm:flex-row  mobile:w-full'>
          <label className='w-56 text-secondary'>Rent Amount</label>
          <InputField
            icons={rupees_icon}
            placeholder=""
            type='number'
            className="rounded-lg p-2 pl-12 w-full bg-search-bg-color border-none"
            name='rent_amount'
            errors={formik?.errors.rent_amount}
            value={formik?.values.rent_amount}
            touched={formik?.touched.rent_amount}
            handleChange={formik?.handleChange}
          />
        </div>

        <div className='flex gap-4 flex-col sm:flex-row  mobile:w-full'>
          <label className='w-56 text-secondary flex'>Maintenance Cost  <Tooltip title="This expense is paid by the owner and will be retrieved from the advance paid by the customer.">
              <img src={info_icon} alt='' className='w-5 mobile:mb-12 mb-0 ml-2' />
            </Tooltip></label>
          <InputField
            icons={rupees_icon}
            type='number'
            placeholder=""
            className="rounded-lg p-2 pl-12 w-full bg-search-bg-color border-none"
            name='security_deposit'
            errors={formik?.errors.security_deposit}
            value={formik?.values.security_deposit}
            touched={formik?.touched.security_deposit}
            handleChange={(e) => {
              const numericValue = e.target.value.replace(/\D/g, '').slice(0, 8);
              formik.setFieldValue('security_deposit', numericValue);
            }}
          />
        </div>

        <div className='flex gap-4 flex-col sm:flex-row  mobile:w-full'>
          <label className='w-56 text-secondary'>Increment in rent</label>
          <InputField
            icons={percent_icon}
            placeholder=""
            type='number'
            className="rounded-lg p-2 pl-12 w-full bg-search-bg-color border-none"
            name='increment_percentage'
            errors={formik?.errors.increment_percentage}
            value={formik?.values.increment_percentage}
            touched={formik?.touched.increment_percentage}
            handleChange={formik?.handleChange}
          />
        </div>
        <div className='flex gap-4 flex-col sm:flex-row  mobile:w-full'>
          <label className='w-56 text-secondary'>Increment effective from</label>
          <Datepicker onChange={onChange} picker='month' name='increment_effective_from' format='MMMM' pastDisable={true} />
        </div>

        <div className='flex gap-4 flex-col sm:flex-row  mobile:w-full mt-5'>
          <label className='w-56 text-secondary'>Rent due On</label>
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

        <div className='flex  p-4 justify-between mb-10'>
          <BackButton label="Back" img={left_arrow}
            onClick={() => setActive('3')}
          />
          <ContinueButton type='button' label="Continue" img={right_arrow}
            onClick={() => {
              formik?.validateForm().then(res => {
                formik?.setTouched(res)
                if (Object.keys(res).length === 0 && formik.isValid) {
                  setActive('5')
                }
              })
            }}
          />
        </div>
      </div>
    </form>
  )
}

export default TRentDetails