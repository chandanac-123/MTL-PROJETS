import { Modal } from 'antd';

const ModalLayout = ({ isOpen, children, setIsOpen, title, closeFun, width = 500, closeIcon = true, titleColor = 'red' }) => {
  const handleClose = () => {
    setIsOpen(false);
    if (closeFun) {
      closeFun();
    }
  };

  return (
    <Modal title={title} open={isOpen} footer={false} onCancel={handleClose} maskClosable={false} closeIcon={closeIcon} centered width={width}>
      {children}
    </Modal>
  );
};
export default ModalLayout;
