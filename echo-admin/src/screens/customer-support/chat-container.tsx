'use client'
import React, { useEffect, useRef, useState } from 'react';
import echo_chat_icon from '@public/icons/echo_chat_icon.svg';
import profile from '@public/icons/profile_default.svg';
import Image from 'next/image';
import { ChatcontainerProps } from './ticket';
import { dateConversion, isValidURL } from '@/utils/helper';
import './style.css';

const Chatcontainer: React.FC<ChatcontainerProps> = ({ messages }) => {
    const chatEndRef = useRef<HTMLDivElement>(null);
    const [zoomedImage, setZoomedImage] = useState<string | null>(null);

    const openZoomedImage = (imageUrl: string) => {
        setZoomedImage(imageUrl);
    };

    const closeZoomedImage = () => {
        setZoomedImage(null);
    };

    // Scroll to the bottom whenever messages change
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return (
        <div>
            <div id="chat-container" className="flex-1 h-[420px] overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                {Array.isArray(messages) &&
                    messages.map((msg: any, index) => {
                        const isAdminOrSuperAdmin = msg?.senderType === 'super_admin' || msg?.senderType === 'admin';
                        return (
                            <div
                                key={index}
                                className={`flex flex-row items-start gap-4 mb-4 ${isAdminOrSuperAdmin ? 'justify-start' : 'justify-end'}`}
                            >
                                {isAdminOrSuperAdmin ? (
                                    <>
                                        {/* Message from super admin or admin, content on the left */}
                                        <Image src={echo_chat_icon} height={60} width={60} alt="Chat Icon" />
                                        <div className="flex flex-col">
                                            <div className="p-3 bg-light_grey rounded-tl-none rounded-tr-base rounded-br-base rounded-bl-base">
                                                <p className="text-[14.5px]">{msg?.content}</p>
                                            </div>
                                            <small className="text-xs text-badge_grey mt-2">
                                                {dateConversion(msg?.createdAt, 'DD MMM YYYY, HH:mm A')}
                                            </small>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {/* Message from other users, content on the right */}
                                        <div className="flex flex-col items-end">
                                            <div className="p-3 bg-dark_primary rounded-tl-base rounded-tr-none rounded-br-base rounded-bl-base">
                                                <p className="text-[14.5px] text-bg_primary font-extralight">
                                                    {isValidURL(msg?.content) ? (
                                                        <>
                                                            <Image
                                                                key={index}
                                                                src={msg?.content}
                                                                alt=''
                                                                width={200}
                                                                height={200}
                                                                objectFit='contain'
                                                                onClick={() => openZoomedImage(msg?.content)}
                                                                className='cursor-pointer'
                                                            />
                                                        </>
                                                    ) : msg?.content}
                                                </p>
                                            </div>
                                            <small className="text-xs text-badge_grey mt-2">
                                                {dateConversion(msg?.createdAt, 'DD MMM YYYY, HH:mm A')}
                                            </small>
                                        </div>
                                        <Image src={profile} height={60} width={60} alt="Profile" />
                                    </>
                                )}
                            </div>
                        );
                    })}
                {/* This div ensures that we always scroll to the bottom */}
                <div ref={chatEndRef} />
            </div>

            {/* Zoomed image modal */}
            {zoomedImage && (
                <div className="zoomed-image-container" onClick={closeZoomedImage}>
                    <Image src={zoomedImage} alt="Zoomed Image" layout="fill" objectFit="contain" />
                </div>
            )}
        </div>
    );
};

export default Chatcontainer;
