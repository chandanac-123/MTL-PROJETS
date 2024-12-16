import { Image } from 'antd';
import React, { useState } from 'react';
import { useEffect } from 'react';
import pdf_icon from '../../Static/Images/pdf.png'

const ImageDisplay = ({ file }) => {
    console.log("entereeeeeeeeeeee hereeee");
    console.log(file?.name?.endsWith('.pdf'));
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileRead = (event) => {
    const content = event.target.result;
    setImageUrl(content);
  };

  const handleFileSelect = () => {
    const reader = new FileReader();

    reader.onloadend = handleFileRead;
    reader.readAsDataURL(file);
  };
  useEffect(()=> {
    handleFileSelect()
  },[])

  const openPdfInNewTab = (fileContent) => {
    if (fileContent) {
        // Remove data URL prefix if present
        const base64String = fileContent.includes(',') ? fileContent.split(',')[1] : fileContent;

        // Add padding if needed
        while (base64String.length % 4) {
            base64String += '=';
        }

        // Decode the base64 string to binary data
        const binaryData = atob(base64String);

        // Create an array buffer from the binary data
        const arrayBuffer = new ArrayBuffer(binaryData.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryData.length; i++) {
            uint8Array[i] = binaryData.charCodeAt(i);
        }

        // Create a Blob from the array buffer
        const blob = new Blob([arrayBuffer], { type: 'application/pdf' });

        // Create a data URL for the Blob
        const dataUrl = URL.createObjectURL(blob);

        // Open the data URL in a new window or tab
        const newWindow = window.open();
        newWindow.location.href = dataUrl;
    }
};

  return (
    <div className='w-full'>
      {imageUrl && 
      file?.name?.endsWith('.pdf')? 
    //   <img onClick={() => window.open(imageUrl)} src={pdf_icon} alt='' className='flex w-28 h-28 p-2' />
      <img onClick={() => openPdfInNewTab(imageUrl)} src={pdf_icon} alt='' className='flex w-28 h-28 p-2' />
      :
    //   <img onClick={() => window.open(file)} src={imageUrl} alt='' className='flex w-28 h-28 p-2' />
      <Image src={imageUrl} alt='' className='flex w-28 h-28 p-2' />
}
    </div>
  );
};

export default ImageDisplay;
