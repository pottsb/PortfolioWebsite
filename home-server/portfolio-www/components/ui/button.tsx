import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import { twMerge } from 'tailwind-merge'

const fullBleedVariants = new Set([
  'theme',
  'navIcon',
  'streamActive',
  'streamInactive',
  'heroPrimary',
  'heroSecondary',
  'social',
])

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline:
          'border bg-background shadow-xs hover:bg-accent dark:bg-input/30 dark:border-input dark:hover:bg-accent dark:hover:text-black',
        theme:
          'relative size-9 shrink-0 rounded-full hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        navIcon: 'p-2 text-foreground',
        streamActive:
          'rounded-lg px-3 py-1.5 text-xs font-medium transition-all bg-primary text-primary-foreground',
        streamInactive:
          'rounded-lg px-3 py-1.5 text-xs font-medium transition-all bg-secondary/80 text-secondary-foreground hover:bg-secondary',
        heroPrimary:
          'inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity',
        heroSecondary:
          'inline-flex items-center gap-2 px-5 py-2.5 bg-secondary border border-border text-secondary-foreground text-sm font-medium rounded-lg hover:bg-accent transition-colors dark:hover:text-black',
        social:
          'inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        fit: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant = 'primary',
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'
  const resolvedSize = variant && fullBleedVariants.has(variant) ? 'fit' : (size ?? 'default')

  return (
    <Comp
      data-slot="button"
      className={twMerge(buttonVariants({ variant, size: resolvedSize }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
