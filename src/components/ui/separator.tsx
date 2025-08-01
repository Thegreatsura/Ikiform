import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const separatorVariants = cva('shrink-0 bg-border', {
  variants: {
    orientation: {
      horizontal: 'h-[1px] w-full',
      vertical: 'h-full w-[1px]',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      size: 'sm',
      className: 'h-[1px]',
    },
    {
      orientation: 'horizontal',
      size: 'md',
      className: 'h-[2px]',
    },
    {
      orientation: 'horizontal',
      size: 'lg',
      className: 'h-[4px]',
    },
    {
      orientation: 'vertical',
      size: 'sm',
      className: 'w-[1px]',
    },
    {
      orientation: 'vertical',
      size: 'md',
      className: 'w-[2px]',
    },
    {
      orientation: 'vertical',
      size: 'lg',
      className: 'w-[4px]',
    },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    size: 'sm',
  },
});

const separatorWithTextVariants = cva(
  'relative flex items-center justify-center',
  {
    variants: {
      orientation: {
        horizontal: 'w-full',
        vertical: 'h-full flex-col',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);

export type CustomSeparatorProps = Omit<
  SeparatorProps,
  keyof React.ComponentProps<'div'>
>;

export interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>,
    VariantProps<typeof separatorVariants> {
  orientation?: 'horizontal' | 'vertical';
  ChildrenClassName?: string;
  children?: React.ReactNode;
}

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    {
      className,
      orientation = 'horizontal',
      size,
      ChildrenClassName,
      children,
      ...props
    },
    ref
  ) => {
    if (children) {
      return (
        <div
          className={cn(separatorWithTextVariants({ orientation }), className)}
        >
          {orientation === 'horizontal' ? (
            <>
              <div
                className={cn(
                  separatorVariants({ orientation, size }),
                  'flex-1'
                )}
              />
              <span className={cn(ChildrenClassName, 'px-3 text-sm ')}>
                {children}
              </span>
              <div
                className={cn(
                  separatorVariants({ orientation, size }),
                  'flex-1'
                )}
              />
            </>
          ) : (
            <>
              <div
                className={cn(
                  separatorVariants({ orientation, size }),
                  'flex-1'
                )}
              />
              <span
                className={cn(
                  ChildrenClassName,
                  'writing-mode-vertical-rl py-3 text-sm'
                )}
              >
                {children}
              </span>
              <div
                className={cn(
                  separatorVariants({ orientation, size }),
                  'flex-1'
                )}
              />
            </>
          )}
        </div>
      );
    }

    return (
      <SeparatorPrimitive.Root
        className={cn(separatorVariants({ orientation, size }), className)}
        decorative
        orientation={orientation}
        ref={ref}
        {...props}
      />
    );
  }
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator, separatorVariants };
