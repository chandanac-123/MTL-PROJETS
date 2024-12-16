import { Divider, Skeleton } from "antd";
import React, { Suspense, useEffect } from "react";
import general_icon from "../../../../Static/Images/general.svg";
import bank_icon from "../../../../Static/Images/bank.svg";
import DownloadButton from "../../../../Components/CustomButtons/DownloadButton";
import download from "../../../../Static/Images/exit-down.svg";
import CustomeTimeLine from "./CustomeTimeLine";
import { useParams } from "react-router-dom";
import { advanceHistoryDownloadApiCall } from "../../../../Static/Apis";
import { ErrorToast } from "../../../../Utils/AlertMessages";
import { capitalizeNames, dateTimeConverter, exportToExcel } from "../../../../Utils/Helper";
import finance_icon from '../../../../Static/Images/finance.svg'
import location_icon from '../../../../Static/Images/geolocation.svg'
import prop_icon from '../../../../Static/Images/property.jpg'
import { useAdvanceIncomeIdQuery } from "../../../../ApiQuery/AdvanceIncome/Queries";
import { getBalance } from "../../../../Utils/utils";

function AdvanceIncomeView() {
  const params = useParams()
  const { data, isLoading, isFetching, refetch } = useAdvanceIncomeIdQuery(params?.id)

  useEffect(() => { refetch() }, [])

  const handleDownload = async () => {
    try {
      let values = {
        id: params?.id,
      }
      const fetchAPI = await advanceHistoryDownloadApiCall(values)
      exportToExcel(fetchAPI?.data, `advance_income_${dateTimeConverter(new Date())}`)
    } catch (error) {
      ErrorToast({ message: "Somthing went wrong !" })
    }
  };

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
              <img src={data?.property_id?.property_image ? data?.property_id?.property_image + "?" + new Date() : prop_icon} className='flex w-36 h-36' />
            </Suspense>
          </div>
          <div className="flex flex-col w-full gap-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <label className="font-medium text-lg">{data?.property_id?.property_name || data?.property_id?.parent_id?.property_name}</label>
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
                  {data?.property_id?.address || data?.property_id?.parent_id?.address},{data?.property_id?.town || data?.property_id?.parent_id?.town},{data?.property_id?.state_id?.state_name || data?.property_id?.parent_id?.state_id?.state_name},{data?.property_id?.pincode || data?.property_id?.parent_id?.pincode}
                </label>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="outline-dotted rounded-lg outline-slate-200 p-2">
                <div className="flex gap-2 xs:flex-row flex-col">
                  <img src={bank_icon} width={16} height={24} />
                  <labe className="font-semibold text-[16px] text-[#222222]">
                    ₹{data?.amount_recieved}
                  </labe>
                </div>
                <labe className="text-text-extra-light font-medium">Advance</labe>
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
                  ₹{data?.tenant_id?.advance_amount}
                </p>
                <p className="text-text-extra-light text-[16px] font-semibold">
                  Advance Amount
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
                  {/* ₹{data?.tenant_advance[0]?.balance_amount} */}
                  ₹{getBalance(data?.amount_recieved,data?.tenant_id?.advance_amount).toFixed(2)}
                </p>
                <p className="text-text-extra-light text-[16px] font-semibold">
                  Net Due
                </p>
              </div>
            </div>
          }

        </div>
      </div>
      <div className="shadow border border-color-gray rounded-xl bg-color-white mt-5 p-5 mobile:w-full h-auto">
        {isLoading || isFetching ?
          <div className="p-5">
            <Skeleton
              paragraph={{
                rows: 5,
              }}
            />
          </div>
          :
          <>
            <div className="flex items-center justify-between w-full">
              <div>
                <p className="text-color-black text-[18px] font-semibold">
                Advance Collection History
                </p>
                <span className="text-text-extra-light text-[14px] font-semibold">
                  Latest activities
                </span>
              </div>
              <div>
                <DownloadButton label="Download" img={download} onClick={handleDownload} />
              </div>
            </div>
            <div className="mt-8">
              {data &&
                <CustomeTimeLine data={data} refetch={refetch} />
              }
            </div>
          </>
        }

      </div>
    </div>
  );
}

export default AdvanceIncomeView;
