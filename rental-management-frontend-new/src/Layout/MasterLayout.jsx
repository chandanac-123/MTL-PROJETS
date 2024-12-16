import { useState } from 'react'
import Sidebar from './Components/Sidebar'
import { Outlet } from 'react-router-dom'
import MasterHeader from './Components/MasterHeader'
import MobileHeader from './Components/MobileHeader'

const MasterLayout = () => {
    const [open, setOpen] = useState(false);

    const handleSetOpen = (val) => {
        setOpen(val)
    }

    return (
        <div className=' p-2 md:p-6 bg-color-light-gray min-h-screen'>
            <div className='flex h-full' >
                <Sidebar open={open} handleSetOpen={handleSetOpen} />
                <div className={`p-4 ${open ? 'mobile:ml-[100px] w-[calc(100%-90px)] ' : ' w-full mobile:ml-[330px] mobile:w-[calc(100%-330px)] '}`}>
                    <MobileHeader />
                    <MasterHeader />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MasterLayout