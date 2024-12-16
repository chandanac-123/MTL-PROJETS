import React from 'react'
import search_icon from "../../Static/Images/search.svg"

const SearchInput = ({ onChange,placeholder }) => {
    return (

        <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-0 pointer-events-none">
                <img src={search_icon} />
            </div>
            <input
                placeholder={placeholder}
                type="text"
                onChange={onChange}
                className="bg-search-bg-color outline-none border-none h-11 text-sm rounded-lg focus:border-color-white active:border-color-white w-full pl-10 p-2.5" />
        </div>


    )
}

export default SearchInput
