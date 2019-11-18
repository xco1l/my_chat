import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'

import { Auth, Home } from 'pages'


const App = (props) => {
  const isAuth = props.isAuth
  return (
    <div className="wrap">
      <Route path = {['/signin', '/signup']} component = {Auth} />
      <Route exact path = {['/', '/im']} render = {() => isAuth ? <Home /> : <Redirect to='/signin' />} />
    </div>
  );
}

export default connect(({user}) => ({isAuth: user.isAuth}))(App);
