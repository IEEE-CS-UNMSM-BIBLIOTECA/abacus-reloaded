import { useState } from 'react';
import { useLocation } from 'wouter';
import { useMatches, Drawer, Anchor, Text } from '@mantine/core';
import { IconHome, IconMenu, IconSearch } from '@tabler/icons-react';
import { useLocalStorage } from '@mantine/hooks';

const staticDrawerLinks = [
  { label: 'INICIO', href: '/books' },
  { label: 'BUSCAR', href: '/search' },
  { label: 'LISTAS', href: '/lists' },
  { label: 'RESEÑAS', href: '/reviews' },
];

const PageShell = ({ children, fullHeight }: { children?: React.ReactNode }) => {
  const [location, setLocation] = useLocation();
  const [opened, setOpened] = useState(false);
  const [token] = useLocalStorage({ key: 'token' });

  let drawerLinks = staticDrawerLinks;

  if (token) {
    drawerLinks = [
      ...staticDrawerLinks,
      { label: 'MI PERFIL', href: '/user/0' },
      { label: 'MIS PRÉSTAMOS', href: '/lends' },
    ];
  }

  const iconSize = useMatches({
    base: 20,
    md: 24,
  });

  const logout = () => {
    localStorage.setItem('token', '');
    setLocation('/');
  };

  return (
    <>
      <div className="group">
        <div className="stack jc-center ai-center" style={{ width: 100, height: 100 }}>
          {location === '/search' ? (
            <IconHome
              className="icon-button"
              size={iconSize}
              title="Inicio"
              onClick={() => setLocation('/')}
              style={{ cursor: 'pointer' }}
            />
          ) : (
            <IconSearch
              className="icon-button"
              size={iconSize}
              title="Buscar"
              onClick={() => setLocation('/search')}
              style={{ cursor: 'pointer' }}
            />
          )}
        </div>

        <div className="stack flex-1 jc-center" style={{ height: '100%' }}>
          {children}
        </div>

        <div className="stack jc-center ai-center" style={{ width: 100, height: 100 }}>
          <IconMenu
            className="icon-button"
            size={iconSize}
            title="Menú"
            onClick={() => setOpened(true)}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>

      <Drawer.Root
        opened={opened}
        onClose={() => setOpened(false)}
        position="right"
        size="sm"
      >
        <Drawer.Overlay />

        <Drawer.Content>
          <Drawer.Header>
            <Drawer.CloseButton
              style={{
                outline: 'none',
              }}
            />
          </Drawer.Header>

          <Drawer.Body>
            <div
              className="stack jc-space-between"
              style={{ height: 'calc(100dvh - 90px)' }}
            >
              <div className="stack">
              {
                drawerLinks.map((link) => (
                  link.href === location
                  ? <Text key={link.label}>
                    <p className="fz-lg" style={{ textDecoration: 'underline' }}>
                      {link.label}
                    </p>
                    </Text>
                  : <Anchor
                      c="black"
                      key={link.label}
                      href={link.href}
                      size="lg"
                  >
                    <p className="fz-lg">
                      {link.label}
                    </p>
                    </Anchor>
                ))
              }
              </div>
              {
                token
                ? <Anchor
                    c="black"
                    size="lg"
                    onClick={logout}
                  >
                    <p className="fz-lg">
                      CERRAR SESIÓN
                    </p>
                  </Anchor>
                : <a href="/signin">
                    <p className="fz-lg">
                      INICIAR SESIÓN
                    </p>
                  </a>
              }
            </div>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
};

export default PageShell;
