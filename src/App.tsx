import { Switch, Route, Redirect } from 'wouter';

import { useLocalStorage } from '@mantine/hooks';
import useAppStart from './hooks/useAppStart';
import useLocationChange from './hooks/useLocationChange';
import Signin from './pages/Signin';
import Dash from './pages/Dash';

const App = () => {
  useAppStart();
  useLocationChange();

  const [token] = useLocalStorage({ key: 'token' });

  return (
    <div className="app-container">
      <Switch>
        <Route path="/">
          <Redirect to={token ? '/dash/orders' : '/signin'} />
        </Route>
        <Route path="/signin">
          <Signin />
        </Route>
        <Route path="/dash" nest>
          <Dash />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
