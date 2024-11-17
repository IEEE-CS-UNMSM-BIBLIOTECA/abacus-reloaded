import { AppShell } from '@mantine/core';
import { Route } from 'wouter';
import Documents from './Documents';
import Orders from './Orders';
import Nav from '@/components/Nav';

const Dash = () => {
  return (
    <AppShell
      h="100dvh"
      w="100dvw"
      navbar={{
        width: 70,
        breakpoint: 'sm',
      }}
      padding="md"
    >
      <AppShell.Navbar py="xl">
        <Nav />
      </AppShell.Navbar>

      <AppShell.Main>
        <Route path="/documents">
          <Documents />
        </Route>
        <Route path="/orders">
          <Orders />
        </Route>
      </AppShell.Main>
    </AppShell>
  );
};

export default Dash;
