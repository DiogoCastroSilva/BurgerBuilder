import React, { useEffect, Suspense } from 'react';

import Layout from './containers/Layout/Layout';
import Logout from './containers/Auth/Logout/Logout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authCheckState } from './store/actions';


const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));

const App = ({onTryAutoSignUp, isAuth}) => {

    useEffect(() => {
      onTryAutoSignUp();
    }, [onTryAutoSignUp]);

    let routes = isAuth ? [
      {
        path: '/checkout',
        component: Checkout,
        lazy: true
      },
      {
        path: '/orders',
        component: Orders,
        lazy: true
      },
      {
        path: '/logout',
        component: Logout
      }] : [];

    return (
      <div>
        <Layout>
          <Suspense fallback={<p>Loading...</p>}>
            <Switch>
              {routes.map(route => (
                route.lazy ? 
                  <Route path={route.path} render={({history, path, match}) => <route.component history={history} path={path} match={match} />} key={route.path} /> :
                  <Route path={route.path} component={route.component} key={route.path} />
              ))}
              <Route path='/auth' render={() => <Auth />} />
              <Route path='/' exact component={BurgerBuilder} />
              <Redirect to='/' />
            </Switch>
          </Suspense>
        </Layout>
      </div>
    );
};

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
