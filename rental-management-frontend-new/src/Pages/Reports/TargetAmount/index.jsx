import React, { useState } from "react";
import PageLayout from "../../../Common/PageLayout";
import Table from "./Table";
import SearchInput from "../../../Components/CustomSearch/SearchInput";
import ContinueButton from "../../../Components/CustomButtons/ContinueButton";
import download_icon from "../../../Static/Images/exit-down.svg";
import {  reportTargetDownloadApiCall } from "../../../Static/Apis";
import { dateTimeConverter, exportToExcel } from "../../../Utils/Helper";
import { ErrorToast } from "../../../Utils/AlertMessages";
import Datepicker from "../../../Components/CustomDate/Datepicker";
import { useReportListTargetQuery } from "../../../ApiQuery/Report/ReportQuery";
import { debounce } from "../../../Utils/utils";

const TargetAmount = () => {
  const [id, setId] = useState(false);
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      search: "",
    },
    expense_type: "",
    sort:""
  });

  const { data, isLoading, isFetching } = useReportListTargetQuery(tableParams);

  const onChange = (e, filter, sorter) => {
    let sort = ""
    if (sorter?.order === "descend") {
      sort = "-" + sorter?.field
    } else if (sorter?.order === "ascend") {
      sort = sorter?.field
    }
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: e?.current,
        pageSize: e?.pageSize,
      },
      sort
    });
  };

  const handleSearch = debounce((e) => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        search: e.target.value,
        current: 1,
      },
    });
  })

  const handleSelect = (value, name) => {
    let newVal = new Date(value || '')
    let occupancyFilter = tableParams.occupancyFilter
    let month = tableParams.createdMonth
    if (name === "month") {
      month = newVal?.getMonth() + 1
    } else {
      occupancyFilter = value?.value
    }
    setTableParams((prevState) => {
      return {
        ...prevState,
        occupancyFilter: occupancyFilter,
        createdYear: newVal?.getFullYear(),
        createdMonth: month,
        pagination: {
          ...prevState.pagination,
          current: 1
        }
      }
    })
  }

  const downloadApi = async () => {
    try {
      const fetchAPI = await reportTargetDownloadApiCall(tableParams)
      exportToExcel(fetchAPI?.data, `target_report_${dateTimeConverter(new Date())}`)
    } catch (error) {
      console.log(error)
      ErrorToast({ message: "Somthing went wrong !" })
    }
  }

  return (
    <PageLayout>
      {console.log(data)}
      <div className="flex sm:flex-row flex-col gap-4 items-center justify-between pb-6">
        <div className="w-full sm:w-auto">
          <SearchInput placeholder="Building Name" onChange={(e) => handleSearch(e)} />
        </div>
        <div className="w-full gap-2 items-center flex sm:flex-row flex-col sm:w-auto">
          <Datepicker onChange={handleSelect} picker='month' name='month' format='MMMM' />
          <div className='w-full sm:w-auto'>
            <ContinueButton label='Download' img={download_icon} onClick={downloadApi}
              className='bg-primary text-color-white px-6 py-2 min-w-1/6 w-full rounded-lg flex items-center  gap-2 justify-center' />
          </div>
        </div>
      </div>
      <Table tableParams={{ ...tableParams.pagination, total: data?.count }} openDelete={openDelete} setOpenDelete={setOpenDelete} setOpenEdit={setOpenEdit} data={data?.results} loading={isLoading || isFetching} onChange={onChange} setId={setId} id={id} />
    </PageLayout>
  );
};

export default TargetAmount;
