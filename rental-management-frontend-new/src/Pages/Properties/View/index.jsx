import React, { useEffect, useState } from 'react'
import location_icon from '../../../Static/Images/geolocation.svg'
import finance_icon from '../../../Static/Images/finance.svg'
import general_icon from '../../../Static/Images/general.svg'
import category_icon from '../../../Static/Images/category.svg'
import edit_icon from '../../../Static/Images/arrows.svg'
import bank_icon from '../../../Static/Images/bank.svg'
import calender_icon from '../../../Static/Images/calendar.svg'
import { Popover, Space, Tabs, Tag } from 'antd'
import Delete from '../../../Common/Delete'
import { usePropertyDeleteQuery, usePropertyIdQuery } from '../../../ApiQuery/Property/PropertyQuery'
import { useParams } from 'react-router-dom'
import EditBasicDetails from '../Edit/BasicDetails'
import EditLoctaionDetails from '../Edit/LoctaionDetails'
import PropertyOverview from './PropertyOverview'
import TenantDetailView from './TenantDetailView'
import TenantTransHistory from './TenantTransHistory'
import { getFormattedDate } from '../../../Utils/Helper'
import prop_icon from '../../../Static/Images/property.jpg'
import { getUserType } from '../../../Utils/utils'

const PropertyView = () => {
    const params = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);
    const [isLoctaionModalOpen, setIsLocationModalOpen] = useState(false);
    const [open, setOpen] = useState(false)
    const { data, isPending, refetch } = usePropertyIdQuery(params?.id)
    const [active, setActive] = useState('1')
    const { mutateAsync: deleteProperty, isPending: isDeletePending } = usePropertyDeleteQuery()
    let color = data?.is_occupied ? 'green' : 'red'
    const [popoverOpen, setPopoverOpen] = useState(false);

    const content = (
        <div className='flex-col flex justify-start items-start gap-2 font-medium text-sm text-secondary'>
            <button onClick={() => {
                setPopoverOpen(false)
                setIsBasicModalOpen(!isModalOpen)
            }}>Edit Basic Details</button>
            {data?.parent_id?.id == null && <button onClick={() => {
                setPopoverOpen(false)
                setIsLocationModalOpen(!isModalOpen)
            }}>Edit Location Details</button>}
            <button onClick={() => {
                setPopoverOpen(false)
                setOpen(true)
            }} >Delete</button>
        </div>
    );


    const state = [<PropertyOverview label="Overview" id={params?.id} data={data} setActive={setActive} />, <TenantDetailView setActive={setActive} label={data?.property_history.length > 0 ? "Tenant Details" : ""} data={data} refetch={refetch} />, <TenantTransHistory data={data} label={data?.property_history.length > 0 ? "Transaction History" : ""} />]

    return (
        <>
            <div className='border-l border-r border-t rounded-lg border-slate-200 px-8 py-4 mt-11 bg-color-white'>
                <div className='flex justify-end'>
                    {getUserType() === 'admin' &&
                        <Space wrap>
                            <Popover onOpenChange={() => setPopoverOpen(!popoverOpen)} open={popoverOpen} trigger="click" placement="bottomRight" arrow={false} content={content}>
                                <button><img src={edit_icon} alt='' /></button>
                            </Popover>
                        </Space>}
                </div>

                <div className='flex gap-4 flex-col sm:flex-row mobile:w-full h-auto rounded-lg mb-8'>
                    <img src={data?.property_image ? data?.property_image + "?" + new Date() : prop_icon} alt='' className='flex w-48 h-48' />
                    <div className='flex  flex-col w-full'>
                        <div className='flex gap-4 items-center'>
                            <label className='font-medium text-lg'>{data?.property_name || data?.parent_id?.property_name}</label>
                            <Tag color={color}>{data?.is_occupied ? "Occupied" : "Vacant"}</Tag>
                        </div>
                        <div className='mt-4 flex flex-wrap gap-4'>
                            <div className='flex items-start gap-2 mobile:items-center'>
                                <img src={general_icon} alt='' /><label className='text-text-color-secondary'>{data?.flat_number || data?.house_number}</label>
                            </div>
                            <div className='flex items-start gap-2 mobile:items-center'>
                                <img src={finance_icon} alt='' /><label className='text-text-color-secondary'>{data?.property_type_id?.name}</label>
                            </div>
                            <div className='flex items-start gap-2 mobile:items-center'>
                                <img src={location_icon} alt='' /><label className='text-text-color-secondary break-all whitespace-normal'>{data?.address || data?.parent_id?.address}, {data?.town || data?.parent_id?.town}, {data?.state_id?.state_name || data?.parent_id?.state_id?.state_name}, {data?.pincode || data?.parent_id?.pincode}</label>
                            </div>
                        </div>
                        <div className='flex items-start gap-2 mobile:items-center mt-4'>
                            <img src={category_icon} alt='' /><label className='text-text-color-secondary break-all whitespace-normal'>{data?.description}</label>
                        </div>
                        <div className='flex gap-4 mt-8'>
                            <div className='outline-dotted rounded-lg outline-slate-200 w-36  h-14 p-2'>
                                <div className='flex gap-1 whitespace-nowrap'>
                                    <img src={bank_icon} />
                                    <labe>{data?.property_history?.[0]?.tenant_id?.tenant_rent?.[0]?.rent_amount ? <>₹ {data?.property_history?.[0]?.tenant_id?.tenant_rent?.[0]?.rent_amount}</> : "--"}</labe>
                                </div>
                                <labe className='text-text-extra-light font-medium'>Rent</labe>
                            </div>
                            <div className='outline-dotted rounded-lg outline-slate-200 w-36 h-14 p-2'>
                                <div className='flex gap-2'>
                                    <img src={calender_icon} />
                                    <labe>{data?.property_history?.[0]?.tenant_id?.rent_due_day ? getFormattedDate(data?.property_history?.[0]?.tenant_id?.rent_due_day) : "--"}</labe>
                                </div>
                                <labe className='text-text-extra-light font-medium'>Rent Date</labe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-2">
                <Tabs
                    tabBarStyle={{
                        borderBottomWidth: 0.8,
                        borderLeftWidth: 1,
                        borderRightWidth: 1,
                        borderBottomLeftRadius: 12,
                        borderBottomRightRadius: 10,
                        marginTop: -8,
                        paddingLeft: 10,
                        backgroundColor:'#ffffff'
                    }}
                    size='large'
                    defaultActiveKey="1"
                    activeKey={active}
                    onChange={(e) => setActive(`${e}`)}
                    left
                    items={state?.map((_, i) => {
                        const id = String(i + 1);
                        return {
                            label: _?.props?.label,
                            key: id,
                            children: _,
                        };
                    })}
                />
            </div>
            <EditBasicDetails data={data} id={params?.id} isBasicModalOpen={isBasicModalOpen} setIsBasicModalOpen={setIsBasicModalOpen} />
            <EditLoctaionDetails data={data} id={params?.id} isLoctaionModalOpen={isLoctaionModalOpen} setIsLocationModalOpen={setIsLocationModalOpen} />
            <Delete isModalOpen={open} setIsModalOpen={setOpen} onClick={() => deleteProperty(params?.id).then(res => { setOpen(false) }).catch(err => { })} />
        </>
    )
}

export default PropertyView