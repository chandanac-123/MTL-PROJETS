import React from 'react';
import { notification } from 'antd';
import { useEffect } from 'react';
const Context = React.createContext({
  name: 'Default'
});

function Notification({data}) {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = () => {
        api.info({
        message: `${data?.title}`,
        description: <Context.Consumer>{() => `${data?.body}`}</Context.Consumer>,
        placement: "bottomRight",
        });
    };
    useEffect(()=> {
        if(data?.title && data?.body){
            openNotification()
        }
    },[data])
 
  return (
    <div>
       <Context.Provider value="">
        {contextHolder}
        </Context.Provider>
    </div>
  )
}

export default Notification
