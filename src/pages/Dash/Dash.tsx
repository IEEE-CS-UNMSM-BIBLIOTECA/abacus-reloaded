import { AppShell } from '@mantine/core';
import { Route, useRoute } from 'wouter';
import Documents from './Documents';
import Orders from './Orders';
import Nav from '@/components/Nav';
import Aside from '@/components/Aside';

const Dash = () => {
  const [isAsideOpen] = useRoute('/:section/new');

  return (
    <AppShell
      h="100dvh"
      w="100dvw"
      navbar={{
        width: 70,
        breakpoint: 'sm',
      }}
      aside={{
        width: 700,
        breakpoint: 'sm',
        collapsed: {
          desktop: !isAsideOpen,
        },
      }}
      padding="md"
      transitionDuration={0}
    >
      <AppShell.Navbar py="xl">
        <Nav />
      </AppShell.Navbar>

      <AppShell.Main>
        <Route path="/documents" nest>
          <Documents />
        </Route>
        <Route path="/orders" nest>
          <Orders />
        </Route>
      </AppShell.Main>

      <AppShell.Aside p="md">
        <Aside />
      </AppShell.Aside>
    </AppShell>
  );
};

export default Dash;
