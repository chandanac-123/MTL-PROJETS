import React, { forwardRef } from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

const CollapsibleRoot = CollapsiblePrimitive.Root; 

const CollapsibleTrigger = forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger> & { icon?: React.ReactElement<HTMLImageElement>; heading: React.ReactNode }
>(({ icon, heading, ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleTrigger {...props} ref={ref} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    {icon}
    {heading}
  </CollapsiblePrimitive.CollapsibleTrigger>
));

CollapsibleTrigger.displayName = 'CollapsibleTrigger';

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

export { CollapsibleRoot as Collapsible, CollapsibleTrigger, CollapsibleContent };

