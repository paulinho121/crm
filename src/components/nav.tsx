'use client';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  UsersRound,
  TrendingUp,
  BellRing,
  Landmark,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const menuItems = [
  {
    href: '/dashboard',
    label: 'Painel',
    icon: LayoutDashboard,
  },
  {
    href: '/clients',
    label: 'Clientes',
    icon: UsersRound,
  },
  {
    href: '/sales',
    label: 'Vendas',
    icon: Landmark,
  },
  {
    href: '/reminders',
    label: 'Lembretes',
    icon: BellRing,
  },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname.startsWith(item.href)}
            tooltip={item.label}
          >
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
