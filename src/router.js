import React, {PropTypes} from 'react';
import { BrowserRouter, Route,Switch } from 'react-router-dom'


import APP from './components/App';
import Login from './components/Login'
import Data from './components/Data'

 class Router extends React.Component {

  render() {
    return (
      <div>
        <Switch>
          <Route  path='/data' component={Data}/>
          <Route  path='/login' component={Login}/>
          <Route exact path='/' component={APP}/>
        </Switch>
      </div>
    );
  }
}

export default Router;
