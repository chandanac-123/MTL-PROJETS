import ModalLayout from './ModalLayout';
import delete_icon from '../assets/delete.svg';
import SubmitButton from '../Components/Buttons/SubmitButton';
import CancelButton from '../Components/Buttons/CancelButton';
import SelectComponent from '../Components/Inputs/Select';
import { useCategoryQuery } from '../ApiQueries/Dropdown/DropdownQueries';

const AssignAndDelete = ({ isOpen, setIsOpen, setIsDeleteOpen, id }) => {
  const { data: categorylist, isFetching } = useCategoryQuery({
    id,
    enabled: true
  });

  const handleConfirm = () => {
    setIsDeleteOpen(true);
  };

  const handleSelect = (val) => {
    setIsOpen(val?.value);
  };
  return (
    <ModalLayout isOpen={isOpen} setIsOpen={setIsOpen} title="Confirm Deletion">
      <div className="flex justify-center flex-col items-center gap-4 outline-1 outline-dotted rounded-xl outline-border_grey">
        <img loading="lazy" src={delete_icon} alt="" className="w-20 mt-4" />
        <p className=" text-text_black text-center p-2">Deleting this category will permanently remove it from the system. Ensure you reassigned the events to an existing category before proceeding.</p>
        <div className="gap-4 flex-col sm:flex-row w-3/4 mb-8">
          <label className="w-48 text-text_black font-semibold">Select Category</label>
          <SelectComponent
            placeholder="Category"
            value={categorylist?.data.filter((item) => item.value === isOpen)[0] ? categorylist?.data.filter((item) => item.value === isOpen)[0] : ''}
            options={categorylist?.data}
            onChange={handleSelect}
            isClearable={false} />
        </div>
      </div>
      <div className="flex justify-end items-end gap-4 mt-8">
        <div className="w-40">
          <CancelButton label="Cancel" onClick={() => setIsOpen(false)} />
        </div>
        <div className="w-40">
          <SubmitButton label="Assign & Delete" onClick={handleConfirm} />
        </div>
      </div>
    </ModalLayout>
  );
};

export default AssignAndDelete;
