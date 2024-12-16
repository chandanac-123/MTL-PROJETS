'use client'
import React, { useEffect, useState } from 'react';
import SidebarSubMenu from "./sub-menu";
import SidebarMenu from "./menu";
import { usePathname } from 'next/navigation'
import Image from "next/image";
import logout_active from "@public/menu-active-icons/active_logout.svg";
import { routes } from '@/constants/routes';
import { showToast } from '@/components/custome-toast';
import { ToastMessages } from '@/constants/toast-messages';
import ConfirmationModal from '@/components/modals/confirmation-modal';
import { useFirebaseUpdateQuery } from '@/api-queries/auth/auth-queries';

export default function Sidebar() {
    const pathname = usePathname()
    const [open, setOpen] = useState(false);
    const [isLogout, setIsLogout] = useState(false);
    const [userRole, setUserRole] = useState('');
    const { mutateAsync: firebaseUpdate } = useFirebaseUpdateQuery()

    useEffect(() => {
        const localData = localStorage.getItem('token');
        if (localData) {
            const tokenObject = JSON.parse(localData);
            const userRole = tokenObject?.role;
            setUserRole(userRole);
        }
    }, []);

    const filteredRoutes = routes.filter(route => route.role.includes(userRole));

    const handleLogout = async () => {
        try {
            await firebaseUpdate({ fcmToken: '' });
            localStorage.clear();
            document.cookie = 'access_token=; Max-Age=0; path=/;';
            showToast("success", ToastMessages.SUCCESS_LOGOUT);
            window.location.reload();
        } catch (error) {
            console.error("Error during logout:", error);
            showToast("error", "An error occurred while logging out. Please try again.");
        }
    };


    return (
        <div className={`flex flex-col custom-scroll bg-secondary min-w-[320px] h-[calc(100%-160px)] fixed overflow-auto rounded-xl px-5 py-12 gap-4`}>
            {filteredRoutes?.map((item, index) => {
                if (item?.subRoute) {
                    return (
                        <SidebarSubMenu key={index} open={open} setOpen={setOpen} icon={pathname.startsWith(item?.path) ? item?.activeIcon : item?.inactiveIcon} label={item?.label} subItem={item?.subItem} pathName={pathname} />
                    )
                } else {
                    return (
                        <SidebarMenu key={item.path} setOpen={setOpen} icon={pathname.startsWith(item?.path) ? item?.activeIcon : item?.inactiveIcon} path={item.path} label={item?.label} pathName={pathname} />
                    )
                }

            })}
            <div className="flex gap-4 p-2 mb-4 pl-5">
                <Image src={logout_active} alt="" />
                <button className=" font-thin text-base text-light_pink" type='button' onClick={() => setIsLogout(true)}>
                    Logout
                </button>
            </div>
            <ConfirmationModal
                onClick={handleLogout}
                isModalOpen={isLogout}
                handleCloseModal={() => setIsLogout(false)}
                title="Logout"
                buttonText='Logout'
                message="Are you sure you want to log out?" />
        </div>
    )
}