import React, { useState } from 'react'
import DocUpload from '../../../Components/CustomUpload/DocUpload'
import ContinueButton from '../../../Components/CustomButtons/ContinueButton'
import right_arrow from '../../../Static/Images/arrow-right.svg'
import left_arrow from '../../../Static/Images/arrow-left.svg'
import close_arrow from '../../../Static/Images/close.svg'
import ModalLayout from '../../../Common/ModalLayout'
import { useFormik } from 'formik';
import { Image } from 'antd'
import pdf_icon from '../../../Static/Images/pdf.png'
import * as Yup from 'yup';
import { usePropertyFileDeleteQuery, usePropertyUpdateQuery } from '../../../ApiQuery/Property/PropertyQuery'

const EditUploadDoc = ({ setIsDocModalOpen, isDocModalOpen, id, data }) => {
  const { mutateAsync: update, isPending: updatePending } = usePropertyUpdateQuery()
  const { mutateAsync: fileDelete, isPending: FileUpdatePending } = usePropertyFileDeleteQuery()
  const [updateFile, setUpdateFile] = useState(false)

  const initialValues = {
    files: ''
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      const formData = new FormData();
      Object.keys(values.files).map((i, value) => {
        formData.append('property_files', values.files[value])
      })
      setSubmitting(true)
      try {
        const data = await update({ formData, id })
        formik.resetForm()
        setUpdateFile(true)
        setIsDocModalOpen(false)
      } catch (error) {
        console.error(error)
        setStatus("Somthing went wrong !")
      }
    },
  })

  return (
    <ModalLayout isModalOpen={isDocModalOpen} setIsModalOpen={setIsDocModalOpen} title="Edit Documents">
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className='max-w-full mobile:max-w-[800px] mx-auto rounded-lg outline-slate-200 mt-11'>
          <div className='flex gap-4 flex-col sm:flex-row mobile:w-auto'>
            <label className='w-48 text-secondary'>Upload Documents</label>
            <DocUpload formik={formik} uploadFiles={(e) => formik?.setFieldValue('files', e)} updateFile={updateFile} errors={formik?.errors?.files} dragdrop={true} uploadDocType="property" />
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 sm:grid-cols-4 gap-4 mt-4 justify-end flex-wrap'>
            {data?.property_file.map((i) => {
              return (
                <div className='mobile:flex-col w-36 rounded-lg outline-dashed outline-1 outline-slate-200'>
                  {i?.file.endsWith('.pdf') ?
                    <img src={pdf_icon} alt='' className='flex w-40 h-40 p-2' /> :
                    <Image src={i?.file} alt='' width={150} height={150} className='p-2' />}
                  <button type='button' className='flex w-full justify-center items-center' onClick={() => fileDelete(i?.id)}>
                    <img src={close_arrow} />
                  </button>
                  <p className='break-all whitespace-normal	items-center'>{i?.name}</p>
                </div>
              )
            })}
          </div>

          <div className='flex pt-28 justify-end'>
            {formik?.values?.files.length>0 ? <ContinueButton  loading={updatePending} type='submit' label="Save Changes" img={right_arrow} /> : ""}
          </div>
        </div>
      </form>
    </ModalLayout>
  )
}

export default EditUploadDoc