import CancelButton from '../Components/Buttons/CancelButton';
import SubmitButton from '../Components/Buttons/SubmitButton';
import ModalLayout from './ModalLayout';
import { useUserBlockQuery, useUserUnblockQuery } from '../ApiQueries/UserManagement/UserQueries';

const BlockUnblock = ({ block, unblock, setUnblock, setBlock, actionType, message = false, label, icon }) => {
  const userId = actionType;
  const { mutateAsync: blockUser, isPending } = useUserBlockQuery();
  const { mutateAsync: unblockUser, isPending: isUnblock } = useUserUnblockQuery();

  const handleConfirm = async () => {
    try {
      if (label === 'Block') {
        await blockUser(userId);
        setBlock(false);
      } else {
        await unblockUser(userId);
        setUnblock(false);
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const handleCancel = () => {
    setBlock(false);
    setUnblock(false);
  };

  return (
    <ModalLayout isOpen={block ? block : unblock} setIsOpen={!block ? setUnblock : setBlock} title="Confirmation">
      <div className="flex justify-center flex-col items-center gap-4 outline-1 outline-dotted rounded-xl outline-border_grey">
        <img src={icon} alt="" className="w-20 mt-4" />
        <p className="mb-4 text-text_black text-center">{message}</p>
      </div>
      <div className="flex justify-end items-end gap-2 mt-4">
        <div className="w-32">
          <CancelButton label="Cancel" type="button" onClick={handleCancel} />
        </div>
        <div className="w-32">
          <SubmitButton loading={isPending || isUnblock} type="button" label={label} onClick={handleConfirm} />
        </div>
      </div>
    </ModalLayout>
  );
};

export default BlockUnblock;
