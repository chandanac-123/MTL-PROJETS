import React from 'react'
import ModalLayout from './ModalLayout'
import delete_icon from '../Static/Images/delete.svg'
import SubmitButton from '../Components/CustomButtons/SubmitButton'

const Delete = ({ isModalOpen, setIsModalOpen ,onClick}) => {

    return (

        <ModalLayout isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title="Confirm Deletion">
            <div className='flex justify-center flex-col items-center gap-4' >
                <img src={delete_icon} alt='' className='w-20' />
                <p>Are you sure you want to delete this item?</p>
                <div className='flex items-center gap-4'>
                    <SubmitButton label="Cancel" className="bg-search-bg-color w-full mb-8 rounded-md h-10 px-6 py-2" onClick={()=>setIsModalOpen(false)} />
                    <SubmitButton label="Delete" onClick={onClick} />
                </div>
            </div>
        </ModalLayout>

    )
}

export default Delete