import { Loader2Icon } from "lucide-react"; 

import { cn } from "@/lib/utils";   

function AuthLoadingView ({className, ...props}: React.ComponentProps<"svg">) {
    return (
        <Loader2Icon
        role="status"
        aria-label="loading"
        className={cn(
            "size-4 h-4 animate-spin", className)}
        {...props}  
        />
    );
}

export {AuthLoadingView}