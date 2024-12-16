import React, { useState } from 'react'
import DocUpload from '../../../Components/CustomUpload/DocUpload'
import ContinueButton from '../../../Components/CustomButtons/ContinueButton'
import ModalLayout from '../../../Common/ModalLayout'
import double_check from '../../../Static/Images/double-check.svg'
import { useFormik } from 'formik';
import { Image } from 'antd'
import pdf_icon from '../../../Static/Images/pdf.png'
import close_arrow from '../../../Static/Images/close.svg'
import * as Yup from 'yup';
import { useTenantFileDeleteQuery, useTenantUpdateQuery } from '../../../ApiQuery/Tenant/TenantQuery'

const EditTDocuments = ({ setIsDocModalOpen, isDocModalOpen, data }) => {

  const { mutateAsync: fileDelete, isPending: FileUpdatePending } = useTenantFileDeleteQuery()
  const { mutateAsync: update, isPending } = useTenantUpdateQuery()
  const [updateFile, setUpdateFile] = useState(false)

  const initialValues = {
    tenant_files: '',
  };
 
  const docFormValidatSchema = Yup.object().shape({
    tenant_files: Yup.string()
      .required('File is required'),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validateOnMount: true,
    validationSchema: docFormValidatSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      const formData = new FormData();
      Object.keys(values.tenant_files).map((i, value) => {
        formData.append('tenant_files', values.tenant_files[value])
      })
      setSubmitting(true)
      try {
        const datas = await update({ formData, id: data?.property_history?.[0]?.tenant_id?.id })
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
        <div className='max-w-full mobile:max-w-[800px] mx-auto rounded-lg outline-slate-200 mt-11 p-1'>
          <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
            <label className='w-48 text-secondary'>Upload Documents</label>
            <DocUpload formik={formik} uploadFiles={(e) => formik?.setFieldValue('tenant_files', e)} updateFile={updateFile} errors={data?.property_history?.[0]?.tenant_id?.tenant_document.length == 0 && formik?.errors?.tenant_files} dragdrop={true} uploadDocType="tenant"/>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 sm:grid-cols-4 gap-4 mt-4 justify-end flex-wrap'>
            {data?.property_history?.[0]?.tenant_id?.tenant_document?.map((i) => {
              return (
                <div className='mobile:flex-col w-36 rounded-lg outline-dashed outline-1 outline-slate-200'>
                  {i?.file.endsWith('.pdf') ?
                    <img src={pdf_icon} alt='' className='flex w-36 h-36 p-2' /> :
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
            {formik?.values?.tenant_files.length>0 ? <ContinueButton type='submit' label="Save Changes" img={double_check}
            /> : ""}
          </div>
        </div>
      </form>
    </ModalLayout>
  )
}

export default EditTDocuments