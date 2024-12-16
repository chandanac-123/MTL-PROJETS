'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import BrandTable from "./table";
import AddEditBrands from "./add-edit";
import { useBrandListQuery } from "@/api-queries/brands/querirs";
import { debounce } from "@/utils/helper";

export default function BrandsTable() {
  const [tableParams, setTableParams] = useState({
    page: 1,
    search: '',
  })
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState(false);
  const { data, isFetching } = useBrandListQuery(tableParams)

  const handleSearch = debounce((e: any) => {
    setTableParams((prevState) => ({
      ...prevState,
      search: e.target.value,
      page: 1
    }));
  })

  const handleOpenModal = () => {
    setId(false)
    setIsModalOpen(!isModalOpen);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className="flex flex-col w-full gap-4 p-6 bg-bg_secondary rounded-md ">
      <AddEditBrands
        id={id}
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        setTableParams={setTableParams} />
      <BrandTable
        data={data?.data?.records}
        setId={setId}
        search={true}
        onSearch={handleSearch}
        actionButtons={[
          <Button
            key="button"
            onClick={handleOpenModal}
            variant="add_button"
            size="add"
            label="Add New Brand"
          />]}
        setIsModalOpen={setIsModalOpen}
        pagination={data?.data?.pagination}
        tableParams={tableParams}
        setTableParams={setTableParams}
      />
    </div>
  );
}
