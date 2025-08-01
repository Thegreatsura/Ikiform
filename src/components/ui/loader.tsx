import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const loaderVariants = cva('inline-block', {
  variants: {
    size: {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
      xl: 'h-8 w-8',
    },
    variant: {
      default: 'text-foreground',
      primary: 'text-primary',
      secondary: 'text-secondary-foreground',
      muted: 'text-muted-foreground',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});

export interface LoaderProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof loaderVariants> {}

const Loader = React.forwardRef<SVGSVGElement, LoaderProps>(
  ({ className, size, variant, ...props }, ref) => {
    return (
      <svg
        aria-label="Loading"
        className={cn(
          loaderVariants({ size, variant }),
          'animate-spin',
          className
        )}
        fill="none"
        ref={ref}
        role="status"
        suppressHydrationWarning
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />{' '}
        <path
          className="opacity-75"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          fill="currentColor"
        />
      </svg>
    );
  }
);

Loader.displayName = 'Loader';

export { Loader, loaderVariants };
