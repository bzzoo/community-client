import * as React from 'react'

import { cn } from '@/shared/lib/utils'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[60px] w-full rounded-md bg-transparent px-3 py-2 resize-none',
          className,
        )}
        ref={ref}
        {...props}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      />
    )
  },
)
Textarea.displayName = 'Textarea'

export { Textarea }
