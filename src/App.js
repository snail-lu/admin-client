import React,{ Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Admin from './pages/admin/admin';

class App extends Component {
  render(){
    return(
      <BrowserRouter>
        {/* Switch只匹配一个 */}
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
