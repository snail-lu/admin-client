import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import MenuList from './list/list';
import MenuEdit from './edit/edit';
export default function MenuConfig(){
    return (
        <Switch>
            <Route path="/menus" exact component={MenuList}></Route>
            <Route path="/menus/add" component={MenuEdit}></Route>
            <Route path="/menus/edit" component={MenuEdit}></Route>
        </Switch>
    )   
}
