import { ActionIcon } from '@mantine/core';
import {
  IconBook,
  IconCalendar,
  TablerIcon,
} from '@tabler/icons-react';
import { Link } from 'wouter';

interface NavItems {
  label: string;
  href: string;
  Icon: TablerIcon;
}

const navItems: NavItems[] = [
  { label: 'Préstamos', href: '/orders', Icon: IconCalendar },
  { label: 'Documentos', href: '/documents', Icon: IconBook },
];

const Nav = () => {
  return (
    <div className="stack gap-lg ai-center">
    {
      navItems.map((navItem) => (
        <ActionIcon
          key={navItem.label}
          color="black"
          variant="transparent"
          component={Link}
          href={navItem.href}
        >
          <navItem.Icon title={navItem.label} />
        </ActionIcon>
      ))
    }
    </div>
  );
};

export default Nav;
