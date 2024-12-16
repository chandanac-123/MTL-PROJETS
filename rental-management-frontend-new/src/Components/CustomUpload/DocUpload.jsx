import React, { useEffect, useState } from 'react';
import { FileUploader } from "react-drag-drop-files";
import file_upload from "../../Static/Images/file-up.svg"
import cross_icon from '../../Static/Images/cross.svg'
import upload_icon from '../../Static/Images/uploadplus.svg'

const fileTypes = ["JPEG", "PNG", "PDF",'JPG'];

const DocUpload = ({ formik, uploadFiles, updateFile = false, errors ,dragdrop=false,uploadDocType}) => {
  const [file, setFile] = useState({});

  useEffect(() => {
    if (updateFile) {
      setFile({})
    }
  }, [updateFile])

  const handleChange = (file) => {
    setFile(file);
    formik.setFieldValue('property_files', file)
    uploadFiles(file)
  };

  const handleRemove = (indexToRemove) => {
    const updatedFiles = Object.values(file).filter((_, index) => index !== indexToRemove);
    setFile(updatedFiles);
    uploadFiles(updatedFiles)
  };

  return (
    <div className='w-full'>
      {dragdrop ? <div className='w-full justify-center items-center bg-button-secondary outline-dashed rounded-lg outline-2 outline-primary gap-4'>
        <FileUploader
          multiple={true}
          handleChange={handleChange}
          name="file"
          children={
            <div className="flex flex-col items-center justify-center mb-4 gap-2 mt-5 p-8" >
              <img src={file_upload} />
              <p className="justify-center items-center font-bold">{uploadDocType==='property'?"Upload Property Documents":"Upload Documentation for Identity verification"}</p>
              <p className="justify-center items-center text-text-color-secondary whitespace-nowrap">Drag & Drop or choose files from computer.</p>
            </div>
          }
          types={fileTypes}
        />
      </div> : 
      <div className='w-20 justify-center items-center bg-upload_bg outline-dashed rounded-lg outline-1 outline-color-gray gap-4'>
        <FileUploader
          multiple={true}
          handleChange={handleChange}
          name="file"
          children={
            <div className="flex flex-col items-center justify-center mb-4 gap-2 mt-5 p-8" >
              <img src={upload_icon} />
            </div>
          }
          types={fileTypes}
        />
      </div>}

      <div className='text-color-orange text-xs mt-1'>
        <span role='alert'>{errors}</span>
      </div>

      {Object.values(file).map((i, index) =>
        <div className='flex gap-1 outline-dotted outline-slate-200  justify-between rounded-lg outline-2 p-2'>
          <div className='flex justify-start gap-2'>
            <img src={file_upload} />
            <p className='font-medium'>{file ? `File name: ${i.name}` : "No files uploaded yet"}</p>
          </div>
          <div className='flex justify-end '>
            <button onClick={() => handleRemove(index)}><img src={cross_icon} /></button>
          </div>
        </div>
      )}
    </div>
  )
}
export default DocUpload;
