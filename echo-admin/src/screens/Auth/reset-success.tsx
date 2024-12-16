'use client'
import Image from 'next/image'
import success_icon from '@public/icons/reset_success.svg'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function ResetSuccessForm() {
    const router = useRouter()

    return (
        <div className='bg-bg_secondary w-auto mobile:w-2/5 gap-5 rounded-xl p-6 flex flex-col items-center'>
            <span className='text-4xl'>Success</span>
            <Image src={success_icon} alt='' />
            <div className='flex flex-col px-4 mobile:px-16 py-3 gap-8'>
                <p className='text-text_label text-center whitespace-pre-line'>{`Your password has been successfully changed\nYou can now login with your credentials`}</p>
                <div className='flex justify-center'>
                    <Button variant="default" label='Login Now' type='button' onClick={() => router.push('/')} loader={true} />
                </div>
            </div>
        </div>
    )
}
