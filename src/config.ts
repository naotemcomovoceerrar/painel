import { HomeIcon, UsersIcon, DnsIcon, MessageCircleIcon, TvIcon, CalendarIcon, DollarSignIcon, SettingsIcon } from './components/icons';

export const navItems = [
  { to: '/', icon: HomeIcon, label: 'Dashboard' },
  { to: '/clients', icon: UsersIcon, label: 'Clientes' },
  { to: '/dns', icon: DnsIcon, label: 'DNS' },
  { to: '/whatsapp', icon: MessageCircleIcon, label: 'WhatsApp Bot' },
  { to: '/devices', icon: TvIcon, label: 'Dispositivos' },
  { to: '/expirations', icon: CalendarIcon, label: 'Vencimentos' },
  { to: '/billing', icon: DollarSignIcon, label: 'Cobranças' },
  { to: '/settings', icon: SettingsIcon, label: 'Configurações' },
];

export const pageTitles: Record<string, string> = {
    '/': 'Dashboard',
    '/clients': 'Clientes',
    '/dns': 'Gerenciamento de DNS',
    '/whatsapp': 'WhatsApp Bot',
    '/devices': 'Dispositivos',
    '/expirations': 'Calendário de Vencimentos',
    '/billing': 'Cobranças e Faturas',
    '/settings': 'Configurações',
};
