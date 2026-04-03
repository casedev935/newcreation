import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 border-black tracking-wide uppercase",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:-translate-y-1 hover:-translate-x-1 hover:shadow-brutal active:translate-y-0 active:translate-x-0 active:shadow-none",
        destructive: "bg-black text-white hover:-translate-y-1 hover:-translate-x-1 hover:shadow-brutal active:translate-y-0 active:translate-x-0 active:shadow-none",
        outline: "border-2 border-black bg-white hover:bg-accent hover:-translate-y-1 hover:-translate-x-1 hover:shadow-brutal active:translate-y-0 active:translate-x-0 active:shadow-none",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-2 border-black shadow-brutal",
        ghost: "hover:bg-accent hover:text-accent-foreground border-transparent hover:border-black",
        link: "text-primary underline-offset-4 hover:underline border-transparent uppercase font-bold",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8 text-base",
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
