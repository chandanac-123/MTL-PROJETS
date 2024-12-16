"use client"

import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SelectSeparator } from '@/components/ui/select/select'
import Image from 'next/image'
import AddEditHeader from '@/common/add-edit-header'
import profile from '@public/icons/default_profile.svg'
import { useParams, useRouter } from 'next/navigation'
import customerprofile from '@public/icons/customerprofile.svg'
import contactno from '@public/icons/contactno.svg'
import mail from '@public/icons/mail.svg'
import view from '@public/icons/view-icon.svg'
import ConfirmationModal from '@/components/modals/confirmation-modal'
import { AddCreditsModal } from './add-credits-modal'
import Chatbox from './chatbox'
// import { setupSocketInterceptors } from '@/utils/socketInterceptor'
// import { useSocket } from '@/components/context/SocketContext'
import { useAddcreditQuery, useChatByConversationIdQuery, useCloseticketQuery, useTickeByIdQuery } from '@/api-queries/customer-support/queries'
import { useListIssueTypeQuery } from '@/api-queries/dropdown/queries'
import { useFormik } from 'formik'
import { addcreditSchema } from '@/utils/validations'
import { dateConversion } from '@/utils/helper'
import { useGetProfiledetailsQuery } from '@/api-queries/settings/queries'

export interface ChatcontainerProps {
    messages: string[];
    Ticketdetails?: any
}

export interface TicketByAPI {
    id: string | null | string[];
    enable: boolean;
}

export interface closeTicketAPI {
    orderId: string | null | string[];
}

export interface addcreditsForm {
    amount: number | null;
    type: string;
    remarks:string;
}

export interface ChatByConversationAPI {
    id: string | null | string[];
    enable: boolean;
}

export interface SendMsgAPI {
    content: string,
    conversationId: string,
    message_type: string,
    orderId: string
}

