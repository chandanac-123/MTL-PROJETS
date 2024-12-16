import PageLayout from '../../Common/PageLayout';
import SubmitButton from '../../Components/Buttons/SubmitButton';
import Search from '../../Components/Inputs/Search';
import Table from './Table';
import download_icon from '../../assets/download.svg';
import { useUserListQuery } from '../../ApiQueries/UserManagement/UserQueries';
import { useState } from 'react';
import { dateConversion, debounce, exportToExcel } from '../../Utiles/Helper';
import { useReportListQuery } from '../../ApiQueries/Report/ReportQuery';

const UserDataReport = () => {
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      search: ''
    },
  });
  const { data: list, isFetching } = useUserListQuery(tableParams);
  const { data: excelData, isFetching: excelFetch } = useReportListQuery(tableParams?.pagination?.search)

  const onChange = (e) => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: e?.current,
        pageSize: e?.pageSize
      }
    });
  };

  const handleSearch = debounce((e) => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        search: e.target.value,
        current: 1
      }
    });
  });

  const handleExcel = () => {
    const formattedData = excelData?.data?.map(item => ({
      UserName: item?.['User Name'],
      Full_Name: item?.Name      ,
      Email: item?.Email,
      Phone: item?.['Phone Number'],
      Badge: item?.Badge?.display_name,
      Created_On: item?.['Created On'],
      Profile_Pic: item?.profile_pic,
    }));
    exportToExcel(formattedData, 'report_excel')
  }

  return (
    <PageLayout>
      <div className="flex md:flex-row flex-col gap-4 mb-4 justify-between">
        <div className="w-full sm:w-auto">
          <Search placeholder="Name , Username" onChange={(e) => handleSearch(e)} />
        </div>
        <div className="flex md:flex-row flex-col gap-4 md:w-auto">
          <SubmitButton type='button' label="Excel" icon={download_icon} onClick={handleExcel} />
        </div>
      </div>
      <Table setTableParams={setTableParams} tableParams={{ ...tableParams.pagination, total: list?.data?.n_user }} data={list?.data?.users} onChange={onChange} loading={isFetching} />
    </PageLayout>
  );
};

export default UserDataReport;
