'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight, ChevronDown, Menu } from 'lucide-react'
import clsx from 'clsx'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/hooks/use-mobile'

// ========== Types & Interfaces ==========

interface SidebarContextType {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  side: 'left' | 'right'
  isMobile: boolean
  maxWidth: number
  toggleSidebar: () => void
  showIconsOnCollapse: boolean
}

interface SidebarProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean
  defaultSide?: 'left' | 'right'
  defaultMaxWidth?: number
  showIconsOnCollapse?: boolean
  mobileView?: boolean
}

interface SidebarMenuItemProps {
  icon?: React.ReactNode
  label: string
  href?: string
  children?: React.ReactNode
  isActive?: boolean
  defaultOpen?: boolean
  alwaysOpen?: boolean
  isCollapsable?: boolean
}

// ========== Context ==========

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

// ========== Provider ==========

export function SidebarProvider({
  defaultOpen = true,
  defaultSide = 'left',
  defaultMaxWidth = 280,
  showIconsOnCollapse = true,
  mobileView = true,
  ...props
}: SidebarProviderProps) {
  const useMobile = useIsMobile()
  const isMobile = mobileView ? useMobile : false

  const [isOpen, setIsOpen] = React.useState(defaultOpen)
  const [side] = React.useState<'left' | 'right'>(defaultSide)
  const [maxWidth] = React.useState(defaultMaxWidth)

  const toggleSidebar = React.useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  // Add keyboard shortcut (Ctrl+B) to toggle sidebar
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleSidebar])

  const contextValue = React.useMemo(
    () => ({
      isOpen,
      setIsOpen,
      side,
      isMobile,
      maxWidth,
      toggleSidebar,
      showIconsOnCollapse,
    }),
    [isOpen, side, isMobile, maxWidth, toggleSidebar, showIconsOnCollapse]
  )

  return <SidebarContext.Provider value={contextValue} {...props} />
}

// ========== Layout Components ==========

export function SidebarLayout({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex min-h-screen w-full', className)} {...props} />
  )
}

export function MainContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col h-screen overflow-auto w-full', className)}
      {...props}
    />
  )
}

// ========== Main Sidebar ==========

export function Sidebar({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { isOpen, side, isMobile, maxWidth, setIsOpen, showIconsOnCollapse } = useSidebar()

  // Mobile rendering with overlay
  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
        <aside
          className={cn(
            `fixed top-0 bottom-0 z-50 flex flex-col
            ${side === 'left' ? 'left-0' : 'right-0'}
            ${isOpen ? 'translate-x-0' : side === 'left' ? '-translate-x-full' : 'translate-x-full'}
            w-[85vw] max-w-[300px] bg-white dark:bg-gray-900
            ${side === 'left' ? 'border-r' : 'border-l'} border-border
            transition-transform duration-300 ease-in-out`,
            className
          )}
          style={{ maxWidth: `${maxWidth}px` }}
          {...props}
        >
          {children}
        </aside>
      </>
    )
  }

  // Desktop rendering with smooth width transition
  return (
    <aside
      className={clsx(
        `sticky top-0 bottom-0 z-0 flex flex-col h-screen
        ${side === 'left' ? 'left-0 border-r' : 'right-0 border-l'} border-border
        transition-all duration-300 ease-in-out bg-sidebar overflow-hidden`,
        className
      )}
      style={{
        width: isOpen ? `${maxWidth}px` : showIconsOnCollapse ? '4rem' : '0px',
        minWidth: showIconsOnCollapse ? '4rem' : '0',
        pointerEvents: !isOpen && !showIconsOnCollapse ? 'none' : undefined,
        userSelect: !isOpen && !showIconsOnCollapse ? 'none' : undefined,
      }}
      {...props}
    >
      {children}
    </aside>
  )
}

// ========== Sidebar Sections ==========

export function SidebarHeader({
  icon,
  label,
  className,
  children,
  ...props
}: {
  icon?: React.ReactNode
  label?: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>) {
  const { isOpen, showIconsOnCollapse } = useSidebar()

  let iconNode = icon
  let labelNode = label

  // Extract icon and label from children if not provided
  if (!icon && !label && children) {
    const childrenArray = React.Children.toArray(children)
    iconNode = childrenArray[0]
    labelNode = childrenArray.slice(1)
  }

  const labelClass = clsx(
    'transition-all duration-300',
    showIconsOnCollapse
      ? isOpen
        ? 'opacity-100 ml-2 w-auto translate-x-0'
        : 'opacity-0 ml-0 w-0 -translate-x-4'
      : 'opacity-100 w-auto'
  )

  return (
    <div
      className={cn(
        'flex items-center h-16 gap-2 border-b border-border transition-all duration-300 p-3',
        className
      )}
      {...props}
    >
      {iconNode && <span className="flex-shrink-0">{iconNode}</span>}
      <span className={labelClass}>{labelNode}</span>
    </div>
  )
}

export function SidebarContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex-1 overflow-auto p-3', className)}
      {...props}
    />
  )
}