const Ticket = () => {
    const router = useRouter();

    function handleOnClick(e: any) {
        e.preventDefault();
        router.push("/customer-support");
    }

    //Get ticket details 
    const params = useParams();
    const { id } = params;
    const { data: Ticketdetails } = useTickeByIdQuery({ id: id, enable: true })

    //Customer details route function
    const handlePush = () => {
        const userId = Ticketdetails?.data?.ticket?.userId;
        if (userId) {
            router.replace(`/customer-management/customer-details/${userId}`);
        }
    };

    //Close ticket
    const [closeticketModal, setCloseticketModal] = useState<boolean>(false);
    const { mutate: closeticket } = useCloseticketQuery();
    const { refetch } = useGetProfiledetailsQuery()

    const handleCloseticket = () => {
        if (Ticketdetails?.data?.ticket?.orderId && id) {
            closeticket({
                data: {
                    orderId: Ticketdetails?.data?.ticket?.orderId
                }, id: id as string
            });
            setCloseticketModal(false)
        }
        refetch()
    }

    //Issue type
    const { data: Tickeissuetype } = useListIssueTypeQuery()
    console.log('Tickeissuetype: ', Tickeissuetype);

    const IssueTypes = Tickeissuetype?.data?.length != 0 && Tickeissuetype?.data?.map((type: Record<string, any>, i: number) => ({
        id: type?.id,
        label: `${type?.name?.replace(/ /g, '\u00A0')}`
    }))


    //Add credit
    const [addcreditsModal, setAddcreditsModal] = useState<boolean>(false);

    const handleclosecredit = () => {
        setAddcreditsModal(false)
    }

    const { mutateAsync: Addcredit } = useAddcreditQuery()

    const initialValue: addcreditsForm = {
        amount: null,
        type: Ticketdetails?.data?.ticket?.issueType?.id || '',
        remarks:''
    };

    const AddcreditFormik = useFormik<addcreditsForm>({
        initialValues: initialValue,
        enableReinitialize: true,
        validationSchema: addcreditSchema,
        onSubmit: async (values: any) => {
            const selectedIssueType = IssueTypes?.find(
                (type: { id: string; label: string }) => type.id === values.type
            );
            const details = {
                amount: values?.amount,
                type: selectedIssueType?.label ?? '',
                ticketId: Ticketdetails?.data?.ticket?.id,
                remarks:values?.remarks
            }
            Addcredit({ details, id: Ticketdetails?.data?.ticket?.userId })
            AddcreditFormik.resetForm()
            setAddcreditsModal(false)
        }
    });

    //Chat section
    const { data: chat_conversion } = useChatByConversationIdQuery({ id: Ticketdetails?.data?.ticket?.conversationId, enable: true })

    // const { socket } = useSocket();

    const [messages, setMessages] = useState<string[]>([]);

    // useEffect(() => {
    //     const cleanupInterceptors = setupSocketInterceptors(setMessages, "messages");
    //     return () => {
    //         cleanupInterceptors();
    //     };
    // }, [socket]);

    // console.log("ksldfsdlf", Ticketdetails)

    return (
        <div className='flex flex-col lg:flex-row gap-5'>
            <div className='basis-full lg:basis-8/12 md:basis-full'>
                <AddEditHeader
                    head="Ticket"
                    subhead=""
                    onClick={handleOnClick}
                    backwardIcon={true}
                />
                <div className='flex-col w-full gap-4 p-6 bg-bg_secondary rounded-md'>
                    <div className='flex justify-between lg:flex-row md:flex-col'>
                        <div className='flex items-center gap-2'>
                            <label className='text-md font-medium'>#{Ticketdetails?.data?.ticket?.ticketId ?? "--"}</label>
                            <Badge variant={Ticketdetails?.data?.ticket?.status == "OPEN" ? "confirmed" : "active"}>{Ticketdetails?.data?.ticket?.status == "OPEN" ? "Open" : "Closed"}</Badge>
                        </div>
                        {Ticketdetails?.data?.ticket?.status == "OPEN" && <div className='flex lg:flex-row md:flex-row md:mt-2 gap-2'>
                            <Button
                                key="add_button_1"
                                variant="view_invoice"
                                size="add"
                                label="Add Credits"
                                onClick={() => setAddcreditsModal(true)}
                            />
                            <Button
                                key="add_button_2"
                                variant="confirm_order"
                                size="add"
                                label="Close Ticket"
                                onClick={() => setCloseticketModal(true)}
                            />
                        </div>}
                    </div>
                    <SelectSeparator className="my-4 bg-light_pink" />
                    <Chatbox messages={chat_conversion?.data} Ticketdetails={Ticketdetails} />
                </div>
            </div>
            <div className='basis-full lg:basis-4/12 md:basis-full'>
                <div className="w-full p-4 lg:p-6 bg-bg_secondary rounded-md mb-3.5">
                    <label className='text-sm font-medium'>Ticket Details</label>
                    <div className='flex flex-col mt-3'>
                        <p className='text-xs text-badge_grey font-normal'>Issue Category</p>
                        <p className='text-[13.5px] font-medium'>{Ticketdetails?.data?.ticket?.issueType?.name ?? "--"}</p>
                    </div>
                    <div className='flex flex-col mt-3'>
                        <p className='text-xs text-badge_grey font-normal'>Created On</p>
                        <p className='text-[13.5px] font-medium'>{Ticketdetails?.data?.ticket?.createdAt ? dateConversion(Ticketdetails?.data?.ticket?.createdAt, "DD MMM YYYY, HH:mm A") : '--'}</p>
                    </div>
                    <div className='flex flex-col items-start mt-3'>
                        <p className='text-xs text-badge_grey font-normal mb-1'>Status</p>
                        <Badge variant={Ticketdetails?.data?.ticket?.status == "OPEN" ? "confirmed" : "active"}>{Ticketdetails?.data?.ticket?.status == "OPEN" ? "Open" : "Closed"}</Badge>
                    </div>
                    <div className='flex flex-col mt-3'>
                        <p className='text-xs text-badge_grey font-normal'>Order ID</p>
                        <p className='text-[13.5px] text-primary font-medium'>{Ticketdetails?.data?.ticket?.orderId}</p>
                    </div>
                </div>
                <div className="w-full p-4 lg:p-6 bg-bg_secondary rounded-md">
                    <div className='flex justify-items-start gap-4'>
                        <Image src={customerprofile} alt="" />
                        <label className='text-sm font-medium'>Customer Details</label>
                    </div>
                    <div className='flex justify-between mt-4'>
                        <div className='flex items-center justify-items-start gap-4'>
                            <Image src={profile} alt="" width={50} height={50} className="rounded-xxxl" />
                            <label className='text-sm font-medium break-all whitespace-wrap'>{`${Ticketdetails?.data?.ticket?.user?.firstName ?? ""}${Ticketdetails?.data?.ticket?.user?.surname ?? ""}`}</label>
                        </div>
                        <button className='pointer-cursor' onClick={handlePush}>
                            <Image src={view} alt="" />
                        </button>
                    </div>
                    <SelectSeparator className="my-4 bg-light_pink" />
                    <div className='flex flex-col'>
                        <label className='text-[13.5px] text-badge_grey font-semibold'>Contact Info</label>
                        <div className='flex justify-items-start gap-2 mt-4'>
                            <Image src={contactno} width={26} height={26} alt="" />
                            <label className='text-sm font-medium'>{Ticketdetails?.data?.ticket?.user?.mobile ?? "--"}</label>
                        </div>
                        <div className='flex justify-items-start gap-2 mt-4'>
                            <Image src={mail} width={26} height={26} alt="" />
                            <label className='text-sm font-medium'>{Ticketdetails?.data?.ticket?.user?.email ?? "--"}</label>
                        </div>
                    </div>
                </div>
            </div>
            <AddCreditsModal
                addcreditsModal={addcreditsModal}
                handleclosecredit={handleclosecredit}
                IssueTypes={IssueTypes}
                formik={AddcreditFormik}
                ticketId={Ticketdetails?.data?.ticket?.orderId}
            />
            <ConfirmationModal
                onClick={() => handleCloseticket()}
                isModalOpen={closeticketModal}
                handleCloseModal={() => setCloseticketModal(!closeticketModal)}
                title="Close Ticket"
                buttonText="Close Ticket"
                message="Are you sure you want to close/resolve this ticket"
            />
        </div>
    )
}

export default Ticket;