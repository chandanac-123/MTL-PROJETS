import React, { useState } from 'react'
import ModalLayout from '../../../Common/ModalLayout'
import SearchInput from '../../../Components/CustomSearch/SearchInput'
import { Divider } from 'antd'
import location_icon from '../../../Static/Images/geolocation.svg'
import finance_icon from '../../../Static/Images/finance.svg'
import general_icon from '../../../Static/Images/general.svg'
import { usePropertyDropdown } from '../../../ApiQuery/Dropdown/ListQuery'
import AddEdit from './AddEdit'
import prop_icon from '../../../Static/Images/property.jpg'

const AddProperty = ({ isPropertyOpen, setIsPropertyOpen }) => {
    const [isLocalState, setsLocalState] = useState(false);
    const [searchParams, setSearchParams] = useState('');
    const { data: propList, isFetching } = usePropertyDropdown({ searchParams })

    const handleSearch = (e) => {
        setSearchParams(e.target.value);
    }

    return (
        <ModalLayout isModalOpen={isPropertyOpen} setIsModalOpen={setIsPropertyOpen} title='Add Investment Income'>
            <div className='px-8 py-8 mt-2'>
                <div className='w-full sm:w-auto'>
                    <SearchInput
                        placeholder="Search"
                        onChange={(e) => handleSearch(e)}
                    />
                </div>
                <Divider plain>OR</Divider>
                <div class="overflow-y-auto scrollbar w-full max-h-80">
                    {propList?.results?.map((i) =>
                        <button className='flex w-full cursor-default' onClick={() => {
                            setsLocalState(i)
                        }}>
                            <div className='flex gap-4 flex-col sm:flex-row mobile:w-full h-auto rounded-lg mb-8 scroll-container cursor-pointer'>
                                <img src={i?.property_image ? i?.property_image + "?" + new Date() : prop_icon} alt='' className='flex w-20 h-20' />
                                <div className='flex  flex-col w-full'>
                                    <div className='flex gap-4 items-center'>
                                        <label className='font-medium text-xs cursor-pointer'>{i?.property_name || i?.parent_id?.property_name}</label>
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <div className='mt-2 flex flex-wrap gap-4'>
                                            <div className='flex items-start gap-1 mobile:items-center '>
                                                <img src={general_icon} alt='' /><label className='text-text-color-secondary cursor-pointer'>{i?.flat_number || i?.house_number}</label>
                                            </div>
                                            <div className='flex items-start gap-1 mobile:items-center'>
                                                <img src={finance_icon} alt='' /><label className='text-text-color-secondary whitespace-nowrap cursor-pointer'>{i?.property_type_id?.name}</label>
                                            </div>

                                        </div>
                                        <div className='flex items-start gap-1 mobile:items-center mt-2 '>
                                            <img src={location_icon} alt='' /><label className='text-text-color-secondary whitespace-nowrap cursor-pointer'>{i?.address || i?.parent_id?.address},{i?.town || i?.parent_id?.town},{i?.state_id?.state_name || i?.parent_id?.state_id?.state_name},{i?.pincode || i?.parent_id?.pincode}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </button>
                    )}
                </div>
            </div>
            <AddEdit isLocalState={isLocalState} setsLocalState={setsLocalState} setIsPropertyOpen={setIsPropertyOpen} />
        </ModalLayout>
    )
}

export default AddProperty