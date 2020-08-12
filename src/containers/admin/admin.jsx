import React, { Component } from 'react';
import {Redirect,Route,Switch} from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';
import LeftNav from '../../components/left-nav/left-nav';
import TopNav from '../../components/top-nav/top-nav';
import {Layout} from 'antd';

import Home from '../../components/home/home';
import MenuSet from '../menuSet/index';
import Articles from '../articles/index';
import Category from '../category/category';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';
import Product from '../product/product';
import Role from '../role/role';
import User from '../user/user';
import ActivitySet from '../activitySet/index'
import Comment from '../comment/comment'

const {Sider,Content,Footer} = Layout;


/**
 * 后台 管理的路由组件
 */
class Admin extends Component {
    state = {
        collapsed: false
    }

    onCollapse = collapsed => {
        this.setState({ collapsed });
    }

    render() {
        const user = memoryUtils.user;
        if(!user || !user._id){
            return <Redirect to='/login' />
        }
        return (
            <Layout style={{minHeight: '100%'}}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <LeftNav collapsed={this.state.collapsed} />
                </Sider>
                <Layout>
                    <TopNav />
                    <Content style={{backgroundColor: '#fff',margin: '20px',}}>
                        <Switch>
                            <Route path="/home" component={Home}></Route>
                            {/* 配置管理 */}
                            <Route path="/menus" component={MenuSet}></Route>
                            <Route path="/classification" component={Category}></Route>
                            <Route path="/activities" component={ActivitySet}></Route>    

                            {/* 内容管理 */}
                            <Route path="/product" component={Product}></Route>
                            <Route path="/comment" component={Comment}></Route>
                            <Route path="/articles" component={Articles}></Route>

                            {/* 用户管理 */}
                            <Route path="/user" component={User}></Route>
                            <Route path="/role" component={Role}></Route>

                            {/* 报表数据管理 */}
                            <Route path="/bar" component={Bar}></Route>
                            <Route path="/line" component={Line}></Route>
                            <Route path="/pie" component={Pie}></Route>     
                            
                            <Redirect to="/home" />                     
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>推荐使用谷歌浏览器，可以获得更好的操作体验 </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default Admin;