import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-regular text- ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: " bg-primary text-white hover:bg-primary/90",
        secondary:
          "bg-secondary text-primary hover:bg-secondary/80",
        disabled:
          "bg-disabled text-disabledText hover:bg-disabled/80",
        destructive:
          "bg-red-500 text-gray-50 hover:bg-red-500/90",
        outlinePrimary:
          "border border-primary bg-white hover:bg-gray-100 hover:text-gray-900",
        outlineSecondary:
          "border border-secondary bg-white hover:bg-gray-100 hover:text-gray-900",
        ghost: "hover:bg-gray-100 hover:text-gray-900",
        link: "text-gray-900 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

//Usage
{/* 
<Button
  variant="default"
  onClick={() => navigate("/path/to/push")}
>
  <div className="flex items-center gap-3">
     Create New Event
    <div className="text:white">
      <ArrowRight color="white"/>
    </div>
  </div>
</Button>

<Button
  variant="secondary"
  onClick={() => navigate("/path/to/push")}
>
  <div className="flex items-center gap-3">
    Create New Event
    <div className="text:white">
      <ArrowRight color="var(--primary)"/>
    </div>
   </div>
</Button>


<Button
  variant="outlinePrimary"
  onClick={() => navigate("/path/to/push")}
>
  <div className="flex items-center gap-3">
    Create New Event
    <div className="text:white">
      <ArrowRight color="var(--primary)"/>
    </div>
  </div>
</Button>

<Button
  variant="outlineSecondary"
  onClick={() => navigate("/path/to/push")}
>
  <div className="flex items-center gap-3">
    Create New Event
     <div className="text:white">
      <ArrowRight color="var(--primary)"/>
    </div>
  </div>
</Button>

<Button
  variant="disabled"
>
  <div className="flex items-center gap-3">
    Create New Event
    <div className="text:white">
      <ArrowRight color="var(--disabledText)"/>
    </div>
  </div>
</Button>  
*/}