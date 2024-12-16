import React, { useState } from "react";
import ModalLayout from "../../../../Common/ModalLayout";
import AuthButton from "../../../../Components/CustomButtons/AuthButton";
import InputField from "../../../../Components/CustomInput/InputField";
import location_icon from "../../../../Static/Images/geolocation.svg";
import * as Yup from "yup";
import { useFormik } from "formik";
import SelectField from "../../../../Components/CustomSelect/SelectField";
import pdf_icon from "../../../../Static/Images/pdf.png";
import { Image } from "antd";
import rupees_icon from '../../../../Static/Images/rupees.svg'
import { useExpenseTypeDropdown } from "../../../../ApiQuery/Dropdown/ListQuery";
import { useExpenseCreateQuery, useExpenseDetailsQuery, useExpenseEditQuery, useExpenseFileDeleteQuery } from "../../../../ApiQuery/Expenses/ExpenseQuery";
import DocUpload from "../../../../Components/CustomUpload/DocUpload";
import close_arrow from '../../../../Static/Images/close.svg'
import prop_icon from '../../../../Static/Images/property.jpg'
import TextareaInput from "../../../../Components/CustomInput/TextareaInput";


const AddEdit = ({ isModalOpen, setIsModalOpen, id, isLocalState, setsLocalState, setIsPropertyOpen }) => {
  const { mutateAsync: create, isPending } = useExpenseCreateQuery();
  const { data, isFetching: ExpenseDetails } = useExpenseDetailsQuery(id)
  const { data: expenseTypeList, isFetching } = useExpenseTypeDropdown()
  const { mutateAsync: update, ispending: isUpdatePending } = useExpenseEditQuery();
  const { mutateAsync: fileDelete, isPending: FileUpdate } = useExpenseFileDeleteQuery()
  const mangerData = JSON.parse(localStorage.getItem("user"))
  const [updateFile, setUpdateFile] = useState(false)

  const initialValues = {
    expenseAmount: Math.floor(data?.expense_amount) || "",
    propertyId: "",
    remark: data?.remarks || '',
    files: data?.expense_document?.length >= 1 || "",
    expenseType: data?.expense_type ? {
      value: data?.expense_type?.id,
      label: data?.expense_type?.name
    } : "",
  };

  const validationSchema = Yup.object().shape({
    expenseType: Yup.object().required("This field is required"),
    expenseAmount: Yup.string()
      .max(10, 'Expense Amount must be at most 10 digits')
      .matches(/^\d+(\.\d{1,2})?$/, 'Expense Amount must have at most 2 decimal places')
      .required("This field is required"),
    files: Yup.mixed().required('Files are required'),
  });


  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      const formData = new FormData();
      Object.keys(values.files).map((i, value) => {
        formData.append('expense_documents', values.files[value])
      })
      formData.append('property_id', isLocalState?.id || data?.property_id?.id)
      formData.append('expense_amount', values?.expenseAmount)
      formData.append('expense_type', values?.expenseType?.value)
      formData.append('remarks', values.remark)
      setSubmitting(true);
      try {
        if (id) {
          const data = await update({ formData, id });
          setIsModalOpen(false);
          setUpdateFile(true)
        } else {
          const data = await create(formData);
          setsLocalState(false);
          formik.resetForm();
          setUpdateFile(true)
          setTimeout(() => {
            setIsPropertyOpen(false)
          }, 100);
        }
      } catch (err) {
        console.error(err);
        setStatus("Somthing went wrong !");
      }
    },
  });

  return (
    <ModalLayout isModalOpen={isModalOpen || isLocalState} setIsModalOpen={setIsModalOpen || setsLocalState} title={`${id ? "Edit" : "Add"} Expense`} >
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="flex gap-4 flex-col sm:flex-row mobile:w-full h-auto rounded-lg mb-4 scroll-container">
          <img
            src={isLocalState?.property_image || data?.property_id?.property_image || prop_icon}
            alt=""
            className="flex w-20 h-20"
          />
          <div className="flex  flex-col w-full">
            <div className="flex gap-4 items-center">
              <label className="font-semibold text-md">
                {isLocalState?.property_name || isLocalState?.parent_id?.property_name || data?.property_id?.property_name || data?.property_id?.parent_id?.property_name}
              </label>
            </div>
            <div className="flex flex-col w-full">
              <div className="flex items-start gap-1 mt-2">
                <img src={location_icon} alt="" />
                <label className="text-text-color-secondary  break-all whitespace-normal">
                  {isLocalState?.address || isLocalState?.parent_id?.address || data?.property_id?.address || data?.property_id?.parent_id?.address},
                  {isLocalState?.town || isLocalState?.parent_id?.town || data?.property_id?.town || data?.property_id?.parent_id?.town},
                  {isLocalState?.state_id?.state_name || isLocalState?.parent_id?.state_id?.state_name || data?.property_id?.state_id?.state_name || data?.property_id?.parent_id?.state_id?.state_name},
                  {isLocalState?.pincode || isLocalState?.parent_id?.pincode || data?.property_id?.pincode || data?.property_id?.parent_id?.pincode}
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="outline-dotted outline-2 rounded-lg outline-slate-200 px-8 py-8 mt-4">
          <h3 className="font-semibold mb-3">Expense formData</h3>
          <div className="flex gap-4 flex-col sm:flex-row mobile:w-full pb-3">
            <label className="w-36 text-secondary">Manager Name</label>
            <p className=" text-[16px] font-semibold pr-10 pb-2">{mangerData?.data?.full_name}</p>
          </div>
          <div className="flex gap-4 flex-col sm:flex-row mobile:w-full pb-3 ">
            <label className="w-36 text-secondary">Phone Number</label>
            <p className=" text-[16px] font-semibold pr-10 pb-2">
              +91 9547124468
            </p>
          </div>

          <div className="flex gap-4 flex-col sm:flex-row mobile:w-full pb-3">
            <label className="w-48 text-secondary">Expense Type</label>
            <SelectField
              placeholder="Select"
              name="expenseType"
              constant={false}
              isMulti={false}
              options={expenseTypeList}
              errors={formik?.errors.expenseType}
              value={formik?.values.expenseType}
              touched={formik?.touched.expenseType}
              onChange={(selectedOptions) => {
                formik.setFieldValue('expenseType', selectedOptions);
              }}
            />
          </div>
          <div className='flex gap-4 flex-col sm:flex-row  mobile:w-full'>
            <label className='w-48 text-secondary'>Expense</label>
            <InputField
              icons={rupees_icon}
              type='number'
              placeholder=""
              className="rounded-lg p-2 pl-12 w-full bg-search-bg-color border-none"
              name='expenseAmount'
              errors={formik?.errors.expenseAmount}
              value={formik?.values.expenseAmount}
              touched={formik?.touched.expenseAmount}
              handleChange={formik?.handleChange}
              step='.01'
            />
          </div>
          <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
            <label className='w-48 text-secondary'> Remarks</label>
            <TextareaInput
              placeholder="Description"
              name="remark"
              value={formik.values.remark}
              handleChange={formik.handleChange}
              errors={formik.errors.remark}
              touched={formik.touched.remark}
              className="bg-search-bg-color border-none"
            />
          </div>

          <div className="flex gap-4 flex-col sm:flex-row mobile:w-full">
            <label className="w-48 text-secondary"> Documents</label>
            <DocUpload formik={formik} uploadFiles={(e) => formik?.setFieldValue('files', e)} updateFile={updateFile} errors={formik?.errors?.files} dragdrop={false} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 sm:grid-cols-6 gap-4 mt-4 justify-end flex-wrap ">
            {data?.expense_document?.map((i) => {
              return (
                <div className='mobile:flex-col flex-row w-28 rounded-lg outline-dashed outline-1 outline-slate-200'>
                  {i?.file.endsWith('.pdf') ?
                    <img src={pdf_icon} alt='' className='flex w-28 h-28 p-2' /> :
                    <Image src={i?.file} alt='' width={100} height={100} className='p-2' />}
                  <button type='button' className='flex w-full justify-center items-center' onClick={() => fileDelete(i?.id)}>
                    <img src={close_arrow} />
                  </button>
                  <label className='flex w-full justify-center items-center'>{i?.name}</label>
                </div>
              )
            })}
          </div>
          <div className="flex justify-end">
            <AuthButton
              type="submit"
              loading={isPending || isUpdatePending}
              disabled={isPending || isUpdatePending}
              label={id ? "Save Changes" : "Add Expense"}
              className="w-56 bg-primary rounded-md h-10 flex items-center justify-center text-color-white"
            />
          </div>
        </div>
      </form>
    </ModalLayout>
  );
};

export default AddEdit;
