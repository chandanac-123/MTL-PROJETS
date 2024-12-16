import React, { useState } from 'react'
import Image from "next/image"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible/collapse'
import view from '@public/icons/view-icon.svg'
import DarkarrowUP from '@public/icons/arrow-top-dark.svg'
import { Customeraddresslist, Collapsibledetails } from '@/screens/customer-management/customer-details'
import { SelectSeparator } from '@/components/ui/search-select/select';


export const CollapsibleLayout: React.FC<Customeraddresslist> = ({ Address }) => {
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);

  const toggleExpand = (index: number) => {
    setExpandedIndexes(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div>
      {Address?.map((address, i) => (
        <div key={i}>
          <Collapsible>
            <CollapsibleTrigger
              icon={
                <Image
                  className="mt-7 w-[20px] h-[20px]"
                  src={expandedIndexes.includes(i) ? DarkarrowUP : view}
                  alt=""
                />
              }
              heading={
                <label className="text-base text-primary font-semibold">
                  {address?.locationTag && address?.locationTag?.charAt(0)?.toUpperCase() + address?.locationTag?.slice(1)}
                </label>
              }
              onClick={() => toggleExpand(i)}
            ></CollapsibleTrigger>
            <div className="flex flex-col ml-7 whitespace-pre-line w-1/2">
              {address?.addressLine1 && <p>{address?.addressLine1}{','}</p>}
              {
                expandedIndexes.includes(i) && <>
                  {address?.addressLine2 && <p>{address?.addressLine2}{','}</p>}
                  {address?.city && <p>{address?.city}{','}</p>}
                  {address?.postalCode && <p>{address?.postalCode}{'.'}</p>}
                </>
              }

            </div>
            {expandedIndexes.includes(i) && (
              <CollapsibleContent>
                <p className="ml-7 text-sm font-normal text-primary">
                  {address?.deliveryOption && address?.deliveryOption?.charAt(0)?.toUpperCase() + address?.deliveryOption?.slice(1)?.replace(/([A-Z])/g, ' $1')}
                </p>
              </CollapsibleContent>
            )}
          {i !== Address.length - 1 && <SelectSeparator className="my-3 bg-light_pink" />}
          </Collapsible>
        </div>
      ))}
    </div>
  );
}
