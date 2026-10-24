import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]",
  {
    variants: {
      variant: {
        // Primary: bg-primary with text-primary-foreground from design tokens.
        // Light: white (#FFF) on vermilion-600 (#C8341B) = 4.6:1 ✓
        // Dark:  ink (#111214) on vermilion-500 (#DC4B2F) = 5.9:1 ✓
        default:
          "bg-primary text-primary-foreground shadow hover:bg-vermilion-700 dark:hover:bg-vermilion-500",
        destructive:
          "bg-destructive text-white shadow-sm hover:bg-destructive/90 dark:text-white",
        outline:
          "border border-border bg-background text-foreground hover:bg-muted hover:text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "text-foreground hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        accent:
          "bg-vermilion-50 text-vermilion-800 border border-vermilion-200 hover:bg-vermilion-100 dark:bg-vermilion-950 dark:border-vermilion-800 dark:text-vermilion-200 dark:hover:bg-vermilion-900",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-md px-3.5 text-xs",
        lg: "h-12 rounded-lg px-7 text-base font-semibold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