export function SidebarFooter({
  icon,
  label,
  className,
  children,
  ...props
}: {
  icon?: React.ReactNode
  label?: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>) {
  const { isOpen, showIconsOnCollapse } = useSidebar()

  let iconNode = icon
  let labelNode = label

  if (!icon && !label && children) {
    const childrenArray = React.Children.toArray(children)
    iconNode = childrenArray[0]
    labelNode = childrenArray.slice(1)
  }

  const labelClass = clsx(
    'transition-all duration-300',
    showIconsOnCollapse
      ? isOpen
        ? 'opacity-100 ml-2 w-auto translate-x-0'
        : 'opacity-0 ml-0 w-0 -translate-x-4'
      : 'opacity-100 w-auto'
  )

  return (
    <div
      className={cn(
        'flex items-center h-16 gap-2 border-t border-border transition-all duration-300 p-3',
        className
      )}
      {...props}
    >
      {iconNode && <span className="flex-shrink-0">{iconNode}</span>}
      <span className={labelClass}>{labelNode}</span>
    </div>
  )
}

// ========== Menu Components ==========

export function SidebarMenu({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('space-y-1', className)} {...props} />
  )
}

export function SidebarMenuItem({
  icon,
  label,
  href,
  children,
  isActive: propIsActive,
  defaultOpen = false,
  alwaysOpen = false,
  isCollapsable = false,
}: SidebarMenuItemProps) {
  const pathname = usePathname()
  const { isOpen, isMobile, setIsOpen, showIconsOnCollapse } = useSidebar()
  const [isExpanded, setIsExpanded] = React.useState(defaultOpen || alwaysOpen)

  // Determine if this menu item is active
  const isActive =
    propIsActive !== undefined
      ? propIsActive
      : href
      ? pathname === href || pathname.startsWith(href)
      : false

  const handleClick = () => {
    // Toggle expansion if has children and no href
    if (children && !href && !alwaysOpen) {
      setIsExpanded(!isExpanded)
    }
    // Close sidebar on mobile when clicking a link
    if (isMobile && href) {
      setIsOpen(false)
    }
  }

  const labelClass = clsx(
    'transition-all duration-300 truncate',
    showIconsOnCollapse
      ? isOpen
        ? 'opacity-100 w-auto'
        : 'opacity-0 w-0'
      : 'opacity-100 w-auto'
  )

  const content = (
    <>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className={labelClass}>{label}</span>
      {children && isCollapsable && isOpen && (
        <ChevronDown
          className={clsx(
            'ml-auto h-4 w-4 transition-transform duration-200',
            isExpanded && 'rotate-90'
          )}
        />
      )}
    </>
  )

  const baseClasses = clsx(
    'flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors',
    isActive
      ? 'bg-accent text-accent-foreground'
      : 'hover:bg-accent hover:text-accent-foreground'
  )

  return (
    <div>
      {href ? (
        <Link href={href} className={baseClasses} onClick={handleClick}>
          {content}
        </Link>
      ) : (
        <button className={baseClasses} onClick={handleClick}>
          {content}
        </button>
      )}
      {children && isOpen && (isExpanded || alwaysOpen) && (
        <div className="ml-6 mt-1 pl-3 border-l border-border space-y-1">
          {children}
        </div>
      )}
      {children && !showIconsOnCollapse && (isExpanded || alwaysOpen) && (
        <div className="ml-6 mt-1 pl-3 border-l border-border space-y-1">
          {children}
        </div>
      )}
    </div>
  )
}

export function NestedLink({
  children,
  href = '#',
  isActive: propIsActive,
}: {
  children: React.ReactNode
  href?: string
  isActive?: boolean
}) {
  const pathname = usePathname()
  const { isMobile, setIsOpen } = useSidebar()

  const isActive =
    propIsActive !== undefined
      ? propIsActive
      : pathname === href || pathname.startsWith(href)

  const handleClick = () => {
    if (isMobile && href) {
      setIsOpen(false)
    }
  }

  return (
    <Link
      href={href}
      className={clsx(
        'block py-1 px-2 rounded-md text-sm',
        isActive ? 'bg-accent text-accent-foreground' : 'hover:bg-accent'
      )}
      onClick={handleClick}
    >
      {children}
    </Link>
  )
}

// ========== Utility Components ==========

export function SidebarTrigger() {
  const { toggleSidebar, side, isOpen, isMobile } = useSidebar()

  return (
    <button
      onClick={toggleSidebar}
      className="p-2 rounded-md hover:bg-muted transition-colors"
      aria-label="Toggle sidebar"
    >
      {isMobile ? (
        <Menu className="h-5 w-5" />
      ) : isOpen ? (
        side === 'left' ? (
          <ChevronLeft className="h-5 w-5" />
        ) : (
          <ChevronRight className="h-5 w-5" />
        )
      ) : side === 'left' ? (
        <ChevronRight className="h-5 w-5" />
      ) : (
        <ChevronLeft className="h-5 w-5" />
      )}
    </button>
  )
}

export function SidebarHeaderLogo({
  logo,
  className,
}: {
  logo?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-center justify-center h-10 w-10', className)}>
      {logo}
    </div>
  )
}

export function SidebarHeaderTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn('text-lg font-bold truncate', className)}
      {...props}
    />
  )
}

export function UserAvatar({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('h-8 w-8 rounded-full flex items-center justify-center overflow-hidden', className)}
      {...props}
    />
  )
}
