import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ArticlesList from './list/list';
import ArticlesEdit from './edit/edit';
export default function Articles(){
    return (
        <Switch>
            <Route path="/articles" exact component={ArticlesList}></Route>
            <Route path="/articles/add" component={ArticlesEdit}></Route>
            <Route path="/articles/edit" component={ArticlesEdit}></Route>
        </Switch>
    )   
}