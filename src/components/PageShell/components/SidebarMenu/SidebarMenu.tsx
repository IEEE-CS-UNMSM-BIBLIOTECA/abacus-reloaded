// components/SidebarMenu/SidebarMenu.tsx
import { Flex } from '@mantine/core';

interface MenuItem {
  label: string;
  link: string;
}

interface SidebarMenuProps {
  menuItems: MenuItem[];
}

export const SidebarMenu = ({ menuItems }: SidebarMenuProps) => {
  return (
    <Flex pt={30} direction="column">
      {menuItems.map(({ label, link }) => (
        <a
          className="fz-lg"
          key={label}
          href={link}
        >
          {label}
        </a>
      ))}
    </Flex>
  );
};
