import React from 'react'

const BackButton = ({ label, img, onClick }) => {
  return (
    <button type='button' className='bg-search-bg-color gap-2 px-4 py-2 w-1/7 rounded-lg flex items-center justify-center text-text-color-secondary' onClick={onClick} >
      <img src={img} alt="icon" />
      <p className='whitespace-nowrap font-medium'>
        {label}
      </p>
    </button>
  )
}

export default BackButton