import { Collapse } from "antd";
import React from "react";
import ImageDisplay from "./ImageDisplay";

const CollapseData = ({ head, contentVal }) => {
  
  const getItems = (panelStyle) => [
    {
      key: "1",
      label: head,
      children: (
        <>
          {contentVal?.map((item) => {
            return (
              <div className="flex gap-4 flex-col sm:flex-row mobile:w-full">
                <label className="w-48 text-secondary">{item?.label}</label>
                <div className="flex flex-wrap gap-2">
                {item?.label === "Documents" && head === "Documents" ? (
                  Array.from(item?.value)?.map((i) => (
                    <div className="mobile:flex-col w-28 rounded-lg outline-dashed outline-1 outline-slate-200">
                      <ImageDisplay file={i} />
                      <label className="flex justify-center items-center nowrap">
                        {i?.name}
                      </label>
                    </div>
                  ))
                ) : (
                  <label className="w-48 text-text-color-secondary font-semibold">
                    {item?.value}
                  </label>
                )}
                </div>
              </div>
            );
          })}
        </>
      ),
      style: panelStyle,
    },
  ];

  const panelStyle = {
    marginBottom: 24,
  };

  const onChange = (key) => {
    console.log(key);
  };

  return <Collapse items={getItems(panelStyle)} onChange={onChange} />;
};

export default CollapseData;

{
  /* <label className='w-48 text-text-color-secondary font-semibold'>{item?.value}</label> */
}
{
  /* {item?.value?.length>1 && item?.value?.map((i)=><img src={i} alt='' className='w-20 h-20'/>)} */
}

// {item?.value?.length > 1 && item?.value?.map((i) => {
//     const objectURL = URL.createObjectURL(i);
//     return (
//         <Image src={objectURL} className='flex h-36 w-36 p-2' />

//     )
// })
// }
