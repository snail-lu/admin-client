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
          <Route path='/admin' component={Admin}></Route>
          <Route path='/' component={Login}></Route>
        </Switch>
      </BrowserRouter>
    )  
  }
}

export default App;
