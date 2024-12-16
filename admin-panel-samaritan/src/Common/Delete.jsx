import React from 'react';
import ModalLayout from './ModalLayout';
import delete_icon from '../assets/delete.svg';
import SubmitButton from '../Components/Buttons/SubmitButton';
import CancelButton from '../Components/Buttons/CancelButton';

const Delete = ({ isDeleteOpen, setIsDeleteOpen, onClick, name }) => {
  return (
    <ModalLayout isOpen={isDeleteOpen} setIsOpen={setIsDeleteOpen} title="Confirm Deletion">
      <div className="flex justify-center flex-col items-center gap-4 outline-1 outline-dotted rounded-xl outline-border_grey">
        <img loading="lazy" src={delete_icon} alt="" className="w-20 mt-4" />
        <p className="mb-2 text-text_black">Are you sure you want to delete this {name}?</p>
      </div>
      <div className="flex justify-end items-end gap-4 mt-8">
        <div className="w-40">
          <CancelButton label="Cancel" onClick={() => setIsDeleteOpen(false)} />
        </div>
        <div className="w-40">
          <SubmitButton label="Delete" onClick={onClick} />
        </div>
      </div>
    </ModalLayout>
  );
};

export default Delete;
