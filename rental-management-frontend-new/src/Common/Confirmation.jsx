import React from 'react'
import SubmitButton from '../Components/CustomButtons/SubmitButton'
import ModalLayout from './ModalLayout'

const Confirmation = ({ isModalOpen, setIsModalOpen, onClick, titleHead, buttonText, message, icons, loading = false, width = width }) => {

  return (
    <ModalLayout isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title={titleHead} width={width ?? false}>
      <div className='flex justify-center flex-col items-center gap-4 outline-dashed outline-1 outline-slate-200 rounded-lg' >
        <img src={icons} alt='' className='w-20 mt-8' />
        <p className='text-center flex'>{message}</p>
        <div className='flex items-center gap-4'>
          <SubmitButton label="Cancel" className="bg-search-bg-color w-full mb-8 rounded-md h-10 px-6 py-2" onClick={() => setIsModalOpen(false)} />
          <SubmitButton label={buttonText} onClick={onClick} loading={loading} />
        </div>
      </div>
    </ModalLayout>
  )
}


export default Confirmation