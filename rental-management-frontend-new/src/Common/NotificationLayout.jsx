import { Modal } from 'antd'
import { useNotificationListQuery } from '../ApiQuery/Notification/NotificationQuery'
import { useNavigate } from 'react-router-dom'
import success from '../Static/Images/Success.svg'
import error from '../Static/Images/Error.svg'
import due from '../Static/Images/Due.svg'
import warning from '../Static/Images/Warning.svg'

const NotificationLayout = ({ notification, setNotification, data }) => {

    const navigate = useNavigate()

    const handleCancel = () => {
        setNotification(false)
    }

    const handleViewAll = () => {
        navigate('/notification')
        setNotification(false)
    }

    return (
        <Modal
            title='Notifications'
            open={notification}
            onCancel={handleCancel}
            footer={null}
            className='mobile:left-1/3'
        >
            {data?.results?.map((i,index) => <div key={index} className='outline outline-1 rounded-lg outline-color-gray p-3 mb-4'>
                {i?.notification_type == 'success' && <div className='flex gap-2'> <img src={success} alt=''/> {i?.message}</div>}
                {i?.notification_type == 'due' && <div className='flex gap-2'> <img src={warning} alt='' /> {i?.message}</div>}
                {i?.notification_type == 'alert' && <div className='flex gap-2'> <img src={error} alt=''/> {i?.message}</div>}
                {i?.notification_type == 'settlement' && <div className='flex gap-2'> <img src={due} alt=''/> {i?.message}</div>}
            </div>)}
            <div className='flex justify-center items-center'>
                {data?.results?.length == 0 ?
                    <p className='font-medium text-lg'>No notifications found</p>
                    : <button onClick={handleViewAll} className=' text-primary'>View more details</button>}
            </div>
        </Modal>

    )
}

export default NotificationLayout