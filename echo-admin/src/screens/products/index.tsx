"use client";
import { useState } from "react";
import ProductTable from "./table";
import AddEditModal from "./add-edit-modal";
import CustomeSelect from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ProductStatus } from "@/constants/status";
import { ProductCategory } from "@/constants/add-product-category";
import { useProductActivateQuery, useProductDeactivateQuery, useProductListQuery } from "@/api-queries/products/queries";
import ConfirmationModal from "@/components/modals/confirmation-modal";
import { useListCategoryQuery, useListMenuQuery } from "@/api-queries/dropdown/queries";
import { debounce } from "@/utils/helper";

export default function ProductsList() {
  const [tableParams, setTableParams] = useState({
    page: 1,
    search: '',
    productType: '',
    menu: '',
    category: '',
    status: '',
  })
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isFetching } = useProductListQuery(tableParams)
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { mutateAsync: activate_product } = useProductActivateQuery()
  const { mutateAsync: deativate_product } = useProductDeactivateQuery()
  const { data: category } = useListCategoryQuery()
  const { data: menu } = useListMenuQuery()

  const [modalState, setModalState] = useState<{ type: string, id: any } | null>(null);
  const statusState = data?.data?.records.every((item: any) => item.isActive)

  const handleSelect = (value: any, filterType: string) => {
    setTableParams(prevParams => ({
      ...prevParams,
      [filterType]: value,
      page: 1
    }));
  };

  const handleSearch = debounce((e: any) => {
    setTableParams((prevState) => ({
      ...prevState,
      search: e.target.value,
      page: 1
    }));
  })

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAction = (type: string, id: string[]) => {
    setModalState({ type, id });
  };

  const handleConfirm = async () => {
    if (modalState) {
      try {
        switch (modalState.type) {
          case 'activate':
            await activate_product({ 'productIds': modalState.id });
            break;
          case 'deactivate':
            await deativate_product({ 'productIds': modalState.id });
            break;
          default:
            break;
        }
        setModalState(null);
        setSelectedIds([]); // Reset selectedIds after action
      } catch (error) {
        console.log('error: ', error);
      }
    }
  }


  return (
    <div className="flex flex-col w-full gap-4 p-6 bg-bg_secondary rounded-md ">
      <ProductTable
        data={data?.data?.records}
        search={true}
        onSearch={handleSearch}
        actionButtons={[
          <CustomeSelect
            key="select_1"
            placeholder={`Product\u00A0Type`}
            options={ProductCategory}
            onSelect={(value: string) => handleSelect(value, 'productType')}
          />,
          <CustomeSelect
            key="select_2"
            placeholder='Menu'
            onSelect={(value: any) => handleSelect(value, 'menu')}
            options={menu?.data} />,
          <CustomeSelect
            key="select_3"
            placeholder='Category'
            onSelect={(value: any) => handleSelect(value, 'category')}
            options={category?.data} />,
          <CustomeSelect
            key="select_4"
            placeholder='Status'
            onSelect={(value: any) => handleSelect(value, 'status')}
            options={ProductStatus} />,
          selectedIds.length === 0 ? (
            <Button
              key="add_button"
              onClick={handleOpenModal}
              variant="add_button"
              size="add"
              label="Add New Product"
            />
          ) : (
            <Button
              key="deactivate_button"
              onClick={() => handleAction(statusState ? 'deactivate' : 'activate', selectedIds)}
              variant="add_button"
              size="add"
              label={statusState ? "Deactivate" : 'Activate'}
            />
          ),]}
        pagination={data?.data?.pagination}
        tableParams={tableParams}
        setTableParams={setTableParams}
        setSelectedIds={setSelectedIds}
        selectedIds={selectedIds}
      />
      <AddEditModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      />
      <ConfirmationModal
        onClick={handleConfirm}
        isModalOpen={modalState !== null}
        handleCloseModal={() => setModalState(null)}
        title={!statusState ? "Activate" : "Deactivate"}
        buttonText={!statusState ? "Activate" : 'Deactivate'}
        message={
          selectedIds.length > 1
            ? !statusState
              ? "These products will be displayed to the customers list. Are you sure you want to proceed?"
              : "These products will be removed from the customers list. Are you sure you want to proceed?"
            : !statusState
              ? "This product will be displayed to the customers list. Are you sure you want to proceed?"
              : "This product will be removed from the customers list. Are you sure you want to proceed?"
        } />
    </div>
  );
}
