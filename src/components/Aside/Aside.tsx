import { Route, Switch } from 'wouter';
import NewOrder from '@/pages/Dash/Orders/NewOrder';
import NewDocument from '@/pages/Dash/Documents/NewDocument';

const Aside = () => {
  return (
    <Switch>
      <Route path="/orders/new">
        <NewOrder />
      </Route>
      <Route path="/documents/new">
        <NewDocument />
      </Route>
    </Switch>
  );
};

export default Aside;
