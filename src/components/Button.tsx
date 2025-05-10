'use client';

import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

// Define the button variants
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-[#00E7FF] to-[#1D8BFF] text-black hover:shadow-[0_0_20px_rgba(0,231,255,0.4)]',
        secondary: 'border border-[#1E2A41] bg-black hover:bg-[#0D121E] text-white hover:border-[#2A3C5A]',
        outline: 'border border-[#1E2A41] hover:border-[#2A3C5A] bg-transparent hover:bg-[#0D121E]/50 text-white',
        ghost: 'bg-transparent hover:bg-[#1E2A41]/50 text-white',
        link: 'bg-transparent underline-offset-4 hover:underline text-white p-0 h-auto',
      },
      size: {
        xs: 'h-7 px-2.5 text-xs',
        sm: 'h-9 px-4 text-xs',
        md: 'h-10 px-5 text-sm',
        lg: 'h-11 px-6 text-base',
      },
      rounded: {
        default: 'rounded-lg',
        full: 'rounded-full',
      },
      animate: {
        none: '',
        pulse: 'animate-pulse-slow',
        shine: 'btn-shine',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      rounded: 'default',
      animate: 'none',
    },
  }
);

// Define the button props
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
}

// Create the Button component
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      rounded,
      animate,
      children,
      leftIcon,
      rightIcon,
      isLoading,
      loadingText,
      ...props
    },
    ref
  ) => {
    // Handle button shine effect
    const handleShineEffect = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (animate === 'shine') {
        const button = e.currentTarget;
        const buttonRect = button.getBoundingClientRect();
        const x = e.clientX - buttonRect.left;
        const y = e.clientY - buttonRect.top;
        
        const afterEl = button.querySelector('::after') as HTMLElement;
        if (afterEl) {
          afterEl.style.left = `${x}px`;
          afterEl.style.top = `${y}px`;
          afterEl.style.opacity = '1';
          
          setTimeout(() => {
            if (afterEl) afterEl.style.opacity = '0';
          }, 500);
        }
      }
    };

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, rounded, animate, className }))}
        onMouseEnter={animate === 'shine' ? handleShineEffect : undefined}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {loadingText || children}
          </>
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants }; 