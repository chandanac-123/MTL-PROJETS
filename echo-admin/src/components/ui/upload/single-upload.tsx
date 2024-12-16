'use client'
import React, { useEffect, useState } from 'react'
import upload_icon from '@public/icons/upload.svg'
import close_icon from '@public/icons/color-close.svg'
import Image from 'next/image';
import { useUploadImageQuery } from '@/api-queries/upload/queries';
import { Spinner } from '../spinner';

export default function SingleUpload({ image, disabled = false, fileChange, type, formik, errors, touched }: any) {
    const [imageUrl, setImageUrl] = useState<any>();
    const { mutateAsync: uploadImage, isPending } = useUploadImageQuery();
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        setImageUrl(image);
    }, [image]);

    const previewImage = () => {
        if (typeof imageUrl === 'object') {
            return URL.createObjectURL(imageUrl);
        } else {
            return imageUrl;
        }
    };

    const handleChange = async (file: File) => {
        setImageUrl(file);
        fileChange(file);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', 'product');
        try {
            const response = await uploadImage(formData);
            const imgUrl = response?.data?.Location;
            formik.setFieldValue('primaryImg', imgUrl);
            formik.setFieldValue('imageFile', imgUrl);
        } catch (err) {
        }
    };

    const onFileChange = (e: any) => {
        const file = e.target.files[0];
        handleChange(file);
    };

    const handleRemove = () => {
        formik.setFieldValue('imageFile', '');
        formik.setFieldValue('primaryImg', '');
        setImageUrl('');
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleChange(e.dataTransfer.files[0]);
            e.dataTransfer.clearData();
        }
    };

    const UploadInput = ({ onFileChange, disabled }: any) => (
        <>
            <div
                className={`h-52 relative flex rounded-lg justify-center items-center bg-bg_primary `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    onChange={onFileChange}
                    id='img-upload-single'
                    hidden
                    type='file'
                    accept=".png, .jpg, .jpeg"
                    disabled={disabled}
                />
                <label htmlFor="img-upload-single" className='flex w-full h-full items-center justify-center text-center cursor-pointer'>
                    <div className='flex-1'>
                        <div className='flex flex-col gap-2 justify-center items-center'>
                            <Image src={upload_icon} alt='' width={40} height={40} />
                            <p className='text-[10px] text-upload'>Drag and drop your files here</p>
                            <div className='h-10 p-2 justify-center items-center border border-upload text-secondary w-28 rounded-base flex'>
                                Browse File
                            </div>
                        </div>
                    </div>
                </label>
            </div>
            {errors && touched && <p className="text-text_error text-xs">{errors}</p>}
        </>
    );

    return (
        <>
            {imageUrl && type === 'menu' ? (
                <div className='h-52 w-52 relative flex rounded-4xl justify-center items-center bg-bg_primary'>
                    <div className='h-52 top-2 absolute right-8'>
                        <button onClick={handleRemove} type='button'>
                            <Image src={close_icon} alt='' />
                        </button>
                    </div>
                    {isPending ? <Spinner /> : <Image src={previewImage()} alt="" width={50} height={50} style={{ objectFit: 'contain' }} />}
                </div>
            ) : imageUrl ? (
                <div className='h-52 relative flex rounded-md justify-center items-center bg-bg_primary'>
                    <div className='h-52 top-4 absolute right-8'>
                        {!disabled && <button onClick={handleRemove} type='button'>
                            <Image src={close_icon} alt='' />
                        </button>}
                    </div>
                    {isPending ? <Spinner /> : <Image src={previewImage()} alt="" width={50} height={50} style={{ objectFit: 'contain' }} />}
                </div>
            ) : (
                <UploadInput onFileChange={onFileChange} disabled={disabled} />
            )}
        </>
    );
}
