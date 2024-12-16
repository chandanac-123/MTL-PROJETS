import React, { useState ,useEffect} from "react";
import PageLayout from "../../../Common/PageLayout";
import Table from "./Table";
import SearchInput from "../../../Components/CustomSearch/SearchInput";
import ContinueButton from "../../../Components/CustomButtons/ContinueButton";
import download_icon from "../../../Static/Images/exit-down.svg";
import plus from '../../../Static/Images/plus.svg'
import SelectField from "../../../Components/CustomSelect/SelectField";
import { useExpenseListQuery } from "../../../ApiQuery/Expenses/ExpenseQuery";
import AddButton from "../../../Components/CustomButtons/AddButton";
import AddExpense from "./add";
import AddEdit from "./add/AddEdit";
import { useExpenseTypeDropdown } from "../../../ApiQuery/Dropdown/ListQuery";
import { expenseDownloadApiCall } from "../../../Static/Apis";
import { dateTimeConverter, exportToExcel } from "../../../Utils/Helper";
import { ErrorToast } from "../../../Utils/AlertMessages";
import { debounce } from "../../../Utils/utils";

const Expences = () => {
  const [id, setId] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      search: "",
    },
    expense_type: "",
  });

  const { data, isLoading, isFetching } = useExpenseListQuery(tableParams);
  const { data: expenseType, isFetching: isExpense } = useExpenseTypeDropdown()

  const onChange = (e) => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: e?.current,
        pageSize: e?.pageSize,
      },
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

  const handleSelect = (value) => {
    setTableParams((prevState) => {
      return {
        ...prevState,
        expense_type: value?.value,
        pagination: {
          ...prevState.pagination,
          current: 1
        }
      }
    })
  }

  const downloadApi = async () => {
    try {
      const fetchAPI = await expenseDownloadApiCall(tableParams)
      exportToExcel(fetchAPI?.data, `expense_report_${dateTimeConverter(new Date())}`)
    } catch (error) {
      console.log(error)
      ErrorToast({ message: "Somthing went wrong !" })
    }
  }

  return (
    <PageLayout>
      <div className="flex sm:flex-row flex-col gap-4 items-center justify-between pb-6">
        <div className="w-full sm:w-auto">
          <SearchInput placeholder="Building name" onChange={(e) => handleSearch(e)} />
        </div>
        <div className="w-full gap-2 items-center flex sm:flex-row flex-col sm:w-auto">
          <div className=' w-full sm:w-auto'>
            <SelectField placeholder="Expenses Type" name="expense_type" constant={false} isMulti={false} onChange={handleSelect} options={expenseType} />
          </div>
          <div className='w-full sm:w-auto'>
            <ContinueButton label='Download' img={download_icon} onClick={downloadApi}
              className='bg-primary text-color-white px-6 py-2 min-w-1/6 w-full rounded-lg flex items-center  gap-2 justify-center' />
          </div>
          <div className=' w-full sm:w-auto'>
            <AddButton img={plus} label="Add Expenses"
              onClick={() => {
                setShowAddModal(true);
                setId(false)
              }} />
          </div>
        </div>
      </div>
      <Table tableParams={{ ...tableParams.pagination, total: data?.count }} openDelete={openDelete} setOpenDelete={setOpenDelete} setOpenEdit={setOpenEdit} data={data?.results} loading={isLoading || isFetching} onChange={onChange} setId={setId} id={id} />
      <AddExpense isPropertyOpen={showAddModal} setIsPropertyOpen={setShowAddModal} id={id} />
      <AddEdit id={id} isModalOpen={openEdit} setIsModalOpen={setOpenEdit} />
    </PageLayout>
  );
};

export default Expences;
