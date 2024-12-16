import React, { useState } from "react";
import PageLayout from "../../../Common/PageLayout";
import Table from "./Table";
import SearchInput from "../../../Components/CustomSearch/SearchInput";
import ContinueButton from "../../../Components/CustomButtons/ContinueButton";
import download_icon from "../../../Static/Images/exit-down.svg";
import { reportExpenseDownloadApiCall } from "../../../Static/Apis";
import { dateRangeConversion, dateRangeConversion2, dateTimeConverter, exportToExcel } from "../../../Utils/Helper";
import { ErrorToast } from "../../../Utils/AlertMessages";
import { useReportListExpense } from "../../../ApiQuery/Report/ReportQuery";
import Rangepicker from "../../../Components/CustomDate/Rangepicker";
import { debounce, formatCurrencyIndianStyle } from "../../../Utils/utils";
import SelectField from "../../../Components/CustomSelect/SelectField";
import { useExpenseTypeDropdown } from "../../../ApiQuery/Dropdown/ListQuery";

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
    sort: "",
    startDate: "",
    endDate: ""
  });

  const { data, isLoading, isFetching } = useReportListExpense(tableParams);
  const { data: expenseType, isFetching: isExpense } = useExpenseTypeDropdown()

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
    console.log('value: ', value, 'name: ', name);
  
    if (name === "dateRange") {
      // Handle date range selection
      let newDateFormat = dateRangeConversion2(value);
      setTableParams((prevState) => ({
        ...prevState,
        startDate: value?.length > 0 ? newDateFormat[0] : "",
        endDate: value?.length > 0 ? newDateFormat[1] : "",
        pagination: {
          ...prevState.pagination,
          current: 1,
        }
      }));
    } else if (name === "expense_type") {
      // Handle expense type selection
      setTableParams((prevState) => ({
        ...prevState,
        expense_type: value?.value,
        pagination: {
          ...prevState.pagination,
          current: 1,
        }
      }));
    }
  }
  

  const downloadApi = async () => {
    try {
      const fetchAPI = await reportExpenseDownloadApiCall(tableParams)
      exportToExcel(fetchAPI?.data, `expense_report_${dateTimeConverter(new Date())}`)
    } catch (error) {
      let err = await error.response.data.text()
      let errDetails = JSON.parse(err)
      ErrorToast({ message: errDetails?.detail?.data || "Somthing went wrong !" })
    }
  }

  return (
    <PageLayout>
      {console.log(data)}
      <div className="flex mobile:flex-row flex-col gap-4 items-center justify-between pb-6">
        <div className="w-full gap-4 items-center flex sm:flex-row flex-col xl:w-auto ">
          <SearchInput placeholder="Building Name" onChange={(e) => handleSearch(e)} />
          <div className="w-full outline-dotted outline-monthly-red rounded-lg outline-2 pl-4">
            <p className="text-monthly-red font-semibold">₹ {!data && '0.00' || formatCurrencyIndianStyle(data?.total_amount, 25)}</p>
            <p className="text-text-extra-light font-semibold text-sm">Total Expense</p>
          </div>
        </div>
        <div className="w-full gap-2 items-center flex sm:flex-row flex-col xl:w-auto">
          <SelectField placeholder="Expenses Type" name="expense_type" constant={false} isMulti={false}  onChange={(value) => handleSelect(value, "expense_type")} options={expenseType} />

          <Rangepicker name="dateRange"onChange={(value) => handleSelect(value, "dateRange")} />
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

export default TargetAmount;
