import React from 'react'
import { useNotificationListQuery } from '../../ApiQuery/Notification/NotificationQuery'
import { Divider } from 'antd';
import success from '../../Static/Images/Success.svg'
import error from '../../Static/Images/Error.svg'
import due from '../../Static/Images/Due.svg'
import warning from '../../Static/Images/Warning.svg'
import { useNavigate } from 'react-router-dom';
import BackButton from '../../Components/CustomButtons/BackButton';
import left_arrow from '../../Static/Images/arrow-left.svg'

const Notification = () => {
  const navigate=useNavigate()
  const { data, isFetching } = useNotificationListQuery({ type: 'all' })

  return (
    <div className='mt-6'>
      <BackButton img={left_arrow} onClick={() => navigate(-1)}/>
      {data?.results?.map((result, index) => (

        <div key={index} className='outline outline-1 rounded-lg outline-color-gray mb-4 p-4 bg-color-white mt-4'>
          <p className='font-semibold'>{result?.date}</p>

          <div className='border-b mt-4 mb-4' />
          <ul className='text-text-dark-secondary'>
            {result?.notifications?.map((notification, i) => {

              return (
                <li key={i}>
                  <div className='flex gap-3'>
                    {notification?.notification_type == "income" ? <img src={success} /> : notification?.notification_type == "due" ? <img src={warning} /> : notification?.notification_type == "alert" ? <img src={error} /> : <img src={due} />}
                    <div className='flex flex-col'>
                      <p className='font-semibold'>{notification?.title}</p>

                      {notification?.message}
                    </div>
                  </div>

                  <Divider />
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Notification