'use client'
import React, { useEffect, useState } from 'react'
import upload_icon from '@public/icons/upload.svg'
import close_icon from '@public/icons/color-close.svg'
import Image from 'next/image';
import { useUploadImageQuery } from '@/api-queries/upload/queries';
import { Spinner } from '../spinner';

export default function MultipleSingleUpload({ formik, images, fileChange, disabled = false, maxUploads = 4, touched, errors }: any) {
    const [imageUrls, setImageUrls] = useState<any>([]);
    const [dragging, setDragging] = useState(false);
    const { mutateAsync: uploadImage, isPending } = useUploadImageQuery();

    useEffect(() => {
        if (images) {
            setImageUrls(Array.isArray(images) ? images : [images]);
        }
    }, [images]);

    const previewImage = (image: any) => {
        if (typeof image === 'object') {
            return URL.createObjectURL(image);
        } else {
            return image;
        }
    };

    const handleChange = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', 'product');

        if (file && imageUrls.length < maxUploads) {
            // Temporarily add to local state for preview
            setImageUrls([...imageUrls, file]);
        }

        try {
            // Upload image and get response
            const response = await uploadImage(formData);
            const imgUrl = response?.data?.Location;

            // Update formik state (mediaImgs field) with the new image URL
            const updatedImages = [...formik.values.mediaImgs, imgUrl];
            formik.setFieldValue('mediaImgs', updatedImages);

            // Update local state with the uploaded URL
            fileChange(updatedImages);

        } catch (error) {
        }
    };

    const handleFilesChange = (e: any) => {
        const newFile = e.target.files[0];
        handleChange(newFile);
    };

    const handleRemove = (index: number) => {
        // Remove image locally and update formik state
        const newImageUrls = imageUrls.filter((_: any, i: any) => i !== index);
        const updatedFormikImages = formik.values.mediaImgs.filter((_: any, i: number) => i !== index);

        setImageUrls(newImageUrls);
        formik.setFieldValue('mediaImgs', updatedFormikImages);
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

        const droppedFiles = Array.from(e.dataTransfer.files);
        const validFiles = droppedFiles.filter((file: any) => file.type.startsWith('image/'));

        validFiles.forEach((file) => {
            if (imageUrls.length < maxUploads) {
                handleChange(file);
            }
        });
    };

    return (
        <>
            <div className='flex flex-wrap gap-4'>
                {imageUrls.map((image: any, index: any) => (
                    <div key={index} className='h-52 w-52 relative flex rounded-md border-none justify-center items-center bg-bg_primary'>
                        <div className='h-52 top-4 absolute right-8'>
                            {!disabled && <button onClick={() => handleRemove(index)} type='button'><Image src={close_icon} alt='Remove' width={24} height={24} /></button>}
                        </div>
                        {isPending ? <Spinner /> : <Image src={previewImage(image)} alt={`Uploaded ${index}`} width={120} height={120} className='h-40' style={{ objectFit: 'contain' }} />}
                    </div>
                ))}
                {!disabled && imageUrls.length < maxUploads && (
                    <div
                        className={`relative flex rounded-lg border-none justify-center items-center bg-bg_primary ${imageUrls.length === 0 ? 'w-full' : 'w-52'} h-52 ${dragging ? 'border-blue-500' : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <input onChange={handleFilesChange} id='img-upload-multi' hidden type='file' accept=".png, .jpg, .jpeg" disabled={disabled} />
                        <label htmlFor="img-upload-multi" className='flex w-full h-full items-center justify-center text-center cursor-pointer'>
                            <div className='flex-1'>
                                <div className='flex flex-col gap-2 justify-center items-center'>
                                    <Image src={upload_icon} alt='' width={40} height={40} />
                                    <p className='text-[10px] text-upload'>Drag and drop your files here</p>
                                    <div className='h-10 p-2 justify-center items-center border border-upload text-secondary w-28 rounded-base flex'>Browse File</div>
                                </div>
                            </div>
                        </label>
                    </div>
                )}
            </div>
            {errors && touched && <p className="text-text_error text-xs">{errors}</p>}
        </>
    );
}
