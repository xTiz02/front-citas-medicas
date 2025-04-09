import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import React from 'react'

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
  className?: string
}

function header({
    className,
    children,
    ...props
  }: HeaderProps) {


  return (
    <header
      className={cn(
        'flex h-16 items-center gap-3 bg-background p-4 sm:gap-4',
        className
      )}
      {...props}
    >
      <SidebarTrigger variant='outline' className='scale-125 sm:scale-100' />
      <Separator orientation='vertical' className='h-6' />
      {children}
    </header>
  )
}

export default header