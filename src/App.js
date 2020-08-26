import React,{ Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './containers/login/login';
import Register from './containers/register/register';
import Admin from './containers/admin/admin';

class App extends Component {
  render(){
    return(
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/' component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    )  
  }
}

export default App;
