'use client'

import Image from "next/image"
import banner_arrow from "@public/icons/banner-arrow.svg"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

export default function BannerCard({ data }: any) {
    const router = useRouter()

    const handleUpdate = (id: string) => {
        router.push(`/banners/edit/${id}`)
    }

    return (
        <>
            <div style={{ background: data?.backgroundColor }} className='w-[415px] h-[200px] rounded-xl py-6 pl-6 pr-4'>
                <div className="flex justify-between">
                    <div className="flex flex-col w-[232px]">
                        <div style={{
                            fontWeight: data?.contents?.content1?.isBold ? 300 : "",
                            fontStyle: data?.contents?.content1?.isItalisized ? 'italic' : "",
                            textDecoration: data?.contents?.content1?.isUnderlined ? 'underline' : "",
                            color: data?.contents?.content1?.color ? data?.contents?.content1?.color : "",
                            fontFamily: data?.contents?.content1?.fontfamily ? data?.contents?.content1?.fontfamily : "",

                        }} className={`text-lg`}>
                            {data?.contents?.content1?.title}</div>

                        <div
                            style={{
                                fontWeight: data?.contents?.content2?.isBold ? 900 : "",
                                fontStyle: data?.contents?.content2?.isItalisized ? 'italic' : "",
                                textDecoration: data?.contents?.content2?.isUnderlined ? 'underline' : "",
                                color: data?.contents?.content2?.color ? data?.contents?.content2?.color : "",
                                fontFamily: data?.contents?.content2?.fontfamily ? data?.contents?.content2?.fontfamily : "",

                            }}
                            className='text-2xl'>{data?.contents?.content2?.title}</div>

                        <div className="flex gap-4 items-end">
                            <div>
                                <div
                                    style={{
                                        fontWeight: data?.contents?.content3?.isBold ? 600 : "",
                                        fontStyle: data?.contents?.content3?.isItalisized ? 'italic' : "",
                                        textDecoration: data?.contents?.content3?.isUnderlined ? 'underline' : "",
                                        color: data?.contents?.content3?.color ? data?.contents?.content3?.color : "",
                                        fontFamily: data?.contents?.content3?.fontfamily ? data?.contents?.content3?.fontfamily : "",
                                    }}
                                    className='text-base pt-2'>{data?.contents?.content3?.title}</div>
                                <div
                                    style={{
                                        fontWeight: data?.contents?.content4?.isBold ? 400 : "",
                                        fontStyle: data?.contents?.content4?.isItalisized ? 'italic' : "",
                                        textDecoration: data?.contents?.content4?.isUnderlined ? 'underline' : "",
                                        color: data?.contents?.content4?.color ? data?.contents?.content4?.color : "",
                                        fontFamily: data?.contents?.content4?.fontfamily ? data?.contents?.content4?.fontfamily : "",

                                    }}
                                    className='text-base'>{data?.contents?.content4?.title}</div>
                            </div>
                            <div style={{ background: data?.buttonColor }} className="flex w-6 h-6 justify-center rounded-xxl">
                                <Image src={banner_arrow} alt="" />
                            </div>
                        </div>
                        <div className="py-3 flex gap-1 mt-4">
                            <div
                                style={{ background: data?.sliderColor }}
                                className=" h-1.5 w-10 rounded-xl"></div>
                            <div style={{ background: data?.sliderColor }} className=" h-1.5 w-1.5 rounded-xl opacity-20"></div>
                            <div style={{ background: data?.sliderColor }} className=" h-1.5 w-1.5 rounded-xl opacity-20"></div>
                        </div>
                    </div>
                    <div className="w-[137px] flex items-center">
                        <Image src={data?.imageUrl} width={130} height={100} alt="" className="h-32" />
                    </div>
                </div>
            </div>
            <div className="flex justify-end py-4 w-full">
                <div className="flex w-40">
                    <Button variant="add_button" label="Edit" size='add' onClick={() => handleUpdate(data?.id)} />
                </div>
            </div>
        </>

    )
}
