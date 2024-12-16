import React, {  useState } from "react";
import PageLayout from "../../../Common/PageLayout";
import Table from "./Table";
import SearchInput from "../../../Components/CustomSearch/SearchInput";
import ContinueButton from "../../../Components/CustomButtons/ContinueButton";
import download_icon from "../../../Static/Images/exit-down.svg";
import SelectField from "../../../Components/CustomSelect/SelectField";
import { reportIncomeDownloadApiCall } from "../../../Static/Apis";
import { dateRangeConversion2,dateRangeConversion, dateTimeConverter, exportToExcel } from "../../../Utils/Helper";
import { ErrorToast } from "../../../Utils/AlertMessages";
import { useReportListIncome } from "../../../ApiQuery/Report/ReportQuery";
import { payment_methods } from "../../../Utils/Constants";
import Rangepicker from "../../../Components/CustomDate/Rangepicker";
import { debounce, formatCurrencyIndianStyle } from "../../../Utils/utils";

const IncomeReport = () => {
  const [id, setId] = useState(false);
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      search: "",
      sort: ""
    },
    payment_Type: "",
    sort: "",
    startDate: "",
    endDate: ""
  });
  const { data, isLoading, isFetching } = useReportListIncome(tableParams);

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
    console.log(name, "namename");
    let payment_Type = tableParams?.payment_Type
    let startDate = tableParams?.startDate
    let endDate = tableParams?.endDate
    if (name?.name === "payment_Type") {
      payment_Type = value?.value
    } else {
      if (value?.length > 0) {
        let newDateFormat = dateRangeConversion2(value)
        startDate = newDateFormat[0]
        endDate = newDateFormat[1]
      } else {
        startDate = ""
        endDate = ""
      }
    }
    setTableParams((prevState) => {
      return {
        ...prevState,
        payment_Type: payment_Type,
        startDate: startDate,
        endDate: endDate,
        pagination: {
          ...prevState.pagination,
          current: 1
        }
      }
    })
  }

  const downloadApi = async () => {
    try {
      const fetchAPI = await reportIncomeDownloadApiCall(tableParams)
      exportToExcel(fetchAPI?.data, `income_report_${dateTimeConverter(new Date())}`)
    } catch (error) {
      let err = await error.response.data.text()
      let errDetails = JSON.parse(err)
      ErrorToast({ message: errDetails?.detail?.data || "Somthing went wrong !" })
    }
  }

  return (
    <PageLayout>
      <div className="flex mobile:flex-row flex-col gap-4 items-center justify-between pb-6">
        <div className="w-full gap-4 items-center flex sm:flex-row flex-col xl:w-auto ">
          <SearchInput placeholder="Building Name ,Tenant" onChange={(e) => handleSearch(e)} />
          <div className="w-full outline-dotted outline-color-green rounded-lg outline-2 pl-4">
            <p className="text-color-green font-semibold whitespace-nowrap">₹ {!data && '0.00' || formatCurrencyIndianStyle(data?.total_amount)}</p>
            <p className="text-text-extra-light font-semibold text-sm">Total Income</p>
          </div>
        </div>
        <div className="w-full gap-2 items-center flex sm:flex-row flex-col xl:w-auto z-10">
          <SelectField placeholder="Payment Mode" name="payment_Type" constant={true} isMulti={false} onChange={handleSelect} options={payment_methods} />
          <Rangepicker onChange={handleSelect} />
          <div className='w-full xl:w-auto'>
            <ContinueButton label='Download' img={download_icon} onClick={downloadApi}
              className='bg-primary text-color-white px-6 py-2 min-w-1/6 w-full rounded-lg flex items-center  gap-2 justify-center' />
          </div>

        </div>
      </div>
      <Table tableParams={{ ...tableParams.pagination, total: data?.count }} openDelete={openDelete} setOpenDelete={setOpenDelete} setOpenEdit={setOpenEdit} data={data?.results} loading={isLoading || isFetching} onChange={onChange} setId={setId} id={id} />
    </PageLayout>
  );
};

export default IncomeReport;
