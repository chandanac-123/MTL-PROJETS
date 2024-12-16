import { useNavigate } from 'react-router-dom';
import { usePostApproveQuery, usePostRejectQuery } from '../ApiQueries/PostApprovals/PostQueries';
import CancelButton from '../Components/Buttons/CancelButton';
import SubmitButton from '../Components/Buttons/SubmitButton';
import ModalLayout from './ModalLayout';

const ApproveReject = ({ approve, reject, setApprove, setReject, message, icon, label, id }) => {
  const { mutateAsync: approvePost, isPending } = usePostApproveQuery();
  const { mutateAsync: rejectPost, isPending: isRejectPending } = usePostRejectQuery();
  const navigate = useNavigate();

  const handleConfirm = async () => {
    try {
      if (label === 'Approve') {
        await approvePost(id);
        setApprove(false);
        navigate('/post-approval');
      } else {
        await rejectPost(id);
        setReject(false);
        navigate('/post-approval');
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const handleCancel = () => {
    setApprove(false);
    setReject(false);
  };

  return (
    <ModalLayout isOpen={approve ? approve : reject} setIsOpen={!approve ? setReject : setApprove} title="Confirmation">
      <div className="flex justify-center flex-col items-center gap-4 outline-1 outline-dotted rounded-xl outline-border_grey">
        <img loading="lazy" src={icon} alt="" className="w-20 mt-4" />
        <p className="mb-4 text-text_black text-center">{message}</p>
      </div>
      <div className="flex justify-end items-end gap-2 mt-4">
        <div className="w-32">
          <CancelButton label="Cancel" type="button" onClick={handleCancel} />
        </div>
        <div className="w-32">
          <SubmitButton loading={isPending || isRejectPending} type="button" label={label} onClick={handleConfirm} />
        </div>
      </div>
    </ModalLayout>
  );
};

export default ApproveReject;
