'use client'

import Image from "next/image"
import banner_arrow from "@public/icons/banner-arrow.svg"
import { useEffect } from "react";

export default function BannerEditCard({ data }: any) {
    
    useEffect(() => {
    }, [data]);

    return (
        <>
            <div style={{ background: data?.background_color }} className='w-auto h-60 rounded-xl py-6 pl-6 pr-4'>
                <div className="flex justify-between">
                    <div className="flex flex-col w-[232px]">
                        <div style={{
                            fontWeight: data?.content1_bold ? 300 : 100,
                            fontStyle: data?.content1_italic ? 'italic' : "",
                            textDecoration: data?.content1_underline ? 'underline' : "no-underline",
                            color: data?.content1_color ? data?.content1_color : "",
                            fontFamily: data?.content1_fontstyle ? data?.content1_fontstyle : ""

                        }} className={`text-lg`}>
                            {data?.content1_title}</div>

                        <div
                            style={{
                                fontWeight: data?.content2_bold ? 900 : "",
                                fontStyle: data?.content2_italic ? 'italic' : "",
                                textDecoration: data?.content2_underline ? 'underline' : "",
                                color: data?.content2_color ? data?.content2_color : "",
                                fontFamily: data?.content2_fontstyle ? data?.content2_fontstyle : ""

                            }}
                            className='text-2xl'>{data?.content2_title}</div>

                        <div className="flex gap-4 items-end">
                            <div>
                                <div
                                    style={{
                                        fontWeight: data?.content3_bold ? 600 : "",
                                        fontStyle: data?.content3_italic ? 'italic' : "",
                                        textDecoration: data?.content3_underline ? 'underline' : "",
                                        color: data?.content3_color ? data?.content3_color : "",
                                        fontFamily: data?.content3_fontstyle ? data?.content3_fontstyle : ""
                                    }}
                                    className='text-base pt-2'>{data?.content3_title}</div>
                                <div
                                    style={{
                                        fontWeight: data?.content4_bold ? 400 : "",
                                        fontStyle: data?.content4_italic ? 'italic' : "",
                                        textDecoration: data?.content4_underline ? 'underline' : "",
                                        color: data?.content4_color ? data?.content4_color : "",
                                        fontFamily: data?.content4_fontstyle ? data?.content4_fontstyle : ""

                                    }}
                                    className='text-base'>{data?.content4_title}</div>
                            </div>
                            <div style={{ background: data?.button_color }} className="flex w-6 h-6 justify-center rounded-xxl">
                                <Image src={banner_arrow} alt="" />
                            </div>
                        </div>
                        <div className="py-3 flex gap-1 mt-4">
                            <div
                                style={{ background: data?.slider_color }}
                                className=" h-1.5 w-10 rounded-xl"></div>
                            <div style={{ background: data?.slider_color }} className=" h-1.5 w-1.5 rounded-xl opacity-20"></div>
                            <div style={{ background: data?.slider_color }} className=" h-1.5 w-1.5 rounded-xl opacity-20"></div>
                        </div>
                    </div>
                    <div className="w-[137px] flex items-center">
                        <Image src={data?.primaryImg} width={130} height={100} alt="" className="h-32" />
                    </div>
                </div>
            </div>
        </>

    )
}
