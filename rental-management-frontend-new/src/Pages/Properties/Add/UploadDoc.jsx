import React from 'react'
import DocUpload from '../../../Components/CustomUpload/DocUpload'
import ContinueButton from '../../../Components/CustomButtons/ContinueButton'
import BackButton from '../../../Components/CustomButtons/BackButton'
import right_arrow from '../../../Static/Images/arrow-right.svg'
import left_arrow from '../../../Static/Images/arrow-left.svg'

const UploadDoc = ({ setActive, formik }) => {

  return (
    <div className='max-w-full mobile:max-w-[800px] mx-auto rounded-lg outline-slate-200 mt-11 p-1'>
      <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
        <label className='w-48 text-secondary'>Upload Documents</label>
        <DocUpload formik={formik} uploadFiles={(e) => formik?.setFieldValue('files', e)} errors={formik?.errors?.files} dragdrop={true} uploadDocType="property" />
      </div>

      <div className='flex p-4 justify-between'>
        <BackButton label="Back" img={left_arrow} onClick={() => setActive('2')} />
        <ContinueButton type='button' label="Continue" img={right_arrow} onClick={() => {
          // formik?.validateForm().then(res => {
          //   formik?.setTouched(res)
          //   if (Object.keys(res).length === 0 && formik.isValid) {
          setActive('4')
          //   }
          // })
        }} />
      </div>

    </div>
  )
}

export default UploadDoc