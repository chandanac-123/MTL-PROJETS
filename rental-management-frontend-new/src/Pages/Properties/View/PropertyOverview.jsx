import { Divider, Image } from 'antd'
import React, { useState } from 'react'
import AuthButton from '../../../Components/CustomButtons/AuthButton'
import tenent_icon from '../../../Static/Images/tenent_icon.svg'
import edit_pencil from '../../../Static/Images/edit_pencil.svg'
import EditUploadDoc from '../Edit/UploadDoc'
import pdf_icon from '../../../Static/Images/pdf.png'
import { Link, useNavigate } from 'react-router-dom'
import { getUserType } from '../../../Utils/utils'
import { capitalizeNames } from '../../../Utils/Helper'

const PropertyOverview = ({ id, data, setActive }) => {
    const [isDocModalOpen, setIsDocModalOpen] = useState(false);
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/properties/tenant/add', { state: data });
    };
    return (
        <>
            <div className='mobile:flex gap-4 w-full h-3/5'>
                {data?.property_history?.length == 0 ?
                    <div className='outline outline-1 rounded-lg outline-slate-200 mobile:w-4/12 w-full mt-11 bg-color-white p-4'>
                        <label className='font-medium'>Tenant Details</label>
                        <Divider />
                        <div className='flex flex-col justify-center items-center gap-2'>
                            <img src={tenent_icon} />
                            <label className='font-medium'>Add a tenant to your property!</label>
                            <p className='text-text-extra-light text-sm'>Currently, no tenant has been added to the property.</p>
                            <AuthButton
                                onClick={handleClick}
                                type='button'
                                label="Add Tenant Now "
                                className='w-1/2 bg-primary rounded-md h-10 flex items-center justify-center text-color-white' />
                        </div>
                    </div>
                    :
                    <div className='outline outline-1 rounded-lg outline-slate-200 mobile:w-4/12 w-full mt-11 bg-color-white p-4'>
                        <label className='font-medium'>Occupant Details</label>
                        <Divider />
                        <div className='flex flex-col justify-center items-center gap-2'>
                            <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
                                <label className='w-48 text-secondary'>Occupant Name</label>
                                <label className='w-48 text-text-color-secondary font-semibold'>{capitalizeNames(data?.property_history?.[0]?.tenant_id?.tenant_name)}</label>
                            </div>
                            <div className='flex gap-4 flex-col sm:flex-row mobile:w-full'>
                                <label className='w-48 text-secondary'>Phone Number</label>
                                <label className='w-48 text-text-color-secondary font-semibold'>{data?.property_history?.[0]?.tenant_id?.phone_number}</label>
                            </div>
                            <div className='flex gap-4 flex-col sm:flex-row mobile:w-full mb-4'>
                                <label className='w-48 text-secondary'>Email Address </label>
                                <label className='w-48 text-text-color-secondary font-semibold'>{data?.property_history?.[0]?.tenant_id?.tenant_email}</label>
                            </div>
                            <button
                                onClick={() => setActive('2')}
                                className='text-primary mt-4'>View more details</button>
                        </div>
                    </div>
                }
                <div className='outline outline-1 rounded-lg outline-slate-200 mobile:w-2/3 w-full mt-11 bg-color-white p-4'>
                    <div className='flex justify-between'>
                        <label className='font-medium'>Property Document Details</label>
                        {getUserType() === 'admin' &&
                            <button onClick={() => {
                                setIsDocModalOpen(!isDocModalOpen)
                            }}><img src={edit_pencil} /></button>
                        }
                    </div>

                    <Divider />

                    {data?.property_file?.length == 0 && <div className='flex justify-center items-center font-medium'>No data</div>}
                    <div className='grid grid-cols-2 md:grid-cols-5 sm:grid-cols-5 flex-wrap gap-2'>
                        {data?.property_file.map((i) =>
                            <div className='mobile:flex-col w-28 rounded-lg outline-dashed outline-1 outline-slate-200'>
                                {i?.file.endsWith('.pdf') ?
                                    <img onClick={() => window.open(i.file)} src={pdf_icon} alt='' className='flex w-28 h-28 p-2' /> :
                                    <Image src={i?.file + "?" + new Date()} alt='' className='flex w-28 h-28 p-2' />}
                                <p className='max-w-24  break-all whitespace-normal	text-center'>{i?.name}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <EditUploadDoc data={data} id={id} isDocModalOpen={isDocModalOpen} setIsDocModalOpen={setIsDocModalOpen} />
        </>

    )
}

export default PropertyOverview