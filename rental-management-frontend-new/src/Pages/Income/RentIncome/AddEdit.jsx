import React, { useEffect, useRef, useState } from "react";
import ModalLayout from "../../../Common/ModalLayout";
import AuthButton from "../../../Components/CustomButtons/AuthButton";
import InputField from "../../../Components/CustomInput/InputField";
import location_icon from "../../../Static/Images/geolocation.svg";
import finance_icon from "../../../Static/Images/finance.svg";
import general_icon from "../../../Static/Images/general.svg";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useReceiptDownloadQuery, } from "../../../ApiQuery/InvestmentIncome/InvestIncomeQuery";
import {
  useRentIncomeCreateQuery,
  useRentIncomeUpdateQuery,
  useRentPropertyIdQuery,
} from "../../../ApiQuery/RentIncome/RentIncomeQuery";
import { Skeleton, Tag } from "antd";
import bank_icon from "../../../Static/Images/bank.svg";
import circle_check from "../../../Static/Images/check-circle.svg";
import SelectField from "../../../Components/CustomSelect/SelectField";
import { getMonthName } from "../../../Utils/utils";
import { payment_methods } from "../../../Utils/Constants";
import RentReceipt from "./RentReceipt";
import prop_icon from '../../../Static/Images/property.jpg'

function AddEdit({
  isModalOpen,
  setIsModalOpen,
  id,
  type,
  instance,
  rent_month,
  rent_year,
  refetch,
  setIsPropertyOpen
}) {
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [receipt, setReceipt] = useState(false);
  const componentRef = useRef(null);
  const { data, isFetching, isLoading, refetch: dataUpdate } = useRentPropertyIdQuery({ id });
  const [receiptId, setReceiptId] = useState(null);
  const { mutateAsync: create, isPending } = useRentIncomeCreateQuery();
  const { mutateAsync: update, ispending: isUpdatePending } =
    useRentIncomeUpdateQuery();
  const { data: receiptData, isFetching: isReceipt } = useReceiptDownloadQuery({
    id: receiptId,
    enabled: receipt,
  });

  useEffect(() => {
    dataUpdate()
  }, [])

  const initialValues = {
    month_collected: instance?.collected_on
      ? {
        value: [rent_month, rent_year],
        label: getMonthName(rent_month) + " " + rent_year,
      }
      : "",
    rent_recieved:
      type === "Clear Due"
        ? instance?.balance_amount
        : type === "Edit"
          ? instance?.amount_recieved
          : "",
    payment_method:
      type === "Edit"
        ? {
          value: instance?.payment_method,
          label: instance?.payment_method,
        }
        : "",
    due_amount: instance?.balance_amount || 0,
  };

  const validationSchema = Yup.object().shape({
    month_collected: Yup.mixed().required("This field is required"),
    rent_recieved: Yup.number()
      .required("This field is required")
      .moreThan(0, "Value must be greater than zero"),
    payment_method: Yup.mixed().required("This field is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      const today = new Date();
      const formattedDate = today.toISOString().slice(0, 10);
      const details = {
        tenant_id: data?.tenant_id?.id,
        collected_on: formattedDate,
        amount_recieved: values?.rent_recieved,
        property_id: data?.id,
        payment_method: values?.payment_method?.value,
        rent_year: values?.month_collected?.value[1],
        rent_month: values?.month_collected?.value[0],
      };
      setSubmitting(true);
      try {
        if (instance?.id && type === "Edit") {
          let id = instance?.id;
          const data = await update({ details, id });
          formik.resetForm();
          setSuccessModalOpen(true);
        } else {
          const data = await create(details);
          setReceiptId(data?.id);
          formik.resetForm();
          setSuccessModalOpen(true);
          refetch()
        }
      } catch (err) {
        console.error(err);
        setStatus("Somthing went wrong !");
      }
    },
  });

  const monthOptions = data?.tenant_due_list?.map((option) => ({
    value: [option?.month, option?.year],
    label: getMonthName(option?.month) + " " + option?.year,
  }));

  const handleClose = () => {
    // setSuccessModalOpen(false)
    setReceipt(false);
    formik.resetForm();
  };

  const handleCancel = async () => {
    await new Promise((resolve) => {
      setIsModalOpen(false);
      resolve();
    });
    setIsPropertyOpen(false);
  };

  return (
    <ModalLayout
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      title={`${type} Rent Income`}
      closeFun={handleClose}
      closeIcon={successModalOpen ? false : true}
    >
      {successModalOpen ? (
        <>
          <div className="border border-color-green rounded-[7px] p-3 flex items-center gap-2 bg-light-green-bg mt-8">
            <img src={circle_check} alt="" className="w-10" />
            <p className="text-color-green text-[13px] font-semibold">
              Rent income against{" "}
              <span className="font-bold">{data?.property_name || data?.parent_id?.property_name}</span> has been
              successfully added
            </p>
          </div>
          <div className="flex w-full mt-6">
            <div className="flex gap-4 flex-col sm:flex-row mobile:w-full h-auto rounded-lg mb-8 scroll-container">
              <div className="w-20 h-20">
                <img
                  src={data?.property_image ? data?.property_image + "?" + new Date() : prop_icon}
                  alt=""
                  className="flex w-38 h-38"
                />
              </div>
              <div className="flex  flex-col w-full">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <label className="font-semibold text-[17px] text-color-black">
                      {data?.property_name || data?.parent_id?.property_name}
                    </label>
                  </div>
                  <Tag color={data?.is_occupied ? "green" : "red"}>
                    {data?.is_occupied ? "Occupied" : "Vacant"}
                  </Tag>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <img src={general_icon} alt="" />
                      <label className="text-text-color-secondary">
                        {data?.flat_number || data?.house_number}
                      </label>
                      <img src={finance_icon} alt="" />
                      <label className="text-text-color-secondary whitespace-nowrap">
                        {data?.property_type_id?.name}
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={location_icon} alt="" />
                      <label className="text-text-color-secondary break-all whitespace-normal">
                        {data?.address || data?.parent_id?.address},{data?.town || data?.parent_id?.town},{data?.state_id?.state_name || data?.parent_id?.state_id?.state_name},{data?.pincode || data?.parent_id?.pincode}
                      </label>
                    </div>
                  </div>
                  <div>
                    <div className="outline-dotted rounded-lg outline-slate-200 py-1 px-2 mr-2 mt-2">
                      <div className="flex gap-2">
                        <img src={bank_icon} />
                        <labe className="font-semibold text-[14px] text-[#222222]">
                          ₹{data?.rent_id?.rent_amount}
                        </labe>
                      </div>
                      <label className="text-text-extra-light font-medium flex justify-start">
                        Rent
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end pt-6 gap-5">
            <AuthButton
              type="button"
              loading={isPending || isUpdatePending}
              label="Cancel"
              className="w-40 bg-search-bg-color rounded-md h-10 flex items-center justify-center text-text-color-secondary text-[14px] font-bold"
              onClick={() => handleCancel()}
            />
            <AuthButton
              type="button"
              loading={isReceipt}
              label="Download"
              className="w-56 bg-primary rounded-md h-10 flex items-center justify-center text-color-white"
              onClick={() => setReceipt(true)}
            />
          </div>
        </>
      ) : (
        <>
          {isLoading || isFetching ? (
            <div className="shadow border border-color-gray rounded-xl bg-color-white mt-11 p-8 flex gap-4 flex-col sm:flex-row mobile:w-full h-auto">
              <Skeleton
                avatar
                paragraph={{
                  rows: 1,
                }}
              />
            </div>
          ) : (
            <div className="flex w-full mt-8">
              <div className="flex gap-4 flex-col sm:flex-row mobile:w-full h-auto rounded-lg mb-8 scroll-container">
                <div className="w-20 h-20">
                  <img
                    src={data?.property_image ? data?.property_image + "?" + new Date() : prop_icon}
                    alt=""
                    className="flex w-full h-full"
                  />
                </div>
                <div className="flex  flex-col w-full">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <label className="font-semibold text-[17px] text-color-black">
                        {data?.property_name || data?.parent_id?.property_name}
                      </label>
                    </div>
                    <Tag color={data?.is_occupied ? "green" : "red"}>
                      {data?.is_occupied ? "Occupied" : "Vacant"}
                    </Tag>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <img src={general_icon} alt="" />
                        <label className="text-text-color-secondary">
                          {data?.flat_number || data?.house_number}
                        </label>
                        <img src={finance_icon} alt="" />
                        <label className="text-text-color-secondary whitespace-nowrap">
                          {data?.property_type_id?.name}
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src={location_icon} alt="" />
                        <label className="text-text-color-secondary break-all whitespace-normal">
                          {data?.address || data?.parent_id?.address},{data?.town || data?.parent_id?.town},{data?.state_id?.state_name || data?.parent_id?.state_id?.state_name},{data?.pincode || data?.parent_id?.pincode}
                        </label>
                      </div>
                    </div>
                    <div>
                      <div className="outline-dotted rounded-lg outline-slate-200 py-1 px-4 mr-3 mt-2">
                        <div className="flex gap-1">
                          <img src={bank_icon} />
                          <labe className="font-semibold text-[14px] text-[#222222] p-1">
                            ₹{data?.rent_id?.rent_amount}
                          </labe>
                        </div>
                        <label className="text-text-extra-light font-medium flex justify-start">
                          Rent
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isLoading || isFetching ? (
            <div className="shadow border border-color-gray rounded-xl bg-color-white mt-11 p-8 flex gap-4 flex-col sm:flex-row mobile:w-full h-auto">
              <Skeleton
                avatar
                paragraph={{
                  rows: 1,
                }}
              />
            </div>
          ) : (
            <div className="outline-dotted rounded-lg outline-slate-200 p-3">
              <p className="text-color-black text-[16px] font-semibold">
                Occupant Details
              </p>
              <div className="sm:flex items-center justify-between mt-3">
                <div>
                  <span className="text-Gray60-color text-[14px] mb-2">
                    Tenant Name
                  </span>
                  <p className="text-text-color-secondary text-[14px] font-semibold">
                    {data?.tenant_id?.tenant_name}
                  </p>
                </div>
                <div>
                  <span className="text-Gray60-color text-[14px] mb-2">
                    Phone Number
                  </span>
                  <p className="text-text-color-secondary text-[14px] font-semibold">
                    {data?.tenant_id?.phone_number}
                  </p>
                </div>
                <div>
                  <span className="text-Gray60-color text-[14px] mb-2">
                    Email Address
                  </span>
                  <p className="text-text-color-secondary text-[14px] font-semibold">
                    {data?.tenant_id?.tenant_email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {isLoading || isFetching ? (
            <div className="shadow border border-color-gray rounded-xl bg-color-white mt-11 p-8 flex gap-4 flex-col sm:flex-row mobile:w-full h-auto">
              <Skeleton
                avatar
                paragraph={{
                  rows: 3,
                }}
              />
            </div>
          ) : (
            <form onSubmit={formik.handleSubmit} noValidate>
              <div className="outline-dotted outline-2 rounded-lg outline-slate-200 p-3 mt-8">
                <h3 className="font-semibold mb-3 text-[16px]">
                  Payment Details
                </h3>
                <div className="flex gap-4 flex-col sm:flex-row mobile:w-[70%] w-full mb-8">
                  <label className="w-48 text-secondary">Month Collected</label>
                  {type === "Add" ? (
                    <SelectField
                      placeholder="Select"
                      options={monthOptions}
                      name="month_collected"
                      constant={true}
                      errors={formik.errors.month_collected}
                      value={formik.values.month_collected}
                      touched={formik.touched.month_collected}
                      onChange={(selectedOptions) => {
                        formik.setFieldValue(
                          "month_collected",
                          selectedOptions
                        );
                        let amount = data?.tenant_due_list.filter(
                          (i) =>
                            (i.month === selectedOptions?.value[0]) &
                            (i.year === selectedOptions?.value[1])
                        )[0]?.amount;
                        formik.setFieldValue("due_amount", amount);
                      }}
                    />
                  ) : (
                    <div className="flex gap-4 flex-col sm:flex-row w-full">
                      <span className="text-secondary font-semibold text-[14px]">
                        {formik.values.month_collected?.label}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mobile:w-full mt-5 flex gap-2">
                  <div className="flex gap-4 flex-col sm:flex-row w-[70%]">
                    <label className="w-48 text-secondary">Rent Received</label>
                    <InputField
                      placeholder="Amount"
                      className="bg-search-bg-color border-none"
                      name="rent_recieved"
                      errors={formik.errors.rent_recieved}
                      value={formik.values.rent_recieved}
                      touched={formik.touched.rent_recieved}
                      // handleChange={formik.handleChange}
                      handleChange={(e) => {
                        const { value } = e.target;
                        if (
                          Number(value) <= Number(formik.values.due_amount) ||
                          type === "Edit"
                        ) {
                          formik.setFieldValue("rent_recieved", value);
                        }
                      }}
                      type="number"
                    />
                  </div>
                  <div>
                    <span className="text-color-pink text-[14px]">Net Due</span>
                    <p className="text-dark-shade-grey text-[16px] font-semibold">
                      ₹
                      {formik.values.due_amount
                        ? formik.values.due_amount
                        : "0"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 flex-col sm:flex-row mobile:w-[70%] w-full">
                  <label className="w-48 text-secondary">Payment Method</label>
                  <SelectField
                    placeholder="Select"
                    options={payment_methods}
                    name="payment_method"
                    constant={true}
                    errors={formik.errors.payment_method}
                    value={formik.values.payment_method}
                    touched={formik.touched.payment_method}
                    onChange={(selectedOptions) => {
                      formik.setFieldValue("payment_method", selectedOptions);
                    }}
                  />
                </div>

                <div className="flex justify-end pt-6">
                  <AuthButton
                    type="submit"
                    loading={isPending || isUpdatePending}
                    disabled={isPending || isUpdatePending}
                    label={id ? "Save Changes" : "Add Investment Income"}
                    className="w-56 bg-primary rounded-md h-10 flex items-center justify-center text-color-white"
                  />
                </div>
              </div>
            </form>
          )}
        </>
      )}
      <div ref={componentRef}>
        <RentReceipt
          receiptData={receiptData}
          setReceipt={setReceipt}
          receipt={receipt}
        />
      </div>
    </ModalLayout>
  );
}

export default AddEdit;
