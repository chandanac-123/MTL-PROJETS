import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import send_msg from '@public/icons/send_msg.svg';
import { Input } from '@/components/ui/input';
import { useFormik } from 'formik';
// import { useSocket } from '@/components/context/SocketContext';
import Chatcontainer from './chat-container'
import { ChatcontainerProps, SendMsgAPI } from './ticket';
import { useChatboxQuery } from '@/api-queries/customer-support/queries';

const Chatbox: React.FC<ChatcontainerProps> = ({ messages, Ticketdetails }) => {
    const { mutate: sendMSG } = useChatboxQuery()
    // const { socket } = useSocket();

    const initialValues: SendMsgAPI = {
        content: "",
        conversationId: "",
        orderId: "",
        message_type: ""
    };

    const Chatformik = useFormik<SendMsgAPI>({
        initialValues: initialValues,
        onSubmit: (values, { resetForm }) => {
            // if (socket) {
            //     socket.emit("send_message", values.message);
            //     resetForm();
            // }
            if (values?.content?.trim() === "") {
                return;
            }
            const details = {
                content: values?.content,
                conversationId: Ticketdetails?.data?.ticket?.conversationId,
                orderId: Ticketdetails?.data?.ticket?.orderId,
                message_type: ""
            }
            sendMSG({ details })
            resetForm();
        },
    });

    // useEffect(() => {
    //     const chatContainer = document.getElementById("chat-container");
    //     if (chatContainer) {
    //         chatContainer.scrollTop = chatContainer.scrollHeight;
    //     }
    // }, [messages, Chatformik?.values?.content]);

    return (
        <div className='flex flex-col h-full'>
            <Chatcontainer messages={messages} />
            {Ticketdetails?.data?.ticket?.status == 'OPEN' && <form onSubmit={Chatformik.handleSubmit} className='flex flex-row gap-3 px-4 py-auto bg-none'>
                <div className='flex-1'>
                    <Input
                        className='h-[56px]'
                        placeholder="Type..."
                        name="content"
                        // onChange={Chatformik.handleChange}
                        // value={Chatformik.values.content}
                        onChange={(e) => {
                            // Update Formik's value only if it's not blank
                            Chatformik.setFieldValue("content", e.target.value.trimStart());
                        }}
                        value={Chatformik.values.content}
                    />
                </div>
                <button type="submit">
                    <Image src={send_msg} className='w-[60px] h-[60px] cursor-pointer' alt="Send" />
                </button>
            </form>}
        </div>
    );
}

export default Chatbox;
