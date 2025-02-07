"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
    React.ElementRef<typeof CheckboxPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
        label: string;
    }
>(({ className, label, ...props }, ref) => (
    <div className="flex items-center gap-2 cursor-pointer group">
        <CheckboxPrimitive.Root
            id={label}
            ref={ref}
            className={cn(
                "peer h-4 w-4 shrink-0 rounded-sm border border-primary data-[state=checked]:border-icones-brand ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-icones-brand data-[state=checked]:text-primary-foreground",
                "hover:border-brand",
                className
            )}
            {...props}>
            <CheckboxPrimitive.Indicator
                className={cn(
                    "flex items-center justify-center text-current hover:text-icones-brand"
                )}>
                <Check className="h-3 w-3" />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        <label
            className="text-sm font-medium leading-none text-muted-foreground cursor-pointer group-hover:text-icones-brand"
            htmlFor={label}>
            {label}
        </label>
    </div>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
