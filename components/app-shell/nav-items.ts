import {
  LayoutGrid,
  ReceiptText,
  Send,
  Settings,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react'

export type NavItem = {
  href: string
  label: string
  icon: LucideIcon
  /** Shown in the mobile bottom bar. */
  mobile?: boolean
}

export const NAV_ITEMS: NavItem[] = [
  { href: '/dashboard', label: 'Home', icon: LayoutGrid, mobile: true },
  { href: '/wallets', label: 'Wallets', icon: Wallet, mobile: true },
  { href: '/send', label: 'Send money', icon: Send, mobile: true },
  { href: '/recipients', label: 'Recipients', icon: Users },
  { href: '/transactions', label: 'Activity', icon: ReceiptText, mobile: true },
  { href: '/settings', label: 'Settings', icon: Settings, mobile: true },
]

export function isActivePath(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`)
}
