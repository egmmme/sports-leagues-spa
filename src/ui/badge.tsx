import * as React from "react";
import {type VariantProps} from "class-variance-authority";
import {cn} from "./utils";
import {badgeVariants} from "./constants";

function Badge({
                   className,
                   variant,
                   asChild = false,
                   ...props
               }: React.ComponentProps<"span"> &
    VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
    const Comp = "span";

    return (
        <Comp
            data-slot="badge"
            className={cn(badgeVariants({variant}), className)}
            {...props}
        />
    );
}

export {Badge, badgeVariants};
