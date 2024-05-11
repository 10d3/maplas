
import { Loader2 } from "lucide-react";
import { Button } from "./button";

interface LoadingButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading: boolean;
}

export default function LoadingButton({
    children,
    loading,
    ...props
}: LoadingButtonProps) {
    return (
        <Button {...props} disabled={props.disabled || loading}>
            <span>
                {loading && <Loader2 size={15} className=' animate-spin' />}
                {children}
            </span>
        </Button>
    )
}
