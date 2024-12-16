import React, { useEffect, useState } from "react";
import ModalLayout from "../../../Common/ModalLayout";
import SearchInput from "../../../Components/CustomSearch/SearchInput";
import { Divider, Skeleton, Tag } from "antd";
import location_icon from "../../../Static/Images/geolocation.svg";
import finance_icon from "../../../Static/Images/finance.svg";
import general_icon from "../../../Static/Images/general.svg";
import AddEdit from "./AddEdit";
import bank_icon from "../../../Static/Images/bank.svg";
import prop_icon from '../../../Static/Images/property.jpg'
import { useAdvancePropertyQuery } from "../../../ApiQuery/AdvanceIncome/Queries";

const AddProperty = ({ isPropertyOpen, setIsPropertyOpen }) => {
  const [propertyId, setPropertyId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useState("");
  const { data: propList, isLoading, isFetching, refetch } = useAdvancePropertyQuery({ searchParams });

  useEffect(() => {
    refetch()
  }, [isPropertyOpen])

  const handleSearch = (e) => {
    setSearchParams(e.target.value);
  };

  return (
    <ModalLayout
      isModalOpen={isPropertyOpen}
      setIsModalOpen={setIsPropertyOpen}
      title="Add Advance Income"
    >
      <div className="px-8 py-8 mt-2">
        <div className="w-full sm:w-auto">
          <SearchInput
            placeholder="Search Property"
            onChange={(e) => handleSearch(e)}
          />
        </div>
        <Divider plain>OR</Divider>
        {isLoading || isFetching ? (
          <div className="shadow border border-color-gray rounded-xl bg-color-white mt-11 p-8 flex gap-4 flex-col sm:flex-row mobile:w-full h-auto">
            <Skeleton
              avatar
              paragraph={{
                rows: 4,
              }}
            />
          </div>
        ) :
          <div class="overflow-y-auto scrollbar w-full max-h-80">
            <p className="text-Gray60-color mb-3 font-medium text-[16px]">
              Rent Nearing Properties
            </p>
            {propList?.results?.map((i) => (
              <button
                className="flex w-full cursor-default"
                onClick={() => {
                  setPropertyId(i?.id);
                  setModalOpen(true)
                }}
              >
                <div className="flex gap-4 flex-col sm:flex-row mobile:w-full h-auto rounded-lg mb-8 scroll-container cursor-pointer">
                  <div className="w-20 h-20">
                    <img
                      src={i?.property_image ? i?.property_image + "?" + new Date() : prop_icon}
                      alt=""
                      className="flex w-full h-full"
                    />
                  </div>
                  <div className="flex  flex-col w-full">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <label className="font-semibold text-[17px] text-color-black cursor-pointer">
                          {i?.property_name || i?.parent_id?.property_name}
                        </label>
                        {i?.pending_due ?
                          <span className="text-color-pink text-[12px]">{i?.pending_due} Dues</span>
                          : null}

                      </div>
                      <Tag color={i?.is_occupied ? "green" : "red"}>
                        {i?.is_occupied ? "Occupied" : "Vacant"}
                      </Tag>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <img src={general_icon} alt="" />
                          <label className="text-text-color-secondary cursor-pointer">
                            {i?.flat_number || i?.house_number}
                          </label>
                          <img src={finance_icon} alt="" />
                          <label className="text-text-color-secondary whitespace-nowrap cursor-pointer">
                            {i?.property_type_id?.name}
                          </label>
                        </div>
                        <div className="flex items-start gap-2">
                          <img src={location_icon} alt="" />
                          <label className="text-text-color-secondary break-words whitespace-wrap cursor-pointer">
                            {i?.address || i?.parent_id?.address},{i?.town || i?.parent_id?.town},{i?.state_id?.state_name || i?.parent_id?.state_id?.state_name},{i?.pincode || i?.parent_id?.pincode}
                          </label>
                        </div>
                      </div>
                      <div>
                        <div className="hidden md:block outline-dotted rounded-lg outline-slate-200 py-1 px-2 mr-2 mt-2 min-w-[120px]">
                          <div className="flex gap-2">
                            <img src={bank_icon} />
                            <labe className="font-semibold text-[16px] text-[#222222]">
                              ₹{i?.property_base_advance[0]?.expected_amount || '0.00'}
                            </labe>
                          </div>
                          <label className="text-text-extra-light font-medium flex justify-start">
                             Advance
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        }

      </div>
      {propertyId && modalOpen &&
        <AddEdit id={propertyId} isModalOpen={modalOpen} setIsModalOpen={setModalOpen} setIsPropertyOpen={setIsPropertyOpen} type="Add" />
      }
    </ModalLayout>
  );
};

export default AddProperty;
