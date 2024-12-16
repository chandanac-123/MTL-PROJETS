import { Modal } from 'antd';

const ModalLayout = ({isModalOpen,children,setIsModalOpen,title,closeFun,width=700,closeIcon=true}) => {

  const handleClose=()=>{
    setIsModalOpen(false)
    if(closeFun){
      closeFun()
    }
  }
  return (
      <Modal title={title} open={isModalOpen} zIndex={1999999} footer={false} onCancel={handleClose} maskClosable={false} closeIcon={closeIcon} centered width={width}>
        {children}
      </Modal>
  );
};
export default ModalLayout;