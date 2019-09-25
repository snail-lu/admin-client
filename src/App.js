import React,{ Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './pages/login/login';
import Admin from './pages/admin/admin';

class App extends Component {
  render(){
    return(
      <BrowserRouter>
        {/* Switch只匹配一个 */}
        <Switch> 
          <Route path='/' component={Login}></Route>
          <Route path='/admin' component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    )  
  }
}

export default App;
