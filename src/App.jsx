import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { Auth, Home, NotFound } from 'pages'


const App = (props) => {
  const isAuth = props.isAuth
  return (
    <div className="wrap">
      <Switch >
        <Route exact path={['/', '/im']} render={() => isAuth ? <Home /> : <Redirect to='/signin' />} />
        <Route path={['/signin', '/signup']} render={() => isAuth ? <Redirect to='/' /> : <Auth />} />
        <Route path='*' component={NotFound} />
      </Switch>
    </div>
  );
}

export default connect(({ user }) => ({ isAuth: user.isAuth }))(App);
