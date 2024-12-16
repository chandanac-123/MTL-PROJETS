import { Divider, Skeleton, Tag } from "antd";
import React, { Suspense, useState } from "react";
import general_icon from "../../../../Static/Images/general.svg";
import bank_icon from "../../../../Static/Images/bank.svg";
import { useParams } from "react-router-dom";
import { useRentIncomeIdQuery } from '../../../../ApiQuery/RentIncome/RentIncomeQuery'
import { getBalance } from "../../../../Utils/utils";
import { capitalizeNames } from "../../../../Utils/Helper";
import finance_icon from '../../../../Static/Images/finance.svg'
import location_icon from '../../../../Static/Images/geolocation.svg'
import ContinueButton from "../../../../Components/CustomButtons/ContinueButton";
import AddEdit from "../AddEdit";
import prop_icon from '../../../../Static/Images/property.jpg'

function RentCollectedView() {
  const params = useParams()
  const [modalOpen, setModalOpen] = useState(false);
  const { data, isLoading, isFetching } = useRentIncomeIdQuery(params?.id)

  return (
    <div>
      {isLoading || isFetching ?
        <div className="shadow border border-color-gray rounded-xl bg-color-white mt-11 p-8 flex gap-4 flex-col sm:flex-row mobile:w-full h-auto">
          <Skeleton
            avatar
            paragraph={{
              rows: 4,
            }}
          />
        </div>
        :
        <div className="shadow border border-color-gray rounded-xl bg-color-white mt-11 p-8 flex gap-4 flex-col sm:flex-row mobile:w-full h-auto">
          <div className="rounded-xl w-[150px] h-[150px]">
            <Suspense fallback={<Skeleton.Image active={true} />}>
              <img src={data?.property_id?.parent_id?.property_image || data?.property_id?.property_image || prop_icon} className='flex w-36 h-36' />
            </Suspense>
          </div>
          <div className="flex flex-col w-full gap-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <label className="font-medium text-lg ">{data?.property_id?.parent_id?.property_name || data?.property_id?.property_name}</label>
                <Tag color={data?.property_id?.is_occupied ? "green" : "red"}>
                  {data?.property_id?.is_occupied ? "Occupied" : "Vacant"}
                </Tag>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-start gap-2 mobile:items-center">
                <img src={general_icon} alt="" />
                <label className="text-[#999999] font-medium text-[15px]">
                  {data?.property_id?.flat_number || data?.property_id?.house_number}
                </label>
              </div>
              <div className="flex items-start gap-2 mobile:items-center">
                <img src={finance_icon} alt='' />
                <label className="text-[#999999] font-medium text-[15px]">
                  {data?.property_id?.property_type_id?.name}
                </label>
              </div>
              <div className="flex items-start gap-2 mobile:items-center">
                <img src={location_icon} alt='' />
                <label className="text-[#999999] font-medium text-[15px] break-all whitespace-normal">
                  {data?.property_id?.parent_id?.address || data?.property_id?.address},{data?.property_id?.parent_id?.town || data?.property_id?.town},{data?.property_id?.parent_id?.state_id?.state_name || data?.property_id?.state_id?.state_name},{data?.property_id?.parent_id?.pincode || data?.property_id?.pincode}
                </label>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="outline-dotted rounded-lg outline-slate-200 p-2">
                <div className="flex gap-2">
                  <img src={bank_icon} />
                  <labe className="font-semibold text-[16px] text-[#222222]">
                    ₹{data?.rent_id?.rent_amount}
                  </labe>
                </div>
                <labe className="text-text-extra-light font-medium">Rent</labe>
              </div>
            </div>
          </div>
        </div>
      }

      <div className="mobile:flex block mt-5 w-full gap-4">
        <div className="shadow border color-gray bg-color-white rounded-xl mobile:w-[40%] w-full">
          <div className="p-5">
            <span className="color-black text-[18px] font-semibold">
              Tenant Details
            </span>
          </div>
          <Divider className="my-0" />
          {isLoading || isFetching ?
            <div className="p-5">
              <Skeleton
                paragraph={{
                  rows: 3,
                }}
              />
            </div>
            :
            <div className="p-5">
              <div className="flex items-center">
                <span className="text-text-extra-light text-[16px] font-semibold w-[40%]">
                  Tenant Name
                </span>
                <span className="text-text-color-secondary text-[16px] font-semibold">
                  {capitalizeNames(data?.tenant_id?.tenant_name)}
                </span>
              </div>
              <div className="flex items-center mt-3">
                <span className="text-text-extra-light text-[16px] font-semibold w-[40%]">
                  Phone Number
                </span>
                <span className="text-text-color-secondary text-[16px] font-semibold">
                  {data?.tenant_id?.phone_number}
                </span>
              </div>
              <div className="flex items-center mt-3">
                <span className="text-text-extra-light text-[16px] font-semibold w-[40%]">
                  Email Address{" "}
                </span>
                <span className="text-text-color-secondary text-[16px] font-semibold">
                  {data?.tenant_id?.tenant_email}
                </span>
              </div>
            </div>
          }

        </div>
        <div className="shadow border color-gray bg-color-white rounded-xl mobile:w-[60%] w-full mobile:mt-0 mt-4">
          <div className="p-5">
            <span className="color-black text-[18px] font-semibold">
              Payment Details
            </span>
          </div>
          <Divider className="my-0" />
          {isLoading || isFetching ?
            <div className="p-5">
              <Skeleton
                paragraph={{
                  rows: 3,
                }}
              />
            </div>
            :
            <div className="p-5 flex items-center justify-around flex-wrap gap-2">
              <div className="outline-dotted rounded-lg outline-slate-200 p-2 mt-2 w-52">
                <p className="text-[24px] font-semibold text-primary">
                  ₹{data?.rent_id?.rent_amount}
                </p>
                <p className="text-text-extra-light text-[16px] font-semibold">
                  Rent
                </p>
              </div>
              <div className="outline-dotted rounded-lg outline-slate-200 p-2 mt-2 w-52">
                <p className="text-[24px] font-semibold text-color-green">
                  ₹{data?.amount_recieved}
                </p>
                <p className="text-text-extra-light text-[16px] font-semibold">
                  Amount Received
                </p>
              </div>
              <div className="outline-dotted rounded-lg outline-slate-200 p-2 mt-2 w-52">
                <p className="text-[24px] font-semibold text-color-orange">
                  ₹{getBalance(data?.amount_recieved, data?.rent_id?.rent_amount)}
                </p>
                <p className="text-text-extra-light text-[16px] font-semibold">
                  Net Due
                </p>
              </div>
            </div>
          }

        </div>
      </div>
      <div className="w-full mt-5 flex items-center justify-end">
        <ContinueButton label="Clear Due Amount" onClick={() => setModalOpen(true)} />
      </div>
      {data?.id && modalOpen &&
        <AddEdit id={data?.property_id?.id} isModalOpen={modalOpen} setIsModalOpen={setModalOpen} type={"Clear Due"} instance={data} rent_month={data?.rent_month} rent_year={data?.rent_year} />
      }
    </div>
  );
}

export default RentCollectedView;
